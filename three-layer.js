// Lightweight CTA-centred orbits. No external renderer or CDN is required.
// React owns the page; this optional enhancement only appends decorative nodes.
const refinementCss = `
.hero.refined-hero #three-layer { display: none; }
.refined-hero .hero-copy > .cta {
  position: relative; isolation: isolate; overflow: visible;
  display: flex; flex-direction: column; justify-content: center; gap: 8px;
  width: 164px; height: 100px; min-width: 164px; flex-shrink: 0;
  padding: 14px; margin: 25px 0 38px 80px; border-radius: 50%;
  text-align: center; font-family: Manrope, system-ui, sans-serif; font-weight: 400; font-size: 14px; line-height: 1.35; letter-spacing: .02em;
  text-transform: none; background: radial-gradient(circle at 35% 25%, #34415a, #172238 70%);
  border: 1px solid #d8b47e;
  box-shadow: 0 0 0 6px #d8b47e08, 0 0 42px #d8b47e22, inset 0 0 20px #d8b47e0c;
}
.refined-hero .hero-copy > .cta:hover { background: radial-gradient(circle at 35% 25%, #44516a, #202e46 70%); transform: translateY(-2px); }
.refined-hero .hero-copy > .cta:focus-visible { outline: 2px solid #fff2d6; outline-offset: 7px; }
.refined-hero .hero-copy > .cta > span { position: relative; z-index: 2; display: block; max-width: 125px; }
.refined-hero .hero-copy > .cta > b { position: relative; z-index: 2; width: auto; height: auto; background: none; color: #e5bf88; font-size: 20px; line-height: 1; }
.refined-hero .cta-universe { position: absolute; inset: -53px -88px; pointer-events: none; z-index: -1; overflow: visible; display: block; }
.refined-hero .cta-universe svg { display: block; width: 100%; height: 100%; overflow: visible; }
.refined-hero .cta-universe .orbit-track { fill: none; stroke-width: .8; vector-effect: non-scaling-stroke; }
.refined-hero .choice-map {
  position: absolute; z-index: 7; right: clamp(24px, 5vw, 80px); bottom: 90px;
  width: clamp(350px, 34vw, 480px); padding: 26px 28px 30px; margin: 0;
  border: 1px solid #d9bd9238; border-radius: 28px 8px 28px 8px;
  color: #eee7de; background: linear-gradient(125deg, #18243aeb, #25273edb);
  backdrop-filter: blur(12px); box-shadow: 0 16px 50px #070e2026;
}
.refined-hero .choice-map::before { content: ''; position: absolute; top: -1px; left: 28px; right: 45%; height: 1px; background: linear-gradient(90deg, #e6bf85, transparent); }
.refined-hero .choice-map-subtitle { margin: 0 0 28px; color: #f3ece4; font: 500 22px/1.3 'Playfair Display', Georgia, serif; white-space: nowrap; }
.refined-hero .choice-map ol { position: relative; display: flex; gap: 8px; padding: 0; margin: 0; list-style: none; }
.refined-hero .choice-map li { position: relative; flex: 1; min-width: 0; padding-top: 0; text-align: center; font: 14px/1.5 Manrope, system-ui, sans-serif; }
.refined-hero .choice-map .map-node { display: grid; place-items: center; position: relative; z-index: 1; width: 84px; height: 84px; margin: 0 auto; border: 1px solid #d3b28277; border-radius: 50%; font: 15px/1.3 Manrope, system-ui, sans-serif; color: #eee4d4; background: radial-gradient(circle at 30% 20%, #35415a, #1b263c 75%); }
.refined-hero .choice-map li:last-child .map-node { border-color: #d8b988; box-shadow: 0 0 22px #d9b98212; }
.refined-hero .choice-map .map-steps { position: relative; }
.refined-hero .choice-map .map-connectors { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.refined-hero .choice-map li:nth-child(1) { padding-top: 22px; }
.refined-hero .choice-map li:nth-child(2) { padding-top: 52px; }
.refined-hero .choice-map li:nth-child(3) { padding-top: 0; }
.refined-hero .choice-map .map-caption { display: block; margin: 12px auto 0; max-width: 120px; font: 14px/1.4 Manrope, system-ui, sans-serif; color: #c7cbd5; }
body.has-choice-map .process-section { display: none; }
@media (min-width: 761px) and (max-width: 1100px) {
  .refined-hero .choice-map { position: relative; width: 440px; max-width: calc(100% - 48px); right: auto; bottom: auto; margin: 0 24px 90px auto; padding: 22px; }
  .refined-hero .choice-map-subtitle { font-size: 18px; }
}
@media (max-width: 760px) {
  .refined-hero .hero-copy { padding-top: max(320px, calc(100vw * .5625 + 120px)); padding-bottom: 28px; }
  .refined-hero .hero-copy > .cta { margin: 25px 0 42px 66px; }
  .refined-hero .cta-universe { inset: -44px -62px; }
  .refined-hero .choice-map { position: relative; right: auto; bottom: auto; width: calc(100% - 40px); max-width: 480px; margin: 0 20px 90px; padding: 24px 18px; }
  .refined-hero .choice-map-subtitle { font-size: clamp(14px, 4.7vw, 20px); }
  .refined-hero .choice-map .map-node { width: 70px; height: 70px; font-size: 14px; }
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
    { dx: 36, dy: 16, period: 24, phase: .8, radius: 6, color: '#d8b47e88' },
    { dx: 56, dy: 29, period: 35, phase: 3.7, radius: 8, color: '#c3b2d655' },
    { dx: 76, dy: 43, period: 48, phase: 5.4, radius: 5, color: '#d8b47e44' },
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
  map.setAttribute('aria-label', 'Запрос, встреча, выбор');
  const subtitle = document.createElement('p');
  subtitle.className = 'choice-map-subtitle';
  subtitle.textContent = 'От вопроса к готовому решению';
  const list = document.createElement('ol');
  for (const [i, text] of ['Запрос', 'Встреча', 'Выбор'].entries()) {
    const item = document.createElement('li');
    const node = document.createElement('span');
    node.className = 'map-node';
    node.textContent = text;
    const caption = document.createElement('span');
    caption.className = 'map-caption';
    caption.textContent = ['Что волнует', 'Смотрим глубже', 'Ваш следующий шаг'][i];
    item.append(node, caption);
    list.append(item);
  }
  const steps = document.createElement('div');
  steps.className = 'map-steps';
  const connectors = svgElement('svg', { class: 'map-connectors', 'aria-hidden': 'true', focusable: 'false' });
  const links = [0, 1].map(() => svgElement('line', { stroke: '#d5b28377', 'stroke-width': 1 }));
  connectors.append(...links);
  steps.append(connectors, list);
  map.append(subtitle, steps);
  function layoutConnectors() {
    const rect = steps.getBoundingClientRect();
    connectors.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    const nodes = [...list.querySelectorAll('.map-node')].map(node => {
      const r = node.getBoundingClientRect();
      return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2, radius: r.width / 2 };
    });
    links.forEach((line, i) => {
      const a = nodes[i], b = nodes[i + 1];
      const dx = b.x - a.x, dy = b.y - a.y, length = Math.hypot(dx, dy) || 1;
      const attrs = { x1: a.x + dx / length * a.radius, y1: a.y + dy / length * a.radius, x2: b.x - dx / length * b.radius, y2: b.y - dy / length * b.radius };
      for (const [key, value] of Object.entries(attrs)) line.setAttribute(key, value);
    });
  }
  hero.append(map);
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
      o.ry = o.rx * height / width;
      for (const [k, v] of Object.entries({ cx, cy, rx: o.rx, ry: o.ry })) o.track.setAttribute(k, v);
    });
    layoutConnectors();
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
  observer.observe(steps);
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
