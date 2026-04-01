chrome.action.onClicked.addListener(async tab => {
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        files: ["content.js"]
    })

    chrome.scripting.insertCSS({
        target: {
            tabId: tab.id
        },
        files: ["content.css"]
    })
});

chrome.runtime.onMessage.addListener((message, sender, sendMessage) => {
    if ("capture") {
        chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
            chrome.downloads.download({
                url: dataUrl,
                filename: `screenshoot-${Date.now()}.png`
            });
        });
    }
});