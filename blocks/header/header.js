import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/*
 * Header — template-slotted chrome for loctiteproducts.com (replica).
 * Content: the authored /nav document, sections in this order:
 *   1 brand (logo link) · 2 nav list (nested lists = flyout groups)
 *   3 tools (language, search) · 4 meta bar (social list + links list)
 *   5 drawer links (mobile menu)
 * Authored nodes are MOVED into the chrome template (EW1); icons are inlined
 * from /icons so they take currentColor like the source sprite.
 */

const isDesktop = window.matchMedia('(min-width: 1024px)');

const ICON_LABELS = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  language: 'Country Switch',
  'magnifying-glass': 'Search',
  'loctite-logo': 'LOCTITE',
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

function srOnly(text) {
  return el('span', 'sr-only', text);
}

/** Icon-only links get the source's aria-label. */
function labelIconLinks(root) {
  root.querySelectorAll('a').forEach((a) => {
    if (a.textContent.trim() || a.getAttribute('aria-label')) return;
    const name = [...(a.querySelector('.icon')?.classList || [])]
      .find((c) => c.startsWith('icon-'))?.substring(5);
    if (name && ICON_LABELS[name]) a.setAttribute('aria-label', ICON_LABELS[name]);
  });
}

/** The trigger link of a list item: authored <li><a> or delivered <li><p><a>. */
function itemLink(li) {
  return li.querySelector(':scope > a, :scope > p > a');
}

/** The movable unit of an item link: its <p> when the pipeline wrapped it. */
function linkUnit(a) {
  return a.parentElement.tagName === 'P' ? a.parentElement : a;
}

function setOpen(li, open) {
  li.classList.toggle('is-open', open);
  li.querySelector('.nav-trigger')?.setAttribute('aria-expanded', String(open));
  const a = li.querySelector('.nav-l0-content a');
  if (a) a.setAttribute('aria-expanded', String(open));
}

function closeAll(nav, except) {
  nav.querySelectorAll('.nav-l0-item.is-open').forEach((li) => {
    if (li !== except) setOpen(li, false);
  });
}

/**
 * Decorates one flyout group (<li> with a head and a nested list).
 * @param {Element} li group list item
 */
function decorateGroup(li) {
  const list = li.querySelector(':scope > ul');
  if (!list) {
    li.classList.add('nav-link');
    return;
  }
  li.classList.add('nav-group');
  const head = el('div', 'nav-group-head');
  const a = itemLink(li);
  if (a) {
    a.setAttribute('aria-haspopup', 'true');
    head.append(linkUnit(a));
  } else {
    // bare label text (or a <p>) before the nested list: move it as is
    const label = el('span', 'nav-group-label');
    [...li.childNodes].filter((n) => n !== list).forEach((n) => label.append(n));
    head.append(label);
  }
  const toggle = el(
    'button',
    'nav-group-toggle',
    srOnly(`Show Submenu for ${head.textContent.trim()}`),
    icon('open-expand'),
    icon('close-collapse'),
  );
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', () => {
    const open = !li.classList.contains('is-open');
    li.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  head.append(toggle);
  li.prepend(head);
}

/**
 * Decorates one top-level navigation item.
 * @param {Element} li top-level list item
 * @param {Element} nav nav element
 */
