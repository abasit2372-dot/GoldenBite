/**
 * Golden Bite Pizza Hut - Interactive Digital Menu & WhatsApp Engine
 * Mobile-First, Vanilla JS, Zero Backend Needed.
 */

(function () {
  'use strict';

  // State
  let cart = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let orderType = 'delivery'; // 'delivery' or 'takeaway'

  // Selected variants map: { [itemId]: { name: string, price: number } }
  const selectedVariants = {};

  // LocalStorage keys
  const LS_CART_KEY = 'goldenbite_cart_v1';
  const LS_CUST_KEY = 'goldenbite_cust_v1';
  const LS_ORDERS_KEY = 'goldenbite_orders_history_v1';

  // DOM Elements
  const appViewport = document.getElementById('appViewport');
  const phoneScreenBody = document.getElementById('phoneScreenBody');
  const menuFeed = document.getElementById('menuFeed');
  const categoryNav = document.getElementById('categoryNav');
  const btnCatScrollLeft = document.getElementById('btnCatScrollLeft');
  const btnCatScrollRight = document.getElementById('btnCatScrollRight');
  const fadeCatLeft = document.getElementById('fadeCatLeft');
  const fadeCatRight = document.getElementById('fadeCatRight');
  const menuSearchInput = document.getElementById('menuSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');

  // Floating Cart Bar Elements
  const floatingCartBar = document.getElementById('floatingCartBar');
  const cartCountPill = document.getElementById('cartCountPill');
  const cartBarTotal = document.getElementById('cartBarTotal');
  const btnOpenCart = document.getElementById('btnOpenCart');
  const cartBarInfoBtn = document.getElementById('cartBarInfoBtn');

  // Checkout Sheet Elements
  const cartDrawerBackdrop = document.getElementById('cartDrawerBackdrop');
  const cartSheet = document.getElementById('cartSheet');
  const btnCloseCart = document.getElementById('btnCloseCart');
  const cartItemsList = document.getElementById('cartItemsList');
  const billSubtotal = document.getElementById('billSubtotal');
  const billGrandTotal = document.getElementById('billGrandTotal');
  const btnSubmitWhatsAppOrder = document.getElementById('btnSubmitWhatsAppOrder');
  const btnWhatsAppText = document.getElementById('btnWhatsAppText');

  // Location Selector Elements
  const tabAutoLoc = document.getElementById('tabAutoLoc');
  const tabManualLoc = document.getElementById('tabManualLoc');
  const autoLocPanel = document.getElementById('autoLocPanel');
  const manualLocPanel = document.getElementById('manualLocPanel');
  const btnAutoDetectGps = document.getElementById('btnAutoDetectGps');
  const autoDetectGpsBtnText = document.getElementById('autoDetectGpsBtnText');
  const gpsResultCard = document.getElementById('gpsResultCard');
  const gpsCoordsDisplay = document.getElementById('gpsCoordsDisplay');
  const gpsExtraStreet = document.getElementById('gpsExtraStreet');
  const btnReDetectGps = document.getElementById('btnReDetectGps');
  const custManualAddress = document.getElementById('custManualAddress');

  let locationMode = 'auto'; // 'auto' or 'manual'
  let capturedGpsLocation = null; // { lat, lng, mapUrl }

  // Modals & Header
  const headerCallBtn = document.getElementById('headerCallBtn');
  const callModalOverlay = document.getElementById('callModalOverlay');
  const btnCloseCallModal = document.getElementById('btnCloseCallModal');

  // Page Views
  const menuPageView = document.getElementById('menuPageView');

  // Status
  const liveStatusDot = document.getElementById('liveStatusDot');
  const liveStatusText = document.getElementById('liveStatusText');

  // Toast
  const toastMsg = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');
  const toastIcon = document.getElementById('toastIcon');
  let toastTimer = null;

  // Initialize Application
  function init() {
    loadSavedCustomerInfo();
    loadCartFromStorage();
    checkLiveStoreStatus();
    initHeroCarousel();
    renderCategoryNav();
    initCategoryScrollArrows();
    renderMenuFeed();
    updateCartUI();
    setupEventListeners();
    initDesktopShowcase();
  }

  // Check store timing (2:00 PM to 2:00 AM)
  function checkLiveStoreStatus() {
    const now = new Date();
    const hours = now.getHours(); // 0 to 23
    // Open between 14:00 (2 PM) and 02:00 (2 AM)
    const isOpen = (hours >= 14 || hours < 2);

    if (isOpen) {
      liveStatusDot.className = 'status-dot open';
      liveStatusText.textContent = 'Open Now • 2 PM - 2 AM';
    } else {
      liveStatusDot.className = 'status-dot closed';
      liveStatusText.textContent = 'Opens at 2:00 PM';
    }
  }

  // Category SVG Icons Definition
  const CATEGORY_SVGS = {
    all: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>`,
    deals: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 3 4 4.5 4 8a6 6 0 1 1-12 0c0-3.5 3-5 4-8 1 2 2 3 4 0z"></path></svg>`,
    'regular-pizza': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"></path></svg>`,
    'special-pizza': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    'square-pizza': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
    burgers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11c0-4 4-7 9-7s9 3 9 7H3z"></path><rect x="2" y="14" width="20" height="3" rx="1.5"></rect><path d="M4 20h16c0 1.5-2 2-8 2s-8-.5-8-2z"></path></svg>`,
    shawarma: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path><line x1="3" y1="14" x2="21" y2="14"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    pasta: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11a9 9 0 0 0 18 0H3z"></path><path d="M12 2v4M8 3v3M16 3v3"></path></svg>`,
    sides: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 8 7 21 17 21 19 8 5 8"></polygon><line x1="8" y1="8" x2="8" y2="3"></line><line x1="12" y1="8" x2="12" y2="2"></line><line x1="16" y1="8" x2="16" y2="3"></line></svg>`,
    beverages: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l-1.5 15a3 3 0 0 1-3 2.7h-3a3 3 0 0 1-3-2.7L6 3z"></path><line x1="4" y1="3" x2="20" y2="3"></line></svg>`
  };

  function getCategorySvg(catId, size = 14) {
    const raw = CATEGORY_SVGS[catId] || CATEGORY_SVGS.all;
    return raw.replace('<svg ', `<svg width="${size}" height="${size}" `);
  }

  // Toast Icons (Professional SVGs instead of emojis)
  const TOAST_ICONS = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    cart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    remove: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF4D4F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    location: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    alert: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
  };

  // Toast Feedback
  function showToast(message, type = 'success') {
    if (toastTimer) clearTimeout(toastTimer);
    if (toastIcon) {
      toastIcon.innerHTML = TOAST_ICONS[type] || TOAST_ICONS.info;
    }
    toastText.textContent = message;
    toastMsg.classList.add('show');
    toastTimer = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 2800);
  }

  // Render Categories in Sticky Nav
  function renderCategoryNav() {
    let html = `
      <button class="cat-pill ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">
        <span class="cat-pill-icon">${getCategorySvg('all', 13)}</span>
        <span>All Items</span>
      </button>
    `;

    CATEGORIES.forEach(cat => {
      const activeClass = currentCategory === cat.id ? 'active' : '';
      html += `
        <button class="cat-pill ${activeClass}" data-cat="${cat.id}">
          <span class="cat-pill-icon">${getCategorySvg(cat.id, 13)}</span>
          <span>${cat.name}</span>
        </button>
      `;
    });

    categoryNav.innerHTML = html;

    // Attach click events
    categoryNav.querySelectorAll('.cat-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const cat = btn.getAttribute('data-cat');
        currentCategory = cat;
        categoryNav.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Center the selected category pill horizontally inside categoryNav with zero ancestor jumping
        try {
          const navRect = categoryNav.getBoundingClientRect();
          const btnRect = btn.getBoundingClientRect();
          const scrollDelta = (btnRect.left + btnRect.width / 2) - (navRect.left + navRect.width / 2);
          categoryNav.scrollBy({ left: scrollDelta, behavior: 'smooth' });
        } catch (err) {}

        renderMenuFeed();

        // Smoothly scroll the app viewport back to top to view category header and items
        if (appViewport) {
          appViewport.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (phoneScreenBody) {
          phoneScreenBody.scrollTop = 0;
        }

        setTimeout(updateCategoryArrowsState, 150);
      });
    });

    setTimeout(updateCategoryArrowsState, 60);
  }

  // Left & Right Slider Arrow Buttons for Categories
  function initHeroCarousel() {
    const heroSliderWrapper = document.getElementById('heroSliderWrapper');
    const heroSlidesTrack = document.getElementById('heroSlidesTrack');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const btnHeroPrev = document.getElementById('btnHeroPrev');
    const btnHeroNext = document.getElementById('btnHeroNext');
    const heroActionTriggers = document.querySelectorAll('.hero-action-trigger');

    if (!heroSliderWrapper || !heroSlidesTrack || heroSlides.length <= 1) return;

    let currentHeroSlide = 0;
    const totalSlides = heroSlides.length;
    let autoSlideTimer = null;
    const SLIDE_INTERVAL = 4000;

    function goToSlide(index, restartTimer = true) {
      currentHeroSlide = (index + totalSlides) % totalSlides;
      heroSlidesTrack.style.transform = `translateX(-${currentHeroSlide * 100}%)`;

      heroSlides.forEach((slide, idx) => {
        if (idx === currentHeroSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      heroDots.forEach((dot, idx) => {
        const progressEl = dot.querySelector('.dot-progress');
        if (idx === currentHeroSlide) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
          if (progressEl) {
            progressEl.style.animation = 'none';
            void progressEl.offsetWidth; // Force reflow to restart CSS animation cleanly
            progressEl.style.animation = '';
          }
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
          if (progressEl) {
            progressEl.style.animation = 'none';
          }
        }
      });

      if (restartTimer) {
        resetAutoSlideTimer();
      }
    }

    function nextHeroSlide() {
      goToSlide(currentHeroSlide + 1);
    }

    function prevHeroSlide() {
      goToSlide(currentHeroSlide - 1);
    }

    function startAutoSlideTimer() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(nextHeroSlide, SLIDE_INTERVAL);
    }

    function stopAutoSlideTimer() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function resetAutoSlideTimer() {
      stopAutoSlideTimer();
      startAutoSlideTimer();
    }

    // Dot navigation
    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(idx);
      });
    });

    // Arrow navigation
    if (btnHeroPrev) {
      btnHeroPrev.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevHeroSlide();
      });
    }

    if (btnHeroNext) {
      btnHeroNext.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextHeroSlide();
      });
    }

    // Pause on hover
    heroSliderWrapper.addEventListener('mouseenter', () => {
      heroSliderWrapper.classList.add('is-paused');
      stopAutoSlideTimer();
    });

    heroSliderWrapper.addEventListener('mouseleave', () => {
      heroSliderWrapper.classList.remove('is-paused');
      startAutoSlideTimer();
    });

    // Touch swipe gestures (with vertical scroll preservation)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let isSwiping = false;

    heroSliderWrapper.addEventListener('touchstart', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchEndX = touchStartX;
      touchEndY = touchStartY;
      isSwiping = true;
      heroSliderWrapper.classList.add('is-paused');
      stopAutoSlideTimer();
    }, { passive: true });

    heroSliderWrapper.addEventListener('touchmove', (e) => {
      if (!isSwiping || !e.touches || e.touches.length === 0) return;
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    }, { passive: true });

    heroSliderWrapper.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      heroSliderWrapper.classList.remove('is-paused');

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          nextHeroSlide();
        } else {
          prevHeroSlide();
        }
      } else {
        startAutoSlideTimer();
      }
    }, { passive: true });

    // Interactive category trigger from hero banner
    heroActionTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const cat = trigger.getAttribute('data-category');
        if (cat && categoryNav) {
          const pill = categoryNav.querySelector(`.cat-pill[data-cat="${cat}"]`);
          if (pill) {
            pill.click();
          }
        }
      });
    });

    // Initial state & start timer
    goToSlide(0, false);
    startAutoSlideTimer();
  }

  // Left & Right Slider Arrow Buttons for Categories
  function initCategoryScrollArrows() {
    if (!categoryNav || !btnCatScrollLeft || !btnCatScrollRight) return;

    btnCatScrollLeft.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      categoryNav.scrollBy({ left: -160, behavior: 'smooth' });
    });

    btnCatScrollRight.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      categoryNav.scrollBy({ left: 160, behavior: 'smooth' });
    });

    categoryNav.addEventListener('scroll', updateCategoryArrowsState, { passive: true });
    window.addEventListener('resize', updateCategoryArrowsState);
    updateCategoryArrowsState();
  }

  function updateCategoryArrowsState() {
    if (!categoryNav) return;
    const scrollLeft = categoryNav.scrollLeft;
    const maxScroll = Math.max(0, categoryNav.scrollWidth - categoryNav.clientWidth);

    const isLeftDisabled = scrollLeft <= 6;
    const isRightDisabled = scrollLeft >= maxScroll - 6 || maxScroll <= 0;

    if (fadeCatLeft) {
      if (isLeftDisabled) fadeCatLeft.classList.add('disabled');
      else fadeCatLeft.classList.remove('disabled');
    }
    if (btnCatScrollLeft) {
      if (isLeftDisabled) btnCatScrollLeft.classList.add('disabled');
      else btnCatScrollLeft.classList.remove('disabled');
    }

    if (fadeCatRight) {
      if (isRightDisabled) fadeCatRight.classList.add('disabled');
      else fadeCatRight.classList.remove('disabled');
    }
    if (btnCatScrollRight) {
      if (isRightDisabled) btnCatScrollRight.classList.add('disabled');
      else btnCatScrollRight.classList.remove('disabled');
    }
  }

  // Filter items
  function getFilteredItems() {
    let items = MENU_ITEMS;

    if (currentCategory !== 'all') {
      items = items.filter(item => item.category === currentCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(item => {
        const inName = item.name.toLowerCase().includes(q);
        const inDesc = item.description && item.description.toLowerCase().includes(q);
        const inItems = item.items && item.items.some(sub => sub.toLowerCase().includes(q));
        return inName || inDesc || inItems;
      });
    }

    return items;
  }

  // Render Menu Feed
  function renderMenuFeed() {
    const items = getFilteredItems();

    if (items.length === 0) {
      menuFeed.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <div style="margin-bottom: 12px; color: var(--color-primary); display: flex; justify-content: center;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 style="color: #FFF; font-size: 1.1rem; margin-bottom: 4px;">No items match "${searchQuery}"</h3>
          <p style="font-size: 0.8rem;">Try searching for pizza, zinger, shawarma, deal or pasta.</p>
        </div>
      `;
      return;
    }

    // Group items by category to display clean headings
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    let html = '';

    CATEGORIES.forEach(cat => {
      if (!grouped[cat.id] || grouped[cat.id].length === 0) return;

      const categoryItems = grouped[cat.id];

      html += `
        <section id="section-${cat.id}">
          <div class="section-title-wrap">
            <h2 class="section-title">
              <span class="section-icon">${getCategorySvg(cat.id, 16)}</span>
              <span>${cat.name}</span>
            </h2>
            <span class="section-count">${categoryItems.length} items</span>
          </div>
          <div class="items-list-vertical">
      `;

      categoryItems.forEach(item => {
        const hasVariants = item.variants && item.variants.length > 0;
        let currentVariant = null;
        let currentPrice = item.price;

        if (hasVariants) {
          // Check if variant already selected in state, else default to first base variant
          if (!selectedVariants[item.id]) {
            selectedVariants[item.id] = item.variants[0];
          }
          currentVariant = selectedVariants[item.id];
          currentPrice = currentVariant.price;
        }

        const cartKey = hasVariants ? `${item.id}-${currentVariant.name}` : item.id;
        const cartItem = cart.find(ci => ci.key === cartKey);
        const currentQty = cartItem ? cartItem.qty : 0;
        const isDeal = item.category === 'deals' || (Array.isArray(item.items) && item.items.length > 0);

        html += `
          <article class="item-card ${isDeal ? 'deal-item-card' : ''}" data-id="${item.id}">
            <div class="item-img-box">
              <img src="${item.image}" alt="${item.name}" class="item-img" loading="lazy" onerror="this.onerror=null; this.src='assets/images/pizza.jpg';">
              ${item.badge ? `<span class="item-badge-pill">${item.badge}</span>` : ''}
            </div>
            <div class="item-content">
              <div class="item-header">
                <h3 class="item-title">${item.name}</h3>
              </div>
              ${isDeal && item.items && item.items.length > 0 ? `
                <ul class="item-deal-bullets">
                  ${item.items.map(subItem => `<li>${subItem}</li>`).join('')}
                </ul>
              ` : `
                <p class="item-desc">${item.description}</p>
              `}

              ${hasVariants ? `
                <div class="item-variants-pills" data-item-id="${item.id}">
                  ${item.variants.map(v => `
                    <button class="variant-btn ${currentVariant.name === v.name ? 'active' : ''}" 
                            data-variant-name="${v.name}" 
                            data-variant-price="${v.price}">
                      ${v.name}
                    </button>
                  `).join('')}
                </div>
              ` : ''}

              <div class="item-bottom-row">
                <span class="item-price" id="price-display-${item.id}">Rs. ${currentPrice.toLocaleString()}</span>
                <div class="item-action-box" id="action-box-${item.id}">
                  ${renderCardAction(item.id, item.name, currentVariant ? currentVariant.name : null, currentPrice, currentQty)}
                </div>
              </div>
            </div>
          </article>
        `;
      });

      html += `
          </div>
        </section>
      `;
    });

    menuFeed.innerHTML = html;
    attachCardListeners();
  }

  // Render Action Button or Stepper
  function renderCardAction(itemId, itemName, variantName, price, qty) {
    const cartKey = variantName ? `${itemId}-${variantName}` : itemId;
    if (qty > 0) {
      return `
        <div class="qty-stepper" data-key="${cartKey}">
          <button class="stepper-btn btn-dec" data-key="${cartKey}" aria-label="Decrease quantity">−</button>
          <span class="stepper-val">${qty}</span>
          <button class="stepper-btn btn-inc" data-key="${cartKey}" aria-label="Increase quantity">+</button>
        </div>
      `;
    } else {
      return `
        <button class="btn-add-cart" 
                data-item-id="${itemId}" 
                data-variant="${variantName || ''}" 
                data-price="${price}">
          <span class="plus-icon">+</span>
          <span>ADD</span>
        </button>
      `;
    }
  }

  // Attach Listeners to Item Cards
  function attachCardListeners() {
    // 1. Variant selection buttons
    menuFeed.querySelectorAll('.variant-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const container = btn.closest('.item-variants-pills');
        const itemId = container.getAttribute('data-item-id');
        const variantName = btn.getAttribute('data-variant-name');
        const variantPrice = parseInt(btn.getAttribute('data-variant-price'), 10);

        container.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        selectedVariants[itemId] = { name: variantName, price: variantPrice };

        // Update price display
        const priceDisplay = document.getElementById(`price-display-${itemId}`);
        if (priceDisplay) {
          priceDisplay.textContent = `Rs. ${variantPrice.toLocaleString()}`;
        }

        // Update action button for this newly selected variant
        const actionBox = document.getElementById(`action-box-${itemId}`);
        if (actionBox) {
          const item = MENU_ITEMS.find(i => i.id === itemId);
          const cartKey = `${itemId}-${variantName}`;
          const inCart = cart.find(ci => ci.key === cartKey);
          const qty = inCart ? inCart.qty : 0;
          actionBox.innerHTML = renderCardAction(itemId, item.name, variantName, variantPrice, qty);
          attachActionBoxListeners(actionBox);
        }
      });
    });

    // 2. Add to cart & stepper buttons
    menuFeed.querySelectorAll('.item-action-box, .deal-action-box').forEach(box => {
      attachActionBoxListeners(box);
    });
  }

  // Attach Action Box Listeners
  function attachActionBoxListeners(box) {
    const addBtn = box.querySelector('.btn-add-cart');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const itemId = addBtn.getAttribute('data-item-id');
        const variantName = addBtn.getAttribute('data-variant') || null;
        const item = MENU_ITEMS.find(i => i.id === itemId);
        if (!item) return;

        let price = item.price;
        if (variantName && selectedVariants[itemId]) {
          price = selectedVariants[itemId].price;
        }

        addToCart(item, variantName, price);
        vibrate(30);
      });
    }

    const decBtn = box.querySelector('.btn-dec');
    if (decBtn) {
      decBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = decBtn.getAttribute('data-key');
        updateCartQty(key, -1);
        vibrate(20);
      });
    }

    const incBtn = box.querySelector('.btn-inc');
    if (incBtn) {
      incBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = incBtn.getAttribute('data-key');
        updateCartQty(key, 1);
        vibrate(20);
      });
    }
  }

  // Haptic feedback helper
  function vibrate(ms = 30) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch (e) {
        // Ignore vibration errors
      }
    }
  }

  // Cart operations
  function addToCart(item, variantName, price) {
    const cartKey = variantName ? `${item.id}-${variantName}` : item.id;
    const existing = cart.find(ci => ci.key === cartKey);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        key: cartKey,
        id: item.id,
        name: item.name,
        variantName: variantName,
        price: price,
        qty: 1,
        image: item.image,
        description: item.description
      });
    }

    saveCartToStorage();
    updateCartUI();
    renderMenuFeed(); // refresh steppers
    showToast(`Added: ${item.name} ${variantName ? `(${variantName})` : ''}`, 'cart');
  }

  function updateCartQty(key, delta) {
    const itemIndex = cart.findIndex(ci => ci.key === key);
    if (itemIndex === -1) return;

    cart[itemIndex].qty += delta;

    if (cart[itemIndex].qty <= 0) {
      cart.splice(itemIndex, 1);
    }

    saveCartToStorage();
    updateCartUI();
    renderMenuFeed(); // refresh steppers
  }

  function removeCartItem(key) {
    cart = cart.filter(ci => ci.key !== key);
    saveCartToStorage();
    updateCartUI();
    renderMenuFeed();
    showToast('Item removed from order', 'remove');
  }

  // Update Cart Badge, Totals & Sheet
  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update bottom bar
    cartCountPill.textContent = totalCount;
    cartBarTotal.textContent = `Rs. ${subtotal.toLocaleString()}`;

    if (totalCount > 0) {
      floatingCartBar.classList.add('visible');
    } else {
      floatingCartBar.classList.remove('visible');
      closeCartSheet();
    }

    // Update Checkout Sheet Bill
    billSubtotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
    billGrandTotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
    btnWhatsAppText.textContent = `Order via WhatsApp • Rs. ${subtotal.toLocaleString()}`;

    // Render items inside Checkout Sheet
    renderCartSheetItems();
  }

  function renderCartSheetItems() {
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted);">
          Your cart is empty. Add delicious deals from the menu!
        </div>
      `;
      return;
    }

    let html = '';
    cart.forEach(item => {
      const itemSubtotal = item.price * item.qty;
      const itemImg = item.image || (MENU_ITEMS.find(m => m.id === item.id)?.image) || 'assets/images/pizza.jpg';
      html += `
        <div class="cart-item-row" data-key="${item.key}">
          <img src="${itemImg}" alt="${item.name}" class="cart-item-thumb" onerror="this.src='assets/images/pizza.jpg'">
          <div class="cart-item-body">
            <div class="cart-item-top-row">
              <div class="cart-item-name-group">
                <span class="cart-item-name">${item.name}</span>
                ${item.variantName ? `<span class="cart-item-variant">${item.variantName}</span>` : ''}
              </div>
              <button class="btn-remove-item" data-key="${item.key}" title="Delete item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="cart-item-bottom-row">
              <div class="cart-item-price-col">
                <span class="cart-item-subtotal">Rs. ${itemSubtotal.toLocaleString()}</span>
                <span class="cart-item-unit-price">Rs. ${item.price.toLocaleString()} each</span>
              </div>
              <div class="qty-stepper cart-sheet-stepper">
                <button class="stepper-btn sheet-btn-dec" data-key="${item.key}">−</button>
                <span class="stepper-val">${item.qty}</span>
                <button class="stepper-btn sheet-btn-inc" data-key="${item.key}">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    cartItemsList.innerHTML = html;

    // Attach listeners in sheet
    cartItemsList.querySelectorAll('.sheet-btn-dec').forEach(btn => {
      btn.addEventListener('click', () => {
        updateCartQty(btn.getAttribute('data-key'), -1);
      });
    });

    cartItemsList.querySelectorAll('.sheet-btn-inc').forEach(btn => {
      btn.addEventListener('click', () => {
        updateCartQty(btn.getAttribute('data-key'), 1);
      });
    });

    cartItemsList.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        removeCartItem(btn.getAttribute('data-key'));
      });
    });
  }

  // Open & Close Checkout Sheet
  function openCartSheet() {
    if (cart.length === 0) {
      showToast('Please add items to cart first', 'cart');
      return;
    }
    cartDrawerBackdrop.classList.add('active');
    cartSheet.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (appViewport) appViewport.style.overflow = 'hidden';
  }

  function closeCartSheet() {
    cartDrawerBackdrop.classList.remove('active');
    cartSheet.classList.remove('active');
    document.body.style.overflow = '';
    if (appViewport) appViewport.style.overflow = '';
  }

  // LocalStorage Persist
  function saveCartToStorage() {
    try {
      localStorage.setItem(LS_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      // Ignore storage errors
    }
  }

  function loadCartFromStorage() {
    try {
      const data = localStorage.getItem(LS_CART_KEY);
      if (data) {
        cart = JSON.parse(data);
      }
    } catch (e) {
      cart = [];
    }
  }

  function saveCustomerInfo() {
    // Delivery location is never persisted across orders so every order uses fresh location!
  }

  function loadSavedCustomerInfo() {
    resetLocationState();
  }

  // Reset Location State so that every order requires fresh location detection
  function resetLocationState() {
    capturedGpsLocation = null;
    if (gpsCoordsDisplay) gpsCoordsDisplay.textContent = '';
    if (gpsResultCard) gpsResultCard.style.display = 'none';
    if (gpsExtraStreet) gpsExtraStreet.value = '';
    if (custManualAddress) custManualAddress.value = '';
    if (btnAutoDetectGps) {
      btnAutoDetectGps.classList.remove('success', 'loading');
    }
    if (autoDetectGpsBtnText) {
      autoDetectGpsBtnText.textContent = 'Auto-Detect My Location (GPS)';
    }
    switchToAutoLocation();
  }

  // Location Mode Switchers
  function switchToAutoLocation() {
    locationMode = 'auto';
    tabAutoLoc.classList.add('active');
    tabAutoLoc.setAttribute('aria-selected', 'true');
    tabManualLoc.classList.remove('active');
    tabManualLoc.setAttribute('aria-selected', 'false');
    autoLocPanel.style.display = 'flex';
    manualLocPanel.style.display = 'none';
  }

  function switchToManualLocation(shouldFocus = false) {
    locationMode = 'manual';
    tabManualLoc.classList.add('active');
    tabManualLoc.setAttribute('aria-selected', 'true');
    tabAutoLoc.classList.remove('active');
    tabAutoLoc.setAttribute('aria-selected', 'false');
    autoLocPanel.style.display = 'none';
    manualLocPanel.style.display = 'flex';
    if (shouldFocus && custManualAddress) {
      custManualAddress.focus();
    }
  }

  // Auto GPS Location detection (Forces fresh, uncached real-time coordinates)
  function handleAutoDetectGps() {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'alert');
      switchToManualLocation(true);
      return;
    }

    btnAutoDetectGps.classList.remove('success');
    btnAutoDetectGps.classList.add('loading');
    autoDetectGpsBtnText.textContent = 'Detecting Real-Time GPS...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
        capturedGpsLocation = { lat, lng, mapUrl };

        btnAutoDetectGps.classList.remove('loading');
        btnAutoDetectGps.classList.add('success');
        autoDetectGpsBtnText.textContent = 'Location Captured (GPS Active)';
        gpsCoordsDisplay.textContent = mapUrl;
        gpsResultCard.style.display = 'flex';

        showToast('Real-time location captured', 'location');
        vibrate(40);
      },
      (error) => {
        btnAutoDetectGps.classList.remove('loading');
        autoDetectGpsBtnText.textContent = 'Auto-Detect My Location (GPS)';
        let msg = 'Could not fetch GPS. Please enter your address manually.';
        if (error.code === 1) msg = 'Location access denied. Please enter your address manually.';
        showToast(msg, 'alert');
        switchToManualLocation(true);
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
    );
  }

  // Format and Send WhatsApp Order (Delivery Only, No Name/Phone/Notes asked)
  function handleSendWhatsAppOrder() {
    if (cart.length === 0) {
      showToast('Your cart is empty', 'alert');
      return;
    }

    // Location Handling - Always Fresh for Every Order!
    if (locationMode === 'auto') {
      // If user already clicked "Auto-Detect My Location" during this order session, use it
      if (capturedGpsLocation && capturedGpsLocation.mapUrl) {
        const extra = gpsExtraStreet ? gpsExtraStreet.value.trim() : '';
        const locationText = extra ? `${extra} (GPS: ${capturedGpsLocation.mapUrl})` : capturedGpsLocation.mapUrl;
        dispatchWhatsAppOrder(locationText);
        return;
      }

      // If not captured yet, automatically fetch fresh GPS location right now!
      if (!navigator.geolocation) {
        showToast('Geolocation is not supported. Please enter address manually.', 'alert');
        switchToManualLocation(true);
        return;
      }

      const originalWaText = btnWhatsAppText.textContent;
      btnWhatsAppText.textContent = 'Fetching Live Location...';
      btnSubmitWhatsAppOrder.disabled = true;

      btnAutoDetectGps.classList.remove('success');
      btnAutoDetectGps.classList.add('loading');
      autoDetectGpsBtnText.textContent = 'Updating Live GPS Location...';

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
          capturedGpsLocation = { lat, lng, mapUrl };

          btnAutoDetectGps.classList.remove('loading');
          btnAutoDetectGps.classList.add('success');
          autoDetectGpsBtnText.textContent = 'Location Captured (GPS Active)';
          gpsCoordsDisplay.textContent = mapUrl;
          gpsResultCard.style.display = 'flex';

          btnSubmitWhatsAppOrder.disabled = false;
          btnWhatsAppText.textContent = originalWaText;

          vibrate(40);

          const extra = gpsExtraStreet ? gpsExtraStreet.value.trim() : '';
          const locationText = extra ? `${extra} (GPS: ${mapUrl})` : mapUrl;
          dispatchWhatsAppOrder(locationText);
        },
        (error) => {
          btnSubmitWhatsAppOrder.disabled = false;
          btnWhatsAppText.textContent = originalWaText;
          btnAutoDetectGps.classList.remove('loading');
          autoDetectGpsBtnText.textContent = 'Auto-Detect My Location (GPS)';

          let msg = 'Could not access GPS. Please enter your delivery address manually.';
          if (error.code === 1) msg = 'Location access denied. Please enter your address manually.';
          showToast(msg, 'alert');
          switchToManualLocation(true);
        },
        { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      // Manual Location Mode
      const manualAddr = custManualAddress ? custManualAddress.value.trim() : '';
      if (!manualAddr) {
        if (custManualAddress) custManualAddress.focus();
        showToast('Please enter your delivery address / street', 'alert');
        return;
      }
      dispatchWhatsAppOrder(manualAddr);
    }
  }

  // Final WhatsApp Dispatch
  function dispatchWhatsAppOrder(locationText) {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const now = new Date();
    const timeStr = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Build Clean Emoji-Free WhatsApp Message
    let msg = `*NEW ORDER - ${RESTAURANT_INFO.name.toUpperCase()}*\n`;
    msg += `================================\n`;
    msg += `*Order Type:* Home Delivery (FREE)\n`;
    msg += `*Delivery Location:* ${locationText}\n`;
    msg += `--------------------------------\n`;
    msg += `*ORDER ITEMS:*\n`;

    cart.forEach((item, index) => {
      const variantText = item.variantName ? ` [${item.variantName}]` : '';
      const lineTotal = item.price * item.qty;
      msg += `${index + 1}. *${item.name}*${variantText}\n`;
      msg += `   Qty: ${item.qty} x Rs. ${item.price.toLocaleString()} = *Rs. ${lineTotal.toLocaleString()}*\n`;
      
      const origItem = MENU_ITEMS.find(m => m.id === item.id);
      if (origItem && origItem.items) {
        msg += `   (${origItem.items.join(', ')})\n`;
      }
    });

    msg += `--------------------------------\n`;
    msg += `*Total Items:* ${totalQty}\n`;
    msg += `*Delivery Charges:* FREE\n`;
    msg += `*TOTAL PAYABLE: Rs. ${subtotal.toLocaleString()}/-*\n`;
    msg += `*Payment Mode:* Cash on Delivery\n`;
    msg += `================================\n`;
    msg += `*Order Time:* ${timeStr}\n`;
    msg += `*Branch:* ${RESTAURANT_INFO.address}\n`;
    if (RESTAURANT_INFO.googleMapsUrl) {
      msg += `*Google Maps:* ${RESTAURANT_INFO.googleMapsUrl}\n`;
    }
    msg += `Sent via Golden Bite Digital Menu`;

    // Open WhatsApp to send the order
    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMsg}`;

    vibrate(60);
    window.open(waUrl, '_blank');

    // Clear Cart & Reset Location for next order
    cart = [];
    saveCartToStorage();
    updateCartUI();
    renderMenuFeed();
    closeCartSheet();

    // Reset location so next order freshly captures current location
    resetLocationState();

    showToast('Order sent to WhatsApp! Thank you.', 'success');
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // Search input
    menuSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      searchClearBtn.style.display = searchQuery ? 'block' : 'none';
      renderMenuFeed();
    });

    searchClearBtn.addEventListener('click', () => {
      menuSearchInput.value = '';
      searchQuery = '';
      searchClearBtn.style.display = 'none';
      renderMenuFeed();
    });

    // Cart Floating Bar trigger
    btnOpenCart.addEventListener('click', openCartSheet);
    cartBarInfoBtn.addEventListener('click', openCartSheet);
    btnCloseCart.addEventListener('click', closeCartSheet);
    cartDrawerBackdrop.addEventListener('click', closeCartSheet);

    // Tap toast to dismiss immediately
    if (toastMsg) {
      toastMsg.addEventListener('click', () => {
        if (toastTimer) clearTimeout(toastTimer);
        toastMsg.classList.remove('show');
      });
    }

    // Location Mode Tabs & GPS Detection
    if (tabAutoLoc) tabAutoLoc.addEventListener('click', switchToAutoLocation);
    if (tabManualLoc) tabManualLoc.addEventListener('click', () => switchToManualLocation(true));
    if (btnAutoDetectGps) btnAutoDetectGps.addEventListener('click', handleAutoDetectGps);
    if (btnReDetectGps) btnReDetectGps.addEventListener('click', handleAutoDetectGps);

    // Auto-save form inputs on change
    [custManualAddress, gpsExtraStreet].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', saveCustomerInfo);
        inp.addEventListener('change', saveCustomerInfo);
      }
    });

    // WhatsApp Submit Order
    if (btnSubmitWhatsAppOrder) {
      btnSubmitWhatsAppOrder.addEventListener('click', handleSendWhatsAppOrder);
    }

    // Call Modal
    if (headerCallBtn) {
      headerCallBtn.addEventListener('click', () => {
        callModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (appViewport) appViewport.style.overflow = 'hidden';
      });
    }

    const chipCalling = document.getElementById('chipCalling');
    if (chipCalling) {
      chipCalling.addEventListener('click', () => {
        callModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (appViewport) appViewport.style.overflow = 'hidden';
      });
    }

    if (btnCloseCallModal) {
      btnCloseCallModal.addEventListener('click', () => {
        callModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (appViewport) appViewport.style.overflow = '';
      });
    }

    if (callModalOverlay) {
      callModalOverlay.addEventListener('click', (e) => {
        if (e.target === callModalOverlay) {
          callModalOverlay.classList.remove('active');
          document.body.style.overflow = '';
          if (appViewport) appViewport.style.overflow = '';
        }
      });
    }

    // Chip WhatsApp Direct Click
    const chipWhatsApp = document.getElementById('chipWhatsApp');
    if (chipWhatsApp) {
      chipWhatsApp.addEventListener('click', () => {
        window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Golden Bite Pizza Hut! I want to inquire about menu and delivery.')}`, '_blank');
      });
    }

    // Share Menu Link
    if (headerShareBtn) {
      headerShareBtn.addEventListener('click', async () => {
        const shareData = {
          title: RESTAURANT_INFO.name,
          text: 'Check out Golden Bite Pizza Hut Digital Menu and order on WhatsApp with Free Delivery!',
          url: window.location.href
        };

        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            // Cancelled or not permitted
          }
        } else {
          // Fallback: Copy link
          navigator.clipboard.writeText(window.location.href);
          showToast('Menu link copied to clipboard!', 'success');
        }
      });
    }

    // Brand click scrolls to top
    const brandHeaderBtn = document.getElementById('brandHeaderBtn');
    if (brandHeaderBtn) {
      brandHeaderBtn.addEventListener('click', () => {
        showMenuPage();
        if (appViewport) appViewport.scrollTo({ top: 0, behavior: 'smooth' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ==========================================================================
  // Desktop Showcase & Smartphone Mockup Controller
  // ==========================================================================

  function initDesktopShowcase() {
    updatePhoneClock();
    setInterval(updatePhoneClock, 30000);
  }

  function updatePhoneClock() {
    const el = document.getElementById('phoneLiveTime');
    if (!el) return;
    const now = new Date();
    const hours = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    el.textContent = `${hours}:${mins}`;
  }

  // Ensure home page top (Hero Banner) is set once on initial load
  let hasSetInitialScroll = false;
  function ensureTopScroll() {
    if (hasSetInitialScroll) return;
    hasSetInitialScroll = true;

    try {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    } catch (e) {}

    const reset = () => {
      if (appViewport) {
        appViewport.style.scrollBehavior = 'auto';
        appViewport.scrollTop = 0;
      }
      if (phoneScreenBody) {
        phoneScreenBody.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    };

    reset();
    requestAnimationFrame(reset);
  }

  // Prevent browser caching old scroll offset on page reload
  window.addEventListener('beforeunload', () => {
    try {
      if (appViewport) appViewport.scrollTop = 0;
      window.scrollTo(0, 0);
    } catch (e) {}
  });

  window.addEventListener('pageshow', ensureTopScroll);

  // Enable mouse wheel scrolling anywhere on desktop to scroll phone viewport
  window.addEventListener('wheel', (e) => {
    if (window.innerWidth <= 820) return; // on mobile screens, native window scroll handles it
    if (e.target.closest('.modal-card, .cart-sheet, .modal-overlay, .drawer-backdrop')) return;

    if (appViewport && !e.target.closest('#appViewport')) {
      appViewport.scrollBy({ top: e.deltaY, behavior: 'auto' });
    }
  }, { passive: true });

  // Start app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      ensureTopScroll();
    });
  } else {
    init();
    ensureTopScroll();
  }

  window.addEventListener('load', ensureTopScroll);

})();
