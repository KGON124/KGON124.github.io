// スクロール先にジャンプ
export function scrollToSection(sectionId: string): void {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ページトップへ戻る
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// プログレスバー更新
function updateProgressBar(): void {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = `${scrolled}%`;
}

// スクロールトップボタン表示切替
function toggleScrollToTop(): void {
  const btn = document.getElementById('scrollToTop');
  if (!btn) return;
  if (window.scrollY > 300) btn.classList.add('visible');
  else btn.classList.remove('visible');
}

// フェードインアニメーション
function handleScrollAnimation(): void {
  document.querySelectorAll<HTMLElement>('.fade-in').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 150) {
      el.classList.add('visible');
    }
  });
}

// 背景シェイプの回転・揺れ
function animateShapes(): void {
  const scrollY = window.pageYOffset;
  document.querySelectorAll<HTMLElement>('.shape').forEach((shape, idx) => {
    const speed = (idx + 1) * 0.1;
    const rotation = scrollY * speed;
    const translateY = Math.sin(scrollY * 0.01 + idx) * 20;
    shape.style.transform = `translateY(${translateY}px) rotate(${rotation}deg)`;
  });
}

// パララックス効果
function parallaxEffect(): void {
  const scrolled = window.pageYOffset;
  document.querySelectorAll<HTMLElement>('.hero').forEach(el => {
    el.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
}

// 初期化
function init(): void {
  // シェイプのアニメーション遅延・速度をランダム化
  document.querySelectorAll<HTMLElement>('.shape').forEach((shape, idx) => {
    shape.style.animationDelay = `${Math.random() * 2}s`;
    shape.style.animationDuration = `${4 + Math.random() * 4}s`;
  });

  // 技術タグのクリックアニメーション
  document.querySelectorAll<HTMLElement>('.tech-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      tag.style.animation = 'pulse 0.6s ease-in-out';
      setTimeout(() => { tag.style.animation = ''; }, 600);
    });
  });

  // スキルリスト、プロジェクトカードのアニメーション設定は CSS 側でキーフレーム指定済み

  handleScrollAnimation();  // 初回フェードイン
}

// イベントリスナー登録
window.addEventListener('DOMContentLoaded', init);
window.addEventListener('scroll', () => {
  updateProgressBar();
  toggleScrollToTop();
  handleScrollAnimation();
  animateShapes();
  parallaxEffect();

  // ナビバー背景の透明度調整
  const navbar = document.querySelector<HTMLElement>('.navbar');
  if (navbar) {
    const opacity = Math.min(0.95, 0.7 + window.scrollY / 500);
    navbar.style.background = `rgba(0,0,0,${opacity})`;
  }
});