# Atelier Atlas — cahier des charges initial

> Statut : cadrage produit v1 — branche `feature/atelier-mvp`
> Objectif : faire passer Atlas Crypto de la compréhension théorique à l'expérimentation encadrée.

## 1. Vision

L'Atelier est le prolongement pratique de l'encyclopédie. Il permet de manipuler des mécanismes de marché dans un environnement fictif, d'observer les conséquences de ses décisions et d'en tirer des enseignements.

Signature éditoriale :
**L'Atelier — De la compréhension à la pratique.**
*Simulez. Analysez. Comprenez. Progressez.*

L'Atelier est éducatif. Il ne fournit ni recommandations d'achat ou de vente, ni promesses de performance. Aucune opération réelle n'est exécutée.

## 2. Constat technique et décision d'architecture

Le site actuel est une application statique centrée sur `index.html`, avec navigation des chapitres gérée par les ancres et `app.js`. Le Laboratoire Bitcoin est déjà isolé dans `laboratoire-bitcoin.html`. Le dépôt n'a pas de backend ni de fournisseur de cours de marché intégré à ce stade.

Décision : créer un espace indépendant sous `atelier/`, accessible depuis la navigation principale, plutôt que d'ajouter la logique de l'Atelier au routeur des chapitres. Cette séparation protège les cours existants et permet de faire évoluer les outils sans alourdir `app.js`.

Direction visuelle retenue pour l'Atelier :
- surfaces graphite et anthracite, avec des contrastes proches des terminaux de marché ;
- bleu pour les accents d'interface, la navigation active et les éléments informatifs ;
- vert pour les achats, les hausses et les performances positives ;
- rouge pour les ventes, les baisses et les performances négatives ;
- gris froid pour les textes secondaires, bordures et données neutres ;
- ne pas utiliser l'or champagne comme couleur dominante dans l'Atelier. La typographie et le caractère sombre d'Atlas restent reconnaissables, mais la sémantique des couleurs suit les conventions classiques du trading.

Structure cible proposée :
- `atelier/index.html` : tableau de bord et navigation de l'Atelier.
- `atelier/atelier.css` : styles dédiés, reprenant les couleurs, typographies et finitions d'Atlas.
- `atelier/js/app.js` : orchestration de l'interface.
- `atelier/js/portfolio-engine.js` : règles financières et calculs déterministes.
- `atelier/js/portfolio-store.js` : sauvegarde, restauration et versionnement des données.
- `atelier/js/market-data.js` : adaptateur isolant le fournisseur de prix du reste de l'application.
- `atelier/js/format.js` : formatage des nombres, monnaies et dates.

Le choix final du fournisseur de données de marché doit être fait après vérification de ses conditions, limites, endpoints historiques et règles CORS. Ne pas disperser les appels API dans les composants d'interface.

## 3. Architecture produit

L'Atelier comporte quatre modules, affichés dès la première version pour rendre la destination lisible :

1. **Portefeuille virtuel** — premier module développé et ouvert.
2. **Journal de trading** — module annoncé comme « en préparation ».
3. **Replay de marché** — module annoncé comme « en préparation ».
4. **Défis interactifs** — module annoncé comme « en préparation ».

La page d'accueil de l'Atelier présente sa promesse, les quatre modules, l'état de disponibilité et un accès direct au portefeuille. Le portefeuille doit rester accessible en un clic ; il ne faut pas obliger l'utilisateur à parcourir une longue page de présentation.

## 4. MVP — Portefeuille virtuel Spot

### 4.1 Onboarding
- Expliquer clairement qu'il s'agit d'un environnement fictif, sans connexion à un wallet ni exécution réelle.
- Capital initial par défaut : **10 000 USDC**, modifiable avant la création du portefeuille.
- Afficher les règles de simulation avant la première opération : actif de cotation, commission simulée, source et fraîcheur des cours.
- Créer un seul portefeuille par navigateur dans le MVP ; prévoir une structure de données permettant plusieurs portefeuilles plus tard.
- Proposer une réinitialisation explicite, avec confirmation et avertissement sur la perte de l'historique.

### 4.2 Périmètre de marché
- Marché Spot uniquement.
- Positions longues uniquement : achats, conservation et ventes d'actifs détenus.
- Pas de levier, marge, short, staking, rendement, transfert on-chain ni connexion de portefeuille.
- Catalogue initial limité à une liste d'actifs liquides et pris en charge par le fournisseur retenu.
- Les ordres au marché simulés sont le premier type d'ordre. Les ordres limites et l'exécution par carnet seront étudiés dans une version ultérieure.

### 4.3 Écrans et composants
**Vue d'ensemble**
- Valeur totale du portefeuille et capital disponible.
- P&L total, P&L réalisé et P&L latent.
- Courbe de valorisation avec période sélectionnable, dès que les données historiques nécessaires sont disponibles.
- Répartition par actif et liquidités disponibles ; les pondérations doivent inclure l'USDC, être calculées sur une valorisation complète et totaliser exactement 100,00 % après arrondi au centième. Si un cours manque, ne pas afficher une répartition présentée comme complète.
- Positions principales et dernière activité.
- Indication visible de la date/heure de la dernière mise à jour des cours.

