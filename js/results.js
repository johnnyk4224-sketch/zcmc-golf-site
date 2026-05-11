async function loadLowNetWinners() {
  const api = window.ZCMC_CONFIG && window.ZCMC_CONFIG.GOOGLE_SHEETS_WEBHOOK;
  if (!api) return;

  const res = await fetch(api + "?mode=schedule");
  const data = await res.json();

  const groups = {
    Monday: document.getElementById("low-net-monday-body"),
    Tuesday: document.getElementById("low-net-tuesday-body"),
    Wednesday: document.getElementById("low-net-wednesday-body")
  };

  Object.values(groups).forEach(tbody => {
    if (tbody) tbody.innerHTML = "";
  });

  (data.rows || []).forEach(row => {
    if (!row.low_net_1st && !row.low_net_2nd && !row.low_net_3rd) return;

    const tbody = groups[row.night];
    if (!tbody) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.date || ""}</td>
      <td>${row.low_net_1st || ""}</td>
      <td>${row.low_net_2nd || ""}</td>
      <td>${row.low_net_3rd || ""}</td>
    `;
    tbody.appendChild(tr);
  });
}

loadLowNetWinners();
