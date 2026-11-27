const $=s=>document.querySelector(s);
let active='Toutes';
const parts=['Toutes',...new Set(CHAPTERS.map(x=>x.part))];
const filterEl=$('#filters');
const normalizeSearch=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr');
parts.forEach(part=>{
  const button=document.createElement('button');
  button.type='button';
  button.className='filter'+(part===active?' active':'');
  button.textContent=part;
  button.setAttribute('aria-pressed',String(part===active));
  button.addEventListener('click',()=>{
    active=part;
    renderCards();
    [...filterEl.children].forEach(item=>{
      const selected=item.textContent===part;
      item.classList.toggle('active',selected);
      item.setAttribute('aria-pressed',String(selected));
    });
  });
  filterEl.append(button);
});
function renderCards(){
  const query=normalizeSearch($('#search').value);
  const list=CHAPTERS.map((chapter,index)=>({...chapter,index})).filter(chapter=>{
    const inPart=active==='Toutes'||chapter.part===active;
    const searchable=[chapter.title,chapter.lead,chapter.detail,chapter.focus,chapter.caution].filter(Boolean).join(' ');
    return inPart&&normalizeSearch(searchable).includes(query);
  });
  $('#cards').replaceChildren(...list.map(chapter=>{
    const link=document.createElement('a');
    link.className='chapter';
    link.href='#chapitre-'+(chapter.index+1);
    link.innerHTML='<span class="index">'+String(chapter.index+1).padStart(2,'0')+'</span><span class="chapter-status">'+(window.ATLAS_LESSONS?.[chapter.index+1]?'Cours approfondi':'Synthèse à enrichir')+'</span><h3></h3><p></p><span class="bottom">Lire la fiche →</span>';
    link.querySelector('h3').textContent=chapter.title;
    link.querySelector('p').textContent=chapter.lead;
    return link;
  }));
  $('#search-status').textContent=list.length===0
    ?'Aucun chapitre ne correspond à votre recherche.'
    :list.length+' chapitre'+(list.length>1?'s':'')+' affiché'+(list.length>1?'s':'')+' sur '+CHAPTERS.length;
}
$('#search').addEventListener('input',renderCards);
renderCards();

const navToggle=$('#nav-toggle');
const primaryNav=$('#primary-nav');
const header=document.querySelector('.top');
if(navToggle&&primaryNav&&header){
  const setNavigationOpen=(open,restoreFocus=false)=>{
    header.classList.toggle('menu-open',open);
    navToggle.setAttribute('aria-expanded',String(open));
    if(restoreFocus)navToggle.focus();
  };
  navToggle.addEventListener('click',()=>{
    setNavigationOpen(navToggle.getAttribute('aria-expanded')!=='true');
  });
  primaryNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setNavigationOpen(false)));
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&navToggle.getAttribute('aria-expanded')==='true')setNavigationOpen(false,true);
  });
  window.addEventListener('resize',()=>{
    if(window.innerWidth>800)setNavigationOpen(false);
  });
}

