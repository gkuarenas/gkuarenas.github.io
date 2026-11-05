// Desk scene: scale-to-fit, camera zoom, back to desk, power. Shared namespace: window.Retro.
(function () {
  var R = window.Retro = window.Retro || {};
  R.phoneMQ = window.matchMedia('(max-width: 760px), (max-height: 500px)');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  var root = document.documentElement;
  var cam = document.getElementById('cam');
  var screen = document.getElementById('screen');
  var monitor = document.getElementById('monitor');
  var pwr = document.getElementById('pwr');

  // World units are the scene SVG units. First view: world x 60..1460, y 0..788, contained and centred.
  // Zoom: monitor (x 660..984, y 240..480) centred and as large as the viewport allows, with a thin margin.
  var VIEW = { x: 60, y: 0, w: 1400, h: 788 };
  var MON = { cx: 822, cy: 360, w: 324, h: 240 };
  var MARGIN = 30;
  // Phone zoom: the 260x199 screen covers the whole viewport.
  var SCR = { cx: 822, cy: 357.5, w: 260, h: 199 };

  function layout() {
    var vw = window.innerWidth, vh = window.innerHeight;
    var s = Math.min(vw / VIEW.w, vh / VIEW.h);
    var rest = 'translate(' + ((vw - VIEW.w * s) / 2 - VIEW.x * s) + 'px,' + ((vh - VIEW.h * s) / 2 - VIEW.y * s) + 'px) scale(' + s + ')';
    var phone = R.phoneMQ.matches, T = phone ? SCR : MON;
    var k = phone ? Math.max(vw / SCR.w, vh / SCR.h) : Math.min((vw - 2 * MARGIN) / MON.w, (vh - 2 * MARGIN) / MON.h);
    var zoom = 'translate(' + (vw / 2 - T.cx * k) + 'px,' + (vh / 2 - T.cy * k) + 'px) scale(' + k + ')';
    root.classList.add('no-anim'); // a resize must not play the 10-step zoom
    root.style.setProperty('--cam-rest', rest);
    root.style.setProperty('--cam-zoom', zoom);
    void cam.offsetWidth;
    root.classList.remove('no-anim');
  }
  window.addEventListener('resize', layout);
  R.phoneMQ.addEventListener('change', layout);
  layout();

  // Camera. instant = skip the 10-step transition (deep links).
  R.isZoomed = function () { return root.classList.contains('zoomed'); };
  R.zoom = function (instant) {
    if (R.isZoomed()) return;
    if (instant) root.classList.add('no-anim');
    root.classList.add('zoomed');
    monitor.inert = false;
    if (instant) { void cam.offsetWidth; root.classList.remove('no-anim'); }
  };
  R.back = function () {
    root.classList.remove('zoomed');
    monitor.inert = true;
  };
  document.getElementById('pc-hit').addEventListener('click', function () {
    if (!R.phoneMQ.matches) R.zoom(); // phone.js handles the tap on phones
  });
  document.getElementById('back-btn').addEventListener('click', R.back);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !e.defaultPrevented && !R.phoneMQ.matches && R.isZoomed()) R.back();
  });

  // Power. Off: desktop closes to a line, then black. On: black, line, desktop opens.
  var timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function set(cls, on) { screen.classList.toggle(cls, on); }
  var on = true;
  pwr.addEventListener('click', function () {
    timers.forEach(clearTimeout); timers = [];
    on = !on;
    root.classList.toggle('is-off', !on);
    pwr.setAttribute('aria-pressed', String(on));
    document.getElementById('desktop').inert = !on;
    if (reduced.matches) { set('is-closed', !on); set('is-line', false); return; }
    if (!on) {
      set('is-line', true); set('is-closed', true);
      later(function () { set('is-line', false); }, 340);
    } else {
      later(function () { set('is-line', true); }, 260);
      later(function () { set('is-closed', false); }, 460);
      later(function () { set('is-line', false); }, 780);
    }
  });
})();
