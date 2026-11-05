/**
 * stage (home) — home hero: full-bleed photo (desktop + mobile art direction) under a
 * left-to-right dark gradient, profile switch, the page <h1> and a lede.
 * Schema: stardust/eds-schema/index.json → section `stage`.
 * Decode tier: template-slotted (node-slotting; authored nodes are MOVED).
 *
 * Authoring (flat or one element per row, order-agnostic except where noted):
 *   - first image: desktop background; second image (optional): mobile background
 *   - <p> before the <h1> without a link: kicker ("Choose your profile:")
 *   - <p> holding a link: one profile switch each; the FIRST one is the active profile
 *   - <h1>: headline
 *   - <p> after the <h1>: lede
 */

// Metric-matched fallback faces (see stage.css): also registered from JS and loaded
// eagerly, so a face is ready even where Arial is missing and whatever stylesheet
// version an edge cache still serves. Foundation request filed.
const FALLBACK_FACES = [
  ['gotham-fallback', "local('Arial'), local('ArialMT'), local('Liberation Sans'), "
    + "local('LiberationSans'), local('Arimo')", {
    weight: '400',
    sizeAdjust: '113.27%',
    ascentOverride: '70.62%',
    descentOverride: '17.66%',
    lineGapOverride: '17.66%',
  }],
  ['gotham-heavy-fallback', "local('Arial Bold'), local('Arial-BoldMT'), "
    + "local('Liberation Sans Bold'), local('LiberationSans-Bold'), local('Arimo Bold')", {
    weight: '700',
    sizeAdjust: '106.88%',
    ascentOverride: '74.85%',
    descentOverride: '18.71%',
    lineGapOverride: '18.71%',
  }],
];

function registerFallbackFaces() {
  if (!window.FontFace || !document.fonts) return;
  FALLBACK_FACES.forEach(([family, src, desc]) => {
    try {
      const face = new FontFace(family, src, desc);
      document.fonts.add(face);
      face.load().catch(() => {});
    } catch (e) {
      // unsupported descriptor: the stylesheet faces still apply
    }
  });
}

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

function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    [...cell.children].forEach((kid) => {
      // the runtime folds a media-led cell into one <p>: expand it back
      if (kid.tagName === 'P' && kid.querySelector('picture, img') && kid.children.length > 1) {
        out.push(...kid.children);
      } else out.push(kid);
    });
  });
  return out;
}

export default function decorate(block) {
  registerFallbackFaces();
  const nodes = collectNodes(block);
  const isMedia = (n) => n.matches('picture, img')
    || (!n.textContent.trim() && n.querySelector('picture, img'));
  const media = nodes.filter(isMedia);
  const heading = nodes.find((n) => /^H[1-6]$/.test(n.tagName));
  const textNodes = nodes.filter((n) => !isMedia(n) && n !== heading);
  const links = textNodes.filter((n) => n.querySelector('a'));
  const plain = textNodes.filter((n) => !n.querySelector('a'));
  const before = (n) => heading
    // eslint-disable-next-line no-bitwise
    && (n.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING);
  const kicker = plain.filter((n) => before(n));
  const rest = plain.filter((n) => !before(n));

  const bg = document.createElement('div');
  bg.className = 'stage-bg';
  media.forEach((m, i) => {
    bg.append(wrapNode(m, i === 1 ? 'stage-bg-mobile' : 'stage-bg-desktop'));
    const img = m.matches('img') ? m : m.querySelector('img');
    if (img) {
      if (i === 0) img.loading = 'eager';
      fadeIn(img);
    }
  });
  if (media.length > 1) bg.classList.add('has-mobile');

  const content = document.createElement('div');
  content.className = 'stage-content';
  kicker.forEach((k) => content.append(wrapNode(k, 'stage-kicker')));
  if (links.length) {
    const sw = document.createElement('div');
    sw.className = 'stage-switch';
    links.forEach((p, i) => {
      const item = wrapNode(p, 'stage-switch-link');
      if (i === 0) item.classList.add('is-active');
      sw.append(item);
    });
    content.append(sw);
  }
  if (heading) content.append(wrapNode(heading, 'stage-headline'));
  rest.forEach((p) => content.append(wrapNode(p, 'stage-lede')));

  block.replaceChildren(bg, content);
}