let current=0;
function renderGeneric(c,i){
  const toc=[['comprendre','Comprendre'],['approfondir','Approfondir'],['retenir','À retenir'],['verifier','Vérifier ses acquis'],['sources','Sources']];
  $('#lesson-nav').innerHTML='<strong>Dans cette fiche</strong>'+toc.map(x=>'<a href="#'+x[0]+'">'+x[1]+'</a>').join('');
  $('#lesson-content').innerHTML=`
    <section id="comprendre"><h2>Comprendre le principe</h2><p>${c.lead}</p><figure class="figure"><svg viewBox="0 0 680 240" role="img" aria-label="Schéma conceptuel : règle, mécanisme et limites"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#8a6336"/><stop offset="1" stop-color="#dfbd83"/></linearGradient></defs><path d="M140 120H540" stroke="#8b7355" stroke-width="2" stroke-dasharray="7 8"/><g fill="#241d16" stroke="url(#g)" stroke-width="2"><rect x="15" y="75" width="180" height="90" rx="12"/><rect x="250" y="75" width="180" height="90" rx="12"/><rect x="485" y="75" width="180" height="90" rx="12"/></g><g fill="#f1ddbc" font-family="Arial" font-size="20" text-anchor="middle"><text x="105" y="127">Règle</text><text x="340" y="127">Mécanisme</text><text x="575" y="127">Limites</text></g></svg><figcaption>Cadre d’analyse : comprendre les règles, le fonctionnement et les compromis.</figcaption></figure></section>
    <section id="approfondir"><h2>Approfondir le mécanisme</h2><p>${c.detail}</p><p>${c.focus}</p></section>
    <section id="retenir"><h2>À retenir</h2><div class="callout"><strong>Le point de vigilance</strong><p>${c.caution}</p></div></section>
    <section id="verifier"><h2>Vérifier ses acquis</h2><div class="quiz"><strong>Quel réflexe est le plus pertinent ?</strong><div><button data-generic-answer="0">Se fier à une promesse de rendement</button><button data-generic-answer="1">Vérifier le mécanisme et ses risques</button><button data-generic-answer="0">Ignorer les limites techniques</button></div><p id="feedback" role="status"></p></div></section>
    <section id="sources"><h2>Sources pour aller plus loin</h2><p>Les références ci-dessous sont des points de départ documentaires ; elles ne valident pas individuellement toutes les affirmations de cette fiche.</p><p><a class="link" target="_blank" rel="noopener noreferrer" href="https://bitcoin.org/bitcoin.pdf">Livre blanc de Bitcoin ↗</a><br><a class="link" target="_blank" rel="noopener noreferrer" href="https://developer.bitcoin.org/">Documentation Bitcoin ↗</a><br><a class="link" target="_blank" rel="noopener noreferrer" href="https://ethereum.org/en/developers/docs/">Documentation Ethereum ↗</a><br><a class="link" target="_blank" rel="noopener noreferrer" href="https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica">Cadre MiCA (ESMA) ↗</a></p></section>`;
  document.querySelectorAll('[data-generic-answer]').forEach(b=>b.onclick=()=>{$('#feedback').textContent=b.dataset.genericAnswer==='1'?'Exact. Un raisonnement solide commence par l’analyse des mécanismes et des risques.':'Pas tout à fait. Il faut examiner les mécanismes et leurs limites, plutôt que chercher des certitudes.'});
  $('#lesson-meta').textContent='Synthèse introductive · approfondissements à développer';
}
/* Glossaire contextuel : définitions directement accessibles dans le texte. */
function atlasNormalizeTerm(value){
  return String(value||'').normalize('NFC').toLocaleLowerCase('fr-FR').replace(/[’‘`´]/g,"'").replace(/[‐‑‒–—]/g,'-').replace(/\s+/g,' ').trim();
}
function atlasEscapeRegex(value){return value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function atlasTermPattern(value){
  return atlasEscapeRegex(value)
    .replace(/ /g,'\\s+')
    .replace(/-/g,'[-‐‑‒–—]')
    .replace(/'/g,"['’‘`´]");
}
function atlasGlossaryEntries(chapterNumber, root){
  const selector=chapterNumber===1?'#glossaire .glossary-list':chapterNumber===2?'#btc-glossaire .btc-glossary':chapterNumber===3?'#ch3-glossaire .btc-glossary':chapterNumber===4?'#ch4-glossaire .btc-glossary':chapterNumber===5?'#ch5-glossaire .btc-glossary':chapterNumber===6?'#e6-glossaire .btc-glossary':chapterNumber>=11&&chapterNumber<=20?'#m'+chapterNumber+'-glossaire .market-glossary':null;
  const glossary=root.querySelector(selector);
  if(!glossary)return [];
  const entries=[...glossary.querySelectorAll('details')].map((detail,index)=>({
    label:detail.querySelector('summary')?.textContent.trim()||'',
    definition:detail.querySelector('p')?.textContent.trim()||'',
    aliases:[],
    id:`ch${chapterNumber}-g${index}`
  })).filter(item=>item.label&&item.definition);
  const addEntry=(label,definition,aliases=[])=>entries.push({label,definition,aliases,id:`ch${chapterNumber}-extra-${entries.length}`});
  if(chapterNumber===1){
    // These three notions already have their own explanatory block in this chapter.
    const excluded=new Set(['inflation','déflation','désinflation']);
    for(let i=entries.length-1;i>=0;i--){
      if(excluded.has(atlasNormalizeTerm(entries[i].label)))entries.splice(i,1);
    }
    const creditIndex=entries.findIndex(x=>atlasNormalizeTerm(x.label)==='crédit et principal');
    if(creditIndex>=0){
      const source=entries.splice(creditIndex,1)[0];
      addEntry('Crédit','Opération par laquelle un prêteur met des fonds à la disposition d’un emprunteur, qui s’engage à les rembourser.');
      addEntry('Principal du prêt','Montant emprunté qu’il reste à rembourser, sans compter les intérêts. C’est le principal qui diminue quand l’emprunteur rembourse le capital emprunté.',['principal']);
    }
    const valueIndex=entries.findIndex(x=>atlasNormalizeTerm(x.label)==='valeur nominale et valeur réelle');
    if(valueIndex>=0){
      entries.splice(valueIndex,1);
      addEntry('Valeur nominale','Montant affiché en euros : par exemple 100 € sur un billet ou un compte. Le chiffre ne tient pas, à lui seul, compte de l’évolution des prix.');
      addEntry('Valeur réelle','Ce que cette somme permet effectivement d’acheter après prise en compte de l’évolution des prix. Deux sommes nominalement identiques peuvent donc avoir des pouvoirs d’achat différents.');
    }
    const byLabel={
      'Intermédiaire des échanges':['intermédiaire des échanges'],
      'Réserve de valeur':['réserve de valeur'],
      'Double coïncidence des besoins':['double coïncidence des besoins'],
      'Monnaie fiduciaire':['monnaie fiduciaire'],
      'Monnaie scripturale':['monnaie scripturale'],
      'Monnaie centrale':['monnaie centrale'],
      'Réserves bancaires':['réserves bancaires','réserve bancaire'],
      'Instrument de paiement':['instrument de paiement','instruments de paiement'],
      'Créance':['créance','créances'],
      'Intérêt':['intérêt','intérêts'],
      'Pouvoir d’achat':['pouvoir d’achat',"pouvoir d'achat",'pouvoir d achat'],
      'Liquidité':['liquidité'],
      'Solvabilité':['solvabilité'],
      'Fonds propres':['fonds propres'],
      'Compensation':['compensation','compensations'],
      'Règlement':['règlement','règlements'],
      'Eurosystème':['Eurosystème'],
      'Unité de compte':['unité de compte','unités de compte']
    };
    entries.forEach(entry=>{const custom=byLabel[entry.label];if(custom)entry.aliases=custom;});
    // Common plural forms for glossary headings where the meaning remains identical.
    entries.forEach(entry=>{
      if(!entry.aliases.length){
        entry.aliases=[entry.label];
        if(!/[s)]$/i.test(entry.label))entry.aliases.push(entry.label+'s');
      }
    });
  } else if(chapterNumber===2){
    const aliases={
      'Pair-à-pair (P2P)':['pair-à-pair','pair à pair','P2P','peer-to-peer'],
      'Double dépense':['double dépense','doubles dépenses'],
      'Protocole':['protocole','protocoles'],
      'Nœud':['nœud','nœuds','noeud','noeuds'],
      'Nœud complet':['nœud complet','nœuds complets','noeud complet','noeuds complets'],
      'Mineur':['mineur','mineurs'],
      'Preuve de travail (Proof of Work)':['preuve de travail','proof of work','proof-of-work'],
      'Bloc de genèse':['bloc de genèse','blocs de genèse','genesis block'],
      'Confirmation':['confirmation','confirmations'],
      'Travail cumulé':['travail cumulé'],
      'Subvention de bloc':['subvention de bloc','subventions de bloc'],
      'Halving':['halving','halvings'],
      'Satoshi':['satoshi','satoshis','sat','sats'],
      'Pseudonymat':['pseudonymat','pseudonyme','pseudonymes'],
      'Consensus':['consensus'],
      'Réorganisation de chaîne':['réorganisation de chaîne','réorganisation de la chaîne','réorganisations de chaîne']
    };
    const extraAliases={
      'Bloc':['bloc','blocs'],
      'Empreinte cryptographique (hash)':['empreinte cryptographique','empreintes cryptographiques','empreinte de son en-tête','empreinte de l’en-tête','empreinte du bloc','hash','hashes'],
      'Sortie de transaction':['sortie de transaction','sorties de transaction'],
      'Mempool (réserve de transactions en attente)':['mempool','réserve de transactions en attente'],
      'Transaction de génération (coinbase)':['transaction de génération','transactions de génération','coinbase','coinbase transaction'],
      'Signature numérique':['signature numérique','signatures numériques'],
      'Cible de preuve de travail':['cible de preuve de travail','cible'],
      'Nonce':['nonce','nonces']
    };
    entries.forEach(entry=>{if(aliases[entry.label])entry.aliases=aliases[entry.label];else if(extraAliases[entry.label])entry.aliases=extraAliases[entry.label];});
    entries.forEach(entry=>{if(!entry.aliases.length){entry.aliases=[entry.label];if(!/[s)]$/i.test(entry.label))entry.aliases.push(entry.label+'s');}});
  } else if(chapterNumber===3){
    const aliases={
      'Registre distribué':['registre distribué','registres distribués','registre partagé','registres partagés','DLT'],
      'Blockchain':['blockchain','blockchains','chaîne de blocs','chaînes de blocs'],
      'Bloc':['bloc','blocs'],
      'En-tête de bloc':['en-tête de bloc','en-têtes de bloc','en-tête du bloc','en-têtes du bloc','header de bloc','headers de bloc'],
      'Hachage':['hachage','hachages'],
      'Fonction de hachage':['fonction de hachage','fonctions de hachage'],
      'Empreinte cryptographique (hash)':['empreinte cryptographique','empreintes cryptographiques','hash','hashes'],
      'Arbre de Merkle':['arbre de merkle','arbres de merkle','merkle tree'],
      'Racine de Merkle':['racine de merkle','racines de merkle','merkle root'],
      'Preuve d’inclusion':['preuve d’inclusion','preuves d’inclusion'],
      'Nœud':['nœud','nœuds','noeud','noeuds'],
      'Nœud complet':['nœud complet','nœuds complets','noeud complet','noeuds complets'],
      'Intégrité':['intégrité'],
      'Règles de consensus':['règles de consensus','règle de consensus'],
      'Mécanisme de consensus':['mécanisme de consensus','mécanismes de consensus'],
      'Preuve de travail (Proof of Work)':['preuve de travail','proof of work','proof-of-work','pow'],
      'Preuve d’enjeu (Proof of Stake)':['preuve d’enjeu','preuve d\'enjeu','proof of stake','pos'],
      'Validateur':['validateur','validateurs'],
      'Fourche (fork)':['fourche','fork','forks'],
      'Réorganisation':['réorganisation','réorganisations'],
      'Finalité':['finalité'],
      'Oracle':['oracle','oracles'],
      'Donnée hors chaîne':['donnée hors chaîne','données hors chaîne','off-chain'],
      'Blockchain publique':['blockchain publique','blockchains publiques','chaîne publique','chaînes publiques'],
      'Blockchain permissionnée (à permission)':['blockchain permissionnée','blockchains permissionnées','blockchain à permission','blockchains à permission']
    };
    entries.forEach(entry=>{if(aliases[entry.label])entry.aliases=aliases[entry.label];});
    entries.forEach(entry=>{if(!entry.aliases.length){entry.aliases=[entry.label];if(!/[s)]$/i.test(entry.label))entry.aliases.push(entry.label+'s');}});
  } else if(chapterNumber===4){
    const aliases={
      'Clé privée':['clé privée','clés privées','private key','private keys'],
      'Clé publique':['clé publique','clés publiques','public key','public keys'],
      'Paire de clés':['paire de clés','paires de clés','key pair','key pairs'],
      'Courbe elliptique':['courbe elliptique','courbes elliptiques','elliptic curve'],
      'Signature numérique':['signature numérique','signatures numériques','signature','signatures'],
      'ECDSA':['ECDSA'],
      'Schnorr':['Schnorr','signature Schnorr','signatures Schnorr'],
      'Adresse Bitcoin':['adresse Bitcoin','adresses Bitcoin','adresse bitcoin','adresses bitcoin','adresse de réception','adresses de réception'],
      'ScriptPubKey':['scriptPubKey','pubkey script','script de sortie','script de verrouillage'],
      'Portefeuille (wallet)':['portefeuille','portefeuilles','wallet','wallets'],
      'Phrase mnémonique':['phrase mnémonique','phrase mnemotechnique','phrase de récupération','phrases de récupération','seed phrase','seed phrases'],
      'Graine (seed)':['graine','graines','seed'],
      'BIP39':['BIP39','BIP 39'],
      'Portefeuille HD':['portefeuille HD','portefeuilles HD','wallet HD','HD wallet','HD wallets'],
      'BIP32':['BIP32','BIP 32'],
      'Clé publique étendue (xpub)':['xpub','clé publique étendue','clés publiques étendues'],
      'Multisignature (multisig)':['multisignature','multisignatures','multisig'],
      'UTXO':['UTXO','UTXOs','sortie non dépensée','sorties non dépensées'],
      'Confidentialité financière':['confidentialité financière','confidentialité','vie privée']
    };
    entries.forEach(entry=>{if(aliases[entry.label])entry.aliases=aliases[entry.label];});
  } else if(chapterNumber===5){
    const aliases={
      'Transaction':['transaction','transactions'],
      'Entrée (input)':['entrée','entrées','input','inputs'],
      'Sortie (output)':['sortie','sorties','output','outputs'],
      'UTXO':['UTXO','UTXOs','sortie non dépensée','sorties non dépensées'],
      'UTXO set':['UTXO set','ensemble des UTXO','ensemble des sorties non dépensées'],
      'Outpoint':['outpoint','outpoints'],
      'Txid':['txid','transaction id','identifiant de transaction'],
      'ScriptPubKey':['scriptPubKey','script pubkey','script de verrouillage','script de sortie'],
      'Monnaie rendue (change)':['monnaie rendue','change','sortie de change'],
      'Frais de transaction':['frais de transaction','frais','fee','fees'],
      'Satoshi (sat)':['satoshi','satoshis','sat','sats'],
      'Taux de frais (feerate)':['taux de frais','feerate','fee rate','sat/vB'],
      'Vbyte (vB)':['vbyte','vbytes','vB','taille virtuelle'],
      'Witness (témoin)':['witness','témoin','données de témoin'],
      'Mempool':['mempool','réserve de transactions en attente'],
      'Confirmation':['confirmation','confirmations'],
      'Double dépense':['double dépense','doubles dépenses'],
      'Coin selection':['coin selection','sélection des UTXO','sélection des entrées'],
      'Règles de consensus':['règles de consensus','règle de consensus','consensus'],
      'Politique de relais':['politique de relais','politiques de relais','relay policy','transaction relay policy']
    };
    entries.forEach(entry=>{if(aliases[entry.label])entry.aliases=aliases[entry.label];});
  } else if(chapterNumber===6){
    const aliases={
      'Ethereum':['ethereum','eth'],
      'Ether (ETH)':['ether','ETH','ether (ETH)'],
      'État (state)':['état','state','état partagé'],
      'Compte EOA':['EOA','compte EOA','compte contrôlé par une clé'],
      'Compte de contrat':['compte de contrat','contract account'],
      'Contrat intelligent (smart contract)':['contrat intelligent','contrats intelligents','smart contract','smart contracts'],
      'Solidity':['solidity'],
      'Bytecode':['bytecode','code compilé'],
      'Déploiement':['déploiement','déployer un contrat'],
      'EVM':['EVM','Ethereum Virtual Machine','machine virtuelle Ethereum'],
      'Transaction':['transaction','transactions'],
      'Gas':['gas'],
      'Gas limit':['gas limit','limite de gas'],
      'Gwei':['gwei'],
      'Base fee':['base fee','frais de base'],
      'Priority fee':['priority fee','frais de priorité'],
      'Storage':['storage','stockage persistant'],
      'Événement (event)':['événement','événements','event','events','logs'],
      'Oracle':['oracle','oracles'],
      'Validateur':['validateur','validateurs'],
      'Preuve d’enjeu (Proof of Stake)':['preuve d’enjeu','proof of stake','proof-of-stake','pos'],
      'Composabilité':['composabilité','composability'],
      'Réversion (revert)':['revert','réversion','reverted']
    };
    entries.forEach(entry=>{if(aliases[entry.label])entry.aliases=aliases[entry.label];});
  } else if(chapterNumber===11){
    const aliases={
      'Carnet d’ordres (order book)':["carnet d’ordres","carnet d'ordres","carnet d ordres","order book","carnets d’ordres"],
      'Bid':['bid','bids','meilleur bid','meilleurs bids'],
      'Ask':['ask','asks','meilleur ask','meilleurs asks'],
      'Spread':['spread','spreads','écart bid-ask','écart acheteur-vendeur'],
      'Liquidité':['liquidité'],
      'Profondeur (depth)':['profondeur','profondeurs','depth','profondeur du carnet','profondeur cumulée'],
      'Slippage':['slippage','slippages'],
      'Ordre au marché (market order)':["ordre au marché","ordres au marché","market order","market orders"],
      'Ordre limite (limit order)':["ordre limite","ordres limites","ordre à cours limité","ordres à cours limité","limit order","limit orders"],
      'Capitalisation boursière (market cap)':["capitalisation","capitalisations","capitalisation boursière","capitalisations boursières","market cap","market capitalization"]
    };
    entries.forEach(entry=>{if(aliases[entry.label])entry.aliases=aliases[entry.label];});
  } else if(chapterNumber===12){
    const aliases={
      'Chandelier japonais':['chandelier japonais','chandeliers japonais','bougie japonaise','bougies japonaises','candlestick','candlesticks'],
      'OHLC':['OHLC','open high low close'],
      'Ouverture (Open)':['ouverture','open','prix d’ouverture','prix d’ouverture de la période'],
      'Plus haut (High)':['plus haut','high','prix le plus haut','maximum de la période'],
      'Plus bas (Low)':['plus bas','low','prix le plus bas','minimum de la période'],
      'Clôture (Close)':['clôture','close','prix de clôture'],
      'Corps du chandelier':['corps du chandelier','corps de la bougie','corps'],
      'Mèche (ombre)':['mèche','mèches','ombre','ombres','wick','wicks'],
      'Bougie haussière':['bougie haussière','bougies haussières','chandelier haussier','chandeliers haussiers'],
      'Bougie baissière':['bougie baissière','bougies baissières','chandelier baissier','chandeliers baissiers'],
      'Unité de temps (timeframe)':['unité de temps','unités de temps','timeframe','timeframes','intervalle temporel'],
      'Volume échangé':['volume','volumes','volume échangé','volumes échangés','trading volume'],
      'Histogramme de volume':['histogramme de volume','barres de volume','volume histogram']
    };
    entries.forEach(entry=>{if(aliases[entry.label])entry.aliases=aliases[entry.label];});
  }
  return entries;
}
function atlasCreateTermButton(match, entry){
  const button=document.createElement('button');
  button.type='button';button.className='atlas-term';button.textContent=match;
  button.dataset.termTitle=entry.label;button.dataset.termDefinition=entry.definition;button.dataset.termId=entry.id;
  button.setAttribute('aria-label',`${match} — afficher la définition`);
  button.setAttribute('aria-expanded','false');
  return button;
}
function atlasDecorateTerms(chapterNumber, root){
  const entries=atlasGlossaryEntries(chapterNumber,root);
  if(!entries.length)return;
  const aliasMap=new Map();
  const patternParts=[];
  entries.sort((a,b)=>b.label.length-a.label.length).forEach(entry=>{
    const aliases=[...new Set([entry.label,...(entry.aliases||[])])].sort((a,b)=>b.length-a.length);
    aliases.forEach(alias=>{
      const normalized=atlasNormalizeTerm(alias);
      if(!normalized||aliasMap.has(normalized))return;
      aliasMap.set(normalized,entry);
      patternParts.push(atlasTermPattern(alias));
    });
  });
  if(!patternParts.length)return;
  const expression=new RegExp(`(?<![\\p{L}\\p{N}_])(?:${patternParts.join('|')})(?![\\p{L}\\p{N}_])`,'giu');
  const excluded='a,button,summary,script,style,code,pre,textarea,input,select,option,[role="img"],.glossary-list,.btc-glossary,.market-glossary,.quiz-question,.quiz-options,.quiz-suite,.btc-quiz-set,.atlas-term,svg';
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
    acceptNode(node){
      if(!node.nodeValue||!node.nodeValue.trim())return NodeFilter.FILTER_REJECT;
      const parent=node.parentElement;
      if(!parent||parent.closest(excluded))return NodeFilter.FILTER_REJECT;
      if(parent.closest('h1,h2'))return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  // One contextual definition per concept and per chapter: annotate only its first occurrence.
  const seenEntries=new Set();
  nodes.forEach(node=>{
    const text=node.nodeValue;expression.lastIndex=0;
    const matches=[...text.matchAll(expression)];if(!matches.length)return;
    const fragment=document.createDocumentFragment();let cursor=0;
    matches.forEach(match=>{
      const entry=aliasMap.get(atlasNormalizeTerm(match[0]));if(!entry)return;
      fragment.append(document.createTextNode(text.slice(cursor,match.index)));
      if(!seenEntries.has(entry.id)){
        fragment.append(atlasCreateTermButton(match[0],entry));
        seenEntries.add(entry.id);
      } else {
        fragment.append(document.createTextNode(match[0]));
      }
      cursor=match.index+match[0].length;
    });
    if(cursor===0)return;
    fragment.append(document.createTextNode(text.slice(cursor)));node.parentNode.replaceChild(fragment,node);
  });
}
function atlasBindContextualTooltip(){
  if(window.__atlasContextTooltipBound)return;
  window.__atlasContextTooltipBound=true;
  let activeTrigger=null,pinned=false,closeTimer=null;
  const tooltip=document.createElement('div');
  tooltip.className='atlas-term-popover';tooltip.id='atlas-term-popover';tooltip.setAttribute('role','tooltip');tooltip.hidden=true;
  const kicker=document.createElement('span');kicker.className='atlas-term-popover-kicker';kicker.textContent='DÉFINITION CONTEXTUELLE';
  const heading=document.createElement('strong');heading.className='atlas-term-popover-title';
  const body=document.createElement('p');body.className='atlas-term-popover-body';
  tooltip.append(kicker,heading,body);document.body.append(tooltip);
  const isHoverDevice=()=>window.matchMedia&&window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clearTimer=()=>{if(closeTimer){clearTimeout(closeTimer);closeTimer=null;}};
  const position=()=>{
    if(!activeTrigger||tooltip.hidden)return;
    const r=activeTrigger.getBoundingClientRect();
    const w=tooltip.getBoundingClientRect().width,h=tooltip.getBoundingClientRect().height;
    let left=r.left+r.width/2-w/2;left=Math.max(12,Math.min(left,window.innerWidth-w-12));
    let top=r.bottom+9;if(top+h>window.innerHeight-12)top=r.top-h-9;
    top=Math.max(10,Math.min(top,window.innerHeight-h-10));
    tooltip.style.left=`${left}px`;tooltip.style.top=`${top}px`;
  };
  const close=()=>{
    clearTimer();if(activeTrigger){activeTrigger.setAttribute('aria-expanded','false');activeTrigger.removeAttribute('aria-describedby');}
    activeTrigger=null;pinned=false;tooltip.hidden=true;
  };
  window.__atlasCloseContextTooltip=close;
  const open=(trigger,keepOpen)=>{
    clearTimer();if(activeTrigger&&activeTrigger!==trigger){activeTrigger.setAttribute('aria-expanded','false');activeTrigger.removeAttribute('aria-describedby');}
    activeTrigger=trigger;pinned=Boolean(keepOpen);
    heading.textContent=trigger.dataset.termTitle||trigger.textContent;
    body.textContent=trigger.dataset.termDefinition||'';
    tooltip.hidden=false;
    trigger.setAttribute('aria-expanded','true');trigger.setAttribute('aria-describedby',tooltip.id);
    position();
  };
  const scheduleClose=()=>{if(pinned)return;clearTimer();closeTimer=setTimeout(close,180);};
  document.addEventListener('pointerover',event=>{
    if(!isHoverDevice())return;
    const trigger=event.target.closest?.('.atlas-term');
    if(trigger&&trigger!==activeTrigger){open(trigger,false);return;}
    if(tooltip.contains(event.target))clearTimer();
  });
  document.addEventListener('pointerout',event=>{
    const trigger=event.target.closest?.('.atlas-term');
    if(trigger&&(!event.relatedTarget||!trigger.contains(event.relatedTarget))&&!tooltip.contains(event.relatedTarget))scheduleClose();
    if(tooltip.contains(event.target)&&(!event.relatedTarget||!tooltip.contains(event.relatedTarget))&&!activeTrigger?.contains(event.relatedTarget))scheduleClose();
  });
  document.addEventListener('click',event=>{
    const trigger=event.target.closest?.('.atlas-term');
    if(trigger){
      event.preventDefault();
      if(activeTrigger===trigger&&pinned){close();return;}
      open(trigger,true);return;
    }
    if(!tooltip.contains(event.target))close();
  });
  document.addEventListener('focusin',event=>{
    const trigger=event.target.closest?.('.atlas-term');
    if(trigger)open(trigger,false);
  });
  document.addEventListener('focusout',event=>{
    if(event.target.closest?.('.atlas-term')&&!pinned)scheduleClose();
  });
  tooltip.addEventListener('pointerover',clearTimer);
  tooltip.addEventListener('pointerleave',()=>{if(!pinned)scheduleClose();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!tooltip.hidden){const trigger=activeTrigger;close();trigger?.focus?.();}});
  window.addEventListener('resize',position,{passive:true});
  window.addEventListener('scroll',()=>{if(!tooltip.hidden)position();},{passive:true});
}
function initContextualGlossary(chapterNumber){
  if(window.__atlasCloseContextTooltip)window.__atlasCloseContextTooltip();
  const root=$('#lesson-content');if(!root)return;
  atlasDecorateTerms(chapterNumber,root);
  atlasBindContextualTooltip();
}

