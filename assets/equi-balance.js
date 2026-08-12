document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-mobile-nav]');
  const header = document.querySelector('[data-site-header]');
  const main = document.getElementById('MainContent');

  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    };

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // Mobile header: fixed in its own layer so it can smoothly slide out while
  // scrolling down and smoothly slide back down when scrolling up. The main
  // content receives an equal top offset so changing the transform never
  // causes the page itself to jump.
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const syncHeaderHeight = () => {
      if (window.matchMedia('(max-width: 980px)').matches) {
        document.documentElement.style.setProperty('--eb-mobile-header-height', `${header.offsetHeight}px`);
        if (main) main.classList.add('mobile-header-offset');
      } else if (main) {
        main.classList.remove('mobile-header-offset');
      }
    };

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.matchMedia('(max-width: 980px)').matches;

      if (!isMobile) {
        header.classList.remove('is-hidden');
        if (main) main.classList.remove('mobile-header-offset');
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      syncHeaderHeight();

      if (currentScrollY <= 10) {
        header.classList.remove('is-hidden');
      } else if (currentScrollY > lastScrollY + 3) {
        header.classList.add('is-hidden');
        if (nav) nav.classList.remove('is-open');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Open menu');
        }
      } else if (currentScrollY < lastScrollY - 3) {
        header.classList.remove('is-hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    syncHeaderHeight();
    updateHeader();

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      syncHeaderHeight();
      lastScrollY = window.scrollY;
      updateHeader();
    });
  }
});