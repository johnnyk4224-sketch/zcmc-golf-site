
const API=window.ZCMC_CONFIG.GOOGLE_SHEETS_WEBHOOK

async function loadPage(){
const page=document.getElementById("pageSelect").value
const r=await fetch(API+"?mode=content&page="+page)
const d=await r.json()
document.getElementById("editor").value=d.content||""
}

async function savePage(){
const page=document.getElementById("pageSelect").value
const content=document.getElementById("editor").value
await fetch(API,{method:"POST",body:JSON.stringify({mode:"content",page,content})})
alert("Saved")
}

async function saveResult(){
await fetch(API,{method:"POST",body:JSON.stringify({
mode:"result",
date:document.getElementById("resultDate").value,
night:document.getElementById("resultNight").value,
team_a:document.getElementById("teamA").value,
team_b:document.getElementById("teamB").value,
points_a:document.getElementById("pointsA").value,
points_b:document.getElementById("pointsB").value
})})
alert("Result saved")
}
