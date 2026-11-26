# Atlas Crypto — Encyclopédie pédagogique en évolution

Site statique gratuit consacré à la monnaie, Bitcoin, la blockchain, la finance décentralisée, les marchés, le trading et la sécurité.

## Architecture
- 25 sujets répartis en 5 grandes parties, avec recherche et filtres.
- `data.js` contient les titres et synthèses des 25 fiches.
- `lessons.js` contient les cours approfondis développés progressivement. Le chapitre 1 est la première fiche complète de référence.
- `laboratoire-bitcoin.html` propose des démonstrations interactives autour des transactions UTXO, des empreintes, des arbres de Merkle et de la preuve de travail.
- `style.css` assure la présentation responsive et les composants pédagogiques.

## Niveau de contenu
Le chapitre 1 comprend des explications progressives, des exemples concrets, des schémas, un simulateur de pouvoir d'achat, un glossaire, un cas pratique, un quiz corrigé et des sources institutionnelles.
Les chapitres 2 à 25 restent des synthèses introductives à enrichir. Le site ne doit pas être présenté comme une encyclopédie exhaustive tant que ces développements n'ont pas été effectués et vérifiés.

## Test local
Ouvrir `index.html` dans un navigateur. Le laboratoire peut nécessiter HTTPS ou localhost pour certaines fonctions cryptographiques. Les simulations simplifient volontairement certains paramètres et ne remplacent pas un nœud Bitcoin réel.

## Publication
Le dépôt GitHub est relié à Vercel. Les modifications poussées sur la branche `main` déclenchent un nouveau déploiement. Aucune donnée de marché en temps réel n'est intégrée à cette édition.
