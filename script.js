/* 1. STARFIELD GENERATOR */
(function generateStars() {
  var stA = document.getElementById('stA'), stB = document.getElementById('stB');
  var shadowA = [], shadowB = [];
  for (var i = 0; i < 150; i++) {
    var x = Math.random() * 100, y = Math.random() * 100, a = (Math.random() * 0.25 + 0.05).toFixed(2);
    shadowA.push(x + 'vw ' + y + 'vh 0px 0 rgba(255,255,255,' + a + ')');
  }
  for (var j = 0; j < 18; j++) {
    var x2 = Math.random() * 100, y2 = Math.random() * 100, a2 = (Math.random() * 0.35 + 0.35).toFixed(2);
    shadowB.push(x2 + 'vw ' + y2 + 'vh 1.2px 0 rgba(255,255,255,' + a2 + ')');
  }
  if (stA) stA.style.boxShadow = shadowA.join(',');
  if (stB) stB.style.boxShadow = shadowB.join(',');
})();

/* 2. 3D CAROUSEL RING */
var PHOTO_SHOTS = [
  { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', title: 'Data Dashboard', desc: 'Analytics & Trends' },
  { img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', title: 'Hardware & Chips', desc: 'Neural Computing' },
  { img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80', title: 'Cyber Security', desc: 'Data Protection' },
  { img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80', title: 'Python Coding', desc: 'Model Training' },
  { img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80', title: 'Big Data Mining', desc: 'Pattern Recognition' },
  { img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', title: 'AI Networks', desc: 'Deep Learning' },
  { img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80', title: 'UI / UX Analytics', desc: 'User Insights' },
  { img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80', title: 'Server Farms', desc: 'Cloud Computing' },
  { img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80', title: 'Mathematics', desc: 'Applied Statistics' }
];

function createPhotoCard(data) {
  return '<img src="' + data.img + '" alt="' + data.title + '" loading="lazy">' +
    '<div class="card-overlay">' +
      '<div class="card-title">' + data.title + '</div>' +
      '<div class="card-desc">' + data.desc + '</div>' +
    '</div>';
}

var ringEl = document.getElementById('carouselRing');
var cards = [];
var NUM_CARDS = 36;
var RADIUS = 920;
var STEP = 360 / NUM_CARDS;

for (var c = 0; c < NUM_CARDS; c++) {
  var cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  var shotData = PHOTO_SHOTS[c % PHOTO_SHOTS.length];
  cardDiv.innerHTML = createPhotoCard(shotData);
  ringEl.appendChild(cardDiv);
  cards.push(cardDiv);
}

var phase = 0;
var lastTime = null;
var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderRing(t) {
  if (!lastTime) lastTime = t;
  var dt = Math.min((t - lastTime) / 1000, 0.1);
  lastTime = t;

  if (!prefersReduced) {
    phase -= 1.6 * dt;
  }

  for (var i = 0; i < NUM_CARDS; i++) {
    var a = ((i * STEP + phase) % 360 + 540) % 360 - 180;
    if (Math.abs(a) > 55) {
      cards[i].style.visibility = 'hidden';
      continue;
    }
    cards[i].style.visibility = 'visible';
    var r = a * Math.PI / 180;
    var cosR = Math.cos(r);
    var sinR = Math.sin(r);
    cards[i].style.transform = 'translate3d(' + (RADIUS * sinR) + 'px, 0, ' + (RADIUS * (1 - cosR)) + 'px) rotateY(' + (-a) + 'deg)';
    cards[i].style.filter = 'brightness(' + (0.82 + 0.4 * (1 / cosR - 1)) + ')';
  }
  requestAnimationFrame(renderRing);
}
requestAnimationFrame(renderRing);

/* 3. MOCKUP BROWSER CONTROLS (< > & macOS buttons) */
var browserMock = document.getElementById('browserMockup');
var btnClose = document.getElementById('btnClose');
var btnMinimize = document.getElementById('btnMinimize');
var btnMaximize = document.getElementById('btnMaximize');
var btnPrevSection = document.getElementById('btnPrevSection');
var btnNextSection = document.getElementById('btnNextSection');

if (btnClose) {
  btnClose.addEventListener('click', function() {
    browserMock.classList.toggle('hidden-mock');
  });
}

if (btnMinimize) {
  btnMinimize.addEventListener('click', function() {
    browserMock.classList.toggle('minimized');
  });
}

if (btnMaximize) {
  btnMaximize.addEventListener('click', function() {
    browserMock.classList.toggle('maximized');
  });
}

var sections = ['overview', 'history', 'skills', 'market', 'roadmap'];
var currentSectionIdx = 0;

function scrollToSection(index) {
  if (index < 0) index = 0;
  if (index >= sections.length) index = sections.length - 1;
  currentSectionIdx = index;
  var targetEl = document.getElementById(sections[currentSectionIdx]);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth' });
  }
}

if (btnPrevSection) {
  btnPrevSection.addEventListener('click', function(e) {
    e.stopPropagation();
    scrollToSection(currentSectionIdx - 1);
  });
}

if (btnNextSection) {
  btnNextSection.addEventListener('click', function(e) {
    e.stopPropagation();
    scrollToSection(currentSectionIdx + 1);
  });
}

/* 4. CTA BUTTON & RESET MOCKUP BROWSER */
var ctaButton = document.querySelector('.navmenu .btn');
if (ctaButton) {
  ctaButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (browserMock.classList.contains('hidden-mock')) {
      browserMock.classList.remove('hidden-mock');
    }
    scrollToSection(0);
  });
}

/* 5. MOBILE MENU BURGER CONTROLLER */
var navEl = document.getElementById('mainNav');
var burgerBtn = document.getElementById('burgerBtn');
if (burgerBtn) {
  burgerBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    navEl.classList.toggle('open');
  });
}

/* 6. Feedback Handler */
function submitFeedback(e) {
  e.preventDefault();
  
  var formData = {
    name: e.target.querySelector('input[type="text"]').value,
    feedback: e.target.querySelector('textarea').value
  };

  var WEB_APP_URL = "https://script.google.com/macros/s/AKfycby9TKmEzC--_DrXOBT_bJ-N1Pwq7uY26GYqmaM508mpsJl4O-IJCji2IAKfFA25Aciw9g/exec";

  fetch(WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  }).then(function() {
    var fbSuccess = document.getElementById('fbSuccess');
    if (fbSuccess) fbSuccess.style.display = 'block';
    e.target.reset();
  }).catch(function(error) {
    console.error('Lỗi:', error);
  });
}
