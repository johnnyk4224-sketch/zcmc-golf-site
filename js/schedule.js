async function loadSchedule() {
  const api = window.ZCMC_CONFIG && window.ZCMC_CONFIG.GOOGLE_SHEETS_WEBHOOK;
  if (!api) return;

  try {
    const res = await fetch(api + "?mode=schedule");
    const data = await res.json();

    const groups = {
      Monday: document.getElementById("schedule-monday-body"),
      Tuesday: document.getElementById("schedule-tuesday-body"),
      Wednesday: document.getElementById("schedule-wednesday-body")
    };

    Object.values(groups).forEach(tbody => {
      if (tbody) tbody.innerHTML = "";
    });

    (data.rows || []).forEach(row => {
      const tbody = groups[row.night];
      if (!tbody) return;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.date || ""}</td>
        <td>${row.team_a || ""}</td>
        <td>${row.team_b || ""}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Schedule load failed:", err);
  }
}

loadSchedule();
