# Stardust journal — loctiteproducts.com replica

## Extract — single-page capture of the home page (2026-11-05)
- `crawl.mjs --max 1 --dynamics`: index captured live (playwright, 200, HYDRATED), screenshot 1440×4115, rendered DOM saved.
- Vision check: ok (thumbnail matches record: hero "LOCTITE FOR DIYers", project finder, Popular Products, Project Support & Inspiration, footer).
- style-census at 1440+360 → `_computed-styles.json`; OneTrust consent (`#onetrust-accept-btn-handler`).
- cap-probe → `current/DESIGN.json` extensions.breakpoints: content max 1680px (module), shell fluid.
- No font files intercepted by the crawler; fonts handled in recreate via CSS lift.
- state.json created: flow replica, handsOff, page `index` type `landing`.

## Preserve direction — bounded-single spec synthesized, pure replica (2026-11-05)
- Bounded branch (§1a): PRODUCT.md, DESIGN.md, DESIGN.json at root synthesized from `current/pages/index.json` + `replica/lifted-tokens.json` (values lifted from the live inline + 46 clientlib stylesheets saved under `current/css/`).
- Fonts: Gotham (licensed, Hoefler&Co) via families body/headings/navigation — not rehosted; substitute behind brand name.
- Register empty — pure replica. No target breakpoints.
- Dynamics: detector 28 findings → curated `dynamic-features.md`: header menus/modal/carousel rebuild-native; tags & 3rd-party widgets deferred to owner batch; locales out of scope.

## Recreate — home archetype re-authored as clean HTML/CSS (2026-11-05)
- `stardust/prototypes/index-proposed.html` built by `src/build.mjs` from `src/index.tpl.html` + `src/nav.mjs` (verbatim captured content), `css/canon.css` (shared chrome + tokens) and `css/index.css` (sections); icons are the source's own sprite symbols under the source ids.
- Values lifted from the source CSS: container model (944/1264/1680 tiers), Gotham families body/headings/navigation, hero gradient overlay fitted by luminance (0.4 → 0 at 35–72%), footer gradient #ed1c24→#c4161c, sticky header classes.
- Gotham (licensed) self-hosted from the source per the fonts policy — licensing alert carried to deploy.
- Third-party surfaces: UGC wall recreated as captured (desktop grid / mobile "Posted by" state), AI assistant bar visual only, Feedback tab not recreated.

## source-fidelity-gate — index passes at 1440 and 360 (2026-11-05)
- 1440: pixel 1.66% Δh 0; 360: pixel 3.41% Δh 0. Content-diff 0 🔴 / 0 nothing-lost on main+header+footer; chrome-parity quiet; chrome crops header 1.39/1.35%, footer 1.48/1.73%; clip 0; overflow ok; cap-probe PASS @2560.
- Rounds beyond the 3-iteration cap were content/chrome parity work after the pixel bar was already met (iter2 1440 5.9%).
- Motion: observed live + build; implemented sticky header morph, carousel paging/timing, hover shadow, arrow fades, image fade-in, back-to-top, mobile footer accordions. Video autoplay frozen for capture → restoreAtDelivery.

## Migrate plan — one page, the approved home archetype (2026-11-05)
- Page map: `index` → `/` (index.html), 0 collisions. Template `landing` has only its archetype; no sibling clusters, no variance probe needed.
- Units: `plan` done, `landing` render (branch A, the approved prototype), `report`.

## Migrate render, state-and-report — home page placed in the static tree (2026-11-05)
- `migrate.mjs render index --canon-css stardust/prototypes/css/canon.css`: rendered 1, 8 assets, 6 sections; modules recorded (stage, projects, products, inspiration, ideas-teaser, ugc, carousel).
- 118 of 120 internal links target source pages outside this one-page scope — repointed to the source site at E2 (scope extension, not a capture gap).
- `index` advanced to `migrated`. No assets unit (media rehost happens at deploy through DA media).

## A-inventory — one page, one template (2026-11-05)
- `inventory.mjs`: 1 page (index → /), template `index` (landing), whole site in scope. DA target aemcoder/ba7ca764@main, live host main--ba7ca764--aemcoder.aem.live.

## B-block — seven page blocks, each converted once (2026-11-05)
- `blocks.mjs` + `plan.mjs`: 7 distinct module blocks (stage, projects, products, inspiration, ideas-teaser, ugc, carousel), all converted on the representative `index`; header/footer chrome handled in the foundation unit.

## B2-dynamic — triage re-verified against the migrated page (2026-11-05)
- `dynamics-plan.mjs --target-origin <preview> --migrated stardust/migrated`: 28 rows, self 4, owner batch 20, delivered 4, host-bound 0 — matches the curated `stardust/dynamic-features.md`. Self rows (header menus, carousels, CTA modal check) are built in C-deliver; tag/vendor rows stay deferred to the owner and do not block delivery.

