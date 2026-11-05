// Hash routes: #who-am-i, #projects, #projects/gripvt, ... A deep link opens the zoomed computer with that window.
(function () {
  var R = window.Retro;

  function route(initial) {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) { if (R.phoneMQ.matches) R.windows.closeAll(); return; }
    if (!R.windows.routable(id)) return;
    R.windows.open(id);
    if (!R.phoneMQ.matches) R.zoom(initial);
  }

  window.addEventListener('hashchange', function () { route(false); });
  // Switching between desk and phone layouts rebuilds from the current hash.
  R.phoneMQ.addEventListener('change', function () { R.windows.closeAll(); route(true); });
  route(true);
})();
