(() => {

const banner = document.getElementById("rainoutBanner")
const text = document.getElementById("rainoutText")

if(!banner) return

fetch(window.ZCMC_CONFIG.GOOGLE_SHEETS_WEBHOOK + "?mode=content&page=Banner")
.then(r=>r.json())
.then(data=>{

if(data.content && data.content.trim() !== ""){

banner.hidden = false
text.textContent = data.content

}

})

})()
