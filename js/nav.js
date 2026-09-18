// Shared across all pages: mobile hamburger menu open/close.
(function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a, .btn-pill').forEach((el) => {
    el.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) mobileMenu.classList.remove('open');
  });
})();
