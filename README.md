# Anurag Pandey — Portfolio

A fast, accessible, fully responsive personal portfolio for an AI/ML engineer.
Built from scratch with plain **HTML, CSS, and JavaScript** — no frameworks, no
build step. Dark mode is the default, with a light-mode toggle that remembers
your choice.

**Aesthetic:** engineering-editorial — ink-and-paper monochrome with a single
lime signal accent, fluid typography, scroll-reveal motion, and an animated
hero signal canvas. Motion respects `prefers-reduced-motion`.

---

## File structure

```
portfolio/
├── index.html      # All content & markup (semantic, accessible)
├── style.css       # Design tokens, themes, layout, components, responsive
├── script.js       # Theme toggle, scroll-reveal, scrollspy, menu, canvas
└── README.md       # This file
```

---

## Run locally

No build tools required.

**Option A — open the file**
Double-click `index.html`, or drag it into a browser.

**Option B — serve it (recommended for clean routing/fonts)**

```bash
# Python 3
python3 -m http.server 5173
# then visit http://localhost:5173

# …or with Node
npx serve .
```

> Fonts (Clash Display, Satoshi, JetBrains Mono) load from CDN, so the polished
> type needs an internet connection. Offline, the site falls back to clean
> system fonts and still works.

---

## Deploy on Vercel

**Drag-and-drop (no account setup beyond signing in):**

1. Go to [vercel.com/new](https://vercel.com/new) and sign in.
2. Drag the entire `portfolio/` folder onto the page.
3. Vercel detects a static site automatically — no framework preset, no build
   command needed. Click **Deploy**.
4. You get a live `*.vercel.app` URL in seconds.

**CLI alternative:**

```bash
npm i -g vercel
cd portfolio
vercel          # follow the prompts; accept the static-site defaults
vercel --prod   # promote to production
```

It also deploys as-is to Netlify, GitHub Pages, or Cloudflare Pages — just
publish the folder.

---

## What to customize

Everything lives in three files. Quick map:

**1. Content → `index.html`**
- Text, headings, and copy are all in plain HTML — edit in place.
- **Project links:** each project has a `.project__links` block. The JeevVeda
  live demo (`jeevveda.com`) is set. The **Source** links point to the GitHub
  profile (`github.com/Anuragp-001`) — swap in the exact repo URLs, and add the
  Streamlit / Render demo URLs for **MedBuddy** and **BankDataLens** when ready.
  (Look for the `CUSTOMIZE LINKS` comment above the Projects section.)
- **Contact:** email, phone, LinkedIn, and GitHub are in the `#contact` section
  and the mobile menu footer.
- **Stats:** the About counters use `data-count` / `data-suffix` — update both
  the attribute and the visible number.

**2. Look & feel → `style.css`**
- All colors, fonts, spacing, and radii are CSS variables at the very top
  (`:root` for dark, `:root[data-theme="light"]` for light).
- Change the accent everywhere by editing `--accent` and `--accent-fill`.
- Swap fonts by changing `--font-display`, `--font-sans`, `--font-mono`
  (and the matching `<link>` tags in `index.html`).

**3. Behavior → `script.js`**
- Self-contained modules for the theme toggle, scroll reveals, scrollspy,
  mobile menu, copy-email, count-up, and the hero canvas.
- To slow or speed the hero signal, tweak the `lines[]` config and the `t +=`
  increment in the `signal` module.

**Favicon:** an inline SVG data-URI in `<head>` — no external file to manage.

---

Designed and built by Anurag Pandey.
