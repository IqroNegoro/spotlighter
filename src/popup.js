(async () => {
  const opacitySlider = document.getElementById("opacity-slider");
  const paddingSlider = document.getElementById("padding-slider");
  const opacityText = document.getElementById("opacity-text");
  const paddingText = document.getElementById("padding-text");

  const button = document.getElementById("button");
  
  let { padding, opacity, blurMode } = await chrome.storage.local.get({ padding: 16, opacity: 80, blurMode: false });
  const [ tab ] = await chrome.tabs.query({ active: true, currentWindow: true });

  const modeToggle = document.getElementById("mode-toggle");
  modeToggle.checked = blurMode;

  modeToggle.addEventListener("change", () => {
    chrome.storage.local.set({ blurMode: modeToggle.checked });
  });

  chrome.tabs.sendMessage(tab.id, { type: "status" }, response => {
    button.innerText = response ? "Cancel Spotlight" : "Start Spotlight";
  });

  opacitySlider.value = opacity;
  opacityText.innerText = `${opacity}%`;
  paddingSlider.value = padding;
  paddingText.innerText = `${padding}px`;

  opacitySlider.addEventListener("input", e => {
    opacityText.innerText = `${opacitySlider.value}%`;
    chrome.storage.local.set({opacity: opacitySlider.value});
  });
  
  paddingSlider.addEventListener("input", e => {
    paddingText.innerText = `${paddingSlider.value}px`;
    chrome.storage.local.set({padding: paddingSlider.value});
  });

  button.addEventListener("click", async () => {
    chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["content.css"]
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    }).then(() => {
      chrome.tabs.sendMessage(tab.id, { type: "status" }, response => {
        button.innerText = response ? "Cancel Spotlight" : "Start Spotlight";
      });
    });
  });
})();