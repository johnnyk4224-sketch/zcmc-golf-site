const API = window.ZCMC_CONFIG.GOOGLE_SHEETS_WEBHOOK;

async function loadPage(){
  const page = document.getElementById("pageSelect").value;
  const res = await fetch(API + "?mode=content&page=" + encodeURIComponent(page));
  const data = await res.json();
  document.getElementById("editor").value = data.content || "";
}

async function savePage(){
  const page = document.getElementById("pageSelect").value;
  const content = document.getElementById("editor").value;
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ mode: "content", page, content })
  });
  alert("Saved");
}

async function saveResult(){
  const payload = {
    mode: "result",
    date: document.getElementById("resultDate").value,
    night: document.getElementById("resultNight").value,
    team_a: document.getElementById("teamA").value,
    team_b: document.getElementById("teamB").value,
    points_a: document.getElementById("pointsA").value,
    points_b: document.getElementById("pointsB").value
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });

  alert("Match result saved and standings rebuilt.");
}
