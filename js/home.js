// index.html only: Experience/Studies tab slider + scroll-spy nav highlighting.
(function () {
  const workTab = document.getElementById('workTab');
  const studiesTab = document.getElementById('studiesTab');
  const workCard = document.getElementById('workCard');
  const studiesCard = document.getElementById('studiesCard');
  const slider = document.getElementById('expSlider');

  function moveSlider(target) {
    slider.style.left = target.offsetLeft + 'px';
    slider.style.width = target.offsetWidth + 'px';
  }

  function setTab(tab) {
    const isWork = tab === 'work';
    workTab.classList.toggle('active', isWork);
    studiesTab.classList.toggle('active', !isWork);
    workCard.classList.toggle('active', isWork);
    studiesCard.classList.toggle('active', !isWork);
    moveSlider(isWork ? workTab : studiesTab);
  }

  workTab.addEventListener('click', () => setTab('work'));
  studiesTab.addEventListener('click', () => setTab('studies'));

  // Position the slider once layout is ready, and again on resize.
  requestAnimationFrame(() => moveSlider(workTab));
  window.addEventListener('resize', () => {
    moveSlider(workTab.classList.contains('active') ? workTab : studiesTab);
  });

  // Scroll-spy: highlight the nav link for the section currently in view.
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sectionIds = ['home', 'projects', 'contact'];

  function onScroll() {
    let current = 'home';
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 140) current = id;
    }
    const nearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 4);
    if (nearBottom) current = 'contact';
    navLinks.forEach((link) => link.classList.toggle('active', link.dataset.section === current));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
