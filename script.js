document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 300);
  });

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');
  const toTopBtn = document.getElementById('to-top');
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    toTopBtn.classList.toggle('show', window.scrollY > 480);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  const closeNav = () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Active nav link highlight ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(sec => navObserver.observe(sec));

  /* ---------- Menu data & tabs ---------- */
  const MENU_DATA = {
    drink: [
      { name: 'ハンドドリップコーヒー', price: '¥550', desc: '自家焙煎豆を一杯ずつ丁寧に抽出', icon: '☕', badge: '人気No.1', c1: '#e7c9a3', c2: '#a9713f' },
      { name: 'カフェラテ', price: '¥600', desc: 'なめらかなミルクとエスプレッソ', icon: '🥛', c1: '#f2e3cf', c2: '#caa06a' },
      { name: '季節のフルーツティー', price: '¥650', desc: '旬の果実をたっぷり使用', icon: '🍹', badge: '季節限定', c1: '#e8b6a0', c2: '#c9704f' },
      { name: 'カフェモカ', price: '¥680', desc: 'ビターなチョコレートとエスプレッソ', icon: '🍫', c1: '#c99a6b', c2: '#6b4a2b' },
      { name: 'アイスオレンジティー', price: '¥600', desc: 'すっきりとした爽やかな味わい', icon: '🍊', c1: '#f2c98c', c2: '#d9884a' },
      { name: '抹茶ラテ', price: '¥650', desc: '京都産抹茶を使用したまろやかな一杯', icon: '🍵', c1: '#c7d6a3', c2: '#7c9a5a' },
    ],
    sweets: [
      { name: 'シナモンロール', price: '¥480', desc: '毎朝焼き上げるお店の看板メニュー', icon: '🥐', badge: '人気No.1', c1: '#e7c9a3', c2: '#a9713f' },
      { name: 'ベイクドチーズケーキ', price: '¥520', desc: '濃厚でなめらかな口どけ', icon: '🍰', c1: '#f2e3cf', c2: '#caa06a' },
      { name: '季節のフルーツタルト', price: '¥580', desc: '旬のフルーツを贅沢に盛り付け', icon: '🍓', badge: '季節限定', c1: '#e8b6a0', c2: '#c9704f' },
      { name: 'ガトーショコラ', price: '¥550', desc: '濃厚なカカオの風味が広がる', icon: '🍫', c1: '#c99a6b', c2: '#6b4a2b' },
      { name: 'スコーン（2個）', price: '¥420', desc: 'クロテッドクリーム添え', icon: '🧁', c1: '#f2c98c', c2: '#d9884a' },
      { name: 'マフィン', price: '¥400', desc: '毎日3種類が並ぶ焼きたてマフィン', icon: '🧺', c1: '#c7d6a3', c2: '#7c9a5a' },
    ],
    food: [
      { name: 'アボカドトースト', price: '¥880', desc: '自家製カンパーニュとアボカド', icon: '🥑', badge: '人気No.1', c1: '#c7d6a3', c2: '#7c9a5a' },
      { name: 'キッシュプレート', price: '¥980', desc: '季節野菜をたっぷり使った日替わりキッシュ', icon: '🥧', c1: '#f2e3cf', c2: '#caa06a' },
      { name: 'サーモンベーグルサンド', price: '¥920', desc: 'クリームチーズとスモークサーモン', icon: '🥯', c1: '#e8b6a0', c2: '#c9704f' },
      { name: 'カフェカレー', price: '¥1050', desc: 'スパイス香る野菜たっぷりカレー', icon: '🍛', badge: '季節限定', c1: '#e7c9a3', c2: '#a9713f' },
      { name: 'ミネストローネスープセット', price: '¥780', desc: 'パン付きの日替わりスープセット', icon: '🍲', c1: '#c99a6b', c2: '#6b4a2b' },
      { name: 'フルーツグラノーラボウル', price: '¥750', desc: 'ヨーグルトと自家製グラノーラ', icon: '🥣', c1: '#f2c98c', c2: '#d9884a' },
    ],
  };

  const menuGrid = document.getElementById('menu-grid');
  const tabBtns = document.querySelectorAll('.tab-btn');

  const renderMenu = (category) => {
    const items = MENU_DATA[category] || [];
    menuGrid.innerHTML = items.map((item, i) => `
      <div class="menu-card" style="animation-delay:${i * 0.06}s">
        <div class="menu-card-img" style="--menu-c1:${item.c1};--menu-c2:${item.c2}">${item.icon}</div>
        <div class="menu-card-body">
          <div class="menu-card-top">
            <h3>${item.name}</h3>
            <span class="menu-price">${item.price}</span>
          </div>
          <p>${item.desc}</p>
          ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
        </div>
      </div>
    `).join('');
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.tab);
    });
  });

  renderMenu('drink');

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  const validators = {
    name: (val) => val.trim().length > 0 ? '' : 'お名前を入力してください',
    email: (val) => {
      if (!val.trim()) return 'メールアドレスを入力してください';
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(val) ? '' : '正しいメールアドレスを入力してください';
    },
  };

  const showError = (field, message) => {
    const input = document.getElementById(field);
    const errorEl = document.getElementById(`${field}-error`);
    if (message) {
      input.classList.add('invalid');
      errorEl.textContent = message;
    } else {
      input.classList.remove('invalid');
      errorEl.textContent = '';
    }
  };

  Object.keys(validators).forEach(field => {
    const input = document.getElementById(field);
    input.addEventListener('input', () => {
      showError(field, validators[field](input.value));
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    Object.keys(validators).forEach(field => {
      const input = document.getElementById(field);
      const message = validators[field](input.value);
      showError(field, message);
      if (message) hasError = true;
    });

    if (hasError) {
      successMsg.classList.remove('show');
      form.querySelector('.invalid')?.focus();
      return;
    }

    successMsg.classList.add('show');
    form.reset();

    setTimeout(() => {
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  });

});
