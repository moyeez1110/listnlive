// ============================================================
//  ListnLive — Choutuppal App
//  Data comes from Google Sheets (published as CSV)
//  HOW TO CONNECT YOUR SHEETS:
//  1. Open your Google Sheet
//  2. File → Share → Publish to web → CSV → Copy link
//  3. Paste the link in the SHEET_URLS below
// ============================================================

const SHEET_URLS = {
  businesses: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxPturcFEVuIdQ1AtfagzGAZWSdcFxA59z-Fmw5GS8RT7j9g7A03vBbqTI4iJudTyfRtO58LKKP6q4/pub?gid=0&single=true&output=csv',
  news:       'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxPturcFEVuIdQ1AtfagzGAZWSdcFxA59z-Fmw5GS8RT7j9g7A03vBbqTI4iJudTyfRtO58LKKP6q4/pub?gid=2088797766&single=true&output=csv',
  realestate: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxPturcFEVuIdQ1AtfagzGAZWSdcFxA59z-Fmw5GS8RT7j9g7A03vBbqTI4iJudTyfRtO58LKKP6q4/pub?gid=328067825&single=true&output=csv',
};

// ============================================================
//  SAMPLE / FALLBACK DATA (shown when sheets not connected yet)
// ============================================================
const SAMPLE_BUSINESSES = [
  { name:'Sri Lakshmi Tiffins', category:'Tiffin', description:'ఉదయం 6 నుండి తాజా ఇడ్లీ, దోశ, పొంగల్', phone:'9876543210', rating:'4.8', badge:'Featured' },
  { name:'City Medical Store', category:'Medicals', description:'24/7 మెడికల్ స్టోర్, అన్ని మందులు', phone:'9876543211', rating:'4.9', badge:'Featured' },
  { name:'Rahul Hair Studio', category:'Salons', description:'Modern haircuts, coloring, bridal packages', phone:'9876543212', rating:'4.7', badge:'New' },
  { name:'Krishna Plumbing Works', category:'Plumbers', description:'House plumbing, bore-well, pipeline repair', phone:'9876543213', rating:'4.6', badge:'New' },
  { name:'Nanda Electronics', category:'Electronics', description:'TV, fridge repairs & new appliances', phone:'9876543214', rating:'4.5', badge:'' },
  { name:'Green Valley School', category:'Education', description:'CBSE School, KG to 10th, transport available', phone:'9876543215', rating:'4.8', badge:'Featured' },
];

const SAMPLE_NEWS = [
  { title:'చౌటుప్పల్ లో కొత్త రహదారి నిర్మాణం ప్రారంభం', tag:'Infrastructure', date:'25 May 2026', emoji:'🛣️' },
  { title:'మండల స్థాయి క్రీడా పోటీలు ఈ వారం', tag:'Sports', date:'24 May 2026', emoji:'🏆' },
  { title:'కొత్త బస్సు రూట్లు: చౌటుప్పల్ నుండి హైదరాబాద్', tag:'Transport', date:'23 May 2026', emoji:'🚌' },
  { title:'రైతుల కోసం ప్రత్యేక వ్యవసాయ అప్పులు', tag:'Agriculture', date:'22 May 2026', emoji:'🌾' },
  { title:'చౌటుప్పల్ లో IT పార్క్ ఏర్పాటు అవుతుందా?', tag:'Development', date:'21 May 2026', emoji:'💻' },
  { title:'పాఠశాల పిల్లలకు ఉచిత సైకిళ్ళు పంపిణీ', tag:'Education', date:'20 May 2026', emoji:'🚴' },
];

const SAMPLE_REALESTATE = [
  { name:'3BHK House — Choutuppal Town', category:'House for Sale', description:'Main road అడ్జాసెంట్, 1200sqft, 2 బాత్‌రూమ్‌లు, car parking', phone:'9876543220', rating:'', badge:'Sale' },
  { name:'Commercial Shop — Bus Stand Area', category:'Shop for Rent', description:'100sqft, ground floor, busy market area, electricity included', phone:'9876543221', rating:'', badge:'New' },
  { name:'Agricultural Land — 5 Acres', category:'Land for Sale', description:'NH-65 నుండి 2km, water available, HMDA approved', phone:'9876543222', rating:'', badge:'Featured' },
  { name:'2BHK Apartment — New Layout', category:'Flat for Rent', description:'2nd floor, lift, security, 800sqft, near school', phone:'9876543223', rating:'', badge:'New' },
];

