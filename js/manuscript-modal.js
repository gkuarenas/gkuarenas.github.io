// Shared by any project page with a "Request the Manuscript" modal —
// validation, submit state machine, and the POST to the Cloudflare Worker
// relay (see js/config.js). Project name comes from the trigger button's
// data-project attribute, so one Worker can serve every project's page.
(function () {
  const openBtn = document.getElementById('openManuscriptModal');
  if (!openBtn) return;
  const PROJECT_NAME = openBtn.dataset.project || 'Portfolio site';

  const backdrop = document.getElementById('modalBackdrop');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('modalClose');
  const form = document.getElementById('manuscriptForm');

  const nameInput = document.getElementById('mName');
  const affiliationInput = document.getElementById('mAffiliation');
  const emailInput = document.getElementById('mEmail');
  const purposeInput = document.getElementById('mPurpose');
  const honeypotInput = document.getElementById('mHoneypot');

  const bannerSuccess = document.getElementById('bannerSuccess');
  const bannerError = document.getElementById('bannerError');
  const hintText = document.getElementById('hintText');
  const copyBtn = document.getElementById('copyDetails');
  const sendBtn = document.getElementById('sendRequest');

  let status = 'idle'; // idle | sending | sent | error
  let closeTimer = null;
  let copyTimer = null;

  function isValid() {
    return !!(
      nameInput.value.trim() &&
      affiliationInput.value.trim() &&
      /\S+@\S+\.\S+/.test(emailInput.value.trim())
    );
  }

  function render() {
    const valid = isValid();
    sendBtn.disabled = !valid || status === 'sending' || status === 'sent';
    sendBtn.textContent = status === 'sending' ? 'Sending…'
      : status === 'sent' ? 'Sent ✓'
      : status === 'error' ? 'Try Again'
      : 'Send Request';
    bannerSuccess.classList.toggle('show', status === 'sent');
    bannerError.classList.toggle('show', status === 'error');
    hintText.classList.toggle('show', !valid && status !== 'sent');
    copyBtn.classList.toggle('show', status === 'error');
  }

  [nameInput, affiliationInput, emailInput, purposeInput].forEach((el) => {
    el.addEventListener('input', render);
  });

  function openModal() {
    backdrop.classList.add('open');
  }

  function resetStatus() {
    if (closeTimer) clearTimeout(closeTimer);
    status = 'idle';
    bannerError.textContent = '';
    render();
  }

  function closeModal() {
    backdrop.classList.remove('open');
    resetStatus();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
  modal.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isValid() || status === 'sending' || status === 'sent') return;

    status = 'sending';
    bannerError.textContent = '';
    render();

    fetch(TELEGRAM_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        affiliation: affiliationInput.value.trim(),
        email: emailInput.value.trim(),
        purpose: purposeInput.value.trim(),
        website: honeypotInput.value,
        project: PROJECT_NAME
      })
    }).then((res) => res.json().catch(() => ({ ok: false })).then((data) => {
      if (res.ok && data.ok) {
        status = 'sent';
        render();
        closeTimer = setTimeout(() => {
          backdrop.classList.remove('open');
          form.reset();
          resetStatus();
        }, 1800);
      } else {
        status = 'error';
        bannerError.textContent = "Couldn't send — the relay may not be set up yet.";
        render();
      }
    })).catch(() => {
      status = 'error';
      bannerError.textContent = "Couldn't reach the server. Check your connection and try again.";
      render();
    });
  });

  copyBtn.addEventListener('click', () => {
    const text = `Manuscript Request — ${PROJECT_NAME}\nName: ${nameInput.value}\nAffiliation: ${affiliationInput.value}\nEmail: ${emailInput.value}\nPurpose: ${purposeInput.value || '(none)'}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (copyTimer) clearTimeout(copyTimer);
        copyBtn.textContent = 'Copied!';
        copyTimer = setTimeout(() => { copyBtn.textContent = 'Copy Details'; }, 1800);
      });
    }
  });

  render();
})();