**Acheter / vendre**
- Sélection de l'actif.
- Saisie par montant en USDC ou quantité d'actif.
- Côté achat/vente.
- Aperçu avant validation : cours de référence, quantité estimée, montant brut, commission simulée, total débité ou crédité.
- Vérification des soldes, montants positifs, précision, minimum d'ordre et disponibilité des données.
- Confirmation explicite ; aucune transaction ne doit être enregistrée si les contrôles échouent.

**Positions**
- Actif, quantité détenue, valeur actuelle, prix moyen d'acquisition, P&L latent et poids dans le portefeuille.
- Détail d'une position et historique des opérations qui la composent.

**Historique**
- Date/heure, achat/vente, actif, quantité, prix de référence, montant brut, frais et montant net.
- Filtre par actif et type d'opération.
- Export CSV des transactions et export/import JSON de sauvegarde complète.

**Paramètres**
- Commission simulée modifiable.
- Devise de référence et préférences d'affichage lorsque prises en charge.
- Source de prix, dernière actualisation et état du service.
- Export, import et réinitialisation.

### 4.4 Règles comptables et de calcul
- Les montants sont calculés en précision décimale contrôlée ; éviter les erreurs d'arrondi liées aux opérations binaires naïves en virgule flottante.
- Chaque transaction est immuable dans l'historique ; une correction ultérieure doit être tracée, pas silencieuse.
- Les achats augmentent la quantité détenue et réduisent le solde cash du montant brut + frais.
- Les ventes sont limitées à la quantité disponible ; elles réduisent les unités détenues et augmentent le cash du produit net de frais.
- Le prix de revient de la position utilise une méthode documentée et constante. Pour le MVP : coût moyen pondéré, frais d'achat inclus dans le coût d'acquisition.
- P&L réalisé d'une vente = produit net de vente − coût moyen correspondant à la quantité vendue.
- P&L latent = valeur de marché des unités encore détenues − leur coût d'acquisition restant.
- Valeur du portefeuille = solde cash + valeur de marché de chaque position.
- Toute valeur dépendante d'un cours manquant ou périmé doit être signalée ; ne jamais afficher un zéro trompeur ni prétendre que le portefeuille est actualisé.

### 4.5 Frais, spread et slippage
- Les frais de simulation sont paramétrables et présentés comme une hypothèse pédagogique, pas comme le tarif d'une plateforme particulière.
- La source de prix peut fournir un prix indicatif et non un prix exécutable. L'interface doit distinguer clairement cours de référence, prix simulé d'exécution et frais.
- Ne pas prétendre reproduire un carnet d'ordres ou un slippage réel si les données de profondeur ne sont pas disponibles.
- Dans le premier MVP, mieux vaut afficher explicitement un modèle d'exécution simplifié que simuler une précision inexistante. Une modélisation du spread, de la profondeur et du slippage sera ajoutée quand elle sera soutenue par les données.

### 4.6 Performance et track record
- Distinguer performance du portefeuille, P&L réalisé, P&L latent et frais cumulés.
- Le track record est reconstruit à partir du journal immuable des transactions : les mouvements de cash et de quantités sont rejoués chronologiquement, puis valorisés à chaque clôture journalière UTC.
- Les clôtures journalières Binance Spot sont utilisées comme prix de référence historique ; la journée UTC en cours n'est pas affichée tant que sa clôture n'est pas terminée.
- La première version conserve au maximum 1 000 clôtures journalières, avec un cache local versionné. Le graphique propose 7 jours, 30 jours, 90 jours et toute la période disponible.
- Le rendement affiché est calculé entre le premier et le dernier point de la période sélectionnée. Le drawdown maximal est calculé sur cette même période affichée. Lorsque les benchmarks BTC et ETH disposent d'au moins deux clôtures communes complètes avec le portefeuille, le rendement et le drawdown comparatifs utilisent exactement ces mêmes clôtures UTC ; le libellé précise cette fenêtre commune. Si les données comparables sont insuffisantes, la performance Atlas reste lisible séparément.
- Les jours où un prix nécessaire est manquant ne doivent pas être présentés comme des valorisations complètes ; les erreurs ou historiques partiels restent visibles à l'utilisateur. Les courbes ne relient pas artificiellement les clôtures séparées par des journées manquantes et aucune valeur n'est interpolée.
- Les points de suivi sont indépendants de la présence du visiteur sur le site : les clôtures historiques permettent de reconstruire les journées passées à partir des transactions enregistrées.
- Les benchmarks BTC et ETH utilisent une hypothèse d'achat-conservation fictif du capital initial au premier cours de clôture journalière UTC complet commun disponible après la création du portefeuille. Les rendements sont comparés sur les mêmes dates de valorisation que le portefeuille ; les cours manquants ne sont pas interpolés.
- L'export CSV du track record couvre toute la période historique disponible, avec les valeurs du portefeuille, les deux benchmarks et le drawdown du portefeuille.

## 5. Données, stockage et confidentialité

