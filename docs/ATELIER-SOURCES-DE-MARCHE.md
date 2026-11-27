# Atelier Atlas — évaluation des sources de marché

> Évaluation préliminaire effectuée le 28 novembre 2026. Les quotas, tarifs, accès et conditions peuvent évoluer ; revalidation nécessaire avant publication.

## 1. CoinGecko — agrégateur multi-places

**Intérêt**
- Les données sont agrégées à partir de nombreuses plateformes, ce qui correspond mieux à une valorisation de portefeuille généraliste qu'un seul carnet d'ordres.
- L'API propose des cours courants et des séries historiques. La documentation et les pages d'assistance récentes décrivent une API publique, avec attribution de la source.
- La granularité historique dépend du plan ; l'offre gratuite est limitée et ne doit pas être utilisée comme si elle fournissait des données intraday illimitées.

**Points à vérifier**
- La page d'assistance du 23 novembre 2026 indique une limite de 30 requêtes/minute pour l'API publique sans clé ; les offres Demo disposent de quotas et de limites distincts. Ces chiffres doivent être confirmés au moment de l'intégration.
- Le plan Demo est présenté comme un plan d'essai ; les droits commerciaux sont associés aux plans payants. La portée d'utilisation exacte pour un site public gratuit et non monétisé doit être confirmée dans les conditions du plan retenu.
- Tester les endpoints sans clé, la réponse CORS depuis le domaine Vercel et la disponibilité réelle des prix historiques pour tous les actifs retenus.
- Afficher une attribution « Données de marché : CoinGecko » conformément aux consignes de marque.

**Sources**
- https://www.coingecko.com/en/api_terms
- https://www.coingecko.com/en/api/pricing
- https://support.coingecko.com/articles/4315804955-can-i-use-Coingecko-data-and-screenshots-for-my-website-book-etc
- https://support.coingecko.com/articles/9471335603-user-guide-how-to-sign-up-for-Coingecko-demo-api-and-generate-an-api-key

## 2. CoinPaprika — agrégateur multi-places

**Intérêt**
- Offre gratuite sans clé et avec 20 000 appels par mois annoncés.
- Les prix historiques quotidiens sont disponibles sur une fenêtre d'un an dans l'offre gratuite.
- Des endpoints de ticker et de bougies OHLCV sont documentés.

**Limite décisive**
- L'offre gratuite est présentée comme réservée à l'usage personnel. La page de tarification indique que l'usage commercial commence avec une offre payante ; la redistribution à des utilisateurs externes peut relever d'un accord distinct. Ce n'est donc pas le choix à retenir par défaut pour un site public.

**Sources**
- https://coinpaprika.com/api
- https://coinpaprika.com/api/pricing
- https://coinpaprika.com/api/historical-data

## 3. Binance Spot — données d'une seule plateforme

**Intérêt**
- Le domaine Market Data Only `https://data-api.binance.vision` expose des endpoints publics sans authentification, notamment les prix, le meilleur bid/ask, la profondeur de carnet, les informations de marché et les chandeliers.
- La profondeur et le meilleur bid/ask pourraient permettre, dans une version ultérieure, d'expliquer le spread et de simuler une exécution qui consomme plusieurs niveaux du carnet.
- Les chandeliers historiques pourraient alimenter certains graphiques et replays.

**Limites**
- Les prix sont ceux de Binance Spot, pas une moyenne du marché multi-exchanges.
- Les limites sont calculées par IP ; un dépassement déclenche des réponses 429 et des violations répétées peuvent entraîner un bannissement temporaire 418. Il faut mettre en cache, regrouper les requêtes et respecter `Retry-After`.
- Les paires disponibles et leur liquidité doivent être vérifiées avant d'ajouter un actif au catalogue.
- L'accès technique public ne suffit pas à lui seul à conclure sur tous les droits de réutilisation ou d'affichage. Les conditions applicables doivent être revérifiées.

**Sources**
- https://github.com/binance/binance-spot-api-docs/blob/master/faqs/market_data_only.md
- https://developers.binance.com/en/docs/products/spot/rest-api

## 4. Orientation recommandée

Ne pas coupler le portefeuille à une seule source dans son code métier.

**Pour la première version :**
1. Garder `market-data.js` comme adaptateur indépendant.
2. Évaluer CoinGecko comme source principale de valorisation et d'historique, sous réserve de confirmer l'usage autorisé pour Atlas Crypto, ses quotas et CORS.
3. Garder Binance comme source complémentaire possible pour un mode de simulation basé sur une place unique et, plus tard, la profondeur du carnet.
4. Ne pas choisir l'offre gratuite de CoinPaprika pour un site public sans confirmation écrite de droits adaptés.
5. En cas de quotas trop limités ou de droits insuffisants, mieux vaut afficher un mode démonstration clairement identifié ou financer un plan adapté que masquer les limites ou présenter des cours fictifs comme des données réelles.

