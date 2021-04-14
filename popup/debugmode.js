function init() {
  var toggle = document.querySelector('#debugmode-toggle');
  const active = browser.storage.local.get('debugmode');

  active.then(response => {
    if (response.debugmode) {
      toggle.checked = true;
    }
  });

  toggle.addEventListener('change', toggleMode);
}

function toggleMode(event) {

  if (event.target.checked === true) {
      browser.storage.local.set({
        'debugmode': true
      });

      browser.tabs.query({active: true, currentWindow: true})
        .then(insert)
        .catch(reportError);

    browser.browserAction.setIcon({ path: "../icons/debugmode-icon-active.png"});
  }
  else {
    browser.storage.local.set({
      'debugmode': false
    });

    browser.tabs.query({active: true, currentWindow: true})
      .then(remove)
      .catch(reportError);

    browser.browserAction.setIcon({ path: "../icons/debugmode-icon.png"});
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
.then(init)
.catch(reportExecuteScriptError);

