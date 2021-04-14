function listenForClicks() {
  const toggle = document.querySelector('#debugmode-toggle');
  toggle.addEventListener('change', toggleMode);
}

function toggleMode(event) {
  if (event.target.checked === true) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(insert)
        .catch(reportError);
  }
  else {
    browser.tabs.query({active: true, currentWindow: true})
      .then(remove)
      .catch(reportError);
  }
}

function insert(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      command: "insert",
    });
}

function remove(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    command: "remove",
  });
}

function reportError(error) {
  console.error(`Could not debugmode: ${error}`);
}

function reportExecuteScriptError() {
  console.error('Something went wrong');
}


/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/debugmode.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

