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
  assert.equal(bought.cashMicro,'8999000000');
  assert.equal(bought.totalFeesMicro,'1000000');
  assert.equal(Boolean(bought.assets.BTC),true);
  assert.equal(bought.assets.BTC.costBasisMicro,'1001000000');
  assert.equal(engine.safePortfolio(bought),true);
});

test('partial sale updates cash, remaining units and realized P&L',()=>{
  const engine=loadEngine();
  let portfolio=engine.createPortfolio('10000');
  portfolio=engine.applyTrade(portfolio,engine.previewBuy(portfolio,'BTC','1000','60000')).portfolio;
  const quantity=engine.unitsToString(BigInt(portfolio.assets.BTC.quantityUnits)/2n,8,8);
  portfolio=engine.applyTrade(portfolio,engine.previewSell(portfolio,'BTC',quantity,'66000')).portfolio;
  assert.ok(BigInt(portfolio.cashMicro)>BigInt('8999000000'));
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

test('fee setting accepts zero through two percent and rejects larger values',()=>{
  const engine=loadEngine();
  const portfolio=engine.createPortfolio('10000');
  assert.equal(engine.setFeeBps(portfolio,'0.25').feeBps,25);
  assert.equal(engine.setFeeBps(portfolio,'0').feeBps,0);
  assert.throws(()=>engine.setFeeBps(portfolio,'2.01'));
});
