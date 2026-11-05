// Carousels: bullet navigation pages the track by the visible card count.
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel__track');
  const bullets = [...carousel.querySelectorAll('.carousel__bullets button')];
  const show = (page) => {
    const card = track.children[0];
    const step = card.getBoundingClientRect().width + 20;
    const perView = Math.max(1, Math.floor((carousel.clientWidth + 20) / step));
    track.style.left = `${-page * perView * step}px`;
    bullets.forEach((b, i) => {
      b.classList.toggle('is-active', i === page);
      b.classList.toggle('is-next', i === page + 1);
      b.classList.toggle('is-next-next', i === page + 2);
      b.classList.toggle('is-prev', i === page - 1);
    });
  };
  bullets.forEach((b, i) => b.addEventListener('click', () => show(i)));
});

// Small screens: one product card per view and the card keeps its own height,
// so the track takes the height of the card in view (as the source's slides do).
const fitTrack = () => {
  document.querySelectorAll('.product-cards').forEach((track) => {
    track.style.height = window.innerWidth < 768 ? `${track.children[0].offsetHeight}px` : '';
  });
};
fitTrack();
window.addEventListener('resize', fitTrack);
window.addEventListener('load', fitTrack);
if (document.fonts) document.fonts.ready.then(fitTrack);

// UGC wall (third-party gallery): the source renders the gallery grid on wide
// screens and a single-post view on small ones — one of the two exists at a time.
const ugc = document.querySelector('.ugc');
if (ugc) {
  const views = { small: ugc.querySelector('.ugc__post'), wide: ugc.querySelector('.ugc__wall') };
  const mq = window.matchMedia('(max-width: 767px)');
  const show = () => {
    const [keep, drop] = mq.matches ? [views.small, views.wide] : [views.wide, views.small];
    drop.remove();
    if (!keep.isConnected) ugc.append(keep);
  };
  show();
  mq.addEventListener('change', show);
}

// Small screens: the source also renders the meta links inside the navigation drawer.
const meta = document.querySelector('.header-meta');
if (meta && window.matchMedia('(max-width: 1023px)').matches) {
  const copy = meta.cloneNode(true);
  copy.classList.add('header-meta--drawer');
  meta.after(copy);
}

// Footer link lists are accordions on small screens.
document.querySelectorAll('.footer-list > .h4').forEach((title) => {
  title.addEventListener('click', () => {
    const open = title.getAttribute('aria-expanded') === 'true';
    title.setAttribute('aria-expanded', String(!open));
    title.parentElement.classList.toggle('is-open', !open);
  });
});

// Sticky header (lifted from the source: .header__base--sticky / --isUp): once the page scrolls
// past the header's own top it turns fixed; scrolling down slides it up out of view, scrolling up
// brings it back. Its wrapper keeps the header's height in the flow.
const header = document.querySelector('.site-header');
if (header) {
  const top = header.parentElement.offsetTop;
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const sticky = y > top;
    header.classList.toggle('is-sticky', sticky);
    header.classList.toggle('is-up', sticky && y > lastY);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Images fade in as they arrive (the source's loaded-skeleton → loaded fade, 0.6s).
document.querySelectorAll('main img').forEach((img) => {
  if (img.complete) return;
  img.classList.add('is-loading');
  img.addEventListener('load', () => img.classList.remove('is-loading'), { once: true });
});

// Back to top: shown once the visitor has scrolled away from the top, hidden again at the top.
const toTop = document.querySelector('.backtotop');
if (toTop) {
  const sync = () => toTop.classList.toggle('is-hidden', window.scrollY < window.innerHeight);
  window.addEventListener('scroll', sync, { passive: true });
  toTop.querySelector('a').addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
}
