<!-- stardust provenance: skill=stardust:replica (dynamics phases 1–3, curated) · 2026-11-05 · from stardust/dynamics/dynamic-features.generated-plan.md (28 rows, 1 page) -->
# Dynamic features — home page (curated)

| id | feature | disposition | target | status | decision |
|---|---|---|---|---|---|
| m-header-menus | header nav menus (aria-haspopup buttons) | rebuild-native | header block (EDS chrome) | planned | none — header contract is the spec |
| m-cta-modal | call-to-action modal control (data-components-params) | rebuild-native | link / modal in block | planned | observe in motion step; implement only if it fires |
| carousel | Popular Products / inspiration carousels | rebuild-native | block JS | planned | motion-observe decides |
| cr-angular / settings objects (dataLayer, adobeDataLayer) | client framework, data layers | static-snapshot | content | done-by-capture | settled DOM is the content |
| tags (Adobe Launch, Adobe Analytics/ECID, GTM, OneTrust, ad pixels, Facebook, TikTok, Pinterest) | tag & consent stack | deferred | martech embed | owner batch | which tags/property ids run on the new host — not shipped by this run |
| commerce/UGC (PriceSpider, Squarelovin, inMoment, raqn chat/observability, Cloud Run mpc) | third-party widgets & feedback | deferred | embed | owner batch | vendor accounts are host-bound; static recreation of their rendered state only |
| i18n locale variants (29 hreflang locales) | other-country sites | out-of-scope | links kept as captured | n/a | run scope is one page |
| v-iframe-runtime | runtime-injected iframe (tracking) | dropped | — | n/a | invisible tag frame |

Static recreation proceeds regardless; deferred rows are recorded for the site owner and never block delivery.
