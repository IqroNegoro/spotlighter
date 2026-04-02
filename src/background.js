chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ padding: 16, opacity: 80 });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "capture") {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            const domain = new URL(tab.url).hostname.replace(/\./g, "-");
            chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
                chrome.downloads.download({
                    url: dataUrl,
                    filename: `spotlighter-${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19).replace("T", "_")}-${domain}.png`
                }, () => sendResponse());
            });
        });
        return true;
    }
});