function decorateItem(li, nav) {
  const a = itemLink(li);
  const sub = li.querySelector(':scope > ul');
  li.classList.add('nav-l0-item');
  const content = el('div', 'nav-l0-content');
  if (a) content.append(linkUnit(a));
  li.prepend(content);
  if (!sub) {
    content.append(el('div', 'nav-expand', icon('open-expand')));
    return;
  }
  li.classList.add('has-children');
  const label = a ? a.textContent.trim() : '';
  if (a) {
    a.setAttribute('aria-haspopup', 'true');
    a.setAttribute('aria-expanded', 'false');
  }
  const trigger = el('button', 'nav-trigger', srOnly(`Show Submenu for ${label}`), icon('chevron-right'));
  trigger.type = 'button';
  trigger.setAttribute('aria-expanded', 'false');
  content.append(trigger, el('div', 'nav-expand', icon('open-expand')));

  const back = el('button', 'nav-back', srOnly(`Close Submenu for ${label}`), icon('return'));
  back.type = 'button';
  sub.classList.add('nav-sub');
  const inner = el('div', 'nav-flyout-inner', sub);
  const flyout = el('div', 'nav-flyout', back, inner);
  li.append(flyout);
  [...sub.children].forEach(decorateGroup);
  if (sub.querySelector(':scope > .nav-group')) flyout.classList.add('nav-flyout-groups');

  trigger.addEventListener('click', () => {
    const open = !li.classList.contains('is-open');
    closeAll(nav, li);
    setOpen(li, open);
  });
  back.addEventListener('click', () => setOpen(li, false));

  // desktop: hover / focus opens the flyout (aria-haspopup trigger)
  li.addEventListener('mouseenter', () => {
    if (!isDesktop.matches) return;
    closeAll(nav, li);
    setOpen(li, true);
  });
  li.addEventListener('mouseleave', () => {
    if (isDesktop.matches) setOpen(li, false);
  });
  li.addEventListener('focusin', () => {
    if (!isDesktop.matches) return;
    closeAll(nav, li);
    setOpen(li, true);
  });
  li.addEventListener('focusout', (e) => {
    if (isDesktop.matches && !li.contains(e.relatedTarget)) setOpen(li, false);
  });
}

function toggleDrawer(site, toggle, force) {
  const open = force !== undefined ? force : !site.classList.contains('is-open');
  site.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.style.overflowY = open && !isDesktop.matches ? 'hidden' : '';
  if (!open) closeAll(site.querySelector('.main-nav'));
}

