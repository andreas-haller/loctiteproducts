---
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-11-05T08:16:05Z
  againstInput: https://www.loctiteproducts.com/
  mode: bounded-single
  readArtifacts:
    - stardust/current/pages/index.json
    - stardust/replica/lifted-tokens.json
---

# Direction — preserve mode (same-design migration)

Mode: PRESERVE. The target spec is the captured current state of https://www.loctiteproducts.com/
(no direct invocation, no creative decisions).

Synthesized (bounded-single): current/pages/index.json + Phase-3 CSS lift → PRODUCT.md · DESIGN.md · DESIGN.json (at 2026-11-05T08:16:05Z)

Permitted deltas: ONLY the entries of stardust/replica/inconsistency-register.md
(empty — pure replica).

Fidelity: ia verbatim · design verbatim · content verbatim.

## Link scope decision — E2 (2026-11-05)
- Run scope is the home page only (fixed by the site plan). The 80 distinct internal targets on the home page, nav and footer (product, category, inspiration, about pages) are outside that scope: SCOPE EXTENSION → repointed to https://www.loctiteproducts.com (absolute). All 80 answer 200 (stardust/rollout/links/source-targets.tsv). The only root-relative href is `/`, which resolves on aem.live. Other-country sites and social/Henkel links stay external as captured.