function initChapter5TransactionLab(chapterNumber){
  if(chapterNumber!==5)return;
  const amountInput=$('#ch5-send');
  const rateInput=$('#ch5-feerate');
  const feeOutput=$('#ch5-fee-result');
  const feeBtc=$('#ch5-fee-btc');
  const changeOutput=$('#ch5-change-result');
  const equation=$('#ch5-fee-equation');
  const status=$('#ch5-fee-status');
  if(!amountInput||!rateInput||!feeOutput||!feeBtc||!changeOutput||!equation||!status)return;
  const totalInputSats=1400000;
  const estimatedVsize=140;
  const formatBTC=sats=>(sats/100000000).toLocaleString('fr-FR',{minimumFractionDigits:8,maximumFractionDigits:8});
  const formatSats=sats=>Math.round(sats).toLocaleString('fr-FR');
  const update=()=>{
    const amountBTC=Number(amountInput.value);
    const rate=Number(rateInput.value);
    if(!Number.isFinite(amountBTC)||!Number.isFinite(rate)||amountBTC<=0||rate<1||rate>200||!Number.isInteger(rate)){
      feeOutput.textContent='—';
      feeBtc.textContent='—';
      changeOutput.textContent='—';
      equation.textContent='Corrige les valeurs pour obtenir un calcul.';
      status.textContent='Vérifie le montant (positif) et le taux de frais (un nombre entier entre 1 et 200 sat/vB).';
      status.classList.add('is-alert');return;
    }
    const paymentSats=Math.round(amountBTC*100000000);
    const feeSats=estimatedVsize*Math.round(rate);
    const changeSats=totalInputSats-paymentSats-feeSats;
    feeOutput.textContent=formatSats(feeSats)+' sats';
    feeBtc.textContent=formatBTC(feeSats)+' BTC';
    if(changeSats<0){
      changeOutput.textContent='Insuffisant';
      equation.textContent='Les entrées ne couvrent pas le paiement et les frais estimés.';
      status.textContent='Le montant demandé dépasse les fonds disponibles une fois les frais pris en compte. Réduis le paiement ou le taux de frais, ou sélectionne davantage d’UTXO.';
      status.classList.add('is-alert');return;
    }
    changeOutput.textContent=formatBTC(changeSats)+' BTC';
    equation.textContent=formatBTC(totalInputSats)+' BTC − '+formatBTC(paymentSats)+' BTC − '+formatBTC(feeSats)+' BTC = '+formatBTC(changeSats)+' BTC rendus.';
    status.textContent=changeSats===0?'Le calcul tombe juste : aucune sortie de monnaie rendue n’est nécessaire dans ce modèle.':'Simulation : les entrées couvrent le paiement et les frais. Le surplus devient une sortie de monnaie rendue.';
    status.classList.remove('is-alert');
  };
  [amountInput,rateInput].forEach(input=>input.addEventListener('input',update));
  $('#ch5-fee-reset')?.addEventListener('click',()=>{amountInput.value='0.009';rateInput.value='20';update();});
  update();
}
function initChapter6GasLab(chapterNumber){
  if(chapterNumber!==6)return;
  const usedInput=$('#e6-gas-used'),baseInput=$('#e6-base-fee'),tipInput=$('#e6-priority-fee');
  const totalPrice=$('#e6-total-price'),totalCost=$('#e6-total-cost'),gweiOutput=$('#e6-total-cost-eur');
  const burned=$('#e6-burned'),tip=$('#e6-tip'),status=$('#e6-fee-status');
  if(!usedInput||!baseInput||!tipInput||!totalPrice||!totalCost||!gweiOutput||!burned||!tip||!status)return;
  const formatETH=value=>value.toLocaleString('fr-FR',{minimumFractionDigits:0,maximumFractionDigits:9})+' ETH';
  const formatGwei=value=>Math.round(value).toLocaleString('fr-FR')+' gwei';
  const update=()=>{
    const used=Number(usedInput.value),base=Number(baseInput.value),priority=Number(tipInput.value);
    const valid=Number.isInteger(used)&&used>=21000&&used<=1000000&&Number.isFinite(base)&&base>=0&&base<=1000&&Number.isFinite(priority)&&priority>=0&&priority<=100;
    if(!valid){
      totalPrice.textContent='—';totalCost.textContent='—';gweiOutput.textContent='—';burned.textContent='—';tip.textContent='—';
      status.textContent='Vérifie les valeurs : gas utilisé entre 21 000 et 1 000 000, frais de base entre 0 et 1 000 gwei, priorité entre 0 et 100 gwei.';
      status.classList.add('is-alert');return;
    }
    const effectivePrice=base+priority;
    const totalGwei=used*effectivePrice;
    const totalETH=totalGwei/1e9;
    const baseETH=used*base/1e9;
    const priorityETH=used*priority/1e9;
    totalPrice.textContent=effectivePrice.toLocaleString('fr-FR',{maximumFractionDigits:2})+' gwei';
    totalCost.textContent=formatETH(totalETH);
    gweiOutput.textContent='Soit '+formatGwei(totalGwei);
    burned.textContent=formatETH(baseETH);
    tip.textContent=formatETH(priorityETH);
    status.textContent=used.toLocaleString('fr-FR')+' gas × '+effectivePrice.toLocaleString('fr-FR',{maximumFractionDigits:2})+' gwei = '+formatETH(totalETH)+'.';
    status.classList.remove('is-alert');
  };
  [usedInput,baseInput,tipInput].forEach(input=>input.addEventListener('input',update));
  $('#e6-fee-reset')?.addEventListener('click',()=>{
    usedInput.value='50000';baseInput.value='20';tipInput.value='2';update();
  });
  update();
}
function initLessonInteractions(chapterNumber){
  initContextualGlossary(chapterNumber);
  initChapter5TransactionLab(chapterNumber);
  initChapter6GasLab(chapterNumber);
  const amount=$('#calc-amount'), inflation=$('#calc-inflation'), years=$('#calc-years');
  if(amount&&inflation&&years){
    const updateCalculator=()=>{
      const a=Number(amount.value), r=Number(inflation.value), n=Number(years.value);
      const valid=Number.isFinite(a)&&Number.isFinite(r)&&Number.isFinite(n)&&a>0&&r>=0&&r<=100&&n>=1&&n<=100;
      if(!valid){$('#calc-result').textContent='—';$('#calc-future-basket').textContent='—';$('#calc-explanation').textContent='Saisis un montant positif, un taux entre 0 et 100 % et une durée entre 1 et 100 ans.';return}
      const real=a/Math.pow(1+r/100,n), future=a*Math.pow(1+r/100,n);
      $('#calc-result').textContent=real.toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
      $('#calc-future-basket').textContent=future.toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
      $('#calc-explanation').textContent=`Avec ces hypothèses, ${a.toLocaleString('fr-FR')} € conservés pendant ${n} an${n>1?'s':''} auraient un pouvoir d’achat équivalent à environ ${real.toLocaleString('fr-FR',{style:'currency',currency:'EUR'})} d’aujourd’hui.`;
    };
    [amount,inflation,years].forEach(el=>el.addEventListener('input',updateCalculator));updateCalculator();
  }
  const barter=$('#barter-need');
  if(barter){const out=$('#barter-result');const update=()=>{out.textContent=barter.value==='same'?'L’échange direct peut fonctionner : Léa veut précisément du pain et Amine peut lui en donner en échange de la réparation. Il faut encore s’entendre sur la quantité et la valeur de l’échange.':'L’échange direct bloque : Léa ne veut pas du pain. Amine doit trouver une autre personne ou proposer autre chose. Avec une monnaie acceptée, il peut vendre son pain puis payer Léa.'};barter.addEventListener('change',update);update();}
  const loanAmount=$('#loan-amount');
  if(loanAmount){
    let mode='grant';const format=n=>Math.abs(n).toLocaleString('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0});
    const updateLoan=()=>{let n=Number(loanAmount.value);if(!Number.isFinite(n)||n<100||n>1000000){$('#loan-impact').textContent='Saisis un montant compris entre 100 € et 1 000 000 €.';return}n=Math.round(n/100)*100;const sign=mode==='grant'?'+':'−';$('#loan-bank-asset').textContent=sign+format(n);$('#loan-bank-liability').textContent=sign+format(n);$('#loan-bank-asset-note').textContent=mode==='grant'?'La créance de prêt augmente.':'La créance de prêt diminue du principal remboursé.';$('#loan-bank-liability-note').textContent=mode==='grant'?'Un dépôt est créé sur le compte du client.':'Le dépôt utilisé pour rembourser le principal est débité.';$('#loan-impact').textContent=mode==='grant'?'Octroi : un dépôt bancaire nouveau est créé dans cet exemple. Le client reçoit un actif monétaire et contracte simultanément une dette.':'Remboursement du principal : le dépôt utilisé est débité et le prêt restant dû diminue. Dans ce modèle simplifié, la monnaie scripturale correspondante est détruite.';document.querySelectorAll('[data-loan-mode]').forEach(b=>b.classList.toggle('active',b.dataset.loanMode===mode));};
    loanAmount.addEventListener('input',updateLoan);document.querySelectorAll('[data-loan-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.loanMode;updateLoan()}));updateLoan();
  }
  document.querySelectorAll('[data-quick-choice]').forEach(b=>b.addEventListener('click',()=>{const good=b.dataset.quickChoice==='right';const feedback=$('#quick-feedback');feedback.textContent=good?'Exact. L’euro sert d’unité de compte lorsque le prix est exprimé en euros, même si le paiement final est effectué en bitcoin.':'Pas tout à fait. Le fait que le commerçant affiche ses prix en euros montre que l’euro sert d’unité de compte. Le moyen de paiement utilisé est une autre question.';feedback.className='quick-feedback '+(good?'feedback-correct':'feedback-wrong');document.querySelectorAll('[data-quick-choice]').forEach(x=>x.disabled=true)}));
  const questions=[...document.querySelectorAll('[data-question]')];
  if(questions.length){
    const updateScore=()=>{
      const answered=questions.filter(q=>q.dataset.answered==='1').length;const score=questions.filter(q=>q.dataset.correct==='1').length;
      $('#quiz-summary').textContent=answered===questions.length?`Résultat : ${score} / ${questions.length} bonnes réponses. ${score===questions.length?'Excellent, tout est maîtrisé.':score>=8?'Très bon résultat. Revois les explications des questions manquées.':score>=6?'Bon début. Relis les sections associées aux réponses incorrectes.':'Reprends les explications puis recommence : comprendre le raisonnement est le plus important.'}`:`${answered} / ${questions.length} réponses validées`;
      const fill=$('#quiz-progress-fill'), label=$('#quiz-progress-label');if(fill)fill.style.width=(answered/questions.length*100)+'%';if(label)label.textContent=`${answered} / ${questions.length} réponses`;
    };
    questions.forEach(q=>q.querySelectorAll('button[data-correct]').forEach(btn=>btn.addEventListener('click',()=>{
      if(q.dataset.answered==='1')return;q.dataset.answered='1';const correct=btn.dataset.correct==='true';q.dataset.correct=correct?'1':'0';
      q.querySelectorAll('button[data-correct]').forEach(b=>{b.disabled=true;if(b.dataset.correct==='true')b.classList.add('answer-correct')});if(!correct)btn.classList.add('answer-wrong');
      const feedback=q.querySelector('.quiz-feedback');feedback.textContent=(correct?'Bonne réponse. ':'Réponse incorrecte. ')+btn.dataset.explanation;feedback.classList.add(correct?'feedback-correct':'feedback-wrong');updateScore();
    })));
    $('#quiz-reset').addEventListener('click',()=>{questions.forEach(q=>{delete q.dataset.answered;delete q.dataset.correct;q.querySelectorAll('button[data-correct]').forEach(b=>{b.disabled=false;b.classList.remove('answer-correct','answer-wrong')});const f=q.querySelector('.quiz-feedback');f.textContent='';f.className='quiz-feedback'});updateScore()});updateScore();
  }
  const conflictButtons=[...document.querySelectorAll('[data-btc-conflict]')];
  const conflictFeedback=$('#btc-conflict-feedback');
  if(conflictButtons.length&&conflictFeedback){
    const renderConflict=winner=>{
      const loser=winner==='bob'?'Carol':'Bob';
      const recipient=winner==='bob'?'Bob':'Carol';
      conflictButtons.forEach(b=>{const active=b.dataset.btcConflict===winner;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active?'true':'false')});
      $('#btc-conflict-bob')?.classList.toggle('btc-conflict-selected',winner==='bob');
      $('#btc-conflict-bob')?.classList.toggle('btc-conflict-rejected',winner==='carol');
      $('#btc-conflict-carol')?.classList.toggle('btc-conflict-selected',winner==='carol');
      $('#btc-conflict-carol')?.classList.toggle('btc-conflict-rejected',winner==='bob');
      conflictFeedback.innerHTML=`<b>Dans ce scénario, le bloc retenu contient le paiement vers ${recipient}.</b><p>La transaction concurrente vers ${loser} tente de consommer la même sortie d’origine. Elle ne peut donc pas être validée en plus dans cette même chaîne.</p><small>À retenir : ce n’est pas un arbitre central qui choisit Bob ou Carol. Le réseau retient un historique de blocs valide selon les règles et le travail cumulé. Des nœuds peuvent temporairement observer des transactions différentes.</small>`;
    };
    conflictButtons.forEach(b=>b.addEventListener('click',()=>renderConflict(b.dataset.btcConflict)));
    const reset=$('[data-btc-conflict-reset]');
    if(reset)reset.addEventListener('click',()=>{conflictButtons.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});['bob','carol'].forEach(k=>{const el=$('#btc-conflict-'+k);if(el)el.classList.remove('btc-conflict-selected','btc-conflict-rejected')});conflictFeedback.textContent='Choisis l’un des deux scénarios pour voir ce qu’il advient de l’autre transaction.'});
  }
  const roleButtons=[...document.querySelectorAll('[data-btc-role]')];
  const roleDetail=$('#btc-role-detail');
  if(roleButtons.length&&roleDetail){
    const roleCopy={
      wallet:'<b>Portefeuille</b><p>Il aide l’utilisateur à gérer ses clés et à préparer une transaction signée. Il peut la transmettre à un nœud ou à un service connecté. Un portefeuille ne vérifie pas nécessairement toute la chaîne : certains s’appuient sur des serveurs tiers.</p>',
      node:'<b>Nœud complet</b><p>Il reçoit et vérifie les transactions et les blocs selon les règles qu’il applique. Il peut relayer les données valides à ses pairs. Son rôle est essentiel : il ne doit pas accepter un bloc simplement parce qu’un mineur l’a proposé.</p>',
      miner:'<b>Mineur</b><p>Il sélectionne des transactions pour construire un bloc candidat et effectue la recherche de preuve de travail. Il propose un bloc au réseau. Il ne peut pas imposer une transaction invalide ni modifier unilatéralement les règles suivies par les nœuds.</p>'
    };
    roleButtons.forEach(b=>b.addEventListener('click',()=>{roleButtons.forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',active?'true':'false')});roleDetail.innerHTML=roleCopy[b.dataset.btcRole]||''}));
  }
  const flowButtons=[...document.querySelectorAll('[data-btc-flow-step]')];
  const flowDetail=$('#btc-flow-detail');
  if(flowButtons.length&&flowDetail){
    const flowCopy=[
      {kicker:'ÉTAPE 01 / 07',title:'Le portefeuille prépare et signe',text:'Il construit une transaction à partir de sorties disponibles et utilise les clés nécessaires pour l’autoriser. Les bitcoins ne sont pas envoyés comme un fichier : la transaction demande que certaines sorties soient dépensées selon les règles prévues.'},
      {kicker:'ÉTAPE 02 / 07',title:'La transaction est diffusée entre pairs',text:'Le portefeuille transmet la transaction signée à un ou plusieurs nœuds connectés. Ceux-ci peuvent la relayer à leurs propres pairs : il n’existe pas de serveur central unique qui distribue obligatoirement chaque transaction.'},
      {kicker:'ÉTAPE 03 / 07',title:'Les nœuds vérifient les règles',text:'Un nœud complet contrôle notamment la structure de la transaction, les autorisations cryptographiques et le fait que les sorties utilisées soient encore dépensables dans l’état qu’il connaît. Il applique aussi ses propres règles locales pour décider si la transaction est relayée ou conservée en attente.'},
      {kicker:'ÉTAPE 04 / 07',title:'La transaction peut attendre localement',text:'Si elle passe les contrôles et les politiques de relais du nœud, elle peut entrer dans son mempool. C’est une réserve locale de transactions non confirmées : les mempools de deux nœuds peuvent différer. Être dans un mempool ne signifie pas être confirmée.'},
      {kicker:'ÉTAPE 05 / 07',title:'Un mineur sélectionne des transactions',text:'Un mineur choisit des transactions qu’il veut inclure, généralement depuis la vue des transactions en attente qu’il exploite, puis construit un bloc candidat. Il réalise ensuite la recherche de preuve de travail décrite dans la section suivante.'},
      {kicker:'ÉTAPE 06 / 07',title:'Le bloc est diffusé puis revérifié',text:'Lorsqu’un bloc est trouvé, il est diffusé au réseau. Les nœuds complets vérifient indépendamment la preuve de travail, les transactions et le respect des règles de consensus. S’ils acceptent ce bloc dans la chaîne qu’ils retiennent, la transaction reçoit sa première confirmation.'},
      {kicker:'ÉTAPE 07 / 07',title:'Les blocs suivants ajoutent des confirmations',text:'Chaque nouveau bloc construit au-dessus ajoute une confirmation et augmente le travail cumulé qui protège l’historique. Une réorganisation devient généralement plus coûteuse, mais le risque ne devient pas mathématiquement nul.'}
    ];
    const renderFlow=button=>{
      const index=Math.max(0,Math.min(flowCopy.length-1,Number(button.dataset.btcFlowStep)||0));
      flowButtons.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',active?'true':'false')});
      const info=flowCopy[index];
      flowDetail.innerHTML='<span>'+info.kicker+'</span><b>'+info.title+'</b><p>'+info.text+'</p>';
    };
    flowButtons.forEach(button=>button.addEventListener('click',()=>renderFlow(button)));
    renderFlow(flowButtons[0]);
  }
  const halving=$('#btc-halving-era');
  if(halving){
    const count=$('#btc-halving-count'),reward=$('#btc-halving-reward'),reduction=$('#btc-halving-reduction'),explain=$('#btc-halving-explain');
    const updateHalving=()=>{
      const era=Math.max(0,Math.min(10,Math.floor(Number(halving.value)||0)));
      const initialSatoshis=5000000000;
      const subsidySatoshis=Math.floor(initialSatoshis/Math.pow(2,era));
      const btc=subsidySatoshis/100000000;
      const pct=(1-subsidySatoshis/initialSatoshis)*100;
      count.textContent=String(era);
      reward.textContent=btc.toLocaleString('fr-FR',{maximumFractionDigits:8})+' BTC';
      reduction.textContent=pct.toLocaleString('fr-FR',{maximumFractionDigits:5})+' %';
      explain.textContent=era===0?'Période initiale : la subvention théorique est de 50 BTC par bloc. À chaque période de 210 000 blocs, elle est divisée par deux. Les frais de transaction, s’il y en a, s’ajoutent mais correspondent à des BTC déjà existants.':`Après ${era} réduction${era>1?'s':''} par deux, la subvention théorique est de ${btc.toLocaleString('fr-FR',{maximumFractionDigits:8})} BTC par bloc. La période dure 210 000 blocs ; à un intervalle cible moyen de dix minutes, cela représente environ quatre ans, mais la durée réelle varie.`;
    };
    halving.addEventListener('input',updateHalving);updateHalving();
  }
  initBlockchainLessonInteractions(chapterNumber);
  window.initMarketsLessonInteractions?.(chapterNumber);
  window.initCandlesLessonInteractions?.(chapterNumber);
}
async function atlasSha256Bytes(bytes){
  const digest=await window.crypto.subtle.digest('SHA-256',bytes);
  return new Uint8Array(digest);
}
async function atlasSha256Text(text){
  return atlasBytesToHex(await atlasSha256Bytes(new TextEncoder().encode(text)));
}
function atlasBytesToHex(bytes){
  return Array.from(bytes).map(value=>value.toString(16).padStart(2,'0')).join('');
}
function atlasHexToBytes(hex){
  const clean=String(hex||'').replace(/[^0-9a-f]/gi,'');
  const bytes=new Uint8Array(Math.floor(clean.length/2));
  for(let i=0;i<bytes.length;i++)bytes[i]=parseInt(clean.slice(i*2,i*2+2),16);
  return bytes;
}
async function atlasMerklePair(leftHex,rightHex){
  const left=atlasHexToBytes(leftHex),right=atlasHexToBytes(rightHex);
  const joined=new Uint8Array(left.length+right.length);joined.set(left,0);joined.set(right,left.length);
  return atlasBytesToHex(await atlasSha256Bytes(joined));
}
async function initBlockchainLessonInteractions(chapterNumber){
  if(chapterNumber!==3)return;
  const shortened=value=>value?'0x'+value.slice(0,22)+'…'+value.slice(-8):'—';
  const hashInput=document.querySelector('#ch3-hash-input');
  if(hashInput){
    const initialValue=hashInput.value;
    const parentHash='8f'.repeat(32);
    const currentEl=document.querySelector('#ch3-hash-current');
    const nextEl=document.querySelector('#ch3-hash-next');
    const statusEl=document.querySelector('#ch3-hash-status');
    const relink=document.querySelector('#ch3-hash-relink');
    const reset=document.querySelector('#ch3-hash-reset');
    let currentHash='',sequence=0;
    const render=async()=>{
      const ticket=++sequence;
      if(!window.crypto?.subtle){statusEl.textContent='Cette démonstration nécessite un navigateur récent en contexte sécurisé (HTTPS).';return;}
      try{
        const calculated=await atlasSha256Text('parent='+parentHash+'|data='+hashInput.value);
        if(ticket!==sequence)return;
        currentHash=calculated;currentEl.textContent=shortened(currentHash);
        const expected=nextEl.dataset.hash||'';
        if(!expected){nextEl.dataset.hash=currentHash;nextEl.textContent=shortened(currentHash);statusEl.textContent='État initial : le bloc suivant référence bien le hash du bloc courant.';statusEl.className='ch3-lab-status is-ok';}
        else if(expected===currentHash){statusEl.textContent='Lien cohérent : la référence du bloc suivant correspond à l’empreinte actuelle.';statusEl.className='ch3-lab-status is-ok';}
        else{statusEl.textContent='Lien rompu : le bloc suivant référence encore l’ancienne empreinte. La modification est détectable.';statusEl.className='ch3-lab-status is-alert';}
      }catch(error){statusEl.textContent='Le calcul cryptographique n’a pas pu être effectué dans ce navigateur.';statusEl.className='ch3-lab-status is-alert';}
    };
    hashInput.addEventListener('input',render);
    relink?.addEventListener('click',()=>{
      if(!currentHash)return;
      nextEl.dataset.hash=currentHash;nextEl.textContent=shortened(currentHash);
      statusEl.textContent='Lien mis à jour dans la maquette. Dans un vrai réseau, il faudrait aussi reconstruire les blocs concernés et satisfaire les règles du mécanisme de consensus.';
      statusEl.className='ch3-lab-status is-ok';
    });
    reset?.addEventListener('click',()=>{hashInput.value=initialValue;nextEl.dataset.hash='';nextEl.textContent='En attente…';currentHash='';render()});
    render();
  }
  const merkleInputs=[...document.querySelectorAll('[data-ch3-merkle-tx]')];
  if(merkleInputs.length===4){
    const leafEls=merkleInputs.map((_,i)=>document.querySelector('#ch3-merkle-leaf-'+i));
    const pairEls=[0,1].map(i=>document.querySelector('#ch3-merkle-pair-'+i));
    const rootEl=document.querySelector('#ch3-merkle-root');
    const statusEl=document.querySelector('#ch3-merkle-status');
    let sequence=0;
    const renderMerkle=async()=>{
      const ticket=++sequence;
      if(!window.crypto?.subtle){statusEl.textContent='Cette démonstration nécessite un navigateur récent en contexte sécurisé (HTTPS).';return;}
      try{
        const leaves=await Promise.all(merkleInputs.map(input=>atlasSha256Text(input.value)));
        const pairs=await Promise.all([atlasMerklePair(leaves[0],leaves[1]),atlasMerklePair(leaves[2],leaves[3])]);
        const root=await atlasMerklePair(pairs[0],pairs[1]);
        if(ticket!==sequence)return;
        leafEls.forEach((el,i)=>{if(el)el.textContent=shortened(leaves[i]);});
        pairEls.forEach((el,i)=>{if(el)el.textContent=shortened(pairs[i]);});
        rootEl.textContent=shortened(root);
        statusEl.textContent='Arbre recalculé : une modification d’entrée change sa feuille, sa branche et la racine qui engage les quatre transactions.';
        statusEl.className='ch3-lab-status is-ok';
      }catch(error){statusEl.textContent='Le calcul de l’arbre n’a pas pu être effectué dans ce navigateur.';statusEl.className='ch3-lab-status is-alert';}
    };
    merkleInputs.forEach(input=>input.addEventListener('input',renderMerkle));
    renderMerkle();
  }
}
function route(){
  const m=location.hash.match(/^#chapitre-(\d+)$/);
  if(!m){const target=location.hash?document.getElementById(decodeURIComponent(location.hash.slice(1))):null;if(target&&target.closest('#reader'))return;$('#home').hidden=false;$('#reader').classList.remove('active');return}
  const i=Number(m[1])-1;if(!CHAPTERS[i]){location.hash='encyclopedie';return}current=i;const c=CHAPTERS[i];
  $('#home').hidden=true;$('#reader').classList.add('active');$('#reader-part').textContent=c.part+' · Fiche '+(i+1)+' / 25';$('#reader-title').textContent=c.title;$('#reader-lead').textContent=c.lead;
  const lesson=window.ATLAS_LESSONS?.[i+1];if(lesson){$('#lesson-meta').textContent=lesson.level+' · '+lesson.minutes+' min de lecture';$('#lesson-nav').innerHTML='<strong>Dans cette fiche</strong>'+lesson.toc.map(x=>'<a href="#'+x[0]+'">'+x[1]+'</a>').join('');$('#lesson-content').innerHTML=lesson.html;initLessonInteractions(i+1)}else{renderGeneric(c,i)}
  atlasRenderChapterReadControl(i+1);
  $('#next').textContent=i===24?'Revenir au début ↺':'Fiche suivante →';
  const readerTitle=$('#reader-title');
  readerTitle.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:'instant'});
}

function atlasLoadProgress(){
  const empty={readChapters:[],quizSuccess:[],concepts:[]};
  try{
    const saved=JSON.parse(localStorage.getItem('atlas-crypto-progress-v1')||'null');
    if(!saved||typeof saved!=='object')return empty;
    return {
      readChapters:Array.isArray(saved.readChapters)?[...new Set(saved.readChapters.filter(n=>Number.isInteger(n)&&n>=1&&n<=25))]:[],
      quizSuccess:Array.isArray(saved.quizSuccess)?[...new Set(saved.quizSuccess.filter(x=>typeof x==='string'))]:[],
      concepts:Array.isArray(saved.concepts)?[...new Set(saved.concepts.filter(x=>typeof x==='string'))]:[]
    };
  }catch(error){return empty;}
}
let atlasProgress=atlasLoadProgress();
function atlasSaveProgress(){
  try{localStorage.setItem('atlas-crypto-progress-v1',JSON.stringify(atlasProgress));}
  catch(error){/* Le suivi reste disponible pendant la session si le stockage local est bloqué. */}
  atlasRenderProgress();
}
function atlasRenderProgress(){
  const read=atlasProgress.readChapters.length;
  const percent=Math.round(read/25*100);
  const readEl=$('#progress-read'),quizEl=$('#progress-quiz'),conceptEl=$('#progress-concepts');
  const percentEl=$('#progress-percent'),bar=$('#progress-bar'),fill=$('#progress-fill'),message=$('#progress-message');
  if(readEl)readEl.textContent=read;
  if(quizEl)quizEl.textContent=atlasProgress.quizSuccess.length;
  if(conceptEl)conceptEl.textContent=atlasProgress.concepts.length;
  if(percentEl)percentEl.textContent=percent+' %';
  if(bar)bar.setAttribute('aria-valuenow',String(read));
  if(fill)fill.style.width=percent+'%';
  if(message){
    if(read===0&&atlasProgress.quizSuccess.length===0&&atlasProgress.concepts.length===0)message.textContent='Votre parcours commencera dès que vous marquerez un chapitre comme lu.';
    else if(read===25)message.textContent='Les 25 chapitres sont marqués comme lus. Vous pouvez continuer à revoir les notions et les quiz.';
    else message.textContent='Continuez à votre rythme : votre progression reste enregistrée sur cet appareil.';
  }
}
function atlasRenderChapterReadControl(chapterNumber){
  const button=$('#mark-read'),status=$('#chapter-read-feedback');
  if(!button)return;
  const isRead=atlasProgress.readChapters.includes(chapterNumber);
  button.setAttribute('aria-pressed',String(isRead));
  button.textContent=isRead?'Chapitre lu ✓':'Marquer cette fiche comme lue';
  button.classList.toggle('is-complete',isRead);
  if(status)status.textContent=isRead?'Enregistré dans votre progression locale.':'Vous pourrez retrouver ce chapitre dans votre progression.';
}
function atlasTrackQuizAnswer(button){
  const chapterNumber=current+1;
  const question=button.closest('[data-question]');
  let key=null;
  if(question&&question.dataset.correct==='1'){
    const questions=[...document.querySelectorAll('#lesson-content [data-question]')];
    key=chapterNumber+':question-'+(questions.indexOf(question)+1);
  }else if(button.dataset.genericAnswer==='1'){
    key=chapterNumber+':generic-question-1';
  }
  if(key&&!atlasProgress.quizSuccess.includes(key)){
    atlasProgress.quizSuccess.push(key);
    atlasSaveProgress();
  }
}
function atlasTrackConcept(button){
  const termId=button.dataset.termId;
  if(!termId)return;
  const key=(current+1)+':'+termId;
  if(!atlasProgress.concepts.includes(key)){
    atlasProgress.concepts.push(key);
    atlasSaveProgress();
  }
}
function atlasInitProgressTracking(){
  const markButton=$('#mark-read');
  markButton?.addEventListener('click',()=>{
    const chapterNumber=current+1;
    const index=atlasProgress.readChapters.indexOf(chapterNumber);
    if(index>=0)atlasProgress.readChapters.splice(index,1);
    else atlasProgress.readChapters.push(chapterNumber);
    atlasSaveProgress();
    atlasRenderChapterReadControl(chapterNumber);
  });
  $('#progress-reset')?.addEventListener('click',()=>{
    if(!window.confirm('Réinitialiser les chapitres lus, les réussites aux quiz et les notions consultées sur cet appareil ?'))return;
    atlasProgress={readChapters:[],quizSuccess:[],concepts:[]};
    try{localStorage.removeItem('atlas-crypto-progress-v1');}catch(error){}
    atlasRenderProgress();
    atlasRenderChapterReadControl(current+1);
  });
  document.addEventListener('click',event=>{
    const answer=event.target.closest?.('button[data-correct],button[data-generic-answer]');
    if(answer)atlasTrackQuizAnswer(answer);
    const term=event.target.closest?.('button.atlas-term');
    if(term)atlasTrackConcept(term);
  });
  atlasRenderProgress();
}
function atlasInitGuide(){
  const form=$('#guide-form'),result=$('#guide-result');
  if(!form||!result)return;
  const chapterLink=(number,label)=>'<a class="guide-chapter-link" href="#chapitre-'+number+'"><span>Chapitre '+String(number).padStart(2,'0')+'</span><b>'+label+'</b><span aria-hidden="true">↗</span></a>';
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const goal=$('#guide-goal').value,level=$('#guide-level').value,interest=$('#guide-interest').value;
    let title='',description='',steps=[];
    if(goal==='foundations'){
      title='Construire des bases solides.';
      description='Commencez par comprendre le rôle de la monnaie, puis découvrez la proposition de Bitcoin. Les détails techniques pourront venir ensuite.';
      steps=[[1,'Pourquoi la monnaie existe-t-elle ?'],[2,'Bitcoin : naissance d’une monnaie numérique']];
      if(interest==='ecosystem')steps.push([6,'Ethereum et les contrats intelligents']);
      if(interest==='orderflow')steps.push([11,'Offre, demande et formation des prix']);
      if(interest==='bitcoin')steps.push([3,'Blockchain : comment fonctionne un registre ?']);
    }else if(goal==='technical'){
      if(interest==='ecosystem'){
        title='Explorer l’écosystème et ses briques.';
        description='Après une première compréhension du registre partagé, découvrez les contrats intelligents et les architectures qui composent l’écosystème.';
        steps=[[3,'Blockchain : comment fonctionne un registre ?'],[6,'Ethereum et les contrats intelligents'],[10,'Couches 2, rollups et interopérabilité']];
      }else if(interest==='orderflow'){
        title='Comprendre la mécanique des marchés.';
        description='Pour comprendre le carnet d’ordres et l’order flow, partez de la formation des prix puis avancez vers les chandeliers et la microstructure.';
        steps=[[11,'Offre, demande et formation des prix'],[12,'Lire les chandeliers et les volumes'],[13,'Carnet d’ordres et microstructure']];
      }else{
        title='Entrer dans les coulisses de Bitcoin.';
        description='Explorez progressivement la structure du registre, les clés qui autorisent les dépenses et les transactions qui déplacent les bitcoins.';
        steps=[[3,'Blockchain : comment fonctionne un registre ?'],[4,'Clés privées, signatures et adresses'],[5,'Transactions, UTXO et frais']];
      }
    }else{
      title=level==='beginner'?'Découvrir les marchés sans brûler les étapes.':'Structurer votre compréhension des marchés.';
      description=level==='beginner'
        ?'Comme vous débutez, les chapitres 1 et 2 donnent le contexte essentiel. Vous pourrez ensuite commencer directement l’étude des marchés au chapitre 11, sans devoir terminer tous les chapitres techniques.'
        :'Vous pouvez commencer par la formation des prix, puis étudier les volumes et le carnet d’ordres. Les notions techniques avancées resteront accessibles au fil du parcours.';
      steps=level==='beginner'?[[1,'Pourquoi la monnaie existe-t-elle ?'],[2,'Bitcoin : naissance d’une monnaie numérique'],[11,'Offre, demande et formation des prix']]:[[11,'Offre, demande et formation des prix'],[12,'Lire les chandeliers et les volumes'],[13,'Carnet d’ordres et microstructure']];
      if(interest==='ecosystem')steps.push([6,'Ethereum et les contrats intelligents']);
      if(interest==='bitcoin'&&level!=='beginner')steps.push([2,'Bitcoin : naissance d’une monnaie numérique']);
    }
    const levelText=level==='beginner'?'Débutant':level==='familiar'?'Déjà familier des bases':'Déjà actif sur les marchés';
    result.innerHTML='<span class="guide-result-kicker">VOTRE ITINÉRAIRE RECOMMANDÉ · '+levelText.toUpperCase()+'</span><h3>'+title+'</h3><p>'+description+'</p><div class="guide-recommendations">'+steps.map(step=>chapterLink(step[0],step[1])).join('')+'</div><p class="guide-result-foot">Vous gardez la liberté de parcourir les 25 chapitres dans l’ordre qui vous convient.</p>';
  });
}
function atlasInitMarketLab(){
  const quantityInput=$('#market-quantity');
  const asksEl=$('#market-asks'),bidsEl=$('#market-bids');
  if(!quantityInput||!asksEl||!bidsEl)return;
  const book={
    asks:[{price:100.02,quantity:1.5},{price:100.05,quantity:2.5},{price:100.10,quantity:4.0}],
    bids:[{price:99.98,quantity:2.0},{price:99.95,quantity:3.0},{price:99.90,quantity:5.0}]
  };
  let side='buy';
  const fmtQty=value=>value.toLocaleString('fr-FR',{minimumFractionDigits:1,maximumFractionDigits:1});
  const fmtPrice=value=>value.toLocaleString('fr-FR',{style:'currency',currency:'EUR',minimumFractionDigits:2,maximumFractionDigits:2});
  const fillLevels=(levels,quantity)=>{
    let remaining=quantity,filled=0,notional=0,levelsTouched=0;
    const usage=levels.map(level=>{
      const used=Math.min(level.quantity,remaining);
      if(used>0){levelsTouched++;remaining-=used;filled+=used;notional+=used*level.price;}
      return used;
    });
    return {usage,filled,remaining,notional,average:filled?notional/filled:0,levelsTouched};
  };
  const renderBook=(element,levels,usage,kind)=>{
    element.replaceChildren();
    const max= Math.max(...levels.map(level=>level.quantity));
    levels.forEach((level,index)=>{
      const used=usage[index]||0;
      const row=document.createElement('div');
      row.className='market-book-row'+(used>=level.quantity?' is-consumed':used>0?' is-partial':'');
      const bar=document.createElement('span');bar.className='market-depth-bar';bar.setAttribute('aria-hidden','true');
      const barFill=document.createElement('i');barFill.style.width=(level.quantity/max*100)+'%';bar.append(barFill);
      const sideLabel=document.createElement('span');sideLabel.className='market-level-side';sideLabel.textContent=kind==='ask'?'ASK':'BID';
      const price=document.createElement('strong');price.textContent=fmtPrice(level.price);
      const quantity=document.createElement('span');quantity.textContent=used>0?fmtQty(level.quantity)+' · −'+fmtQty(used):fmtQty(level.quantity);
      row.append(bar,sideLabel,price,quantity);
      row.setAttribute('aria-label',(kind==='ask'?'Vente ':'Achat ')+fmtQty(level.quantity)+' unités à '+fmtPrice(level.price)+(used>0?', quantité consommée '+fmtQty(used):''));
      element.append(row);
    });
  };
  const update=()=>{
    const quantity=Number(quantityInput.value);
    const buy=side==='buy';
    const activeLevels=buy?book.asks:book.bids;
    const passiveLevels=buy?book.bids:book.asks;
    const execution=fillLevels(activeLevels,quantity);
    const refPrice=activeLevels[0].price;
    const slippage=execution.filled?Math.abs(execution.average-refPrice)/refPrice*100:0;
    renderBook(asksEl,book.asks,buy?execution.usage:[], 'ask');
    renderBook(bidsEl,book.bids,buy?[]:execution.usage,'bid');
    $('#market-quantity-label').textContent=fmtQty(quantity)+' unités';
    $('#market-average').textContent=fmtPrice(execution.average);
    $('#market-notional').textContent=fmtPrice(execution.notional);
    $('#market-slippage').textContent=slippage.toLocaleString('fr-FR',{minimumFractionDigits:3,maximumFractionDigits:3})+' %';
    $('#market-filled').textContent=fmtQty(execution.filled)+' / '+fmtQty(quantity)+' unités';
    const ordreLabel=buy?'d’achat':'de vente';
    const depth=execution.levelsTouched;
    let message='';
    if(execution.remaining>0)message='la profondeur disponible ne suffit pas à exécuter toute la quantité demandée dans ce carnet fictif.';
    else if(depth===1)message='à cette taille, ton ordre consomme uniquement le meilleur niveau du côté '+(buy?'vendeur':'acheteur')+'.';
    else message='ton ordre traverse '+depth+' niveaux de prix. Le prix moyen s’éloigne du meilleur prix affiché : c’est le slippage.';
    $('#market-explanation').textContent='Pour ton ordre '+ordreLabel+', '+message;
    document.querySelectorAll('[data-market-side]').forEach(button=>{
      const selected=button.dataset.marketSide===side;
      button.setAttribute('aria-pressed',String(selected));
      button.classList.toggle('active',selected);
    });
  };
  document.querySelectorAll('[data-market-side]').forEach(button=>button.addEventListener('click',()=>{side=button.dataset.marketSide;update();}));
  quantityInput.addEventListener('input',update);
  $('#market-best-bid').textContent=fmtPrice(book.bids[0].price);
  $('#market-best-ask').textContent=fmtPrice(book.asks[0].price);
  $('#market-spread').textContent=fmtPrice(book.asks[0].price-book.bids[0].price);
  $('#market-mid').textContent=fmtPrice((book.asks[0].price+book.bids[0].price)/2);
  update();
}
atlasInitProgressTracking();
atlasInitGuide();
atlasInitMarketLab();

window.addEventListener('hashchange',route);route();$('#next').onclick=()=>location.hash='chapitre-'+(current===24?1:current+2);
