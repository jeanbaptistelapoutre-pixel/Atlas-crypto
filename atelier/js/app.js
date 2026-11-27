(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const engine = window.AtlasPortfolioEngine;
  const store = window.AtlasPortfolioStore;
  const fmt = window.AtlasFormat;
  let portfolio = store.load();
  let markets = [];
  let marketBySymbol = {};
  let marketsUpdatedAt = null;
  let marketBusy = false;
  let tradeSide = 'buy';
  let currentPreview = null;
  let historyInfo = null;
  let historyPoints = [];
  let historyRange = '30';
  let historyBusy = false;
  let historyRefreshQueued = false;
  let historyError = null;

  const setupPanel = $('#portfolio-setup');
  const dashboard = $('#portfolio-dashboard');
  const marketState = $('#market-state');
  const marketStateText = $('#market-state-text');
  const tradeDialog = $('#trade-dialog');
  const settingsDialog = $('#settings-dialog');
  const confirmDialog = $('#confirm-dialog');

  function formatSignedMicro(value) {
    const n = Number(BigInt(value)) / 1e6;
    const abs = fmt.formatMoney(Math.abs(n));
    if (n > 0) return '+' + abs;
    if (n < 0) return '−' + abs;
    return abs;
  }
  function pnlClass(value) {
    const n = BigInt(value);
    return n > 0n ? 'positive' : n < 0n ? 'negative' : '';
  }
  function percentFromMicro(pnl, base) {
    const denominator = BigInt(base);
    if (denominator === 0n) return null;
    return Number(BigInt(pnl)) / Number(denominator) * 100;
  }
  function setMarketState(type, message) {
    marketState.className = 'market-state ' + type;
    marketStateText.textContent = message;
  }
  function canTrade() {
    return markets.length > 0 && marketsUpdatedAt && (Date.now() - Date.parse(marketsUpdatedAt) < 120000);
  }
  function save() {
    store.save(portfolio);
  }
  function download(filename, content, type) {
    const blob = new Blob([content], {type});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  function renderMode() {
    setupPanel.hidden = Boolean(portfolio);
    dashboard.hidden = !portfolio;
    const storageIssue=store.getLoadIssue();
    $('#storage-warning').hidden=!storageIssue;
    $('#storage-warning-text').textContent=storageIssue||'';
    $('#setup-form').hidden=Boolean(storageIssue);
    if (portfolio) renderDashboard();
  }

  function renderMarketList() {
    const target = $('#market-list');
    if (!markets.length) {
      target.innerHTML = '<div class="market-loading">Aucun cours disponible pour le moment. Vérifiez votre connexion ou réessayez plus tard.</div>';
      return;
    }
    target.innerHTML = markets.map(item => {
      const changeClass = item.change24h >= 0 ? 'positive' : 'negative';
      return '<div class="market-row"><div class="market-asset"><span class="asset-icon">'+fmt.escapeHtml(item.mark)+'</span><div><strong>'+fmt.escapeHtml(item.name)+'</strong><small>'+fmt.escapeHtml(item.symbol)+'/USDC</small></div></div><span class="market-price">'+fmt.formatPrice(item.price)+'</span><span class="market-change '+changeClass+'">'+fmt.formatPct(item.change24h)+'</span><button class="text-button market-buy" type="button" data-market-buy="'+fmt.escapeHtml(item.symbol)+'">Acheter</button></div>';
    }).join('');
  }

  function renderHoldings(valuation) {
    const body = $('#holdings-body');
    const empty = $('#holdings-empty');
    if (!valuation.positions.length) {
      body.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    const bySymbol = Object.fromEntries(markets.map(item => [item.symbol,item]));
    body.innerHTML = valuation.positions.map(position => {
      const asset = bySymbol[position.symbol] || {name:position.symbol,mark:'◈'};
      const qty = engine.unitsToString(position.quantityUnits,8,8);
      const price = position.missingPrice ? 'Indisponible' : fmt.formatPrice(engine.unitsToString(position.priceUnits,8,8));
      const value = position.missingPrice ? '—' : fmt.formatUsdc(position.marketValueMicro);
      const pnl = position.missingPrice ? '—' : formatSignedMicro(position.unrealizedPnlMicro);
      const cls = position.missingPrice ? '' : pnlClass(position.unrealizedPnlMicro);
      return '<tr><td><div class="asset-cell"><span class="asset-icon">'+fmt.escapeHtml(asset.mark)+'</span><span><strong>'+fmt.escapeHtml(asset.name)+'</strong><small>'+fmt.escapeHtml(position.symbol)+'</small></span></div></td><td>'+fmt.formatQty(qty,8)+' '+fmt.escapeHtml(position.symbol)+'</td><td>'+price+'</td><td>'+value+'</td><td class="'+cls+'">'+pnl+'</td><td><button class="text-button" type="button" data-holding-sell="'+fmt.escapeHtml(position.symbol)+'">Vendre</button></td></tr>';
    }).join('');
  }

  function renderHistory() {
    const body = $('#history-body');
    const empty = $('#transactions-empty');
    const rows = portfolio.transactions.slice(0,12);
    empty.hidden = rows.length > 0;
    body.innerHTML = rows.map(tx => {
      const sideLabel = tx.side === 'buy' ? 'ACHAT' : 'VENTE';
      const sideClass = tx.side === 'buy' ? 'side-buy' : 'side-sell';
      const asset = marketBySymbol[tx.symbol] || {name:tx.symbol};
      return '<tr><td>'+fmt.escapeHtml(fmt.formatDate(tx.timestamp))+'</td><td class="'+sideClass+'">'+sideLabel+'</td><td><strong>'+fmt.escapeHtml(tx.symbol)+'</strong></td><td>'+fmt.formatQty(tx.quantity,8)+'</td><td>'+fmt.formatPrice(tx.price)+'</td><td>'+fmt.formatUsdc(tx.feeMicro)+'</td></tr>';
    }).join('');
  }

  function renderDashboard() {
    if (!portfolio) return;
    marketBySymbol = Object.fromEntries(markets.map(item => [item.symbol,item]));
    const valuation = engine.valuePortfolio(portfolio,marketBySymbol);
    $('#cash-balance').textContent = fmt.formatUsdc(portfolio.cashMicro);
    $('#realized-pnl').textContent = formatSignedMicro(portfolio.realizedPnlMicro);
    $('#realized-pnl').className = pnlClass(portfolio.realizedPnlMicro);
    $('#unrealized-pnl').textContent = valuation.complete ? formatSignedMicro(valuation.unrealizedPnlMicro) : 'Indisponible';
    $('#unrealized-pnl').className = valuation.complete ? pnlClass(valuation.unrealizedPnlMicro) : '';
    $('#portfolio-value').textContent = valuation.complete ? fmt.formatUsdc(valuation.totalValueMicro) : 'Cours incomplets';
    const pnl = valuation.totalPnlMicro;
    if (valuation.complete && pnl !== null) {
      const percent = percentFromMicro(pnl,portfolio.initialCapitalMicro);
      $('#portfolio-performance').textContent = formatSignedMicro(pnl)+' · '+fmt.formatPct(percent)+' depuis la création';
      $('#portfolio-performance').className = pnlClass(pnl);
    } else {
      $('#portfolio-performance').textContent = 'Valorisation partielle : un ou plusieurs cours sont indisponibles.';
      $('#portfolio-performance').className = '';
    }
    renderHoldings(valuation);
    renderHistory();
    const updated = marketsUpdatedAt ? fmt.formatDate(marketsUpdatedAt) : 'Aucune donnée reçue';
    $('#last-updated').textContent = marketsUpdatedAt ? 'Dernière réception : '+updated+(canTrade()?'':' · données possiblement périmées') : 'Cours en attente…';
    $('#portfolio-storage-note').textContent = '◈ Portefeuille enregistré localement dans ce navigateur · Capital initial : '+fmt.formatUsdc(portfolio.initialCapitalMicro);
  }

  function visibleHistoryPoints() {
    if(historyRange==='all'||!historyPoints.length)return historyPoints;
    const latest=historyPoints[historyPoints.length-1].timestamp;
    const cutoff=latest-Number(historyRange)*86400000;
    const filtered=historyPoints.filter(point=>point.timestamp>=cutoff);
    return filtered.length?filtered:[historyPoints[historyPoints.length-1]];
  }

  function renderPerformancePanel() {
    const panel=$('#performance-panel');
    const empty=$('#history-empty');
    const statusLabel=$('#history-status-label');
    const status=$('#history-status');
    const svg=$('#performance-chart');
    const visible=visibleHistoryPoints();
    panel.hidden=visible.length===0;
    empty.hidden=visible.length>0;
    document.querySelectorAll('[data-history-range]').forEach(button=>{
      const active=button.dataset.historyRange===historyRange;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    if(!visible.length) {
      $('#history-points').textContent='0';
      if(historyError) {
        empty.querySelector('strong').textContent='Historique temporairement indisponible.';
        empty.querySelector('p').textContent=historyError+' Vos transactions restent enregistrées ; vous pourrez réessayer plus tard.';
        statusLabel.textContent='SOURCE INDISPONIBLE';
      } else {
        empty.querySelector('strong').textContent='Votre historique se construit.';
        empty.querySelector('p').textContent='La première valorisation apparaîtra lorsque des clôtures journalières complètes seront disponibles. Les montants seront reconstruits à partir de vos transactions et des prix historiques Binance, en UTC.';
        statusLabel.textContent='EN ATTENTE';
      }
      return;
    }

    const first=visible[0];
    const last=visible[visible.length-1];
    const firstValue=Number(BigInt(first.valueMicro))/1e6;
    const lastValue=Number(BigInt(last.valueMicro))/1e6;
    const periodReturn=firstValue>0?(lastValue/firstValue-1)*100:0;
    $('#history-return').textContent=fmt.formatPct(periodReturn);
    $('#history-return').className=periodReturn>0?'positive':periodReturn<0?'negative':'';
    $('#history-range-label').textContent=historyRange==='all'
      ?(historyInfo?.truncated?'Période disponible · 1 000 jours maximum':'Depuis la création du portefeuille')
      :'Sur les '+historyRange+' derniers jours';
    $('#history-points').textContent=String(visible.length);

    let peak=0;
    let maxDrawdown=0;
    visible.forEach(point=>{
      const value=Number(BigInt(point.valueMicro))/1e6;
      peak=Math.max(peak,value);
      if(peak>0)maxDrawdown=Math.min(maxDrawdown,(value/peak-1)*100);
    });
    $('#history-drawdown').textContent=fmt.formatPct(maxDrawdown);
    $('#history-drawdown').className=maxDrawdown<0?'negative':'';

    const width=900,height=270,left=82,right=22,top=18,bottom=37;
    const plotWidth=width-left-right,plotHeight=height-top-bottom;
    const values=visible.map(point=>Number(BigInt(point.valueMicro))/1e6);
    let min=Math.min(...values),max=Math.max(...values);
    if(min===max){const pad=Math.max(Math.abs(min)*.005,1);min-=pad;max+=pad;}
    else {const pad=(max-min)*.12;min-=pad;max+=pad;}
    const xAt=index=>left+(visible.length<=1?plotWidth/2:index/(visible.length-1)*plotWidth);
    const yAt=value=>top+(max-value)/(max-min)*plotHeight;
    const coords=values.map((value,index)=>[xAt(index),yAt(value)]);
    const path=coords.map((point,index)=>(index?'L':'M')+point[0].toFixed(2)+' '+point[1].toFixed(2)).join(' ');
    const area=path+' L '+coords[coords.length-1][0].toFixed(2)+' '+(top+plotHeight)+' L '+coords[0][0].toFixed(2)+' '+(top+plotHeight)+' Z';
    const grid=[0,1,2,3].map(index=>{
      const value=max-(max-min)*index/3;
      const y=top+plotHeight*index/3;
      const label=fmt.formatUsdc(String(Math.round(value*1e6)));
      return '<line x1="'+left+'" y1="'+y+'" x2="'+(width-right)+'" y2="'+y+'" class="chart-grid"/><text x="'+(left-12)+'" y="'+(y+4)+'" class="chart-axis-label" text-anchor="end">'+label+'</text>';
    }).join('');
    const dateIndexes=[0,Math.floor((visible.length-1)/3),Math.floor((visible.length-1)*2/3),visible.length-1].filter((value,index,array)=>array.indexOf(value)===index);
    const dates=dateIndexes.map(index=>{
      const date=new Date(visible[index].timestamp);
      const label=new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'short',timeZone:'UTC'}).format(date);
      return '<text x="'+xAt(index)+'" y="'+(height-10)+'" class="chart-axis-label" text-anchor="middle">'+label+'</text>';
    }).join('');
    const latest=coords[coords.length-1];
    svg.innerHTML='<defs><linearGradient id="atelier-history-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2962ff" stop-opacity=".28"/><stop offset="100%" stop-color="#2962ff" stop-opacity="0"/></linearGradient></defs>'+grid+'<path d="'+area+'" fill="url(#atelier-history-fill)"/><path d="'+path+'" class="chart-line"/><circle cx="'+latest[0]+'" cy="'+latest[1]+'" r="4.5" class="chart-last-point"/>'+dates;
    svg.setAttribute('aria-label','Valeur du portefeuille aux clôtures journalières, de '+fmt.formatDate(first.timestamp)+' à '+fmt.formatDate(last.timestamp));
    const notices=[];
    if(historyInfo?.truncated)notices.push('Affichage limité aux 1 000 dernières clôtures journalières.');
    if(historyInfo?.errors?.length)notices.push('Données historiques manquantes pour '+historyInfo.errors.map(item=>item.symbol).join(', ')+'. Certains jours peuvent être absents.');
    if(!notices.length)notices.push('Valeurs reconstruites à partir des transactions enregistrées et des clôtures journalières UTC de Binance Spot. Les journées non terminées ne sont pas affichées.');
    if(historyInfo?.updatedAt)notices.push('Dernière réception de données : '+fmt.formatDate(historyInfo.updatedAt)+'.');
    status.textContent=notices.join(' ');
    statusLabel.textContent=(historyInfo?.truncated||historyInfo?.errors?.length)?'HISTORIQUE PARTIEL':'CLÔTURES JOURNALIÈRES';
    $('#history-source-label').textContent=historyInfo?.source||'Binance Spot · UTC';
  }

  async function refreshPerformanceHistory(force=false) {
    if(!portfolio)return;
    if(historyBusy){historyRefreshQueued=true;return;}
    historyBusy=true;
    historyError=null;
    const requestedPortfolio=portfolio;
    $('#history-status-label').textContent='CHARGEMENT…';
    try {
      const loadedHistory=await window.AtlasHistoryData.getDailyHistory(requestedPortfolio,{force});
      if(portfolio!==requestedPortfolio){historyRefreshQueued=true;return;}
      historyInfo=loadedHistory;
      historyPoints=engine.buildDailyPerformance(requestedPortfolio,historyInfo.candlesBySymbol,historyInfo.rangeStart);
      renderPerformancePanel();
    } catch(error) {
      if(portfolio!==requestedPortfolio){historyRefreshQueued=true;return;}
      console.warn('Atelier : historique de valorisation indisponible.',error);
      historyError=error.message;
      historyPoints=[];
      historyInfo=null;
      renderPerformancePanel();
    } finally {
      historyBusy=false;
      if(historyRefreshQueued) {
        historyRefreshQueued=false;
        refreshPerformanceHistory();
      }
    }
  }

  function renderTradeAssetOptions(preferred) {
    const select = $('#trade-asset');
    const available = markets.length ? markets : window.AtlasMarketData.assets;
    select.innerHTML = available.map(asset => '<option value="'+fmt.escapeHtml(asset.symbol)+'">'+fmt.escapeHtml(asset.name)+' ('+fmt.escapeHtml(asset.symbol)+')</option>').join('');
    if(preferred && available.some(asset => asset.symbol===preferred)) select.value=preferred;
  }

  function openTrade(symbol) {
    if (!portfolio) return;
    if (!canTrade()) {
      setMarketState('error','Les cours ne sont pas suffisamment récents pour simuler une opération. Actualisez les données avant de réessayer.');
      return;
    }
    renderTradeAssetOptions(symbol);
    tradeSide='buy';
    $('#trade-amount').value='';
    $('#trade-error').textContent='';
    updateTradeSide();
    renderTradePreview();
    tradeDialog.showModal();
  }

  function updateTradeSide() {
    document.querySelectorAll('[data-side]').forEach(button => {
      const active=button.dataset.side===tradeSide;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    $('#trade-amount-label').textContent=tradeSide==='buy'?'Montant à investir (hors frais)':'Quantité à vendre';
    $('#trade-amount-unit').textContent=tradeSide==='buy'?'USDC':$('#trade-asset').value;
    $('#trade-balance-label').textContent=tradeSide==='buy'?'Solde disponible':'Quantité disponible';
    $('#preview-total-label').textContent=tradeSide==='buy'?'Total débité':'Net crédité';
    const submit=$('#trade-submit');
    submit.classList.toggle('buy-action',tradeSide==='buy');
    submit.classList.toggle('sell-action',tradeSide==='sell');
    submit.textContent=tradeSide==='buy'?'Confirmer l’achat simulé':'Confirmer la vente simulée';
    $('#trade-warning').textContent='Exécution simulée au dernier prix public reçu. Le spread et le slippage réels ne sont pas modélisés dans cette première version.';
    const symbol=$('#trade-asset').value;
    const holding=portfolio.assets[symbol];
    $('#trade-balance').textContent=tradeSide==='buy'?fmt.formatUsdc(portfolio.cashMicro):(holding?fmt.formatQty(engine.unitsToString(holding.quantityUnits,8,8),8)+' '+symbol:'0 '+symbol);
  }

  function renderTradePreview() {
    currentPreview=null;
    const symbol=$('#trade-asset').value;
    const market=marketBySymbol[symbol];
    const amount=$('#trade-amount').value;
    const submit=$('#trade-submit');
    $('#trade-error').textContent='';
    if(!market||!amount) {
      $('#preview-price').textContent=market?fmt.formatPrice(market.price):'—';
      $('#preview-quantity').textContent='—';
      $('#preview-gross').textContent='—';
      $('#preview-fee').textContent='—';
      $('#preview-total').textContent='—';
      submit.disabled=true;
      return;
    }
    try {
      const preview=tradeSide==='buy'
        ?engine.previewBuy(portfolio,symbol,amount,market.price)
        :engine.previewSell(portfolio,symbol,amount,market.price);
      currentPreview=preview;
      $('#preview-price').textContent=fmt.formatPrice(market.price);
      $('#preview-quantity').textContent=fmt.formatQty(engine.unitsToString(preview.quantityUnits,8,8),8)+' '+symbol;
      $('#preview-gross').textContent=fmt.formatUsdc(preview.grossMicro);
      $('#preview-fee').textContent=fmt.formatUsdc(preview.feeMicro);
      $('#preview-total').textContent=fmt.formatUsdc(preview.netMicro);
      submit.disabled=!canTrade();
    } catch(error) {
      $('#preview-price').textContent=fmt.formatPrice(market.price);
      $('#preview-quantity').textContent='—';
      $('#preview-gross').textContent='—';
      $('#preview-fee').textContent='—';
      $('#preview-total').textContent='—';
      $('#trade-error').textContent=error.message;
      submit.disabled=true;
    }
  }

  async function refreshMarkets(force=false) {
    if(marketBusy)return;
    marketBusy=true;
    if(!markets.length)setMarketState('loading','Connexion à la source publique Binance Spot…');
    try {
      const result=await window.AtlasMarketData.getMarkets({force});
      markets=result.items;
      marketsUpdatedAt=result.updatedAt;
      marketBySymbol=Object.fromEntries(markets.map(item=>[item.symbol,item]));
      renderMarketList();
      if(portfolio)renderDashboard();
      setMarketState('success','Cours de référence reçus depuis Binance Spot · '+fmt.formatDate(marketsUpdatedAt)+'.');
      if(tradeDialog.open) {updateTradeSide();renderTradePreview();}
    } catch(error) {
      console.error('Atelier market data:',error);
      const hasOld=markets.length>0;
      setMarketState(hasOld?'error':'error',hasOld?'Actualisation impossible. Derniers cours reçus : '+fmt.formatDate(marketsUpdatedAt)+'. Les nouvelles opérations sont suspendues si les données ont plus de 2 minutes.':error.message+' Aucune transaction ne peut être simulée sans cours vérifiable.');
      if(!hasOld)renderMarketList();
      if(portfolio)renderDashboard();
      if(tradeDialog.open)renderTradePreview();
    } finally {marketBusy=false;}
  }

  function exportJson() {
    if(!portfolio)return;
    download('atlas-atelier-portefeuille-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(portfolio,null,2),'application/json;charset=utf-8');
  }
  function csvCell(value) {
    const text=String(value??'');
    return '"'+text.replace(/"/g,'""')+'"';
  }
  function exportCsv() {
    if(!portfolio||!portfolio.transactions.length)return;
    const rows=[['Date','Opération','Actif','Quantité','Prix de référence (USDC)','Montant brut (USDC)','Frais (USDC)','Débit/crédit net (USDC)','P&L réalisé (USDC)','Source']];
    for(const tx of [...portfolio.transactions].reverse()) {
      rows.push([tx.timestamp,tx.side==='buy'?'Achat':'Vente',tx.symbol,tx.quantity,tx.price,engine.unitsToString(tx.grossMicro,6,6),engine.unitsToString(tx.feeMicro,6,6),engine.unitsToString(tx.netMicro,6,6),engine.unitsToString(tx.realizedPnlMicro||'0',6,6),tx.source||'']);
    }
    const csv='\uFEFF'+rows.map(row=>row.map(csvCell).join(';')).join('\r\n');
    download('atlas-atelier-transactions-'+new Date().toISOString().slice(0,10)+'.csv',csv,'text/csv;charset=utf-8');
  }

  function openConfirm(title,message,callback) {
    $('#confirm-title').textContent=title;
    $('#confirm-text').textContent=message;
    confirmDialog.callback=callback;
    confirmDialog.showModal();
  }
  confirmDialog.addEventListener('close',()=>{
    if(confirmDialog.returnValue==='confirm'&&typeof confirmDialog.callback==='function')confirmDialog.callback();
    confirmDialog.callback=null;
  });

  // Initial setup / onboarding
  $('#setup-form').addEventListener('submit',event=>{
    event.preventDefault();
    if(store.getLoadIssue()) {
      $('#setup-error').textContent='Les anciennes données doivent d’abord être récupérées ou supprimées explicitement.';
      return;
    }
    $('#setup-error').textContent='';
    try {
      portfolio=engine.createPortfolio($('#initial-capital').value);
      save();
      renderMode();
      refreshPerformanceHistory();
      setMarketState(markets.length?'success':'loading',markets.length?'Portefeuille créé. Les cours de référence sont disponibles.':'Portefeuille créé. En attente des cours de référence.');
    } catch(error) {
      alert(error.message);
    }
  });
  document.querySelectorAll('[data-capital]').forEach(button=>button.addEventListener('click',()=>{
    $('#initial-capital').value=button.dataset.capital;
    document.querySelectorAll('[data-capital]').forEach(item=>item.classList.toggle('selected',item===button));
  }));
  $('#initial-capital').addEventListener('input',()=>{
    document.querySelectorAll('[data-capital]').forEach(item=>item.classList.toggle('selected',item.dataset.capital===$('#initial-capital').value));
  });

  // Trade ticket
  $('#trade-open').addEventListener('click',()=>openTrade());
  $('#first-trade').addEventListener('click',()=>openTrade());
  $('#market-list').addEventListener('click',event=>{
    const button=event.target.closest('[data-market-buy]');
    if(button)openTrade(button.dataset.marketBuy);
  });
  $('#holdings-body').addEventListener('click',event=>{
    const button=event.target.closest('[data-holding-sell]');
    if(button){openTrade(button.dataset.holdingSell);tradeSide='sell';updateTradeSide();$('#trade-amount').value='';renderTradePreview();}
  });
  document.querySelectorAll('[data-side]').forEach(button=>button.addEventListener('click',()=>{
    tradeSide=button.dataset.side;
    $('#trade-amount').value='';
    updateTradeSide();
    renderTradePreview();
  }));
  $('#trade-asset').addEventListener('change',()=>{updateTradeSide();renderTradePreview();});
  $('#trade-amount').addEventListener('input',renderTradePreview);
  $('#trade-form').addEventListener('submit',event=>{
    event.preventDefault();
    if(!currentPreview||!canTrade())return;
    try {
      const result=engine.applyTrade(portfolio,currentPreview,{source:'Binance Spot'});
      portfolio=result.portfolio;
      save();
      tradeDialog.close();
      renderDashboard();
      refreshPerformanceHistory();
      setMarketState('success',(tradeSide==='buy'?'Achat':'Vente')+' simulé(e) enregistré(e) dans votre historique local.');
    } catch(error) {
      $('#trade-error').textContent=error.message;
    }
  });
  $('#trade-close').addEventListener('click',()=>tradeDialog.close());

  // Settings
  $('#settings-open').addEventListener('click',()=>{
    $('#fee-rate').value=(portfolio.feeBps/100).toFixed(2);
    settingsDialog.showModal();
  });
  $('#settings-close').addEventListener('click',()=>settingsDialog.close());
  $('#settings-form').addEventListener('submit',event=>{
    event.preventDefault();
    try {
      portfolio=engine.setFeeBps(portfolio,$('#fee-rate').value);
      save();settingsDialog.close();renderDashboard();
      setMarketState('success','Paramètres enregistrés. La nouvelle commission s’appliquera aux prochaines opérations.');
    } catch(error) {alert(error.message);}
  });

  // Backup, restore and reset
  $('#export-json').addEventListener('click',exportJson);
  $('#export-csv').addEventListener('click',exportCsv);
  $('#import-json').addEventListener('click',()=>$('#import-file').click());
  $('#setup-import-json').addEventListener('click',()=>$('#import-file').click());
  $('#discard-corrupt-storage').addEventListener('click',()=>openConfirm(
    'Supprimer les données illisibles ?',
    'Les données actuellement enregistrées dans ce navigateur seront supprimées. Cette action ne peut pas les réparer. Vérifiez d’abord que vous ne disposez pas d’une sauvegarde à importer.',
    ()=>{
      try {
        store.clear();
        portfolio=null;
        renderMode();
        setMarketState(markets.length?'success':'loading','Les anciennes données locales ont été supprimées. Vous pouvez créer un nouveau portefeuille.');
      } catch(error) { alert(error.message); }
    }
  ));
  $('#import-file').addEventListener('change',async event=>{
    const file=event.target.files?.[0];
    if(!file)return;
    try {
      const imported=store.parseBackup(await file.text());
      openConfirm('Remplacer le portefeuille actuel ?', 'La sauvegarde importée remplacera le portefeuille et son historique actuels dans ce navigateur.',()=>{
        try {portfolio=imported;save();renderMode();refreshPerformanceHistory();setMarketState('success','Sauvegarde importée et enregistrée dans ce navigateur.');}
        catch(error){alert(error.message);}
      });
    } catch(error) {alert(error.message);}
    finally {event.target.value='';}
  });
  $('#reset-portfolio').addEventListener('click',()=>openConfirm('Réinitialiser le portefeuille ?', 'Cette action supprimera le capital, les positions et tout l’historique enregistrés dans ce navigateur. Pensez à exporter une sauvegarde avant de continuer.',()=>{
    try {store.clear();portfolio=null;historyInfo=null;historyPoints=[];historyError=null;renderMode();$('#initial-capital').value='10000';setMarketState(markets.length?'success':'loading','Portefeuille réinitialisé. Vous pouvez en créer un nouveau.');}
    catch(error){alert(error.message);}
  }));
  $('#refresh-prices').addEventListener('click',()=>refreshMarkets(true));
  $('#refresh-history').addEventListener('click',()=>refreshPerformanceHistory(true));
  document.querySelectorAll('[data-history-range]').forEach(button=>button.addEventListener('click',()=>{
    historyRange=button.dataset.historyRange;
    renderPerformancePanel();
  }));

  // First render and public market data refresh. No price is fabricated when the source is unavailable.
  renderMode();
  refreshMarkets(true);
  if(portfolio)refreshPerformanceHistory();
  window.setInterval(()=>refreshMarkets(true),window.AtlasMarketData.refreshInterval);
  window.setInterval(()=>{if(portfolio)refreshPerformanceHistory();},60*60*1000);
})();