const CATEGORIES = [
  { emoji:'🍱', name:'Tiffin' },
  { emoji:'💊', name:'Medicals' },
  { emoji:'✂️', name:'Salons' },
  { emoji:'🔧', name:'Plumbers' },
  { emoji:'🏠', name:'Real Estate' },
  { emoji:'📱', name:'Electronics' },
  { emoji:'🚗', name:'Automobiles' },
  { emoji:'📚', name:'Education' },
  { emoji:'🧵', name:'Tailors' },
  { emoji:'🔨', name:'Hardware' },
  { emoji:'⚙️', name:'Services' },
  { emoji:'➕', name:'More' },
];

const TESTIMONIALS = [
  { quote:'ఈ యాప్ ద్వారా నా బిజినెస్ కు కొత్త కస్టమర్లు వస్తున్నారు. సూపర్ యాప్!', name:'రమేష్', role:'Business Owner', initial:'ర' },
  { quote:'రియల్ ఎస్టేట్ ప్రాపర్టీల కోసం నేను రోజూ వాడుతున్నాను.', name:'సురేష్', role:'Real Estate Agent', initial:'స' },
  { quote:'ఊరిలో అన్ని షాపులు, సర్వీసెస్ ఒకేచోట దొరుకుతున్నాయి. చాలా ఉపయోగం!', name:'లక్ష్మి', role:'Homemaker', initial:'ల' },
  { quote:'నా క్లినిక్ కి రోజూ 5-6 కొత్త పేషంట్లు ఈ యాప్ ద్వారా వస్తున్నారు.', name:'డాక్టర్ రాజు', role:'Doctor', initial:'డ' },
  { quote:'టైలరింగ్ ఆర్డర్లు పెరిగాయి. ధన్యవాదాలు చౌటుప్పల్ 2.0!', name:'అనుష', role:'Tailor', initial:'అ' },
];

// ============================================================
//  CSV PARSER
// ============================================================
function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase().replace(/\s+/g,'_'));
  return lines.slice(1).map(line => {
    const vals = [];
    let cur = '', inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === ',' && !inQ) { vals.push(cur.trim()); cur = ''; continue; }
      cur += ch;
    }
    vals.push(cur.trim());
    const obj = {};
    headers.forEach((h, i) => obj[h] = vals[i] || '');
    return obj;
  });
}

async function fetchSheet(url) {
  try {
    const r = await fetch(url);
    const text = await r.text();
    return parseCSV(text);
  } catch (e) {
    return null;
  }
}

