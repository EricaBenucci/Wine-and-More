// File: cookie-banner.js
// Descrizione: Banner cookie GDPR conforme con supporto multilingua (IT/EN)
// Inserire questo file nel tuo sito e collegarlo nel <head> con <script src="cookie-banner.js" defer></script>

const cookieBannerHTML = `
<div id="cookie-banner" class="cookie-banner">
  <div class="cookie-message">
    <p id="cookie-text"></p>
    <div class="cookie-buttons">
      <button id="cookie-customize">Customizza / Customize</button>
      <button id="cookie-reject">Rifiuta tutto / Reject All</button>
      <button id="cookie-accept">Accetta tutto / Accept All</button>
    </div>
  </div>
</div>
<div id="cookie-modal" class="cookie-modal hidden">
  <div class="cookie-modal-content">
    <span id="cookie-modal-close">&times;</span>
    <h2>Preferenze Cookie / Cookie Preferences</h2>
    <p>Usiamo i cookie per migliorare l'esperienza utente e analizzare il traffico. We use cookies to enhance user experience and analyse traffic.</p>
    <div class="cookie-category">
      <h3>Necessari / Necessary <span class="always-active">(Sempre attivi / Always active)</span></h3>
      <p>Essenziali per il funzionamento base del sito. Required for basic site functionality.</p>
    </div>
    <div class="cookie-category">
      <h3><label><input type="checkbox" id="consent-functional"> Funzionali / Functional</label></h3>
      <p>Per funzioni come condivisione social, commenti, ecc.</p>
    </div>
    <div class="cookie-category">
      <h3><label><input type="checkbox" id="consent-analytics"> Analitici / Analytics</label></h3>
      <p>Per comprendere come i visitatori interagiscono col sito.</p>
    </div>
    <div class="cookie-category">
      <h3><label><input type="checkbox" id="consent-performance"> Performance</label></h3>
      <p>Per monitorare le prestazioni del sito.</p>
    </div>
    <div class="cookie-category">
      <h3><label><input type="checkbox" id="consent-advertising"> Pubblicitari / Advertisement</label></h3>
      <p>Per mostrare annunci personalizzati e misurare le campagne.</p>
    </div>
    <div class="cookie-buttons">
      <button id="cookie-reject-modal">Rifiuta tutto / Reject All</button>
      <button id="cookie-save">Salva preferenze / Save Preferences</button>
      <button id="cookie-accept-modal">Accetta tutto / Accept All</button>
    </div>
  </div>
</div>`;

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("cookieConsent")) {
    document.body.insertAdjacentHTML("beforeend", cookieBannerHTML);
    setTexts();
    setupCookieEvents();
  }
});

function setTexts() {
  const lang = document.documentElement.lang === "it" ? "it" : "en";
  const textIT = "Utilizziamo i cookie per migliorare la tua esperienza di navigazione, offrire contenuti personalizzati e analizzare il nostro traffico. Cliccando su \"Accetta tutto\", acconsenti all'uso dei cookie.";
  const textEN = "We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our traffic. By clicking 'Accept All', you consent to our use of cookies.";
  document.getElementById("cookie-text").textContent = lang === "it" ? textIT : textEN;
}

function setupCookieEvents() {
  document.getElementById("cookie-accept").onclick = () => {
    localStorage.setItem("cookieConsent", JSON.stringify({ all: true }));
    document.getElementById("cookie-banner").remove();
  };

  document.getElementById("cookie-reject").onclick = () => {
    localStorage.setItem("cookieConsent", JSON.stringify({ all: false }));
    document.getElementById("cookie-banner").remove();
  };

  document.getElementById("cookie-customize").onclick = () => {
    document.getElementById("cookie-modal").classList.remove("hidden");
  };

  document.getElementById("cookie-modal-close").onclick = () => {
    document.getElementById("cookie-modal").classList.add("hidden");
  };

  document.getElementById("cookie-reject-modal").onclick = () => {
    localStorage.setItem("cookieConsent", JSON.stringify({ functional: false, analytics: false, performance: false, advertising: false }));
    document.getElementById("cookie-banner").remove();
    document.getElementById("cookie-modal").remove();
  };

  document.getElementById("cookie-accept-modal").onclick = () => {
    localStorage.setItem("cookieConsent", JSON.stringify({ functional: true, analytics: true, performance: true, advertising: true }));
    document.getElementById("cookie-banner").remove();
    document.getElementById("cookie-modal").remove();
  };

  document.getElementById("cookie-save").onclick = () => {
    const consent = {
      functional: document.getElementById("consent-functional").checked,
      analytics: document.getElementById("consent-analytics").checked,
      performance: document.getElementById("consent-performance").checked,
      advertising: document.getElementById("consent-advertising").checked,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    document.getElementById("cookie-banner").remove();
    document.getElementById("cookie-modal").remove();
  };
}
