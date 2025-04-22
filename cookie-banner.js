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
      manage: "Gestisci preferenze cookie"
    },
    en: {
      title: "We value your privacy",
      description: "We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
      customise: "Customise",
      reject: "Reject All",
      accept: "Accept All",
      manage: "Manage cookie preferences"
    }
  };

  const t = texts[lang];

  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.innerHTML = `
    <div class="cookie-container">
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

  const overlay = document.createElement("div");
  overlay.id = "cookie-overlay";
  overlay.style.display = "none";
  overlay.innerHTML = `
    <div class="cookie-popup">
      <h3>${lang === "it" ? "Personalizza le preferenze" : "Customise Consent Preferences"}</h3>
      <p>${lang === "it"
        ? "Utilizziamo i cookie per aiutarti a navigare in modo efficiente e a svolgere determinate funzioni. Troverai informazioni dettagliate su ogni categoria di consenso qui sotto."
        : "We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about each consent category below."}
      </p>
      <div class="cookie-options">
        <div><strong>Necessary</strong> – ${lang === "it" ? "Sempre attivi. Essenziali per il sito." : "Always active. Essential for the website."}</div>
        <div><strong>Functional</strong> – ${lang === "it" ? "Per funzioni extra come social e feedback." : "For features like social sharing and feedback."}</div>
        <div><strong>Analytics</strong> – ${lang === "it" ? "Per analizzare il traffico." : "To analyze traffic."}</div>
        <div><strong>Advertisement</strong> – ${lang === "it" ? "Per annunci personalizzati." : "For personalized ads."}</div>
      </div>
      <div class="cookie-buttons">
        <button id="cookie-reject2">${t.reject}</button>
        <button id="cookie-save">${lang === "it" ? "Salva preferenze" : "Save My Preferences"}</button>
        <button id="cookie-accept2">${t.accept}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("cookie-customize").onclick = () => {
    overlay.style.display = "flex";
  };
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
    localStorage.setItem("cookieConsent", "custom");
    banner.remove();
    overlay.remove();
  };
});
