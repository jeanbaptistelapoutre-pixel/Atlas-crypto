'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadEngine() {
  const context = vm.createContext({window:{}});
  const source = fs.readFileSync(path.join(__dirname,'..','js','portfolio-engine.js'),'utf8');
  vm.runInContext(source,context,{filename:'portfolio-engine.js'});
  return context.window.AtlasPortfolioEngine;
}

test('creates a valid portfolio with the chosen starting capital',()=>{
  const engine=loadEngine();
  const portfolio=engine.createPortfolio('10000');
  assert.equal(portfolio.initialCapitalMicro,'10000000000');
  assert.equal(portfolio.cashMicro,'10000000000');
  assert.equal(engine.safePortfolio(portfolio),true);
});

test('buy debits gross amount plus simulated fee and records a position',()=>{
  const engine=loadEngine();
  const start=engine.createPortfolio('10000');
  const preview=engine.previewBuy(start,'BTC','1000','60000');
  const bought=engine.applyTrade(start,preview).portfolio;
  assert.equal(bought.cashMicro,'8999000401');
  assert.equal(bought.totalFeesMicro,'999999');
  assert.equal(Boolean(bought.assets.BTC),true);
  assert.equal(bought.assets.BTC.costBasisMicro,'1000999599');
  assert.equal(engine.safePortfolio(bought),true);
});

test('partial sale updates cash, remaining units and realized P&L',()=>{
  const engine=loadEngine();
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','1000','60000')).portfolio;
  const quantity=engine.unitsToString(BigInt(portfolio.assets.BTC.quantityUnits)/2n,8,8);
  portfolio=engine.applyTrade(portfolio,engine.previewSell(portfolio,'BTC',quantity,'66000')).portfolio;
  assert.ok(BigInt(portfolio.cashMicro)>BigInt('8999000401'));
  assert.ok(BigInt(portfolio.assets.BTC.quantityUnits)>0n);
  assert.ok(BigInt(portfolio.realizedPnlMicro)>0n);
  assert.equal(engine.safePortfolio(portfolio),true);
});

test('full sale closes a position and reconciles cash with realized P&L',()=>{
  const engine=loadEngine();
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'ETH','1000','2000')).portfolio;
  const quantity=engine.unitsToString(portfolio.assets.ETH.quantityUnits,8,8);
  portfolio=engine.applyTrade(portfolio,engine.previewSell(portfolio,'ETH',quantity,'1800')).portfolio;
  assert.equal(Boolean(portfolio.assets.ETH),false);
  assert.equal(BigInt(portfolio.cashMicro)-BigInt(portfolio.initialCapitalMicro),BigInt(portfolio.realizedPnlMicro));
  assert.ok(BigInt(portfolio.realizedPnlMicro)<0n);
  assert.equal(engine.safePortfolio(portfolio),true);
});

test('rejects overspending and selling unavailable units',()=>{
  const engine=loadEngine();
  const portfolio=engine.createPortfolio('10000');
  assert.throws(()=>engine.previewBuy(portfolio,'BTC','10001','60000'));
  assert.throws(()=>engine.previewSell(portfolio,'BTC','0.01','60000'));
});

test('ledger validation rejects edited balances and inconsistent transactions',()=>{
  const engine=loadEngine();
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','1000','60000')).portfolio;
  assert.equal(engine.safePortfolio(portfolio),true);
  const wrongCash=JSON.parse(JSON.stringify(portfolio));
  wrongCash.cashMicro='8888000000';
  assert.equal(engine.safePortfolio(wrongCash),false);
  const wrongTransaction=JSON.parse(JSON.stringify(portfolio));
  wrongTransaction.transactions[0].netMicro='1';
  assert.equal(engine.safePortfolio(wrongTransaction),false);
});

test('reconstructs daily portfolio value from transactions and UTC closing prices',()=>{
  const engine=loadEngine();
  const day=86400000;
  const now=Date.now();
  const currentDay=Math.floor(now/day)*day;
  const creation=currentDay-2*day+60*60*1000;
  const closeOne=currentDay-day-1;
  const closeTwo=currentDay-1;
  let portfolio=engine.createPortfolio('10000');
  portfolio.createdAt=new Date(creation).toISOString();
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','1000','10000')).portfolio;
  portfolio.transactions[0].timestamp=new Date(creation+12*60*60*1000).toISOString();
  portfolio=engine.applyTrade(portfolio,engine.previewSell(portfolio,'BTC','0.05','12000')).portfolio;
  portfolio.transactions[0].timestamp=new Date(closeOne+12*60*60*1000).toISOString();

  const points=engine.buildDailyPerformance(portfolio,{
    BTC:[[closeOne,'10000'],[closeTwo,'11000']]
  },currentDay-2*day);
  const values=Array.from(points,point=>(Number(BigInt(point.valueMicro))/1e6).toFixed(2));
  assert.deepEqual(values,['10000.00','9999.00','10148.40']);
});