## 5. Test technique obligatoire avant choix définitif

- Depuis une page servie par le domaine Vercel, demander les prix de plusieurs actifs en un seul appel lorsque c'est possible.
- Vérifier les en-têtes CORS et les codes d'erreur.
- Mesurer la fraîcheur via l'horodatage fourni par la source.
- Tester un actif non pris en charge, un symbole sans paire, une réponse vide, une réponse 429 et une panne réseau.
- Tester une série historique pour reconstruire une valeur quotidienne de portefeuille.
- Valider l'attribution et les conditions d'utilisation applicables à la diffusion publique.

## 6. Test réel et choix pour le MVP (28 novembre 2026)

Un test technique a été effectué depuis un environnement Vercel avec un en-tête `Origin: https://atlas-crypto-three.vercel.app` :

- Endpoint testé : `https://data-api.binance.vision/api/v3/ticker/24hr?symbols=...`
- Réponse HTTP : **200 OK**.
- En-tête de réponse observé : `Access-Control-Allow-Origin: *`.
- La requête groupée a retourné les 8 paires USDC sélectionnées : `BTCUSDC`, `ETHUSDC`, `SOLUSDC`, `XRPUSDC`, `BNBUSDC`, `DOGEUSDC`, `ADAUSDC`, `LINKUSDC`.

**Choix retenu pour le MVP : Binance Spot Market Data Only.** Le premier portefeuille affiche donc une liste réduite de cours Spot provenant explicitement de Binance, avec un rafraîchissement périodique. Le prix est un dernier prix échangé à titre indicatif, pas une garantie de prix d'exécution. Le MVP ne simule ni profondeur réelle, ni spread, ni slippage.

Cette validation confirme le fonctionnement de l'endpoint et l'en-tête CORS au moment du test ; elle ne garantit ni une disponibilité permanente, ni une limite de requêtes illimitée. Le code doit continuer à gérer les erreurs et les données périmées.

CoinGecko reste une piste future pour une valorisation agrégée multi-plateformes, à envisager avec un proxy serveur et un plan dont les conditions autorisent clairement l'usage par Atlas Crypto.

## 7. Validation des données historiques pour le track record (28 novembre 2026)

La première implémentation du track record utilise `GET /api/v3/klines` avec `interval=1d`, via `https://data-api.binance.vision`. La documentation Binance classe cette URL parmi les endpoints publics de Market Data Only, qui ne nécessitent pas de clé API, et liste explicitement l'endpoint Klines. Les bougies sont identifiées par leur heure d'ouverture ; la réponse fournit notamment l'heure de clôture et le prix de clôture. Sources :
- https://github.com/binance/binance-spot-api-docs/blob/master/faqs/market_data_only.md
- https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#klinecandlestick-data

**Test réel depuis l'environnement Vercel**
- Requête avec un en-tête `Origin: https://atlas-crypto-three.vercel.app`.
- Les 8 paires du MVP ont répondu HTTP 200 : BTCUSDC, ETHUSDC, SOLUSDC, XRPUSDC, BNBUSDC, DOGEUSDC, ADAUSDC et LINKUSDC.
- En-tête `Access-Control-Allow-Origin: *` observé sur les 8 réponses.
- Chaque réponse testée a renvoyé des chandeliers journaliers, dont les clôtures achevées peuvent être filtrées à partir de leur `closeTime`.

**Méthode de valorisation**
- Le moteur rejoue chaque transaction dans l'ordre chronologique. Un achat réduit le cash du débit net ; une vente l'augmente du crédit net ; les quantités détenues sont ajustées.
- À chaque clôture journalière UTC, il valorise les quantités encore détenues avec les prix de clôture correspondants.
- Si le prix d'un actif détenu manque à une date, le point du portefeuille n'est pas affiché comme complet.
- La journée UTC en cours n'est pas traitée comme une clôture définitive.
- Le navigateur conserve localement un cache des chandeliers, limité aux 1 000 dernières clôtures journalières par actif. Les données historiques sont mises à jour de manière incrémentale ; un échec d'actualisation doit rester signalé même lorsqu'un cache antérieur existe.

**Limites connues**
- Les cours et bougies proviennent d'une seule plateforme, Binance Spot ; ils ne représentent pas une moyenne multi-exchanges.
- Le prix de clôture journalier est une valorisation indicative, pas un prix d'exécution.
- Le benchmark BTC/ETH, les exports du track record et les données intraday ne sont pas encore intégrés.
- Les chandeliers quotidiens ne fournissent pas une courbe intraday ni une reconstitution du slippage réel.
