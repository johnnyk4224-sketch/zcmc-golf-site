(() => {
  const banner = document.getElementById("rainoutBanner");
  const text = document.getElementById("rainoutText");
  const api = window.ZCMC_CONFIG && window.ZCMC_CONFIG.GOOGLE_SHEETS_WEBHOOK;

  if (!banner || !text || !api) return;

  fetch(api + "?mode=content&page=Banner")
    .then(r => r.json())
    .then(data => {
      if (data.content && data.content.trim() !== "") {
        banner.hidden = false;
        text.textContent = data.content;
      }
    })
    .catch(err => {
      console.error("Banner load failed:", err);
    });
})();