MVP sans compte :
- Stockage local dans le navigateur ; aucune donnée de portefeuille envoyée à un serveur Atlas.
- Clé de stockage versionnée, par exemple `atlas-atelier-portfolio-v1`.
- Validation des données lors du chargement et de l'import.
- Validation du ledger avant chargement, sauvegarde ou import : soldes reconstruits depuis les transactions, ordre stocké du plus récent au plus ancien, identifiants uniques, champs numériques en chaînes décimales contrôlées et symboles limités au catalogue Spot effectivement pris en charge.
- Les dates de transaction proviennent de l'horloge locale de l'appareil ; elles ne constituent pas un horodatage serveur certifié. Une date future doit donc être interprétée avec prudence plutôt que corrigée ou rejetée silencieusement.
- Sauvegarde JSON complète pour permettre un transfert manuel vers un autre navigateur/appareil.
- Export CSV lisible pour analyser les transactions.
- Message clair : données liées à ce navigateur et à cet appareil ; supprimer les données du navigateur peut supprimer le portefeuille.
- Prévoir une migration de schéma versionnée dès le départ.

Une connexion et une synchronisation multi-appareils ne sont pas dans le MVP ; elles nécessiteraient une authentification, une base de données et une politique de confidentialité dédiée.

## 6. Données de marché — critères de sélection

Avant l'intégration, comparer les fournisseurs selon :
- couverture des actifs et marchés en USDC/USD ;
- cours spot et horodatage ;
- historique OHLC ou prix historiques ;
- fréquence de mise à jour et quotas gratuits ;
- authentification/API key nécessaire ou non ;
- CORS depuis un navigateur statique ;
- disponibilité, limites et conditions d'utilisation ;
- attribution de la source et droit d'usage des données.

L'adaptateur `market-data.js` doit exposer une interface stable et gérer les erreurs, les limites de fréquence, le cache, les valeurs manquantes et les données périmées. Aucun secret d'API privé ne doit être placé dans le JavaScript public.

## 7. Qualité, pédagogie et sécurité produit

- Responsive desktop/tablette/mobile, avec priorité à la lisibilité des tableaux sur petits écrans.
- Accessibilité clavier, états de focus, labels explicites et retours d'erreur compréhensibles.
- États de chargement, absence de données, erreur API et données périmées.
- Confirmation avant toute vente ou réinitialisation.
- Pas de boutons décoratifs ni d'interactions inactives.
- Chaque indicateur technique doit avoir une définition courte accessible depuis l'interface.
- Aucune récompense ou classement basé uniquement sur le rendement brut ; la suite valorisera aussi la qualité du processus et la maîtrise du risque.

## 8. Phases de réalisation

**Phase 0 — Fondations**
- Page d'accueil de l'Atelier et navigation.
- Système de stockage versionné et schéma de portefeuille.
- Choix et vérification du fournisseur de données.

**Phase 1 — Portefeuille fonctionnel**
- Onboarding, soldes, positions et opérations Spot simulées.
- Historique, calcul de coût moyen, P&L et frais.
- Sauvegarde locale, export/import, contrôles et messages d'état.

**Phase 2 — Performance**
- [x] Reconstruction d'une série journalière à partir des transactions et des clôtures Binance Spot.
- [x] Graphique avec plages 7J / 30J / 90J / Tout et drawdown maximal sur la plage affichée.
- [x] Cache local des chandeliers, récupération incrémentale et état explicite en cas d'historique incomplet.
- [x] Benchmark documenté BTC/ETH, basé sur un achat-conservation fictif au premier cours de clôture UTC commun disponible.
- [x] Export CSV du track record complet (portefeuille, BTC, ETH et drawdown).

**Phase 3 — Journal de trading**
- Enregistrement manuel des trades, contexte, plan, risque initial, captures et analyse statistique.

**Phase 4 — Replay de marché**
- Lecture de données historiques bougie par bougie, décisions simulées et analyse après révélation.

**Phase 5 — Défis**
- Scénarios pédagogiques construits sur les moteurs précédents.

## 9. Critères d'acceptation avant mise en ligne

- Le site principal et les chapitres existants fonctionnent sans régression.
- Un nouvel utilisateur peut créer son portefeuille et comprendre immédiatement qu'il est fictif.
- Les achats et ventes respectent strictement les soldes et les quantités disponibles.
- Les calculs de solde, quantité, coût moyen, frais et P&L passent des tests déterministes couvrant les arrondis et les cas limites.
- Une actualisation de prix indisponible ne détruit ni ne fausse les données enregistrées.
- Les rechargements restaurent le portefeuille ; export/import reproduit fidèlement son état.
- Les données périmées ou manquantes sont visibles.
- Les commandes principales sont utilisables au clavier et sur mobile.
- Les tests sont effectués avant tout déploiement de production.

---

## Décisions retenues pour démarrer

- Nom : **L'Atelier**.
- Accroche : **De la compréhension à la pratique.**
- Premier module : **Portefeuille virtuel Spot**.
- Capital fictif par défaut : **10 000 USDC**, personnalisable.
- Stockage initial : local au navigateur, avec export/import.
- Aucun compte, wallet ou argent réel dans le MVP.
- Développement isolé sur `feature/atelier-mvp`.
