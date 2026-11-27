(() => {
  const money = new Intl.NumberFormat('fr-FR', {minimumFractionDigits:2, maximumFractionDigits:2});
  const quantity = new Intl.NumberFormat('fr-FR', {minimumFractionDigits:0, maximumFractionDigits:8});
  const price = new Intl.NumberFormat('fr-FR', {minimumFractionDigits:2, maximumFractionDigits:8});
  const pct = new Intl.NumberFormat('fr-FR', {minimumFractionDigits:2, maximumFractionDigits:2});
  const asNumber = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  };
  const formatMoney = (value) => {
    const n = asNumber(value);
    return n === null ? '—' : money.format(n) + ' $';
  };
  const formatUsdc = (microUnits) => {
    try { return formatMoney(Number(BigInt(microUnits)) / 1e6); }
    catch { return '—'; }
  };
  const formatQty = (value, max=8) => {
    const n = asNumber(value);
    return n === null ? '—' : new Intl.NumberFormat('fr-FR',{maximumFractionDigits:max}).format(n);
  };
  const formatPrice = (value) => {
    const n = asNumber(value);
    if(n===null)return '—';
    return price.format(n) + ' $';
  };
  const formatPct = (value) => {
    const n = asNumber(value);
    return n===null?'—':(n>0?'+':'')+pct.format(n)+' %';
  };
  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('fr-FR',{dateStyle:'short',timeStyle:'short'}).format(date);
  };
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  window.AtlasFormat = {formatMoney,formatUsdc,formatQty,formatPrice,formatPct,formatDate,escapeHtml};
})();