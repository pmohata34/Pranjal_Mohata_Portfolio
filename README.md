# 🪐 Cinematic Personal Portfolio

A visually stunning, high-performance cinematic personal portfolio built with **Next.js 16 (App Router)**, **React 19**, **GSAP**, **Three.js**, and **CSS Modules**. Features interactive 3D particle systems, fluid scroll-driven animations, a magnetic custom cursor, and automatic brand assets synchronization.

[![Demo Website](https://img.shields.io/badge/demo-live-brightgreen.svg?style=for-the-badge&logo=vercel&color=d946ef)](https://pranjal-mohata-portfolio.vercel.app)
[![Next.js Version](https://img.shields.io/badge/Next.js-16.2-black.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/React-19.0-61dafb.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38bdf8.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## ✨ Features

- **🌀 Interactive 3D Particles & WebGL Canvas**: Real-time 3D particle systems rendering under the hero and work experience sections, responsive to user scroll speed and mouse position.
- **🎨 Fluid Scroll Transitions**: Smooth panel animations, scale shifts, and letter-reveal animations powered by GSAP ScrollTrigger and Framer Motion.
- **🖱️ Magnetic Custom Cursor**: Interactive custom cursor component that aligns dynamically with UI elements.
- **📱 Responsive Layout**: Fully responsive layouts with customized mobile styles, including optimized video/image fallbacks.
- **⚡ Next.js 16 & React Compiler**: Optimized compile-time and run-time performance, utilizing React 19 Compiler support, dynamic open-graph card generation, and structured JSON-LD SEO schemas.
- **✉️ Seamless Contact System**: Integrated contact form utilizing Web3Forms API with client-side status handling.
- **🖌️ Monogram & Logo Utilities**: Python scripts to programmatically design custom monogram logos and resize them to all standard favicon formats.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16.2 (App Router) & React 19 |
| **Animations** | GSAP 3 (ScrollTrigger) & Three.js (WebGL renderer) |
| **Styling** | CSS Modules + Tailwind CSS v4 (design token mapping) |
| **Contact API** | Web3Forms API |
| **Build Tools** | Babel React Compiler, PostCSS, ESLint |

---

## 📂 Project Structure

```text
├── app/
│   ├── globals.css           # Styling system & theme custom properties (CSS variables)
│   ├── layout.js             # Root template, next/font imports, metadata & JSON-LD
│   ├── page.js               # Main page layout orchestrating sections
│   ├── opengraph-image.jsx   # Dynamic OG:image generator card
│   ├── robots.js & sitemap.js# SEO index configurations
├── components/
│   ├── sections/             # Modular section components (Hero, About, Projects, etc.)
│   ├── three/                # 3D Canvas elements (particle engines & shaders)
│   └── ui/                   # Shared UI primitives (magnetic buttons, menus, cursor)
├── data/
│   ├── profile.json          # Personal information, jobs, projects, credentials
│   └── content.json          # Site text copy and non-personal content labels
├── lib/
│   ├── gsap.js               # GSAP initialization & plugin registration
│   └── siteConfig.js         # General site configurations (e.g. host URL)
├── public/
│   ├── assets/               # Image/video background files & generated logo
│   └── favicons/             # Multi-size favicons and web manifests
└── scripts/
    ├── create-logo.py        # Python monogram logo generator
    └── generate-favicons.py  # Python multi-format favicon exporter
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/pmohata34/Pranjal_Mohata_Portfolio.git
cd Pranjal_Mohata_Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## ⚙️ Customization Manual

### 1. Update Profile Information (`data/profile.json`)
All personal metadata and sections feed from `data/profile.json`. Adjust the fields to make it your own:

- `name`: First, last, and full names used in headings and metadata.
- `email`: Form target email.
- `web3formsKey`: Access key for [Web3Forms](https://web3forms.com) to receive message submissions.
- `tagline` & `description`: Summary descriptions used on the hero and footer sections.
- `stats`: Key numeric highlights.
- `skills`: Text tags shown in scrolling marquees.
- `experience`: Professional career steps list.
- `projects`: Project details (each refers to an asset image filename).
- `publications`: Certifications and honors.
- `socials`: Social media profile links.

### 2. Update Copy Text (`data/content.json`)
Customize section titles, taglines, layout headers, and CTA texts in `data/content.json`.

### 3. Generate Custom Monogram Logo & Favicons
Run the automation scripts to generate a brand new monogram logo from Python:

```bash
# Verify PIL (Pillow) and numpy are installed
pip install Pillow numpy

# Run the monogram logo builder
python scripts/create-logo.py
```
This generates a custom `public/assets/logo.png` and automatically calls `scripts/generate-favicons.py` to regenerate all mobile and desktop favicons.

### 4. Custom Styling & Theme Variables
Adjust colors, fonts, and styles by editing `app/globals.css`. The primary variable mappings are located under `:root`:

- `--accent`: Glowing theme highlight color (e.g., `#d946ef`).
- `--hero-start`, `--hero-mid`, `--hero-end`: Background gradient definitions.
- `--text-primary`: Primary color for typography.

### 5. Update Web URL
Modify the `SITE_URL` parameter in `lib/siteConfig.js` to point to your domain before exporting.

---

## 📦 Deployment

This repository is optimized to deploy with zero configuration on [Vercel](https://vercel.com). Connect your repository and add your domain.

Alternatively, compile and deploy via CLI:
```bash
npm i -g vercel
vercel
```

---

## 📝 License

Distributed under the MIT License. Feel free to copy, modify, and build upon this code for personal or commercial uses.