## C-deliver unit foundation — styles, Gotham, header, footer live (2026-11-05)
- Foundation subagent: styles.css/fonts.css (Gotham self-hosted, licence flag in fonts/LICENSING.md), favicon, header/footer blocks template-slotted from /nav and /footer (published, Robots noindex), preview-only gate shell /drafts/foundation-shell.
- Gate on preview: header 1.39%/1.35%, footer 1.99%/1.83% (1440/360); chrome-parity 0 deltas (needs `--region header=header|header .site-header`, live meta bar sits outside its `<header>`).
- Header contract recorded (`stardust/chrome/header-contract.json`). Instrument fix in the project copy of `chrome-compare.mjs`: an unnamed source control (empty key) pairs by role + rect ±8 px — before, the source's nameless country button could never pair. That exposed the desktop country selector modal; built from /nav content (31 locale links), keyboard and outside-click close fixed. Open: panel-visual@1440 (source crop is a 1440×567 dimmed band over the hero) — re-check on the home page.
- Hover flyouts on PRODUCTS…OUR ACTIONS kept: live probe shows them; explorer reports hover null (warnings only).
- `foundation-freeze.mjs freeze` done.

## C-deliver unit archetype-index — home page live and gated on aem.live (2026-11-05)
- Blocks stage, projects, products, inspiration, ugc (ideas-teaser stays hidden default content as captured); editorial images on DA media, UGC preview videos autoplay muted loop (captureState restored).
- gate-all --only index: 1440 2.17% Δh 0, 360 4.64% Δh 0, clip 0, content 0; header/footer bands ≤ 1.73%. `/` → 200 on .aem.page and .aem.live.
- Two foundation requests queued (fallback-font local sources; hidden section style) — scoped overrides shipped in stage.css.
- Header contract on the live home page: 1 error left, panel-visual@1440 on the country selector. Links, headings, keyboard and close paths all match. The source crop is a 1440×567 region of a modal scrolled to its first focused link; the build crop is the 600×860 link panel. This is a crop-region mismatch, not a visual delta.
- Note: the aem.live edge kept compressed block assets for up to 2 h after a push.

## C-deliver unit gate-all — roster gate passes on aem.live (2026-11-05)
- Foundation requests applied once: fallback faces gain Liberation Sans / Arimo local sources in styles.css; `ideas-teaser` section style moved into styles.css; the scoped copies left stage.css. Foundation re-frozen. Header country-selector request reviewed: modal + backdrop already present, the 87.6% is the crop-region mismatch — no change.
- gate-all (whole roster, 1 page) on aem.live: 1440 2.17% Δh 0, 360 4.64% Δh 0, clip 0, content 0 — PASS; update-coverage --gate at both widths, 0 flips.
- aem.live edge still served the previous CSS (max-age 7200); the new code gated on aem.page at 1.67% / 3.39% Δh 0, identical to before, so both states are proven.

## C-deliver — home page delivered and gated; foundation requests closed (2026-11-05)
- Units done: foundation, archetype-index, index (no siblings), gate-all, final. One page live on aem.live, PASS at 1440 and 360. Foundation re-frozen after the requests were applied once.

## D-site — root resolves to the home page, sitemap matches (2026-11-05)
- Source root serves 200 → delivered as `index`; `/` 200 on page and live. No redirect rows needed for a single unchanged path. Served sitemap 1 url = assembled 1.

## D2-dynamic — interactive parity replayed, 7/7 (2026-11-05)
- stardust/dynamics/parity.json: country modal, header menus, two carousels, UGC video wall, no page errors (+ 3 owner/decided-out rows without checks: tags, vendor widgets, locales).
- First replay on aem.live: Escape "did not close" the country modal — the hidden modal kept `aria-modal="true"`, which the check reads as an open dialog. Header now sets aria-modal only while open; replay on aem.page 7/7 PASS.

## E-full-site — home page verified on aem.live (2026-11-05)
- verify.mjs --base aem.live: 1 checked, 1 verified, 0 failed (200, no about:error, internal hrefs resolve, gate pass true). Headless render: UGC autoplay videos playing on aem.live (Δt 0.80 s, D2 replay) — the restoreAtDelivery entry is delivered.

## E2-link-audit — no dead links; out-of-scope targets point at the source (2026-11-05)
- index + nav + footer on aem.live: 127 distinct hrefs; 1 root-relative (`/`, 200); 80 source-host targets repointed absolute, 80/80 → 200; the rest external as captured. Decision recorded in direction.md.

## F-optimize — health 95, no P1 (2026-11-05)
- optimize --all on aem.live: health 95/100 (seo 100, ai 90); open P1 0, P2 1 (JSON-LD missing, source carries it — G), P3 source-parity 1 (title "Homepage", as on the source).

## G-aem — JSON-LD carried over, health 100 (2026-11-05)
- autofix-aem: 1 candidate, manual (eds-jsonld). The source's JSON-LD (Organization + WebPage) added verbatim as a `JSON-LD` metadata row on /index → the pipeline renders it server-side as `<script type="application/ld+json">`. Re-deployed + published (deploy-batch --force, 1 ok). optimize: health 100, P2 jsonld fixed, 0 open; verify 1/1.

## H-report — summary written (2026-11-05)
- stardust/rollout/report.md: 1/1 page verified, 7/7 modules delivered, fidelity 2.17 % / 4.64 %, parity 7/7, health 100. Four learnings appended.

## I-dashboard — dashboard written (2026-11-05)
- stardust/rollout/dashboard/index.html: 1 page identified, prototyped, deployed.

## Handoff — rollout complete, done-check clean (2026-11-05)
- Rollout A–I ended; done-check complete, 0 gaps. Home page `index` deployed + published, gated PASS on aem.live at 1440/360, parity 7/7, health 100.
- Open note: the aem.live edge keeps the pre-fix header.js/styles.css for up to 2 h (max-age 7200); both changes are render-neutral and verified on aem.page.
