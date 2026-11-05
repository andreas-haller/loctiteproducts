/**
 * projects — "choose your project": the section title, the LOCTITE.AI assistant
 * bar (decorative, aria-hidden, captured idle state) and one round red icon
 * link per project with its label, then a full-width banner image.
 * Schema: stardust/eds-schema/index.json → section `projects` (4 repeat units).
 * Decode tier: reconstructive (one row per project; authors add/remove rows).
 *
 * Authoring:
 *   - section head: the <h2> as default content BEFORE the block (reabsorbed, EW8)
 *   - one row per project: cell 1 <p><a href>:icon-name: Label</a></p>
 *     (the link text is the accessible name, visually hidden as on the source),
 *     cell 2 <p><strong>Label</strong></p> — the visible label
 *   - a row holding only an image: the banner under the list
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

// the assistant bar is a third-party widget's idle state: no authored words,
// its strings are CSS generated content (as captured)
const AI_BAR = '<div class="ai-bar-chips"><span class="ai-bar-chip ai-bar-chip-1"></span>'
  + '<span class="ai-bar-chip ai-bar-chip-2"></span></div>'
  + '<div class="ai-bar-input"><span class="ai-bar-spark"></span>'
  + '<span class="ai-bar-placeholder"></span><span class="ai-bar-close"></span></div>';

export default function decorate(block) {
  const head = document.createElement('div');
  head.className = 'projects-head';
  const wrapper = block.parentElement && block.parentElement.previousElementSibling;
  if (wrapper && wrapper.classList.contains('default-content-wrapper')) {
    head.append(...wrapper.childNodes);
    wrapper.remove();
  }

  const list = document.createElement('ul');
  list.className = 'projects-list';
  const extras = [];
  let banner = null;

  [...block.children].forEach((row) => {
    const els = [...row.querySelectorAll(':scope > div > *')];
    const linkEl = els.find((e) => e.querySelector('a'));
    if (!linkEl) {
      const media = els.find((e) => e.matches('picture, img') || e.querySelector('picture, img'));
      if (media && !banner) {
        banner = wrapNode(media, 'projects-banner');
        const img = media.matches('img') ? media : media.querySelector('img');
        if (img) fadeIn(img);
        els.filter((e) => e !== media).forEach((e) => extras.push(e));
      } else els.forEach((e) => (e.textContent.trim() ? head.append(e) : null));
      return;
    }
    const li = document.createElement('li');
    li.append(wrapNode(linkEl, 'projects-link'));
    els.filter((e) => e !== linkEl).forEach((e) => li.append(wrapNode(e, 'projects-label')));
    list.append(li);
  });

  const bar = document.createElement('div');
  bar.className = 'ai-bar';
  bar.setAttribute('aria-hidden', 'true');
  bar.innerHTML = AI_BAR;

  const parts = [];
  if (head.childNodes.length) parts.push(head);
  parts.push(bar, list);
  if (banner) parts.push(banner);
  parts.push(...extras);
  block.replaceChildren(...parts);
}
