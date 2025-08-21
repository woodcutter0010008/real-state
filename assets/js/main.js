// LuxeBuild Realty — Interactions

(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const formatCurrency = (num) => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num || 0);

  const state = {
    theme: localStorage.getItem('theme') || 'light',
    currentSlide: 0,
    properties: [],
    filters: { location: '', type: '', status: '', minPrice: null, maxPrice: null, search: '', sort: 'price-asc' },
    teams: [],
    blog: []
  };

  // THEME
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    $('#darkToggle')?.setAttribute('aria-pressed', state.theme === 'dark');
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', state.theme);
    applyTheme();
  }

  // NAV
  function setupNav() {
    const nav = $('.nav');
    const toggle = $('.nav-toggle');
    toggle?.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Smooth scroll
    $$('.nav-list a').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        nav.classList.remove('open');
        const href = a.getAttribute('href');
        const el = $(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // HERO SLIDER
  const heroBackgrounds = [
    createGradientDataUri('#0f1d3b', '#1b2e5d'),
    createGradientDataUri('#101a36', '#2a3d73'),
    createGradientDataUri('#0c1426', '#233a66')
  ];

  function setupHero() {
    const slides = $$('.hero-slide');
    const dots = $('.hero-dots');
    if (!slides.length || !dots) return;

    slides.forEach((s, i) => {
      const media = $('.hero-media', s);
      media.style.backgroundImage = `url(${heroBackgrounds[i % heroBackgrounds.length]})`;
      const dot = document.createElement('button');
      dot.addEventListener('click', () => goToSlide(i));
      dots.appendChild(dot);
    });

    function goToSlide(i) {
      state.currentSlide = i;
      slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
      $$('.hero-dots button').forEach((d, idx) => d.classList.toggle('active', idx === i));
    }

    let idx = 0; goToSlide(idx);
    setInterval(() => { idx = (idx + 1) % slides.length; goToSlide(idx); }, 5500);
  }

  // PROPERTIES
  function createGradientDataUri(from = '#0f1d3b', to = '#c7a36f') {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1000'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='${from}'/><stop offset='100%' stop-color='${to}'/></linearGradient></defs><rect fill='url(%23g)' width='1600' height='1000'/><circle cx='1200' cy='200' r='180' fill='rgba(255,255,255,.12)'/><circle cx='400' cy='700' r='240' fill='rgba(255,255,255,.08)'/></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function svgHouseThumb(seed) {
    const from = ['#173053', '#0f1d3b', '#15254a'][seed % 3];
    const to = ['#c7a36f', '#a8843a', '#d3b37a'][seed % 3];
    return createGradientDataUri(from, to);
  }

  function seedData() {
    state.properties = [
      { id: 'p1', title: 'Skyline Penthouse', price: 3850000, location: 'San Francisco', type: 'Condo', status: 'For Sale', beds: 3, baths: 3, area: 2450, year: 2024, images: [svgHouseThumb(1), svgHouseThumb(2), svgHouseThumb(3), svgHouseThumb(4)] },
      { id: 'p2', title: 'Marina View Residence', price: 2750000, location: 'Los Angeles', type: 'House', status: 'For Sale', beds: 4, baths: 3, area: 3180, year: 2024, images: [svgHouseThumb(2), svgHouseThumb(1), svgHouseThumb(3), svgHouseThumb(4)] },
      { id: 'p3', title: 'Hillside Estate', price: 4950000, location: 'San Diego', type: 'Villa', status: 'For Sale', beds: 5, baths: 5, area: 5200, year: 2023, images: [svgHouseThumb(3), svgHouseThumb(2), svgHouseThumb(1), svgHouseThumb(4)] },
      { id: 'p4', title: 'Uptown Loft', price: 1350000, location: 'San Francisco', type: 'Loft', status: 'For Sale', beds: 2, baths: 2, area: 1280, year: 2024, images: [svgHouseThumb(4), svgHouseThumb(2), svgHouseThumb(1), svgHouseThumb(3)] },
      { id: 'p5', title: 'Seaside Bungalow', price: 985000, location: 'San Diego', type: 'House', status: 'For Sale', beds: 3, baths: 2, area: 1650, year: 2022, images: [svgHouseThumb(5), svgHouseThumb(6), svgHouseThumb(7), svgHouseThumb(8)] },
      { id: 'p6', title: 'Downtown High-Rise', price: 1950000, location: 'Los Angeles', type: 'Condo', status: 'For Sale', beds: 3, baths: 2, area: 1820, year: 2023, images: [svgHouseThumb(6), svgHouseThumb(7), svgHouseThumb(8), svgHouseThumb(5)] },
      { id: 'p7', title: 'Modern Farmhouse', price: 1490000, location: 'San Jose', type: 'House', status: 'Pending', beds: 4, baths: 3, area: 2650, year: 2023, images: [svgHouseThumb(7), svgHouseThumb(3), svgHouseThumb(1), svgHouseThumb(2)] },
      { id: 'p8', title: 'Canyon Retreat', price: 2120000, location: 'Santa Barbara', type: 'Villa', status: 'For Sale', beds: 4, baths: 4, area: 2980, year: 2024, images: [svgHouseThumb(8), svgHouseThumb(7), svgHouseThumb(2), svgHouseThumb(5)] }
    ];

    state.teams = [
      { name: 'Elena March', role: 'Principal Architect' },
      { name: 'Noah Patel', role: 'Head of Construction' },
      { name: 'Ava Chen', role: 'Design Director' },
      { name: 'Lucas Rivera', role: 'Real Estate Advisor' }
    ];

    state.blog = [
      { title: '2025 Luxury Market Outlook', date: 'Aug 14, 2025' },
      { title: 'Sustainable Materials We Love', date: 'Jul 30, 2025' },
      { title: 'From Blueprint to Reality', date: 'Jul 11, 2025' }
    ];
  }

  function populateFilters() {
    const locations = new Set(state.properties.map(p => p.location));
    const types = new Set(state.properties.map(p => p.type));
    const statuses = new Set(state.properties.map(p => p.status));
    const locSel = $('#filter-location');
    const typeSel = $('#filter-type');
    const statusSel = $('#filter-status');
    for (const l of [...locations].sort()) locSel.append(new Option(l, l));
    for (const t of [...types].sort()) typeSel.append(new Option(t, t));
    for (const s of [...statuses].sort()) statusSel.append(new Option(s, s));
  }

  function renderProperties() {
    const grid = $('#properties-grid');
    grid.innerHTML = '';
    let items = state.properties.slice();
    const f = state.filters;
    items = items.filter(p => !f.location || p.location === f.location);
    items = items.filter(p => !f.type || p.type === f.type);
    items = items.filter(p => !f.status || p.status === f.status);
    items = items.filter(p => (f.minPrice == null || p.price >= f.minPrice));
    items = items.filter(p => (f.maxPrice == null || p.price <= f.maxPrice));
    const query = f.search.toLowerCase();
    items = items.filter(p => !query || (p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query)));

    if (f.sort === 'price-asc') items.sort((a, b) => a.price - b.price);
    if (f.sort === 'price-desc') items.sort((a, b) => b.price - a.price);
    if (f.sort === 'newest') items.sort((a, b) => b.year - a.year);

    items.forEach(p => {
      const card = document.createElement('article');
      card.className = 'property-card';
      card.setAttribute('data-id', p.id);
      card.innerHTML = `
        <div class="property-media">
          <img src="${p.images[0]}" alt="${p.title}" loading="lazy" decoding="async" />
          <span class="property-badge">${p.status}</span>
        </div>
        <div class="property-content">
          <h3 class="property-title">${p.title}</h3>
          <div class="property-quick">
            <div>
              <div class="property-price">${formatCurrency(p.price)}</div>
              <div class="property-meta">${p.location} · ${p.beds} bd · ${p.baths} ba · ${p.area} sqft</div>
            </div>
            <button class="btn btn-outline quick-view" data-id="${p.id}">Quick View</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    $('#results-count').textContent = `${items.length} result${items.length === 1 ? '' : 's'}`;
  }

  // SEO: Inject JSON-LD for property listings
  function propertySchemaType(type) {
    switch (type) {
      case 'House': return 'SingleFamilyResidence';
      case 'Villa': return 'House';
      case 'Condo':
      case 'Loft': return 'Apartment';
      default: return 'Residence';
    }
  }

  function availabilitySchema(status) {
    switch (status) {
      case 'For Sale': return 'https://schema.org/InStock';
      case 'Pending': return 'https://schema.org/PreOrder';
      case 'Sold':
      case 'Sold Out': return 'https://schema.org/SoldOut';
      default: return 'https://schema.org/InStock';
    }
  }

  function injectListingsSchema() {
    const id = 'schema-listings';
    const prev = document.getElementById(id);
    if (prev) prev.remove();
    if (!state.properties.length) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Luxury Property Listings',
      'itemListElement': state.properties.map((p, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'item': {
          '@type': propertySchemaType(p.type),
          'name': p.title,
          'description': `${p.beds} bed ${p.baths} bath · ${p.area} sqft in ${p.location}`,
          'image': p.images,
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': p.location,
            'addressRegion': 'CA',
            'addressCountry': 'US'
          },
          'numberOfBedrooms': p.beds,
          'numberOfBathroomsTotal': p.baths,
          'floorSize': { '@type': 'QuantitativeValue', 'value': p.area, 'unitText': 'SQFT' },
          'offers': {
            '@type': 'Offer',
            'price': p.price,
            'priceCurrency': 'USD',
            'availability': availabilitySchema(p.status),
            'url': `${location.origin}${location.pathname}#properties`,
            'seller': { '@type': 'RealEstateAgent', 'name': 'LuxeBuild Realty' }
          }
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function setupPropertyUI() {
    $('#filter-location').addEventListener('change', (e) => { state.filters.location = e.target.value; renderProperties(); });
    $('#filter-type').addEventListener('change', (e) => { state.filters.type = e.target.value; renderProperties(); });
    $('#filter-status').addEventListener('change', (e) => { state.filters.status = e.target.value; renderProperties(); });
    $('#min-price').addEventListener('input', (e) => { const v = parseInt(e.target.value, 10); state.filters.minPrice = Number.isFinite(v) ? v : null; renderProperties(); });
    $('#max-price').addEventListener('input', (e) => { const v = parseInt(e.target.value, 10); state.filters.maxPrice = Number.isFinite(v) ? v : null; renderProperties(); });
    $('#sort-by').addEventListener('change', (e) => { state.filters.sort = e.target.value; renderProperties(); });
    $('#search').addEventListener('input', (e) => { state.filters.search = e.target.value; renderProperties(); });
    $('#clear-filters').addEventListener('click', () => {
      state.filters = { location: '', type: '', status: '', minPrice: null, maxPrice: null, search: '', sort: 'price-asc' };
      $('#filter-location').value = '';
      $('#filter-type').value = '';
      $('#filter-status').value = '';
      $('#min-price').value = '';
      $('#max-price').value = '';
      $('#sort-by').value = 'price-asc';
      $('#search').value = '';
      renderProperties();
    });

    $('#properties-grid').addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-view');
      if (!btn) return;
      const id = btn.getAttribute('data-id');
      openPropertyModal(id);
    });
  }

  function openPropertyModal(id) {
    const modal = $('#property-modal');
    const prop = state.properties.find(p => p.id === id);
    if (!prop) return;
    const gallery = $('#property-gallery');
    const details = $('#property-details');
    gallery.innerHTML = '';
    const hero = document.createElement('div');
    hero.className = 'hero';
    const heroImg = document.createElement('img');
    heroImg.src = prop.images[0]; heroImg.alt = prop.title; heroImg.style.width = '100%'; heroImg.style.height = '100%'; heroImg.style.objectFit = 'cover';
    hero.appendChild(heroImg);
    gallery.appendChild(hero);

    const thumbs = document.createElement('div');
    thumbs.className = 'thumbs';
    prop.images.forEach((src) => {
      const t = document.createElement('img');
      t.src = src; t.alt = prop.title;
      t.addEventListener('click', () => { heroImg.src = src; });
      thumbs.appendChild(t);
    });
    gallery.appendChild(thumbs);

    details.innerHTML = `
      <h3>${prop.title}</h3>
      <div class="property-price" style="margin: 6px 0 8px">${formatCurrency(prop.price)}</div>
      <div class="specs">
        <div><strong>Location:</strong> ${prop.location}</div>
        <div><strong>Type:</strong> ${prop.type}</div>
        <div><strong>Status:</strong> ${prop.status}</div>
        <div><strong>Beds:</strong> ${prop.beds}</div>
        <div><strong>Baths:</strong> ${prop.baths}</div>
        <div><strong>Area:</strong> ${prop.area} sqft</div>
        <div><strong>Year:</strong> ${prop.year}</div>
      </div>
      <div style="margin-top: 12px; display:flex; gap:8px;">
        <button class="btn btn-primary show-lead-modal">Schedule a Tour</button>
        <a href="#contact" class="btn btn-outline">Contact Agent</a>
      </div>
    `;

    modal.showModal();
  }

  // TEAM
  function renderTeam() {
    const grid = $('#team-grid');
    grid.innerHTML = '';
    state.teams.forEach((t, i) => {
      const card = document.createElement('article');
      card.className = 'team-card';
      const svg = teamAvatarSvg(t.name, i);
      card.innerHTML = `
        <div class="team-media"><img alt="${t.name}" src="${svg}" loading="lazy" decoding="async" /></div>
        <div class="team-body"><h3 class="team-name">${t.name}</h3><div class="team-role">${t.role}</div></div>
      `;
      grid.appendChild(card);
    });
  }

  function teamAvatarSvg(seedText, seedNum) {
    const colors = [ ['#0f1d3b','#c7a36f'], ['#1a2a50','#d3b37a'], ['#15254a','#a8843a'], ['#0e1731','#c7a36f'] ];
    const [from, to] = colors[seedNum % colors.length];
    const initials = seedText.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs><rect rx='120' ry='120' width='240' height='240' fill='url(%23g)'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' fill='rgba(255,255,255,.96)' font-family='Inter, Arial' font-size='88' font-weight='900'>${initials}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // BLOG
  function renderBlog() {
    const grid = $('#blog-grid');
    grid.innerHTML = '';
    state.blog.forEach((b, i) => {
      const card = document.createElement('article');
      card.className = 'blog-card';
      const media = createGradientDataUri('#e9eef9', i % 2 ? '#f5f8ff' : '#f0f4ff');
      card.innerHTML = `
        <div class="blog-media"><img src="${media}" alt="${b.title}" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover"/></div>
        <div class="blog-body">
          <h3 class="blog-title">${b.title}</h3>
          <div class="blog-meta">${b.date} · 4 min read</div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // MAP TABS
  function setupMapTabs() {
    $$('.map-tabs .tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.map-tabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const id = tab.getAttribute('data-map');
        $$('.map-panel').forEach(p => p.classList.remove('active'));
        $(`#map-${id}`).classList.add('active');
      });
    });
  }

  // CALCULATOR
  function setupCalculator() {
    const inputs = ['#calc-price','#calc-down','#calc-rate','#calc-term','#calc-tax','#calc-hoa'].map((sel)=>$(sel));
    inputs.forEach((el) => el.addEventListener('input', updatePayment));
    updatePayment();

    function updatePayment() {
      const price = parseFloat($('#calc-price').value) || 0;
      const downPercent = (parseFloat($('#calc-down').value) || 0) / 100;
      const rateApr = (parseFloat($('#calc-rate').value) || 0) / 100;
      const termYears = parseInt($('#calc-term').value, 10) || 30;
      const taxAnnual = parseFloat($('#calc-tax').value) || 0;
      const hoaMonthly = parseFloat($('#calc-hoa').value) || 0;

      const principal = price * (1 - downPercent);
      const n = termYears * 12;
      const r = rateApr / 12;
      const mortgage = r === 0 ? (principal / n) : (principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      const taxMonthly = taxAnnual / 12;
      const total = mortgage + taxMonthly + hoaMonthly;

      $('#calc-payment').textContent = formatCurrency(total);
      $('#calc-breakdown').innerHTML = `
        <li><span>Principal & Interest</span><strong>${formatCurrency(mortgage)}</strong></li>
        <li><span>Property Tax</span><strong>${formatCurrency(taxMonthly)}</strong></li>
        <li><span>HOA</span><strong>${formatCurrency(hoaMonthly)}</strong></li>
      `;
    }
  }

  // FORMS & CRM STUB
  async function sendLead(data) {
    // Integration-ready stub; replace with your CRM endpoint
    // await fetch('https://your-crm.example.com/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    await new Promise((r) => setTimeout(r, 400));
  }

  function setupLeadModal() {
    const modal = $('#lead-modal');
    const openers = $$('.show-lead-modal');
    const form = $('#lead-form');
    openers.forEach(btn => btn.addEventListener('click', () => modal.showModal()));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());
      if (!data.name || !data.email || !data.phone) return toast('Please complete all required fields');
      try {
        await sendLead({ source: 'lead-modal', ...data });
        modal.close();
        toast('Thanks! We will reach out shortly.');
        form.reset();
      } catch (e) { toast('Something went wrong. Please try again.'); }
    });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  }

  function setupContactForm() {
    const form = $('#contact-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());
      if (!data.name || !data.email || !data.phone || !data.message) return toast('Please complete all required fields');
      try {
        await sendLead({ source: 'contact', ...data });
        toast('Thanks! We will be in touch.');
        form.reset();
      } catch (e) { toast('Submission failed.'); }
    });

    const newsletter = $('#newsletter-form');
    newsletter.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = $('input[type="email"]', newsletter).value;
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return toast('Enter a valid email');
      await new Promise(r => setTimeout(r, 300));
      toast('Subscribed!');
      newsletter.reset();
    });
  }

  // TESTIMONIALS
  function setupTestimonials() {
    const track = $('#testimonial-track');
    const dots = $('#testimonial-dots');
    if (!track || !dots) return;
    const items = $$('.testimonial', track);
    let idx = 0;
    function go(i) {
      idx = i;
      track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });
      dots.querySelectorAll('button').forEach((b, j) => b.classList.toggle('active', j === i));
    }
    items.forEach((_, i) => {
      const b = document.createElement('button');
      b.addEventListener('click', () => go(i));
      dots.appendChild(b);
    });
    go(0);
    setInterval(() => go((idx + 1) % items.length), 6000);
  }

  // VIDEO
  function setupVideoModal() {
    const btn = $('#open-video');
    const modal = $('#video-modal');
    const iframe = $('#video-iframe');
    if (!btn || !modal || !iframe) return;
    btn.addEventListener('click', () => {
      iframe.src = 'https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1&rel=0';
      modal.showModal();
    });
    modal.addEventListener('close', () => { iframe.src = ''; });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  }

  // REVEAL
  function setupReveal() {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => io.observe(el));
  }

  // TOAST
  let toastTimeout;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.style.position = 'fixed';
    t.style.bottom = '18px';
    t.style.left = '50%';
    t.style.transform = 'translateX(-50%)';
    t.style.background = 'var(--brand-gold)';
    t.style.color = '#111';
    t.style.padding = '10px 14px';
    t.style.borderRadius = '999px';
    t.style.boxShadow = '0 12px 24px rgba(199,163,111,.35)';
    t.style.zIndex = 99999;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { t.textContent = ''; t.removeAttribute('style'); }, 2500);
  }

  // INIT
  document.addEventListener('DOMContentLoaded', () => {
    state.theme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme();
    $('#darkToggle')?.addEventListener('click', toggleTheme);
    $('#year').textContent = new Date().getFullYear();

    setupNav();
    setupHero();
    setupReveal();

    seedData();
    populateFilters();
    renderProperties();
    injectListingsSchema();
    setupPropertyUI();
    renderTeam();
    renderBlog();
    setupTestimonials();
    setupMapTabs();
    setupCalculator();
    setupLeadModal();
    setupContactForm();

    // Close any dialog with [x]
    $$('.modal .modal-close').forEach(btn => btn.addEventListener('click', (e) => {
      const dialog = e.target.closest('dialog');
      dialog?.close();
    }));

    setupVideoModal();
  });
})();

