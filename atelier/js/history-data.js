(() => {
  'use strict';
  const BASE='https://data-api.binance.vision/api/v3';
  const DAY=86400000;
  const MAX_DAYS=1000;
  const CACHE_KEY='atlas-atelier-history-v1';
  const TIMEOUT_MS=12000;

  async function request(url) {
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),TIMEOUT_MS);
    try {
      const response=await fetch(url,{method:'GET',mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal,headers:{'Accept':'application/json'}});
      if(!response.ok) {
        const error=new Error(response.status===429?'La source historique limite temporairement les requêtes.':'La source historique a répondu avec une erreur ('+response.status+').');
        error.status=response.status;
        throw error;
      }
      const payload=await response.json();
      if(!Array.isArray(payload))throw new Error('Format de données historiques inattendu.');
      return payload;
    } catch(error) {
      if(error.name==='AbortError')throw new Error('Le téléchargement de l’historique a dépassé le délai autorisé.');
      throw error;
    } finally {clearTimeout(timeout);}
  }

  function readCache(portfolio) {
    try {
      const raw=localStorage.getItem(CACHE_KEY);
      if(!raw)return {version:1,createdAt:portfolio.createdAt,checkedDay:0,checkedAt:0,lastSuccessAt:null,candles:{}};
      const data=JSON.parse(raw);
      if(data.version!==1||data.createdAt!==portfolio.createdAt||!data.candles||typeof data.candles!=='object')return {version:1,createdAt:portfolio.createdAt,checkedDay:0,checkedAt:0,lastSuccessAt:null,candles:{}};
      return data;
    } catch { return {version:1,createdAt:portfolio.createdAt,checkedDay:0,checkedAt:0,lastSuccessAt:null,candles:{}}; }
  }

  function writeCache(cache) {
    try { localStorage.setItem(CACHE_KEY,JSON.stringify(cache)); return true; }
    catch(error) { console.warn('Atelier : cache historique non enregistré.',error); return false; }
  }

  async function fetchAssetHistory(asset,startTime,now) {
    const url=BASE+'/klines?symbol='+encodeURIComponent(asset.pair)+'&interval=1d&startTime='+Math.floor(startTime)+'&endTime='+Math.floor(now)+'&limit='+MAX_DAYS;
    const rows=await request(url);
    return rows.filter(row=>Array.isArray(row)&&row.length>=7)
      .map(row=>[Number(row[6]),String(row[4])])
      .filter(row=>Number.isFinite(row[0])&&row[0]<=now-1&&/^\d+(?:[.]\d{1,8})?$/.test(row[1]));
  }

  async function getDailyHistory(portfolio,{force=false}={}) {
    // BTC and ETH are always loaded as buy-and-hold benchmarks, even when not held in the portfolio.
    const symbols=[...new Set([...portfolio.transactions.map(tx=>tx.symbol),'BTC','ETH'])];
    const allAssets=window.AtlasMarketData.assets;
    const assetBySymbol=Object.fromEntries(allAssets.map(asset=>[asset.symbol,asset]));
    const unknown=symbols.filter(symbol=>!assetBySymbol[symbol]);
    if(unknown.length)throw new Error('Historique indisponible pour les actifs suivants : '+unknown.join(', ')+'.');

    const now=Date.now();
    const todayStart=Math.floor(now/DAY)*DAY;
    const createdAt=Date.parse(portfolio.createdAt);
    if(!Number.isFinite(createdAt))throw new Error('La date de création du portefeuille est invalide.');
    const maxStart=todayStart-(MAX_DAYS-1)*DAY;
    const rangeStart=Math.max(Math.floor(createdAt/DAY)*DAY,maxStart);
    const truncated=createdAt<rangeStart;
    const cache=readCache(portfolio);
    const shouldCheckToday=force||Number(cache.checkedDay)!==todayStart||(now-Number(cache.checkedAt||0)>6*60*60*1000);
    const errors=[];
    const results={};

    const updates=await Promise.all(symbols.map(async symbol=>{
      const asset=assetBySymbol[symbol];
      const existing=Array.isArray(cache.candles[symbol])?cache.candles[symbol].filter(row=>Array.isArray(row)&&row.length===2&&Number.isFinite(Number(row[0]))&&/^\d+(?:[.]\d{1,8})?$/.test(String(row[1]))):[];
      let merged=existing.filter(row=>Number(row[0])>=rangeStart&&Number(row[0])<=now-1);
      const lastClose=merged.length?Number(merged[merged.length-1][0]):0;
      const start=lastClose?lastClose+1:rangeStart;
      if(shouldCheckToday||!merged.length) {
        try {
          const fresh=await fetchAssetHistory(asset,start,now);
          const byTime=new Map(merged.map(row=>[Number(row[0]),row]));
          fresh.forEach(row=>byTime.set(Number(row[0]),row));
          merged=[...byTime.values()].sort((a,b)=>Number(a[0])-Number(b[0])).slice(-MAX_DAYS);
          if(fresh.length)cache.lastSuccessAt=new Date().toISOString();
        } catch(error) {
          errors.push({symbol,message:error.message});
        }
      }
      return [symbol,merged];
    }));
    updates.forEach(([symbol,rows])=>{
      results[symbol]=rows;
      if(rows.length)cache.candles[symbol]=rows;
    });
    cache.version=1;
    cache.createdAt=portfolio.createdAt;
    cache.checkedDay=todayStart;
    cache.checkedAt=now;
    if(cache.lastSuccessAt===undefined)cache.lastSuccessAt=null;
    writeCache(cache);

    const missing=symbols.filter(symbol=>!results[symbol]?.length);
    if(missing.length&&now-createdAt>DAY) {
      for(const symbol of missing) {
        if(!errors.some(error=>error.symbol===symbol))errors.push({symbol,message:'Aucune clôture journalière complète n’a été reçue pour cet actif.'});
      }
    }
    if(missing.length&&!Object.values(results).some(rows=>rows.length)&&now-createdAt>DAY) {
      throw new Error(errors.map(e=>e.symbol+': '+e.message).join(' · ')||'Aucune clôture journalière disponible pour ce portefeuille.');
    }
    return {
      candlesBySymbol:results,
      symbols,
      rangeStart,
      truncated,
      errors,
      // updatedAt is the last successful market-data fetch; checkedAt is only the latest check.
      updatedAt:cache.lastSuccessAt,
      checkedAt:new Date(now).toISOString(),
      source:'Binance Spot · clôtures journalières UTC'
    };
  }

  window.AtlasHistoryData={getDailyHistory,source:'Binance Spot · clôtures journalières UTC',maxDays:MAX_DAYS};
})();