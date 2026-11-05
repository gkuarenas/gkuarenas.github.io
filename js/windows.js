// Window manager, desktop icons, G.A. Menu, taskbar, clock, and phone panel.
// Window content comes from <template data-window="ROUTE" data-title="..." data-size="WxH"> in index.html.
(function () {
  var R = window.Retro;
  var desktop = document.getElementById('desktop');
  var tasks = document.getElementById('tasks');
  var menu = document.getElementById('menu');
  var menuBtn = document.getElementById('menu-btn');
  var DW = 742, DH = 563, BAR = 36; // desktop size and taskbar height in design units

  var wins = {};   // id -> { el, task, min, z }
  var zTop = 0;

  function template(id) {
    var all = document.querySelectorAll('template[data-window]');
    for (var i = 0; i < all.length; i++) if (all[i].dataset.window === id) return all[i];
    return null;
  }

  // ---------- Desktop windows ----------
  function refresh() {
    var top = null;
    Object.keys(wins).forEach(function (id) {
      var w = wins[id];
      w.el.hidden = w.min;
      if (!w.min && (!top || w.z > wins[top].z)) top = id;
    });
    // Stacking order follows w.z (kept small so it stays under the menu and taskbar).
    Object.keys(wins).sort(function (a, b) { return wins[a].z - wins[b].z; }).forEach(function (id, i) {
      wins[id].el.style.zIndex = i + 1;
    });
    Object.keys(wins).forEach(function (id) {
      var w = wins[id], active = id === top;
      w.el.classList.toggle('active', active);
      w.task.className = 'task ' + (active ? 'in' : 'out');
    });
    return top;
  }

  function create(id) {
    var tpl = template(id);
    if (!tpl) return null;
    var size = (tpl.dataset.size || '490x400').split('x');
    var n = Object.keys(wins).length % 5;
    var title = tpl.dataset.title;

    var el = document.createElement('section');
    el.className = 'win out';
    el.tabIndex = -1;
    el.setAttribute('aria-label', title);
    el.style.width = size[0] + 'px';
    el.style.height = size[1] + 'px';
    el.style.left = Math.min(DW - size[0], id === 'who-am-i' && !Object.keys(wins).length ? 200 : 190 + n * 28) + 'px';
    el.style.top = (id === 'who-am-i' && !Object.keys(wins).length ? 18 : 12 + n * 18) + 'px';
    el.innerHTML = '<div class="win-bar"><span class="win-title"></span><span class="win-btns">' +
      '<button type="button" class="out" data-act="min">_</button><button type="button" class="out" data-act="close">X</button>' +
      '</span></div><div class="win-body in"></div>';
    el.querySelector('.win-title').textContent = title;
    el.querySelector('[data-act="min"]').setAttribute('aria-label', 'Minimize ' + title);
    el.querySelector('[data-act="close"]').setAttribute('aria-label', 'Close ' + title);
    el.querySelector('.win-body').appendChild(tpl.content.cloneNode(true));

    var task = document.createElement('button');
    task.type = 'button';
    task.textContent = title;
    task.title = title;

    var w = wins[id] = { el: el, task: task, min: false, z: 0 };
    desktop.insertBefore(el, menu);
    tasks.appendChild(task);

    el.addEventListener('pointerdown', function () { if (wins[id] && wins[id].el === el) raise(id); });
    el.querySelector('[data-act="min"]').addEventListener('click', function () { w.min = true; refresh(); });
    el.querySelector('[data-act="close"]').addEventListener('click', function () { close(id); });
    task.addEventListener('click', function () {
      if (!w.min && w.el.classList.contains('active')) { w.min = true; refresh(); } else { open(id); }
    });
    makeDraggable(el, el.querySelector('.win-bar'));
    return w;
  }

  // Clicks inside an iframe (the PDF) never reach pointerdown above; the page blurs instead.
  window.addEventListener('blur', function () {
    var a = document.activeElement;
    var el = a && a.tagName === 'IFRAME' && a.closest('.win');
    if (!el) return;
    Object.keys(wins).forEach(function (id) { if (wins[id].el === el) raise(id); });
  });

  function raise(id) {
    wins[id].z = ++zTop;
    refresh();
  }

  function makeDraggable(el, bar) {
    var drag = null;
    bar.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 || e.target.closest('button')) return;
      var scale = desktop.getBoundingClientRect().width / DW; // stage fit * camera * screen scale
      drag = { px: e.clientX, py: e.clientY, x: el.offsetLeft, y: el.offsetTop, scale: scale };
      bar.setPointerCapture(e.pointerId);
    });
    bar.addEventListener('pointermove', function (e) {
      if (!drag) return;
      // keep at least 120 design units of the title bar on screen, and the bar above the taskbar
      var x = drag.x + (e.clientX - drag.px) / drag.scale;
      var y = drag.y + (e.clientY - drag.py) / drag.scale;
      el.style.left = Math.max(120 - el.offsetWidth, Math.min(DW - 120, x)) + 'px';
      el.style.top = Math.max(0, Math.min(DH - BAR - 28, y)) + 'px';
    });
    function end() { drag = null; }
    bar.addEventListener('pointerup', end);
    bar.addEventListener('pointercancel', end);
  }

  function close(id) {
    var w = wins[id];
    if (!w) return;
    w.el.remove();
    w.task.remove();
    delete wins[id];
    refresh();
  }

  // ---------- Phone panel (one full-screen window at a time) ----------
  var panel = document.getElementById('ph-win');
  var phTitle = document.getElementById('ph-title');
  var phBody = document.getElementById('ph-body');
  var phId = null, opener = null;

  function openPhone(id) {
    var tpl = template(id);
    if (!tpl) return false;
    if (!phId) opener = document.activeElement;
    phId = id;
    phTitle.textContent = tpl.dataset.title;
    phBody.replaceChildren(tpl.content.cloneNode(true));
    phBody.scrollTop = 0;
    panel.hidden = false;
    document.body.classList.add('ph-open');
    if (location.hash !== '#' + id && tpl.dataset.hash !== 'none') location.hash = id;
    document.getElementById('ph-close').focus();
    return true;
  }

  function closePhone() {
    if (!phId) return;
    var tpl = template(phId);
    var parent = (tpl && tpl.dataset.parent) || (phId.indexOf('projects/') === 0 ? 'projects' : null);
    if (parent) {
      history.replaceState(null, '', '#' + parent);
      openPhone(parent);
      return;
    }
    phId = null;
    panel.hidden = true;
    document.body.classList.remove('ph-open');
    history.replaceState(null, '', location.pathname + location.search);
    if (opener && opener.focus) opener.focus();
  }
  document.getElementById('ph-close').addEventListener('click', closePhone);

  // ---------- Menu ----------
  function closeMenu() { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
  Array.prototype.forEach.call(document.querySelectorAll('#desk-icons [data-open]'), function (icon) {
    var b = document.createElement('button');
    b.type = 'button';
    b.dataset.open = icon.dataset.open;
    b.textContent = icon.textContent.trim();
    menu.appendChild(b);
  });
  menuBtn.addEventListener('click', function () {
    var show = menu.hidden;
    menu.hidden = !show;
    menuBtn.setAttribute('aria-expanded', String(show));
  });
  document.addEventListener('pointerdown', function (e) {
    if (!menu.hidden && !e.target.closest('#menu, #menu-btn')) closeMenu();
  });

  // ---------- Clock ----------
  var clock = document.getElementById('clock');
  function tick() { clock.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
  tick();
  setInterval(tick, 15000);

  // ---------- Public API and shared handlers ----------
  function open(id) {
    if (R.phoneMQ.matches) return openPhone(id);
    var w = wins[id] || create(id);
    if (!w) return false;
    w.min = false;
    raise(id);
    closeMenu();
    w.el.focus({ preventScroll: true });
    return true;
  }

  R.windows = {
    open: open,
    has: function (id) { return !!template(id); },
    // A hash route may open this window (templates with data-hash="none" may not).
    routable: function (id) { var t = template(id); return !!t && t.dataset.hash !== 'none'; },
    close: function (id) { if (phId === id) closePhone(); else close(id); },
    count: function () { return Object.keys(wins).length; },
    closeAll: function () {
      Object.keys(wins).forEach(close);
      if (phId) { phId = null; panel.hidden = true; document.body.classList.remove('ph-open'); }
    }
  };

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open]');
    if (!t) return;
    e.preventDefault();
    open(t.dataset.open);
  });

  // Capture phase so Escape closes the menu or phone panel before scene.js sees it.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (phId) { e.preventDefault(); closePhone(); }
    else if (!menu.hidden) { e.preventDefault(); closeMenu(); menuBtn.focus(); }
  }, true);
})();
