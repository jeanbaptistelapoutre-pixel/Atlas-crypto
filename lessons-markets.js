/* Atlas Crypto — Marchés & trading
 * Chapitre 11 : offre, demande et formation des prix.
 * Les données des simulations sont fictives et les schémas conceptuels ne sont pas des données de marché.
 */
window.ATLAS_LESSONS = window.ATLAS_LESSONS || {};
Object.assign(window.ATLAS_LESSONS, {
  11: {
    minutes: 24,
    level: 'Débutant · aucun prérequis de trading',
    objectives: [
      'Distinguer le dernier prix échangé, un prix affiché et une estimation de valeur.',
      'Expliquer comment les ordres d’achat et de vente se rencontrent.',
      'Lire les notions de bid, ask, spread et profondeur dans un carnet simple.',
      'Comprendre pourquoi un ordre au marché peut être exécuté à plusieurs prix.',
      'Relier la liquidité au coût réel d’une transaction, sans la confondre avec la capitalisation.'
    ],
    toc: [
      ['m11-demarrer', 'Avant de regarder un graphique'],
      ['m11-equilibre', 'Offre, demande et prix'],
      ['m11-carnet', 'Le carnet d’ordres'],
      ['m11-liquidite', 'Liquidité, profondeur et slippage'],
      ['m11-simulation', 'Expérience : carnet fin ou profond ?'],
      ['m11-cas', 'Lire une situation de marché'],
      ['m11-glossaire', 'Glossaire'],
      ['m11-retenir', 'À retenir'],
      ['m11-quiz', 'Vérifier ses acquis'],
      ['m11-sources', 'Sources']
    ],
    html: `
      <div class="lesson-objectives" id="m11-demarrer">
        <div class="objectives-main">
          <span class="lesson-kicker">Avant de commencer · 01 / 10 du parcours marchés</span>
          <h2>Un prix n’est pas une vérité : c’est le résultat d’un échange entre des participants, à un instant précis.</h2>
          <p>Imagine deux personnes : l’une souhaite acheter un bitcoin, l’autre souhaite en vendre. Elles ne sont pas obligées d’être d’accord sur sa valeur. Il suffit qu’un acheteur accepte le prix demandé par un vendeur — ou qu’un vendeur accepte le prix proposé par un acheteur — pour qu’une transaction ait lieu.</p>
          <div class="objective-tags"><span>Débutant</span><span>24 min environ</span><span>5 objectifs</span></div>
        </div>
        <aside class="objectives-side">
          <b>À la fin de ce chapitre</b>
          <ol>
            <li>Lire les deux côtés d’un marché</li>
            <li>Comprendre le prix de la dernière transaction</li>
            <li>Repérer le spread</li>
            <li>Expliquer le coût d’un ordre important</li>
            <li>Ne plus confondre capitalisation et liquidité</li>
          </ol>
        </aside>
      </div>

      <section class="lesson-section" id="m11-point-de-depart">
        <span class="lesson-kicker">Le point de départ</span>
        <h2>Ce que signifie réellement « le prix du bitcoin est de 60 000 € »</h2>
        <p>Lorsque tu lis « BTC = 60 000 € », tu vois généralement un prix de référence affiché par une plateforme, un fournisseur de données ou un agrégateur. Ce chiffre peut être le dernier prix échangé, le prix médian entre acheteurs et vendeurs, un indice calculé à partir de plusieurs marchés ou une autre référence. Il faut donc toujours savoir <strong>quel prix est affiché, sur quelle plateforme et selon quelle méthode</strong>.</p>
        <div class="m11-price-anatomy">
          <article><span>01 · PRIX PROPOSÉ</span><b>59 990 €</b><p>Un acheteur indique le montant maximal qu’il est prêt à payer.</p></article>
          <article><span>02 · PRIX DEMANDÉ</span><b>60 010 €</b><p>Un vendeur indique le montant minimal qu’il accepte.</p></article>
          <article><span>03 · DERNIER ÉCHANGE</span><b>60 000 €</b><p>La dernière transaction enregistrée a eu lieu à ce prix.</p></article>
        </div>
        <p class="m11-caption">Exemple purement fictif. Ces trois prix peuvent être différents au même instant.</p>
        <div class="lesson-callout">
          <strong>Une distinction fondamentale</strong>
          <p>Le prix de marché n’est pas nécessairement la « vraie valeur » d’un actif. C’est le prix auquel une transaction s’est effectivement réalisée, ou une référence construite à partir de cotations. La valeur qu’une personne attribue à un actif peut différer de celle d’une autre personne. Le marché ne révèle pas une vérité objective : il agrège des décisions, des contraintes et des informations hétérogènes.</p>
        </div>
        <h3>Pourquoi le prix change-t-il ?</h3>
        <p>Parce que les participants modifient leurs propositions. Certains deviennent prêts à payer davantage ; d’autres acceptent de vendre moins cher. Des ordres arrivent, sont exécutés, modifiés ou annulés. Le prix peut aussi réagir à une information, à un besoin urgent de liquidités ou à un mouvement sur un autre marché. Nous allons séparer deux niveaux : le raisonnement économique général de l’offre et de la demande, puis le mécanisme concret d’un carnet d’ordres électronique.</p>
      </section>

      <section class="lesson-section" id="m11-equilibre">
        <span class="lesson-kicker">02 · Le modèle économique</span>
        <h2>Offre et demande : un modèle pour comprendre les pressions sur le prix</h2>
        <p>La <strong>demande</strong> représente les quantités que des acheteurs souhaitent acquérir à différents prix. Toutes choses égales par ailleurs — c’est-à-dire en supposant que les autres facteurs restent stables — une baisse du prix peut rendre l’achat accessible à davantage de personnes. L’<strong>offre</strong> représente les quantités que des vendeurs souhaitent céder à différents prix. Dans ce même modèle simplifié, un prix plus élevé peut inciter davantage de vendeurs à proposer leur actif.</p>
        <figure class="market-figure">
          <div class="market-figure-heading"><span>MODÈLE CONCEPTUEL</span><b>La rencontre de l’offre et de la demande</b></div>
          <svg class="m11-economics-chart" viewBox="0 0 720 390" role="img" aria-labelledby="m11-chart-title m11-chart-desc">
            <title id="m11-chart-title">Courbes conceptuelles d’offre et de demande</title>
            <desc id="m11-chart-desc">La courbe de demande descend lorsque la quantité augmente, la courbe d’offre monte. Leur intersection représente un prix et une quantité d’équilibre dans ce modèle simplifié.</desc>
            <defs><pattern id="m11-grid" width="48" height="42" patternUnits="userSpaceOnUse"><path d="M48 0H0V42" fill="none" stroke="#5d4a32" stroke-width="1" opacity=".28"/></pattern></defs>
            <rect x="86" y="30" width="570" height="286" fill="url(#m11-grid)"/>
            <path d="M86 30V316H656" fill="none" stroke="#cbb58f" stroke-width="2"/>
            <path d="M122 62C220 92 352 180 575 286" fill="none" stroke="#d6a77d" stroke-width="4" stroke-linecap="round"/>
            <path d="M122 286C254 245 382 151 575 62" fill="none" stroke="#9cc5a4" stroke-width="4" stroke-linecap="round"/>
            <path d="M351 174V316M86 174H351" fill="none" stroke="#e7c78d" stroke-width="1.5" stroke-dasharray="6 6"/>
            <circle cx="351" cy="174" r="7" fill="#f0d39b" stroke="#211910" stroke-width="3"/>
            <g fill="#e7d9c5" font-family="Arial,sans-serif" font-size="13"><text x="370" y="164">Point d’équilibre</text><text x="363" y="337">Quantité échangée</text><text x="25" y="22">Prix</text><text x="98" y="340" opacity=".7">Faible</text><text x="602" y="340" opacity=".7">Élevée</text></g>
            <text x="500" y="102" fill="#9cc5a4" font-family="Arial,sans-serif" font-size="15" font-weight="700">OFFRE</text>
            <text x="500" y="255" fill="#d6a77d" font-family="Arial,sans-serif" font-size="15" font-weight="700">DEMANDE</text>
            <text x="65" y="180" text-anchor="end" fill="#e7c78d" font-family="Arial,sans-serif" font-size="12">Prix d’équilibre</text>
          </svg>
          <figcaption>Schéma pédagogique stylisé : il illustre un modèle économique, pas le carnet réel d’une plateforme crypto.</figcaption>
        </figure>
        <h3>Lire le schéma sans se tromper</h3>
        <div class="m11-two-col">
          <article><b>La demande augmente : la courbe se décale vers la droite</b><p>À chaque niveau de prix, les acheteurs souhaitent acquérir davantage. Si l’offre ne change pas, le prix et la quantité d’équilibre tendent tous deux à augmenter.</p></article>
          <article><b>L’offre diminue : la courbe se décale vers la gauche</b><p>À chaque niveau de prix, moins de quantité est proposée. Si la demande ne change pas, le prix d’équilibre tend à augmenter tandis que la quantité échangée tend à diminuer.</p></article>
        </div>
        <p>Une nouvelle règle, une variation des coûts, un changement d’anticipations ou un besoin soudain de vendre peuvent déplacer ces courbes. C’est une manière utile de raisonner sur les pressions économiques. Mais sur une plateforme électronique, les échanges sont réalisés par un moteur de négociation qui confronte des ordres précis, avec des prix et des quantités déterminés.</p>
        <div class="lesson-callout lesson-callout-muted">
          <strong>Ne confonds pas le modèle et le mécanisme</strong>
          <p>Les courbes d’offre et de demande décrivent un équilibre théorique agrégé. Le carnet d’ordres est une liste concrète d’ordres individuels à différents prix. Les deux aident à comprendre la formation des prix, mais ils ne sont pas la même représentation et le prix d’une transaction n’est pas toujours égal à un point d’équilibre théorique.</p>
        </div>
      </section>

      <section class="lesson-section" id="m11-carnet">
        <span class="lesson-kicker">03 · Le mécanisme concret</span>
        <h2>Le carnet d’ordres : les acheteurs d’un côté, les vendeurs de l’autre</h2>
        <p>Sur une plateforme qui utilise un carnet d’ordres, les participants peuvent déposer des ordres indiquant un prix et une quantité. Le carnet regroupe les ordres qui attendent une contrepartie. Il ne montre donc pas toutes les personnes intéressées par le marché : il montre les ordres présents et visibles selon les règles de cette plateforme, à cet instant.</p>
        <figure class="market-figure">
          <div class="market-figure-heading"><span>EXEMPLE FICTIF</span><b>Un carnet d’ordres simplifié</b></div>
          <div class="m11-book">
            <div class="m11-book-side asks">
              <div class="m11-book-title"><span>VENDEURS · ASK</span><small>Prix auxquels certains souhaitent vendre</small></div>
              <div class="m11-book-row"><span>100,10 €</span><i style="--depth:42%"></i><b>4,0</b></div>
              <div class="m11-book-row"><span>100,05 €</span><i style="--depth:27%"></i><b>2,5</b></div>
              <div class="m11-book-row best"><span>100,02 €</span><i style="--depth:16%"></i><b>1,5</b></div>
            </div>
            <div class="m11-book-spread"><span>MEILLEURE VENTE</span><b>100,02 €</b><em>Spread : 0,04 €</em><b>99,98 €</b><span>MEILLEUR ACHAT</span></div>
            <div class="m11-book-side bids">
              <div class="m11-book-title"><span>ACHETEURS · BID</span><small>Prix auxquels certains souhaitent acheter</small></div>
              <div class="m11-book-row best"><span>99,98 €</span><i style="--depth:21%"></i><b>2,0</b></div>
              <div class="m11-book-row"><span>99,95 €</span><i style="--depth:32%"></i><b>3,0</b></div>
              <div class="m11-book-row"><span>99,90 €</span><i style="--depth:52%"></i><b>5,0</b></div>
            </div>
          </div>
          <div class="m11-book-legend"><span><i class="ask-dot"></i> Ordres de vente</span><span><i class="bid-dot"></i> Ordres d’achat</span><span>Quantités en unités fictives</span></div>
          <figcaption>Le meilleur ask est le prix de vente le plus bas disponible ; le meilleur bid est le prix d’achat le plus élevé disponible. Les tailles de barres sont illustratives.</figcaption>
        </figure>
        <div class="m11-definition-grid">
          <article><span>ASK</span><b>100,02 €</b><p>Le vendeur le moins cher propose de vendre à 100,02 €.</p></article>
          <article><span>BID</span><b>99,98 €</b><p>L’acheteur le plus offrant propose d’acheter à 99,98 €.</p></article>
          <article><span>SPREAD</span><b>0,04 €</b><p>La différence entre le meilleur ask et le meilleur bid : 100,02 − 99,98.</p></article>
        </div>
        <h3>Comment un échange peut-il se produire ?</h3>
        <p>Un acheteur qui accepte immédiatement le meilleur prix vendeur peut rencontrer un ordre de vente en attente. Un vendeur qui accepte immédiatement le meilleur prix acheteur peut rencontrer un ordre d’achat en attente. Quand les conditions de prix sont compatibles, la plateforme exécute tout ou partie de l’ordre selon ses règles de priorité et de correspondance. Dans un carnet classique, un achat au marché consomme donc les offres de vente (asks), tandis qu’une vente au marché consomme les offres d’achat (bids).</p>
        <div class="m11-order-compare">
          <article><span class="m11-order-label">ORDRE AU MARCHÉ</span><h3>« Exécute au meilleur prix disponible. »</h3><p>Il cherche une exécution immédiate au meilleur prix disponible, mais ne fixe pas le prix final. Un ordre important peut consommer plusieurs niveaux et obtenir plusieurs prix ; si la profondeur manque, il peut rester partiellement exécuté ou être traité selon les règles propres à la plateforme.</p><div class="m11-order-tradeoff"><b>Priorité :</b> exécution, pas garantie du prix.</div></article>
          <article><span class="m11-order-label">ORDRE LIMITE</span><h3>« N’achète pas au-dessus de ce prix. »</h3><p>Un ordre limite d’achat fixe un prix maximal ; un ordre limite de vente fixe un prix minimal. S’il rencontre un ordre opposé à un prix compatible, il peut être exécuté immédiatement ; sinon, il peut rester en attente. Il contrôle le prix accepté, mais ne garantit pas l’exécution.</p><div class="m11-order-tradeoff"><b>Priorité :</b> contrôle du prix, pas garantie d’exécution.</div></article>
        </div>
        <div class="lesson-callout">
          <strong>Le dernier prix n’est pas nécessairement ton prix d’exécution</strong>
          <p>Le dernier échange peut avoir eu lieu à 100,00 €, alors que le meilleur vendeur propose déjà 100,02 €. Si tu achètes immédiatement, tu peux payer 100,02 € — ou davantage si la quantité demandée dépasse le premier niveau. C’est pourquoi il faut regarder le carnet et pas uniquement le chiffre affiché sur le graphique.</p>
        </div>
      </section>

      <section class="lesson-section" id="m11-liquidite">
        <span class="lesson-kicker">04 · Le coût réel d’un échange</span>
        <h2>Liquidité : pourra-t-on échanger sans trop déplacer le prix ?</h2>
        <p>La liquidité ne se résume pas à un seul chiffre. Pour commencer, observe trois éléments : <strong>le spread</strong> (l’écart entre le meilleur achat et la meilleure vente), <strong>la profondeur</strong> (les quantités disponibles à plusieurs prix) et <strong>l’impact sur le prix</strong> d’un ordre de taille donnée. Le volume échangé apporte une information complémentaire sur l’activité passée, mais il ne garantit pas que des ordres seront encore présents au moment où tu souhaiteras agir.</p>
        <div class="m11-liquidity-triad">
          <article><span>01</span><b>Spread</b><p>Un écart faible réduit généralement le coût immédiat pour entrer puis ressortir, toutes choses égales par ailleurs.</p><small>À regarder : meilleur bid / meilleur ask</small></article>
          <article><span>02</span><b>Profondeur</b><p>Des quantités importantes proches du meilleur prix permettent souvent d’absorber des ordres plus grands avec moins de déplacement.</p><small>À regarder : quantités cumulées par niveau</small></article>
          <article><span>03</span><b>Impact</b><p>Un ordre agressif peut consommer plusieurs niveaux et faire évoluer le prix moyen obtenu.</p><small>À regarder : taille demandée / quantité disponible</small></article>
        </div>
        <h3>Le slippage, expliqué simplement</h3>
        <p>Le <em>slippage</em> est l’écart entre un prix de référence attendu et le prix réellement obtenu à l’exécution. Pour un ordre au marché, le prix peut évoluer entre l’envoi et l’exécution ; une quantité importante peut aussi traverser plusieurs niveaux du carnet. Dans notre simulation, nous isolons volontairement un seul mécanisme : l’impact dû à la profondeur disponible. Les frais, la latence, les annulations et les mouvements du marché ne sont pas simulés.</p>
        <figure class="market-figure">
          <div class="market-figure-heading"><span>À NE PAS CONFONDRE</span><b>Activité passée et liquidité disponible</b></div>
          <div class="m11-volume-depth">
            <div><b>Volume échangé</b><span>Ce qui a été traité pendant une période passée</span><div class="m11-volume-bars"><i style="height:42%"></i><i style="height:72%"></i><i style="height:54%"></i><i style="height:88%"></i><i style="height:65%"></i><i style="height:98%"></i></div><small>Historique des transactions</small></div>
            <div><b>Profondeur du carnet</b><span>Les ordres visibles qui attendent actuellement</span><div class="m11-depth-bars"><i style="height:20%"></i><i style="height:35%"></i><i style="height:50%"></i><i style="height:68%"></i><i style="height:78%"></i><i style="height:92%"></i></div><small>Photographie à un instant donné</small></div>
          </div>
          <figcaption>Illustration qualitative. Le volume passé et la profondeur visible mesurent deux choses différentes.</figcaption>
        </figure>
        <div class="lesson-callout lesson-callout-muted">
          <strong>Un carnet n’est pas une promesse</strong>
          <p>Un ordre visible peut être modifié ou annulé avant d’être exécuté. Une capture du carnet est donc une photographie momentanée, pas une garantie de quantité réellement disponible plus tard. Les ordres cachés, les règles propres à la plateforme et les écarts de données entre fournisseurs compliquent aussi la lecture.</p>
        </div>
      </section>

      <section class="lesson-section" id="m11-simulation">
        <span class="lesson-kicker">05 · Manipuler pour comprendre</span>
        <h2>Expérience interactive : le même ordre dans deux carnets différents</h2>
        <p>Tu souhaites acheter 4 unités. Dans les deux scénarios, le meilleur prix vendeur est identique. La seule différence est la quantité disponible à ce prix et aux niveaux suivants. Modifie la taille de l’ordre et compare le prix moyen obtenu.</p>
        <div class="m11-simulator">
          <div class="m11-sim-head"><div><span>SIMULATION PÉDAGOGIQUE</span><h3>Un achat au marché fictif</h3></div><span class="m11-sim-badge">Données artificielles</span></div>
          <div class="m11-sim-modes" role="group" aria-label="Choisir la profondeur du carnet">
            <button type="button" data-m11-mode="thin" aria-pressed="true">Carnet peu profond</button>
            <button type="button" data-m11-mode="deep" aria-pressed="false">Carnet profond</button>
          </div>
          <div class="m11-sim-layout">
            <div class="m11-sim-book">
              <div class="m11-sim-book-head"><b>Offres de vente disponibles</b><span>Prix en € · Quantité en unités</span></div>
              <div id="m11-sim-levels" class="m11-sim-levels"></div>
            </div>
            <div class="m11-sim-controls">
              <label for="m11-order-size">Quantité à acheter <strong id="m11-order-size-label">4,0 unités</strong></label>
              <input id="m11-order-size" type="range" min="0.5" max="10" step="0.5" value="4">
              <div class="m11-sim-range"><span>0,5</span><span>10 unités</span></div>
              <div class="m11-sim-results">
                <div><span>Prix moyen d’exécution</span><b id="m11-sim-average">—</b></div>
                <div><span>Prix de la première offre</span><b id="m11-sim-best">—</b></div>
                <div><span>Écart au premier prix</span><b id="m11-sim-impact">—</b></div>
                <div><span>Quantité exécutée</span><b id="m11-sim-filled">—</b></div>
              </div>
              <p id="m11-sim-feedback" class="m11-sim-feedback" role="status" aria-live="polite">Choisis un scénario pour observer la différence.</p>
            </div>
          </div>
          <p class="m11-sim-method">La simulation additionne quantité × prix à chaque niveau, puis divise le montant total par la quantité exécutée. Elle ne modélise ni les frais, ni le délai, ni les annulations d’ordres.</p>
        </div>
        <h3>Ce que tu dois observer</h3>
        <ul class="check-list">
          <li>Le meilleur prix peut être identique dans les deux carnets.</li>
          <li>Un carnet plus profond peut absorber un ordre plus important à proximité de ce prix.</li>
          <li>Quand la quantité disponible au meilleur prix est épuisée, l’ordre continue au niveau suivant si une offre y est présente.</li>
          <li>Le prix moyen payé peut donc être différent du premier prix affiché.</li>
        </ul>
      </section>

      <section class="lesson-section" id="m11-cas">
        <span class="lesson-kicker">06 · Mise en situation</span>
        <h2>Trois erreurs fréquentes quand on commence à observer les marchés</h2>
        <div class="m11-misconceptions">
          <article><span>ERREUR 01</span><h3>« Le dernier prix est le prix auquel je peux acheter. »</h3><p><b>Correction :</b> le dernier prix est celui de la dernière transaction. Le meilleur ask indique le prix vendeur actuellement disponible, sous réserve qu’il existe encore au moment de l’envoi et que la quantité suffise.</p></article>
          <article><span>ERREUR 02</span><h3>« Il y a beaucoup de volume, donc je peux forcément exécuter mon ordre. »</h3><p><b>Correction :</b> un volume élevé décrit l’activité réalisée pendant une période. Il ne garantit pas la profondeur présente à cet instant, ni le coût d’un ordre particulier.</p></article>
          <article><span>ERREUR 03</span><h3>« Une capitalisation de 10 milliards signifie qu’il y a 10 milliards disponibles à l’achat. »</h3><p><b>Correction :</b> la capitalisation est généralement calculée en multipliant un prix de référence par une quantité de tokens en circulation. Elle ne représente pas une réserve de liquidités disponible dans le carnet.</p></article>
        </div>
        <div class="m11-application">
          <span>CAS PRATIQUE · FICTIONNEL</span>
          <h3>Tu observes un spread qui s’élargit fortement.</h3>
          <p>Avant de conclure à une hausse imminente ou à une baisse imminente, quelles questions sont pertinentes ?</p>
          <ol>
            <li>Le carnet est-il simplement moins profond qu’avant ?</li>
            <li>Une annonce, une période creuse ou une forte volatilité explique-t-elle le changement ?</li>
            <li>Les autres plateformes affichent-elles des conditions similaires ?</li>
            <li>Le prix affiché est-il un dernier échange, un prix médian ou un indice ?</li>
          </ol>
          <p class="m11-application-end">Un spread plus large signale des conditions de négociation moins favorables ou plus incertaines. À lui seul, il ne donne pas la direction future du prix.</p>
        </div>
      </section>

      <section class="lesson-section" id="m11-glossaire">
        <span class="lesson-kicker">07 · Les mots à connaître</span>
        <h2>Glossaire du chapitre.</h2>
        <p>Ces notions seront réutilisées dans les chapitres sur les chandeliers, le carnet d’ordres et l’order flow. Tu pourras retrouver leur définition directement dans le texte en cliquant ou en passant la souris sur leur première occurrence.</p>
        <div class="market-glossary">
          <details><summary>Carnet d’ordres (order book)</summary><p>Liste des ordres d’achat et de vente en attente sur une plateforme, organisés par niveaux de prix et selon les règles de cette plateforme. Il ne représente pas nécessairement toute la liquidité potentielle du marché.</p></details>
          <details><summary>Bid</summary><p>Meilleur prix proposé par un acheteur, ou côté acheteur d’un carnet. Le meilleur bid est généralement le prix d’achat le plus élevé actuellement affiché.</p></details>
          <details><summary>Ask</summary><p>Meilleur prix demandé par un vendeur, ou côté vendeur d’un carnet. Le meilleur ask est généralement le prix de vente le plus bas actuellement affiché.</p></details>
          <details><summary>Spread</summary><p>Écart entre le meilleur ask et le meilleur bid. Il mesure une partie du coût immédiat de négociation et peut varier rapidement.</p></details>
          <details><summary>Liquidité</summary><p>Capacité à acheter ou vendre une quantité avec un impact limité sur le prix et un coût de transaction raisonnable. Elle dépend du marché, de la taille de l’ordre et du moment.</p></details>
          <details><summary>Profondeur (depth)</summary><p>Quantité d’ordres disponibles à différents niveaux de prix dans le carnet. La profondeur cumulée additionne les quantités jusqu’à un niveau donné.</p></details>
          <details><summary>Slippage</summary><p>Écart entre un prix de référence ou attendu et le prix effectivement obtenu lors de l’exécution. Il peut provenir de la profondeur, de la volatilité, de la latence ou d’autres facteurs.</p></details>
          <details><summary>Ordre au marché (market order)</summary><p>Instruction qui cherche à exécuter immédiatement l’achat ou la vente au meilleur prix disponible. Elle ne garantit pas un prix d’exécution précis.</p></details>
          <details><summary>Ordre limite (limit order)</summary><p>Instruction qui fixe le prix maximal d’achat ou le prix minimal de vente accepté. Elle contrôle le prix, mais peut rester non exécutée.</p></details>
          <details><summary>Capitalisation boursière (market cap)</summary><p>Estimation généralement calculée en multipliant un prix de référence par une quantité d’unités en circulation, dont la définition peut varier selon le fournisseur. Elle ne correspond pas au montant de liquidités disponible pour acheter ou vendre.</p></details>
        </div>
      </section>

      <section class="lesson-section" id="m11-retenir">
        <span class="lesson-kicker">08 · Synthèse</span>
        <h2>Ce qu’il faut absolument retenir.</h2>
        <div class="m11-takeaways">
          <article><span>01</span><b>Un prix dépend du lieu et de la méthode</b><p>Dernier échange, meilleure offre, prix médian et indice ne désignent pas forcément le même chiffre.</p></article>
          <article><span>02</span><b>Les ordres se rencontrent</b><p>Le moteur de négociation confronte des ordres compatibles selon des règles de priorité et d’exécution.</p></article>
          <article><span>03</span><b>Bid et ask encadrent le spread</b><p>Le bid est le meilleur prix acheteur ; l’ask est le meilleur prix vendeur. Leur différence est le spread.</p></article>
          <article><span>04</span><b>La liquidité est multidimensionnelle</b><p>Spread, profondeur et impact doivent être observés ensemble. Un volume historique ne garantit pas la profondeur future.</p></article>
          <article><span>05</span><b>La capitalisation n’est pas un carnet</b><p>Une capitalisation élevée ne signifie pas que le même montant peut être échangé sans déplacer le prix.</p></article>
        </div>
        <div class="lesson-callout"><strong>Le réflexe Atlas Crypto</strong><p>Avant d’interpréter un mouvement, demande-toi : sur quelle plateforme ? Quel prix est affiché ? Quel est le spread ? Quelle quantité est disponible ? Mon ordre pourrait-il consommer plusieurs niveaux ? Cette discipline évite de confondre un chiffre de graphique avec un prix réellement exécutable.</p></div>
      </section>

      <section class="lesson-section" id="m11-quiz">
        <span class="lesson-kicker">09 · Vérification active</span>
        <h2>Vérifier tes acquis.</h2>
        <p>Prends le temps de lire les explications, y compris lorsque ta réponse est correcte. Le but est de comprendre le raisonnement, pas seulement de mémoriser les mots.</p>
        <div class="quiz-progress-wrap"><div class="quiz-progress-track"><span id="quiz-progress-fill"></span></div><b id="quiz-progress-label">0 / 6 réponses</b></div>
        <div class="btc-quiz-set">
          <article class="quiz-question" data-question><span class="question-count">Question 1 / 6 · Prix</span><h3>Le dernier prix affiché est-il nécessairement le prix auquel tu peux acheter immédiatement ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="Le dernier prix est celui de la dernière transaction. Le meilleur ask peut déjà être différent.">Oui, c’est toujours le prix exécutable</button><button type="button" data-correct="true" data-explanation="Exact. Pour un achat immédiat, il faut regarder les offres de vente disponibles et la quantité souhaitée, pas uniquement la dernière transaction.">Non, il faut regarder les offres de vente disponibles</button><button type="button" data-correct="false" data-explanation="Le prix de référence peut être utile, mais il ne remplace pas l’observation du carnet et des conditions d’exécution.">Non, aucun prix affiché n’a d’utilité</button></div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 2 / 6 · Carnet</span><h3>Quel est le meilleur bid ?</h3><div class="quiz-options"><button type="button" data-correct="true" data-explanation="Exact. Les acheteurs proposent des prix. Le meilleur bid est le plus élevé de ces prix.">Le prix d’achat le plus élevé actuellement proposé</button><button type="button" data-correct="false" data-explanation="Le meilleur ask est le prix de vente le plus bas.">Le prix de vente le plus bas actuellement proposé</button><button type="button" data-correct="false" data-explanation="Le prix médian est souvent calculé entre le meilleur bid et le meilleur ask ; il n’est pas nécessairement un ordre présent dans le carnet.">Le prix moyen de tous les ordres</button></div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 3 / 6 · Spread</span><h3>Si le meilleur bid est à 99,98 € et le meilleur ask à 100,02 €, quel est le spread ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="0,02 € correspond à la moitié du spread dans cet exemple, pas au spread complet.">0,02 €</button><button type="button" data-correct="true" data-explanation="Exact : 100,02 − 99,98 = 0,04 €.">0,04 €</button><button type="button" data-correct="false" data-explanation="Le spread est l’écart entre ask et bid, et non leur somme.">200,00 €</button></div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 4 / 6 · Types d’ordres</span><h3>Quelle affirmation décrit le mieux un ordre limite ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="Un ordre limite peut rester en attente si aucune contrepartie n’accepte le prix.">Il garantit une exécution immédiate</button><button type="button" data-correct="true" data-explanation="Exact. Un ordre limite fixe un prix maximal à l’achat ou minimal à la vente, mais l’exécution n’est pas garantie.">Il fixe le prix accepté, sans garantir l’exécution</button><button type="button" data-correct="false" data-explanation="Un ordre limite ne demande pas une exécution à n’importe quel prix : c’est précisément ce qu’il cherche à éviter.">Il accepte n’importe quel prix pour être exécuté</button></div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 5 / 6 · Liquidité</span><h3>Pourquoi un ordre au marché important peut-il obtenir un prix moyen moins favorable ?</h3><div class="quiz-options"><button type="button" data-correct="true" data-explanation="Exact. Lorsque la quantité du premier niveau est épuisée, l’ordre peut rencontrer les prix des niveaux suivants.">Il peut consommer plusieurs niveaux du carnet</button><button type="button" data-correct="false" data-explanation="Un grand ordre n’est pas automatiquement exécuté au même prix ; il dépend de la quantité disponible à chaque niveau.">Le carnet garantit le même prix pour toute quantité</button><button type="button" data-correct="false" data-explanation="Le spread est l’écart entre meilleur bid et meilleur ask ; il ne constitue pas à lui seul l’explication du prix moyen d’un ordre qui traverse le carnet.">Le spread disparaît dès qu’un ordre arrive</button></div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 6 / 6 · Esprit critique</span><h3>Que signifie une capitalisation de 10 milliards d’euros ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="La capitalisation n’est pas un montant détenu dans une réserve et disponible pour les acheteurs.">Que 10 milliards d’euros attendent dans le carnet</button><button type="button" data-correct="true" data-explanation="Exact. La capitalisation est généralement un prix de référence multiplié par une offre en circulation. Elle ne mesure pas la liquidité exécutable.">Une estimation fondée sur un prix et une quantité en circulation</button><button type="button" data-correct="false" data-explanation="Une capitalisation n’est pas une garantie de stabilité et peut changer lorsque le prix varie.">Que le prix ne peut plus baisser fortement</button></div><p class="quiz-feedback" role="status"></p></article>
          <div class="quiz-summary" id="quiz-summary" aria-live="polite">0 / 6 réponses validées</div>
          <button class="quiz-reset" id="quiz-reset" type="button">Recommencer le quiz</button>
        </div>
      </section>

      <section class="lesson-section" id="m11-sources">
        <span class="lesson-kicker">10 · Références traçables</span>
        <h2>Sources et lectures complémentaires.</h2>
        <p>Les ressources ci-dessous expliquent les types d’ordres, la structure du carnet et les mesures de liquidité. Certaines décrivent les marchés financiers traditionnels ; leurs principes de base sont utiles, mais les règles précises d’exécution doivent toujours être vérifiées sur la plateforme crypto concernée.</p>
        <div class="source-list">
          <a href="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-14" target="_blank" rel="noopener noreferrer"><span>Éducation des investisseurs · SEC · mis à jour le 18 août 2026</span><b>Understanding Order Types</b><small>Ordres au marché et limites, prix d’exécution, ordres de grande taille et rappel que les instructions disponibles varient selon l’intermédiaire. Les principes sont présentés pour les actions et doivent être rapprochés des règles de chaque plateforme crypto.</small><em>Consulter le bulletin ↗</em></a>
          <a href="https://www.cmegroup.com/education/articles-and-reports/understanding-the-cme-liquidity-tool-methodology" target="_blank" rel="noopener noreferrer"><span>Microstructure · CME Group</span><b>Understanding the CME Liquidity Tool Methodology</b><small>Construction du carnet électronique, mises à jour, spread et mesures de profondeur.</small><em>Lire la méthodologie ↗</em></a>
          <a href="https://support.kraken.com/articles/115000364388-trading-glossary" target="_blank" rel="noopener noreferrer"><span>Marchés crypto · Kraken · mis à jour le 24 août 2026</span><b>Trading Glossary</b><small>Définitions de bid, ask, spread, profondeur, liquidité et slippage dans le contexte des marchés crypto.</small><em>Consulter le glossaire ↗</em></a>
          <a href="https://www.esma.europa.eu/sites/default/files/2024-04/ESMA50-524821-3153_risk_article_crypto_assets_market_structures_and_eu_relevance.pdf" target="_blank" rel="noopener noreferrer"><span>Analyse de marché · ESMA, 10 avril 2024</span><b>Crypto-assets: Market structures and EU relevance</b><small>Analyse des volumes, de la concentration des plateformes et des différences de liquidité entre cryptoactifs.</small><em>Lire l’étude ↗</em></a>
        </div>
        <p class="editorial-note"><b>Note éditoriale :</b> les schémas et quantités de cette fiche sont des exemples pédagogiques fictifs. Les carnets réels évoluent en continu, peuvent différer d’une plateforme à l’autre et ne montrent pas nécessairement toute la liquidité disponible. Cette fiche a un objectif éducatif et ne constitue pas un conseil en investissement ni un signal de trading.</p>
      </section>
    `
  }
});

