document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-mobile-nav]');
  const header = document.querySelector('[data-site-header]');

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

  // Mobile header behaviour:
  // - stays naturally at the top of the page
  // - hides smoothly while scrolling down
  // - slides smoothly down into view as soon as the visitor scrolls back up
  // - never switches between sticky/fixed positioning, preventing page jumps
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.matchMedia('(max-width: 980px)').matches;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      if (!isMobile || currentScrollY <= 8) {
        header.classList.remove('is-hidden');
      } else if (scrollingDown && currentScrollY > 40) {
        header.classList.add('is-hidden');
        if (nav) nav.classList.remove('is-open');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Open menu');
        }
      } else if (scrollingUp) {
        header.classList.remove('is-hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      lastScrollY = window.scrollY;
      updateHeader();
    });

    updateHeader();
  }
});