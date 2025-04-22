document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("cookieConsent")) return;

  const lang = document.documentElement.lang === "it" ? "it" : "en";

  const texts = {
    it: {
      title: "Rispettiamo la tua privacy",
      description: "Utilizziamo i cookie per migliorare la tua esperienza di navigazione, fornire contenuti personalizzati e analizzare il nostro traffico. Cliccando su \"Accetta tutto\" acconsenti all'uso dei cookie.",
      customise: "Personalizza",
      reject: "Rifiuta tutti",
      accept: "Accetta tutto",
      manage: "Gestisci preferenze cookie",
      customiseTitle: "Personalizza le preferenze",
      customiseIntro: "Utilizziamo i cookie per aiutarti a navigare in modo efficiente e a svolgere determinate funzioni. Troverai informazioni dettagliate su ogni categoria di consenso qui sotto.",
      labels: {
        functional: "Per funzioni extra come social e feedback.",
        analytics: "Per analizzare il traffico.",
        ads: "Per annunci personalizzati."
      }
    },
    en: {
      title: "We value your privacy",
      description: "We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
      customise: "Customise",
      reject: "Reject All",
      accept: "Accept All",
      manage: "Manage cookie preferences",
      customiseTitle: "Customise Consent Preferences",
      customiseIntro: "We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about each consent category below.",
      labels: {
        functional: "For features like social sharing and feedback.",
        analytics: "To analyze traffic.",
        ads: "For personalized ads."
      }
    }
  };

  const t = texts[lang];

  // BANNER
  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.className = "cookie-popup";
  banner.innerHTML = `
    <div class="cookie-popup-inner">
      <h3>${t.title}</h3>
      <p>${t.description}</p>
      <div class="cookie-buttons">
        <button id="cookie-customize">${t.customise}</button>
        <button id="cookie-reject">${t.reject}</button>
        <button id="cookie-accept">${t.accept}</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  // OVERLAY POPUP
  const overlay = document.createElement("div");
  overlay.id = "cookie-overlay";
  overlay.className = "customize-popup";
  overlay.style.display = "none";
  overlay.innerHTML = `
    <div class="cookie-popup-inner">
      <h3>${t.customiseTitle}</h3>
      <p>${t.customiseIntro}</p>
      <div class="cookie-toggles">
        <div><strong>Necessary</strong> – <em>${lang === "it" ? "Sempre attivi" : "Always active"}</em></div>

        <label><strong>Functional</strong> – ${t.labels.functional}
          <input type="checkbox" id="toggle-functional" />
          <span class="slider"></span>
        </label>

        <label><strong>Analytics</strong> – ${t.labels.analytics}
          <input type="checkbox" id="toggle-analytics" />
          <span class="slider"></span>
        </label>

        <label><strong>Advertisement</strong> – ${t.labels.ads}
          <input type="checkbox" id="toggle-ads" />
          <span class="slider"></span>
        </label>
      </div>
      <div class="cookie-buttons">
        <button id="cookie-reject2">${t.reject}</button>
        <button id="cookie-save">${lang === "it" ? "Salva preferenze" : "Save My Preferences"}</button>
        <button id="cookie-accept2">${t.accept}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // GESTIONE EVENTI
  document.getElementById("cookie-customize").onclick = () => overlay.style.display = "block";
  document.getElementById("cookie-accept").onclick =
  document.getElementById("cookie-accept2").onclick = () => {
    localStorage.setItem("cookieConsent", "all");
    banner.remove();
    overlay.remove();
  };
  document.getElementById("cookie-reject").onclick =
  document.getElementById("cookie-reject2").onclick = () => {
    localStorage.setItem("cookieConsent", "necessary");
    banner.remove();
    overlay.remove();
  };
  document.getElementById("cookie-save").onclick = () => {
    const consent = {
      functional: document.getElementById("toggle-functional").checked,
      analytics: document.getElementById("toggle-analytics").checked,
      ads: document.getElementById("toggle-ads").checked
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    banner.remove();
    overlay.remove();
  };
});
