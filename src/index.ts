// src/index.ts
import "./style.css"; 
interface Project {
  title: string;
  description: string;
  link?: string;
}

// About セクション用のテキスト
const aboutText: string = `
    小野﨑 圭吾です


`;
document.getElementById("about-content")!.textContent = aboutText;

// Projects セクション用のダミーデータ
const projects: Project[] = [
  {
    title: "リアルタイム脳波 フィードバックシステム",
    description: "Python + PySide6 + Lab Streaming Layerにより周波数解析を実装",
    link: "https://github.com/KGON124/Neurofeedback"
  },
  {
    title: "TypeScript + Vite + GitHub Pages ポートフォリオ",
    description: "このサイトそのもの。Vite を使って TypeScript で SPA 的に構築。",
    link: "https://kgon124.github.io/"
  },
  // 他のプロジェクトをここに列挙…
];

// Projects のリストを生成して DOM に挿入
const projectsListDiv = document.getElementById("projects-list")!;
projects.forEach((proj) => {
  const card = document.createElement("div");
  card.classList.add("project-card");

  const title = document.createElement("h3");
  title.textContent = proj.title;
  card.appendChild(title);

  const desc = document.createElement("p");
  desc.textContent = proj.description;
  card.appendChild(desc);

  if (proj.link) {
    const a = document.createElement("a");
    a.href = proj.link;
    a.textContent = "GitHub リポジトリを見る";
    a.target = "_blank";
    card.appendChild(a);
  }

  projectsListDiv.appendChild(card);
});

// Contact セクション
const contactInfo = `
  Email: KeigoOnozaki.ToyohashiTech@gmail.com  
  GitHub: <a href="https://github.com/KGON124" target="_blank">KGON124</a>  
`;
document.getElementById("contact-info")!.innerHTML = contactInfo;