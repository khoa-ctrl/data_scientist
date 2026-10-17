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

/* 2. 3D CAROUSEL RING — DATA SCIENCE TECH CARDS */
var SHOTS = [
  { icon: '🤖', title: 'Machine Learning', desc: 'Thuật toán dự báo & Phân loại dữ liệu', tag: 'Scikit-Learn' },
  { icon: '📊', title: 'Data Analytics', desc: 'Phân tích xu hướng & Trực quan hóa', tag: 'Tableau / PowerBI' },
  { icon: '🐍', title: 'Python Code', desc: 'Ngôn ngữ cốt lõi cho Data Science', tag: 'Pandas & NumPy' },
  { icon: '🗄️', title: 'SQL Database', desc: 'Truy vấn & Quản trị dữ liệu lớn', tag: 'PostgreSQL' },
  { icon: '🧠', title: 'Deep Learning', desc: 'Mạng thần kinh nhân tạo & AI', tag: 'PyTorch / TensorFlow' },
  { icon: '📈', title: 'Statistics', desc: 'Toán xác suất & Thống kê ứng dụng', tag: 'Math & Logic' },
  { icon: '☁️', title: 'Big Data', desc: 'Xử lý dữ liệu quy mô lớn', tag: 'Spark / Hadoop' }
];

function createTechCard(data) {
  return '<div class="card-content">' +
    '<div class="card-icon">' + data.icon + '</div>' +
    '<div>' +
      '<div class="card-title">' + data.title + '</div>' +
      '<div class="card-desc">' + data.desc + '</div>' +
    '</div>' +
    '<div class="card-tag">' + data.tag + '</div>' +
  '</div>';
}

var ringEl = document.getElementById('carouselRing');
var cards = [];
var NUM_CARDS = 24;
var RADIUS = 850;
var STEP = 360 / NUM_CARDS;

for (var c = 0; c < NUM_CARDS; c++) {
  var cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  var shotData = SHOTS[c % SHOTS.length];
  cardDiv.innerHTML = createTechCard(shotData);
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
    phase -= 1.8 * dt;
  }

  for (var i = 0; i < NUM_CARDS; i++) {
    var a = ((i * STEP + phase) % 360 + 540) % 360 - 180;
    if (Math.abs(a) > 45) {
      cards[i].style.visibility = 'hidden';
      continue;
    }
    cards[i].style.visibility = 'visible';
    var r = a * Math.PI / 180;
    var cosR = Math.cos(r);
    var sinR = Math.sin(r);
    cards[i].style.transform = 'translate3d(' + (RADIUS * sinR) + 'px, 0, ' + (RADIUS * (1 - cosR)) + 'px) rotateY(' + (-a) + 'deg)';
    cards[i].style.filter = 'brightness(' + (0.85 + 0.45 * (1 / cosR - 1)) + ')';
  }
  requestAnimationFrame(renderRing);
}
requestAnimationFrame(renderRing);

/* 3. MOCKUP BROWSER CONTROLS (Nút macOS & Chuyển Trang) */
var browserMock = document.getElementById('browserMockup');
var btnClose = document.getElementById('btnClose');
var btnMinimize = document.getElementById('btnMinimize');
var btnMaximize = document.getElementById('btnMaximize');
var btnPrevSection = document.getElementById('btnPrevSection');
var btnNextSection = document.getElementById('btnNextSection');
var pageScroll = document.getElementById('pageScroll');

// Nút Đỏ: Đóng/Ẩn Mockup
if (btnClose) {
  btnClose.addEventListener('click', function() {
    browserMock.classList.toggle('hidden-mock');
  });
}

// Nút Vàng: Thu nhỏ/Mở lại
if (btnMinimize) {
  btnMinimize.addEventListener('click', function() {
    browserMock.classList.toggle('minimized');
  });
}

// Nút Xanh: Phóng to Toàn màn hình
if (btnMaximize) {
  btnMaximize.addEventListener('click', function() {
    browserMock.classList.toggle('maximized');
  });
}

// Chuyển nhanh giữa các Section (< >)
var sections = ['overview', 'history', 'skills', 'market', 'roadmap', 'quiz'];
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
  btnPrevSection.addEventListener('click', function() {
    scrollToSection(currentSectionIdx - 1);
  });
}

