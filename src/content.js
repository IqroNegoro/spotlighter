(async () => {
    if (!window.spotlighterInitialized) {
        

        const handleMouseMove = e => {
            if (!document.documentElement.hasAttribute("spotligther-active")) return;
    
            const position = e.target.getBoundingClientRect();

            const padding = 8;

            const top = position.top - padding;
            const right = position.right + padding;
            const bottom = position.bottom + padding;
            const left = position.left - padding;

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
            
            chrome.runtime.sendMessage("capture", (respon) => {
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
        const div = document.createElement("div");
        div.classList.add("spotlighter-dimmer")
        document.body.insertAdjacentElement("afterbegin", div);
    }
})();