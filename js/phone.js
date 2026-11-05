// Phone mode: portrait shows the phone desktop; landscape shows the room, and a tap on the PC zooms into the same desktop.
// Windows themselves live in windows.js (openPhone/closePhone). Shared namespace: window.Retro.
(function () {
  var R = window.Retro;
  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var cam = $('cam'), screen = $('screen'), monitor = $('monitor');
  var desk = $('ph-desk'), menu = $('ph-menu'), menuBtn = $('ph-menu-btn'), panel = $('ph-win');

  // inDesk: phone desktop is up in landscape. off: monitor left off in the room. busy: an animation is playing.
  var S = { landscape: false, inDesk: false, off: false, busy: false, hintDone: false };
  var timers = [];

  function later(fn, ms) { timers.push(setTimeout(fn, reduced.matches ? 0 : ms)); }
  function stopAnim() {
    timers.forEach(clearTimeout); timers = [];
    S.busy = false;
    desk.classList.remove('closing', 'lined');
  }
  // Run fn with every transition off (no 10-step camera, no clip-path animation).
  function quiet(fn) {
    root.classList.add('no-anim');
    fn();
    void cam.offsetWidth;
    root.classList.remove('no-anim');
  }
  function setCam(zoomed) { root.classList.toggle('zoomed', zoomed); }
  function setMenu(show) {
    menu.hidden = !show;
    menuBtn.setAttribute('aria-expanded', String(show));
  }

  function render() {
    var L = S.landscape;
    root.classList.toggle('landscape', L);
    root.classList.toggle('portrait', !L);
    root.classList.toggle('short', window.innerHeight < 350);
    root.classList.toggle('is-off', S.off);
    screen.classList.toggle('is-closed', S.off);
    Array.prototype.forEach.call(desk.querySelectorAll('.land-only'), function (el) { el.hidden = !L; });
    desk.hidden = L && !S.inDesk;
    $('ph-hint').hidden = L || S.hintDone;
  }

  // On phones the PC label and button say "Tap".
  function label() {
    var text = R.phoneMQ.matches ? 'Tap the PC' : 'Click the PC';
    $('pc-label').textContent = text;
    $('pc-hit').setAttribute('aria-label', text);
  }

  // Called by windows.js whenever a phone window opens.
  function enter() {
    if (!R.phoneMQ.matches) return;
    setMenu(false);
    if (S.landscape) {
      stopAnim();
      S.inDesk = true; S.off = false;
      quiet(function () { setCam(true); });
    }
    render();
  }
  R.phone = { enter: enter };

  function tapPC() {
    if (!R.phoneMQ.matches || S.busy) return;
    S.busy = true;
    setCam(true);
    later(function () {
      S.inDesk = true;
      if (!S.off) { S.busy = false; render(); return; }
      // Monitor was off: the desktop appears closed, then opens (line on, open, line off).
      desk.classList.add('closing');
      render();
      later(function () { desk.classList.add('lined'); }, 260);
      later(function () { desk.classList.remove('closing'); S.off = false; render(); }, 460);
      later(function () { desk.classList.remove('lined'); S.busy = false; }, 780);
    }, 1000);
  }

  function shutDown() {
    if (S.busy) return;
    S.busy = true;
    setMenu(false);
    desk.classList.add('closing', 'lined');
    later(function () { desk.classList.remove('lined'); }, 340);
    later(function () {
      S.off = true; S.inDesk = false;
      desk.classList.remove('closing');
      quiet(render); // black screen at once, camera still on it
      setCam(false);
    }, 640);
    later(function () { S.busy = false; }, 1640);
  }

  function backToDesk() {
    if (S.busy) return;
    setMenu(false);
    S.inDesk = false;
    render();
    setCam(false);
  }

  // Orientation change (the phone rule itself is only about size, so the two layouts are told apart here).
  function sync(force) {
    if (!R.phoneMQ.matches) return;
    var L = window.innerWidth > window.innerHeight;
    if (force || L !== S.landscape) {
      stopAnim();
      S.landscape = L;
      S.inDesk = L && !panel.hidden; // an open window keeps the desktop behind it
      if (S.inDesk) S.off = false;
      if (!L) S.hintDone = false;    // every rotation into portrait shows the tip again
      quiet(function () { setCam(S.inDesk); });
      setMenu(false);
    }
    render();
  }

  // Crossing between PC and phone layouts: drop all phone state.
  R.phoneMQ.addEventListener('change', function () {
    stopAnim();
    S.inDesk = false; S.off = false;
    quiet(function () {
      root.classList.remove('zoomed', 'is-off', 'landscape', 'portrait', 'short');
      screen.classList.remove('is-closed', 'is-line');
      monitor.inert = true;
    });
    setMenu(false);
    label();
    sync(true);
  });

  // Icons and menu items come from the PC desktop icons, so labels and artwork stay in one place.
  var icons = $('ph-icons'), sep = menu.querySelector('.sep');
  Array.prototype.forEach.call(document.querySelectorAll('#desk-icons [data-open]'), function (src) {
    var id = src.dataset.open, name = src.textContent.trim();
    var a = document.createElement('a');
    a.href = '#' + id;
    a.dataset.open = id;
    a.className = 'ph-ic';
    a.appendChild(src.querySelector('svg').cloneNode(true));
    var span = document.createElement('span');
    span.textContent = name;
    a.appendChild(span);
    icons.appendChild(a);
    var m = document.createElement('a');
    m.href = '#' + id;
    m.dataset.open = id;
    m.textContent = name;
    menu.insertBefore(m, sep);
  });

  $('pc-hit').addEventListener('click', tapPC);
  $('ph-back').addEventListener('click', backToDesk);
  $('ph-shutdown').addEventListener('click', shutDown);
  $('ph-hint-ok').addEventListener('click', function () { S.hintDone = true; render(); });
  menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
  document.addEventListener('click', function (e) {
    if (!menu.hidden && !e.target.closest('#ph-menu, #ph-menu-btn')) setMenu(false);
  });
  window.addEventListener('resize', function () { sync(false); });
  window.addEventListener('orientationchange', function () { setTimeout(function () { sync(false); }, 250); });

  var clock = $('ph-clock');
  function tick() { clock.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
  tick();
  setInterval(tick, 15000);

  label();
  sync(true);
})();
