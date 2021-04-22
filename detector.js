/*
window.addEventListener('message', e => {
  if (e.source === window && e.data.vueDetected) {
    chrome.runtime.sendMessage(e.data)
  }
})

function detect (win) {
  setTimeout(() => {
    // Method 1: Check Nuxt.js
    const detected = document.querySelector('#debugmode');

    if (detected) {
      win.postMessage({
        enabled: true
      }, '*')

      return
    }
  }, 100)
}

// inject the hook
if (document instanceof HTMLDocument) {
  installScript(detect)
}

function installScript (fn) {
  const source = ';(' + fn.toString() + ')(window)'

  const script = document.createElement('script')
  script.textContent = source
  document.documentElement.appendChild(script)
  script.parentNode.removeChild(script)
}
*/
