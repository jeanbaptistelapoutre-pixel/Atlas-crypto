/* Atlas Crypto — contenus pédagogiques enrichis. Les fiches sont ajoutées progressivement. */
window.ATLAS_LESSONS = {
  1: {
    minutes: 22,
    level: 'Débutant · aucun prérequis',
    objectives: [
      'Distinguer les trois fonctions économiques de la monnaie.',
      'Comprendre pourquoi un moyen de paiement n’est pas toujours de la monnaie.',
      'Identifier les formes de monnaie utilisées aujourd’hui.',
      'Expliquer simplement la confiance, le crédit et le pouvoir d’achat.'
    ],
    toc: [
      ['demarrer', 'Le problème à résoudre'],
      ['fonctions', 'Les trois fonctions'],
      ['troc', 'Au-delà du troc'],
      ['confiance', 'Pourquoi l’accepte-t-on ?'],
      ['formes', 'Les formes de monnaie'],
      ['creation', 'Comment la monnaie est créée'],
      ['pouvoir-achat', 'Inflation et pouvoir d’achat'],
      ['cas-pratique', 'Cas pratique'],
      ['glossaire', 'Glossaire'],
      ['retenir', 'À retenir'],
      ['quiz', 'Vérifier ses acquis'],
      ['sources', 'Sources']
    ],
    html: `
      <div class="lesson-overview" id="demarrer">
        <div class="lesson-overview-main">
          <span class="lesson-kicker">L’idée centrale</span>
          <h2>La monnaie est un outil collectif pour organiser les échanges dans le temps.</h2>
          <p>Imagine que tu veuilles acheter un café, payer ton loyer, comparer deux offres d’emploi et mettre de l’argent de côté pour l’année prochaine. Sans unité commune et sans moyen de règlement largement accepté, chacune de ces opérations devient plus compliquée.</p>
          <p>La monnaie résout une partie de ces problèmes. Elle ne supprime ni les inégalités, ni les crises, ni le risque de perte de valeur. Elle fournit surtout un langage commun et une infrastructure de paiement que les personnes peuvent utiliser.</p>
        </div>
        <div class="lesson-facts">
          <div><span>Durée estimée</span><strong>22 min</strong></div>
          <div><span>Niveau</span><strong>Débutant</strong></div>
          <div><span>Objectif</span><strong>Comprendre</strong></div>
        </div>
      </div>

      <section class="lesson-section" id="fonctions">
        <span class="lesson-kicker">01 · Le socle</span>
        <h2>Les trois fonctions fondamentales de la monnaie</h2>
        <p>On reconnaît généralement la monnaie à trois rôles complémentaires. Un même instrument ne les remplit pas toujours parfaitement : une chose peut être pratique pour payer mais mauvaise pour conserver son pouvoir d’achat, ou servir de référence de prix sans être utilisée directement au quotidien.</p>
        <div class="function-grid">
          <article class="function-card">
            <div class="function-symbol">01</div>
            <h3>Unité de compte</h3>
            <p><strong>La monnaie sert de règle graduée pour les prix.</strong> Elle permet d’exprimer la valeur des biens et des services dans une même unité.</p>
            <div class="mini-example"><b>Exemple</b><span>Un livre coûte 18 € et un repas 12 €. Tu peux comparer les deux prix sans devoir échanger directement des livres contre des repas.</span></div>
            <p class="plain-language"><b>À comprendre :</b> c’est le langage commun des prix, comme le mètre est une unité commune pour mesurer des longueurs.</p>
          </article>
          <article class="function-card">
            <div class="function-symbol">02</div>
            <h3>Moyen d’échange</h3>
            <p><strong>La monnaie facilite le paiement.</strong> Le vendeur accepte de recevoir une valeur monétaire plutôt que de chercher lui-même un bien qui lui serait utile.</p>
            <div class="mini-example"><b>Exemple</b><span>Tu paies ton café 2 €. Le café n’a pas besoin de vouloir tes chaussures en échange ; il accepte un paiement qui pourra servir à son tour.</span></div>
            <p class="plain-language"><b>À comprendre :</b> la monnaie évite d’avoir à trouver exactement la personne qui possède ce que tu veux et qui veut précisément ce que tu proposes.</p>
          </article>
          <article class="function-card">
            <div class="function-symbol">03</div>
            <h3>Réserve de valeur</h3>
            <p><strong>La monnaie permet de déplacer du pouvoir d’achat dans le temps.</strong> Tu peux recevoir un revenu aujourd’hui et l’utiliser plus tard.</p>
            <div class="mini-example"><b>Exemple</b><span>Tu reçois 100 € cette semaine et tu en conserves une partie pour payer une facture le mois prochain.</span></div>
            <p class="plain-language"><b>À comprendre :</b> conserver une somme ne garantit pas qu’elle permettra d’acheter exactement les mêmes choses plus tard. Les prix peuvent évoluer.</p>
          </article>
        </div>
        <figure class="lesson-figure">
          <div class="three-functions" role="img" aria-label="La monnaie relie les prix, les paiements et le temps">
            <div class="function-node"><span>Comparer</span><strong>Unité de compte</strong><small>Les prix parlent la même langue</small></div>
            <div class="function-connector">↔</div>
            <div class="function-node"><span>Échanger</span><strong>Moyen d’échange</strong><small>Le paiement est accepté</small></div>
            <div class="function-connector">↔</div>
            <div class="function-node"><span>Reporter</span><strong>Réserve de valeur</strong><small>Le pouvoir d’achat traverse le temps</small></div>
          </div>
          <figcaption>Trois fonctions distinctes, mais qui se renforcent mutuellement.</figcaption>
        </figure>
        <div class="lesson-callout"><strong>Un point important</strong><p>Une monnaie « parfaite » n’existe pas. Pour juger un instrument monétaire, demande-toi quelle fonction il remplit bien, dans quel contexte et avec quelles limites.</p></div>
      </section>

      <section class="lesson-section" id="troc">
        <span class="lesson-kicker">02 · Pourquoi ce système est utile</span>
        <h2>Le troc : une possibilité, mais pas une solution universelle</h2>
        <p>Le troc consiste à échanger directement un bien ou un service contre un autre. Il peut fonctionner dans un petit groupe ou pour une transaction ponctuelle. Mais il devient difficile à organiser lorsque les participants sont nombreux et que leurs besoins ne coïncident pas.</p>
        <div class="story-card">
          <div class="story-label">Une situation imaginaire</div>
          <div class="story-person"><span class="avatar">A</span><div><b>Amine, boulanger</b><p>Il a du pain à échanger et voudrait faire réparer son vélo.</p></div></div>
          <div class="story-person"><span class="avatar">L</span><div><b>Léa, mécanicienne</b><p>Elle sait réparer les vélos, mais elle n’a pas besoin de pain aujourd’hui.</p></div></div>
          <div class="story-result"><b>Le blocage</b><p>Amine doit trouver une autre personne qui veut du pain et qui peut offrir quelque chose que Léa souhaite. L’échange devient une recherche à plusieurs étapes.</p></div>
        </div>
        <h3>La difficulté de la double coïncidence des besoins</h3>
        <p>Pour qu’un troc direct fonctionne, il faut que chaque personne veuille précisément ce que l’autre propose, au même moment. Les économistes appellent cela la <em>double coïncidence des besoins</em>. La monnaie réduit cette contrainte : Amine vend son pain contre de la monnaie, puis utilise cette monnaie pour payer Léa.</p>
        <figure class="lesson-figure">
          <div class="exchange-diagram">
            <div class="exchange-lane"><span class="lane-tag">Sans monnaie</span><div class="exchange-person">Amine<br><small>propose du pain</small></div><div class="exchange-arrow blocked">?</div><div class="exchange-person">Léa<br><small>veut autre chose</small></div><p class="lane-note">Il faut trouver un échange qui convient aux deux personnes.</p></div>
            <div class="exchange-lane"><span class="lane-tag">Avec monnaie</span><div class="exchange-person">Amine<br><small>vend son pain</small></div><div class="exchange-arrow">→ € →</div><div class="exchange-person">Léa<br><small>répare le vélo</small></div><p class="lane-note">Chaque personne peut accepter la monnaie et l’utiliser dans un autre échange.</p></div>
          </div>
          <figcaption>Schéma pédagogique simplifié : la monnaie sépare la vente de l’achat.</figcaption>
        </figure>
        <div class="lesson-callout lesson-callout-muted"><strong>Évitons une idée trop simple</strong><p>L’histoire économique ne se résume pas à un monde entier organisé par le troc, puis à l’invention soudaine de la monnaie. Les formes de crédit, de dette, de comptabilité et d’échange ont coexisté de façons différentes selon les sociétés et les époques. Le troc reste une explication utile d’un problème économique, pas une chronologie universelle.</p></div>
        <h3>Les limites pratiques du troc</h3>
        <ul class="check-list">
          <li><b>Fractionnement :</b> comment échanger une vache contre quelques heures de travail sans devoir découper la valeur en parts ?</li>
          <li><b>Conservation :</b> certains biens se détériorent, prennent de la place ou coûtent cher à stocker.</li>
          <li><b>Transport :</b> déplacer des biens lourds ou fragiles peut coûter cher.</li>
          <li><b>Comparaison :</b> sans unité commune, comparer des centaines de prix devient laborieux.</li>
          <li><b>Temps :</b> une personne peut vouloir être payée maintenant et acheter plus tard.</li>
        </ul>
      </section>

      <section class="lesson-section" id="confiance">
        <span class="lesson-kicker">03 · Le mécanisme social</span>
        <h2>Pourquoi acceptons-nous une monnaie ?</h2>
        <p>Un billet n’est pas utile parce que son papier serait précieux. Un solde bancaire n’est pas utile parce que les chiffres affichés à l’écran auraient une valeur matérielle. Ils sont utiles parce qu’un ensemble de personnes, d’organisations, de règles et d’infrastructures permet de les utiliser et s’attend à ce que d’autres les acceptent aussi.</p>
        <div class="quote-panel"><p>La confiance monétaire n’est pas seulement un sentiment individuel : elle repose sur des mécanismes vérifiables, des institutions, des règles et la capacité de régler les paiements.</p><span>Idée essentielle à retenir</span></div>
        <div class="trust-grid">
          <article><span>01</span><h3>Acceptation</h3><p>Les commerçants, entreprises, salariés et administrations sont disposés à recevoir cette monnaie dans un espace donné.</p></article>
          <article><span>02</span><h3>Règles</h3><p>Les lois, contrats et conventions précisent comment les paiements sont effectués et quelles obligations peuvent être réglées.</p></article>
          <article><span>03</span><h3>Infrastructure</h3><p>Banques, réseaux de paiement, systèmes de règlement et dispositifs de sécurité permettent de transférer la valeur.</p></article>
          <article><span>04</span><h3>Stabilité attendue</h3><p>Les utilisateurs pensent pouvoir continuer à utiliser cette unité demain, même si son pouvoir d’achat peut varier.</p></article>
        </div>
        <h3>La confiance fonctionne comme un réseau</h3>
        <p>Plus une monnaie est acceptée, plus elle devient pratique pour les autres utilisateurs. C’est un effet de réseau : le moyen de paiement que beaucoup de personnes utilisent est souvent plus utile que celui que très peu acceptent. Mais l’acceptation seule ne suffit pas : une monnaie peut être largement utilisée et perdre du pouvoir d’achat, ou être difficile à transférer dans certaines situations.</p>
        <div class="lesson-callout"><strong>Confiance ne veut pas dire absence de risque</strong><p>Une monnaie peut subir de l’inflation, une crise bancaire, des restrictions de convertibilité, des problèmes techniques ou une perte de confiance. Il faut toujours demander : qui promet quoi, quelles règles s’appliquent et que se passe-t-il si quelque chose échoue ?</p></div>
      </section>

      <section class="lesson-section" id="formes">
        <span class="lesson-kicker">04 · Ce que nous utilisons aujourd’hui</span>
        <h2>Les différentes formes de monnaie</h2>
        <p>Dans une économie moderne, « l’argent » n’est pas uniquement constitué de pièces et de billets. Une grande partie de la monnaie utilisée au quotidien existe sous forme de dépôts inscrits dans les comptes bancaires. Il faut distinguer la nature de la monnaie de l’outil utilisé pour la transférer.</p>
        <div class="money-type-grid">
          <article class="money-type"><div class="money-icon">€</div><h3>Monnaie fiduciaire</h3><p>Les billets et les pièces en euros. Ils sont émis dans le cadre du système de l’Eurosystème et peuvent être utilisés directement pour régler un achat.</p><span>Exemple : billet de 20 €</span></article>
          <article class="money-type"><div class="money-icon">▤</div><h3>Monnaie scripturale</h3><p>Les dépôts inscrits sur les comptes des clients auprès des banques commerciales. C’est une créance du client sur sa banque, utilisable pour payer et transférer.</p><span>Exemple : solde du compte courant</span></article>
          <article class="money-type"><div class="money-icon">◈</div><h3>Monnaie centrale</h3><p>La monnaie émise par la banque centrale. Le public la connaît surtout sous forme de billets ; les banques détiennent aussi des réserves auprès de la banque centrale.</p><span>Exemple : billets et réserves bancaires</span></article>
          <article class="money-type"><div class="money-icon">₿</div><h3>Cryptoactif</h3><p>Un actif numérique régi par les règles d’un réseau ou d’un protocole. Il peut servir à transférer de la valeur, mais ne remplit pas automatiquement toutes les fonctions d’une monnaie courante.</p><span>Exemple : bitcoin (BTC)</span></article>
        </div>
        <div class="distinction-panel"><div><span class="lesson-kicker">Distinction essentielle</span><h3>La carte bancaire n’est pas la monnaie.</h3><p>La carte, le virement, le prélèvement ou le paiement mobile sont des <b>instruments ou moyens de paiement</b> : ils permettent de transférer de la monnaie. Quand tu paies 35 € par carte, le geste est électronique, mais la valeur réglée correspond généralement à un transfert de monnaie scripturale entre comptes.</p></div><div class="distinction-visual"><div class="flow-chip">Compte bancaire<br><b>35 €</b></div><div class="flow-arrow">→</div><div class="flow-chip">Réseau de paiement<br><b>transfert</b></div><div class="flow-arrow">→</div><div class="flow-chip">Compte du commerçant<br><b>35 €</b></div></div></div>
        <h3>Un système à plusieurs étages</h3>
        <p>Dans la zone euro, les dépôts bancaires et la monnaie de banque centrale sont liés, mais ce ne sont pas exactement la même chose. Un dépôt est une créance sur une banque commerciale. Les réserves sont des créances des banques sur la banque centrale. Les banques utilisent la monnaie centrale pour régler entre elles certains paiements et obligations.</p>
        <figure class="lesson-figure">
          <div class="layers-diagram">
            <div class="layer layer-public"><b>Public et entreprises</b><span>Utilisent espèces et dépôts bancaires</span></div>
            <div class="layer-link">Dépôts · paiements · retraits</div>
            <div class="layer layer-bank"><b>Banques commerciales</b><span>Gèrent les comptes et les paiements des clients</span></div>
            <div class="layer-link">Réserves · règlement entre banques</div>
            <div class="layer layer-central"><b>Banque centrale</b><span>Émet la monnaie centrale et met en œuvre la politique monétaire</span></div>
          </div>
          <figcaption>Vue simplifiée de quelques relations dans le système monétaire de la zone euro.</figcaption>
        </figure>
      </section>

      <section class="lesson-section" id="creation">
        <span class="lesson-kicker">05 · Le circuit monétaire</span>
        <h2>Comment la monnaie est-elle créée ?</h2>
        <p>Contrairement à une idée répandue, dans le système bancaire moderne, les banques commerciales ne se contentent pas de prêter à un client l’argent qu’un autre client vient de déposer. Lorsqu’une banque accorde un prêt, elle inscrit généralement un dépôt correspondant au crédit sur le compte de l’emprunteur : cette opération crée de la monnaie scripturale.</p>
        <div class="loan-example">
          <div class="loan-header"><span class="lesson-kicker">Exemple simplifié</span><h3>Une banque accorde un prêt de 10 000 €</h3><p>Voici ce qui se passe dans son bilan au moment du versement du prêt.</p></div>
          <div class="balance-grid">
            <div class="balance-card"><b>À l’actif de la banque</b><div class="balance-line"><span>Créance sur l’emprunteur</span><strong>+10 000 €</strong></div><small>La banque a le droit de recevoir les remboursements prévus au contrat.</small></div>
            <div class="balance-card"><b>Au passif de la banque</b><div class="balance-line"><span>Dépôt sur le compte client</span><strong>+10 000 €</strong></div><small>La banque doit honorer les paiements et retraits du client selon les règles applicables.</small></div>
          </div>
          <div class="loan-result"><b>Résultat immédiat :</b> le dépôt bancaire de 10 000 € nouvellement inscrit constitue de la monnaie scripturale supplémentaire.</div>
        </div>
        <h3>Et lorsque le prêt est remboursé ?</h3>
        <p>Quand l’emprunteur rembourse le principal du prêt à sa banque, la créance correspondante diminue et le dépôt utilisé pour le remboursement est débité : la monnaie scripturale créée par ce prêt est ainsi détruite progressivement. Les intérêts, eux, constituent un revenu pour la banque et ne sont pas la même opération que le remboursement du principal.</p>
        <div class="process-steps">
          <div><span>1</span><b>Accord du crédit</b><p>La banque évalue le dossier et décide si elle accepte de prêter.</p></div>
          <div><span>2</span><b>Inscription du dépôt</b><p>Le compte de l’emprunteur est crédité : un dépôt est créé.</p></div>
          <div><span>3</span><b>Dépense et règlement</b><p>L’emprunteur paie ; les banques règlent les transferts entre elles.</p></div>
          <div><span>4</span><b>Remboursement</b><p>Le principal remboursé réduit le crédit et détruit la monnaie correspondante.</p></div>
        </div>
        <div class="lesson-callout lesson-callout-muted"><strong>Les banques ne peuvent pas créer de monnaie sans limite</strong><p>Leur activité est contrainte par la demande de crédit solvable, le risque de défaut, les exigences de fonds propres et de liquidité, la réglementation, le coût du financement, les taux d’intérêt et la nécessité de régler les paiements. La banque centrale influence les conditions monétaires et financières, mais elle ne fixe pas mécaniquement chaque prêt accordé à chaque ménage.</p></div>
      </section>

      <section class="lesson-section" id="pouvoir-achat">
        <span class="lesson-kicker">06 · La valeur dans le temps</span>
        <h2>Inflation : pourquoi 100 € ne gardent pas toujours le même pouvoir d’achat</h2>
        <p>Le pouvoir d’achat mesure la quantité de biens et de services qu’une somme permet d’obtenir. Lorsque le niveau général des prix augmente, une même somme nominale permet en moyenne d’acheter moins. C’est ce que l’on appelle une baisse du pouvoir d’achat de la monnaie.</p>
        <div class="everyday-example"><div class="basket-icon">🧺</div><div><b>Imagine le même panier de courses</b><p>Il coûte 100 € aujourd’hui. Si le niveau de prix de ce panier augmente de 3 % par an, il coûterait environ 134,39 € dans dix ans. Avec toujours 100 €, tu pourrais acheter une part plus petite du même panier.</p></div></div>
        <div class="inflation-calculator" id="inflation-calculator">
          <div class="calculator-heading"><span class="lesson-kicker">Mini-simulation interactive</span><h3>Que devient le pouvoir d’achat d’une somme ?</h3><p>Modifie les hypothèses pour observer l’effet d’une hausse moyenne des prix. Ce calcul est une illustration mathématique, pas une prévision d’inflation.</p></div>
          <div class="calculator-fields">
            <label>Somme conservée (€)<input id="calc-amount" type="number" min="1" max="100000000" value="100" step="10"></label>
            <label>Hausse annuelle des prix (%)<input id="calc-inflation" type="number" min="0" max="100" value="3" step="0.1"></label>
            <label>Durée (années)<input id="calc-years" type="number" min="1" max="100" value="10" step="1"></label>
          </div>
          <div class="calculator-output" aria-live="polite"><span>Valeur en pouvoir d’achat d’aujourd’hui</span><strong id="calc-result">74,41 €</strong><p id="calc-explanation">Avec ces hypothèses, 100 € dans dix ans achèteraient environ autant que 74,41 € aujourd’hui.</p></div>
          <p class="calculator-note">Hypothèse : le même taux annuel s’applique chaque année et la somme reste fixe. Le calcul n’intègre ni intérêts, ni impôts, ni évolution différente des prix selon les produits.</p>
        </div>
        <h3>Inflation et prix individuels : ne pas confondre</h3>
        <p>Le prix d’un seul produit peut augmenter parce qu’il devient rare, parce que sa qualité change ou parce que sa demande progresse. L’inflation désigne une hausse plus générale du niveau des prix, mesurée à partir d’un panier de biens et services. Ton inflation personnelle peut différer de l’indice moyen, car tu ne consommes pas exactement le même panier que tout le monde.</p>
        <div class="two-column-note"><div><b>Valeur nominale</b><p>Le nombre d’euros affiché : 100 €, 1 000 €, 2 000 €.</p></div><div><b>Valeur réelle</b><p>Ce que cette somme permet d’acheter, après prise en compte de l’évolution des prix.</p></div></div>
        <div class="lesson-callout"><strong>Réserve de valeur ne signifie pas valeur garantie</strong><p>La monnaie facilite l’épargne de court terme et les paiements futurs, mais son pouvoir d’achat peut diminuer. D’autres actifs peuvent parfois préserver la valeur sur certaines périodes, mais ils présentent leurs propres risques et ne sont pas nécessairement de la monnaie.</p></div>
      </section>

      <section class="lesson-section" id="cas-pratique">
        <span class="lesson-kicker">07 · Mettre en pratique</span>
        <h2>Cas pratique : tu reçois 2 000 € de salaire</h2>
        <p>Tu reçois ton salaire sur ton compte bancaire. Tu utilises une carte pour payer tes courses, un virement pour ton loyer et tu conserves le reste pour les dépenses du mois prochain. Une même monnaie intervient dans plusieurs opérations, mais les mécanismes ne sont pas identiques.</p>
        <div class="case-table-wrap"><table class="case-table"><thead><tr><th>Situation</th><th>Ce que tu utilises</th><th>Notion à identifier</th></tr></thead><tbody>
          <tr><td>Tu compares un loyer de 750 € et un autre de 820 €.</td><td>L’euro comme repère commun</td><td><b>Unité de compte</b></td></tr>
          <tr><td>Tu paies 40 € de courses par carte.</td><td>Dépôt bancaire transféré par un instrument de paiement</td><td><b>Moyen d’échange</b></td></tr>
          <tr><td>Tu gardes 300 € pour une facture le mois prochain.</td><td>Un solde monétaire conservé dans le temps</td><td><b>Réserve de valeur</b></td></tr>
          <tr><td>Le prix de ton panier augmente au fil des ans.</td><td>Le pouvoir d’achat de la somme diminue</td><td><b>Inflation</b></td></tr>
        </tbody></table></div>
        <h3>La méthode en quatre questions</h3>
        <ol class="numbered-method">
          <li><b>Qu’est-ce qui est transféré ?</b> Des billets, un dépôt bancaire, un actif numérique ou une créance ?</li>
          <li><b>Qui doit quoi à qui ?</b> Une banque doit-elle le dépôt à son client ? Un émetteur promet-il un remboursement ?</li>
          <li><b>Qui accepte le paiement ?</b> Est-ce une acceptation générale, locale, contractuelle ou limitée à une plateforme ?</li>
          <li><b>Quelle valeur dans le temps ?</b> Le montant est-il stable en euros ? En pouvoir d’achat ? Sous quelles conditions ?</li>
        </ol>
      </section>

      <section class="lesson-section" id="glossaire">
        <span class="lesson-kicker">08 · Le vocabulaire sans jargon</span>
        <h2>Glossaire essentiel</h2>
        <p>Ces mots reviendront dans les prochains chapitres. Tu peux ouvrir chaque définition pour revoir l’idée avec une explication simple.</p>
        <div class="glossary-list">
          <details><summary>Monnaie fiduciaire</summary><p>Les billets et pièces. « Fiduciaire » vient de la notion de confiance : leur utilité ne vient pas de la valeur de leur papier ou de leur métal, mais du cadre qui leur permet d’être acceptés comme monnaie.</p></details>
          <details><summary>Monnaie scripturale</summary><p>La monnaie inscrite sur les comptes bancaires. Quand tu regardes le solde de ton compte courant, tu vois principalement une créance monétaire sur ta banque, pas des billets individualisés conservés dans un coffre à ton nom.</p></details>
          <details><summary>Monnaie centrale</summary><p>La monnaie émise par la banque centrale. Dans la zone euro, elle comprend les billets et les réserves que les banques détiennent auprès de l’Eurosystème.</p></details>
          <details><summary>Instrument de paiement</summary><p>Un outil qui sert à transmettre une instruction de paiement : carte, virement, prélèvement ou paiement mobile. Il ne faut pas le confondre avec la monnaie transférée.</p></details>
          <details><summary>Crédit</summary><p>Une opération dans laquelle un prêteur met des fonds à disposition d’un emprunteur, qui s’engage à rembourser selon des conditions définies. Un crédit bancaire peut entraîner la création d’un dépôt.</p></details>
          <details><summary>Inflation</summary><p>Une hausse durable et généralisée du niveau des prix. Elle réduit le pouvoir d’achat d’une somme fixe, toutes choses égales par ailleurs.</p></details>
          <details><summary>Pouvoir d’achat</summary><p>La quantité de biens et de services qu’un revenu ou une somme d’argent permet d’acheter. Il dépend du montant disponible et des prix auxquels on fait face.</p></details>
          <details><summary>Liquidité</summary><p>Facilité avec laquelle un actif peut être utilisé pour payer ou être converti rapidement en moyen de paiement, sans perte importante de valeur ni délai excessif. Le sens précis dépend du contexte.</p></details>
          <details><summary>Créance</summary><p>Un droit d’obtenir un paiement ou une prestation d’une autre personne ou organisation. Le dépôt bancaire est une dette de la banque envers son client : pour le client, c’est une créance sur la banque.</p></details>
        </div>
      </section>

      <section class="lesson-section" id="retenir">
        <span class="lesson-kicker">09 · Synthèse</span>
        <h2>À retenir</h2>
        <div class="takeaway-grid">
          <div><b>1</b><h3>Comparer</h3><p>La monnaie fournit une unité commune pour exprimer les prix.</p></div>
          <div><b>2</b><h3>Échanger</h3><p>Elle sépare la vente d’un bien de l’achat d’un autre bien.</p></div>
          <div><b>3</b><h3>Reporter</h3><p>Elle permet de conserver du pouvoir d’achat, mais pas de le garantir.</p></div>
          <div><b>4</b><h3>Faire confiance</h3><p>Son acceptation dépend de règles, d’institutions, d’infrastructures et d’attentes partagées.</p></div>
        </div>
        <div class="lesson-callout"><strong>Le réflexe à conserver pour la suite d’Atlas Crypto</strong><p>Ne demande pas seulement « est-ce que cet actif peut être envoyé ? ». Demande aussi : sert-il d’unité de compte ? Est-il accepté pour régler des achats ? Peut-il conserver son pouvoir d’achat ? Qui garantit les règles et quelles sont les limites ?</p></div>
      </section>

      <section class="lesson-section" id="quiz">
        <span class="lesson-kicker">10 · Vérification active</span>
        <h2>Vérifier ses acquis</h2>
        <p>Réponds sans revenir au texte si possible. Chaque réponse est suivie d’une explication : l’objectif est de comprendre le raisonnement, pas seulement de mémoriser la bonne option.</p>
        <div class="quiz-suite">
          <article class="quiz-question" data-question><span class="question-count">Question 1 / 7</span><h3>Quel rôle remplit l’euro lorsqu’il permet de comparer un loyer de 750 € à un loyer de 820 € ?</h3><div class="quiz-options">
            <button type="button" data-correct="true" data-explanation="Exact. L’euro fournit une unité commune pour exprimer et comparer des prix : c’est la fonction d’unité de compte.">Unité de compte</button>
            <button type="button" data-correct="false" data-explanation="La réserve de valeur concerne la conservation du pouvoir d’achat dans le temps, pas la comparaison de prix à un instant donné.">Réserve de valeur</button>
            <button type="button" data-correct="false" data-explanation="Le moyen d’échange concerne l’utilisation de la monnaie pour régler un achat ou une dette.">Moyen d’échange</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 2 / 7</span><h3>Pourquoi le troc direct peut-il être difficile entre deux personnes ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="Ce n’est pas la principale difficulté : des biens divisibles peuvent tout de même être difficiles à échanger si les besoins ne coïncident pas.">Parce que les biens sont toujours indivisibles</button>
            <button type="button" data-correct="true" data-explanation="Exact. Le troc direct exige que chacun veuille précisément ce que l’autre propose, au même moment : la double coïncidence des besoins.">Parce que leurs besoins doivent coïncider</button>
            <button type="button" data-correct="false" data-explanation="Le troc peut exister sans prix officiel. La difficulté porte surtout sur la rencontre des besoins et la comparaison des valeurs.">Parce qu’un prix officiel est obligatoire</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 3 / 7</span><h3>Tu paies ton achat avec une carte bancaire. Qu’est-ce que la carte représente principalement ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="La carte n’est pas en elle-même le dépôt bancaire : elle sert à initier ou autoriser un paiement.">La monnaie scripturale elle-même</button>
            <button type="button" data-correct="true" data-explanation="Exact. La carte est un instrument de paiement qui permet de transférer de la monnaie, souvent un dépôt bancaire.">Un instrument de paiement</button>
            <button type="button" data-correct="false" data-explanation="La carte n’est pas une banque centrale et ne crée pas à elle seule de la monnaie centrale.">De la monnaie centrale</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 4 / 7</span><h3>Qu’est-ce qui est généralement créé lorsqu’une banque commerciale accorde un nouveau prêt ?</h3><div class="quiz-options">
            <button type="button" data-correct="true" data-explanation="Exact. La banque inscrit un dépôt au compte de l’emprunteur et une créance de prêt à son actif. Le dépôt constitue de la monnaie scripturale.">Un dépôt bancaire correspondant au prêt</button>
            <button type="button" data-correct="false" data-explanation="La banque ne doit pas nécessairement retirer des billets pour accorder un crédit. Le mécanisme passe généralement par une écriture comptable qui crédite un dépôt.">Des billets imprimés pour le client</button>
            <button type="button" data-correct="false" data-explanation="Les réserves de banque centrale sont différentes des dépôts des clients. Le prêt crée généralement un dépôt bancaire, pas des réserves directement chez le particulier.">Un compte de réserves au nom du client</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 5 / 7</span><h3>Si les prix augmentent de façon générale et que ta somme d’argent reste identique, que se passe-t-il en moyenne ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="Le nombre d’euros reste le même dans l’énoncé, mais leur pouvoir d’achat diminue si les prix augmentent.">Ton pouvoir d’achat augmente</button>
            <button type="button" data-correct="true" data-explanation="Exact. Une somme nominale fixe permet d’acheter moins de biens et services lorsque le niveau général des prix augmente.">Ton pouvoir d’achat diminue</button>
            <button type="button" data-correct="false" data-explanation="Une hausse des prix ne rend pas automatiquement la monnaie plus rare en quantité ; elle modifie le pouvoir d’achat de la somme.">La somme devient automatiquement plus rare</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 6 / 7</span><h3>La monnaie est-elle acceptée uniquement parce que le support (papier, métal ou écran) a une valeur matérielle ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="La valeur matérielle du papier ou du support numérique ne suffit pas à expliquer l’acceptation monétaire.">Oui, toujours</button>
            <button type="button" data-correct="true" data-explanation="Exact. Les règles, l’acceptation collective, la confiance et les infrastructures jouent un rôle essentiel.">Non, son acceptation dépend aussi de règles et de confiance</button>
            <button type="button" data-correct="false" data-explanation="La confiance compte, mais elle repose aussi sur des dispositifs juridiques, institutionnels et techniques concrets.">Non, uniquement de la confiance individuelle</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 7 / 7</span><h3>Un actif numérique est-il automatiquement une monnaie parce qu’il peut être transféré sur Internet ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="La facilité de transfert ne suffit pas à faire remplir les trois fonctions monétaires.">Oui, s’il est numérique</button>
            <button type="button" data-correct="true" data-explanation="Exact. Il faut examiner son acceptation, son usage comme unité de compte et sa capacité à conserver de la valeur, avec ses limites.">Non, il faut examiner ses fonctions et ses usages</button>
            <button type="button" data-correct="false" data-explanation="Le statut monétaire dépend des usages, de l’acceptation et du cadre ; le caractère décentralisé ne répond pas à lui seul à la question.">Oui, s’il est décentralisé</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <div class="quiz-summary" id="quiz-summary" aria-live="polite">0 / 7 réponse validée</div>
          <button class="quiz-reset" id="quiz-reset" type="button">Recommencer le quiz</button>
        </div>
      </section>

      <section class="lesson-section" id="sources">
        <span class="lesson-kicker">11 · Pour approfondir avec des sources fiables</span>
        <h2>Sources et lectures complémentaires</h2>
        <p>Cette fiche présente des mécanismes généraux. Pour les définitions institutionnelles, le système de l’euro et la création monétaire bancaire, consulte en priorité les ressources suivantes. Les institutions peuvent présenter des angles différents ; il est utile de lire les définitions et leurs limites.</p>
        <div class="source-list">
          <a href="https://www.banque-france.fr/fr/publications-et-statistiques/publications/monnaie-de-quoi-parle-t-on" target="_blank" rel="noopener noreferrer"><span>Banque de France</span><b>Monnaie : de quoi parle-t-on ?</b><small>Les trois fonctions de la monnaie et ses formes dans le système français.</small><em>Ouvrir la ressource ↗</em></a>
          <a href="https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.en.html" target="_blank" rel="noopener noreferrer"><span>Banque centrale européenne</span><b>What is money?</b><small>Les fonctions de la monnaie et la distinction entre monnaie centrale et monnaie bancaire.</small><em>Ouvrir la ressource ↗</em></a>
          <a href="https://www.banque-france.fr/fr/publications-et-statistiques/publications/livre-paiements-et-infrastructures-de-marche-lere" target="_blank" rel="noopener noreferrer"><span>Banque de France</span><b>Paiements et infrastructures de marché à l’ère digitale</b><small>Une analyse plus technique de la monnaie et des instruments de paiement.</small><em>Ouvrir la ressource ↗</em></a>
          <a href="https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy" target="_blank" rel="noopener noreferrer"><span>Bank of England</span><b>Money creation in the modern economy</b><small>Comment les prêts bancaires créent des dépôts et comment le remboursement du principal agit sur la monnaie.</small><em>Ouvrir la ressource ↗</em></a>
          <a href="https://www.bis.org/publications/aer-2026/anchoring-trust-money" target="_blank" rel="noopener noreferrer"><span>Banque des règlements internationaux</span><b>Anchoring trust in money</b><small>Une perspective institutionnelle sur la confiance, l’histoire et les architectures monétaires.</small><em>Ouvrir la ressource ↗</em></a>
        </div>
        <p class="editorial-note"><b>Note éditoriale :</b> les analogies et les exemples chiffrés de cette fiche sont pédagogiques. Ils simplifient volontairement certains mécanismes ; les textes institutionnels liés ci-dessus permettent d’aller plus loin. Cette fiche n’est ni un conseil financier ni une recommandation d’investissement.</p>
      </section>
    `
  }
};
