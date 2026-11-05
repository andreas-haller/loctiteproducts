
## 2026-11-05 — loctiteproducts.com home page (replica, bounded-single)
- aem.live edge serves code at max-age 7200 without a purge credential: gate a foundation change on aem.page with `gate-all --eds-host https://…aem.page --out <preview dir>` (full URL — a bare host fails "invalid URL") and keep the aem.live run for the roster.
- dynamics-check click-dialog counts any `[aria-modal=true]` as open: set aria-modal only while the dialog is open, or a hidden modal reads as "Escape does not close".
- Source JSON-LD carries over as a `JSON-LD` page-metadata row: the pipeline renders it server-side, so optimize's HTML detector sees it — no scripts.js injection needed.
- blocks.json coverage is not flipped by deploy-batch; run `update-coverage.mjs --block <id> --status verified` per module before the report.
