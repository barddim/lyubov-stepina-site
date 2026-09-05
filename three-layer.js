// Lightweight CTA-centred orbits. No external renderer or CDN is required.
// React owns the page; this optional enhancement only appends decorative nodes.
const refinementCss = `
.hero.refined-hero #three-layer { display: none; }
.refined-hero .hero-copy > .cta {
  position: relative; isolation: isolate; overflow: visible;
  margin: 32px 0 68px 52px;
  background: #172238; border-color: #d8b47e;
  box-shadow: 0 0 38px rgba(229,191,136,.13), inset 0 0 20px rgba(229,191,136,.04);
  min-height: 48px;
}
.refined-hero .hero-copy > .cta:hover { background: #25314a; }
.refined-hero .hero-copy > .cta:focus-visible { outline: 2px solid #fff2d6; outline-offset: 7px; }
.refined-hero .hero-copy > .cta > span,
.refined-hero .hero-copy > .cta > b { position: relative; z-index: 2; }
.refined-hero .cta-universe {
  position: absolute; inset: -53px -52px; pointer-events: none;
  z-index: -1; overflow: visible; display: block;
}
.refined-hero .cta-universe svg { display: block; width: 100%; height: 100%; overflow: visible; }
.refined-hero .cta-universe .orbit-track { fill: none; stroke-width: .8; vector-effect: non-scaling-stroke; }
.refined-hero .choice-map { width: min(100%, 360px); margin: 0; color: #d2c7b9; }
.refined-hero .choice-map-title { margin: 0 0 15px; font: 14px/1.5 Manrope, system-ui, sans-serif; color: #d2c7b9; }
.refined-hero .choice-map ol { display: flex; gap: 0; padding: 0; margin: 0; list-style: none; }
.refined-hero .choice-map li { position: relative; flex: 1; padding-top: 17px; font: 14px/1.5 Manrope, system-ui, sans-serif; }
.refined-hero .choice-map li::before { content: ''; position: absolute; top: 0; left: 0; width: 5px; height: 5px; border-radius: 50%; background: #dbb77f; box-shadow: 0 0 9px #d5ab6f55; }
.refined-hero .choice-map li:not(:last-child)::after { content: ''; position: absolute; left: 14px; right: 12px; top: 2px; height: 1px; background: linear-gradient(90deg, #bca17b66, #bca17b22); }
.refined-hero .choice-map li:last-child::before { box-shadow: 0 0 0 4px #dbb77f12, 0 0 12px #dbb77f66; }
body.has-choice-map .process-section { display: none; }
@media (max-width: 760px) {
  .refined-hero .hero-copy { padding-top: max(320px, calc(100vw * .5625 + 120px)); padding-bottom: 105px; }
  .refined-hero .hero-copy > .cta { margin: 28px 0 48px 36px; }
  .refined-hero .cta-universe { inset: -44px -35px; }
  .refined-hero .choice-map { max-width: 330px; }
}
@media (prefers-reduced-motion: reduce) {
  .refined-hero .hero-copy, .refined-hero .hero-copy > .cta { animation: none; transition: none; }
}
`;

