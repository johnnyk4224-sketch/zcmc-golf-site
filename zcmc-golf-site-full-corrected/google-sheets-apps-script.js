function doGet(e) {
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID");
  const mode = e.parameter.mode || "content";

  if (mode === "content") {
    const page = e.parameter.page;
    const tab = sheet.getSheetByName(page);
    if (!tab) return jsonOut({ content: "" });
    const lastRow = Math.max(tab.getLastRow(), 1);
    let data = "";
    if (lastRow >= 2) data = tab.getRange(2, 1, lastRow - 1, 1).getValues().flat().join("\n");
    return jsonOut({ content: data });
  }

  if (mode === "standings") {
    const night = e.parameter.night;
    const tab = sheet.getSheetByName("Standings_" + night);
    if (!tab) return jsonOut({ rows: [] });
    const values = tab.getDataRange().getValues();
    values.shift();
    const rows = values.map(r => ({
      team: r[0] || "",
      wins: r[1] || 0,
      losses: r[2] || 0,
      points: r[3] || 0
    })).filter(r => r.team);
    return jsonOut({ rows });
  }

  return jsonOut({ error: "invalid mode" });
}

function doPost(e) {
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID");
  const data = JSON.parse(e.postData.contents || "{}");

  if (data.mode === "content") {
    const tab = sheet.getSheetByName(data.page) || sheet.insertSheet(data.page);
    tab.clear();
    tab.appendRow(["content"]);
    tab.appendRow([data.content || ""]);
    return jsonOut({ ok: true });
  }

  if (data.mode === "result") {
    const results = sheet.getSheetByName("Results") || sheet.insertSheet("Results");
    if (results.getLastRow() === 0) {
      results.appendRow(["date", "night", "team_a", "team_b", "points_a", "points_b"]);
    }

    results.appendRow([
      data.date || "",
      data.night || "",
      data.team_a || "",
      data.team_b || "",
      Number(data.points_a || 0),
      Number(data.points_b || 0)
    ]);

    rebuildStandings_(sheet, data.night);
    return jsonOut({ ok: true });
  }

  return jsonOut({ error: "invalid mode" });
}

function rebuildStandings_(sheet, night) {
  const results = sheet.getSheetByName("Results");
  if (!results) return;

  const tabName = "Standings_" + night;
  const standings = sheet.getSheetByName(tabName) || sheet.insertSheet(tabName);

  const values = results.getDataRange().getValues();
  const rows = values.slice(1).filter(r => String(r[1]) === String(night));

  const teams = {};
  rows.forEach(r => {
    const teamA = r[2];
    const teamB = r[3];
    const ptsA = Number(r[4] || 0);
    const ptsB = Number(r[5] || 0);

    if (!teams[teamA]) teams[teamA] = { wins: 0, losses: 0, points: 0 };
    if (!teams[teamB]) teams[teamB] = { wins: 0, losses: 0, points: 0 };

    teams[teamA].points += ptsA;
    teams[teamB].points += ptsB;

    if (ptsA > ptsB) {
      teams[teamA].wins += 1;
      teams[teamB].losses += 1;
    } else if (ptsB > ptsA) {
      teams[teamB].wins += 1;
      teams[teamA].losses += 1;
    }
  });

  const output = Object.keys(teams)
    .filter(Boolean)
    .map(team => [team, teams[team].wins, teams[team].losses, teams[team].points])
    .sort((a, b) => b[3] - a[3]);

  standings.clear();
  standings.appendRow(["team", "wins", "losses", "points"]);
  if (output.length) standings.getRange(2, 1, output.length, 4).setValues(output);
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
