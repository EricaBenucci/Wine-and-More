document.addEventListener("DOMContentLoaded", function () { 
    const c = "cookieConsent", d = "cookieConsentData";
    if (localStorage.getItem(c)) return;

    const l = document.documentElement.lang === "it" ? "it" : "en";
    const t = {
        it: {
            title: "Rispettiamo la tua privacy",
            description: "Utilizziamo i cookie per migliorare la tua esperienza di navigazione, fornire contenuti personalizzati e analizzare il nostro traffico. Cliccando su \"Accetta tutto\" acconsenti all'uso dei cookie.",
            customise: "Personalizza", reject: "Rifiuta tutti", accept: "Accetta tutto",
            manage: "Gestisci preferenze cookie", customiseTitle: "Personalizza le preferenze",
            customiseIntro: "Utilizziamo i cookie per aiutarti a navigare in modo efficiente e a svolgere determinate funzioni. Troverai informazioni dettagliate su ogni categoria di consenso qui sotto.",
            labels: {
                functional: "Per funzioni extra come social e feedback.",
                analytics: "Per analizzare il traffico.",
                ads: "Per annunci personalizzati."
            },
            savePreferences: "Salva preferenze"
        },
        en: {
            title: "We value your privacy",
            description: "We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
            customise: "Customise", reject: "Reject All", accept: "Accept All",
            manage: "Manage cookie preferences", customiseTitle: "Customise Consent Preferences",
            customiseIntro: "We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about each consent category below.",
            labels: {
                functional: "For features like social sharing and feedback.",
                analytics: "To analyze traffic.",
                ads: "For personalized ads."
            },
            savePreferences: "Save My Preferences"
        }
    }[l];

    const b = document.createElement("div");
    b.id = "cookie-banner";
    b.className = "cookie-popup";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-labelledby", "cookie-banner-title");
    b.setAttribute("aria-describedby", "cookie-banner-desc");

    b.innerHTML = `<div class="cookie-popup-inner">
        <h3 id="cookie-banner-title">${t.title}</h3>
        <p id="cookie-banner-desc">${t.description}</p>
        <div class="cookie-buttons">
            <button id="cookie-customize">${t.customise}</button>
            <button id="cookie-reject">${t.reject}</button>
            <button id="cookie-accept">${t.accept}</button>
        </div>
    </div>`;
    document.body.appendChild(b);

    const o = document.createElement("div");
    o.id = "cookie-overlay";
    o.className = "customize-popup";
    o.style.display = "none";
    o.innerHTML = `<div class="cookie-popup-inner">
        <h3>${t.customiseTitle}</h3>
        <p>${t.customiseIntro}</p>
        <div class="cookie-toggles">
            <div><strong>Necessary</strong> – <em>${l === "it" ? "Sempre attivi" : "Always active"}</em></div>
            <div class="cookie-preference-item">
                <label><strong>Functional</strong> – ${t.labels.functional}</label>
                <label class="switch"><input type="checkbox" id="toggle-functional"><span class="slider"></span></label>
            </div>
            <div class="cookie-preference-item">
                <label><strong>Analytics</strong> – ${t.labels.analytics}</label>
                <label class="switch"><input type="checkbox" id="toggle-analytics"><span class="slider"></span></label>
            </div>
            <div class="cookie-preference-item">
                <label><strong>Advertisement</strong> – ${t.labels.ads}</label>
                <label class="switch"><input type="checkbox" id="toggle-ads"><span class="slider"></span></label>
            </div>
        </div>
        <div class="cookie-buttons">
            <button id="cookie-reject2">${t.reject}</button>
            <button id="cookie-save">${t.savePreferences}</button>
            <button id="cookie-accept2">${t.accept}</button>
        </div>
    </div>`;
    document.body.appendChild(o);

    const cu = document.getElementById("cookie-customize"),
        ac = [document.getElementById("cookie-accept"), document.getElementById("cookie-accept2")],
        rj = [document.getElementById("cookie-reject"), document.getElementById("cookie-reject2")],
        sv = document.getElementById("cookie-save"),
        f = document.getElementById("toggle-functional"),
        an = document.getElementById("toggle-analytics"),
        ad = document.getElementById("toggle-ads");

    cu.onclick = () => {
        o.style.display = "flex";
        const sc = localStorage.getItem(d);
        if (sc) {
            const pr = JSON.parse(sc);
            f.checked = pr.functional || false;
            an.checked = pr.analytics || false;
            ad.checked = pr.ads || false;
        }
    };

    ac.forEach(btn => {
        btn.onclick = () => {
            localStorage.setItem(c, "all");
            localStorage.setItem(d, JSON.stringify({ functional: true, analytics: true, ads: true }));
            b.style.display = "none";
            o.style.display = "none";
        };
    });

    rj.forEach(btn => {
        btn.onclick = () => {
            localStorage.setItem(c, "necessary");
            localStorage.setItem(d, JSON.stringify({ functional: false, analytics: false, ads: false }));
            b.style.display = "none";
            o.style.display = "none";
        };
    });

    sv.onclick = () => {
        const co = { functional: f.checked, analytics: an.checked, ads: ad.checked };
        localStorage.setItem(c, "preferencesSet");
        localStorage.setItem(d, JSON.stringify(co));
        b.style.display = "none";
        o.style.display = "none";
    };
});

// ✅ Funzione accessibile globalmente per il link nel footer
function openCookiePreferences() {
    const o = document.getElementById("cookie-overlay");
    const f = document.getElementById("toggle-functional");
    const an = document.getElementById("toggle-analytics");
    const ad = document.getElementById("toggle-ads");

    if (!o || !f || !an || !ad) {
        console.error("Impossibile aprire la finestra preferenze cookie: elementi non trovati.");
        return;
    }

    o.style.display = "flex";

    const saved = localStorage.getItem("cookieConsentData");
    if (saved) {
        const pr = JSON.parse(saved);
        f.checked = pr.functional || false;
        an.checked = pr.analytics || false;
        ad.checked = pr.ads || false;
    } else {
        f.checked = false;
        an.checked = false;
        ad.checked = false;
    }
}
