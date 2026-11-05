/**
 * inspiration — "Project Support & Inspiration" carousel of idea cards (card-as-link).
 * Schema: stardust/eds-schema/index.json → section `inspiration` (10 idea cards).
 * Decode tier: reconstructive (one row per idea; authors add/remove rows).
 *
 * Authoring:
 *   - section head (<h2> + intro <p>) and the "Explore More" CTA are DEFAULT CONTENT
 *     around the block, styled in place by this CSS (.inspiration-container)
 *   - one row per idea: cell 1 the teaser image; cell 2 <p><a href="article">Title</a></p>.
 *     The title link becomes the whole-card link (EW6); the arrow is decorative.
 * Motion: carousel paging (bullets + arrows, 0.7s slide), arrow fade on hover,
 * hover shadow, image fade-in.
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

function fadeIn(img) {
  if (img.complete) return;
  img.classList.add('is-loading');
  const done = () => img.classList.remove('is-loading');
  img.addEventListener('load', done, { once: true });
  img.addEventListener('error', done, { once: true });
}

const ARROWS = {
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
    + '<path fill-rule="evenodd" d="'
    + 'M10.1763485,3.97433803 C10.4301892,4.22817882 10.4301892,4.63973606 10.17634'
    + '85,4.89357685 L3.71868648,11.3499574 L21.8473192,11.35 C22.2063043,11.35 22.'
    + '4973192,11.6410149 22.4973192,12 C22.4973192,12.3589851 22.2063043,12.65 21.'
    + '8473192,12.65 L3.71968648,12.6499574 L10.1763485,19.1064232 C10.4301892,19.3'
    + '602639 10.4301892,19.7718212 10.1763485,20.025662 C9.92250766,20.2795028 9.5'
    + '1095042,20.2795028 9.25710963,20.025662 L1.69106708,12.4596194 L1.67653602,1'
    + '2.4440689 C1.6663166,12.4331499 1.65646957,12.4218781 1.64701518,12.4102737 '
    + 'L1.69106708,12.4596194 C1.65912307,12.4276754 1.63119898,12.3932337 1.607294'
    + '81,12.356923 C1.60305452,12.3496025 1.59828948,12.3420333 1.59367833,12.3343'
    + '61 C1.5832021,12.3178806 1.57411903,12.3010966 1.56582751,12.284025 C1.55905'
    + '585,12.2689499 1.5525334,12.2541297 1.54656004,12.2390325 C1.48476369,12.083'
    + '7691 1.48557373,11.9096672 1.54848656,11.7548996 C1.5541305,11.742327 1.5594'
    + '1907,11.7304236 1.56504814,11.7187149 C1.57373225,11.699467 1.58409153,11.68'
    + '03661 1.59547636,11.6617148 C1.60023343,11.6548797 1.60438896,11.6483466 1.6'
    + '0865653,11.6418941 C1.61264562,11.6349789 1.61751029,11.6279254 1.62253006,1'
    + '1.6209489 L1.64701518,11.5897263 C1.65646957,11.5781219 1.6663166,11.5668501'
    + ' 1.67653602,11.5559311 C1.68101498,11.5505973 1.68599026,11.5454574 1.691067'
    + '08,11.5403806 L9.25710963,3.97433803 C9.51095042,3.72049724 9.92250766,3.720'
    + '49724 10.1763485,3.97433803 Z'
    + '"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
    + '<path fill-rule="evenodd" d="'
    + 'M14.7361019,3.97433803 L22.3021444,11.5403806 L22.320282,11.559816 C22.33005'
    + '83,11.5704327 22.3394856,11.5813757 22.3485457,11.5926269 L22.3021444,11.540'
    + '3806 C22.3326624,11.5708985 22.3595113,11.6036961 22.3826912,11.6382252 C22.'
    + '3883002,11.6474294 22.3945604,11.6573013 22.4005571,11.6673486 C22.5223334,1'
    + '1.8707962 22.5229228,12.1257134 22.4030911,12.3293494 C22.395907,12.3405683 '
    + '22.3890024,12.3515264 22.3817862,12.3622576 C22.3722846,12.3772766 22.361138'
    + '5,12.3924294 22.3492529,12.4071836 C22.3394856,12.4186243 22.3300583,12.4295'
    + '673 22.320282,12.440184 L22.3207065,12.4402906 L22.3021444,12.4596194 L22.30'
    + '21444,12.4596194 L14.7361019,20.025662 C14.4822611,20.2795028 14.0707038,20.'
    + '2795028 13.816863,20.025662 C13.5630223,19.7718212 13.5630223,19.3602639 13.'
    + '816863,19.1064232 L20.2728922,12.6499574 L2.14589225,12.65 C1.78690716,12.65'
    + ' 1.49589225,12.3589851 1.49589225,12 C1.49589225,11.6410149 1.78690716,11.35'
    + ' 2.14589225,11.35 L20.2738922,11.3499574 L13.816863,4.89357685 C13.5630223,4'
    + '.63973606 13.5630223,4.22817882 13.816863,3.97433803 C14.0707038,3.72049724 '
    + '14.4822611,3.72049724 14.7361019,3.97433803 Z'
    + '"/></svg>',
};

/**
 * Carousel paging (lifted from stardust/prototypes/js/index.js): one page = the cards
 * that fit the viewport; bullets show a sliding window (active, next, next-next, prev);
 * the track slides on `left` (0.7s ease, CSS); arrows step one page.
 */