if (btnNextSection) {
  btnNextSection.addEventListener('click', function() {
    scrollToSection(currentSectionIdx + 1);
  });
}

/* 4. MOBILE MENU BURGER CONTROLLER */
var navEl = document.getElementById('mainNav');
var burgerBtn = document.getElementById('burgerBtn');
if (burgerBtn) {
  burgerBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    navEl.classList.toggle('open');
  });
}

/* 5. INTERACTIVE QUIZ & FEEDBACK FORM */
var quizQuestions = [
  {
    q: "Câu 1: Khi gặp một biểu đồ số liệu phức tạp trên tin tức, phản ứng đầu tiên của bạn là gì?",
    opts: [
      "Lướt qua nhanh vì cảm thấy khô khô khan.",
      "Xem lướt con số tổng quan để biết thông tin.",
      "Tò mò xem nguồn dữ liệu ở đâu và phân tích xem con số đó có chính xác không."
    ],
    score: [1, 2, 3]
  },
  {
    q: "Câu 2: Bạn thích làm việc với dạng bài toán nào nhất?",
    opts: [
      "Các bài toán viết văn, thể hiện cảm xúc cá nhân.",
      "Bài toán tính toán nhanh có công thức sẵn.",
      "Bài toán logic có nhiều biến số, đòi hỏi suy luận và tìm bản chất nguyên nhân."
    ],
    score: [1, 2, 3]
  },
  {
    q: "Câu 3: Mức độ kiên nhẫn của bạn khi gặp lỗi máy tính hoặc logic là bao nhiêu?",
    opts: [
      "Bỏ cuộc ngay lập tức để làm việc khác.",
      "Thử lại 1-2 lần rồi nhờ người khác.",
      "Kiên trì tìm kiếm Google, đọc tài liệu để tự sửa bằng được."
    ],
    score: [1, 2, 3]
  }
];

var currentQIdx = 0;
var totalQuizScore = 0;

function renderQuiz() {
  var qObj = quizQuestions[currentQIdx];
  var qEl = document.getElementById('quizQ');
  var optsEl = document.getElementById('quizOpts');
  if (!qEl || !optsEl) return;

  qEl.textContent = qObj.q;
  optsEl.innerHTML = '';
  qObj.opts.forEach(function(optText, idx) {
    var optDiv = document.createElement('div');
    optDiv.className = 'quiz-opt';
    optDiv.textContent = optText;
    optDiv.onclick = function() { answerQuiz(idx); };
    optsEl.appendChild(optDiv);
  });
}

function answerQuiz(optIdx) {
  var qObj = quizQuestions[currentQIdx];
  totalQuizScore += qObj.score[optIdx];
  currentQIdx++;

  if (currentQIdx < quizQuestions.length) {
    renderQuiz();
  } else {
    var quizBox = document.getElementById('quizOpts');
    var qEl = document.getElementById('quizQ');
    var resEl = document.getElementById('quizRes');
    if (qEl) qEl.style.display = 'none';
    if (quizBox) quizBox.style.display = 'none';
    if (resEl) {
      resEl.style.display = 'block';
      if (totalQuizScore >= 8) {
        resEl.innerHTML = '🎯 <b>Đánh giá: Rất Phù Hợp!</b> Bạn có tư duy phản biện cao, sự tò mò tự nhiên và tính kiên trì — những phẩm chất vàng của một Data Scientist tương lai.';
      } else if (totalQuizScore >= 5) {
        resEl.innerHTML = '✨ <b>Đánh giá: Khá Phù Hợp!</b> Bạn có nền tảng tiềm năng. Hãy rèn luyện thêm tư duy logic và làm quen với Python/SQL nhé.';
      } else {
        resEl.innerHTML = '📚 <b>Đánh giá: Hãy Thử Khám Phá!</b> Ngành dữ liệu rất rộng lớn. Bạn có thể bắt đầu từ việc học Excel và vẽ biểu đồ trực quan trước.';
      }
    }
  }
}
renderQuiz();

function submitFeedback(e) {
  e.preventDefault();
  var fbSuccess = document.getElementById('fbSuccess');
  if (fbSuccess) fbSuccess.style.display = 'block';
  e.target.reset();
}