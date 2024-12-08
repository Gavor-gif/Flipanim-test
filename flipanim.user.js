// ==UserScript==
// @name         Flipanim Dark Mode with Auto Update Check
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Adds dark mode toggle to Flipanim and checks for updates from GitHub
// @author       GavorGif
// @match        https://flipanim.com/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

// Version check configuration
const currentVersion = '1.1.0';  // Update this with the new version
const repoURL = 'https://github.com/Gavor-gif/Flipanim-test/raw/main/flipanim.user.js';  // Link to raw userscript

// GitHub API to check for the latest version of the userscript
function checkForUpdates() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://api.github.com/repos/Gavor-gif/Flipanim-test/releases/latest',
        onload: function(response) {
            const latestVersion = JSON.parse(response.responseText).tag_name;
            if (latestVersion !== currentVersion) {
                if (confirm(`A new version (${latestVersion}) is available. Do you want to update?`)) {
                    window.location.href = repoURL;  // Redirect to the latest userscript version
                }
            }
        }
    });
}

// Apply dark mode styles to the page
function applyDarkMode() {
    GM_addStyle(`
        body {
            background-color: #181818;
            color: #e0e0e0;
        }
        .flipanim-header, .footer {
            background-color: #202020;
        }
        .flipanim-main {
            background-color: #222222;
        }
        a {
            color: #1e90ff;
        }
        .button {
            background-color: #333333;
            border: 1px solid #444444;
        }
    `);
}

// Apply light mode styles to the page
function applyLightMode() {
    GM_addStyle(`
        body {
            background-color: #ffffff;
            color: #000000;
        }
        .flipanim-header, .footer {
            background-color: #f4f4f4;
        }
        .flipanim-main {
            background-color: #ffffff;
        }
        a {
            color: #007bff;
        }
        .button {
            background-color: #e0e0e0;
            border: 1px solid #cccccc;
        }
    `);
}

// Toggle dark mode and light mode
function toggleDarkMode() {
    const currentMode = localStorage.getItem('theme') || 'light';
    if (currentMode === 'light') {
        localStorage.setItem('theme', 'dark');
        applyDarkMode();
    } else {
        localStorage.setItem('theme', 'light');
        applyLightMode();
    }
}

// On page load, apply the saved theme
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyDarkMode();
    } else {
        applyLightMode();
    }

    // Check for updates from GitHub
    checkForUpdates();

    // Add a toggle button for dark/light mode
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Dark Mode';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.padding = '10px';
    toggleButton.style.backgroundColor = '#444444';
    toggleButton.style.color = '#ffffff';
    toggleButton.style.border = 'none';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.zIndex = '9999';
    toggleButton.addEventListener('click', toggleDarkMode);

    document.body.appendChild(toggleButton);
})();