function initCarousel(block, track, { fitHeight = false } = {}) {
  const viewport = wrapNode(track, 'carousel-viewport');
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'carousel-arrow carousel-arrow-prev';
  prev.setAttribute('aria-label', 'Prev');
  prev.innerHTML = ARROWS.prev;
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'carousel-arrow carousel-arrow-next';
  next.setAttribute('aria-label', 'Next');
  next.innerHTML = ARROWS.next;
  const bullets = document.createElement('div');
  bullets.className = 'carousel-bullets';
  bullets.setAttribute('role', 'tablist');
  block.replaceChildren(prev, viewport, next, bullets);

  let page = 0;
  const geometry = () => {
    const card = track.children[0];
    if (!card) return { step: 0, perView: 1, pages: 0 };
    const step = card.getBoundingClientRect().width + 20;
    const perView = Math.max(1, Math.floor((block.clientWidth + 20) / step));
    return { step, perView, pages: Math.ceil(track.children.length / perView) };
  };
  const show = (target) => {
    const { step, perView, pages } = geometry();
    if (!pages) return;
    if (bullets.children.length !== pages) {
      bullets.replaceChildren(...Array.from({ length: pages }, (_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'tab');
        // eslint-disable-next-line no-use-before-define
        b.addEventListener('click', () => show(i));
        return b;
      }));
    }
    page = Math.min(Math.max(target, 0), pages - 1);
    track.style.left = `${-page * perView * step}px`;
    [...bullets.children].forEach((b, i) => {
      b.classList.toggle('is-active', i === page);
      b.classList.toggle('is-next', i === page + 1);
      b.classList.toggle('is-next-next', i === page + 2);
      b.classList.toggle('is-prev', i === page - 1);
      b.setAttribute('aria-selected', String(i === page));
    });
  };
  prev.addEventListener('click', () => show(page - 1));
  next.addEventListener('click', () => show(page + 1));

  // Small screens: the track takes the height of the card in view (as the source's slides do).
  const fit = () => {
    if (fitHeight) {
      const first = track.children[0];
      track.style.height = window.innerWidth < 768 && first ? `${first.offsetHeight}px` : '';
    }
    show(page);
  };
  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  if (document.fonts) document.fonts.ready.then(fit);
  track.querySelectorAll('img').forEach((img) => img.addEventListener('load', fit, { once: true }));
  // late web fonts (fonts.css loads lazily on small screens) re-wrap the card text:
  // re-fit whenever the first card changes size
  if (fitHeight && window.ResizeObserver && track.children[0]) {
    new ResizeObserver(() => fit()).observe(track.children[0]);
  }
  if (document.fonts && document.fonts.addEventListener) {
    document.fonts.addEventListener('loadingdone', fit);
  }
}

// Cell-level collector: every authored element of a row, media-led <p> expanded (#104).
function rowNodes(row) {
  const out = [];
  row.querySelectorAll(':scope > div').forEach((cell) => {
    [...cell.children].forEach((kid) => {
      if (kid.tagName === 'P' && kid.querySelector('picture, img') && kid.children.length > 1) {
        out.push(...kid.children);
      } else out.push(kid);
    });
  });
  return out;
}

const isMedia = (n) => n.matches('picture, img')
  || (!n.textContent.trim() && !!n.querySelector('picture, img'));

const IDEA_ARROW = '<svg viewBox="0 0 32 15" aria-hidden="true" focusable="false">'
  + '<rect y="6.02588" width="28.9231" height="2.41026" fill="#444444"/>'
  + '<path fill="#444444" d="'
  + 'M23.6028 13.4688C23.2126 13.0785 23.2123 12.446 23.602 12.0553L27.7112 7.937'
  + '23C28.1007 7.54688 28.1007 6.9149 27.7112 6.52456L23.6021 2.40646C23.2123 2.'
  + '01581 23.2126 1.38324 23.6028 0.993016L23.8886 0.707229C24.2791 0.316704 24.'
  + '9123 0.316705 25.3028 0.707229L31.1194 6.52379C31.5099 6.91431 31.5099 7.547'
  + '47 31.1194 7.938L25.3028 13.7546C24.9123 14.1451 24.2791 14.1451 23.8886 13.'
  + '7546L23.6028 13.4688Z'
  + '"/></svg>';

export default function decorate(block) {
  const track = document.createElement('ul');
  track.className = 'carousel-track idea-cards';
  [...block.children].forEach((row) => {
    const nodes = rowNodes(row);
    if (!nodes.length) return;
    const li = document.createElement('li');
    li.className = 'idea-card';
    const media = nodes.find(isMedia);
    const texts = nodes.filter((n) => n !== media);
    const titleEl = texts.find((n) => n.querySelector('a')) || texts[0];
    const link = titleEl && titleEl.querySelector('a');
    if (link) {
      const cardLink = document.createElement('a');
      cardLink.className = 'card-link';
      cardLink.href = link.href;
      cardLink.title = link.title || link.textContent;
      li.append(cardLink);
      link.replaceWith(...link.childNodes);
    }
    if (media) {
      li.append(wrapNode(media, 'idea-card-media'));
      const img = media.matches('img') ? media : media.querySelector('img');
      if (img) {
        img.loading = 'eager';
        fadeIn(img);
      }
    }
    texts.forEach((n) => li.append(wrapNode(n, 'idea-card-title')));
    const arrow = document.createElement('span');
    arrow.className = 'idea-card-arrow';
    arrow.innerHTML = IDEA_ARROW;
    li.append(arrow);
    track.append(li);
  });
  initCarousel(block, track);
}
