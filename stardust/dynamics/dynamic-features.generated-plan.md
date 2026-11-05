<!-- stardust provenance: skill=stardust:dynamics · phase=plan draft · 2026-11-05T09:18:05.941Z · input stardust/current/_dynamics.json (1 pages, 28 findings) · target probe https://main--ba7ca764--aemcoder.aem.page · reconciled against stardust/migrated -->
# Dynamic features — draft inventory (curate into `stardust/dynamic-features.md`)

One row per detected finding. Merge duplicates, drop noise, keep every axis honest. Columns: disposition = what we do · target = the delivery form (widget where no authored rows remain) · reproducibility = what it needs · status = where it stands (reference/triage.md).

| # | id | class | feature | pages | disposition | target | reproducibility | status | pattern | decision needed | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-unknown-third-party-host-raqn-web-static-azureedge-net | A | unknown third-party host raqn-web-static.azureedge.net | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 2 | a-unknown-third-party-host-intercept-inmoment-eu | A | unknown third-party host intercept.inmoment.eu | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 3 | a-unknown-third-party-host-www-google-com | A | unknown third-party host www.google.com | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 4 | a-unknown-third-party-host-mpc-prod-23-s6uit34pua-ue-a-run-a | A | unknown third-party host mpc-prod-23-s6uit34pua-ue.a.run.app | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 5 | a-unknown-third-party-host-api-raqn-io | A | unknown third-party host api.raqn.io | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 6 | a-unknown-third-party-host-observability-raqn-io | A | unknown third-party host observability.raqn.io | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 7 | a-unknown-third-party-host-squarelovin-main-app-s3-eu-centra | A | unknown third-party host squarelovin-main-app.s3.eu-central-1.amazonaws.com | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 8 | a-unknown-third-party-host-tracking-api-squarelovin-com | A | unknown third-party host tracking-api.squarelovin.com | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 9 | a-cms-app-settings-object-datalayer | A | CMS / app settings object dataLayer | 1/1 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 10 | a-cms-app-settings-object-adobedatalayer | A | CMS / app settings object adobeDataLayer | 1/1 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 11 | cr-client-framework-angular | CR | client framework angular | 1/1 | static-snapshot | content | self | pending | settled-dom-snapshot | inspect the consumer |  |
| 12 | i18n-locale-variants-fi-fi-en-us-hr-hr-lv-lv-lt-lt-sl-si-no- | I18N | locale variants fi-FI,en-US,hr-HR,lv-LV,lt-LT,sl-SI,no-NO,nl-BE,de-AT,bg-BG,en-AU,mk-MK,cs-CZ,ja-JP,hu-HU,bs-BA,sr-RS,pt-BR,sk-SK,es-ES,it-IT,pt-PT,ro-RO,fr-BE,sv-SE,et-EE,da-DK,fr-FR,en-GB | 1/1 | rebuild-native | runtime | needs-business-decision | pending | locale-tree | scope of the locale trees |  |
| 13 | m-modal-trigger-aria-haspopup-chrome-only-button-content | M | modal trigger aria-haspopup (chrome only) → button:content | 1/1 | rebuild-native | runtime | self | delivered-by-capture | chrome-interaction | none (the header contract is the spec) | output already carries "Project" |
| 14 | m-modal-trigger-data-components-params-calltoactionmodalcont | M | modal trigger data-components-params-calltoactionmodalcontrol → a:content | 1/1 | rebuild-native | runtime | self | pending | modal-loader | none |  |
| 15 | t-unknown-third-party-host-dm-henkel-dam-com | T | unknown third-party host dm.henkel-dam.com | 1/1 | embed-passthrough | embed | needs-business-decision | delivered-by-capture | consent-gated-tags | which tags run on the new host; property ids | output already carries "dm.henkel-dam.com" |
| 16 | t-consent-onetrust | T | consent: OneTrust | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | CMP domain script reuse on the new host |  |
| 17 | t-tag-manager-adobe-launch | T | tag manager: Adobe Launch | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 18 | t-analytics-adobe-analytics-experience-cloud-id | T | analytics: Adobe Analytics / Experience Cloud ID | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 19 | t-marketing-ad-retargeting-pixel | T | marketing: ad / retargeting pixel | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 20 | t-unknown-third-party-host-cdn-pricespider-com | T | unknown third-party host cdn.pricespider.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 21 | t-unknown-third-party-host-s-pinimg-com | T | unknown third-party host s.pinimg.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 22 | t-tag-manager-google-tag-manager | T | tag manager: Google Tag Manager | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 23 | t-unknown-third-party-host-www-facebook-com | T | unknown third-party host www.facebook.com | 1/1 | embed-passthrough | embed | needs-business-decision | delivered-by-capture | consent-gated-tags | which tags run on the new host; property ids | output already carries "www.facebook.com" |
| 24 | t-unknown-third-party-host-analytics-ipv6-tiktokw-us | T | unknown third-party host analytics-ipv6.tiktokw.us | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 25 | t-unknown-third-party-host-intercept-client-inmoment-eu | T | unknown third-party host intercept-client.inmoment.eu | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 26 | t-unknown-third-party-host-delivery-assets-squarelovin-com | T | unknown third-party host delivery-assets.squarelovin.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 27 | t-unknown-third-party-host-cdn-vid-squarelovin-com | T | unknown third-party host cdn-vid.squarelovin.com | 1/1 | embed-passthrough | embed | needs-business-decision | delivered-by-capture | consent-gated-tags | which tags run on the new host; property ids | output already carries "cdn-vid.squarelovin.com" |
| 28 | v-iframe-without-src-runtime-injected-embed | V | iframe without src (runtime-injected embed) | 1/1 | embed-passthrough | embed | needs-human-capture | pending | embed-passthrough | resolve the runtime src from a rendered capture |  |

## Triage

- **Ships autonomously (reproducibility `self`):** 4 row(s) — read-settings, settled-dom-snapshot, modal-loader.
- **One owner decision batch:** 20 row(s) — inspect the XHR, add a vendor row · scope of the locale trees · CMP domain script reuse on the new host · which tags run on the new host; property ids · resolve the runtime src from a rendered capture.
- **Already delivered by the capture pipeline:** 4 row(s) — no work.
- **Host-bound on the target:** 0 of 0 probed API paths — the off-origin data work.

## Phases

- **tags** — 13
- **detect** — 10
- **interactive** — 2
- **capture** — 1
- **locale wave** — 1
- **embeds** — 1
