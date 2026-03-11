async function loadStandings(night, tbodyId) {
  const api = window.ZCMC_CONFIG && window.ZCMC_CONFIG.GOOGLE_SHEETS_WEBHOOK;
  const tbody = document.getElementById(tbodyId);
  if (!api || !tbody) return;

  const res = await fetch(api + "?mode=standings&night=" + encodeURIComponent(night));
  const data = await res.json();
  tbody.innerHTML = "";

  (data.rows || []).forEach((row, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${row.team}</td>
      <td>${row.wins}</td>
      <td>${row.losses}</td>
      <td>${row.points}</td>
    `;
    tbody.appendChild(tr);
  });
}

loadStandings("Monday", "monday-standings-body");
loadStandings("Tuesday", "tuesday-standings-body");
loadStandings("Wednesday", "wednesday-standings-body");
