# Spotlighter

> A Chrome extension that lets you spotlight any element on a webpage and auto-screenshot it — dimming everything else for a clean, focused capture.
<img width="1366" height="679" alt="screenshoot-1775051511313" src="https://github.com/user-attachments/assets/c680c7f9-cc6d-4419-90ca-89e2f0d1282d" />

---

## What it does

Click the extension icon to activate spotlight mode. Hover over any element on the page — it gets highlighted while the rest of the page dims. Click the element to instantly capture and download a screenshot with the spotlight effect applied.

Perfect for:
- Creating clean UI documentation
- Highlighting specific components in demos
- Capturing focused screenshots without manual cropping

---

## Features

- Real-time element highlighting as you hover
- Adjustable dim opacity (0–100%) via the popup slider
- Adjustable spotlight padding (0–160px) — controls how much space surrounds the highlighted element
- Screenshots are saved as PNG with a readable filename: `spotlighter-YYYY-MM-DD_HH-MM-SS-domain-com.png`
- Toggle spotlight on/off without losing your settings

---

## Installation

Since this extension isn't on the Chrome Web Store yet, you can load it manually:

1. Download or clone this repository
   ```bash
   git clone https://github.com/IqroNegoro/spotlighter.git
   ```

2. Open Chrome and navigate to `chrome://extensions`

3. Enable "Developer mode" (toggle in the top right)

4. Click "Load unpacked" and select the project folder `src`

5. The Spotlighter icon will appear in your toolbar

---

## Usage

1. Navigate to any webpage
2. Click the **Spotlighter** icon in the Chrome toolbar
3. Click **Start Spotlight** in the popup
4. Move your cursor over elements — they'll be spotlighted as you hover
5. Adjust opacity and padding sliders in real-time to your liking
6. Click any element to capture and download the screenshot
7. Click **Cancel Spotlight** or click the button again to deactivate

---

## Tags

`chrome-extension` `screenshot-tool` `spotlight` `developer-tool` `productivity` `manifest-v3` `browser-extension` `ui-documentation`

---

## MIT License