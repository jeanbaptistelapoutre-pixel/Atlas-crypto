(() => {
  'use strict';
  const KEY='atlas-atelier-portfolio-v1';
  let lastLoadIssue=null;
  function load() {
    lastLoadIssue=null;
    try {
      const raw=localStorage.getItem(KEY);
      if(raw===null)return null;
      const data=JSON.parse(raw);
      if(!window.AtlasPortfolioEngine.safePortfolio(data)) {
        lastLoadIssue='Un portefeuille est bien présent dans ce navigateur, mais ses données ne passent pas les contrôles de cohérence. Elles n’ont pas été supprimées. Importez une sauvegarde valide avant de repartir de zéro.';
        return null;
      }
      return data;
    } catch(error) {
      lastLoadIssue='Les données du portefeuille n’ont pas pu être lues depuis ce navigateur. Elles n’ont pas été supprimées. Essayez d’importer une sauvegarde avant de les remplacer.';
      console.warn('Atelier : portefeuille local illisible.',error);
      return null;
    }
  }
  function getLoadIssue() { return lastLoadIssue; }
  function save(portfolio) {
    if(!window.AtlasPortfolioEngine.safePortfolio(portfolio))throw new Error('Les données du portefeuille ne sont pas valides.');
    try {
      localStorage.setItem(KEY,JSON.stringify(portfolio));
      lastLoadIssue=null;
    } catch(error) {
      throw new Error('Le navigateur ne peut pas enregistrer le portefeuille. Vérifiez l’espace disponible ou exportez vos données.');
    }
  }
  function clear() {
    localStorage.removeItem(KEY);
    lastLoadIssue=null;
  }
  function parseBackup(text) {
    if(typeof text!=='string'||text.length>5_000_000)throw new Error('Le fichier de sauvegarde est trop volumineux ou invalide.');
    let parsed;
    try { parsed=JSON.parse(text); }
    catch { throw new Error('Le fichier sélectionné ne contient pas un JSON valide.'); }
    if(!window.AtlasPortfolioEngine.safePortfolio(parsed))throw new Error('Ce fichier ne contient pas une sauvegarde de portefeuille Atlas valide.');
    return parsed;
  }
  window.AtlasPortfolioStore={load,save,clear,parseBackup,getLoadIssue,storageKey:KEY};
})();