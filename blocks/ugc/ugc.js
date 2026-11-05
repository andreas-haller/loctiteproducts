/**
 * ugc — the @loctiteglue UGC wall (Squarelovin gallery), recreated statically:
 * wide screens show the wall (handle, lede, 8-tile grid of autoplaying muted looping
 * preview videos, two big tiles); small screens show the gallery's single-post
 * "Posted by" view. One of the two views is displayed at a time (CSS, 767px).
 * Schema: stardust/eds-schema/index.json → section `ugc`.
 * Decode tier: reconstructive (one row per wall tile; authors add/remove tiles).
 *
 * Authoring:
 *   - post row: <h2>, <h3> and the post image (small-screen view)
 *   - wall head row: <p> handle, <h2> lede
 *   - one row per tile: <p><a href="…mp4">…</a></p> — the preview video URL
 * @ew-exempt <p> video source link (tile rows) — metadata, rendered as a <video>;
 *   the authored paragraph stays in the tile, visually hidden
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

const VIDEO_RE = /\.(mp4|webm|mov|m4v)(\?|#|$)/i;

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

export default function decorate(block) {
  const post = document.createElement('div');
  post.className = 'ugc-post';
  const wall = document.createElement('div');
  wall.className = 'ugc-wall';
  const grid = document.createElement('div');
  grid.className = 'ugc-grid';
  const videos = [];

  [...block.children].forEach((row) => {
    const nodes = rowNodes(row);
    if (!nodes.length) return;
    const links = nodes.flatMap((n) => [...(n.matches('a') ? [n] : n.querySelectorAll('a'))]);
    const isTile = links.length === 1 && VIDEO_RE.test(links[0].href)
      && nodes.every((n) => n.contains(links[0]) || !n.textContent.trim());
    const hasMedia = nodes.some((n) => n.matches('picture, img')
      || n.querySelector('picture, img'));
    if (isTile) {
      const tile = document.createElement('div');
      const n = grid.children.length + 1;
      tile.className = `ugc-tile ugc-tile-${n}`;
      if (n === 1 || n === 6) tile.classList.add('ugc-tile-big');
      const video = document.createElement('video');
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('aria-hidden', 'true');
      video.preload = 'none';
      video.src = links[0].href;
      tile.append(video);
      nodes.forEach((node) => tile.append(wrapNode(node, 'ugc-tile-source')));
      grid.append(tile);
      videos.push(video);
    } else if (hasMedia) {
      nodes.forEach((node) => {
        if (/^H2$/.test(node.tagName)) post.append(wrapNode(node, 'ugc-post-title'));
        else if (/^H[1-6]$/.test(node.tagName)) post.append(wrapNode(node, 'ugc-post-sub'));
        else if (node.matches('picture, img') || node.querySelector('picture, img')) {
          post.append(wrapNode(node, 'ugc-media'));
          const img = node.matches('img') ? node : node.querySelector('img');
          if (img) fadeIn(img);
        } else post.append(wrapNode(node, 'ugc-post-text'));
      });
    } else {
      nodes.forEach((node) => {
        if (/^H[1-6]$/.test(node.tagName)) wall.append(wrapNode(node, 'ugc-lede'));
        else wall.append(wrapNode(node, 'ugc-title'));
      });
    }
  });
  wall.append(grid);
  block.replaceChildren(...[post, wall].filter((v) => v.childNodes.length));

  // The wall's preview videos play muted and looped, as on the live wall; on small
  // screens the wall is not shown, so its videos stay unloaded and paused.
  const mq = window.matchMedia('(width <= 767px)');
  const sync = () => {
    videos.forEach((v) => {
      if (mq.matches) {
        v.pause();
        v.autoplay = false;
      } else {
        v.autoplay = true;
        if (v.preload !== 'auto') v.preload = 'auto';
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      }
    });
  };
  sync();
  mq.addEventListener('change', sync);
}
