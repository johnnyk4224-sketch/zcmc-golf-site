async function loadContent(page, targetId) {
  const api = window.ZCMC_CONFIG && window.ZCMC_CONFIG.GOOGLE_SHEETS_WEBHOOK;
  const target = document.getElementById(targetId);
  if (!api || !target) return;
  try {
    const res = await fetch(api + "?mode=content&page=" + encodeURIComponent(page));
    const data = await res.json();
    target.innerHTML = data.content || "";
  } catch (err) {
    console.error(err);
  }
}
