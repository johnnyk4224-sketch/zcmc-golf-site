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
return {
  night: nightName,
  date: obj["Date"] || "",
  tee_time: obj["TeeTime"] || "",
  team_a: obj["TeamA"] || "",
  team_b: obj["TeamB"] || "",
  points_a: obj["PointsA"] || "",
  points_b: obj["PointsB"] || ""
};
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Schedule load failed:", err);
  }
}

loadSchedule();
