/* Atlas Crypto — version approfondie du chapitre 1. */
window.ATLAS_LESSONS = {
  1: {
    minutes: 30,
    level: 'Débutant · aucun prérequis',
    objectives: [
      'Expliquer les trois fonctions économiques de la monnaie et leurs limites.',
      'Distinguer monnaie, dépôt bancaire, monnaie centrale et instrument de paiement.',
      'Décrire la création monétaire par le crédit et les contraintes des banques.',
      'Comprendre l’inflation, le pouvoir d’achat et la valeur réelle d’une somme.',
      'Appliquer une grille d’analyse à un moyen de paiement ou à un actif numérique.'
    ],
    toc: [
      ['demarrer', 'Le problème à résoudre'],
      ['fonctions', 'Les trois fonctions'],
      ['troc', 'Pourquoi le troc bloque'],
      ['confiance', 'Pourquoi l’accepte-t-on ?'],
      ['formes', 'Les formes de monnaie'],
      ['creation', 'La création monétaire'],
      ['pouvoir-achat', 'Inflation et pouvoir d’achat'],
      ['cas-pratique', 'Cas pratique'],
      ['glossaire', 'Glossaire'],
      ['retenir', 'À retenir'],
      ['quiz', 'Vérifier ses acquis'],
      ['sources', 'Sources']
    ],
    html: `
      <div class="lesson-objectives" id="demarrer">
        <div class="objectives-main">
          <span class="lesson-kicker">Avant de commencer</span>
          <h2>À la fin de cette fiche, tu dois pouvoir expliquer pourquoi la monnaie facilite les échanges — et pourquoi elle n’est jamais sans limites.</h2>
          <p>Tu n’as pas besoin de connaître l’économie ou la finance. Nous allons partir de situations quotidiennes : acheter un café, recevoir un salaire, payer un loyer, emprunter pour acheter une voiture et mettre de l’argent de côté.</p>
          <div class="objective-tags"><span>Débutant</span><span>30 min environ</span><span>5 notions clés</span></div>
        </div>
        <aside class="objectives-side">
          <b>Ce que tu vas apprendre</b>
          <ol>
            <li>Comparer des prix</li><li>Régler un échange</li><li>Reporter du pouvoir d’achat</li><li>Identifier ce qui circule réellement</li><li>Analyser les limites d’un système monétaire</li>
          </ol>
        </aside>
      </div>

      <section class="lesson-section" id="fonctions">
        <span class="lesson-kicker">01 · Le socle</span>
        <h2>Les trois fonctions fondamentales de la monnaie</h2>
        <p>On décrit généralement la monnaie par trois fonctions complémentaires. Elles permettent de comprendre à quoi elle sert dans une économie. Un même instrument peut remplir ces fonctions avec une efficacité différente : une unité peut être très pratique pour régler un achat, mais perdre rapidement du pouvoir d’achat ; une autre peut être utilisée comme réserve d’épargne sans être acceptée dans les commerces.</p>
        <div class="function-grid">
          <article class="function-card">
            <div class="function-symbol">01</div><h3>Unité de compte</h3>
            <p><strong>La monnaie est une règle commune pour exprimer les prix.</strong> Elle donne une unité de mesure partagée, comme le mètre pour les distances ou le kilogramme pour les masses.</p>
            <div class="mini-example"><b>Exemple concret</b><span>Un loyer coûte 750 € et un autre 820 €. Les deux montants sont exprimés dans la même unité : tu peux les comparer immédiatement.</span></div>
            <p class="plain-language"><b>Ce que cela change :</b> sans unité commune, il faudrait comparer des quantités de biens très différentes et négocier chaque équivalence séparément.</p>
          </article>
          <article class="function-card">
            <div class="function-symbol">02</div><h3>Intermédiaire des échanges</h3>
            <p><strong>La monnaie permet de séparer la vente d’un bien de l’achat d’un autre.</strong> Le vendeur reçoit une valeur qu’il pourra utiliser plus tard auprès d’une autre personne.</p>
            <div class="mini-example"><b>Exemple concret</b><span>Tu paies 2 € ton café. Le café n’a pas besoin de vouloir tes chaussures en échange : il accepte un paiement qu’il pourra à son tour utiliser.</span></div>
            <p class="plain-language"><b>Ce que cela change :</b> tu n’as plus besoin de trouver une personne qui possède exactement ce que tu souhaites et qui veut précisément ce que tu proposes.</p>
          </article>
          <article class="function-card">
            <div class="function-symbol">03</div><h3>Réserve de valeur</h3>
            <p><strong>La monnaie permet de transférer du pouvoir d’achat dans le temps.</strong> Tu peux recevoir un revenu aujourd’hui et en conserver une partie pour une dépense future.</p>
            <div class="mini-example"><b>Exemple concret</b><span>Tu reçois 100 € aujourd’hui et tu les gardes pour payer une facture le mois prochain. Tu reportes ton achat au lieu de devoir tout dépenser immédiatement.</span></div>
            <p class="plain-language"><b>La limite :</b> garder le même nombre d’euros ne garantit pas de pouvoir acheter les mêmes choses demain. Les prix peuvent augmenter.</p>
          </article>
        </div>
        <figure class="lesson-figure">
          <div class="three-functions" role="img" aria-label="Les trois fonctions de la monnaie : comparer les prix, faciliter les échanges, reporter le pouvoir d’achat">
            <div class="function-node"><span>Comparer</span><strong>Unité de compte</strong><small>Les prix parlent la même langue</small></div><div class="function-connector">↔</div>
            <div class="function-node"><span>Échanger</span><strong>Intermédiaire des échanges</strong><small>La vente et l’achat sont séparés</small></div><div class="function-connector">↔</div>
            <div class="function-node"><span>Reporter</span><strong>Réserve de valeur</strong><small>Le pouvoir d’achat traverse le temps</small></div>
          </div>
          <figcaption>Les trois fonctions sont distinctes, mais elles se renforcent souvent mutuellement.</figcaption>
        </figure>
        <div class="lesson-callout"><strong>Une grille d’analyse, pas un interrupteur</strong><p>Dans les manuels, ces trois fonctions servent à caractériser la monnaie. Dans la réalité, un instrument peut les remplir partiellement ou de manière imparfaite. Il vaut donc mieux demander « dans quelle mesure et dans quel contexte ? » plutôt que classer trop vite un actif comme monnaie ou non-monnaie.</p></div>
        <h3>Un même instrument peut-il remplir les trois fonctions ?</h3>
        <p>L’euro est utilisé pour afficher les prix, payer dans la zone euro et conserver temporairement un pouvoir d’achat. Mais sa capacité à préserver ce pouvoir d’achat dépend de l’évolution des prix. Le bitcoin peut être transféré et certains acteurs l’acceptent en paiement ; toutefois, sa volatilité et son acceptation limitée rendent son usage comme unité de compte ou réserve de valeur plus incertain dans de nombreuses situations. Cette observation décrit des usages : elle ne constitue pas une recommandation d’investissement.</p>
        <div class="comparison-note"><b>Le bon réflexe</b><p>Ne demande pas seulement si un actif est transférable. Demande aussi s’il est utilisé pour fixer les prix, s’il est largement accepté pour régler des achats et si sa valeur d’achat reste suffisamment prévisible dans le temps.</p></div>
      </section>

      <section class="lesson-section" id="troc">
        <span class="lesson-kicker">02 · Pourquoi ce système est utile</span>
        <h2>Le troc : une possibilité, mais pas une solution universelle</h2>
        <p>Le troc consiste à échanger directement un bien ou un service contre un autre : du pain contre une réparation, par exemple. Il peut être efficace dans une petite communauté ou pour un échange ponctuel. Mais il devient difficile à organiser lorsque les personnes sont nombreuses, éloignées ou ont des besoins différents.</p>
        <div class="story-card">
          <div class="story-label">Une situation imaginaire</div>
          <div class="story-person"><span class="avatar">A</span><div><b>Amine, boulanger</b><p>Il possède du pain et voudrait faire réparer son vélo.</p></div></div>
          <div class="story-person"><span class="avatar">L</span><div><b>Léa, mécanicienne</b><p>Elle sait réparer les vélos, mais elle ne souhaite pas recevoir de pain aujourd’hui.</p></div></div>
          <div class="story-result"><b>Le blocage</b><p>Amine doit trouver une autre personne qui veut du pain et qui peut offrir quelque chose que Léa souhaite. Il faut faire coïncider plusieurs besoins.</p></div>
        </div>
        <h3>La double coïncidence des besoins</h3>
        <p>Pour qu’un troc direct fonctionne, les deux personnes doivent vouloir au même moment ce que l’autre propose. Les économistes appellent cela la <em>double coïncidence des besoins</em>. La monnaie réduit cette contrainte : Amine vend son pain contre une somme monétaire, puis utilise cette somme pour payer Léa. Les deux transactions n’ont pas besoin d’avoir lieu avec la même personne ni au même moment.</p>
        <figure class="lesson-figure">
          <div class="exchange-diagram">
            <div class="exchange-lane"><span class="lane-tag">Sans monnaie</span><div class="exchange-person">Amine<br><small>propose du pain</small></div><div class="exchange-arrow blocked">?</div><div class="exchange-person">Léa<br><small>veut autre chose</small></div><p class="lane-note">Il faut trouver un échange qui convienne aux deux personnes en même temps.</p></div>
            <div class="exchange-lane"><span class="lane-tag">Avec monnaie</span><div class="exchange-person">Amine<br><small>vend son pain</small></div><div class="exchange-arrow">→ € →</div><div class="exchange-person">Léa<br><small>répare le vélo</small></div><p class="lane-note">La monnaie sert d’intermédiaire : la vente du pain et la réparation sont deux échanges séparés.</p></div>
          </div><figcaption>Schéma pédagogique simplifié : la monnaie sépare la vente d’un bien de l’achat d’un autre.</figcaption>
        </figure>
        <div class="lesson-lab-box">
          <div><span class="lesson-kicker">Mini-expérience</span><h3>Le troc est-il possible dans cette situation ?</h3><p>Change le besoin de Léa pour observer ce qui rend l’échange direct possible ou difficile.</p></div>
          <label class="scenario-select" for="barter-need">Aujourd’hui, Léa souhaite recevoir…
            <select id="barter-need"><option value="different">des légumes, pas du pain</option><option value="same">du pain</option></select>
          </label>
          <div class="scenario-result" id="barter-result" role="status">L’échange direct bloque : Amine doit trouver une autre personne ou proposer autre chose. Avec une monnaie acceptée, il peut vendre son pain puis payer Léa.</div>
        </div>
        <div class="lesson-callout lesson-callout-muted"><strong>Attention à ne pas raconter une histoire trop simple</strong><p>L’histoire économique ne se résume pas à un monde entier organisé par le troc, puis à l’invention soudaine de la monnaie. Selon les sociétés et les époques, le troc, le crédit, la dette, les dons, les obligations sociales et les écritures comptables ont coexisté. Le troc illustre une difficulté économique réelle ; il ne constitue pas à lui seul une chronologie universelle de l’apparition de la monnaie.</p></div>
        <h3>Les limites pratiques du troc</h3>
        <ul class="check-list">
          <li><b>Coïncidence des besoins :</b> trouver quelqu’un qui veut précisément ce que tu proposes peut prendre du temps.</li>
          <li><b>Fractionnement :</b> comment diviser la valeur d’un animal ou d’un objet pour payer un service beaucoup moins important ?</li>
          <li><b>Conservation :</b> certains biens se détériorent, prennent de la place ou coûtent cher à stocker.</li>
          <li><b>Transport :</b> déplacer des biens lourds ou fragiles peut coûter cher.</li>
          <li><b>Comparaison :</b> sans unité commune, comparer de nombreux biens et services devient laborieux.</li>
          <li><b>Temps :</b> un vendeur peut vouloir recevoir une valeur maintenant et acheter autre chose plus tard.</li>
        </ul>
      </section>

      <section class="lesson-section" id="confiance">
        <span class="lesson-kicker">03 · Le mécanisme social</span>
        <h2>Pourquoi acceptons-nous une monnaie ?</h2>
        <p>Un billet n’est pas utile parce que son papier serait précieux. Le solde affiché sur un compte n’est pas utile parce que les chiffres à l’écran auraient une valeur matérielle. Ces instruments sont utiles parce qu’un ensemble de personnes, d’organisations, de règles et d’infrastructures permet de les utiliser et s’attend à ce que d’autres les acceptent aussi.</p>
        <div class="trust-grid">
          <article><span>01</span><h3>Acceptation</h3><p>Les particuliers, commerçants, entreprises et administrations sont disposés à recevoir l’unité monétaire dans un espace donné.</p><small>Question à poser : où et par qui est-elle acceptée ?</small></article>
          <article><span>02</span><h3>Règles</h3><p>Les lois, contrats et conventions définissent l’unité, les obligations de paiement et les conditions de règlement.</p><small>Question à poser : quels droits et obligations existent ?</small></article>
          <article><span>03</span><h3>Infrastructure</h3><p>Les banques, réseaux de paiement, systèmes de règlement et dispositifs de sécurité rendent les transferts possibles.</p><small>Question à poser : comment le paiement est-il exécuté ?</small></article>
          <article><span>04</span><h3>Stabilité attendue</h3><p>Les utilisateurs pensent pouvoir continuer à utiliser cette unité demain, même si son pouvoir d’achat peut varier.</p><small>Question à poser : quelle valeur peut-elle conserver ?</small></article>
        </div>
        <h3>La confiance est un réseau, mais pas seulement une opinion</h3>
        <p>Plus une monnaie est acceptée, plus elle devient pratique pour les autres utilisateurs : c’est un <em>effet de réseau</em>. Un moyen de paiement accepté par beaucoup de vendeurs est souvent plus utile qu’un moyen accepté par très peu. Mais l’acceptation n’explique pas tout. La solidité des règles, la qualité de l’infrastructure, la solvabilité des intermédiaires et la stabilité de l’unité comptent également.</p>
        <div class="lesson-figure trust-chain" role="img" aria-label="Les piliers de la confiance monétaire : règles, institutions, infrastructure et acceptation">
          <div class="trust-step"><b>Règles</b><small>cadre juridique et contrats</small></div><span>→</span><div class="trust-step"><b>Institutions</b><small>émetteurs et intermédiaires</small></div><span>→</span><div class="trust-step"><b>Infrastructure</b><small>paiement et règlement</small></div><span>→</span><div class="trust-step"><b>Acceptation</b><small>usage collectif</small></div>
          <p>Cette chaîne est schématique : les éléments se renforcent mutuellement et ne fonctionnent pas toujours dans un ordre linéaire.</p>
        </div>
        <div class="lesson-callout"><strong>Confiance ne veut pas dire absence de risque</strong><p>Une monnaie peut perdre du pouvoir d’achat, un établissement bancaire peut rencontrer des difficultés, un réseau technique peut être indisponible ou des restrictions de transfert peuvent s’appliquer. Il faut toujours demander : qui émet ou garantit quoi, quelles règles s’appliquent et que se passe-t-il si un intermédiaire ou une infrastructure échoue ?</p></div>
        <h3>Trois questions différentes selon l’instrument</h3>
        <div class="three-column-note">
          <div><b>Billet en euros</b><p>Il s’agit d’une créance sur l’Eurosystème. Il peut être utilisé directement dans le cadre des règles applicables aux espèces.</p></div>
          <div><b>Dépôt bancaire</b><p>Il s’agit d’une dette de la banque commerciale envers son client. Le client dépend de la banque et du système de paiement pour l’utiliser.</p></div>
          <div><b>Cryptoactif</b><p>Les droits dépendent du protocole, des règles du réseau et, le cas échéant, de l’émetteur. Il n’existe pas automatiquement de promesse de remboursement.</p></div>
        </div>
      </section>

      <section class="lesson-section" id="formes">
        <span class="lesson-kicker">04 · Ce que nous utilisons aujourd’hui</span>
        <h2>Les différentes formes de monnaie</h2>
        <p>Dans une économie moderne, la monnaie n’est pas uniquement constituée de pièces et de billets. Une grande partie de la monnaie utilisée au quotidien existe sous forme de dépôts inscrits dans les comptes bancaires. Pour comprendre ce qui circule, il faut distinguer <b>la monnaie elle-même</b> de <b>l’instrument qui permet de la transférer</b>.</p>
        <div class="money-type-grid">
          <article class="money-type"><div class="money-icon">€</div><h3>Espèces : billets et pièces</h3><p>Les billets et les pièces en euros sont de la monnaie fiduciaire. Pour les billets, la BCE et les banques centrales nationales de la zone euro ont le droit d’émission ; les banques centrales nationales assurent concrètement leur mise en circulation. Les pays de la zone euro sont les émetteurs légaux des pièces.</p><span>Exemples : billet de 20 € · pièce de 2 €</span></article>
          <article class="money-type"><div class="money-icon">▤</div><h3>Monnaie scripturale</h3><p>Il s’agit des dépôts inscrits sur les comptes des clients auprès des banques commerciales. Pour le client, le solde est une créance sur sa banque ; pour la banque, c’est une dette envers son client.</p><span>Exemple : solde d’un compte courant</span></article>
          <article class="money-type"><div class="money-icon">◈</div><h3>Monnaie de banque centrale</h3><p>Elle comprend principalement les billets en circulation et les réserves que les banques détiennent auprès de la banque centrale. Les réserves servent notamment aux règlements entre banques ; un particulier n’en détient généralement pas directement sur son compte courant.</p><span>Exemples : billets · réserves bancaires</span></article>
          <article class="money-type"><div class="money-icon">▣</div><h3>Monnaie électronique</h3><p>Dans le cadre européen, c’est une valeur monétaire stockée électroniquement, représentant une créance sur son émetteur et émise contre remise de fonds. Elle est destinée à effectuer des paiements et peut être acceptée par une personne autre que son émetteur. Elle relève d’un cadre juridique spécifique : elle n’est pas synonyme de tout solde affiché dans une application.</p><span>Exemple : valeur stockée dans un portefeuille de monnaie électronique réglementé</span></article>
          <article class="money-type"><div class="money-icon">₿</div><h3>Cryptoactif</h3><p>Un actif numérique dont les transferts et la tenue des unités sont régis par un protocole ou un réseau. Certains peuvent être utilisés pour transférer de la valeur, mais leur statut, leurs droits, leur stabilité et leur acceptation diffèrent fortement.</p><span>Exemple : bitcoin (BTC)</span></article>
        </div>
        <div class="distinction-panel"><div><span class="lesson-kicker">Distinction essentielle</span><h3>La carte bancaire n’est pas la monnaie.</h3><p>Une carte, un virement ou un paiement mobile est un instrument ou un moyen de paiement : il permet d’initier ou d’autoriser une opération. Quand tu paies 35 € avec une carte de débit, la monnaie réglée est généralement de la monnaie scripturale. La carte n’est pas le dépôt bancaire : elle donne accès à un mécanisme de paiement.</p></div><div class="distinction-visual"><div class="flow-chip">Ton compte<br><b>−35 €</b></div><div class="flow-arrow">→</div><div class="flow-chip">Réseau de paiement<br><b>instruction</b></div><div class="flow-arrow">→</div><div class="flow-chip">Compte du vendeur<br><b>+35 €</b></div></div><p class="flow-footnote">Schéma simplifié : une opération réelle peut impliquer la banque du payeur, la banque du commerçant, un réseau de carte, des étapes de compensation et un règlement interbancaire.</p><div class="payment-steps"><div><b>1 · Autorisation</b><span>La banque émettrice vérifie notamment que l’opération peut être acceptée.</span></div><div><b>2 · Compensation</b><span>Les informations de paiement sont échangées et les montants dus entre participants sont calculés.</span></div><div><b>3 · Règlement</b><span>Les obligations entre établissements sont soldées, généralement en monnaie de banque centrale.</span></div></div></div>
        <h3>Un système à plusieurs étages</h3>
        <p>Les dépôts bancaires et la monnaie de banque centrale sont liés, mais ce ne sont pas la même chose. Un dépôt est une dette d’une banque commerciale envers son client. Les réserves sont des créances des banques sur la banque centrale. Lorsque deux banques doivent régler entre elles, elles utilisent généralement de la monnaie de banque centrale pour le règlement final.</p>
        <figure class="lesson-figure"><div class="layers-diagram">
          <div class="layer layer-public"><b>Particuliers et entreprises</b><span>Utilisent espèces et dépôts bancaires</span></div>
          <div class="layer-link">Paiements et transferts entre clients</div>
          <div class="layer layer-bank"><b>Banques commerciales</b><span>Tiennent les comptes, accordent des crédits et exécutent les paiements</span></div>
          <div class="layer-link">Règlements entre banques en monnaie centrale</div>
          <div class="layer layer-central"><b>Banque centrale</b><span>Émet la monnaie centrale et met en œuvre la politique monétaire</span></div>
        </div><figcaption>Vue simplifiée de quelques relations dans l’architecture monétaire de la zone euro.</figcaption></figure>
        <div class="lesson-callout lesson-callout-muted"><strong>À ne pas confondre</strong><p>« Numérique » décrit un support ou une forme technique. Cela ne suffit pas à déterminer la nature juridique ou économique d’une valeur. Un dépôt bancaire, de la monnaie électronique, une monnaie numérique de banque centrale et un cryptoactif peuvent tous être représentés par des données informatiques, mais ils ne créent pas les mêmes droits ni les mêmes obligations.</p></div>
      </section>

      <section class="lesson-section" id="creation">
        <span class="lesson-kicker">05 · Le circuit monétaire</span>
        <h2>Comment la monnaie est-elle créée ?</h2>
        <p>Dans le système bancaire moderne, les banques commerciales ne se contentent pas de prêter à un client l’argent qu’un autre client vient de déposer. Lorsqu’une banque accorde un crédit, elle inscrit généralement un dépôt sur le compte de l’emprunteur. Cette écriture crée de la monnaie scripturale : le client dispose d’un nouveau moyen de paiement, et la banque possède en contrepartie une créance de remboursement.</p>
        <div class="loan-example">
          <div class="loan-header"><span class="lesson-kicker">Exemple simplifié · au moment de l’octroi</span><h3>Une banque accorde un prêt de 10 000 €</h3><p>On observe les deux côtés du bilan de la banque. Les montants sont illustratifs ; les frais, intérêts et détails contractuels sont volontairement mis de côté à cette étape.</p></div>
          <div class="balance-grid">
            <div class="balance-card"><b>À l’actif de la banque</b><div class="balance-line"><span>Créance de prêt sur le client</span><strong>+10 000 €</strong></div><small>La banque détient un droit contractuel à recevoir les remboursements prévus.</small></div>
            <div class="balance-card"><b>Au passif de la banque</b><div class="balance-line"><span>Dépôt inscrit au compte du client</span><strong>+10 000 €</strong></div><small>La banque doit honorer les paiements ou retraits demandés, selon les règles applicables.</small></div>
          </div>
          <div class="borrower-balance"><b>Du point de vue de l’emprunteur</b><span>+10 000 € de dépôt bancaire</span><span>+10 000 € de dette à rembourser</span><small>Le crédit apporte de la liquidité utilisable, mais il crée aussi une obligation de remboursement. Il ne transforme pas automatiquement l’emprunteur en personne plus riche de 10 000 €.</small></div>
          <div class="loan-result"><b>Résultat immédiat :</b> un dépôt de 10 000 € est créé. Le bilan de la banque augmente des deux côtés : un actif (le prêt) et un passif (le dépôt).</div>
        </div>
        <h3>Observe la création et la destruction de monnaie</h3>
        <p>Modifie le montant puis passe de l’octroi du crédit à son remboursement. Cette maquette isole le principal d’un prêt dans un modèle simplifié à une banque ; elle ne simule ni les intérêts, ni les défauts, ni tous les règlements entre banques.</p>
        <div class="loan-lab-box" id="loan-lab">
          <div class="loan-controls"><label for="loan-amount">Montant du principal (€)<input id="loan-amount" type="number" min="100" max="1000000" step="100" value="10000"></label><div class="loan-actions"><button type="button" class="mode-button active" data-loan-mode="grant">Octroi du crédit</button><button type="button" class="mode-button" data-loan-mode="repay">Remboursement du principal</button></div></div>
          <div class="loan-columns">
            <div><span>ACTIF DE LA BANQUE</span><b id="loan-bank-asset">+10 000 €</b><small id="loan-bank-asset-note">La créance de prêt augmente.</small></div>
            <div><span>PASSIF DE LA BANQUE</span><b id="loan-bank-liability">+10 000 €</b><small id="loan-bank-liability-note">Un dépôt est créé sur le compte du client.</small></div>
          </div>
          <div class="loan-impact" id="loan-impact" role="status">Un dépôt bancaire nouveau est créé : la quantité de monnaie scripturale augmente dans cet exemple.</div>
        </div>
        <h3>Et lorsque le prêt est remboursé ?</h3>
        <p>Lorsque l’emprunteur rembourse le <b>principal</b> (la somme empruntée hors intérêts), le prêt restant dû diminue. Dans le modèle simplifié, le dépôt utilisé pour payer le principal est débité : la monnaie scripturale correspondant à cette partie du crédit est détruite. Les <b>intérêts</b> sont différents : ils constituent un revenu pour la banque, qui peut ensuite servir à payer ses coûts, ses salariés ou ses actionnaires. Il ne faut donc pas confondre le remboursement du principal et le paiement des intérêts.</p>
        <div class="process-steps">
          <div><span>1</span><b>Accord du crédit</b><p>La banque analyse les revenus, le risque, les garanties et la capacité de remboursement.</p></div>
          <div><span>2</span><b>Inscription du dépôt</b><p>Le compte de l’emprunteur est crédité : un dépôt bancaire est créé.</p></div>
          <div><span>3</span><b>Dépense et règlement</b><p>Le client utilise le dépôt. Si le bénéficiaire est dans une autre banque, un règlement interbancaire doit intervenir.</p></div>
          <div><span>4</span><b>Remboursement</b><p>Le principal remboursé réduit le prêt et détruit la monnaie correspondante dans le modèle agrégé simplifié.</p></div>
        </div>
        <h3>Pourquoi les banques ne créent-elles pas de monnaie sans limite ?</h3>
        <p>Un établissement ne peut pas accorder n’importe quel crédit à n’importe qui. Il doit anticiper le remboursement, supporter le risque de défaut, disposer de fonds propres suffisants, gérer sa liquidité et trouver un financement adapté. La <em>solvabilité</em> concerne la capacité de l’emprunteur à rembourser ses dettes ; la <em>liquidité</em> concerne la capacité à faire face aux paiements qui arrivent à échéance. Ces deux contraintes sont liées, mais elles ne désignent pas la même chose. Lorsqu’un client paie une personne qui utilise une autre banque, la banque prêteuse doit aussi pouvoir régler le transfert avec cette autre banque.
        <ul class="check-list">
          <li><b>Demande solvable :</b> il faut des emprunteurs capables et désireux de rembourser.</li>
          <li><b>Risque de crédit :</b> un défaut peut entraîner des pertes pour la banque.</li>
          <li><b>Fonds propres :</b> la banque doit respecter des exigences prudentielles par rapport aux risques qu’elle porte.</li>
          <li><b>Liquidité et règlement :</b> elle doit pouvoir honorer les sorties de fonds et régler avec les autres banques.</li>
          <li><b>Rentabilité et politique monétaire :</b> le coût des ressources, les taux et les conditions de financement influencent les décisions de crédit.</li>
        </ul>
        <div class="lesson-callout lesson-callout-muted"><strong>Une idée reçue à éviter : le multiplicateur mécanique des dépôts</strong><p>Il est trompeur d’imaginer que chaque banque prête automatiquement une fraction fixe des dépôts qu’elle reçoit, ou qu’une quantité donnée de réserves entraîne mécaniquement un multiple déterminé de nouveaux crédits. Dans la pratique, les décisions de crédit, la demande solvable, les contraintes prudentielles, la rentabilité et les besoins de règlement interagissent. Les réserves sont essentielles au règlement et à la mise en œuvre de la politique monétaire, mais elles ne fonctionnent pas comme un simple stock de billets que la banque prêterait directement aux ménages.</p></div>
        <div class="definition-panel"><b>À retenir : monnaie créée ≠ richesse créée</b><p>Le crédit crée simultanément un dépôt utilisable et une dette à rembourser. Il peut financer un logement, un équipement ou une activité productive, mais l’écriture monétaire seule ne garantit ni la réussite du projet ni la création de richesse réelle.</p></div>
      </section>

      <section class="lesson-section" id="pouvoir-achat">
        <span class="lesson-kicker">06 · La valeur dans le temps</span>
        <h2>Inflation : pourquoi 100 € ne gardent pas toujours le même pouvoir d’achat</h2>
        <p>Le <b>pouvoir d’achat</b> mesure la quantité de biens et de services qu’un revenu ou une somme permet d’acheter. L’inflation correspond à une hausse générale et durable du niveau des prix. Si les prix augmentent tandis que la somme que tu possèdes reste identique, cette somme permet en moyenne d’acheter moins.</p>
        <div class="inflation-story">
          <div><span class="lesson-kicker">Exemple sur un panier fictif</span><h3>Le même panier coûte 100 € aujourd’hui</h3><p>Avec une hausse moyenne de 3 % par an, son prix serait d’environ 103 € dans un an, puis 106,09 € dans deux ans si le même taux s’appliquait chaque année.</p></div>
          <div class="price-sequence"><div><small>Aujourd’hui</small><b>100 €</b></div><span>→</span><div><small>Dans 1 an</small><b>103 €</b></div><span>→</span><div><small>Dans 2 ans</small><b>106,09 €</b></div></div>
        </div>
        <h3>Simule le pouvoir d’achat d’une somme fixe</h3>
        <p>Modifie le montant, le taux annuel et la durée. Le résultat indique à combien d’euros d’aujourd’hui correspondrait le pouvoir d’achat de la somme conservée, sous ces hypothèses.</p>
        <div class="inflation-calculator" id="inflation-calculator">
          <div class="calculator-heading"><span class="lesson-kicker">Mini-simulation interactive</span><h3>Que devient le pouvoir d’achat de ton argent ?</h3><p>Le calcul suppose une hausse identique du niveau des prix chaque année. Ce n’est pas une prévision d’inflation.</p></div>
          <div class="calculator-fields">
            <label>Somme conservée (€)<input id="calc-amount" type="number" min="1" max="100000000" value="100" step="10"></label>
            <label>Hausse annuelle des prix (%)<input id="calc-inflation" type="number" min="0" max="100" value="3" step="0.1"></label>
            <label>Durée (années)<input id="calc-years" type="number" min="1" max="100" value="10" step="1"></label>
          </div>
          <div class="calculator-output" aria-live="polite"><span>Équivalent en pouvoir d’achat d’aujourd’hui</span><strong id="calc-result">74,41 €</strong><p id="calc-explanation">Avec ces hypothèses, 100 € conservés pendant dix ans auraient un pouvoir d’achat équivalent à environ 74,41 € d’aujourd’hui.</p></div>
          <div class="calculator-secondary"><span>Prix futur d’un panier qui coûte aujourd’hui la somme saisie</span><b id="calc-future-basket">134,39 €</b></div>
          <p class="calculator-note">Formules simplifiées : valeur réelle = somme ÷ (1 + taux)<sup>durée</sup> ; prix futur du panier = prix actuel × (1 + taux)<sup>durée</sup>. Le calcul ne tient compte ni des intérêts, ni des impôts, ni des frais, ni de l’évolution différente des prix selon les produits.</p>
        </div>
        <h3>Une hausse isolée n’est pas automatiquement de l’inflation</h3>
        <p>Le prix d’un seul produit peut augmenter parce qu’il devient rare, parce que sa qualité change ou parce que sa demande progresse. L’inflation décrit un mouvement plus général du niveau des prix. Dans la zone euro, l’indice des prix à la consommation harmonisé (IPCH) mesure l’évolution des prix d’un ensemble de biens et services selon une méthode commune entre pays. Les catégories sont pondérées pour refléter les habitudes de consommation : tous les produits ne comptent donc pas autant dans l’indice. Il s’agit d’un indicateur moyen, pas de la facture exacte de chaque foyer ni d’un indice parfait du coût de la vie de chaque personne.</p>
        <div class="two-column-note"><div><b>Valeur nominale</b><p>Le montant affiché en euros : 100 €, 1 000 €, 2 000 €. C’est le chiffre inscrit sur le billet ou le compte.</p></div><div><b>Valeur réelle</b><p>Ce que cette somme permet d’acheter, après prise en compte de l’évolution des prix. Elle dépend du panier auquel on se réfère.</p></div></div>
        <div class="lesson-callout"><strong>Ton inflation personnelle peut différer de l’indice moyen</strong><p>Si tu consacres une grande part de ton budget au logement, à l’énergie ou aux transports, ton expérience de la hausse des prix peut différer de l’indice moyen. Les pondérations du panier statistique représentent une consommation moyenne ; elles ne correspondent pas exactement à chaque ménage.</p></div>
        <h3>Trois mots à ne pas confondre</h3>
        <ul class="check-list"><li><b>Inflation :</b> le niveau général des prix augmente.</li><li><b>Désinflation :</b> les prix continuent d’augmenter, mais moins vite qu’avant.</li><li><b>Déflation :</b> le niveau général des prix diminue sur une période.</li></ul>
        <div class="lesson-callout lesson-callout-muted"><strong>Réserve de valeur ne signifie pas valeur garantie</strong><p>La monnaie permet de différer des dépenses et de garder une liquidité utile. Mais sa valeur réelle peut diminuer. À l’inverse, un actif qui semble préserver sa valeur sur une période peut connaître des pertes, être difficile à vendre ou ne pas être accepté pour payer. Réserve de valeur, liquidité et moyen de paiement sont des qualités différentes.</p></div>
      </section>

      <section class="lesson-section" id="cas-pratique">
        <span class="lesson-kicker">07 · Mettre en pratique</span>
        <h2>Cas pratique : tu reçois 2 000 € de salaire</h2>
        <p>Ton employeur verse ton salaire sur ton compte bancaire. Tu paies tes courses par carte, ton loyer par virement et tu conserves le reste pour les dépenses du mois prochain. Tu utilises la même unité monétaire dans plusieurs opérations, mais les mécanismes ne sont pas identiques.</p>
        <div class="case-table-wrap"><table class="case-table"><thead><tr><th>Situation</th><th>Ce qui se passe</th><th>Notion à identifier</th></tr></thead><tbody>
          <tr><td>Tu compares un loyer de 750 € et un autre de 820 €.</td><td>L’euro fournit une unité commune pour comparer les montants.</td><td><b>Unité de compte</b></td></tr>
          <tr><td>Ton salaire arrive sur ton compte.</td><td>Un dépôt bancaire, c’est-à-dire une créance sur ta banque, est crédité.</td><td><b>Monnaie scripturale</b></td></tr>
          <tr><td>Tu paies 40 € de courses avec ta carte de débit.</td><td>La carte initie le paiement ; le dépôt bancaire est transféré selon le circuit de paiement.</td><td><b>Instrument de paiement</b></td></tr>
          <tr><td>Tu gardes 300 € pour une facture le mois prochain.</td><td>Tu conserves une somme qui pourra être utilisée ultérieurement.</td><td><b>Réserve de valeur</b></td></tr>
          <tr><td>Les prix de ton panier augmentent de 3 % sur un an.</td><td>Avec le même montant nominal, tu achètes une quantité moyenne plus faible.</td><td><b>Inflation et pouvoir d’achat</b></td></tr>
        </tbody></table></div>
        <h3>La méthode Atlas Crypto en quatre questions</h3>
        <p>Cette grille servira dans les prochains chapitres pour examiner un stablecoin, un bitcoin, un dépôt bancaire, un jeton ou un système de paiement.</p>
        <ol class="numbered-method">
          <li><b>Qu’est-ce qui est transféré ?</b> Des espèces, un dépôt bancaire, une créance, un jeton numérique ou une instruction de paiement ?</li>
          <li><b>Qui doit quoi à qui ?</b> Existe-t-il une dette d’une banque, une promesse d’un émetteur ou seulement une unité inscrite dans un registre ?</li>
          <li><b>Qui accepte le paiement ?</b> L’acceptation est-elle générale, locale, contractuelle, limitée à une plateforme ou volontaire ?</li>
          <li><b>Quelle valeur dans le temps ?</b> Le montant est-il stable en euros ? En pouvoir d’achat ? Quels risques, frais ou conditions peuvent changer le résultat ?</li>
        </ol>
        <div class="lesson-lab-box"><span class="lesson-kicker">Mise en situation</span><h3>Un commerçant accepte le bitcoin, mais affiche ses prix en euros. Quelle fonction est principalement assurée par l’euro ?</h3><p>Choisis la meilleure réponse avant d’afficher l’explication.</p><div class="quick-choice"><button type="button" data-quick-choice="wrong">Moyen d’échange</button><button type="button" data-quick-choice="right">Unité de compte</button><button type="button" data-quick-choice="wrong">Réserve de valeur</button></div><p class="quick-feedback" id="quick-feedback" role="status"></p></div>
      </section>

      <section class="lesson-section" id="glossaire">
        <span class="lesson-kicker">08 · Le vocabulaire sans jargon</span>
        <h2>Glossaire essentiel</h2>
        <p>Ces termes reviendront dans les prochains chapitres. Ouvre une définition pour lire une explication simple et un exemple d’utilisation.</p>
        <div class="glossary-list">
          <details><summary>Unité de compte</summary><p>Unité commune dans laquelle on exprime les prix et les dettes. Exemple : un loyer de 750 € peut être comparé à un autre de 820 €.</p></details>
          <details><summary>Intermédiaire des échanges</summary><p>Rôle de la monnaie qui permet de vendre un bien contre de la monnaie puis d’utiliser cette monnaie pour un autre achat, sans troc direct.</p></details>
          <details><summary>Réserve de valeur</summary><p>Fonction qui permet de reporter du pouvoir d’achat dans le temps. Elle n’assure pas que la valeur réelle restera identique.</p></details>
          <details><summary>Double coïncidence des besoins</summary><p>Situation nécessaire au troc direct : chaque personne doit vouloir ce que l’autre propose, au même moment.</p></details>
          <details><summary>Monnaie fiduciaire</summary><p>Dans l’usage courant en France, billets et pièces. Le terme renvoie à la confiance accordée à une monnaie dont la valeur ne vient pas de la matière du support.</p></details>
          <details><summary>Monnaie scripturale</summary><p>Monnaie inscrite sur les comptes bancaires. Le solde d’un compte courant est une créance du client sur sa banque ; il ne correspond pas à des billets individualisés mis de côté à son nom.</p></details>
          <details><summary>Monnaie centrale</summary><p>Monnaie émise par la banque centrale. Dans la zone euro, elle comprend notamment les billets et les réserves détenues par les banques auprès de l’Eurosystème.</p></details>
          <details><summary>Réserves bancaires</summary><p>Dépôts que les banques détiennent auprès de la banque centrale. Ils servent notamment à régler les obligations entre banques et à répondre aux besoins de liquidité.</p></details>
          <details><summary>Instrument de paiement</summary><p>Outil ou dispositif qui permet d’initier ou d’autoriser un paiement : carte, virement, prélèvement ou paiement mobile. Il ne faut pas le confondre avec la monnaie transférée.</p></details>
          <details><summary>Créance</summary><p>Droit d’obtenir un paiement ou une prestation d’une autre personne ou organisation. Pour un client, un dépôt bancaire est une créance sur sa banque.</p></details>
          <details><summary>Crédit et principal</summary><p>Le crédit met des fonds à disposition d’un emprunteur, qui s’engage à rembourser. Le principal est le montant emprunté restant à rembourser, hors intérêts.</p></details>
          <details><summary>Intérêt</summary><p>Somme payée en contrepartie de l’utilisation d’un crédit, selon le contrat. Il ne faut pas le confondre avec le remboursement du principal.</p></details>
          <details><summary>Inflation</summary><p>Hausse du niveau général des prix sur une période. Elle n’implique pas que chaque prix augmente exactement au même rythme.</p></details>
          <details><summary>Désinflation</summary><p>Ralentissement du rythme de l’inflation. Si les prix augmentent encore, mais moins vite, il s’agit de désinflation et non de baisse générale des prix.</p></details>
          <details><summary>Pouvoir d’achat</summary><p>Quantité de biens et services qu’un revenu ou une somme permet d’obtenir. Il dépend du montant disponible et des prix auxquels on fait face.</p></details>
          <details><summary>Liquidité</summary><p>Facilité avec laquelle un actif peut être utilisé pour payer ou converti rapidement en moyen de paiement, sans délai ou perte de valeur importants. Pour une banque, la liquidité désigne aussi sa capacité à honorer ses paiements à échéance. Le sens précis dépend du contexte.</p></details>
          <details><summary>Solvabilité</summary><p>Capacité d’une personne, d’une entreprise ou d’une banque à faire face à ses dettes sur la durée. Un emprunteur peut posséder des actifs mais manquer de liquidités à une date précise ; solvabilité et liquidité sont donc différentes.</p></details>
          <details><summary>Fonds propres</summary><p>Capital et réserves comptables qui forment notamment le coussin de la banque pour absorber des pertes. Les règles prudentielles imposent des exigences de fonds propres en fonction des risques portés.</p></details>
          <details><summary>Compensation</summary><p>Étape où les informations et obligations de paiement sont rapprochées afin de calculer les montants que les participants se doivent. Dans certains systèmes, les montants peuvent être compensés pour ne régler qu’un solde net.</p></details>
          <details><summary>Règlement</summary><p>Étape où l’obligation de paiement est effectivement soldée par le transfert des fonds prévus. Dans les règlements entre banques, cela se fait généralement en monnaie de banque centrale.</p></details>
          <details><summary>Eurosystème</summary><p>Ensemble constitué par la Banque centrale européenne et les banques centrales nationales des pays de l’Union européenne qui utilisent l’euro.</p></details>
          <details><summary>Valeur nominale et valeur réelle</summary><p>La valeur nominale est le montant affiché en euros. La valeur réelle tient compte de l’évolution des prix et décrit ce que ce montant permet d’acheter.</p></details>
        </div>
      </section>

      <section class="lesson-section" id="retenir">
        <span class="lesson-kicker">09 · Synthèse</span>
        <h2>À retenir</h2>
        <div class="takeaway-grid">
          <div><b>1</b><h3>Comparer</h3><p>La monnaie fournit une unité commune pour exprimer et comparer les prix.</p></div>
          <div><b>2</b><h3>Échanger</h3><p>Elle sépare la vente d’un bien de l’achat d’un autre et réduit la contrainte du troc.</p></div>
          <div><b>3</b><h3>Reporter</h3><p>Elle permet de conserver du pouvoir d’achat, mais ne garantit pas sa stabilité réelle.</p></div>
          <div><b>4</b><h3>Organiser la confiance</h3><p>Son usage dépend de règles, d’institutions, d’infrastructures et d’une acceptation suffisamment large.</p></div>
        </div>
        <div class="lesson-callout"><strong>Le réflexe à conserver pour la suite d’Atlas Crypto</strong><p>Ne demande pas seulement « est-ce que cet actif peut être envoyé ? ». Demande aussi : que représente-t-il juridiquement et économiquement ? Qui doit quoi à qui ? Qui l’accepte ? Comment le règlement est-il effectué ? Et que peut-il acheter dans le temps ?</p></div>
        <div class="knowledge-map"><span>Le concept</span><b>Monnaie</b><span>se comprend par</span><div><strong>Fonctions</strong><strong>Formes</strong><strong>Confiance</strong><strong>Création</strong><strong>Valeur réelle</strong></div><small>Si tu sais expliquer ces cinq dimensions, tu disposes du socle nécessaire pour aborder les systèmes monétaires et les cryptoactifs.</small></div>
      </section>

      <section class="lesson-section" id="quiz">
        <span class="lesson-kicker">10 · Vérification active</span>
        <h2>Vérifier ses acquis</h2>
        <p>Réponds sans revenir au texte si possible. Après chaque choix, lis l’explication : le but est de comprendre le raisonnement, y compris pourquoi les autres options ne conviennent pas.</p>
        <div class="quiz-progress-wrap"><div class="quiz-progress-track"><span id="quiz-progress-fill"></span></div><b id="quiz-progress-label">0 / 10 réponses</b></div>
        <div class="quiz-suite">
          <article class="quiz-question" data-question><span class="question-count">Question 1 / 10 · Fondations</span><h3>Quel rôle remplit l’euro lorsqu’il permet de comparer un loyer de 750 € à un loyer de 820 € ?</h3><div class="quiz-options">
            <button type="button" data-correct="true" data-explanation="Exact. L’euro sert d’unité commune pour exprimer et comparer des prix : c’est la fonction d’unité de compte.">Unité de compte</button>
            <button type="button" data-correct="false" data-explanation="La réserve de valeur concerne le report du pouvoir d’achat dans le temps, pas la comparaison de prix à un instant donné.">Réserve de valeur</button>
            <button type="button" data-correct="false" data-explanation="L’intermédiaire des échanges concerne l’utilisation de la monnaie pour régler une opération. Ici, on compare deux montants.">Intermédiaire des échanges</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 2 / 10 · Troc</span><h3>Pourquoi le troc direct peut-il être difficile entre deux personnes ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="Les biens peuvent être divisibles ou non : ce n’est pas le cœur de la difficulté décrite ici.">Parce que les biens sont toujours indivisibles</button>
            <button type="button" data-correct="true" data-explanation="Exact. Le troc direct exige que chacun veuille précisément ce que l’autre propose, au même moment : c’est la double coïncidence des besoins.">Parce que leurs besoins doivent coïncider</button>
            <button type="button" data-correct="false" data-explanation="Un prix officiel n’est pas nécessaire au troc. Le blocage vient de la rencontre des besoins et de la comparaison des valeurs.">Parce qu’un prix officiel est obligatoire</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 3 / 10 · Paiement</span><h3>Tu paies un achat avec une carte de débit. Qu’est-ce que la carte représente principalement ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="Le dépôt est le solde inscrit sur ton compte bancaire. La carte permet d’initier ou d’autoriser son utilisation.">La monnaie scripturale elle-même</button>
            <button type="button" data-correct="true" data-explanation="Exact. La carte est un instrument de paiement ; la monnaie transférée est généralement le dépôt bancaire.">Un instrument de paiement</button>
            <button type="button" data-correct="false" data-explanation="La carte ne représente pas des réserves détenues par ta banque auprès de la banque centrale.">Des réserves de banque centrale</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 4 / 10 · Formes de monnaie</span><h3>Que représente généralement le solde positif de ton compte courant ?</h3><div class="quiz-options">
            <button type="button" data-correct="true" data-explanation="Exact. Le dépôt est une dette de la banque commerciale envers son client ; pour le client, c’est une créance sur la banque.">Une créance sur ta banque</button>
            <button type="button" data-correct="false" data-explanation="Les billets sont de la monnaie centrale sous forme d’espèces. Un dépôt bancaire est une dette de la banque commerciale.">Des billets conservés dans un coffre à ton nom</button>
            <button type="button" data-correct="false" data-explanation="Les réserves sont détenues par les banques auprès de la banque centrale, pas directement sur ton compte courant ordinaire.">Des réserves de banque centrale à ton nom</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 5 / 10 · Création monétaire</span><h3>Qu’est-ce qui est généralement créé lorsqu’une banque commerciale accorde un nouveau prêt ?</h3><div class="quiz-options">
            <button type="button" data-correct="true" data-explanation="Exact. La banque inscrit une créance de prêt à son actif et un dépôt au passif. Ce dépôt constitue de la monnaie scripturale.">Un dépôt bancaire correspondant au prêt</button>
            <button type="button" data-correct="false" data-explanation="La banque n’a pas besoin d’imprimer des billets pour accorder un crédit : le dépôt est généralement créé par une écriture comptable.">Des billets imprimés pour le client</button>
            <button type="button" data-correct="false" data-explanation="Les réserves de banque centrale sont différentes des dépôts des clients. Un particulier ne reçoit pas un compte de réserves lorsqu’il emprunte.">Un compte de réserves au nom du client</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 6 / 10 · Règlement</span><h3>Pourquoi les réserves de banque centrale sont-elles importantes entre deux banques ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="Les réserves ne sont pas les dépôts des ménages ; elles sont détenues par les banques auprès de la banque centrale.">Elles constituent directement le compte courant des clients</button>
            <button type="button" data-correct="true" data-explanation="Exact. Les réserves permettent notamment aux banques de régler leurs obligations entre elles en monnaie de banque centrale.">Elles servent notamment au règlement interbancaire</button>
            <button type="button" data-correct="false" data-explanation="Les banques ne convertissent pas automatiquement chaque dépôt client en billets : les réserves sont un actif de règlement distinct.">Elles sont des billets mis de côté pour chaque client</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 7 / 10 · Limites du crédit</span><h3>Quelle affirmation décrit le mieux les limites à la création monétaire bancaire ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="Un dépôt reçu peut contribuer au financement d’une banque, mais les crédits ne sont pas simplement un recyclage mécanique des dépôts existants.">La banque ne peut prêter que les billets déjà déposés par d’autres clients</button>
            <button type="button" data-correct="true" data-explanation="Exact. Demande solvable, risque, fonds propres, liquidité, rentabilité et conditions monétaires encadrent la création de crédit.">Elle est limitée par plusieurs contraintes économiques et prudentielles</button>
            <button type="button" data-correct="false" data-explanation="Le pouvoir de création monétaire n’est pas illimité : un crédit peut générer des pertes et doit pouvoir être financé et réglé.">Elle peut créer un montant illimité sans conséquence</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 8 / 10 · Inflation</span><h3>Si les prix augmentent de façon générale et que ta somme d’argent reste identique, que se passe-t-il en moyenne ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="Le nombre d’euros ne change pas, mais ils permettent en moyenne d’acheter moins de biens et de services.">Ton pouvoir d’achat augmente</button>
            <button type="button" data-correct="true" data-explanation="Exact. Une somme nominale fixe permet d’acheter moins lorsque le niveau général des prix augmente.">Ton pouvoir d’achat diminue</button>
            <button type="button" data-correct="false" data-explanation="Une hausse des prix ne rend pas automatiquement la monnaie plus rare en quantité : elle réduit le pouvoir d’achat d’une somme fixe.">La somme devient automatiquement plus rare</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 9 / 10 · Mesure des prix</span><h3>Le prix du café augmente fortement, mais les prix des autres biens restent stables. Peut-on conclure à une inflation générale ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="Un seul prix qui augmente ne suffit pas à caractériser une hausse générale du niveau des prix.">Oui, toute hausse d’un prix est une inflation générale</button>
            <button type="button" data-correct="true" data-explanation="Exact. Il faut examiner l’évolution d’un ensemble de prix. L’inflation est un phénomène général, pas seulement la hausse d’un produit isolé.">Non, il faut observer un ensemble de biens et services</button>
            <button type="button" data-correct="false" data-explanation="Le prix du café peut augmenter même si le niveau général des prix est stable ; il n’est donc pas nécessaire que tous les biens baissent.">Oui, à condition que tous les autres prix diminuent</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <article class="quiz-question" data-question><span class="question-count">Question 10 / 10 · Analyse</span><h3>Un actif numérique peut être transféré sur Internet. Est-ce suffisant pour conclure qu’il remplit toutes les fonctions de la monnaie ?</h3><div class="quiz-options">
            <button type="button" data-correct="false" data-explanation="Le fait d’être numérique décrit une caractéristique technique, pas les fonctions économiques ou les droits associés à l’actif.">Oui, s’il est numérique</button>
            <button type="button" data-correct="true" data-explanation="Exact. Il faut étudier son usage comme unité de compte, son acceptation, sa capacité à conserver du pouvoir d’achat et les obligations ou risques associés.">Non, il faut examiner ses fonctions, ses usages et ses limites</button>
            <button type="button" data-correct="false" data-explanation="La décentralisation ne suffit pas à déterminer l’acceptation, la stabilité ou l’usage comme unité de compte.">Oui, s’il est décentralisé</button>
          </div><p class="quiz-feedback" role="status"></p></article>
          <div class="quiz-summary" id="quiz-summary" aria-live="polite">0 / 10 réponse validée</div>
          <button class="quiz-reset" id="quiz-reset" type="button">Recommencer le quiz</button>
        </div>
      </section>

      <section class="lesson-section" id="sources">
        <span class="lesson-kicker">11 · Pour approfondir avec des sources fiables</span>
        <h2>Sources et lectures complémentaires</h2>
        <p>Les exemples de cette fiche sont pédagogiques. Pour vérifier les définitions, le cadre de l’euro, la mesure de l’inflation et la création monétaire, consulte les sources institutionnelles ci-dessous. Les textes peuvent avoir des objectifs différents ; lis aussi leurs définitions et leurs limites.</p>
        <div class="source-list">
          <a href="https://www.banque-france.fr/fr/publications-et-statistiques/publications/monnaie-de-quoi-parle-t-on" target="_blank" rel="noopener noreferrer"><span>Banque de France · 2026</span><b>Monnaie : de quoi parle-t-on ?</b><small>Les trois fonctions de la monnaie, ses formes et les mécanismes du système monétaire.</small><em>Ouvrir la ressource ↗</em></a>
          <a href="https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.fr.html" target="_blank" rel="noopener noreferrer"><span>Banque centrale européenne</span><b>Qu’est-ce que la monnaie ?</b><small>Les fonctions de la monnaie, les formes utilisées aujourd’hui et la création monétaire.</small><em>Ouvrir la ressource ↗</em></a>
          <a href="https://www.ecb.europa.eu/ecb/orga/tasks/euro/html/index.en.html" target="_blank" rel="noopener noreferrer"><span>Banque centrale européenne</span><b>Banknotes · émission des billets et pièces</b><small>Qui peut émettre les billets en euros et qui est l’émetteur légal des pièces.</small><em>Ouvrir la ressource ↗</em></a>
          <a href="https://www.banque-france.fr/fr/publications-et-statistiques/publications/livre-paiements-et-infrastructures-de-marche-lere" target="_blank" rel="noopener noreferrer"><span>Banque de France</span><b>Paiements et infrastructures de marché à l’ère digitale</b><small>Une présentation plus technique de la monnaie, du crédit, des paiements et des infrastructures de règlement.</small><em>Ouvrir la ressource ↗</em></a>
          <a href="https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy" target="_blank" rel="noopener noreferrer"><span>Bank of England</span><b>Money creation in the modern economy</b><small>Comment les prêts bancaires créent des dépôts et quelles contraintes encadrent la création monétaire.</small><em>Ouvrir la ressource ↗</em></a>
          <a href="https://ec.europa.eu/eurostat/web/hicp/information-data" target="_blank" rel="noopener noreferrer"><span>Eurostat</span><b>Harmonised Index of Consumer Prices (HICP)</b><small>Comment l’indice harmonisé des prix à la consommation est construit et ce qu’il mesure.</small><em>Ouvrir la ressource ↗</em></a>
          <a href="https://www.bis.org/publications/aer-2026/anchoring-trust-money" target="_blank" rel="noopener noreferrer"><span>Banque des règlements internationaux · 2026</span><b>Anchoring trust in money</b><small>Une perspective institutionnelle sur la confiance, les architectures monétaires et les actifs qui remplissent certaines fonctions de la monnaie.</small><em>Ouvrir la ressource ↗</em></a>
        </div>
        <p class="editorial-note"><b>Note éditoriale :</b> les analogies, exemples chiffrés et simulations sont des modèles simplifiés. Ils servent à comprendre un mécanisme, pas à prévoir son résultat dans toutes les situations. Les notions de monnaie, de cours légal, de dépôt et de cryptoactif peuvent aussi dépendre du cadre juridique applicable. Cette fiche n’est ni un conseil financier ni une recommandation d’investissement.</p>
      </section>
    `
  }
};
