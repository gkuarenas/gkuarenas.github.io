// Shared by all project pages with a gallery: filmstrip scroll + lightbox.
(function () {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  const backdrop = document.getElementById('lightboxBackdrop');
  const frame = document.getElementById('lightboxFrame');
  const img = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const filmstrip = document.getElementById('filmstrip');
  const filmLeft = document.getElementById('filmLeft');
  const filmRight = document.getElementById('filmRight');

  const slides = items.map((btn) => {
    const im = btn.querySelector('img');
    return {
      src: im ? im.getAttribute('src') : '',
      label: im ? im.getAttribute('alt') : '',
      bg: btn.dataset.bg || 'transparent'
    };
  });

  let currentIndex = 0;
  let closeTimer = null;

  function targetRect() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const maxW = Math.min(vw * 0.86, 1100);
    const maxH = Math.min(vh * 0.82, 800);
    let w = maxW, h = w * 3 / 4;
    if (h > maxH) { h = maxH; w = h * 4 / 3; }
    return { top: (vh - h) / 2, left: (vw - w) / 2, width: w, height: h };
  }

  function setFrameRect(rect, animate) {
    if (!animate) frame.style.transition = 'none';
    frame.style.top = rect.top + 'px';
    frame.style.left = rect.left + 'px';
    frame.style.width = rect.width + 'px';
    frame.style.height = rect.height + 'px';
    if (!animate) requestAnimationFrame(() => { frame.style.transition = ''; });
  }

  function renderSlide(index) {
    const slide = slides[index];
    img.src = slide.src;
    img.alt = slide.label;
    frame.style.background = slide.bg;
  }

  function openLightbox(index, triggerEl) {
    currentIndex = index;
    renderSlide(index);
    const originRect = triggerEl.getBoundingClientRect();
    backdrop.classList.add('open');
    setFrameRect(originRect, false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      backdrop.classList.add('active');
      frame.classList.add('active');
      setFrameRect(targetRect(), true);
    }));
  }

  function closeLightbox() {
    if (closeTimer) clearTimeout(closeTimer);
    backdrop.classList.remove('active');
    frame.classList.remove('active');
    closeTimer = setTimeout(() => backdrop.classList.remove('open'), 320);
  }

  function stepImage(dir) {
    const total = slides.length;
    currentIndex = (currentIndex + dir + total) % total;
    renderSlide(currentIndex);
    setFrameRect(targetRect(), true);
  }

  items.forEach((btn, i) => btn.addEventListener('click', () => openLightbox(i, btn)));
  closeBtn.addEventListener('click', () => closeLightbox());
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeLightbox(); });
  frame.addEventListener('click', (e) => e.stopPropagation());
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); stepImage(-1); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); stepImage(1); });

  document.addEventListener('keydown', (e) => {
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepImage(-1);
    if (e.key === 'ArrowRight') stepImage(1);
  });

  window.addEventListener('resize', () => {
    if (backdrop.classList.contains('active')) setFrameRect(targetRect(), true);
  });

  if (filmLeft) filmLeft.addEventListener('click', () => filmstrip.scrollBy({ left: -320, behavior: 'smooth' }));
  if (filmRight) filmRight.addEventListener('click', () => filmstrip.scrollBy({ left: 320, behavior: 'smooth' }));
})();