test('does not fabricate a valuation when a held asset has no closing price',()=>{
  const engine=loadEngine();
  const day=86400000;
  const now=Date.now();
  const currentDay=Math.floor(now/day)*day;
  const creation=currentDay-2*day+1000;
  let portfolio=engine.createPortfolio('10000');
  portfolio.createdAt=new Date(creation).toISOString();
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','1000','10000')).portfolio;
  portfolio.transactions[0].timestamp=new Date(creation+10000).toISOString();
  const points=engine.buildDailyPerformance(portfolio,{BTC:[]},currentDay-2*day);
  assert.equal(points.length,1);
  assert.equal(points[0].kind,'start');
});

test('builds BTC and ETH buy-and-hold benchmarks from the first common daily close',()=>{
  const engine=loadEngine();
  const firstClose=Date.UTC(2026,0,2,23,59,59,999);
  const secondClose=Date.UTC(2026,0,3,23,59,59,999);
  const capital='10000000000';
  const portfolioPoints=[
    {timestamp:firstClose-3600000,valueMicro:capital,kind:'start'},
    {timestamp:firstClose,valueMicro:'9900000000',kind:'daily-close'},
    {timestamp:secondClose,valueMicro:'10100000000',kind:'daily-close'}
  ];
  const candles={
    BTC:[[firstClose,'50000'],[secondClose,'60000']],
    ETH:[[firstClose,'2500'],[secondClose,'2000']]
  };
  const btc=engine.buildBenchmarkPerformance(portfolioPoints,candles,capital,'BTC');
  const eth=engine.buildBenchmarkPerformance(portfolioPoints,candles,capital,'ETH');
  assert.equal(btc.baseTimestamp,firstClose);
  assert.equal(eth.baseTimestamp,firstClose);
  assert.deepEqual(Array.from(btc.points,point=>point.valueMicro),['10000000000','12000000000']);
  assert.deepEqual(Array.from(eth.points,point=>point.valueMicro),['10000000000','8000000000']);
});

test('benchmark series omits dates without a matching BTC and ETH close',()=>{
  const engine=loadEngine();
  const firstClose=Date.UTC(2026,1,2,23,59,59,999);
  const missingClose=Date.UTC(2026,1,3,23,59,59,999);
  const lastClose=Date.UTC(2026,1,4,23,59,59,999);
  const portfolioPoints=[
    {timestamp:firstClose,valueMicro:'10000000000',kind:'daily-close'},
    {timestamp:missingClose,valueMicro:'10000000000',kind:'daily-close'},
    {timestamp:lastClose,valueMicro:'10000000000',kind:'daily-close'}
  ];
  const benchmark=engine.buildBenchmarkPerformance(
    portfolioPoints,
    {BTC:[[firstClose,'40000'],[lastClose,'42000']],ETH:[[firstClose,'2000'],[missingClose,'2050'],[lastClose,'2100']]},
    '10000000000','BTC'
  );
  assert.deepEqual(Array.from(benchmark.points,point=>point.timestamp),[firstClose,lastClose]);
  assert.equal(benchmark.points.length,2);
});

test('builds a complete allocation including cash and rounds shares to exactly 100 percent',()=>{
  const engine=loadEngine();
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','2000','20000')).portfolio;
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'ETH','1000','2000')).portfolio;
  const valuation=engine.valuePortfolio(portfolio,{
    BTC:{price:'22000'},
    ETH:{price:'1800'}
  });
  const allocation=engine.buildPortfolioAllocation(portfolio,valuation);
  assert.equal(allocation.complete,true);
  assert.equal(allocation.items.reduce((sum,item)=>sum+item.shareBps,0),10000);
  assert.equal(allocation.items.reduce((sum,item)=>sum+BigInt(item.valueMicro),0n).toString(),valuation.totalValueMicro);
  assert.ok(allocation.items.some(item=>item.symbol==='USDC'));
  assert.ok(allocation.items.some(item=>item.symbol==='BTC'));
  assert.ok(allocation.items.some(item=>item.symbol==='ETH'));
});

test('does not present a complete allocation while a held asset has no reference price',()=>{
  const engine=loadEngine();
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','1000','20000')).portfolio;
  const valuation=engine.valuePortfolio(portfolio,{});
  const allocation=engine.buildPortfolioAllocation(portfolio,valuation);
  assert.equal(allocation.complete,false);
  assert.deepEqual(Array.from(allocation.items),[]);
});

test('fee setting accepts zero through two percent and rejects larger values',()=>{
  const engine=loadEngine();
  const portfolio=engine.createPortfolio('10000');
  assert.equal(engine.setFeeBps(portfolio,'0.25').feeBps,25);
  assert.equal(engine.setFeeBps(portfolio,'0').feeBps,0);
  assert.throws(()=>engine.setFeeBps(portfolio,'2.01'));
});

test('rejects transaction arrays that are not stored newest-first',()=>{
  const engine=loadEngine();
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','500','60000')).portfolio;
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'ETH','300','2000')).portfolio;
  const reordered=JSON.parse(JSON.stringify(portfolio));
  reordered.transactions.reverse();
  assert.equal(engine.safePortfolio(reordered),false);
});

