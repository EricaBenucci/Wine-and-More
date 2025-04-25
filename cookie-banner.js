document.addEventListener("DOMContentLoaded", function () {
    const c = "cookieConsent", d = "cookieConsentData";
    const lang = document.documentElement.lang === "it" ? "it" : "en";

    const t = {
        it: {
            title: "Questo sito usa i cookie 🍪",
            desc: "Utilizziamo cookie per migliorare la tua esperienza. Puoi accettare tutti i cookie o personalizzare le tue preferenze.",
            necessary: "Necessari",
            functional: "Funzionali",
            analytics: "Analitici",
            ads: "Marketing",
            accept: "Accetta tutto",
            reject: "Rifiuta",
            customize: "Personalizza",
            save: "Salva preferenze"
        },
        en: {
            title: "This site uses cookies 🍪",
            desc: "We use cookies to enhance your experience. You can accept all cookies or customize your preferences.",
            necessary: "Necessary",
            functional: "Functional",
            analytics: "Analytics",
            ads: "Marketing",
            accept: "Accept all",
            reject: "Reject",
            customize: "Customize",
            save: "Save preferences"
        }
    }[lang];

    // CREA SEMPRE IL PANNELLO PERSONALIZZAZIONE
    const o = document.createElement("div");
    o.id = "cookie-overlay";
    o.className = "customize-popup";
    o.style.display = "none";
    o.innerHTML = `
        <div class="cookie-popup-inner">
            <h2>${t.title}</h2>
            <p>${t.desc}</p>
            <div class="cookie-options">
                <label><input type="checkbox" disabled checked> ${t.necessary}</label>
                <label><input type="checkbox" id="toggle-functional"> ${t.functional}</label>
                <label><input type="checkbox" id="toggle-analytics"> ${t.analytics}</label>
                <label><input type="checkbox" id="toggle-ads"> ${t.ads}</label>
            </div>
            <div class="cookie-buttons">
                <button id="cookie-save">${t.save}</button>
                <button id="cookie-reject2">${t.reject}</button>
                <button id="cookie-accept2">${t.accept}</button>
            </div>
        </div>
    `;
    document.body.appendChild(o);

    // CREA IL BANNER SOLO SE NON ESISTE CONSENSO
    if (!localStorage.getItem(c)) {
        const b = document.createElement("div");
        b.id = "cookie-banner";
        b.className = "cookie-popup";
        b.setAttribute("role", "dialog");
        b.setAttribute("aria-labelledby", "cookie-banner-title");
        b.setAttribute("aria-describedby", "cookie-banner-desc");

        b.innerHTML = `
            <div class="cookie-popup-inner">
                <h2 id="cookie-banner-title">${t.title}</h2>
                <p id="cookie-banner-desc">${t.desc}</p>
                <div class="cookie-buttons">
                    <button id="cookie-accept">${t.accept}</button>
                    <button id="cookie-reject">${t.reject}</button>
                    <button id="cookie-customize">${t.customize}</button>
                </div>
            </div>
        `;
        document.body.appendChild(b);

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

        ac.forEach(btn => btn.onclick = () => {
            localStorage.setItem(c, "all");
            localStorage.setItem(d, JSON.stringify({ functional: true, analytics: true, ads: true }));
            b.style.display = "none";
            o.style.display = "none";
        });

        rj.forEach(btn => btn.onclick = () => {
            localStorage.setItem(c, "necessary");
            localStorage.setItem(d, JSON.stringify({ functional: false, analytics: false, ads: false }));
            b.style.display = "none";
            o.style.display = "none";
        });

        sv.onclick = () => {
            const co = {
                functional: f.checked,
                analytics: an.checked,
                ads: ad.checked
            };
            localStorage.setItem(c, "preferencesSet");
            localStorage.setItem(d, JSON.stringify(co));
            b.style.display = "none";
            o.style.display = "none";
        };
    }
});

// FUNZIONE SEMPRE DISPONIBILE PER APRIRE IL PANNELLO
function openCookiePreferences() {
    const overlay = document.getElementById("cookie-overlay");
    if (overlay) {
        const saved = localStorage.getItem("cookieConsentData");
        if (saved) {
            const data = JSON.parse(saved);
            document.getElementById("toggle-functional").checked = data.functional || false;
            document.getElementById("toggle-analytics").checked = data.analytics || false;
            document.getElementById("toggle-ads").checked = data.ads || false;
        }
        overlay.style.display = "flex";
    }
}
