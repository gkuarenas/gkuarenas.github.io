// "Request the Manuscript" dialog window (GripVT only). The form lives in
// <template data-window="manuscript"> in index.html and is cloned each time it opens,
// so everything here is delegated and finds elements by class, never by id.
// POSTs to the Cloudflare Worker relay (TELEGRAM_WORKER_URL in js/config.js).
// The project name comes from the form's data-project attribute.
(function () {
  var forms = new WeakMap(); // form -> { status, closeTimer, copyTimer }

  function state(form) {
    var s = forms.get(form);
    if (!s) { s = { status: 'idle', closeTimer: null, copyTimer: null }; forms.set(form, s); }
    return s;
  }
  function field(form, name) { return form.querySelector('[name="' + name + '"]'); }
  function el(form, cls) { return form.querySelector('.' + cls); }

  function isValid(form) {
    return !!(
      field(form, 'name').value.trim() &&
      field(form, 'affiliation').value.trim() &&
      /\S+@\S+\.\S+/.test(field(form, 'email').value.trim())
    );
  }

  function render(form) {
    var s = state(form);
    var valid = isValid(form);
    var send = el(form, 'ms-send');
    send.disabled = !valid || s.status === 'sending' || s.status === 'sent';
    send.textContent = s.status === 'sending' ? 'Sending...'
      : s.status === 'sent' ? 'Sent'
      : s.status === 'error' ? 'Try Again'
      : 'Send Request';
    el(form, 'ms-ok').hidden = s.status !== 'sent';
    el(form, 'ms-err').hidden = s.status !== 'error';
    el(form, 'ms-hint').hidden = valid || s.status === 'sent';
    el(form, 'ms-copy').hidden = s.status !== 'error';
  }

  document.addEventListener('input', function (e) {
    var form = e.target.closest && e.target.closest('.ms-form');
    if (form) render(form);
  });

  document.addEventListener('submit', function (e) {
    var form = e.target.closest && e.target.closest('.ms-form');
    if (!form) return;
    e.preventDefault();
    var s = state(form);
    if (!isValid(form) || s.status === 'sending' || s.status === 'sent') return;

    s.status = 'sending';
    el(form, 'ms-err').textContent = '';
    render(form);

    fetch(TELEGRAM_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: field(form, 'name').value.trim(),
        affiliation: field(form, 'affiliation').value.trim(),
        email: field(form, 'email').value.trim(),
        purpose: field(form, 'purpose').value.trim(),
        website: field(form, 'website').value,
        project: form.dataset.project || 'Portfolio site'
      })
    }).then(function (res) {
      return res.json().catch(function () { return { ok: false }; }).then(function (data) {
        if (res.ok && data.ok) {
          s.status = 'sent';
          render(form);
          s.closeTimer = setTimeout(function () {
            var win = form.closest('.win, #ph-win');
            if (win && window.Retro && Retro.windows) Retro.windows.close('manuscript');
          }, 1800);
        } else {
          s.status = 'error';
          el(form, 'ms-err').textContent = "Couldn't send. The relay may not be set up yet.";
          render(form);
        }
      });
    }).catch(function () {
      s.status = 'error';
      el(form, 'ms-err').textContent = "Couldn't reach the server. Check your connection and try again.";
      render(form);
    });
  });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.ms-copy');
    if (!btn) return;
    var form = btn.closest('.ms-form');
    var s = state(form);
    var text = 'Manuscript Request - ' + (form.dataset.project || 'Portfolio site') +
      '\nName: ' + field(form, 'name').value +
      '\nAffiliation: ' + field(form, 'affiliation').value +
      '\nEmail: ' + field(form, 'email').value +
      '\nPurpose: ' + (field(form, 'purpose').value || '(none)');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        clearTimeout(s.copyTimer);
        btn.textContent = 'Copied!';
        s.copyTimer = setTimeout(function () { btn.textContent = 'Copy Details'; }, 1800);
      });
    }
  });
})();
