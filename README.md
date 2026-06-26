# Wave on Pulse

Live free speech radio permanently archived on PulseChain. Single-page static site — no build step required.

**Live site:** [waveonpulse.com](https://waveonpulse.com)

## Project structure

```
Wave/
├── index.html          # Entire site: CSS, HTML, and JS in one file
├── CNAME               # Custom domain for GitHub Pages
└── public/
    ├── radio-hero.mp4  # Hero background video
    ├── hero-poster.jpg # Video poster / OG image
    ├── WaveLogo.jpg    # Favicon
    ├── banner.png      # Social/README banner
    ├── pulsechain-logo.png
    └── click.mp3       # UI click sound
```

## Running locally

No dependencies. Open `index.html` directly in a browser, or serve it with any static server:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Configuring the live stream

At the top of the `<script>` block in `index.html`, update `SHOW_CONFIG`:

```js
const SHOW_CONFIG = {
  title:       "Show name",
  host:        "Hosted by ...",
  description: "Show description.",
  streamUrl:   "https://your-stream-url.here"  // leave empty when offline
};
```

When `streamUrl` is empty the live section shows an offline notice automatically.

## Deployment

Push to `main` — GitHub Pages deploys automatically via the `CNAME` record pointing to `waveonpulse.com`.

## Color palette

| Token | Hex | Use |
|---|---|---|
| Neon cyan | `#00ccff` | Primary accent, borders, links |
| Neon pink | `#ff006e` | Hover states, donate button |
| Background | `#0a0a0a` | Page background |
| Text | `#e0f7ff` | Body copy |
