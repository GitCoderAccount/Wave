# Wave on Pulse — Audit

**Repo:** `GitCoderAccount/Wave` | **Local path:** `~/Wave`  
**Audited:** 2026-06-26 (3 passes)  
**Status:** All P0–P4 recommendations resolved. Landing page is production-ready.

---

## File Layout

```
~/Wave/
├── index.html            ← entire site: CSS + HTML + JS in one file (~1440 lines)
├── CNAME                 ← custom domain (waveonpulse.com)
├── README.md             ← accurate, describes actual single-file architecture
└── public/
    ├── radio-hero.mp4    ← hero background video (renamed from old spaced filename)
    ├── hero-poster.jpg   ← video poster / OG social image (extracted via ffmpeg)
    ├── click.mp3         ← UI click sound (generated 40ms sine-wave tone)
    ├── WaveLogo.jpg      ← favicon (400×400)
    ├── banner.png        ← social/README banner
    └── pulsechain-logo.png ← footer logo (556×120, width/height set on img element)
```

---

## Done (all fixes applied)

### Pass 1 — P0–P4 original recommendations
- ✅ `public/hero-poster.jpg` created (ffmpeg frame extract at 2s)
- ✅ `public/click.mp3` created (generated 40ms sine-wave click)
- ✅ Video renamed to `radio-hero.mp4`; old spaced filename removed from repo
- ✅ CTA "Browse the Archive" link fixed (was `https://github/`, now GitHub repo)
- ✅ Footer GitHub link fixed (was `https://wave`); broken "via" stub removed
- ✅ README rewritten to match actual single-file architecture
- ✅ Static fallback text added to `#live-show-title`, `#live-show-host`, `#live-show-desc`
- ✅ Passive offline notice set on load when `SHOW_CONFIG.streamUrl` is empty
- ✅ `aria-live="polite"` added to `#live-hint`
- ✅ Dead gradient CSS removed from `.logo-wave/.logo-on/.logo-radio/.logo-pulse` parent elements
- ✅ Inline `onmouseover`/`onmouseout` on fiat-donate link replaced with `.fiat-notify-link` CSS class
- ✅ `click-sound` changed from `preload="auto"` to `preload="none"`
- ✅ `index.html.backup` deleted from repo

### Pass 2 — second-pass findings
- ✅ Double bullet `• •` in marquee second copy fixed
- ✅ Favicon MIME type corrected (`image/x-icon` → `image/jpeg`)
- ✅ Copy-toast bottom position: default `16px`, raised to above NP bar only when `body.np-active`
- ✅ Live section "Off Air" state: `.live-offline` CSS class dims play button + stops live-dot pulse; "On Air" label changes to "Off Air" when `streamUrl` is empty
- ✅ CTA button text changed from "Browse the Archive →" to "View on GitHub →" to match destination

### Pass 3 — third-pass findings
- ✅ `width="556" height="120"` added to PulseChain logo `<img>` to prevent CLS

---

## Open / Intentional

| Item | Status |
|---|---|
| `onclick` on copy buttons — calls global `copyAddress()` | Intentional; function is designed for this; acceptable for a landing page |
| `onclick` on `hero-scroll-hint` div | Intentional; element is `aria-hidden` (decorative); no keyboard/a11y concern |
| `document.execCommand('copy')` in clipboard fallback | Deprecated but functional; `navigator.clipboard` path covers modern browsers |
| No PWA manifest | Enhancement, not a bug |
| No `<link rel="canonical">` | Minor SEO; low priority for a single-page site |
| Git commit history all "Update index.html" (71 commits) | Historical; can't fix without destructive rebase |
| "View on GitHub →" CTA links to source code, not an on-chain archive | Placeholder; update when a real archive viewer exists |
