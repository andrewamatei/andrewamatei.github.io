// script.js
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.sticky-nav') || document.querySelector('header nav');
  const navLinks = document.querySelectorAll('header nav a');
  const hero = document.getElementById('home');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const sections = document.querySelectorAll('main section[id]');

  const getOffset = () => (nav ? nav.offsetHeight : 0);

  // Smooth scrolling with sticky offset
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - getOffset();
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Sticky nav after hero
  const stickyPoint = hero ? hero.offsetHeight : 120;

  function onScroll() {
    // Stick the nav
    if (nav) {
      if (window.scrollY > stickyPoint) nav.classList.add('fixed-nav');
      else nav.classList.remove('fixed-nav');
    }

    // Back-to-top button
    if (backToTopBtn) backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';

    // Active nav link
    let current = null;
    const offset = getOffset() + 12;
    sections.forEach(sec => {
      const top = sec.offsetTop - offset;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(a => a.classList.remove('active'));
    if (current) {
      const active = document.querySelector(`header nav a[href="#${current}"]`);
      if (active) active.classList.add('active');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }
});
