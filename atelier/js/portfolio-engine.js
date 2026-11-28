(() => {
  'use strict';
  const MONEY_SCALE = 1000000n;
  const ASSET_SCALE = 100000000n;
  const PRICE_SCALE = 100000000n;
  const pow10 = (digits) => 10n ** BigInt(digits);

  function parseUnits(value, scaleDigits, {allowZero=false}={}) {
    const text = String(value ?? '').trim().replace(',', '.');
    if (!/^\d+(?:\.\d+)?$/.test(text)) throw new Error('Saisissez un nombre valide.');
    const [whole, fraction=''] = text.split('.');
    if (fraction.length > scaleDigits) throw new Error('Nombre de décimales trop élevé.');
    const scale = pow10(scaleDigits);
    const units = BigInt(whole) * scale + BigInt((fraction + '0'.repeat(scaleDigits)).slice(0,scaleDigits) || '0');
    if (!allowZero && units <= 0n) throw new Error('Le montant doit être supérieur à zéro.');
    return units;
  }
  function unitsToString(units, scaleDigits, maxDigits=scaleDigits) {
    let value = BigInt(units);
    const negative = value < 0n;
    if (negative) value = -value;
    const scale = pow10(scaleDigits);
    const whole = value / scale;
    let fraction = (value % scale).toString().padStart(scaleDigits,'0').slice(0,maxDigits).replace(/0+$/,'');
    return (negative?'-':'') + whole.toString() + (fraction ? '.' + fraction : '');
  }
  function notionalMicro(quantityUnits, priceUnits) {
    return (BigInt(quantityUnits) * BigInt(priceUnits) * MONEY_SCALE) / (ASSET_SCALE * PRICE_SCALE);
  }
  function quantityUnits(grossMicro, priceUnits) {
    return (BigInt(grossMicro) * ASSET_SCALE * PRICE_SCALE) / (MONEY_SCALE * BigInt(priceUnits));
  }
  function feeMicro(grossMicro, feeBps) {
    return (BigInt(grossMicro) * BigInt(feeBps)) / 10000n;
  }
  function safePortfolio(portfolio) {
    const unsigned=value=>/^[0-9]+$/.test(String(value));
    const signed=value=>/^-?[0-9]+$/.test(String(value));
    const decimal=value=>/^[0-9]+([.][0-9]{1,8})?$/.test(String(value));
    if (!portfolio || portfolio.schemaVersion !== 1 || !Array.isArray(portfolio.transactions) || portfolio.transactions.length>10000 || !portfolio.assets || typeof portfolio.assets !== 'object' || Array.isArray(portfolio.assets)) return false;
    if (typeof portfolio.createdAt!=='string' || !Number.isFinite(Date.parse(portfolio.createdAt))) return false;
    if (!unsigned(portfolio.cashMicro) || !unsigned(portfolio.initialCapitalMicro) || BigInt(portfolio.initialCapitalMicro)<=0n) return false;
    if (!signed(portfolio.realizedPnlMicro) || !unsigned(portfolio.totalFeesMicro) || !Number.isInteger(portfolio.feeBps) || portfolio.feeBps<0 || portfolio.feeBps>200) return false;

    // Rebuild the ledger from the immutable transactions before trusting a local or imported portfolio.
    let expectedCash=BigInt(portfolio.initialCapitalMicro);
    let expectedFees=0n;
    let expectedRealized=0n;
    const expectedAssets={};
    const createdAt=Date.parse(portfolio.createdAt);
    const chronological=[...portfolio.transactions].reverse().sort((a,b)=>Date.parse(a.timestamp)-Date.parse(b.timestamp));
    try {
      for(const tx of chronological) {
        if(!tx || typeof tx!=='object' || !/^[A-Z0-9]{2,15}$/.test(String(tx.symbol)) || !['buy','sell'].includes(tx.side)) return false;
        if(!decimal(tx.quantity) || Number(tx.quantity)<=0 || !decimal(tx.price) || Number(tx.price)<=0) return false;
        if(!unsigned(tx.grossMicro) || !unsigned(tx.feeMicro) || !unsigned(tx.netMicro) || !signed(tx.realizedPnlMicro)) return false;
        const time=Date.parse(tx.timestamp);
        if(typeof tx.timestamp!=='string' || !Number.isFinite(time) || time<createdAt || typeof tx.id!=='string' || !tx.id) return false;
        const quantity=parseUnits(tx.quantity,8);
        const price=parseUnits(tx.price,8);
        const gross=BigInt(tx.grossMicro);
        const fee=BigInt(tx.feeMicro);
        const net=BigInt(tx.netMicro);
        if(notionalMicro(quantity,price)!==gross) return false;
        expectedFees+=fee;
        const holding=expectedAssets[tx.symbol]||(expectedAssets[tx.symbol]={quantityUnits:0n,costBasisMicro:0n});
        if(tx.side==='buy') {
          if(net!==gross+fee||expectedCash<net) return false;
          expectedCash-=net;
          holding.quantityUnits+=quantity;
          holding.costBasisMicro+=gross+fee;
          if(BigInt(tx.realizedPnlMicro)!==0n) return false;
        } else {
          if(net!==gross-fee||quantity<=0n||quantity>holding.quantityUnits) return false;
          const costAllocated=quantity===holding.quantityUnits?holding.costBasisMicro:(holding.costBasisMicro*quantity)/holding.quantityUnits;
          holding.quantityUnits-=quantity;
          holding.costBasisMicro-=costAllocated;
          expectedCash+=net;
          expectedRealized+=net-costAllocated;
          if(BigInt(tx.realizedPnlMicro)!==net-costAllocated) return false;
          if(holding.quantityUnits===0n)delete expectedAssets[tx.symbol];
        }
      }
    } catch { return false; }

    if(expectedCash!==BigInt(portfolio.cashMicro)||expectedFees!==BigInt(portfolio.totalFeesMicro)||expectedRealized!==BigInt(portfolio.realizedPnlMicro)) return false;
    const actualSymbols=Object.keys(portfolio.assets).sort();
    const expectedSymbols=Object.keys(expectedAssets).sort();
    if(actualSymbols.length!==expectedSymbols.length||actualSymbols.some((symbol,index)=>symbol!==expectedSymbols[index]))return false;
    for(const symbol of expectedSymbols) {
      const actual=portfolio.assets[symbol];
      const expected=expectedAssets[symbol];
      if(!actual||!unsigned(actual.quantityUnits)||!unsigned(actual.costBasisMicro))return false;
      if(BigInt(actual.quantityUnits)!==expected.quantityUnits||BigInt(actual.costBasisMicro)!==expected.costBasisMicro)return false;
    }
    return true;
  }
  function createPortfolio(initialCapital) {
    const cash = parseUnits(initialCapital,6);
    if (cash < 100000000n || cash > 100000000000000n) throw new Error('Le capital doit être compris entre 100 et 100 000 000 USDC.');
    return {
      schemaVersion:1,
      createdAt:new Date().toISOString(),
      initialCapitalMicro:cash.toString(),
      cashMicro:cash.toString(),
      realizedPnlMicro:'0',
      totalFeesMicro:'0',
      feeBps:10,
      assets:{},
      transactions:[]
    };
  }
  function previewBuy(portfolio, symbol, grossInput, priceInput) {
    const grossInputMicro = parseUnits(grossInput,6);
    const price = parseUnits(priceInput,8);
    const qty = quantityUnits(grossInputMicro,price);
    if(qty<=0n)throw new Error('Le montant est trop faible pour obtenir une quantité négociable.');
    const gross = notionalMicro(qty,price);
    const fee = feeMicro(gross,portfolio.feeBps);
    const total = gross+fee;
    if(total>BigInt(portfolio.cashMicro))throw new Error('Solde USDC insuffisant pour couvrir le montant et les frais.');
    return {symbol,side:'buy',priceUnits:price.toString(),quantityUnits:qty.toString(),grossMicro:gross.toString(),feeMicro:fee.toString(),netMicro:total.toString()};
  }
  function previewSell(portfolio, symbol, quantityInput, priceInput) {
    const quantity = parseUnits(quantityInput,8);
    const price = parseUnits(priceInput,8);
    const holding = portfolio.assets[symbol];
    if(!holding || quantity>BigInt(holding.quantityUnits))throw new Error('La quantité dépasse les actifs disponibles.');
    const gross = notionalMicro(quantity,price);
    const fee = feeMicro(gross,portfolio.feeBps);
    const net = gross-fee;
    if(net<0n)throw new Error('Les frais dépassent le produit de vente.');
    return {symbol,side:'sell',priceUnits:price.toString(),quantityUnits:quantity.toString(),grossMicro:gross.toString(),feeMicro:fee.toString(),netMicro:net.toString()};
  }
  function applyTrade(portfolio, preview, metadata={}) {
    const next = JSON.parse(JSON.stringify(portfolio));
    const symbol = preview.symbol;
    const qty = BigInt(preview.quantityUnits);
    const gross = BigInt(preview.grossMicro);
    const fee = BigInt(preview.feeMicro);
    const net = BigInt(preview.netMicro);
    const price = BigInt(preview.priceUnits);
    const current = next.assets[symbol] || {quantityUnits:'0',costBasisMicro:'0'};
    let realized = 0n;
    if(preview.side==='buy') {
      const cashAfter = BigInt(next.cashMicro)-net;
      if(cashAfter<0n)throw new Error('Solde insuffisant : opération annulée.');
      current.quantityUnits=(BigInt(current.quantityUnits)+qty).toString();
      current.costBasisMicro=(BigInt(current.costBasisMicro)+gross+fee).toString();
      next.assets[symbol]=current;
      next.cashMicro=cashAfter.toString();
    } else if(preview.side==='sell') {
      const held = BigInt(current.quantityUnits);
      if(qty<=0n||qty>held)throw new Error('Quantité disponible insuffisante : opération annulée.');
      const cost = BigInt(current.costBasisMicro);
      const costAllocated = qty===held ? cost : (cost*qty)/held;
      current.quantityUnits=(held-qty).toString();
      current.costBasisMicro=(cost-costAllocated).toString();
      next.cashMicro=(BigInt(next.cashMicro)+net).toString();
      realized=net-costAllocated;
      next.realizedPnlMicro=(BigInt(next.realizedPnlMicro)+realized).toString();
      if(BigInt(current.quantityUnits)===0n)delete next.assets[symbol];
      else next.assets[symbol]=current;
    } else {
      throw new Error('Type d’opération inconnu.');
    }
    next.totalFeesMicro=(BigInt(next.totalFeesMicro)+fee).toString();
    const lastTransactionTime=next.transactions.length?Date.parse(next.transactions[0].timestamp):0;
    const transactionTimestamp=new Date(Math.max(Date.now(),Number.isFinite(lastTransactionTime)?lastTransactionTime+1:0)).toISOString();
    const transaction = {
      id:(globalThis.crypto&&crypto.randomUUID)?crypto.randomUUID():'tx-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),
      timestamp:transactionTimestamp,
      symbol,side:preview.side,
      price:unitsToString(price,8,8),
      quantity:unitsToString(qty,8,8),
      grossMicro:gross.toString(),
      feeMicro:fee.toString(),
      netMicro:net.toString(),
      realizedPnlMicro:realized.toString(),
      source:metadata.source||'Binance Spot'
    };
    next.transactions.unshift(transaction);
    return {portfolio:next,transaction};
  }
  function valuePortfolio(portfolio, prices) {
    const positions = [];
    let marketValue=0n;
    let unrealized=0n;
    let complete=true;
    for(const [symbol,holding] of Object.entries(portfolio.assets)){
      const mark=prices[symbol]?.price;
      if(!mark){complete=false;positions.push({symbol,quantityUnits:holding.quantityUnits,costBasisMicro:holding.costBasisMicro,missingPrice:true});continue;}
      const price=parseUnits(mark,8);
      const value=notionalMicro(BigInt(holding.quantityUnits),price);
      const cost=BigInt(holding.costBasisMicro);
      const pnl=value-cost;
      marketValue+=value;unrealized+=pnl;
      positions.push({symbol,quantityUnits:holding.quantityUnits,costBasisMicro:holding.costBasisMicro,priceUnits:price.toString(),marketValueMicro:value.toString(),unrealizedPnlMicro:pnl.toString(),missingPrice:false});
    }
    const cash=BigInt(portfolio.cashMicro);
    const totalValue=complete?cash+marketValue:null;
    const totalPnl=complete?totalValue-BigInt(portfolio.initialCapitalMicro):null;
    return {positions,marketValueMicro:marketValue.toString(),cashMicro:cash.toString(),totalValueMicro:totalValue?.toString()??null,realizedPnlMicro:portfolio.realizedPnlMicro,unrealizedPnlMicro:unrealized.toString(),totalPnlMicro:totalPnl?.toString()??null,complete};
  }
  function buildDailyPerformance(portfolio, candlesBySymbol, rangeStart=0) {
    const txs=[...portfolio.transactions].sort((a,b)=>Date.parse(a.timestamp)-Date.parse(b.timestamp));
    const priceMaps={};
    const timestamps=new Set();
    for(const [symbol,candles] of Object.entries(candlesBySymbol||{})) {
      const map=new Map();
      for(const candle of candles||[]) {
        const closeTime=Number(candle[0]);
        const closePrice=String(candle[1]);
        if(Number.isFinite(closeTime)&&closeTime>0&&/^\d+(?:[.]\d{1,8})?$/.test(closePrice)) {
          map.set(closeTime,closePrice);
          timestamps.add(closeTime);
        }
      }
      priceMaps[symbol]=map;
    }
    const orderedTimes=[...timestamps].sort((a,b)=>a-b);
    let cash=BigInt(portfolio.initialCapitalMicro);
    const holdings={};
    let txIndex=0;
    const points=[];
    const createdAt=Date.parse(portfolio.createdAt);
    if(Number.isFinite(createdAt)&&createdAt>=rangeStart&&createdAt<=Date.now()) {
      points.push({timestamp:createdAt,valueMicro:portfolio.initialCapitalMicro,kind:'start'});
    }
    for(const timestamp of orderedTimes) {
      while(txIndex<txs.length&&Date.parse(txs[txIndex].timestamp)<=timestamp) {
        const tx=txs[txIndex++];
        const qty=parseUnits(tx.quantity,8);
        const net=BigInt(tx.netMicro);
        if(tx.side==='buy') {
          cash-=net;
          holdings[tx.symbol]=(holdings[tx.symbol]||0n)+qty;
        } else {
          cash+=net;
          const current=holdings[tx.symbol]||0n;
          if(qty>current)throw new Error('L’historique des ventes dépasse les quantités acquises dans le journal des opérations.');
          holdings[tx.symbol]=current-qty;
        }
      }
      if(timestamp<rangeStart||timestamp>Date.now())continue;
      let value=cash;
      let complete=true;
      for(const [symbol,qty] of Object.entries(holdings)) {
        if(qty<=0n)continue;
        const price=priceMaps[symbol]?.get(timestamp);
        if(!price) {
          complete=false;
          break;
        }
        value+=notionalMicro(qty,parseUnits(price,8));
      }
      if(complete)points.push({timestamp,valueMicro:value.toString(),kind:'daily-close'});
    }
    return points.filter((point,index,array)=>index===0||point.timestamp>array[index-1].timestamp);
  }
  function buildBenchmarkPerformance(portfolioPoints, candlesBySymbol, initialCapitalMicro, symbol) {
    if(!Array.isArray(portfolioPoints))throw new Error('Historique du portefeuille invalide.');
    if(!['BTC','ETH'].includes(symbol))throw new Error('Benchmark non pris en charge.');
    const capital=BigInt(initialCapitalMicro);
    if(capital<=0n)throw new Error('Le capital de référence doit être positif.');
    const peerSymbol=symbol==='BTC'?'ETH':'BTC';
    const buildPriceMap=candles=>{
      const map=new Map();
      for(const candle of candles||[]) {
        if(!Array.isArray(candle)||candle.length<2)continue;
        const timestamp=Number(candle[0]);
        const price=String(candle[1]);
        if(Number.isFinite(timestamp)&&timestamp>0&&/^\d+(?:[.]\d{1,8})?$/.test(price))map.set(timestamp,price);
      }
      return map;
    };
    const priceMap=buildPriceMap(candlesBySymbol?.[symbol]);
    const peerPriceMap=buildPriceMap(candlesBySymbol?.[peerSymbol]);
    const dailyPoints=portfolioPoints
      .filter(point=>point&&point.kind==='daily-close'&&Number.isFinite(point.timestamp))
      .slice()
      .sort((a,b)=>a.timestamp-b.timestamp)
      .filter(point=>priceMap.has(point.timestamp)&&peerPriceMap.has(point.timestamp));
    const first=dailyPoints[0];
    if(!first)return {symbol,baseTimestamp:null,basePrice:null,points:[]};
    const basePrice=parseUnits(priceMap.get(first.timestamp),8);
    if(basePrice<=0n)return {symbol,baseTimestamp:null,basePrice:null,points:[]};
    const points=dailyPoints.map(point=>{
      const price=parseUnits(priceMap.get(point.timestamp),8);
      return {timestamp:point.timestamp,valueMicro:((capital*price)/basePrice).toString(),kind:'benchmark'};
    });
    return {symbol,baseTimestamp:first.timestamp,basePrice:priceMap.get(first.timestamp),points};
  }
  function buildPortfolioAllocation(portfolio, valuation) {
    if(!valuation||valuation.complete!==true||valuation.totalValueMicro===null||valuation.totalValueMicro===undefined) {
      return {complete:false,totalValueMicro:null,items:[]};
    }
    const total=BigInt(valuation.totalValueMicro);
    if(total<=0n)return {complete:false,totalValueMicro:null,items:[]};
    const raw=[];
    const cash=BigInt(portfolio.cashMicro);
    if(cash<0n)throw new Error('Le solde disponible ne peut pas être négatif.');
    if(cash>0n)raw.push({symbol:'USDC',valueMicro:cash.toString()});
    for(const position of valuation.positions||[]) {
      if(position.missingPrice)return {complete:false,totalValueMicro:null,items:[]};
      const value=BigInt(position.marketValueMicro);
      if(value<0n)throw new Error('La valeur d’une position ne peut pas être négative.');
      if(value>0n)raw.push({symbol:position.symbol,valueMicro:value.toString()});
    }
    const sum=raw.reduce((acc,item)=>acc+BigInt(item.valueMicro),0n);
    if(sum!==total)throw new Error('La répartition ne correspond pas à la valeur totale du portefeuille.');
    const weighted=raw.map((item,index)=>{
      const numerator=BigInt(item.valueMicro)*10000n;
      return {...item,index,shareBps:numerator/total,remainder:numerator%total};
    });
    const allocated=weighted.reduce((acc,item)=>acc+item.shareBps,0n);
    let remaining=10000n-allocated;
    const ranked=[...weighted].sort((a,b)=>{
      if(a.remainder===b.remainder)return a.index-b.index;
      return a.remainder>b.remainder?-1:1;
    });
    for(let index=0;remaining>0n&&index<ranked.length;index++,remaining--)ranked[index].shareBps+=1n;
    if(remaining!==0n)throw new Error('Impossible d’arrondir précisément la répartition du portefeuille.');
    return {
      complete:true,
      totalValueMicro:total.toString(),
      items:weighted.map(({symbol,valueMicro,shareBps})=>({symbol,valueMicro,shareBps:Number(shareBps)}))
    };
  }
  function setFeeBps(portfolio, value) {
    const percent=parseUnits(value,2,{allowZero:true});
    if(percent>200n)throw new Error('La commission doit être comprise entre 0 et 2 %.');
    return {...portfolio,feeBps:Number(percent)};
  }
  window.AtlasPortfolioEngine={MONEY_SCALE,ASSET_SCALE,PRICE_SCALE,parseUnits,unitsToString,notionalMicro,quantityUnits,feeMicro,createPortfolio,previewBuy,previewSell,applyTrade,valuePortfolio,buildDailyPerformance,buildBenchmarkPerformance,buildPortfolioAllocation,setFeeBps,safePortfolio};
})();