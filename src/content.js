chrome.storage.onChanged.addListener(changes => {
    if ("padding" in changes) {
        window.spotlighterPadding = Number(changes.padding.newValue);
        const position = window.spotlighterTargetPosition;
        const top = position.top - window.spotlighterPadding;
        const right = position.right + window.spotlighterPadding;
        const bottom = position.bottom + window.spotlighterPadding;
        const left = position.left - window.spotlighterPadding;

        document.querySelector(".spotlighter-dimmer").style.clipPath = `polygon(
            0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, 
            ${left}px 0%, 
            ${left}px ${top}px, 
            ${right}px ${top}px, 
            ${right}px ${bottom}px, 
            ${left}px ${bottom}px, 
            ${left}px ${top}px, 
            ${left}px 0%
        )`;
    };
    if ("opacity" in changes) document.querySelector(".spotlighter-dimmer").style.opacity = changes.opacity.newValue / 100;
    return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "status") {
        sendResponse(document.documentElement.hasAttribute("spotligther-active"));
    }
    return true;
});

(async () => {
    const { padding: initialPadding, opacity } = await chrome.storage.local.get({ padding: 16, opacity: 80 })
    window.spotlighterPadding = Number(initialPadding);
    const div = document.createElement("div");
    div.classList.add("spotlighter-dimmer")
    div.style.opacity = opacity / 100;

    if (!window.spotlighterInitialized) {
        const handleMouseMove = e => {
            if (!document.documentElement.hasAttribute("spotligther-active")) return;

            const position = e.target.getBoundingClientRect();
            window.spotlighterTargetPosition = position;

            const top = position.top - window.spotlighterPadding;
            const right = position.right + window.spotlighterPadding;
            const bottom = position.bottom + window.spotlighterPadding;
            const left = position.left - window.spotlighterPadding;

            document.querySelector(".spotlighter-dimmer").style.clipPath = `polygon(
                0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, 
                ${left}px 0%, 
                ${left}px ${top}px, 
                ${right}px ${top}px, 
                ${right}px ${bottom}px, 
                ${left}px ${bottom}px, 
                ${left}px ${top}px, 
                ${left}px 0%
            )`;
        }

        const handleOnclick = e => {
            if (!document.documentElement.hasAttribute("spotligther-active")) return;
            e.preventDefault();
            e.stopPropagation(); 
            e.stopImmediatePropagation();
            
            chrome.runtime.sendMessage("capture", () => {
                document.documentElement.removeAttribute("spotligther-active");
                document.querySelector(".spotlighter-dimmer")?.remove();
            });
        }

        document.body.addEventListener("click", handleOnclick, true);
        document.addEventListener("mousemove", handleMouseMove, true);
        window.spotlighterInitialized = true;
    }

    if (document.documentElement.hasAttribute("spotligther-active")) {
        document.documentElement.removeAttribute("spotligther-active")
        document.querySelector(".spotlighter-dimmer")?.remove();
    } else {
        document.documentElement.setAttribute("spotligther-active", "");
        document.body.insertAdjacentElement("afterbegin", div);
    }
})();