window.initMarketsLessonInteractions = function(chapterNumber) {
  if (chapterNumber !== 11) return;
  const quantityInput = document.querySelector('#m11-order-size');
  const levelsElement = document.querySelector('#m11-sim-levels');
  if (!quantityInput || !levelsElement) return;

  const books = {
    thin: [
      { price: 100.02, quantity: 1.0 },
      { price: 100.10, quantity: 2.0 },
      { price: 100.25, quantity: 4.0 }
    ],
    deep: [
      { price: 100.02, quantity: 8.0 },
      { price: 100.03, quantity: 12.0 },
      { price: 100.05, quantity: 20.0 }
    ]
  };
  let mode = 'thin';
  const fmtQty = value => value.toLocaleString('fr-FR', {minimumFractionDigits: 1, maximumFractionDigits: 1});
  const fmtPrice = value => value.toLocaleString('fr-FR', {style:'currency', currency:'EUR', minimumFractionDigits:2, maximumFractionDigits:2});

  const calculate = requested => {
    let remaining = requested, filled = 0, notional = 0;
    const usage = books[mode].map(level => {
      const used = Math.min(level.quantity, remaining);
      remaining -= used;
      filled += used;
      notional += used * level.price;
      return used;
    });
    return {filled, remaining, notional, average: filled ? notional / filled : 0, usage};
  };

  const render = () => {
    const requested = Number(quantityInput.value);
    const levels = books[mode];
    const result = calculate(requested);
    const best = levels[0].price;
    const impact = result.filled ? (result.average - best) / best * 100 : 0;
    const maxQuantity = Math.max(...levels.map(level => level.quantity));

    levelsElement.replaceChildren();
    levels.forEach((level, index) => {
      const used = result.usage[index];
      const row = document.createElement('div');
      row.className = 'm11-sim-level' + (used >= level.quantity ? ' is-consumed' : used > 0 ? ' is-partial' : '');
      const price = document.createElement('b');
      price.textContent = fmtPrice(level.price);
      const track = document.createElement('span');
      track.className = 'm11-sim-track';
      const fill = document.createElement('i');
      fill.style.width = (level.quantity / maxQuantity * 100) + '%';
      track.append(fill);
      const qty = document.createElement('span');
      qty.className = 'm11-sim-qty';
      qty.textContent = fmtQty(level.quantity) + (used > 0 ? ' · exécuté ' + fmtQty(used) : '');
      row.append(price, track, qty);
      row.setAttribute('aria-label', 'Offre à ' + fmtPrice(level.price) + ', quantité ' + fmtQty(level.quantity) + ', utilisée ' + fmtQty(used));
      levelsElement.append(row);
    });

    document.querySelector('#m11-order-size-label').textContent = fmtQty(requested) + ' unités';
    document.querySelector('#m11-sim-average').textContent = result.filled ? fmtPrice(result.average) : '—';
    document.querySelector('#m11-sim-best').textContent = fmtPrice(best);
    document.querySelector('#m11-sim-impact').textContent = result.filled ? impact.toLocaleString('fr-FR', {minimumFractionDigits:3, maximumFractionDigits:3}) + ' %' : '—';
    document.querySelector('#m11-sim-filled').textContent = fmtQty(result.filled) + ' / ' + fmtQty(requested);
    const feedback = document.querySelector('#m11-sim-feedback');
    if (result.remaining > 0) {
      feedback.textContent = 'Le carnet fictif ne contient pas assez de quantité pour exécuter tout l’ordre. Une partie reste non exécutée.';
    } else if (result.usage.filter(value => value > 0).length === 1) {
      feedback.textContent = 'Tout l’ordre est exécuté au premier niveau. Dans ce scénario simplifié, le prix moyen reste égal au meilleur ask.';
    } else {
      feedback.textContent = 'L’ordre consomme plusieurs niveaux. Le prix moyen augmente par rapport au premier ask : la profondeur disponible influence le coût de l’exécution.';
    }
  };

  document.querySelectorAll('[data-m11-mode]').forEach(button => {
    button.addEventListener('click', () => {
      mode = button.dataset.m11Mode;
      document.querySelectorAll('[data-m11-mode]').forEach(item => {
        const selected = item === button;
        item.setAttribute('aria-pressed', String(selected));
      });
      render();
    });
  });
  quantityInput.addEventListener('input', render);
  render();
};
