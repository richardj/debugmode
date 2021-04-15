(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }

  window.hasRun = true;

  /*
   * Insert debugging styles
   */

  function insertDebugmode() {
    removeDebugmode();

    const styles = `
      *, *:before, *:after {
        outline: 1px dotted red !important;
      }
    `;

    const stylesheet  = document.createElement("style");
    stylesheet.id = "debugmode";
    stylesheet.type = "text/css";
    stylesheet.innerText = styles;
    document.head.appendChild(stylesheet);
  }


  /**
   * Remove from the page.
   */

  function removeDebugmode() {
    const elements = document.querySelectorAll('#debugmode');

    elements.forEach(item => {
      item.remove();
    });
  }

  /**
   * Listen for messages from the background script.
  */

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "insert") {
      insertDebugmode();
    } else if (message.command === "remove") {
      removeDebugmode();
    }
  });

})();

