// ==UserScript==
// @name         Flipanim Auto Update
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Checks for updates and installs the latest version of flipanim.user.js
// @author       You, but like, cooler
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const scriptURL = "https://raw.githubusercontent.com/Gavor-gif/Flipanim-test/main/flipanim.user.js"; // GitHub raw URL
    const currentVersion = "2.0";

    function checkForUpdates() {
        GM_xmlhttpRequest({
            method: "GET",
            url: scriptURL,
            onload: function(response) {
                const latestScript = response.responseText;
                const versionMatch = latestScript.match(/@version\s+([\d.]+)/);

                if (versionMatch) {
                    const latestVersion = versionMatch[1];

                    if (latestVersion !== currentVersion) {
                        console.log(`Update available! Latest version: ${latestVersion}`);
                        alert(`New version ${latestVersion} available!`);

                        // Window prompt asking if user wants to install the update
                        const userResponse = prompt(`New version ${latestVersion} is available. Do you want to install it? (yes/no)`).toLowerCase();

                        if (userResponse === "yes" || userResponse === "y") {
                            updateScript(latestScript);
                        } else {
                            console.log("User declined the update.");
                        }
                    }
                }
            }
        });
    }

    function updateScript(scriptContent) {
        const blob = new Blob([scriptContent], { type: 'application/javascript' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'flipanim.user.js';
        link.click();
    }

    // Check for updates every 1 minute (60000 milliseconds)
    const lastChecked = GM_getValue('lastChecked', 0);
    const now = Date.now();

    if (now - lastChecked > 60000) {
        checkForUpdates();
        GM_setValue('lastChecked', now);
    }

})();
