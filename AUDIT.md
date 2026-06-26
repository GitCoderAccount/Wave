# Wave on Pulse — Audit

**Repo:** `GitCoderAccount/Wave` | **Local path:** `~/Wave`  
**Audited:** 2026-06-26  
**Status:** Landing page only — single `index.html`, no build system

---

## File Layout

```
~/Wave/
├── index.html            ← entire site: CSS + HTML + JS in one file (1419 lines)
├── index.html.backup     ← stale backup, should be deleted from repo
├── CNAME                 ← custom domain (waveonpulse.com)
├── README.md             ← outdated; describes a multi-file structure that doesn't exist
└── public/
    ├── WaveLogo.jpg
    ├── banner.png
    ├── pulsechain-logo.png
    └── Radio_Dial_Frequency_Pattern_Video (1).mp4
```

**Missing referenced assets:**
- `public/hero-poster.jpg` — used in OG meta, Twitter card, and `<video poster>` — 404 on load
- `public/click.mp3` — referenced by click-sound `<audio>` — 404, click sound silently broken

---

## Done

- Single-page landing with: marquee, sticky header, hero video, features (8 cards), live stream player, podcasts (stub), schedule (stub), about, donate (EVM + BTC), footer
- Responsive (≤900px hamburger menu, ≤600px font scaling)
- IntersectionObserver for active nav and card reveal animations
- Animated logo letter-by-letter ocean wave effect (idle + hover)
- Live stream play/pause with Now Playing bar
- Clipboard copy for donation addresses

---

## Open Recommendations

### P0 — Broken functionality
1. **`public/hero-poster.jpg` missing** — video shows blank/flash on load; OG + Twitter card images 404
2. **`public/click.mp3` missing** — click-sound feature silently broken
3. **"Browse the Archive →" CTA links to `https://github/`** (line 983) — broken URL; likely meant to be the GitHub repo or an on-chain explorer
4. **Footer GitHub link is `https://wave`** (line 1175) — broken stub
5. **Footer second link (`via`, line 1176) is `https://wave`** — broken, unclear purpose

### P1 — Content & correctness
6. **README describes a non-existent multi-file structure** (`src/scripts/`, `src/styles/`, `package.json`) — the `npm install / npm run dev` instructions are wrong; entire README should be rewritten to match reality
7. **Live section shows blank text before JS runs** — `#live-show-title`, `#live-show-host`, `#live-show-desc` have no static fallback; add `SHOW_CONFIG` defaults inline or populate eagerly
8. **No "offline / coming back soon" state for streamUrl="" ** — user must click play to discover there's no stream; add a passive offline-notice badge on the live card when `SHOW_CONFIG.streamUrl` is empty

### P2 — Code hygiene
9. **`index.html.backup` committed to repo** — delete it; use git history if you ever need an old version
10. **71 commits all named "Update index.html"** — not actionable, but future-you will thank better messages
11. **Logo gradient CSS on parent `.logo-wave/.logo-on/.logo-radio/.logo-pulse` (lines 162–173) is dead code** after `initLogoWave()` replaces text with `.wl` spans; the gradient lives on `.wl` instead
12. **Inline `onmouseover`/`onmouseout` on fiat-donate link** (line 1155–1156) — inconsistent with rest of the site which uses CSS transitions; replace with a class
13. **`copyAddress` is a global function called via inline `onclick`** — works, but inconsistent with the rest of the event-listener pattern; move to addEventListener

### P3 — Performance & assets
14. **Video filename has spaces and parentheses** (`Radio_Dial_Frequency_Pattern_Video (1).mp4`) — rename to `radio-hero.mp4` or similar; spaces in filenames are fragile
15. **`<audio id="click-sound" preload="auto">`** preloads a sound file on every page load for a minor nicety; change to `preload="none"` and load lazily on first interaction
16. **No `<link rel="manifest">` or service worker** — site is served from GitHub Pages and works fine without one, but a basic manifest would enable "Add to Home Screen" on mobile

### P4 — Accessibility
17. **`#live-hint` text change happens only on click** — screen reader users have no indication the live section is offline until they activate the play button; add `aria-live="polite"` to `#live-hint` and set the offline text passively on load when `streamUrl` is empty
