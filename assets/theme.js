(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#SiteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    nav.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  document.querySelectorAll('[data-product-form]').forEach(form => {
    const variantSelect = form.querySelector('[data-variant-select]');
    if (variantSelect) {
      variantSelect.addEventListener('change', () => {
        const option = variantSelect.selectedOptions[0];
        const button = form.querySelector('[name="add"]');
        const price = document.querySelector('[data-product-price]');
        if (price && option.dataset.price) price.textContent = option.dataset.price;
        if (button) {
          button.disabled = option.dataset.available !== 'true';
          button.textContent = button.disabled ? 'Sold out' : 'Add to bag';
        }
      });
    }
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const button = form.querySelector('[name="add"]');
      const feedback = form.querySelector('.form-feedback');
      if (!button || button.disabled) return;
      const label = button.textContent;
      button.disabled = true;
      button.textContent = 'Adding…';
      if (feedback) feedback.textContent = '';
      try {
        const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
          method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.description || 'This item could not be added.');
        const cartResponse = await fetch(`${window.Shopify.routes.root}cart.js`, { headers: { Accept: 'application/json' } });
        const cart = await cartResponse.json();
        const count = document.querySelector('.bag-count');
        if (count) count.textContent = cart.item_count;
        const bag = document.querySelector('.bag-link');
        if (bag) bag.setAttribute('aria-label', `Shopping bag, ${cart.item_count} items`);
        if (feedback) feedback.textContent = 'Added to your bag.';
        button.textContent = 'Added';
      } catch (error) {
        if (feedback) feedback.textContent = error.message;
        button.textContent = label;
      } finally {
        button.disabled = false;
        window.setTimeout(() => { if (button.isConnected) button.textContent = label; }, 1800);
      }
    });
  });
})();
