# Font licensing — FONT LICENSING REQUIRED BEFORE GOING LIVE

| File | Family (CSS) | Face | Foundry | Status |
|---|---|---|---|---|
| gotham-book.woff2 | body / headings / navigation 400 | Gotham Book | Hoefler&Co | self-hosted from source; web licence for this host to be confirmed |
| gotham-bookita.woff2 | body / headings 400 italic | Gotham Book Italic | Hoefler&Co | same |
| gotham-bold.woff2 | body 700 | Gotham Bold | Hoefler&Co | same |
| gotham-black.woff2 | headings / navigation 700 | Gotham Black | Hoefler&Co | same |

Remove path: delete these files and the `@font-face` rules in `styles/fonts.css`.
The stacks then render the metric-matched `gotham-fallback` / `gotham-heavy-fallback`
faces declared in `styles/styles.css` (local Arial with Gotham metrics).
