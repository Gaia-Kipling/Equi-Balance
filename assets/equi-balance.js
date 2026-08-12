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

  if (header && main) {
    const updateHeader = () => {
      const shouldFix = window.scrollY > header.offsetTop + header.offsetHeight;
      header.classList.toggle('is-scrolling', shouldFix);
      if (shouldFix) {
        document.documentElement.style.setProperty('--eb-sticky-header-height', `${header.offsetHeight}px`);
        main.classList.add('has-sticky-header');
      } else {
        main.classList.remove('has-sticky-header');
      }
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
  }
});