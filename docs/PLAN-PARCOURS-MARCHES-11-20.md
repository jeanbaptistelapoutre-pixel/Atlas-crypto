# Atlas Crypto — feuille de route éditoriale des chapitres 11 à 20

## Intention pédagogique

Ce parcours commence après les chapitres 1 et 2. Les chapitres 3 à 10 restent un approfondissement utile, mais ne sont pas un prérequis. Les cours 11 à 20 doivent donc définir les notions nécessaires au moment où elles apparaissent, sans supposer que le lecteur connaît déjà les plateformes de trading, les produits dérivés ou le vocabulaire des traders.

**Règle éditoriale centrale : montrer le mécanisme avant de nommer l’indicateur.** Une personne qui découvre un graphique doit d’abord savoir ce que représentent les axes, l’unité, la période, la source et les données. Chaque visuel doit répondre à une question pédagogique précise.

## Architecture du parcours

| Chapitre | Sujet | Question directrice | Visuels et expériences à produire |
|---|---|---|---|
| 11 | Offre, demande et formation des prix | Qui propose quoi, et comment une transaction fixe-t-elle un prix ? | Modèle offre/demande, carnet bid/ask, spread, simulation de profondeur et de prix moyen |
| 12 | Lire les chandeliers et les volumes | Que raconte réellement une bougie, et que ne raconte-t-elle pas ? | Anatomie OHLC annotée, série de chandeliers fictifs, volume par période, échelle linéaire/logarithmique |
| 13 | Carnet d’ordres et microstructure | Que se passe-t-il entre une intention, un ordre et une transaction ? | DOM, file d’attente, tape, footprint, Delta/CVD, OI, funding et cartes de liquidations |
| 14 | Analyse fondamentale des cryptoactifs | Qu’est-ce qui peut donner une utilité à un réseau et un rôle économique à son token ? | Carte d’un token, calendrier d’émission/déblocage, tableau de métriques, concentration des détenteurs |
| 15 | Cycles, macroéconomie et corrélations | Comment l’environnement économique peut-il influencer les actifs risqués ? | Chaîne taux → conditions financières → appétit pour le risque, corrélations qui changent, scénarios macro |
| 16 | Construire une méthode de trading | Comment transformer une idée en règles explicites et testables ? | Arbre de décision, fiche de scénario, exemples d’entrée/invalidation/sortie, journal de trading |
| 17 | Gestion du risque et taille de position | Quelle quantité engager pour que le risque prévu reste compréhensible ? | Calculateur pédagogique de taille, distance d’invalidation, frais et slippage, scénarios de pertes en série |
| 18 | Levier, marge et liquidation | Comment une exposition importante peut-elle dépasser le capital immobilisé ? | Comparaison exposition/marge, amplification PnL, marge de maintenance, cascade de liquidation |
| 19 | Tester une stratégie sans se tromper | Comment savoir si un résultat historique est crédible ou artificiel ? | Découpage conception/validation/test, courbes surajustées vs robustes, biais et coûts d’exécution |
| 20 | Psychologie et biais de décision | Pourquoi un plan raisonnable est-il parfois abandonné au mauvais moment ? | Boucle émotionnelle, biais illustrés, checklist avant/après trade, règles « si… alors… » |

## Standard de qualité obligatoire

1. **Accessible sans expérience de trading.** Définir les termes lors de leur première apparition. Ne pas multiplier les acronymes sur une même page sans les expliquer.
2. **Du concret vers l’abstrait.** Démarrer par un exemple quotidien ou une situation fictive simple, puis introduire le modèle, les données et les limites.
3. **Graphiques lisibles et vérifiables.** Chaque graphique possède un titre informatif, des axes/unité/période, une légende, une description accessible et une explication écrite de ce qu’il montre.
4. **Pas de fausse précision.** Les données inventées sont étiquetées comme fictives. Les captures conceptuelles ne sont pas présentées comme des données réelles. Les métriques dont les méthodes varient selon les plateformes sont accompagnées de cette réserve.
5. **Pas de prophétie graphique.** Une bougie, un indicateur, un footprint ou une heatmap n’est pas une preuve de la direction future du prix.
6. **Séparer les marchés.** Ne pas confondre spot, futures à échéance et contrats perpétuels. Expliquer quand une métrique est spécifique aux dérivés.
7. **Expliquer les limites et les incitations.** Ordres annulables, liquidité fragmentée, frais, slippage, financement, règles d’exécution, qualité des données et conflits d’intérêts doivent être explicités au bon endroit.
8. **Apprentissage actif.** Chaque chapitre comporte au moins une expérience interactive ou un exercice guidé et un quiz avec réponses expliquées.
9. **Responsive et accessible.** Les graphiques doivent rester lisibles sur mobile, les contrôles être utilisables au clavier et les couleurs ne pas être le seul moyen de transmettre une information.
10. **Sources traçables.** Privilégier les organismes de régulation, les banques centrales, les spécifications de marché, les documentations techniques primaires et les recherches académiques. Dater les chiffres susceptibles d’évoluer.

## Chapitre 11 — référence initiale

Le chapitre 11 introduit le prix de transaction, le modèle offre/demande, le carnet bid/ask, le spread, la profondeur, la liquidité et le slippage. Son simulateur utilise des carnets fictifs pour isoler l’effet de la profondeur sur le prix moyen d’exécution. Il ne modélise pas les frais, la latence, les annulations ou l’évolution du marché.

Les sources de référence intégrées dans ce chapitre :
- SEC / Investor.gov — types d’ordres et distinction entre garantie d’exécution et garantie de prix.
- CME Group — carnet électronique, spread et mesures de liquidité.
- Kraken — vocabulaire des carnets, bid/ask, profondeur et liquidité crypto.
- ESMA — analyse de la structure et de la concentration des marchés de cryptoactifs (rapport publié le 10 avril 2024).

## Garde-fou éditorial

Atlas Crypto est une ressource éducative indépendante. Le parcours décrit des mécanismes et des outils ; il ne donne pas de signaux, ne recommande pas de positions et ne promet aucun résultat. Les exemples de stratégie servent uniquement à expliquer comment formaliser et tester une hypothèse.
