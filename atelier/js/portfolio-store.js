(() => {
  'use strict';
  const KEY='atlas-atelier-portfolio-v1';
  function load() {
    try {
      const raw=localStorage.getItem(KEY);
      if(!raw)return null;
      const data=JSON.parse(raw);
      if(!window.AtlasPortfolioEngine.safePortfolio(data))return null;
      return data;
    } catch(error) {
      console.warn('Atelier : portefeuille local illisible.',error);
      return null;
    }
  }
  function save(portfolio) {
    if(!window.AtlasPortfolioEngine.safePortfolio(portfolio))throw new Error('Les données du portefeuille ne sont pas valides.');
    try { localStorage.setItem(KEY,JSON.stringify(portfolio)); }
    catch(error) { throw new Error('Le navigateur ne peut pas enregistrer le portefeuille. Vérifiez l’espace disponible ou exportez vos données.'); }
  }
  function clear() { localStorage.removeItem(KEY); }
  function parseBackup(text) {
    const parsed=JSON.parse(text);
    if(!window.AtlasPortfolioEngine.safePortfolio(parsed))throw new Error('Ce fichier ne contient pas une sauvegarde de portefeuille Atlas valide.');
    return parsed;
  }
  window.AtlasPortfolioStore={load,save,clear,parseBackup,storageKey:KEY};
})();