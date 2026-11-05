// Assembles index-proposed.html from the template: inlines icons, expands card data (verbatim captured content).
import fs from 'fs';
import { nav } from './nav.mjs';
const dir = new URL('..', import.meta.url).pathname;
const DAM = 'https://dm.henkel-dam.com/is/image/henkel/';
const products = [
  ['Loctite Super Glue Ultra Gel Control', 'Super-tough, durable bonds that resist weather, impact, shock and vibration.', 'Loctite_Ultra%20Gel%20Control_Bonus_Breakout%20Pack_FOP', 'Loctite_Ultra Gel Control_Bonus_Breakout Pack_FOP', 'loctite-super-glue-ultra-gel-control/SAP_0201DGL029X9'],
  ['Loctite Super Glue Ultra Liquid Control', 'Fast bonding of common materials. Pin-point control squeeze-grip applicator. Dishwasher safe!', '9185739073-Loctite-ultra-liquid-4g-MOHI_Updated', '9185739073-Loctite-ultra-liquid-4g-MOHI_Updated', 'loctite-super-glue-ultra-liquid-control/SAP_0201DCL029X2'],
  ['Loctite Power Grab Ultimate Crystal Clear', 'Works in all conditions and dries crystal clear', 'loctite-power-grab-ultimate-crystal-clear-9oz-cartridge', 'loctite power grab ultimate crystal clear 9oz cartridge', 'loctite-power-grab-ultimate-crystal-clear/SAP_0201C3L029O2'],
  ['Loctite PL Premium Max', 'Our strongest, most durable construction adhesive', 'loctite-pl-premium-max-9oz-cartridge', 'loctite pl premium max 9oz cartridge', 'loctite-pl-premium-max/SAP_0201CRL029P7'],
  ['Loctite Power Grab All Purpose', 'Instant bonding that reduces the need for nails and screws. Low odor / water clean up.', 'loctite-power-grab-all-purpose-6oz-tube', 'loctite power grab all purpose 6oz tube', 'loctite-power-grab-all-purpose/SAP_0201C3L029J4'],
  ['Loctite Super Glue Liquid Professional', 'Professional applications where fast drytime and highest strength are desired.', '11816172971-loctite-SG-pro-liquid-bottle-2026_OOPFpng', '11816172971-loctite-SG-pro-liquid-bottle-2026_OOPFpng', 'loctite-super-glue-liquid-professional/SAP_0201DCL029X4'],
  ['Loctite Fun-tak Mounting Putty Tabs', 'Loctite Fun-Tak Mounting Putty Tabs are a non-toxic, safe, reusable and repositionable putty alternative for hanging lightweight décor on walls', 'Loctite-Funtak-FOP-carded-2oz', 'Loctite Funtak FOP carded 2oz', 'loctite-fun-tak-mounting-putty-tabs/SAP_0201BGL02K14'],
  ['Loctite Shoe Glue', 'Extra strong, flexible, moisture resistant formula dries clear and holds up where constant flexing occurs.', 'Loctite-Shoe-Glue-0.6-oz-Tube-1', 'Loctite Shoe Glue 0.6 oz Tube', 'loctite-shoe-glue/SAP_0201OHL02KB5'],
  ['Loctite Threadlocker Blue', 'Loctite Threadlocker Blue 242 is designed to lock and seal threaded fasteners and prevent loosening from vibration.', 'Loctite-Threadlocker-Blue-6ml-Tube-1', 'Loctite Threadlocker Blue 6ml Tube', 'loctite-threadlocker-blue/SAP_0201OHL029W4'],
];
const ideas = [
  ['Wood Scraps to Beautiful Trim', 'us-loctite-teaser-influencer-blog-maggie-and-joe-1280x1280px', '/ideas/inspiration/wood-scraps-to-beautiful-trim.html'],
  ['Upgrade a Salvaged Storage Cabinet', 'Chris-Yvonne-reclaimedkarma-Loctite-Reduce-Reuse-Restore-Instagram-Photo-teaser', '/ideas/inspiration/salvaged-storage-cabinet.html'],
  ['Red or blue, we’ve got the right threadlocker for you!', 'loctite-threadlocker-red-or-blue-website-article-header-image', '/ideas/build-things/threadlocker-red-or-blue-which-ones-right-for-you.html'],
  ['How to get super glue off your hands', 'loctite-us-remove-super-glue-from-skin-1', '/ideas/fix-stuff/glue-removal.html'],
  ['Reduce, Reuse, Restore: Give an Antique Chair a Second Chance', 'bryan-and-kathy-teaser_1280x1280', '/ideas/inspiration/restored-chair-blog.html'],
  ['How to hang a mirror on a wall without nails', 'loctite-us-how-to-hang-a-mirror-on-a-wall-without-nails-1', '/ideas/build-things/how-to-hang-a-mirror-on-a-wall-without-nails-a-guide-for-diyers.html'],
  ['Old Bathroom Vanity Turned Modern', 'teaser-us-loctite-influencer-amber', '/ideas/inspiration/bathroom-vanity.html'],
  ['DIY Idea: Fluted Wood Using Trim', 'honesthome-teaser-1280x1280', '/ideas/inspiration/fluted-wood-blog.html'],
  ['Makeover an Old Dresser', 'sarah-teaser_1280x1280', '/ideas/inspiration/restored-dresser-blog.html'],
  ['Create a Kids Play Kitchen Set From an Upcycled Cabinet', 'teaser-us-loctite-influencer-kenna', '/ideas/inspiration/kids-play-kitchen-set.html'],
];
const ugc = JSON.parse(fs.readFileSync(dir + 'src/ugc.json', 'utf8'));
const esc = (t) => t.replace(/&/g, '&amp;');
// Sprite: the source's own symbols, under the source's own ids (iconSprite_<name>).
const spriteIds = { 'crafts-icon': 'crafts icon', 'us-window': 'us window', 'tiles-icon': 'tiles icon', 'wallet-icon': 'wallet icon', 'loctite-logo': 'Loctite Logo', 'loctite-logo-transparent': 'Loctite Logo transparent' };
const files = fs.readdirSync(dir + 'assets/icons').filter((f) => f.endsWith('.svg')).map((f) => f.slice(0, -4));
const vb = {};
const symbols = files.map((n) => {
  const svg = fs.readFileSync(dir + 'assets/icons/' + n + '.svg', 'utf8');
  vb[n] = svg.match(/viewBox="([^"]+)"/)[1];
  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return `<symbol id="iconSprite_${spriteIds[n] || n}" viewBox="${vb[n]}">${inner}</symbol>`;
});
const sprite = `<svg class="icon-sprite" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">${symbols.join('')}</svg>`;
const icon = (n) => `<svg viewBox="${vb[n]}" aria-hidden="true" focusable="false"><use href="#iconSprite_${spriteIds[n] || n}"></use></svg>`;
const linkLi = ([t, h], aria) => `<li><a href="${esc(h)}"${aria ? ` aria-label="${esc(t)}"` : ''}><span>${esc(t)}</span></a></li>`;
const navHtml = '        <ul class="nav-l0">\n' + nav.map((it) => {
  const sub = it.groups || it.items;
  let li = `          <li class="nav-l0__item${sub ? ' has-children' : ''}"><div class="nav-l0__content"><a href="${it.href}" aria-label="${it.label} "${sub ? ' aria-haspopup="true"' : ''}><span>${it.label}</span></a>`;
  if (sub) li += `<button class="nav-trigger" aria-expanded="false"><span class="sr-only">Show Submenu for ${it.label} </span>{{icon:chevron-right}}</button>`;
  li += '<div class="nav-expand" aria-hidden="false">{{icon:open-expand}}</div></div>';
  if (sub) {
    li += `<div class="nav-flyout"><button class="nav-back"><span class="sr-only">Close Submenu for ${it.label} </span>{{icon:return}}</button>`;
    if (it.groups) {
      li += it.groups.map((g) => {
        const head = g.button
          ? `<button class="nav-group__head" aria-label="${g.button}" aria-expanded="false" aria-haspopup="true"><span>${g.button}</span>{{icon:open-expand}}{{icon:close-collapse}}</button>`
          : `<a class="nav-group__head" href="${g.link[1]}" aria-label="${esc(g.link[0])}" aria-expanded="false" aria-haspopup="true"><span>${esc(g.link[0])}</span></a><button class="nav-group__toggle" aria-label="Show Submenu for ${esc(g.link[0])}" aria-expanded="false"><span class="sr-only">Show Submenu for ${esc(g.link[0])}</span>{{icon:open-expand}}{{icon:close-collapse}}</button>`;
        return `<ul class="nav-group"><li>${head}<ul>${g.links.map((l) => linkLi(l)).join('')}</ul></li></ul>`;
      }).join('');
    } else li += it.items.map((l) => `<ul class="nav-group">${linkLi(l, true)}</ul>`).join('');
    li += '<span class="sr-only">Navigation END reached</span></div>';
  }
  return `${li}</li>`;
}).join('\n') + '\n        </ul>';
// String.replace with a function: the replacement is inserted verbatim (no $-pattern expansion).
let html = fs.readFileSync(dir + 'src/index.tpl.html', 'utf8')
  .replace('{{sprite}}', () => sprite)
  .replace('{{nav}}', () => navHtml)
  .replace('{{products}}', () => products.map(([t, d, img, alt, path]) => `          <li class="product-card"><a class="card-link" title="${esc(t)}" href="https://www.loctiteproducts.com/products/central-pdp.html/${path}.html"></a><img src="${DAM}${img}?wid=600&amp;fmt=webp-alpha&amp;qlt=90&amp;fit=vfit" alt="${esc(alt)}" loading="eager"><span class="product-card__title">${esc(t)}</span><p class="product-card__text">${esc(d)}</p></li>`).join('\n'))
  .replace('{{ideas}}', () => ideas.map(([t, img, href]) => `          <li class="idea-card"><a class="card-link" title="${esc(t)}" href="${href}"></a><img src="${DAM}${img}?wid=600&amp;fmt=webp-alpha&amp;qlt=90&amp;fit=hfit" alt="" loading="eager"><span class="idea-card__title">${esc(t)}</span><span class="idea-card__arrow">{{icon:loctite-next-arrow}}</span></li>`).join('\n'))
  .replace('{{ugc}}', () => ugc.map((u, i) => `      <div class="ugc__tile ugc__tile--${i + 1}${u.big ? ' ugc__tile--big' : ''}" aria-label="View Media Details"><video src="${u.src}" muted playsinline preload="auto"></video></div>`).join('\n'));
html = html.replace(/\{\{icon:([a-z-]+)\}\}/g, (_, n) => icon(n));
fs.writeFileSync(dir + 'index-proposed.html', html);
console.log('built', html.length);
