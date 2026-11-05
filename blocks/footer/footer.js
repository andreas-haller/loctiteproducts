import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/*
 * Footer — template-slotted chrome for loctiteproducts.com (replica).
 * Content: the authored /footer document, sections in this order:
 *   1 logo link · 2–n link columns (label <p> + <ul> pairs, a social <h4> + icon
 *   list, a locale <p>) · CTA section (strong/em links) · legal (<ul> + copyright <p>)
 * Authored nodes are MOVED into the chrome template (EW1).
 */

const isMobile = window.matchMedia('(max-width: 1023px)');

const ICON_LABELS = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  'loctite-logo-transparent': 'LOCTITE',
};

const SVG_NS = 'http://www.w3.org/2000/svg';
const svgCache = {};

function fetchSvg(name) {
  if (!svgCache[name]) {
    svgCache[name] = fetch(`${window.hlx.codeBasePath}/icons/${name}.svg`)
      .then((resp) => (resp.ok ? resp.text() : ''))
      .catch(() => '');
  }
  return svgCache[name];
}

/** The page-level icon sprite (the source renders its icons from one sprite too). */
function iconSprite() {
  let sprite = document.getElementById('icon-sprite');
  if (!sprite) {
    sprite = document.createElementNS(SVG_NS, 'svg');
    sprite.id = 'icon-sprite';
    sprite.setAttribute('aria-hidden', 'true');
    sprite.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    document.body.prepend(sprite);
  }
  return sprite;
}

/**
 * Renders an icon span as <svg><use href="#iconSprite_name"></svg> (fill: currentColor),
 * registering the /icons/<name>.svg artwork as a sprite symbol once.
 * @param {Element} span span.icon
 */
async function inlineIcon(span) {
  const name = [...span.classList].find((c) => c.startsWith('icon-'))?.substring(5);
  if (!name) return;
  const text = await fetchSvg(name);
  if (!text) return;
  const id = `iconSprite_${name}`;
  let viewBox = document.getElementById(id)?.getAttribute('viewBox');
  if (!viewBox) {
    const src = new DOMParser().parseFromString(text, 'image/svg+xml').querySelector('svg');
    if (!src) return;
    viewBox = src.getAttribute('viewBox');
    const symbol = document.createElementNS(SVG_NS, 'symbol');
    symbol.id = id;
    symbol.setAttribute('viewBox', viewBox);
    symbol.append(...[...src.childNodes].map((n) => document.importNode(n, true)));
    iconSprite().append(symbol);
  }
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `#${id}`);
  svg.append(use);
  span.replaceChildren(svg);
}

/**
 * Moves the element's own text nodes into a <span> (the source's text box).
 * @param {Element} elem element
 */
function wrapText(elem) {
  if (!elem) return;
  const texts = [...elem.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
  if (!texts.length) return;
  const span = document.createElement('span');
  texts[0].before(span);
  texts.forEach((t) => span.append(t));
}

function el(tag, className, ...children) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.append(...children);
  return node;
}

function icon(name) {
  return el('span', `icon icon-${name}`);
}

function iconName(node) {
  return [...(node?.querySelector('.icon')?.classList || [])]
    .find((c) => c.startsWith('icon-'))?.substring(5);
}

/**
 * Builds one footer column from an authored section.
 * @param {Element} section authored section
 * @returns {Element} column
 */
function buildColumn(section) {
  const col = el('div', 'footer-col');
  const nodes = [...section.querySelectorAll(':scope > div > *')];
  let i = 0;
  while (i < nodes.length) {
    const node = nodes[i];
    const next = nodes[i + 1];
    if (node.tagName === 'UL' && node.querySelector('.icon')) {
      node.classList.add('footer-social');
      col.append(node);
    } else if (/^H[1-6]$/.test(node.tagName)) {
      col.append(el('div', 'social-title', node));
    } else if (node.tagName === 'P' && next?.tagName === 'UL' && !next.querySelector('.icon')) {
      const head = el(
        'div',
        'footer-list-head',
        node,
        el('span', 'acc-icon acc-icon-open', icon('open-expand')),
        el('span', 'acc-icon acc-icon-close', icon('close-collapse')),
      );
      head.setAttribute('role', 'button');
      head.setAttribute('tabindex', '0');
      head.setAttribute('aria-expanded', 'false');
      const list = el('div', 'footer-list', head, next);
      const toggle = () => {
        if (!isMobile.matches) return;
        const open = !list.classList.contains('is-open');
        list.classList.toggle('is-open', open);
        head.setAttribute('aria-expanded', String(open));
      };
      head.addEventListener('click', toggle);
      head.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          toggle();
        }
      });
      next.querySelectorAll('a').forEach((a) => {
        if (/^view all$/i.test(a.textContent.trim())) {
          a.classList.add('view-all');
          a.append(icon('chevron-right'));
        }
      });
      col.append(list);
      i += 1;
    } else if (iconName(node) === 'language') {
      const locale = el('button', 'footer-locale', node);
      locale.type = 'button';
      col.append(locale);
    } else {
      col.append(node);
    }
    i += 1;
  }
  return col;
}

function buildBackToTop() {
  const a = el('a', 'backtotop-button', icon('back-to-top'));
  a.href = '#';
  a.setAttribute('aria-label', 'Scroll to top');
  a.tabIndex = -1;
  const wrap = el('div', 'backtotop is-hidden', a);
  const sync = () => wrap.classList.toggle('is-hidden', window.scrollY < window.innerHeight);
  window.addEventListener('scroll', sync, { passive: true });
  a.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  sync();
  return wrap;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  block.textContent = '';
  if (!fragment) return;

  fragment.querySelectorAll('.metadata').forEach((m) => (m.closest('.metadata-wrapper') || m).remove());
  const sections = [...fragment.querySelectorAll(':scope > .section')]
    .filter((s) => s.textContent.trim() || s.querySelector('.icon'));

  const isLogo = (s) => !s.querySelector('ul') && /^loctite-logo/.test(iconName(s) || '');
  const isCtas = (s) => !!s.querySelector('a.button');
  const logoSec = sections.find(isLogo);
  const ctaSec = sections.find(isCtas);
  const rest = sections.filter((s) => s !== logoSec && s !== ctaSec);
  const legalSec = rest.length > 1 ? rest[rest.length - 1] : null;
  const colSecs = rest.filter((s) => s !== legalSec);

  const top = el('div', 'footer-top');
  const logo = el('div', 'footer-logo');
  if (logoSec) logo.append(...logoSec.querySelectorAll(':scope > div > *'));
  top.append(logo, ...colSecs.map(buildColumn));

  const ctas = el('div', 'footer-ctas');
  if (ctaSec) ctas.append(...ctaSec.querySelectorAll(':scope > div > *'));

  const legal = el('div', 'footer-legal');
  if (legalSec) legal.append(...legalSec.querySelectorAll(':scope > div > *'));

  const container = el('div', 'container', top, ctas, legal);
  const site = el('div', 'site-footer', el('div', 'site-footer-inner', container));
  block.append(site, buildBackToTop());

  block.querySelectorAll('a, .footer-list-head p, .footer-locale p, .footer-legal li').forEach(wrapText);
  block.querySelectorAll('a').forEach((a) => {
    if (a.textContent.trim() || a.getAttribute('aria-label')) return;
    const name = iconName(a);
    if (name && ICON_LABELS[name]) a.setAttribute('aria-label', ICON_LABELS[name]);
  });
  await Promise.all([...block.querySelectorAll('span.icon')].map(inlineIcon));
}
