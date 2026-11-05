# Dynamics parity check — https://main--ba7ca764--aemcoder.aem.page — 2026-11-05T12:43:41.271Z

Replayed 7 checks over 8 features · pass 7 · fail 0. Flows, not presence.

| feature | class | status | check | result | detail | third-party requests |
|---|---|---|---|---|---|---|
| country selector modal | M | done | click-dialog | PASS | dialog 1440px · heading "Choose your Country" · 0 fields · Escape closes: true | cdn-vid.squarelovin.com:206×16 |
| header nav menus | M | done | dom-count | PASS | 4 × header .nav-sub (min 1) | cdn-vid.squarelovin.com:206×22 |
| Popular Products / inspiration carousels | C | done | dom-count | PASS | 9 × .products .product-card (min 4) | cdn-vid.squarelovin.com:206×22 |
| Popular Products / inspiration carousels | C | done | dom-count | PASS | 10 × .inspiration .idea-card (min 3) | cdn-vid.squarelovin.com:206×22 |
| Popular Products / inspiration carousels | C | done | dom-count | PASS | 2 × .carousel-bullets (min 2) | cdn-vid.squarelovin.com:206×22 |
| UGC video wall (autoplay muted loop) | V | done | video-plays | PASS | iframe/video: false · video playing (Δt 0.81s) | cdn-vid.squarelovin.com:206×22 |
| no uncaught page errors | Q | done | no-page-errors | PASS | none on 1 page(s) |  |

## Features without checks

- tag & consent stack (Launch, Analytics, GTM, OneTrust, pixels) (T) — scaffolded-awaiting-owner · owner: which tags and property ids run on the new host
- PriceSpider, Squarelovin, inMoment, chat widgets (E) — scaffolded-awaiting-owner · owner: vendor accounts are host-bound — enable the vendors for the new host
- 29 hreflang locale variants (L) — decided-out
