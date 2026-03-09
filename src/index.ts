// JSONデータをインポート
import contentData from './data/content.json';

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
  const scrollY = window.scrollY;
  document.querySelectorAll<HTMLElement>('.shape').forEach((shape, idx) => {
    const speed = (idx + 1) * 0.1;
    const rotation = scrollY * speed;
    const translateY = Math.sin(scrollY * 0.01 + idx) * 20;
    shape.style.transform = `translateY(${translateY}px) rotate(${rotation}deg)`;
  });
}

// パララックス効果
function parallaxEffect(): void {
  const scrolled = window.scrollY;
  document.querySelectorAll<HTMLElement>('.hero').forEach(el => {
    el.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
}

// JSONデータからコンテンツを生成する
function renderContent(): void {
  // Hero
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) heroTitle.textContent = contentData.hero.title;
  const heroParagraphs = document.querySelectorAll('.hero p');
  if (heroParagraphs.length >= 2) {
    heroParagraphs[0].textContent = contentData.hero.subtitle;
    heroParagraphs[1].textContent = contentData.hero.description;
  }

  // About
  const aboutBox = document.querySelector('#about .about-content');
  if (aboutBox) {
    aboutBox.innerHTML = '';
    contentData.about.paragraphs.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      aboutBox.appendChild(p);
    });
  }

  // Projects
  const projectsGrid = document.querySelector('#projects .projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = '';
    contentData.projects.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'project-card fade-in visible';

      const title = document.createElement('h3');
      title.textContent = item.name;
      card.appendChild(title);

      const desc = document.createElement('p');
      desc.textContent = item.description;
      card.appendChild(desc);

      if (item.video) {
        const videoCont = document.createElement('div');
        videoCont.className = 'video-container';
        videoCont.innerHTML = `<iframe src="${item.video}" title="${item.name} Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" style="width:100%; aspect-ratio:16/9; border-radius: 8px;"></iframe>`;
        card.appendChild(videoCont);
      }

      if ((item as any).images && (item as any).images.length > 0) {
        const slideshowCont = document.createElement('div');
        slideshowCont.className = 'slideshow';
        (item as any).images.forEach((imgSrc: string, index: number) => {
          const img = document.createElement('img');
          img.src = imgSrc;
          img.className = index === 0 ? 'slide active' : 'slide';
          img.style.width = '100%';
          img.style.height = 'auto';
          img.style.objectFit = 'cover';
          img.style.borderRadius = '8px';
          slideshowCont.appendChild(img);
        });
        card.appendChild(slideshowCont);
      }

      if (item.link) {
        const link = document.createElement('a');
        link.href = item.link;
        link.target = "_blank";
        link.textContent = item.linkText || "link";
        // removed the hardcoded Mindmap thumbnail logic as requested
        card.appendChild(link);
      }

      if (item.techStack) {
        const techStack = document.createElement('div');
        techStack.className = 'tech-stack';
        item.techStack.forEach(tech => {
          const tag = document.createElement('span');
          tag.className = 'tech-tag';
          tag.textContent = tech;
          techStack.appendChild(tag);
        });
        card.appendChild(techStack);
      }

      projectsGrid.appendChild(card);
    });
  }

  // Research
  const researchCard = document.querySelector('#research .research-card');
  if (researchCard) {
    researchCard.innerHTML = '';

    let htmlContent = `<h3>${contentData.research.theme}</h3>`;
    contentData.research.paragraphs.forEach(p => {
      htmlContent += `<p>${p}</p>`;
    });

    htmlContent += `<br/>
    <p><strong>キーワード:</strong> ${contentData.research.keyword}</p>
    <p><strong>使用技術:</strong> ${contentData.research.tech}</p>
    <p><strong>今後の展望:</strong> ${contentData.research.future}</p>
    <p><img src="${contentData.research.image}" alt="Research diagram" class="research-image" style="max-width: 100%; height: auto;"></p>`;

    researchCard.innerHTML = htmlContent;
  }

  // Experience
  const expGrid = document.querySelector('#Experience .projects-grid');
  if (expGrid) {
    expGrid.innerHTML = '';
    contentData.experience.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'project-card fade-in visible';

      let html = `<h3>${item.title}</h3>`;
      if (item.period) {
        html += `<p>${item.period}</p>`;
      }

      html += `<p>${item.description}</p>`;

      if ((item as any).images && (item as any).images.length > 0) {
        html += `<div class="slideshow">`;
        (item as any).images.forEach((imgSrc: string, index: number) => {
          const activeClass = index === 0 ? ' active' : '';
          html += `<img src="${imgSrc}" class="slide${activeClass}" width="100%" height="auto" style="object-fit:cover; border-radius:8px;" />`;
        });
        html += `</div>`;
      }

      if (item.link) {
        html += `<a href="${item.link}" target="_blank">link</a>`;
      }

      if (item.techStack) {
        html += `<div class="tech-stack">`;
        item.techStack.forEach(tech => {
          html += `<span class="tech-tag">${tech}</span>`;
        });
        html += `</div>`;
      }

      card.innerHTML = html;
      expGrid.appendChild(card);
    });
  }

  // Profile (Timeline)
  const timeline = document.querySelector('#profile .timeline');
  if (timeline) {
    timeline.innerHTML = '';
    contentData.profile.items.forEach(item => {
      const tItem = document.createElement('div');
      tItem.className = 'timeline-item fade-in visible';

      let html = `<div class="timeline-content">
                    <div class="timeline-year">${item.year}</div>`;
      item.lines.forEach(line => {
        html += `<p>${line}</p>`;
      });
      html += `</div>`;

      tItem.innerHTML = html;
      timeline.appendChild(tItem);
    });
  }

  // Skills
  const skillsGrid = document.querySelector('#skills .skills-grid');
  if (skillsGrid) {
    skillsGrid.innerHTML = '';
    contentData.skills.categories.forEach(cat => {
      const sGroup = document.createElement('div');
      sGroup.className = 'skill-category fade-in visible';

      let html = `<h3>${cat.title}</h3><ul class="skill-list">`;
      cat.items.forEach(skill => {
        html += `<li>${skill}</li>`;
      });
      html += `</ul>`;

      sGroup.innerHTML = html;
      skillsGrid.appendChild(sGroup);
    });
  }
}

// 初期化
function init(): void {
  // コンテンツの描画を実行
  renderContent();

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

  // スライドショーの初期化
  const slides = document.querySelectorAll<HTMLElement>('.slide');
  if (slides.length > 0) {
    let index = 0;
    setInterval(() => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 4000); // 4秒ごとに切り替え
  }
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