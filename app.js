const $=s=>document.querySelector(s);
let active='Toutes';
const parts=['Toutes',...new Set(CHAPTERS.map(x=>x.part))];
const filterEl=$('#filters');
parts.forEach(part=>{const b=document.createElement('button');b.className='filter'+(part===active?' active':'');b.textContent=part;b.addEventListener('click',()=>{active=part;renderCards();[...filterEl.children].forEach(el=>el.classList.toggle('active',el.textContent===part))});filterEl.append(b)});
function renderCards(){const q=$('#search').value.toLocaleLowerCase('fr');const list=CHAPTERS.map((x,i)=>({...x,i})).filter(x=>(active==='Toutes'||x.part===active)&&(x.title+' '+x.lead+' '+x.detail).toLocaleLowerCase('fr').includes(q));$('#cards').replaceChildren(...list.map(x=>{const b=document.createElement('button');b.className='chapter';b.innerHTML='<span class="index">'+String(x.i+1).padStart(2,'0')+'</span><span class="chapter-status">'+(window.ATLAS_LESSONS?.[x.i+1]?'Cours approfondi':'Synthèse à enrichir')+'</span><h3></h3><p></p><span class="bottom">Lire la fiche →</span>';b.querySelector('h3').textContent=x.title;b.querySelector('p').textContent=x.lead;b.onclick=()=>location.hash='chapitre-'+(x.i+1);return b}));if(!list.length)$('#cards').textContent='Aucun chapitre ne correspond à votre recherche.'}
$('#search').addEventListener('input',renderCards);renderCards();
let current=0;
function renderGeneric(c,i){
  const toc=[['comprendre','Comprendre'],['approfondir','Approfondir'],['retenir','À retenir'],['verifier','Vérifier ses acquis'],['sources','Sources']];
  $('#lesson-nav').innerHTML='<strong>Dans cette fiche</strong>'+toc.map(x=>'<a href="#'+x[0]+'">'+x[1]+'</a>').join('');
  $('#lesson-content').innerHTML=`
    <section id="comprendre"><h2>Comprendre le principe</h2><p>${c.lead}</p><figure class="figure"><svg viewBox="0 0 680 240" role="img" aria-label="Schéma conceptuel : règle, mécanisme et limites"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#8a6336"/><stop offset="1" stop-color="#dfbd83"/></linearGradient></defs><path d="M140 120H540" stroke="#8b7355" stroke-width="2" stroke-dasharray="7 8"/><g fill="#241d16" stroke="url(#g)" stroke-width="2"><rect x="15" y="75" width="180" height="90" rx="12"/><rect x="250" y="75" width="180" height="90" rx="12"/><rect x="485" y="75" width="180" height="90" rx="12"/></g><g fill="#f1ddbc" font-family="Arial" font-size="20" text-anchor="middle"><text x="105" y="127">Règle</text><text x="340" y="127">Mécanisme</text><text x="575" y="127">Limites</text></g></svg><figcaption>Cadre d'analyse : comprendre les règles, le fonctionnement et les compromis.</figcaption></figure></section>
    <section id="approfondir"><h2>Approfondir le mécanisme</h2><p>${c.detail}</p><p>${c.focus}</p></section>
    <section id="retenir"><h2>À retenir</h2><div class="callout"><strong>Le point de vigilance</strong><p>${c.caution}</p></div></section>
    <section id="verifier"><h2>Vérifier ses acquis</h2><div class="quiz"><strong>Quel réflexe est le plus pertinent ?</strong><div><button data-generic-answer="0">Se fier à une promesse de rendement</button><button data-generic-answer="1">Vérifier le mécanisme et ses risques</button><button data-generic-answer="0">Ignorer les limites techniques</button></div><p id="feedback" role="status"></p></div></section>
    <section id="sources"><h2>Sources pour aller plus loin</h2><p>Les références ci-dessous sont des points de départ documentaires ; elles ne valident pas individuellement toutes les affirmations de cette fiche.</p><p><a class="link" target="_blank" rel="noopener noreferrer" href="https://bitcoin.org/bitcoin.pdf">Livre blanc de Bitcoin ↗</a><br><a class="link" target="_blank" rel="noopener noreferrer" href="https://developer.bitcoin.org/">Documentation Bitcoin ↗</a><br><a class="link" target="_blank" rel="noopener noreferrer" href="https://ethereum.org/en/developers/docs/">Documentation Ethereum ↗</a><br><a class="link" target="_blank" rel="noopener noreferrer" href="https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica">Cadre MiCA (ESMA) ↗</a></p></section>`;
  document.querySelectorAll('[data-generic-answer]').forEach(b=>b.onclick=()=>{$('#feedback').textContent=b.dataset.genericAnswer==='1'?'Exact. Un raisonnement solide commence par l’analyse des mécanismes et des risques.':'Pas tout à fait. Il faut examiner les mécanismes et leurs limites, plutôt que chercher des certitudes.'});
  $('#lesson-meta').textContent='Synthèse introductive · approfondissements à développer';
}
function initLessonInteractions(){
  const amount=$('#calc-amount'), inflation=$('#calc-inflation'), years=$('#calc-years');
  const updateCalculator=()=>{
    const a=Number(amount.value), r=Number(inflation.value), n=Number(years.value);
    const valid=Number.isFinite(a)&&Number.isFinite(r)&&Number.isFinite(n)&&a>0&&r>=0&&r<=100&&n>=1&&n<=100;
    if(!valid){$('#calc-result').textContent='—';$('#calc-explanation').textContent='Saisis un montant positif, un taux entre 0 et 100 % et une durée entre 1 et 100 ans.';return}
    const real=a/Math.pow(1+r/100,n);
    $('#calc-result').textContent=real.toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
    $('#calc-explanation').textContent=`Avec ces hypothèses, ${a.toLocaleString('fr-FR')} € conservés pendant ${n} an${n>1?'s':''} auraient un pouvoir d’achat équivalent à environ ${real.toLocaleString('fr-FR',{style:'currency',currency:'EUR'})} d’aujourd’hui.`;
  };
  [amount,inflation,years].forEach(el=>el.addEventListener('input',updateCalculator));
  updateCalculator();
  const questions=[...document.querySelectorAll('[data-question]')];
  const updateScore=()=>{
    const answered=questions.filter(q=>q.dataset.answered==='1').length;
    const score=questions.filter(q=>q.dataset.correct==='1').length;
    $('#quiz-summary').textContent=answered===questions.length?`Résultat : ${score} / ${questions.length} bonnes réponses. ${score===questions.length?'Excellent, tout est maîtrisé.':score>=5?'Très bon résultat. Revois les explications des questions manquées.':'Relis les sections correspondantes puis recommence : comprendre le raisonnement est le plus important.'}`:`${answered} / ${questions.length} réponses validées`;
  };
  questions.forEach(q=>{
    q.querySelectorAll('button[data-correct]').forEach(btn=>btn.addEventListener('click',()=>{
      if(q.dataset.answered==='1')return;
      q.dataset.answered='1';
      const correct=btn.dataset.correct==='true';
      q.dataset.correct=correct?'1':'0';
      q.querySelectorAll('button[data-correct]').forEach(b=>{b.disabled=true;if(b.dataset.correct==='true')b.classList.add('answer-correct')});
      if(!correct)btn.classList.add('answer-wrong');
      const feedback=q.querySelector('.quiz-feedback');
      feedback.textContent=(correct?'Bonne réponse. ':'Réponse incorrecte. ')+btn.dataset.explanation;
      feedback.classList.add(correct?'feedback-correct':'feedback-wrong');
      updateScore();
    }));
  });
  $('#quiz-reset').addEventListener('click',()=>{
    questions.forEach(q=>{delete q.dataset.answered;delete q.dataset.correct;q.querySelectorAll('button[data-correct]').forEach(b=>{b.disabled=false;b.classList.remove('answer-correct','answer-wrong')});const f=q.querySelector('.quiz-feedback');f.textContent='';f.className='quiz-feedback'});
    updateScore();
  });
}
function route(){
  const m=location.hash.match(/^#chapitre-(\d+)$/);
  if(!m){
    const target=location.hash?document.getElementById(decodeURIComponent(location.hash.slice(1))):null;
    if(target && target.closest('#reader')) return;
    $('#home').hidden=false;$('#reader').classList.remove('active');return
  }
  const i=Number(m[1])-1;
  if(!CHAPTERS[i]){location.hash='encyclopedie';return}
  current=i;const c=CHAPTERS[i];
  $('#home').hidden=true;$('#reader').classList.add('active');
  $('#reader-part').textContent=c.part+' · Fiche '+(i+1)+' / 25';
  $('#reader-title').textContent=c.title;$('#reader-lead').textContent=c.lead;
  const lesson=window.ATLAS_LESSONS?.[i+1];
  if(lesson){
    $('#lesson-meta').textContent=lesson.level+' · '+lesson.minutes+' min de lecture';
    $('#lesson-nav').innerHTML='<strong>Dans cette fiche</strong>'+lesson.toc.map(x=>'<a href="#'+x[0]+'">'+x[1]+'</a>').join('');
    $('#lesson-content').innerHTML=lesson.html;
    initLessonInteractions();
  }else{renderGeneric(c,i)}
  $('#next').textContent=i===24?'Revenir au début ↺':'Fiche suivante →';
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange',route);route();
$('#next').onclick=()=>location.hash='chapitre-'+(current===24?1:current+2);
