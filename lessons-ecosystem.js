/* Atlas Crypto — chapitre 6 : Ethereum et les contrats intelligents.
 * Les schémas et simulations sont pédagogiques ; les règles du réseau évoluent.
 */
window.ATLAS_LESSONS = window.ATLAS_LESSONS || {};
Object.assign(window.ATLAS_LESSONS, {
  6: {
    minutes: 35,
    level: 'Débutant · aucun prérequis de programmation',
    objectives: [
      'Expliquer ce qui distingue Ethereum d’un simple registre de transactions.',
      'Distinguer un compte contrôlé par une clé et un compte de contrat.',
      'Comprendre ce qu’est un contrat intelligent et comment il est déployé.',
      'Décrire le rôle de l’EVM dans l’exécution des programmes.',
      'Lire les grandes étapes d’une transaction Ethereum.',
      'Comprendre le gas et le calcul des frais sans confondre coût et montant transféré.',
      'Identifier les limites, les dépendances et les risques des contrats intelligents.'
    ],
    toc: [
      ['e6-demarrer', 'Avant de commencer'],
      ['e6-principe', 'Ethereum : un registre qui exécute du code'],
      ['e6-comptes', 'Les comptes sur Ethereum'],
      ['e6-contrat', 'Le contrat intelligent'],
      ['e6-evm', 'La machine virtuelle Ethereum'],
      ['e6-transaction', 'Une transaction Ethereum'],
      ['e6-gas', 'Le gas et les frais'],
      ['e6-limites', 'Les limites et les risques'],
      ['e6-cas', 'Cas pratique'],
      ['e6-glossaire', 'Glossaire'],
      ['e6-retenir', 'À retenir'],
      ['e6-quiz', 'Vérifier ses acquis'],
      ['e6-sources', 'Sources']
    ],
    html: `
<div class="lesson-objectives" id="e6-demarrer">
  <div class="objectives-main">
    <span class="lesson-kicker">Avant de commencer · 01 / 05 du parcours écosystème</span>
    <h2>Ethereum ne sert pas seulement à transférer une monnaie : il permet aussi d’exécuter des programmes partagés par tout un réseau.</h2>
    <p>Tu vas découvrir comment un programme peut recevoir une instruction, vérifier des conditions, modifier des informations et produire un résultat que les participants du réseau peuvent contrôler. Nous partirons d’un exemple très concret avant d’expliquer les mécanismes techniques.</p>
    <div class="objective-tags"><span>Débutant</span><span>35 min environ</span><span>7 objectifs</span></div>
  </div>
  <aside class="objectives-side">
    <b>À la fin de ce chapitre</b>
    <ol><li>Comprendre le rôle d’Ethereum</li><li>Distinguer les types de comptes</li><li>Expliquer un contrat intelligent</li><li>Comprendre l’EVM</li><li>Suivre une transaction</li><li>Calculer des frais en gas</li><li>Identifier les principaux risques</li></ol>
  </aside>
</div>
<div class="e6-start-note"><b>Le fil conducteur</b><p>Imagine un programme qui gère les réservations de places pour un événement. Il doit connaître le nombre de places disponibles, refuser les réservations lorsque la salle est complète et enregistrer chaque réservation. Nous utiliserons cet exemple pour comprendre Ethereum, sans supposer que tu sais programmer.</p></div>

<section class="lesson-section" id="e6-principe">
  <span class="lesson-kicker">01 · Le changement de perspective</span>
  <h2>Ethereum : un réseau qui conserve un état et exécute des règles.</h2>
  <p>Avec Bitcoin, nous avons étudié un système dont le rôle principal est de gérer des unités de bitcoin et les conditions qui permettent de les dépenser. Ethereum conserve lui aussi un historique partagé et possède sa monnaie native, l’ether (ETH). Mais il ajoute une capacité importante : les participants peuvent déployer des programmes qui s’exécutent selon des règles communes.</p>
  <p>On peut donc voir Ethereum comme un <b>ordinateur partagé</b>. Ce n’est pas un ordinateur unique installé dans un bâtiment : c’est un réseau de nœuds qui vérifient les mêmes opérations et s’accordent sur le résultat. Les programmes peuvent, par exemple, gérer des inscriptions, des échanges ou des règles de transfert d’actifs numériques.</p>
  <div class="e6-compare">
    <article><span>BITCOIN · MODÈLE UTXO</span><b>Des sorties à dépenser</b><p>Le réseau suit des sorties de transaction disponibles et vérifie si chaque dépense respecte les règles du protocole.</p><small>Question centrale : cette sortie peut-elle être dépensée ?</small></article>
    <article><span>ETHEREUM · MODÈLE DE COMPTES</span><b>Des comptes et un état partagé</b><p>Le réseau suit notamment les soldes des comptes, le code des contrats et les données qu’ils conservent.</p><small>Question centrale : quelle modification d’état cette opération produit-elle ?</small></article>
  </div>
  <p>Le mot <em>état</em> désigne ici la situation actuelle du réseau : les soldes, les compteurs de transactions, le code des contrats et les données persistantes qu’ils utilisent. Une transaction valide peut faire évoluer cet état. Les blocs successifs enregistrent les opérations et permettent aux nœuds de reconstruire la situation commune.</p>
  <div class="e6-state-flow" role="img" aria-label="Un état initial et une transaction sont traités selon les règles d'Ethereum pour produire un nouvel état">
    <div><span>AVANT</span><b>État actuel</b><small>Comptes · soldes · contrats · données</small></div><i>+</i><div><span>INSTRUCTION</span><b>Transaction valide</b><small>Transfert ou appel de programme</small></div><i>→</i><div class="e6-state-result"><span>APRÈS</span><b>Nouvel état</b><small>Résultat vérifiable par les nœuds</small></div>
  </div>
  <div class="lesson-callout"><strong>La différence essentielle</strong><p>Ethereum ne se contente pas d’enregistrer qu’une valeur a changé de propriétaire. Il peut aussi exécuter un programme qui vérifie des conditions puis modifie l’état partagé. C’est cette programmabilité qui sert de base aux contrats intelligents.</p></div>
  <details class="e6-advanced"><summary>Pour aller plus loin : Ethereum comme machine à états</summary><div class="e6-advanced-body">
    <p>La documentation technique décrit Ethereum comme une machine à états distribuée. Une fonction de transition applique les transactions valides à un état initial pour produire un nouvel état. L’exécution est déterministe : pour le même état initial et les mêmes données d’entrée, les règles doivent conduire au même résultat sur les nœuds qui appliquent la même version du protocole.</p>
    <p>Cette formulation explique pourquoi les nœuds peuvent vérifier le résultat d’un bloc sans devoir faire confiance à la personne qui l’a proposé.</p>
  </div></details>
</section>

<section class="lesson-section" id="e6-comptes">
  <span class="lesson-kicker">02 · Qui agit sur le réseau ?</span>
  <h2>Les deux grandes familles de comptes Ethereum.</h2>
  <p>Ethereum utilise un modèle de comptes. Un compte peut recevoir de l’ETH, en détenir et interagir avec d’autres comptes ou des contrats. Il existe deux catégories classiques : les comptes contrôlés par une clé et les comptes de contrats.</p>
  <div class="e6-account-grid">
    <article class="e6-account-card"><span>01 · COMPTE CONTRÔLÉ PAR UNE CLÉ</span><h3>EOA</h3><p>Un <em>Externally Owned Account</em> est un compte dont les opérations sont autorisées à l’aide d’une clé privée. C’est le modèle généralement utilisé par un portefeuille personnel.</p><ul><li>Il possède une adresse et peut détenir de l’ETH.</li><li>La clé privée permet de signer des transactions.</li><li>Il peut envoyer de l’ETH ou appeler un contrat.</li></ul><small>Exemple : ton compte dans un portefeuille Ethereum.</small></article>
    <article class="e6-account-card e6-contract-card"><span>02 · COMPTE DE PROGRAMME</span><h3>Compte de contrat</h3><p>Un compte de contrat possède du code déployé à une adresse. Il exécute ce code lorsqu’il est appelé par une transaction ou par un autre contrat.</p><ul><li>Il peut détenir de l’ETH et des actifs numériques.</li><li>Son comportement dépend du code et de son état.</li><li>Il ne possède pas une clé privée de propriétaire par défaut.</li></ul><small>Exemple : un programme qui gère les réservations d’un événement.</small></article>
  </div>
  <h3>Une comparaison facile à retenir</h3>
  <p>Imagine un standard téléphonique : une personne qui appelle compose un numéro et formule une demande. Le compte contrôlé par une clé joue le rôle de l’appelant ; le contrat est le service automatisé qui applique les règles prévues. Le contrat ne décide pas librement de ce qu’il veut faire : il exécute les instructions autorisées par son code et le contexte de l’appel.</p>
  <div class="e6-call-flow"><div><b>Compte utilisateur</b><small>Prépare et signe une transaction</small></div><span>→</span><div><b>Adresse du contrat</b><small>Reçoit l’appel</small></div><span>→</span><div><b>Code exécuté</b><small>Applique les conditions</small></div><span>→</span><div><b>État mis à jour</b><small>Si l’opération réussit</small></div></div>
  <div class="lesson-callout lesson-callout-muted"><strong>Ne confonds pas compte et portefeuille</strong><p>Un portefeuille est l’outil qui aide à gérer des clés, afficher les comptes et préparer des opérations. Un compte est une entité enregistrée dans l’état d’Ethereum. L’application de portefeuille n’est donc pas l’endroit où les ETH sont physiquement stockés.</p></div>
  <details class="e6-advanced"><summary>Pour aller plus loin : les données d’un compte</summary><div class="e6-advanced-body">
    <p>Dans le modèle classique, un compte comporte notamment un solde, un nonce (un compteur qui ordonne ses transactions), un code éventuel et des données de stockage. Un compte contrôlé par une clé n’a normalement pas de code de contrat associé ; un compte de contrat possède du code.</p>
    <p>Les évolutions récentes du protocole ajoutent des possibilités de délégation de code et de comptes intelligents. La distinction EOA / contrat reste une base utile pour apprendre, mais certaines expériences modernes peuvent en brouiller les frontières.</p>
  </div></details>
</section>

<section class="lesson-section" id="e6-contrat">
  <span class="lesson-kicker">03 · La pièce maîtresse</span>
  <h2>Un contrat intelligent : un programme qui applique des règles.</h2>
  <p>Un <b>contrat intelligent</b> (<em>smart contract</em>) est un programme informatique déployé sur une blockchain compatible, à une adresse précise. Il contient des fonctions et des données. Lorsqu’il reçoit une instruction, il exécute la logique prévue par son code dans les conditions définies par le réseau.</p>
  <p>Le mot « contrat » peut prêter à confusion : il ne s’agit pas automatiquement d’un contrat juridique signé entre deux personnes. C’est avant tout du code informatique. Il peut mettre en œuvre certaines règles d’un accord, mais il ne garantit pas à lui seul que ces règles sont légales, justes ou conformes à l’intention des utilisateurs.</p>
  <div class="e6-contract-example">
    <div class="e6-contract-title"><span>EXEMPLE CONCEPTUEL</span><b>Réservation d’une place</b><small>Règle programmée : une place ne peut être attribuée qu’une seule fois.</small></div>
    <div class="e6-condition-grid"><div><span>SI</span><b>Une place est disponible</b><p>Le programme vérifie le nombre de réservations déjà enregistrées.</p></div><i>→</i><div class="e6-condition-success"><span>ALORS</span><b>La réservation est enregistrée</b><p>Le compteur augmente et la place est attribuée à l’adresse appelante.</p></div><div class="e6-condition-fail"><span>SINON</span><b>La demande est refusée</b><p>La salle est complète : l’état n’est pas modifié par cette réservation.</p></div></div>
    <p class="e6-contract-caption">Exemple fictif simplifié. Un vrai contrat doit prévoir bien d’autres cas : annulation, remboursement, accès administrateur, erreurs et gestion des fonds éventuels.</p>
  </div>
  <h3>Comment un contrat arrive-t-il sur le réseau ?</h3>
  <div class="e6-deploy-steps">
    <article><span>01</span><b>Écrire le programme</b><p>Un développeur décrit les règles dans un langage adapté, par exemple Solidity ou Vyper.</p></article>
    <article><span>02</span><b>Compiler le code</b><p>Le programme est transformé en bytecode, une forme que l’EVM peut exécuter.</p></article>
    <article><span>03</span><b>Déployer le contrat</b><p>Une transaction de déploiement transmet le code compilé au réseau. Cette opération consomme du gas.</p></article>
    <article><span>04</span><b>Interagir avec lui</b><p>Une fois le déploiement accepté, les utilisateurs peuvent appeler ses fonctions à son adresse.</p></article>
  </div>
  <div class="lesson-callout"><strong>Un contrat n’est pas intelligent au sens humain</strong><p>Il ne comprend pas une situation et ne prend pas de décision morale. Il applique des instructions prévues par ses développeurs. Il peut donc produire un résultat techniquement conforme au code, mais contraire à ce que l’utilisateur pensait demander.</p></div>
  <details class="e6-advanced"><summary>Pour aller plus loin : code source et bytecode</summary><div class="e6-advanced-body">
    <p>Les développeurs écrivent souvent les contrats en Solidity. Le compilateur transforme ce code lisible en bytecode EVM. Le réseau exécute le bytecode ; publier le code source et les paramètres de compilation permet à d’autres personnes de vérifier qu’ils correspondent bien au programme déployé.</p>
    <p>Un contrat est déployé à une adresse sur un réseau donné. La même application peut donc avoir des adresses différentes sur le réseau principal et sur un réseau de test.</p>
  </div></details>
</section>

<section class="lesson-section" id="e6-evm">
  <span class="lesson-kicker">04 · Le moteur d’exécution</span>
  <h2>L’EVM : le moteur qui exécute les contrats intelligents.</h2>
  <p>L’<b>Ethereum Virtual Machine</b> (EVM), ou machine virtuelle Ethereum, est l’environnement d’exécution des contrats. Elle définit les opérations que le code peut réaliser et la manière dont le résultat modifie l’état du réseau.</p>
  <p>Imagine que plusieurs ordinateurs possèdent le même manuel d’instructions et la même situation de départ. Lorsqu’une nouvelle instruction arrive, chacun applique les mêmes étapes. Si les règles sont identiques et les données d’entrée valides, ils doivent obtenir le même résultat. C’est l’idée générale derrière l’exécution déterministe de l’EVM.</p>
  <div class="e6-evm-diagram" role="img" aria-label="Les nœuds exécutent le même bytecode avec le même état et vérifient le même résultat">
    <div class="e6-evm-input"><span>ENTRÉE</span><b>Transaction et état initial</b><small>Fonction demandée · paramètres · données du réseau</small></div><div class="e6-evm-down">↓</div>
    <div class="e6-evm-nodes"><article><span>NŒUD A</span><b>EVM</b><small>Exécute les règles</small></article><article><span>NŒUD B</span><b>EVM</b><small>Exécute les règles</small></article><article><span>NŒUD C</span><b>EVM</b><small>Exécute les règles</small></article></div>
    <div class="e6-evm-down">↓</div><div class="e6-evm-output"><span>RÉSULTAT ATTENDU</span><b>Même transition d’état</b><small>Les résultats sont vérifiables par les participants.</small></div>
  </div>
  <h3>Pourquoi ne pas exécuter le programme sur un seul serveur ?</h3>
  <p>Si un serveur unique gérait toutes les règles, ses administrateurs pourraient contrôler le fonctionnement et l’accès aux données. Avec un réseau public, les nœuds vérifient les opérations selon le protocole. Cela réduit la dépendance envers un opérateur unique, mais ne rend pas le système gratuit, instantané ou impossible à attaquer.</p>
  <div class="e6-three-layers"><article><b>Le code</b><p>Décrit les instructions du contrat.</p></article><span>→</span><article><b>L’EVM</b><p>Interprète et exécute ces instructions.</p></article><span>→</span><article><b>L’état</b><p>Conserve les changements validés.</p></article></div>
  <details class="e6-advanced"><summary>Pour aller plus loin : stockage, mémoire et événements</summary><div class="e6-advanced-body">
    <p>Un contrat peut conserver des données persistantes dans son <em>storage</em> : par exemple, le nombre de places réservées. Il peut aussi utiliser une mémoire temporaire pendant l’exécution. La mémoire est effacée à la fin de l’opération, tandis que les valeurs persistantes restent dans l’état du contrat.</p>
    <p>Un contrat peut également émettre des événements (logs). Ils permettent aux interfaces et aux services externes de repérer qu’une action s’est produite. Un événement est une trace utile à consulter ; il ne remplace pas à lui seul les données d’état du contrat.</p>
  </div></details>
</section>

<section class="lesson-section" id="e6-transaction">
  <span class="lesson-kicker">05 · Passer une instruction</span>
  <h2>Que contient une transaction Ethereum ?</h2>
  <p>Une transaction est une instruction signée qui demande au réseau d’effectuer une opération. Elle peut transférer de l’ETH à un autre compte ou appeler une fonction d’un contrat intelligent. Dans ce second cas, les données de la transaction indiquent notamment quelle fonction appeler et avec quels paramètres.</p>
  <div class="e6-tx-parts">
    <article><span>EXPÉDITEUR</span><b>Qui signe ?</b><p>L’adresse du compte qui autorise l’opération.</p></article>
    <article><span>DESTINATAIRE</span><b>À qui ou à quoi ?</b><p>Un compte ou l’adresse du contrat visé.</p></article>
    <article><span>VALEUR</span><b>Quel montant d’ETH ?</b><p>La quantité d’ether éventuellement transférée avec l’opération.</p></article>
    <article><span>DONNÉES</span><b>Quelle instruction ?</b><p>Des données qui peuvent préciser la fonction et les paramètres à transmettre au contrat.</p></article>
    <article><span>GAS</span><b>Quel budget de calcul ?</b><p>La limite de ressources que l’expéditeur accepte de mobiliser pour l’exécution.</p></article>
    <article><span>NONCE</span><b>Quel ordre ?</b><p>Un compteur qui empêche qu’une même séquence de transactions signées soit rejouée dans le désordre.</p></article>
  </div>
  <h3>Appeler un contrat ou simplement lire une information ?</h3>
  <p>Il faut distinguer une opération qui modifie l’état et une simple lecture. Par exemple, afficher le nombre de places restantes peut se faire par une lecture simulée de la fonction du contrat. Réserver une place modifie l’état partagé : il faut alors envoyer une transaction, qui sera signée, diffusée et exécutée par le réseau.</p>
  <div class="e6-read-write">
    <article><span>LECTURE</span><b>Combien de places restent disponibles ?</b><p>La fonction consulte une donnée sans changer l’état. Une lecture demandée via un appel RPC de type <em>eth_call</em> ne nécessite pas de frais de transaction payés par l’utilisateur.</p><strong>Pas de transaction persistante</strong></article>
    <article><span>ÉCRITURE</span><b>Je réserve une place.</b><p>La fonction vérifie la disponibilité et modifie les données du contrat. Une transaction doit être envoyée et les ressources consommées sont facturées.</p><strong>Transaction et frais de gas</strong></article>
  </div>
  <div class="lesson-callout lesson-callout-muted"><strong>Une subtilité utile</strong><p>Une fonction dite <em>view</em> ou <em>pure</em> indique qu’elle ne modifie pas l’état lorsqu’elle est appelée de cette manière. Elle peut toutefois être exécutée à l’intérieur d’une autre transaction ; dans ce contexte, son calcul participe à la consommation de gas de l’opération globale.</p></div>
  <p>Une fois diffusée, la transaction est vérifiée et peut être incluse dans un bloc. Les nœuds exécutent les opérations selon les règles du protocole. Si le résultat est valide, le bloc fait évoluer l’état partagé. Le nombre de confirmations et la finalité dépendent ensuite du mécanisme de consensus d’Ethereum.</p>
</section>

<section class="lesson-section" id="e6-gas">
  <span class="lesson-kicker">06 · Payer les ressources</span>
  <h2>Le gas : mesurer le travail demandé au réseau.</h2>
  <p>Exécuter un contrat consomme des ressources : calcul, accès aux données et mises à jour de l’état. Ethereum mesure cette consommation avec une unité appelée <b>gas</b>. Une opération simple coûte généralement moins de gas qu’un programme qui effectue beaucoup de calculs ou modifie de nombreuses données.</p>
  <p>Le gas n’est pas une monnaie et ne correspond pas directement à une durée en secondes. C’est une unité de mesure du travail d’exécution. Les frais, eux, sont payés en ETH.</p>
  <div class="e6-gas-analogy"><div><span>ANALOGIE</span><b>Un trajet en voiture</b><p>La distance parcourue représente la quantité de ressources utilisées. Le prix du carburant représente le coût unitaire. Une longue distance peut coûter plus cher, même si le prix du litre reste identique.</p></div><div class="e6-gas-formula"><span>FORMULE</span><strong>Frais = gas utilisé × prix du gas</strong><small>Le gas mesure le travail ; le prix par unité donne le coût en ETH.</small></div></div>
  <h3>Trois notions à distinguer</h3>
  <div class="e6-gas-terms"><article><b>Gas utilisé</b><p>Quantité de ressources effectivement consommées par l’opération.</p></article><article><b>Gas limit</b><p>Quantité maximale de gas que l’expéditeur autorise pour la transaction.</p></article><article><b>Prix du gas</b><p>Prix payé pour chaque unité consommée, généralement exprimé en gwei.</p></article></div>
  <p>Le prix du gas est exprimé en <em>gwei</em>, une fraction d’ETH : 1 gwei correspond à 0,000000001 ETH. Le prix payé par unité combine généralement les frais de base (<em>base fee</em>) et les frais de priorité (<em>priority fee</em>). Le premier est fixé par le protocole pour le bloc ; le second peut inciter un validateur à sélectionner la transaction.</p>
  <div class="e6-fee-lab">
    <div class="e6-fee-head"><span class="lesson-kicker">Simulateur pédagogique</span><h3>Calcule les frais d’une opération.</h3><p>Modifie les paramètres pour voir comment le coût varie. Les valeurs de départ sont fictives.</p></div>
    <div class="e6-fee-controls">
      <label for="e6-gas-used">Gas utilisé<input id="e6-gas-used" type="number" min="21000" max="1000000" step="1000" value="50000" inputmode="numeric"><small>Exemple : transfert simple ou appel de contrat.</small></label>
      <label for="e6-base-fee">Frais de base (gwei)<input id="e6-base-fee" type="number" min="0" max="1000" step="0.1" value="20" inputmode="decimal"></label>
      <label for="e6-priority-fee">Frais de priorité (gwei)<input id="e6-priority-fee" type="number" min="0" max="100" step="0.1" value="2" inputmode="decimal"></label>
    </div>
    <div class="e6-fee-results"><div><span>Prix total par gas</span><b id="e6-total-price">22 gwei</b><small>Base fee + priority fee</small></div><div class="e6-fee-total"><span>Frais estimés</span><b id="e6-total-cost">0,0011 ETH</b><small id="e6-total-cost-eur">Soit 1 100 000 gwei</small></div></div>
    <div class="e6-fee-breakdown"><div><span>Frais de base brûlés</span><b id="e6-burned">0,001 ETH</b></div><div><span>Frais de priorité au validateur</span><b id="e6-tip">0,0001 ETH</b></div></div>
    <p class="e6-fee-status" id="e6-fee-status" role="status">Simulation : 50 000 gas × 22 gwei = 0,0011 ETH.</p>
    <button type="button" id="e6-fee-reset" class="e6-reset">Réinitialiser</button>
    <p class="e6-footnote">Ce simulateur isole le calcul avec un prix effectif égal à la somme des frais de base et de priorité. Il ne récupère pas les prix du réseau en direct et ne modélise pas tous les paramètres possibles d’une transaction, notamment le plafond maxFeePerGas. Il ne prédit ni le coût réel d’une opération future, ni son délai d’inclusion.</p>
  </div>
  <h3>À quoi servent les deux composantes du prix ?</h3>
  <div class="e6-fee-flow"><article><span>BASE FEE</span><b>Brûlée</b><p>La part correspondant aux frais de base est retirée de la circulation : elle n’est pas versée au validateur.</p></article><article><span>PRIORITY FEE</span><b>Versée au validateur</b><p>La part de priorité revient au validateur qui inclut la transaction dans le bloc.</p></article></div>
  <div class="lesson-callout"><strong>Une transaction qui échoue peut quand même coûter des frais</strong><p>Si le code rencontre une condition qui annule l’opération, les changements d’état sont annulés. Mais le réseau a tout de même effectué du calcul : le gas déjà consommé doit être payé. Le gas protège donc aussi le réseau contre les programmes qui consommeraient des ressources sans limite.</p></div>
  <details class="e6-advanced"><summary>Pour aller plus loin : gas limit, maxFeePerGas et remboursement</summary><div class="e6-advanced-body">
    <p>Le gas limit est le budget maximal de gas que la transaction peut consommer. Le paramètre <em>maxFeePerGas</em> fixe le prix maximal que l’expéditeur accepte de payer par unité, tandis que le prix effectif dépend des frais de base et de la priorité retenue. Si le plafond est supérieur au prix effectivement appliqué, la différence n’est pas facturée.</p>
    <p>Le coût final se calcule à partir du gas effectivement consommé et du prix effectif par unité, pas en multipliant systématiquement le gas limit par le plafond maximal.</p>
  </div></details>
</section>

<section class="lesson-section" id="e6-limites">
  <span class="lesson-kicker">07 · Garder un regard critique</span>
  <h2>Un programme automatique n’est pas un programme infaillible.</h2>
  <p>Un contrat intelligent peut appliquer une règle sans demander à une entreprise de traiter chaque opération manuellement. Mais il dépend de la qualité de son code, de la conception du système et des informations qu’il reçoit. Une exécution fidèle ne signifie pas que le résultat est juste ou sans danger.</p>
  <div class="e6-risk-grid">
    <article><span>01 · CODE</span><b>Erreur de programmation</b><p>Une condition oubliée ou une faille peut permettre un comportement non prévu, parfois avec des conséquences irréversibles.</p></article>
    <article><span>02 · DONNÉES</span><b>Information externe erronée</b><p>Un contrat ne peut pas vérifier seul un prix de marché, une météo ou la réalité d’une livraison. Il dépend d’une source externe.</p></article>
    <article><span>03 · AUTORISATIONS</span><b>Pouvoirs administrateur</b><p>Certains contrats donnent à une clé ou à un groupe le droit de suspendre, modifier des paramètres ou déclencher une mise à niveau.</p></article>
    <article><span>04 · INFRASTRUCTURE</span><b>Services et interfaces</b><p>Une application peut dépendre d’un site web, d’un fournisseur RPC, d’un indexeur ou d’autres services qui ne sont pas tous décentralisés.</p></article>
  </div>
  <h3>Le problème des informations venant du monde réel</h3>
  <p>Reprenons notre système de réservation. Le contrat peut vérifier qu’une place est disponible et enregistrer qu’une adresse en a réservé une. Mais il ne peut pas savoir, par lui-même, si la personne derrière cette adresse est bien celle qui se présente à l’entrée. Il lui faudrait une information fournie par un service, un appareil ou un contrôle extérieur.</p>
  <p>Un <em>oracle</em> est un mécanisme qui transmet à un contrat une information provenant de l’extérieur de la blockchain. L’oracle permet au programme d’utiliser cette information ; il ne garantit pas automatiquement qu’elle est exacte ou impartiale.</p>
  <div class="e6-oracle-flow"><div><b>Monde réel</b><small>Prix, météo, livraison</small></div><span>→</span><div><b>Oracle</b><small>Transmet une information</small></div><span>→</span><div><b>Contrat</b><small>Applique une règle au chiffre reçu</small></div></div>
  <h3>Le code est-il toujours impossible à modifier ?</h3>
  <p>Un programme déployé à une adresse ne peut généralement pas être réécrit directement comme un fichier sur un ordinateur. Toutefois, certains systèmes prévoient des mécanismes de mise à niveau, par exemple des contrats proxy qui redirigent les appels vers une logique modifiable. Cela peut être utile pour corriger un problème, mais cela crée aussi un pouvoir de modification qu’il faut identifier.</p>
  <div class="lesson-callout lesson-callout-muted"><strong>Une vérification ne suffit pas à tout garantir</strong><p>Tests, revue indépendante et audit réduisent certains risques, mais ne prouvent pas l’absence de vulnérabilité. Il faut aussi regarder qui contrôle les clés d’administration, comment les mises à niveau sont décidées, quelles dépendances externes existent et ce qui se passe en cas d’erreur.</p></div>
  <details class="e6-advanced"><summary>Pour aller plus loin : composabilité</summary><div class="e6-advanced-body">
    <p>Les contrats peuvent appeler d’autres contrats. Cette propriété est souvent appelée <em>composabilité</em> : un programme peut réutiliser les fonctions d’un autre, comme des briques logicielles. Elle permet de construire des applications complexes, mais elle ajoute des dépendances. Une faille ou un changement dans un contrat appelé peut donc affecter les applications qui s’appuient dessus.</p>
  </div></details>
</section>

<section class="lesson-section" id="e6-cas">
  <span class="lesson-kicker">08 · Tout relier</span>
  <h2>Cas pratique : réserver une place avec un contrat.</h2>
  <p>Imaginons qu’un organisateur propose 100 places pour une conférence. Un contrat intelligent gère les réservations. Une personne veut réserver une place : que se passe-t-il concrètement ?</p>
  <div class="e6-case-steps">
    <article><span>01 · LECTURE</span><b>L’application vérifie le nombre de places restantes</b><p>Elle interroge le contrat sans modifier l’état. Cette lecture est simulée par un appel et ne nécessite pas de frais de transaction payés par l’utilisateur.</p></article>
    <article><span>02 · DEMANDE</span><b>L’utilisateur demande une réservation</b><p>Son portefeuille prépare une transaction signée qui appelle la fonction de réservation, avec les paramètres nécessaires.</p></article>
    <article><span>03 · EXÉCUTION</span><b>Le contrat applique ses conditions</b><p>L’EVM exécute le code. Si une place reste disponible, le contrat met à jour son état. Sinon, la demande échoue.</p></article>
    <article><span>04 · GAS</span><b>Le calcul est facturé</b><p>Le gas mesure les ressources consommées par l’exécution. Les frais sont payés en ETH, même si la réservation est annulée après une erreur.</p></article>
    <article><span>05 · VALIDATION</span><b>Le réseau enregistre le résultat</b><p>Les nœuds vérifient le bloc et la transaction. Une fois le bloc accepté, l’état mis à jour devient celui que le réseau suit.</p></article>
  </div>
  <div class="e6-case-result"><span>LE RÉSULTAT À COMPRENDRE</span><b>Le contrat applique une règle partagée ; il ne remplace pas tous les acteurs du monde réel.</b><p>Il peut empêcher deux réservations de consommer la même place dans son propre état. Il ne garantit pas que l’organisateur ouvrira la salle, que l’identité du participant est correcte ou que l’événement aura lieu.</p></div>
  <h3>Ce que cet exemple permet de distinguer</h3>
  <ul class="check-list"><li><b>Le portefeuille</b> prépare et signe l’instruction.</li><li><b>La transaction</b> transporte la demande vers le réseau.</li><li><b>L’EVM</b> exécute le code prévu par le contrat.</li><li><b>Le gas</b> mesure le travail consommé et sert au calcul des frais.</li><li><b>Les validateurs et les nœuds</b> contribuent à vérifier et à inclure les opérations selon les règles d’Ethereum.</li></ul>
</section>

<section class="lesson-section" id="e6-glossaire">
  <span class="lesson-kicker">09 · Le vocabulaire sans jargon</span><h2>Glossaire essentiel.</h2>
  <p>Les notions principales sont expliquées ici et certaines apparaissent aussi directement dans le cours. Ouvre une définition pour réviser sans devoir mémoriser tous les termes dès la première lecture.</p>
  <div class="btc-glossary">
    <details><summary>Ethereum</summary><p>Réseau blockchain public qui conserve un état partagé et permet d’exécuter des contrats intelligents selon des règles communes.</p></details>
    <details><summary>Ether (ETH)</summary><p>Actif natif d’Ethereum. Il sert notamment à payer les frais d’exécution et peut être transféré entre comptes.</p></details>
    <details><summary>État (state)</summary><p>Ensemble des informations actuelles suivies par le réseau : soldes, compteurs, code des contrats et données persistantes.</p></details>
    <details><summary>Compte EOA</summary><p>Compte contrôlé par une clé privée, généralement utilisé par une personne via un portefeuille pour signer des transactions.</p></details>
    <details><summary>Compte de contrat</summary><p>Compte associé à du code déployé sur Ethereum, qui s’exécute lorsqu’il est appelé.</p></details>
    <details><summary>Contrat intelligent (smart contract)</summary><p>Programme déployé à une adresse sur une blockchain compatible, dont les fonctions appliquent des règles au contexte et aux données reçues.</p></details>
    <details><summary>Solidity</summary><p>Langage de programmation couramment utilisé pour écrire des contrats intelligents destinés à l’EVM.</p></details>
    <details><summary>Bytecode</summary><p>Forme compilée du programme, composée d’instructions que l’EVM peut exécuter.</p></details>
    <details><summary>Déploiement</summary><p>Opération qui publie un nouveau contrat sur un réseau. Sur Ethereum, elle prend la forme d’une transaction et consomme du gas.</p></details>
    <details><summary>EVM</summary><p>Ethereum Virtual Machine : environnement d’exécution qui définit comment le code des contrats est interprété et comment l’état évolue.</p></details>
    <details><summary>Transaction</summary><p>Instruction signée et envoyée au réseau pour transférer de l’ETH ou déclencher une opération, par exemple l’appel d’un contrat.</p></details>
    <details><summary>Gas</summary><p>Unité qui mesure les ressources nécessaires à l’exécution des opérations sur Ethereum.</p></details>
    <details><summary>Gas limit</summary><p>Quantité maximale de gas que l’expéditeur autorise pour une transaction donnée.</p></details>
    <details><summary>Gwei</summary><p>Sous-unité de l’ETH utilisée notamment pour exprimer les prix du gas. Un gwei vaut 0,000000001 ETH.</p></details>
    <details><summary>Base fee</summary><p>Prix de base du gas fixé par le protocole pour un bloc. Cette part des frais est brûlée.</p></details>
    <details><summary>Priority fee</summary><p>Supplément proposé pour inciter un validateur à inclure une transaction. Il est versé au validateur qui la produit dans un bloc.</p></details>
    <details><summary>Storage</summary><p>Espace où un contrat conserve des données persistantes dans l’état du réseau.</p></details>
    <details><summary>Événement (event)</summary><p>Information émise par un contrat dans les journaux d’une transaction pour que des applications puissent repérer certaines actions.</p></details>
    <details><summary>Oracle</summary><p>Service ou mécanisme qui transmet à un contrat une information issue de l’extérieur de la blockchain.</p></details>
    <details><summary>Validateur</summary><p>Participant qui met de l’ETH en jeu selon les règles du protocole et contribue à proposer ou attester des blocs dans le mécanisme de preuve d’enjeu.</p></details>
    <details><summary>Preuve d’enjeu (Proof of Stake)</summary><p>Mécanisme de consensus dans lequel des validateurs immobilisent une mise et peuvent subir des pénalités s’ils enfreignent certaines règles.</p></details>
    <details><summary>Composabilité</summary><p>Capacité de contrats à appeler et réutiliser les fonctions d’autres contrats pour former des applications plus complexes.</p></details>
    <details><summary>Réversion (revert)</summary><p>Annulation des changements d’état d’une exécution lorsqu’une condition provoque l’échec du contrat. Le gas déjà consommé reste dû.</p></details>
  </div>
</section>

<section class="lesson-section" id="e6-retenir">
  <span class="lesson-kicker">10 · Synthèse</span><h2>Ce qu’il faut absolument retenir.</h2>
  <div class="e6-takeaways">
    <article><b>01 · Ethereum</b><p>Un réseau qui conserve un état partagé et exécute des programmes selon des règles communes.</p></article>
    <article><b>02 · Les comptes</b><p>Les comptes contrôlés par une clé signent les transactions ; les comptes de contrats exécutent le code déployé.</p></article>
    <article><b>03 · Le contrat intelligent</b><p>Un programme qui applique des règles. Le mot « contrat » ne garantit ni une valeur juridique ni une intention correcte.</p></article>
    <article><b>04 · L’EVM</b><p>Le moteur d’exécution qui permet aux nœuds de vérifier comment le code modifie l’état.</p></article>
    <article><b>05 · Le gas</b><p>Une unité de ressources consommées. Les frais sont calculés à partir du gas utilisé et du prix par unité.</p></article>
    <article><b>06 · Les limites</b><p>Un code peut contenir des failles, dépendre de données externes et laisser certains pouvoirs à des administrateurs.</p></article>
  </div>
  <div class="lesson-callout"><strong>Le modèle mental à garder</strong><p>Un utilisateur signe une transaction → le réseau la vérifie → l’EVM exécute le code appelé → le gas mesure le travail → le résultat valide fait évoluer l’état partagé. C’est la base à maîtriser avant d’étudier les tokens, les stablecoins ou la finance décentralisée.</p></div>
</section>

<section class="lesson-section" id="e6-quiz">
  <span class="lesson-kicker">11 · Vérification active</span><h2>Vérifier ses acquis.</h2>
  <p>Les questions commencent par les notions fondamentales et progressent vers les frais, les lectures et les limites. Prends le temps de lire chaque explication après ta réponse.</p>
  <div class="quiz-progress-wrap"><div class="quiz-progress-track"><span id="quiz-progress-fill"></span></div><b id="quiz-progress-label">0 / 10 réponses</b></div>
  <div class="btc-quiz-set">
    <article class="quiz-question" data-question><span class="question-count">Question 1 / 10 · Rôle</span><h3>Qu’est-ce qui distingue principalement Ethereum d’un simple registre de transferts ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="Ethereum conserve aussi des soldes et des transferts, mais sa particularité est de pouvoir exécuter des programmes partagés.">Il remplace totalement les monnaies par des fichiers</button><button type="button" data-correct="true" data-explanation="Exact. Ethereum permet aux nœuds d’exécuter des contrats intelligents selon des règles communes et de vérifier les changements d’état.">Il peut exécuter des programmes qui modifient un état partagé</button><button type="button" data-correct="false" data-explanation="Le réseau est distribué : il ne dépend pas d’un unique serveur chargé d’exécuter tous les contrats.">Il repose sur un serveur central qui valide toutes les opérations</button></div><p class="quiz-feedback" role="status"></p></article>
    <article class="quiz-question" data-question><span class="question-count">Question 2 / 10 · Comptes</span><h3>Qu’est-ce qu’un compte EOA dans le modèle classique d’Ethereum ?</h3><div class="quiz-options"><button type="button" data-correct="true" data-explanation="Exact. Un EOA est contrôlé par une clé privée qui permet notamment de signer des transactions.">Un compte contrôlé par une clé privée</button><button type="button" data-correct="false" data-explanation="Un contrat est un compte associé à du code déployé, pas un compte utilisateur classique.">Un programme qui ne peut pas recevoir d’ETH</button><button type="button" data-correct="false" data-explanation="Le portefeuille est un outil de gestion ; le compte est une entité suivie dans l’état du réseau.">Le logiciel de portefeuille lui-même</button></div><p class="quiz-feedback" role="status"></p></article>
    <article class="quiz-question" data-question><span class="question-count">Question 3 / 10 · Contrats</span><h3>Un contrat intelligent est avant tout…</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="Le terme peut évoquer le droit, mais un smart contract est d’abord un programme informatique.">Un document juridique automatiquement approuvé par l’État</button><button type="button" data-correct="true" data-explanation="Exact. Il s’agit d’un programme déployé à une adresse et exécuté selon les règles du réseau.">Un programme qui applique des règles lorsqu’il est appelé</button><button type="button" data-correct="false" data-explanation="Un contrat intelligent peut gérer différents types de données et d’opérations ; il n’est pas limité aux transferts d’ETH.">Une adresse qui contient toujours une somme fixe d’ETH</button></div><p class="quiz-feedback" role="status"></p></article>
    <article class="quiz-question" data-question><span class="question-count">Question 4 / 10 · EVM</span><h3>Quel est le rôle principal de l’EVM ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="L’EVM ne sert pas à stocker des clés privées d’utilisateurs.">Conserver les phrases de récupération des utilisateurs</button><button type="button" data-correct="false" data-explanation="L’EVM n’est pas une entreprise ni un serveur unique.">Choisir seule les projets qui ont le droit d’utiliser Ethereum</button><button type="button" data-correct="true" data-explanation="Exact. L’EVM définit comment le bytecode des contrats est exécuté et comment cette exécution peut modifier l’état.">Exécuter le code des contrats selon des règles communes</button></div><p class="quiz-feedback" role="status"></p></article>
    <article class="quiz-question" data-question><span class="question-count">Question 5 / 10 · Transactions</span><h3>Que fait une transaction qui appelle un contrat ?</h3><div class="quiz-options"><button type="button" data-correct="true" data-explanation="Exact. Les données indiquent notamment la fonction appelée et ses paramètres ; le contrat est exécuté par le réseau.">Elle demande l’exécution d’une fonction du contrat avec des données</button><button type="button" data-correct="false" data-explanation="Le code n’est pas exécuté uniquement dans le navigateur de la personne qui utilise l’application.">Elle exécute uniquement du JavaScript sur le téléphone de l’utilisateur</button><button type="button" data-correct="false" data-explanation="L’adresse du contrat identifie le programme ; la transaction transmet une instruction, pas un fichier à télécharger.">Elle télécharge le contrat sur l’ordinateur du destinataire</button></div><p class="quiz-feedback" role="status"></p></article>
    <article class="quiz-question" data-question><span class="question-count">Question 6 / 10 · Lecture</span><h3>Pourquoi une simple lecture via eth_call ne demande-t-elle généralement pas de frais de transaction à l’utilisateur ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="Une lecture peut quand même demander du calcul aux nœuds qui la traitent.">Parce qu’elle ne demande aucun calcul informatique</button><button type="button" data-correct="true" data-explanation="Exact. Cette lecture est simulée par un appel RPC et ne produit pas de transaction persistante dans un bloc.">Parce qu’elle ne modifie pas l’état et n’est pas envoyée comme transaction persistante</button><button type="button" data-correct="false" data-explanation="Les utilisateurs peuvent consulter les données publiques sans détenir une clé privée.">Parce qu’il faut obligatoirement posséder 32 ETH</button></div><p class="quiz-feedback" role="status"></p></article>
    <article class="quiz-question" data-question><span class="question-count">Question 7 / 10 · Gas</span><h3>Que mesure le gas ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="Le gas n’est pas une unité de temps et ne prédit pas combien de secondes prendra une confirmation.">Le temps exact avant la confirmation</button><button type="button" data-correct="true" data-explanation="Exact. Le gas mesure les ressources nécessaires à l’exécution des opérations.">Les ressources nécessaires à l’exécution</button><button type="button" data-correct="false" data-explanation="Les frais ne correspondent pas à un pourcentage fixe du montant transféré.">Un pourcentage du montant d’ETH envoyé</button></div><p class="quiz-feedback" role="status"></p></article>
    <article class="quiz-question" data-question><span class="question-count">Question 8 / 10 · Calcul</span><h3>Une opération utilise 50 000 gas à 22 gwei par gas. Quel est le coût ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="50 000 × 22 = 1 100 000 gwei, pas 110 000 gwei.">0,00011 ETH</button><button type="button" data-correct="true" data-explanation="Exact. 50 000 × 22 = 1 100 000 gwei, soit 0,0011 ETH.">0,0011 ETH</button><button type="button" data-correct="false" data-explanation="Le résultat correspond à 11 000 000 gwei, soit dix fois le coût calculé.">0,011 ETH</button></div><p class="quiz-feedback" role="status"></p></article>
    <article class="quiz-question" data-question><span class="question-count">Question 9 / 10 · Échec</span><h3>Une exécution de contrat échoue et annule ses changements d’état. Que se passe-t-il pour le gas déjà consommé ?</h3><div class="quiz-options"><button type="button" data-correct="true" data-explanation="Exact. L’état est restauré pour cette exécution, mais le calcul déjà réalisé doit tout de même être payé.">Il reste dû : le gas consommé est facturé</button><button type="button" data-correct="false" data-explanation="Une réversion n’efface pas le coût des ressources déjà utilisées.">Il est toujours intégralement remboursé</button><button type="button" data-correct="false" data-explanation="Le coût dépend du travail consommé, pas du montant transféré par la fonction.">Il est automatiquement payé par le destinataire</button></div><p class="quiz-feedback" role="status"></p></article>
    <article class="quiz-question" data-question><span class="question-count">Question 10 / 10 · Limites</span><h3>Pourquoi un contrat a-t-il parfois besoin d’un oracle ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="La blockchain ne connaît pas spontanément toutes les informations extérieures au réseau.">Pour rendre son code automatiquement invulnérable</button><button type="button" data-correct="false" data-explanation="Un oracle ne remplace pas le mécanisme de consensus et ne valide pas tous les blocs.">Pour remplacer les validateurs</button><button type="button" data-correct="true" data-explanation="Exact. L’oracle transmet une information externe ; sa fiabilité reste une dépendance à évaluer.">Pour recevoir une information issue du monde extérieur</button></div><p class="quiz-feedback" role="status"></p></article>
    <div class="quiz-summary" id="quiz-summary" aria-live="polite">0 / 10 réponses validées</div><button class="quiz-reset" id="quiz-reset" type="button">Recommencer le quiz</button>
  </div>
</section>

<section class="lesson-section" id="e6-sources">
  <span class="lesson-kicker">12 · Références traçables</span><h2>Sources et lectures complémentaires.</h2>
  <p>Les ressources officielles ci-dessous expliquent le modèle de comptes, l’EVM, les transactions, les frais, le déploiement et les limites de sécurité. Les détails de mise en œuvre peuvent évoluer avec les mises à jour du protocole.</p>
  <div class="source-list">
    <a href="https://ethereum.org/fr/developers/docs/smart-contracts/" target="_blank" rel="noopener noreferrer"><span>Documentation officielle · ethereum.org</span><b>Introduction aux contrats intelligents</b><small>Définition, déploiement, langages et limites des contrats intelligents.</small><em>Lire la documentation ↗</em></a>
    <a href="https://ethereum.org/fr/developers/docs/accounts/" target="_blank" rel="noopener noreferrer"><span>Documentation officielle · ethereum.org</span><b>Comptes Ethereum</b><small>Différences entre comptes contrôlés par une clé et comptes de contrats.</small><em>Lire la documentation ↗</em></a>
    <a href="https://ethereum.org/fr/developers/docs/evm/" target="_blank" rel="noopener noreferrer"><span>Documentation officielle · ethereum.org</span><b>Machine virtuelle Ethereum</b><small>Exécution du bytecode, état partagé et fonction de transition d’état.</small><em>Lire la documentation ↗</em></a>
    <a href="https://ethereum.org/fr/developers/docs/transactions/" target="_blank" rel="noopener noreferrer"><span>Documentation officielle · ethereum.org</span><b>Transactions Ethereum</b><small>Structure des transactions, appels de contrats, lectures et exécutions.</small><em>Lire la documentation ↗</em></a>
    <a href="https://ethereum.org/fr/developers/docs/gas/" target="_blank" rel="noopener noreferrer"><span>Documentation officielle · ethereum.org</span><b>Gas et frais</b><small>Gas utilisé, frais de base, frais de priorité et calcul des frais.</small><em>Lire la documentation ↗</em></a>
    <a href="https://ethereum.org/fr/developers/docs/smart-contracts/deploying/" target="_blank" rel="noopener noreferrer"><span>Documentation officielle · ethereum.org</span><b>Déployer un contrat intelligent</b><small>Compilation, bytecode, transaction de déploiement et coût en gas.</small><em>Lire la documentation ↗</em></a>
    <a href="https://ethereum.org/fr/developers/docs/smart-contracts/security/" target="_blank" rel="noopener noreferrer"><span>Documentation officielle · ethereum.org</span><b>Sécurité des contrats intelligents</b><small>Tests, audits, erreurs, contrôle des mises à niveau et bonnes pratiques.</small><em>Lire la documentation ↗</em></a>
    <a href="https://ethereum.org/fr/developers/docs/consensus-mechanisms/pos/" target="_blank" rel="noopener noreferrer"><span>Documentation officielle · ethereum.org</span><b>Preuve d’enjeu (Proof of Stake)</b><small>Rôle des validateurs, attestations, récompenses, pénalités et finalité.</small><em>Lire la documentation ↗</em></a>
  </div>
  <p class="editorial-note"><b>Note éditoriale :</b> les exemples sont fictifs et les schémas simplifient volontairement le fonctionnement d’Ethereum. Les paramètres de frais et les règles du protocole peuvent évoluer. Ce chapitre a un objectif éducatif ; il ne constitue ni un conseil en investissement ni une recommandation d’utiliser un contrat ou une application.</p>
</section>
`
  }
});
