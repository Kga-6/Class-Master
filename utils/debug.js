const debug = document.getElementById("debug")

function debugLog(msg){
  console.log(msg)
  debug.textContent = msg
}