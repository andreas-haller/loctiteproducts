# EDS conversion log — loctiteproducts.com home page

## Publish decision (2026-11-05)
- Decision: **publish**. Made by the run owner before this phase (hands-off). Every delivered page, the redirects sheet and the chrome documents (nav, footer) go live on main--ba7ca764--aemcoder.aem.live — `deploy-batch.mjs` without `--no-publish`, or POST https://admin.hlx.page/live/aemcoder/ba7ca764/main/<path>.
- Target: DA org `aemcoder`, site `ba7ca764`, branch `main`.

## Licensing alert
- Gotham (Hoefler&Co, licensed) is self-hosted from the source per the replica fonts policy; the site owner must confirm the web licence covers the new host.

## Home page (index)
- Schema: `stardust/eds-schema/index.json` (section-schema over the approved prototype). Content: `content/index.html` → DA `/index`, served at `/`.
- Media: 23 editorial images rehosted from the captured srcs to `content.da.live/aemcoder/ba7ca764/media/index/` (`da-media-upload.mjs --manifest`). UGC preview videos stay on the source's public video CDN (`cdn-vid.squarelovin.com`, 200 anonymous) — never on content.da.live.
- Project icons (crafts-icon, us-window, tiles-icon, wallet-icon) added under `/icons/` as `:icon:` tokens; `wallet-icon.svg` gained the missing `xmlns:xlink` (an `<img>`-loaded SVG must be valid XML).

| section | delivery | decode tier | notes |
|---|---|---|---|
| stage | block `stage` | template-slotted | desktop + mobile images (art direction, 1st/2nd image), kicker, profile switch (first link active), `<h1>`, lede; gradient is CSS `::before`. D1 🟡 justified: bespoke hero composition. |
| projects | block `projects` | reconstructive | head `<h2>` default content reabsorbed (EW8); one row per project (icon link + bold label), banner row; AI assistant bar is decorative (aria-hidden, CSS-generated strings, as captured idle state). D3 🟡: banner row is 1 cell vs 2 on project rows. |
| products (+ Popular Products carousel) | default-content head/CTA + block `products` | reconstructive | one row per card, title link → whole-card link (EW6); carousel paging/arrows/bullets window, hover shadow, image fade-in in block JS/CSS. |
| inspiration (+ inspiration carousel) | default-content head/CTA + block `inspiration` | reconstructive | same carousel (code duplicated: cross-block imports are banned and `scripts/` is frozen). |
| ideas-teaser | default content, section style `ideas-teaser` (hidden) | n/a (default content) | captured hidden → ships hidden; a hidden BLOCK fails qa-gate's non-empty assert, so it is a default-content section; override in `blocks/stage/stage.css` + foundation request. |
| ugc | block `ugc` | reconstructive | post view (≤767px) + wall (handle, lede, 8 tiles); tiles are autoplay muted loop `<video>` from the authored link (link `<p>` kept, hidden; `@ew-exempt`). |
- Local QA: `qa-gate` PASS (27 ok); `block-roundtrip --ew` 0 structural 🔴, EW editable 60/60.
- Links: 1 nav link to the source home page localized to `/` (`localize-links`); every other source link stays absolute (out of scope).
- Deploy: `/index` PUT → preview → live (deploy-batch, ledger `stardust/deploy/ledger-index.json`); `/nav` re-published for the localized home link. `.plain.html` 200, one `<h1>`, 0 about:error, no `/img/`, 23 `<img>`; `/` 200 on .aem.page and .aem.live.
- Published-origin gate (.aem.live, after the edge cache expired): 1440 2.17 % Δh 0, 360 4.64 % Δh 0, clip 0, content MISSING+HIDDEN 0, fonts ok — PASS (preview host earlier: 1.67 % / 3.39 %). Note: the .aem.live Cloudflare edge kept the brotli variants of stage.css/stage.js/products.js from the first push for the full max-age=7200 (code-push purges did not reach them); the gate waited them out.
- Chrome bands (published, 1440/360): header 1.39 / 1.35 %, footer 1.48 / 1.77 %.
- Motion on the published page: product bullets page the track (0 → -1284px), inspiration arrow pages, arrows fade in on hover, card hover shadow, 8 UGC videos playing muted+looped (currentTime 0.3 → 3.3 s), back-to-top shows after scroll.
- header chrome-compare: 1 🔴 panel-visual@1440 country selector (foundation request filed).

## D-site — site assembly (2026-11-05)
- Source root `https://www.loctiteproducts.com/` answers 200 directly, so the home page is the root `index` document; `/` → 200 on .aem.page and .aem.live. No `/` row in a redirects sheet (it would shadow the root).
- Redirects: the only delivered page keeps its source path (`/`), so no source URL changes on EDS and no redirects sheet rows are needed; no sheet published (an empty sheet carries nothing). Out-of-scope internal links are handled at E2.
- Sitemap: served /sitemap.xml lists 1 url, matching the assembled set (0 extra, 0 missing). robots.txt: platform default.