test('rejects duplicate transaction identifiers',()=>{
  const engine=loadEngine();
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','500','60000')).portfolio;
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'ETH','300','2000')).portfolio;
  const duplicate=JSON.parse(JSON.stringify(portfolio));
  duplicate.transactions[1].id=duplicate.transactions[0].id;
  assert.equal(engine.safePortfolio(duplicate),false);
});

test('rejects initial capital outside the limits enforced at portfolio creation',()=>{
  const engine=loadEngine();
  const portfolio=engine.createPortfolio('10000');
  portfolio.initialCapitalMicro='100000000000001';
  portfolio.cashMicro=portfolio.initialCapitalMicro;
  assert.equal(engine.safePortfolio(portfolio),false);
});

test('validates asset symbols against the supplied market catalogue',()=>{
  const engine=loadEngine();
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','500','60000')).portfolio;
  const unsupported=JSON.parse(JSON.stringify(portfolio));
  unsupported.assets.FAKE=unsupported.assets.BTC;
  delete unsupported.assets.BTC;
  unsupported.transactions[0].symbol='FAKE';
  assert.equal(engine.safePortfolio(unsupported,['BTC','ETH']),false);
  assert.equal(engine.safePortfolio(portfolio,['BTC','ETH']),true);
});

test('trade execution rejects previews whose fee or net amount was altered',()=>{
  const engine=loadEngine();
  const portfolio=engine.createPortfolio('10000');
  const preview=engine.previewBuy(portfolio,'BTC','1000','60000');
  const altered={...preview,feeMicro:'0',netMicro:preview.grossMicro};
  assert.throws(()=>engine.applyTrade(portfolio,altered));
  assert.equal(engine.safePortfolio(engine.applyTrade(portfolio,preview).portfolio),true);
});

test('ignores zero-price historical candles instead of treating them as market values',()=>{
  const engine=loadEngine();
  const firstClose=Date.UTC(2026,2,2,23,59,59,999);
  const secondClose=Date.UTC(2026,2,3,23,59,59,999);
  let portfolio=engine.createPortfolio('10000');
  portfolio.createdAt=new Date(firstClose-86400000).toISOString();
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','1000','10000')).portfolio;
  const points=engine.buildDailyPerformance(portfolio,{
    BTC:[[firstClose,'0'],[secondClose,'10000']]
  },firstClose-86400000);
  assert.deepEqual(Array.from(points,point=>point.timestamp),[Date.parse(portfolio.createdAt),secondClose]);
});

test('portfolio store refuses backups containing symbols outside its live catalogue',()=>{
  const engine=loadEngine();
  const localValues=new Map();
  const localStorage={
    getItem:key=>localValues.has(key)?localValues.get(key):null,
    setItem:(key,value)=>localValues.set(key,value),
    removeItem:key=>localValues.delete(key)
  };
  const context=vm.createContext({
    window:{
      AtlasPortfolioEngine:engine,
      AtlasMarketData:{assets:[{symbol:'BTC'},{symbol:'ETH'}]}
    },
    localStorage,
    console:{warn(){}}
  });
  const storeSource=fs.readFileSync(path.join(__dirname,'..','js','portfolio-store.js'),'utf8');
  vm.runInContext(storeSource,context,{filename:'portfolio-store.js'});
  const store=context.window.AtlasPortfolioStore;
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','500','60000')).portfolio;
  assert.equal(store.save(portfolio),undefined);
  const unsupported=JSON.parse(JSON.stringify(portfolio));
  unsupported.assets.FAKE=unsupported.assets.BTC;
  delete unsupported.assets.BTC;
  unsupported.transactions[0].symbol='FAKE';
  assert.throws(()=>store.save(unsupported));
  assert.throws(()=>store.parseBackup(JSON.stringify(unsupported)));
});

test('rejects duplicate transaction timestamps in the ordered ledger',()=>{
  const engine=loadEngine();
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','500','60000')).portfolio;
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'ETH','300','2000')).portfolio;
  const duplicate=JSON.parse(JSON.stringify(portfolio));
  duplicate.transactions[1].timestamp=duplicate.transactions[0].timestamp;
  assert.equal(engine.safePortfolio(duplicate),false);
});

test('benchmark series never turns a zero reference price into a 100 percent loss',()=>{
  const engine=loadEngine();
  const firstClose=Date.UTC(2026,4,2,23,59,59,999);
  const secondClose=Date.UTC(2026,4,3,23,59,59,999);
  const points=[
    {timestamp:firstClose,valueMicro:'10000000000',kind:'daily-close'},
    {timestamp:secondClose,valueMicro:'10000000000',kind:'daily-close'}
  ];
  const benchmark=engine.buildBenchmarkPerformance(
    points,
    {BTC:[[firstClose,'40000'],[secondClose,'0']],ETH:[[firstClose,'2000'],[secondClose,'2100']]},
    '10000000000','BTC'
  );
  assert.deepEqual(Array.from(benchmark.points,point=>point.timestamp),[firstClose]);
});
