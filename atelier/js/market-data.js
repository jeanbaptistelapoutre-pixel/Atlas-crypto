(() => {
  'use strict';
  const BASE='https://data-api.binance.vision/api/v3';
  const REFRESH_MS=60000;
  const ASSETS=[
    {symbol:'BTC',name:'Bitcoin',pair:'BTCUSDC',mark:'₿'},
    {symbol:'ETH',name:'Ethereum',pair:'ETHUSDC',mark:'Ξ'},
    {symbol:'SOL',name:'Solana',pair:'SOLUSDC',mark:'◎'},
    {symbol:'XRP',name:'XRP',pair:'XRPUSDC',mark:'✕'},
    {symbol:'BNB',name:'BNB',pair:'BNBUSDC',mark:'◆'},
    {symbol:'DOGE',name:'Dogecoin',pair:'DOGEUSDC',mark:'Ð'},
    {symbol:'ADA',name:'Cardano',pair:'ADAUSDC',mark:'₳'},
    {symbol:'LINK',name:'Chainlink',pair:'LINKUSDC',mark:'⬡'}
  ];
  let cached=null;
  let lastFetch=0;
  let pending=null;
  async function fetchWithTimeout(url) {
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),10000);
    try {
      const response=await fetch(url,{method:'GET',mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal,headers:{'Accept':'application/json'}});
      if(!response.ok){
        const error=new Error(response.status===429?'La source de marché limite temporairement les requêtes.':'La source de marché a répondu avec une erreur ('+response.status+').');
        error.status=response.status;throw error;
      }
      return await response.json();
    } catch(error) {
      if(error.name==='AbortError')throw new Error('La connexion à la source de marché a dépassé le délai autorisé.');
      throw error;
    } finally {clearTimeout(timeout);}
  }
  function normalise(ticker,asset) {
    const last=Number(ticker.lastPrice);
    if(!Number.isFinite(last)||last<=0)return null;
    return {
      symbol:asset.symbol,name:asset.name,pair:asset.pair,mark:asset.mark,
      price:String(ticker.lastPrice),
      change24h:Number(ticker.priceChangePercent)||0,
      fetchedAt:new Date().toISOString(),
      source:'Binance Spot'
    };
  }
  async function fetchBatch() {
    const symbols=ASSETS.map(asset=>asset.pair);
    const url=BASE+'/ticker/24hr?symbols='+encodeURIComponent(JSON.stringify(symbols));
    let payload;
    try {
      payload=await fetchWithTimeout(url);
    } catch(error) {
      // A batch can fail if a venue has removed or restricted one pair. Retry individually to preserve available assets.
      const results=await Promise.allSettled(ASSETS.map(async asset=>{
        const ticker=await fetchWithTimeout(BASE+'/ticker/24hr?symbol='+encodeURIComponent(asset.pair));
        return normalise(ticker,asset);
      }));
      const partial=results.filter(result=>result.status==='fulfilled'&&result.value).map(result=>result.value);
      if(!partial.length)throw error;
      return partial;
    }
    if(!Array.isArray(payload))throw new Error('Format de réponse inattendu de la source de marché.');
    const byPair=new Map(payload.map(item=>[item.symbol,item]));
    return ASSETS.map(asset=>normalise(byPair.get(asset.pair)||{},asset)).filter(Boolean);
  }
  async function getMarkets({force=false}={}) {
    if(!force&&cached&&Date.now()-lastFetch<REFRESH_MS)return cached;
    if(pending)return pending;
    pending=fetchBatch().then(items=>{
      if(!items.length)throw new Error('Aucun des actifs suivis ne dispose actuellement d’une paire USDC disponible sur la source.');
      cached=items;lastFetch=Date.now();
      return {items,updatedAt:new Date().toISOString(),source:'Binance Spot'};
    }).finally(()=>{pending=null;});
    return pending;
  }
  window.AtlasMarketData={assets:ASSETS,getMarkets,refreshInterval:REFRESH_MS,source:'Binance Spot'};
})();