/** Sticky header (source .header__base--sticky / --isUp). */
function stickOnScroll(site) {
  const wrapper = site.parentElement;
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const top = wrapper.getBoundingClientRect().top + y;
    const sticky = y > top;
    const opened = site.classList.contains('is-open') || site.querySelector('.nav-l0-item.is-open');
    site.classList.toggle('is-sticky', sticky);
    site.classList.toggle('is-up', sticky && y > lastY && !opened);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Country selector (desktop): a modal built from the authored panel sections
 * (heading section, one section per column, close-label section).
 * @param {Element[]} panelSecs authored sections after the drawer links
 * @param {Element} trigger the desktop toggle button
 * @returns {Element|null} the modal
 */
function buildCountryModal(panelSecs, trigger) {
  if (!panelSecs.length) return null;
  const [headSec, ...rest] = panelSecs;
  const closeSec = rest.length > 1 ? rest[rest.length - 1] : null;
  const colSecs = rest.filter((s) => s !== closeSec);
  const heading = headSec.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) heading.id = heading.id || 'country-modal-title';
  const head = el('div', 'country-modal-head', ...headSec.querySelectorAll(':scope > div > *'));
  const columns = el('div', 'country-modal-columns', ...colSecs.map((sec) => el(
    'div',
    'country-modal-column',
    ...sec.querySelectorAll(':scope > div > *'),
  )));
  const close = el('button', 'country-modal-close');
  close.type = 'button';
  if (closeSec) close.append(...closeSec.querySelectorAll(':scope > div > *'));
  else close.append(srOnly('Close'));
  const container = el(
    'div',
    'country-modal-container',
    el('div', 'country-modal-content', head, columns, el('div', 'country-modal-actions', close)),
  );
  // the backdrop is its own layer (source modal__overlay): a click on it closes the selector
  const modal = el('div', 'country-modal', el('div', 'country-modal-backdrop'), container);
  modal.id = 'country-modal';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  if (heading) modal.setAttribute('aria-labelledby', heading.id);

  const setModal = (open) => {
    modal.hidden = !open;
    // aria-modal only while open: a hidden dialog never claims modality
    if (open) modal.setAttribute('aria-modal', 'true');
    else modal.removeAttribute('aria-modal');
    trigger.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('country-modal-open', open);
    if (!open) trigger.focus();
  };
  trigger.addEventListener('click', () => setModal(modal.hidden));
  // Tab from the open trigger lands on the first panel control (as on the source)
  trigger.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || e.shiftKey || modal.hidden) return;
    const first = modal.querySelector('a[href], button');
    if (!first) return;
    e.preventDefault();
    first.focus();
  });
  close.addEventListener('click', () => setModal(false));
  modal.addEventListener('click', (e) => {
    if (!container.contains(e.target)) setModal(false);
  });
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && !modal.hidden) setModal(false);
  });
  isDesktop.addEventListener('change', () => {
    if (!modal.hidden) setModal(false);
  });
  return modal;
}

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  block.textContent = '';
  if (!fragment) return;

  fragment.querySelectorAll('.metadata').forEach((m) => (m.closest('.metadata-wrapper') || m).remove());
  const sections = [...fragment.querySelectorAll(':scope > .section')]
    .filter((s) => s.textContent.trim() || s.querySelector('.icon'));
  const [brandSec, navSec, toolsSec, metaSec, drawerSec, ...panelSecs] = sections;

  // meta bar (desktop): social icons + links
  const metaLists = metaSec ? [...metaSec.querySelectorAll('ul')] : [];
  const metaBar = el(
    'div',
    'meta-bar',
    el(
      'div',
      'container',
      el('div', 'meta-bar-social', ...metaLists.slice(0, 1)),
      el('div', 'meta-bar-links', ...metaLists.slice(1)),
    ),
  );

  // main bar
  const container = el('div', 'container');
  container.append(el('span', 'nav-return', icon('return')));

  const nav = el('nav', 'main-nav');
  nav.setAttribute('aria-label', 'Main navigation');
  const navList = navSec?.querySelector('ul');
  if (navList) {
    navList.classList.add('nav-l0');
    nav.append(navList);
    [...navList.children].forEach((li) => decorateItem(li, nav));
  }
  const headerMeta = el('div', 'header-meta', ...(drawerSec ? drawerSec.querySelectorAll('ul') : []));
  container.append(el('div', 'nav-drawer', nav, headerMeta));

  const logo = el('div', 'logo');
  const brandLink = brandSec?.querySelector('a');
  if (brandLink) logo.append(linkUnit(brandLink));
  container.append(logo);

  const tools = el('div', 'header-tools');
  if (toolsSec) [...toolsSec.querySelectorAll('a')].forEach((a) => tools.append(linkUnit(a)));
  container.append(tools);

  // desktop: the country switch is a button opening the selector; small screens keep the link
  const countryToggle = el('button', 'country-toggle', icon('language'));
  countryToggle.type = 'button';
  countryToggle.setAttribute('aria-label', 'Country Switch');
  countryToggle.setAttribute('aria-haspopup', 'dialog');
  countryToggle.setAttribute('aria-expanded', 'false');
  countryToggle.setAttribute('aria-controls', 'country-modal');
  const countryLink = [...tools.querySelectorAll('a')].find((a) => a.querySelector('.icon-language'));
  if (countryLink) countryLink.classList.add('country-link');
  const countryModal = buildCountryModal(panelSecs, countryToggle);
  if (countryModal) {
    const unit = countryLink ? linkUnit(countryLink) : null;
    if (unit) unit.before(countryToggle);
    else tools.prepend(countryToggle);
  }

  const toggle = el(
    'button',
    'menu-toggle',
    el('span', 'menu-toggle-open', icon('menu')),
    el('span', 'menu-toggle-close', icon('close')),
  );
  toggle.type = 'button';
  toggle.setAttribute('aria-controls', 'nav');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  container.append(toggle);
  nav.id = 'nav';

  const site = el('div', 'site-header', el('div', 'main-nav-bar', container));
  const wrapper = el('div', 'header-wrapper', site);
  block.append(metaBar, wrapper);
  // the modal lives outside the header chrome so the overlay covers the page on its own layer
  if (countryModal) {
    document.body.querySelector(':scope > .country-modal')?.remove();
    document.body.append(countryModal);
  }

  toggle.addEventListener('click', () => toggleDrawer(site, toggle));
  window.addEventListener('keydown', (e) => {
    if (e.code !== 'Escape') return;
    if (nav.querySelector('.nav-l0-item.is-open')) closeAll(nav);
    else if (site.classList.contains('is-open')) {
      toggleDrawer(site, toggle, false);
      toggle.focus();
    }
  });
  isDesktop.addEventListener('change', () => toggleDrawer(site, toggle, false));

  labelIconLinks(block);
  block.querySelectorAll('a').forEach(wrapText);
  await Promise.all([...block.querySelectorAll('span.icon')].map(inlineIcon));
  stickOnScroll(site);
}
