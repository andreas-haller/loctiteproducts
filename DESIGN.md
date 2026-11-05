---
_provenance:
  writtenBy: stardust:replica
  mode: bounded-single
  writtenAt: 2026-11-05T08:16:05Z
  synthesizedFrom:
    - stardust/current/pages/index.json
    - stardust/replica/lifted-tokens.json
colors:
  primary: "#e1000f"
  accent: "#da291c"
  accent-dark: "#84010a"
  text: "#444444"
  background: "#ffffff"
  surface: "#eeeeee"
typography:
  body: { fontFamily: "Gotham, body, Helvetica Neue, Helvetica, Arial, sans-serif", fontSize: 18px, lineHeight: 1.2em }
  h1: { fontSize: 72px, fontWeight: 700 }
  h2: { fontSize: 50px, fontWeight: 700 }
  h4: { fontSize: 28px, fontWeight: 700 }
  navigation: { fontSize: 16px, fontWeight: 700 }
rounded: { default: 8px, pill: 50px, round: 50% }
spacing: { gutter: 20px, margin: 20px, big-margin: 40px }
---

# Design — Loctite Products (captured current state)

Descriptive, bounded-single: every value is lifted from the live site's own CSS
(stardust/replica/lifted-tokens.json) or the captured home page. Nothing here is a design decision.

- **Colour:** Loctite red #e1000f carries the hero band, footer and category icons; #da291c is the
  accent/button red; body text #444444 on white; #eeeeee light-grey section surface.
- **Type:** Gotham (Book 400, Bold 700, Black for headings/navigation) via the families
  `body`, `headings`, `navigation`; fallback Helvetica Neue/Helvetica/Arial. Licensed face — the
  rebuild keeps the brand name first and serves a metric-matched open substitute.
- **Layout:** content max 1680px (xl 1264, l 944, m 728), 20px gutter/margins, fluid shell;
  header 107px desktop / 60px mobile.
- **Shape:** 8px radius default, 50px pill buttons, round category icons.
- **Page structure (home):** header with utility bar + main nav, red hero "LOCTITE FOR DIYers",
  project finder (search + 4 round categories), Popular Products carousel, Project Support &
  Inspiration cards, red footer with link lists, social and legal row.
