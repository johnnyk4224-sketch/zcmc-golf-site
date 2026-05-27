async function loadResults() {
  const api = window.ZCMC_CONFIG && window.ZCMC_CONFIG.GOOGLE_SHEETS_WEBHOOK;
  if (!api) return;

  try {
    const res = await fetch(api + "?mode=schedule");
    const data = await res.json();

    const mondayBody = document.getElementById("results-monday-body");
    const TuesdayBody = document.getElementById("results-tuesday-body");
    const wednesdayBody = document.getElementById("results-wednesday-body");

    if (mondayBody) mondayBody.innerHTML = "";
    if (TuesdayBody) TuesdayBody.innerHTML = "";
    if (wednesdayBody) wednesdayBody.innerHTML = "";

    (data.rows || []).forEach(row => {
      const hasAnyResult =
        row.low_net_1st ||
        row.low_net_2nd ||
        row.proxy_1 ||
        row.proxy_2;

      if (!hasAnyResult) return;

      const tr = document.createElement("tr");

      if (row.night === "Monday" && mondayBody) {
        tr.innerHTML = `
          <td>${row.date || ""}</td>
          <td>${row.low_net_1st || ""}</td>
          <td>${row.low_net_2nd || ""}</td>
          <td>${row.proxy_1 || ""}</td>
          <td>${row.proxy_2 || ""}</td>
        `;
        mondayBody.appendChild(tr);
      }

      if (row.night === "Tuesday" && TuesdayBody) {
        tr.innerHTML = `
          <td>${row.date || ""}</td>
          <td>${row.low_net_1st || ""}</td>
          <td>${row.low_net_2nd || ""}</td>
          <td>${row.proxy_1 || ""}</td>
          <td>${row.proxy_2 || ""}</td>
        `;
        TuesdayBody.appendChild(tr);
      }

      if (row.night === "Wednesday" && wednesdayBody) {
        tr.innerHTML = `
          <td>${row.date || ""}</td>
          <td>${row.low_net_1st || ""}</td>
          <td>${row.proxy_1 || ""}</td>
        `;
        wednesdayBody.appendChild(tr);
      }
    });
  } catch (err) {
    console.error("Results load failed:", err);
  }
}

loadResults();