// ============================================================
//  RENDER FUNCTIONS
// ============================================================
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-item fade-in" onclick="filterByCategory('${c.name}')">
      <span class="cat-emoji">${c.emoji}</span>
      <div class="cat-name">${c.name}</div>
    </div>`).join('');
  animateFadeIns();
}

let allBusinesses = [];

function renderBusinesses(data) {
  allBusinesses = data;
  const catFilter = document.getElementById('catFilter');
  const cats = [...new Set(data.map(b => b.category || b.Category).filter(Boolean))];
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    catFilter.appendChild(opt);
  });
  displayBusinesses(data);
}

function displayBusinesses(data) {
  const grid = document.getElementById('listingsGrid');
  if (!data.length) {
    grid.innerHTML = '<div class="empty-state"><span>🔍</span>No businesses found.</div>';
    return;
  }
  grid.innerHTML = data.map(b => {
    const name = b.name || b.Name || '';
    const cat  = b.category || b.Category || '';
    const desc = b.description || b.Description || '';
    const phone= b.phone || b.Phone || '';
    const rat  = b.rating || b.Rating || '';
    const badge= b.badge || b.Badge || '';
    const badgeClass = badge.toLowerCase() === 'featured' ? 'badge-featured' : badge.toLowerCase() === 'new' ? 'badge-new' : 'badge-sale';
    return `
    <div class="listing-card fade-in">
      ${badge ? `<span class="listing-badge ${badgeClass}">${badge}</span>` : ''}
      <div class="listing-name">${name}</div>
      <div class="listing-cat">📂 ${cat}</div>
      <div class="listing-desc">${desc}</div>
      <div class="listing-meta">
        ${rat ? `<span class="listing-rating">⭐ ${rat}</span>` : ''}
        ${phone ? `<a href="tel:${phone}" class="listing-phone">📞 ${phone}</a>` : ''}
        ${phone ? `<a class="btn-wa-small" href="https://wa.me/91${phone}?text=Hi, I found you on Choutuppal App!" target="_blank">💬 WhatsApp</a>` : ''}
      </div>
    </div>`;
  }).join('');
  animateFadeIns();
}

function filterBusinesses() {
  const q   = document.getElementById('searchInput').value.toLowerCase();
  const cat = document.getElementById('catFilter').value;
  const filtered = allBusinesses.filter(b => {
    const name = (b.name || b.Name || '').toLowerCase();
    const desc = (b.description || b.Description || '').toLowerCase();
    const bcat = b.category || b.Category || '';
    const matchQ   = !q   || name.includes(q) || desc.includes(q);
    const matchCat = !cat || bcat === cat;
    return matchQ && matchCat;
  });
  displayBusinesses(filtered);
}

function filterByCategory(cat) {
  document.getElementById('catFilter').value = cat;
  filterBusinesses();
  document.getElementById('businesses').scrollIntoView({behavior:'smooth'});
}

function renderNews(data) {
  const grid = document.getElementById('newsGrid');
  if (!data.length) { grid.innerHTML = '<div class="empty-state"><span>📰</span>No news found.</div>'; return; }
  grid.innerHTML = data.map(n => {
    const title = n.title || n.Title || '';
    const tag   = n.tag || n.Tag || n.category || 'News';
    const date  = n.date || n.Date || '';
    const emoji = n.emoji || n.Emoji || '📰';
    return `
    <div class="news-card fade-in">
      <div class="news-img">${emoji}</div>
      <div class="news-body">
        <div class="news-tag">${tag}</div>
        <div class="news-title">${title}</div>
        <div class="news-date">📅 ${date}</div>
      </div>
    </div>`;
  }).join('');
  animateFadeIns();
}

function renderRealEstate(data) {
  const grid = document.getElementById('realEstateGrid');
  if (!data.length) { grid.innerHTML = '<div class="empty-state"><span>🏠</span>No properties found.</div>'; return; }
  grid.innerHTML = data.map(b => {
    const name = b.name || b.Name || '';
    const cat  = b.category || b.Category || '';
    const desc = b.description || b.Description || '';
    const phone= b.phone || b.Phone || '';
    const badge= b.badge || b.Badge || '';
    const badgeClass = badge.toLowerCase() === 'featured' ? 'badge-featured' : badge.toLowerCase() === 'new' ? 'badge-new' : 'badge-sale';
    return `
    <div class="listing-card fade-in">
      ${badge ? `<span class="listing-badge ${badgeClass}">${badge}</span>` : ''}
      <div class="listing-name">${name}</div>
      <div class="listing-cat">🏘️ ${cat}</div>
      <div class="listing-desc">${desc}</div>
      <div class="listing-meta">
        ${phone ? `<a href="tel:${phone}" class="listing-phone">📞 ${phone}</a>` : ''}
        ${phone ? `<a class="btn-wa-small" href="https://wa.me/91${phone}?text=Hi, I saw this property on Choutuppal App!" target="_blank">💬 WhatsApp</a>` : ''}
      </div>
    </div>`;
  }).join('');
  animateFadeIns();
}

function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  grid.innerHTML = TESTIMONIALS.map(t => `
    <div class="testi-card fade-in">
      <div class="testi-quote">"${t.quote}"</div>
      <div class="testi-author">
        <div class="testi-avatar">${t.initial}</div>
        <div><div class="testi-name">${t.name}</div><div class="testi-role">${t.role}</div></div>
      </div>
    </div>`).join('');
  animateFadeIns();
}

// ============================================================
//  SPIN WHEEL
// ============================================================
const PRIZES = ['5 Coins','10 Coins','2 Coins','50 Coins','1 Coin','20 Coins','Try Again','5 Coins'];
const COLORS  = ['#f5c842','#ff6b35','#00b896','#e6a817','#7c5cbf','#3b82f6','#ef4444','#f5c842'];
let spinning = false;
let currentAngle = 0;

function drawWheel() {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 90, cy = 90, r = 85;
  const slices = PRIZES.length;
  const arc = (2 * Math.PI) / slices;
  ctx.clearRect(0,0,180,180);
  PRIZES.forEach((p,i) => {
    const start = i * arc - Math.PI/2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,start,start+arc);
    ctx.closePath();
    ctx.fillStyle = COLORS[i];
    ctx.fill();
    ctx.strokeStyle = '#0d0d1a';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.save();
    ctx.translate(cx,cy);
    ctx.rotate(start + arc/2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#0d0d1a';
    ctx.font = 'bold 11px Baloo 2, sans-serif';
    ctx.fillText(p, r - 6, 4);
    ctx.restore();
  });
  // center circle
  ctx.beginPath();
  ctx.arc(cx,cy,14,0,2*Math.PI);
  ctx.fillStyle = '#0d0d1a';
  ctx.fill();
  // pointer
  ctx.beginPath();
  ctx.moveTo(cx,cy-r-4);
  ctx.lineTo(cx-8,cy-r+12);
  ctx.lineTo(cx+8,cy-r+12);
  ctx.closePath();
  ctx.fillStyle = '#ff6b35';
  ctx.fill();
}

function spinWheel() {
  if (spinning) return;
  const spinKey = 'lastSpin_' + new Date().toDateString();
  if (localStorage.getItem(spinKey)) {
    alert('ఈ రోజు Spin అయ్యింది! రేపు మళ్ళీ రండి. 😊');
    return;
  }
  spinning = true;
  document.getElementById('spinBtn').disabled = true;
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const sliceAngle = 360 / PRIZES.length;
  const extraSpins = 1440 + Math.floor(Math.random() * 360);
  const target = currentAngle + extraSpins;
  const duration = 4000;
  const start = performance.now();
  const startAngle = currentAngle;
  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed/duration,1);
    const ease = 1 - Math.pow(1 - progress, 4);
    currentAngle = startAngle + (target - startAngle) * ease;
    ctx.save();
    ctx.translate(90,90);
    ctx.rotate((currentAngle * Math.PI)/180);
    ctx.translate(-90,-90);
    const cx=90,cy=90,r=85;
    const arc = (2*Math.PI)/PRIZES.length;
    ctx.clearRect(0,0,180,180);
    PRIZES.forEach((p,i) => {
      const s = i*arc - Math.PI/2;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,s,s+arc); ctx.closePath();
      ctx.fillStyle = COLORS[i]; ctx.fill();
      ctx.strokeStyle = '#0d0d1a'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(s+arc/2);
      ctx.textAlign='right'; ctx.fillStyle='#0d0d1a'; ctx.font='bold 11px Baloo 2,sans-serif';
      ctx.fillText(p,r-6,4); ctx.restore();
    });
    ctx.beginPath(); ctx.arc(cx,cy,14,0,2*Math.PI);
    ctx.fillStyle='#0d0d1a'; ctx.fill();
    ctx.restore();
    ctx.beginPath(); ctx.moveTo(90,90-89); ctx.lineTo(82,90-77); ctx.lineTo(98,90-77);
    ctx.closePath(); ctx.fillStyle='#ff6b35'; ctx.fill();
    if (progress < 1) { requestAnimationFrame(animate); return; }
    spinning = false;
    const finalAngle = ((currentAngle % 360) + 360) % 360;
    const pointerAngle = (360 - finalAngle + 270) % 360;
    const prizeIdx = Math.floor(pointerAngle / (360/PRIZES.length)) % PRIZES.length;
    const prize = PRIZES[prizeIdx];
    localStorage.setItem(spinKey, '1');
    setTimeout(() => { alert(`🎉 అభినందనలు! మీకు ${prize} వచ్చింది!`); }, 200);
    document.getElementById('spinBtn').disabled = false;
  }
  requestAnimationFrame(animate);
}

// ============================================================
//  SCROLL FADE IN
// ============================================================
function animateFadeIns() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold:0.1 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => obs.observe(el));
}

// ============================================================
//  THEME TOGGLE (Light / Dark)
// ============================================================
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  document.getElementById('themeToggle').textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☀️';
  }
}


document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ============================================================
//  STICKY NAV SHADOW
// ============================================================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 40) nav.style.boxShadow = '0 2px 20px rgba(0,0,0,.5)';
  else nav.style.boxShadow = 'none';
});

// ============================================================
//  INIT
// ============================================================
async function init() {
  loadTheme();
  renderCategories();
  renderTestimonials();
  drawWheel();

  // Try Google Sheets first, fall back to sample data
  const [bizData, newsData, reData] = await Promise.all([
    fetchSheet(SHEET_URLS.businesses),
    fetchSheet(SHEET_URLS.news),
    fetchSheet(SHEET_URLS.realestate),
  ]);

  renderBusinesses(bizData && bizData.length ? bizData : SAMPLE_BUSINESSES);
  renderNews(newsData && newsData.length ? newsData : SAMPLE_NEWS);
  renderRealEstate(reData && reData.length ? reData : SAMPLE_REALESTATE);
}

document.addEventListener('DOMContentLoaded', init);