const ns = 'http://www.w3.org/2000/svg';
function svgElement(tag, attrs = {}) {
  const el = document.createElementNS(ns, tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
  return el;
}

function mountRefinements() {
  const hero = document.querySelector('.hero');
  const button = hero?.querySelector('.hero-copy > .cta');
  if (!hero || !button) return false;
  if (hero.classList.contains('refined-hero')) return true;
  const style = document.createElement('style');
  style.textContent = refinementCss;
  document.head.append(style);
  hero.classList.add('refined-hero');

  const layer = document.createElement('div');
  layer.className = 'cta-universe';
  layer.setAttribute('aria-hidden', 'true');
  const svg = svgElement('svg', { focusable: 'false' });
  const defs = svgElement('defs');
  const palettes = [
    ['#fff0c8', '#d4a76a', '#725337', '#1c2434'],
    ['#e4eef5', '#a1b9d0', '#4d6687', '#172033'],
    ['#f5eafa', '#b6a1c6', '#746182', '#211f34'],
  ];
  palettes.forEach((colors, index) => {
    const gradient = svgElement('radialGradient', { id: `cta-planet-${index}`, cx: '28%', cy: '23%', r: '80%' });
    colors.forEach((color, i) => gradient.append(svgElement('stop', { offset: `${[0, 35, 72, 100][i]}%`, 'stop-color': color })));
    defs.append(gradient);
  });
  svg.append(defs);
  const specs = [
    { dx: 17, dy: 16, period: 24, phase: .8, radius: 6, color: '#d8b47e88' },
    { dx: 29, dy: 29, period: 35, phase: 3.7, radius: 8, color: '#c3b2d655' },
    { dx: 42, dy: 43, period: 48, phase: 5.4, radius: 5, color: '#d8b47e44' },
  ];
  const orbits = specs.map((spec, i) => {
    const track = svgElement('ellipse', { class: 'orbit-track', stroke: spec.color });
    const planet = svgElement('circle', { r: spec.radius, fill: `url(#cta-planet-${i})`, stroke: '#fff4da33', 'stroke-width': '.5' });
    svg.append(track, planet);
    return { ...spec, track, planet };
  });
  layer.append(svg);
  button.append(layer);

  const map = document.createElement('aside');
  map.className = 'choice-map';
  map.setAttribute('aria-label', 'Как это происходит: запрос, встреча, выбор');
  const title = document.createElement('p');
  title.className = 'choice-map-title';
  title.textContent = 'Всё начинается с разговора';
  const list = document.createElement('ol');
  for (const text of ['Запрос', 'Встреча', 'Выбор']) {
    const item = document.createElement('li');
    item.textContent = text;
    list.append(item);
  }
  map.append(title, list);
  button.after(map);
  document.body.classList.add('has-choice-map');

  let width = 0, height = 0, cx = 0, cy = 0;
  function resize() {
    width = button.offsetWidth;
    height = button.offsetHeight;
    cx = layer.clientWidth / 2;
    cy = layer.clientHeight / 2;
    svg.setAttribute('viewBox', `0 0 ${layer.clientWidth} ${layer.clientHeight}`);
    const compact = window.matchMedia('(max-width: 760px)').matches;
    orbits.forEach(o => {
      o.rx = width / 2 + o.dx * (compact ? .65 : 1);
      o.ry = height / 2 + o.dy * (compact ? .8 : 1);
      for (const [k, v] of Object.entries({ cx, cy, rx: o.rx, ry: o.ry })) o.track.setAttribute(k, v);
    });
    draw();
  }
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let elapsed = 0, previous = null, frame = null, visible = true;
  function draw() {
    orbits.forEach(o => {
      const angle = o.phase + (motion.matches ? 0 : elapsed) * Math.PI * 2 / o.period;
      o.planet.setAttribute('cx', cx + Math.cos(angle) * o.rx);
      o.planet.setAttribute('cy', cy + Math.sin(angle) * o.ry);
    });
  }
  function tick(now) {
    frame = null;
    if (!hero.isConnected) return;
    if (previous !== null) elapsed += Math.min((now - previous) / 1000, .05);
    previous = now;
    draw();
    if (!motion.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function syncAnimation() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previous = null;
    draw();
    if (!motion.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(button);
  const visibility = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    syncAnimation();
  });
  visibility.observe(hero);
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', syncAnimation);
  motion.addEventListener('change', syncAnimation);
  resize();
  syncAnimation();
  return true;
}

if (!mountRefinements()) {
  const pending = new MutationObserver(() => {
    if (mountRefinements()) pending.disconnect();
  });
  pending.observe(document.documentElement, { childList: true, subtree: true });
  // Do not keep observing indefinitely if the React application cannot load.
  window.setTimeout(() => pending.disconnect(), 30000);
}
