/* ==========================================================================
   MENVEL GOODS - Interactive JS Suite (PDP + Accordions + Swatches + Drawer)
   File: assets/menvel-luxury.js
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. Cart Drawer Controls ---
  window.openMenvelDrawer = function () {
    const overlay = document.getElementById('MenvelCartOverlay');
    const drawer = document.getElementById('MenvelCartDrawer');
    if (overlay && drawer) {
      overlay.classList.add('is-open');
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeMenvelDrawer = function () {
    const overlay = document.getElementById('MenvelCartOverlay');
    const drawer = document.getElementById('MenvelCartDrawer');
    if (overlay && drawer) {
      overlay.classList.remove('is-open');
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  // --- 2. Initialize Event Listeners on DOMContentLoaded ---
  document.addEventListener('DOMContentLoaded', function () {
    
    // Cart Drawer Click Handlers
    const overlay = document.getElementById('MenvelCartOverlay');
    const closeBtn = document.getElementById('MenvelCloseDrawer');
    if (overlay) overlay.addEventListener('click', window.closeMenvelDrawer);
    if (closeBtn) closeBtn.addEventListener('click', window.closeMenvelDrawer);

    // Mobile Navigation Drawer Handlers
    const navOverlay = document.getElementById('MenvelMobileNavOverlay');
    const navDrawer = document.getElementById('MenvelMobileNavDrawer');
    const navOpenBtn = document.getElementById('MenvelMobileNavOpen');
    const navCloseBtn = document.getElementById('MenvelMobileNavClose');

    window.openMenvelNav = function() {
      if (navOverlay && navDrawer) {
        navOverlay.classList.add('is-open');
        navDrawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    };

    window.closeMenvelNav = function() {
      if (navOverlay && navDrawer) {
        navOverlay.classList.remove('is-open');
        navDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    };

    if (navOpenBtn) navOpenBtn.addEventListener('click', window.openMenvelNav);
    if (navCloseBtn) navCloseBtn.addEventListener('click', window.closeMenvelNav);
    if (navOverlay) navOverlay.addEventListener('click', window.closeMenvelNav);

    document.querySelectorAll('.js-open-cart-drawer').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.openMenvelDrawer();
      });
    });

    // --- 3. PDP Thumbnail Gallery Switcher ---
    const pdpMainImg = document.getElementById('PDPMainImage');
    const pdpThumbs = document.querySelectorAll('.js-pdp-thumb');
    
    pdpThumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        const targetSrc = this.getAttribute('data-large-src');
        if (targetSrc && pdpMainImg) {
          pdpMainImg.src = targetSrc;
        }
        pdpThumbs.forEach(t => {
          t.classList.remove('is-active', 'border-[#191614]', 'border-2');
          t.classList.add('border-[#E8DFD5]', 'border');
        });
        this.classList.add('is-active', 'border-[#191614]', 'border-2');
        this.classList.remove('border-[#E8DFD5]');
      });
    });

    // --- 4. PDP Color Swatch Switcher (100% Mockup Match & Dynamic Variant Sync) ---
    const swatchBtns = document.querySelectorAll('.js-pdp-color-swatch');
    const colorLabel = document.getElementById('PDPActiveColorName');
    const skuLabel = document.getElementById('PDPSkuLabel');
    const variantIdInput = document.getElementById('PDPVariantIdInput');
    const priceDisplay = document.getElementById('PDPMainPrice');

    swatchBtns.forEach(function (swatch) {
      swatch.addEventListener('click', function () {
        const colorName = this.getAttribute('data-color-name');
        const targetImg = this.getAttribute('data-img-src');
        const sku = this.getAttribute('data-sku');
        const variantId = this.getAttribute('data-variant-id');
        const price = this.getAttribute('data-price');

        if (colorLabel) colorLabel.textContent = colorName;
        if (skuLabel && sku) skuLabel.textContent = sku;
        if (targetImg && pdpMainImg) pdpMainImg.src = targetImg;
        if (variantIdInput && variantId) variantIdInput.value = variantId;
        if (priceDisplay && price) priceDisplay.textContent = price;

        // Active border styling (Blue highlight as in mockup)
        swatchBtns.forEach(s => {
          s.classList.remove('is-active', 'border-[#1A56DB]', 'border-2');
          s.classList.add('border-[#D1D5DB]', 'border');
        });
        this.classList.add('is-active', 'border-[#1A56DB]', 'border-2');
        this.classList.remove('border-[#D1D5DB]');
      });
    });

    // --- 5. Homepage Hero Swatch Switcher ---
    const heroSwatches = document.querySelectorAll('.menvel-variant-card');
    const heroMainImg = document.getElementById('MenvelMainImage');
    const heroColorLabel = document.getElementById('SelectedColorLabel');

    heroSwatches.forEach(function (swatch) {
      swatch.addEventListener('click', function () {
        const variantName = this.getAttribute('data-variant-name');
        const variantImg = this.getAttribute('data-variant-img');

        if (heroColorLabel) heroColorLabel.textContent = variantName;
        if (heroMainImg && variantImg) heroMainImg.src = variantImg;

        heroSwatches.forEach(s => {
          s.classList.remove('is-selected', 'border-2', 'border-[#3A2213]');
          s.classList.add('border', 'border-[#E8DFD5]');
        });
        this.classList.add('is-selected', 'border-2', 'border-[#3A2213]');
        this.classList.remove('border-[#E8DFD5]');
      });
    });

    // --- 6. Quantity Stepper (+ / -) ---
    const qtyMinus = document.getElementById('PDPQtyMinus');
    const qtyPlus = document.getElementById('PDPQtyPlus');
    const qtyInput = document.getElementById('PDPQtyInput');

    if (qtyMinus && qtyPlus && qtyInput) {
      qtyMinus.addEventListener('click', function () {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) qtyInput.value = val - 1;
      });
      qtyPlus.addEventListener('click', function () {
        let val = parseInt(qtyInput.value, 10) || 1;
        qtyInput.value = val + 1;
      });
    }

    // --- 7. Collapsible Accordions (100% Mockup Match) ---
    const accordionHeaders = document.querySelectorAll('.js-pdp-accordion-header');

    accordionHeaders.forEach(function (header) {
      header.addEventListener('click', function () {
        const parent = this.parentElement;
        const content = parent.querySelector('.js-pdp-accordion-content');
        const icon = this.querySelector('svg');

        if (content) {
          const isHidden = content.classList.contains('hidden');
          if (isHidden) {
            content.classList.remove('hidden');
            if (icon) icon.classList.add('rotate-180');
          } else {
            content.classList.add('hidden');
            if (icon) icon.classList.remove('rotate-180');
          }
        }
      });
    });

    // --- 8. Live Shopify AJAX Add-to-Cart & Buy It Now ---
    const pdpForm = document.getElementById('PDPProductForm');
    const addToCartBtn = document.getElementById('PDPAddToCartBtn');
    const buyNowBtn = document.getElementById('PDPBuyNowBtn');

    if (pdpForm) {
      if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
          e.preventDefault();
          const formData = new FormData(pdpForm);
          
          fetch('/cart/add.js', {
            method: 'POST',
            body: formData
          })
          .then(res => res.json())
          .then(item => {
            // Update cart count
            fetch('/cart.js')
              .then(res => res.json())
              .then(cart => {
                document.querySelectorAll('.js-cart-count').forEach(el => {
                  el.textContent = cart.item_count;
                });
              })
              .catch(() => {});
            window.openMenvelDrawer();
          })
          .catch(err => {
            console.log('Cart add:', err);
            window.openMenvelDrawer();
          });
        });
      }

      if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function(e) {
          e.preventDefault();
          const formData = new FormData(pdpForm);
          fetch('/cart/add.js', {
            method: 'POST',
            body: formData
          })
          .then(() => {
            window.location.href = '/checkout';
          })
          .catch(() => {
            window.location.href = '/checkout';
          });
        });
      }
    }

  });
})();
