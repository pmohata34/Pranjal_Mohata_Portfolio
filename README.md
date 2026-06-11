#  Pranjal Mohata Portfolio

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Outfit&size=24&duration=3000&pause=1000&color=d946ef&center=true&vCenter=true&width=600&lines=Full+Stack+Developer;9%2B+AWS+Academy+Certified;Specializing+in+Next.js+%2B+Three.js" alt="Typing SVG" />
</div>

<p align="center">
  A high-performance, visually stunning personal portfolio built with <b>Next.js 16 (App Router)</b>, <b>React 19</b>, <b>Three.js</b>, <b>GSAP 3</b>, and <b>CSS Modules</b>. Engineered to be cinematic, fully interactive, and completely responsive.
</p>

<div align="center">
  <a href="https://www.pranjalmohata.in">
    <img src="https://img.shields.io/badge/demo-live-brightgreen.svg?style=for-the-badge&logo=vercel&color=d946ef" alt="Live Demo" />
  </a>
  <a href="https://github.com/pmohata34/Pranjal_Mohata_Portfolio">
    <img src="https://img.shields.io/badge/github-repo-black.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
  <a href="https://www.linkedin.com/in/pranjal-mohata">
    <img src="https://img.shields.io/badge/linkedin-profile-blue.svg?style=for-the-badge&logo=linkedin" alt="LinkedIn" />
  </a>
</div>

---

## Dynamic Visual Features

*   **Interactive 3D WebGL Canvas**: Real-time particle systems rendering underneath the Hero and Work Experience sections, dynamically responding to user scroll speeds and mouse coordinates.
*   **Cinematic Scroll Transitions**: Fluid scroll-driven scaling, panel sliding, and text-reveal animations powered by **GSAP ScrollTrigger** and **Framer Motion**.
*   **Custom Magnetic Cursor**: Interactive cursor follower that snaps onto navigation menus and active buttons.
*   **Dynamic Page-Loop Transition**: High-performance "fade-to-black" scroll transition that connects the footer cleanly back to the hero section.
*   **Python Brand Automation**: Python script utilities to programmatically build custom monogram logos and resize them to all standard mobile and desktop favicon formats.

---

## 🛠️ Tech Stack & Architecture

<table align="center">
  <tr>
    <td><b>Framework</b></td>
    <td>Next.js 16.2 (App Router) & React 19 (React Compiler support)</td>
  </tr>
  <tr>
    <td><b>3D Canvas</b></td>
    <td>Three.js (WebGL rendering, Custom Shaders & Bokeh particle fields)</td>
  </tr>
  <tr>
    <td><b>Animations</b></td>
    <td>GSAP 3 (ScrollTrigger) & Framer Motion</td>
  </tr>
  <tr>
    <td><b>Styling</b></td>
    <td>CSS Modules & Tailwind CSS v4 (design token configuration)</td>
  </tr>
  <tr>
    <td><b>Form Pipeline</b></td>
    <td>Web3Forms API integration with status feedbacks</td>
  </tr>
</table>

---

## 📂 Project Navigation

```text
├── app/
│   ├── globals.css           # Core theme properties (CSS variables)
│   ├── layout.js             # HTML template, SEO JSON-LD & Font configs
│   ├── page.js               # Page snap-scrolling orchestrator
│   └── opengraph-image.jsx   # Dynamic preview card builder
├── components/
│   ├── sections/             # Core layout blocks (Hero, About, Projects, Footer)
│   ├── three/                # 3D Particle canvases
│   └── ui/                   # Magnetic buttons, cursor, orbits
├── data/
│   ├── profile.json          # Portfolio text data (Projects, experiences, stats)
│   └── content.json          # Site copy labels
└── scripts/
    ├── create-logo.py        # Python monogram logo generator
    └── generate-favicons.py  # PIL-based multi-resolution favicon exporter
```

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the Node modules:
```bash
git clone https://github.com/pmohata34/Pranjal_Mohata_Portfolio.git
cd Pranjal_Mohata_Portfolio
npm install
```

### 2. Run Locally
Launch the development server:
```bash
npm run dev
```
Open `http://localhost:3000` to preview.

### 3. Production Build
Compile and test local production builds:
```bash
npm run build
npm start
```

---

## ⚙️ Customization Guide

### 1. Data Modification
Edit `data/profile.json` to swap in your personal details:
*   `name`: Your name (used in layout text & structured metadata).
*   `web3formsKey`: Web3Forms API key to receive emails directly.
*   `experience` & `projects`: Swaps career history cards and portfolio projects.

### 2. Color Styling & Tokens
Customize accent colors and background gradients by modifying values in `app/globals.css`:
```css
:root {
  --accent: #d946ef;        /* Main glowing accent color */
  --hero-start: #06020f;    /* Landing background colors */
  --hero-end: #030108;
}
```

### 3. Brand Assets Generator
Regenerate your monogram logo and all mobile/desktop favicons:
```bash
pip install Pillow numpy
python scripts/create-logo.py
```

---

## 📦 Deployment
Deploy with zero configuration to **Vercel**:
```bash
npm i -g vercel
vercel
```

---

## 📝 License
Distributed under the MIT License. Adapt and build upon this project freely!
