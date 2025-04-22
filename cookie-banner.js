document.addEventListener('DOMContentLoaded', function () {
  const userLang = document.documentElement.lang || navigator.language || 'en';
  const lang = userLang.startsWith('it') ? 'it' : 'en';
  const storedConsent = localStorage.getItem('cookie-consent');

  if (!storedConsent) {
    showBanner();
  }

  function showBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';

    const texts = {
      it: {
        title: 'La tua privacy è importante',
        message: 'Utilizziamo i cookie per migliorare l\'esperienza di navigazione, mostrare contenuti personalizzati e analizzare il traffico.',
        accept: 'Accetta tutti',
        reject: 'Rifiuta tutti',
        customize: 'Personalizza',
        modalTitle: 'Preferenze sui cookie',
        modalMessage: 'Utilizziamo cookie essenziali, funzionali e di profilazione. Puoi gestire le tue preferenze qui sotto.',
        save: 'Salva le preferenze'
      },
      en: {
        title: 'We value your privacy',
        message: 'We use cookies to enhance your browsing experience, serve personalised content, and analyse our traffic.',
        accept: 'Accept all',
        reject: 'Reject all',
        customize: 'Customise',
        modalTitle: 'Customise Cookie Preferences',
        modalMessage: 'We use essential, functional, and profiling cookies. You can manage your preferences below.',
        save: 'Save preferences'
      }
    };

    const t = texts[lang];

    banner.innerHTML = `
      <div class="cookie-banner-box">
        <p><strong>${t.title}</strong><br>${t.message}</p>
        <div class="cookie-buttons">
          <button id="cookie-reject">${t.reject}</button>
          <button id="cookie-customize">${t.customize}</button>
          <button id="cookie-accept">${t.accept}</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'all');
      closeBanner();
    });

    document.getElementById('cookie-reject').addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'none');
      closeBanner();
    });

    document.getElementById('cookie-customize').addEventListener('click', () => {
      openModal();
    });
  }

  function closeBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.remove();
  }

  // Funzione richiamata dal footer
  window.openCookiePreferences = function () {
    openModal(true);
  };

  function openModal(fromFooter = false) {
    closeBanner();

    const texts = {
      it: {
        modalTitle: 'Personalizza le preferenze sui cookie',
        modalMessage: 'Usiamo cookie essenziali, funzionali e analitici. Puoi gestire le tue preferenze qui sotto.',
        accept: 'Accetta tutti',
        reject: 'Rifiuta tutti',
        save: 'Salva le preferenze',
        necessary: 'Necessari – Sempre attivi',
        functional: 'Funzionali',
        analytics: 'Analitici'
      },
      en: {
        modalTitle: 'Customise Cookie Preferences',
        modalMessage: 'We use essential, functional, and analytical cookies. Manage your preferences below.',
        accept: 'Accept all',
        reject: 'Reject all',
        save: 'Save preferences',
        necessary: 'Necessary – Always active',
        functional: 'Functional',
        analytics: 'Analytics'
      }
    };

    const t = texts[lang];
    const modal = document.createElement('div');
    modal.id = 'cookie-modal';
    modal.className = 'cookie-modal';

    modal.innerHTML = `
      <div class="cookie-modal-box">
        <h2>${t.modalTitle}</h2>
        <p>${t.modalMessage}</p>
        <form id="cookie-form">
          <label><input type="checkbox" disabled checked> ${t.necessary}</label><br>
          <label><input type="checkbox" name="functional"> ${t.functional}</label><br>
          <label><input type="checkbox" name="analytics"> ${t.analytics}</label><br>
        </form>
        <div class="cookie-buttons">
          <button id="modal-reject">${t.reject}</button>
          <button id="modal-save">${t.save}</button>
          <button id="modal-accept">${t.accept}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('modal-reject').addEventListener('click', () => {
      localStorage.setItem('cookie-consent', JSON.stringify({ functional: false, analytics: false }));
      modal.remove();
    });

    document.getElementById('modal-accept').addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'all');
      modal.remove();
    });

    document.getElementById('modal-save').addEventListener('click', () => {
      const form = document.getElementById('cookie-form');
      const functional = form.elements['functional'].checked;
      const analytics = form.elements['analytics'].checked;
      localStorage.setItem('cookie-consent', JSON.stringify({ functional, analytics }));
      modal.remove();
    });
  }
});
