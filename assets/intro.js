var RG_LOGO={"sym":{"w":232,"h":233,"light":["M183.37 206.49L134.86 156.77L102.96 122.86L100.87 118.81L102.96 117.75L144.71 117.75A43.51 43.51 0 0 0 161.78 110.23A34.70 34.70 0 0 0 167.38 64.04A33.01 33.01 0 0 0 142.40 50.90L41.13 50.90L27.91 31.68L27.91 29.12A4.24 4.24 0 0 1 31.95 27.62L140.46 27.62A60.01 60.01 0 0 1 177.92 42.40A55.67 55.67 0 0 1 147.41 140.54L161.78 156.77L205.80 203.97L205.80 206.49A55.67 55.67 0 0 1 183.37 206.49Z","M165.62 232.55L61.37 122.86L55.82 117.75L55.82 115.24L60.07 115.24L84.76 115.24L185.67 221.10L195.64 232.55L165.62 232.55Z"],"rust":["M74.28 215.85L60.07 199.32L48.04 213.40L45.24 215.85L30.31 215.85L27.91 214.78L51.80 185.52L55.82 180.10L60.07 175.23L91.68 213.40L91.68 214.78L90.32 215.85L74.28 215.85Z"]},"wm":{"w":332,"h":83,"letters":["M13.88 15.15L44.00 15.15A10.7 10.7 0 0 1 54.7 25.85L54.7 34.30A10.7 10.7 0 0 1 44.00 45.0L31.70 45.0L54.7 67.33L54.7 69.24L45.30 69.24L14.82 39.60L14.82 37.53L40.25 37.53A6.5 6.5 0 0 0 46.75 31.03L46.75 29.82A6.5 6.5 0 0 0 40.25 23.32L13.88 23.32Z","M74.75 45.24L74.75 17.88L74.75 16.05A13.43 13.43 0 0 1 83.95 16.05L83.95 17.88L83.95 46.05A11.36 11.36 0 0 0 95.60 55.80A15.88 15.88 0 0 0 111.74 49.46L111.74 48.17L112.97 46.05L112.97 17.88L113.67 16.05A9.05 9.05 0 0 1 121.84 16.05L121.84 18.76L121.84 46.05A17.68 17.68 0 0 1 112.97 60.11A24.58 24.58 0 0 1 74.75 45.24Z","M159.85 63.55A24.58 24.58 0 0 1 138.78 41.31L139.83 31.91A24.58 24.58 0 0 1 160.97 15.24L172.54 15.24A22.79 22.79 0 0 1 187.03 23.65A9.05 9.05 0 0 1 181.56 28.92A20.00 20.00 0 0 0 159.85 23.04A17.68 17.68 0 0 0 148.14 36.17L148.14 42.86A17.68 17.68 0 0 0 174.27 54.92L180.39 51.12L180.39 45.24L178.77 43.93L166.18 43.93L164.66 43.93A7.72 7.72 0 0 1 164.66 36.70L166.18 36.17L172.54 36.17L188.84 36.17L188.84 54.92A34.30 34.30 0 0 1 159.85 63.55Z","M251.51 62.72L249.72 63.55L241.14 63.55L210.60 63.55L209.11 62.72L209.11 59.20L209.11 17.88L210.60 15.24L250.90 15.24A7.72 7.72 0 0 1 250.90 23.04L249.72 23.04L218.45 23.04L218.45 32.45L218.45 35.01L241.14 35.01L244.50 35.01A11.36 11.36 0 0 1 244.50 42.86L218.45 42.86L218.45 54.92L249.72 54.92L251.51 55.80A11.36 11.36 0 0 1 251.51 62.72Z","M318.80 62.72L311.05 62.72L308.90 61.32L285.43 33.86L281.49 30.32L280.53 33.86L280.53 61.32L280.53 62.72A11.36 11.36 0 0 1 272.06 62.72L272.06 37.91L272.06 18.76L272.06 16.05L273.40 15.24L279.10 15.24A15.88 15.88 0 0 1 285.43 21.00L294.19 31.91L309.72 48.17L309.72 17.88L311.05 15.24L316.92 15.24L318.80 16.05L318.80 60.11L318.80 62.72Z"]}};
/* RUGEN — laser engraving intro
   Draws the mark and wordmark as if burned into the screen, throwing sparks,
   then flies the lockup into its place in the header.
   Self-contained: injects its own styles, cleans up after itself. */
(function () {
  'use strict';

  var KEY = 'rugen-intro-v1';
  var root = document.documentElement;

  function bail() {
    root.classList.remove('rg-intro');
    root.classList.remove('rg-reveal');
  }

  if (!root.classList.contains('rg-intro')) return;
  if (!window.requestAnimationFrame || !document.createElementNS) { bail(); return; }

  // ---------------------------------------------------------------- timings
  var T = {
    symbol: [{ s: 180, d: 900 }, { s: 980, d: 420 }, { s: 1300, d: 340 }],
    wordStart: 1520, wordStep: 190, wordDur: 420,
    settle: 3400,
    flyStart: 4150, flyDur: 1050,
    end: 5750
  };
  var COOL = 700;              // ms for a shape to cool from hot to brand colour
  var HOT = [255, 233, 176];   // molten
  var LIGHT = [244, 241, 233]; // --offwhite
  var RUST = [154, 79, 46];    // --rust

  // ------------------------------------------------------------------ style
  var css = document.createElement('style');
  css.textContent =
    'html.rg-intro,html.rg-intro body{overflow:hidden!important}' +
    'html.rg-intro{background:#1F211E}' +
    'html.rg-intro body>*:not(#rgIntro){opacity:0}' +
    'html.rg-reveal body>*:not(#rgIntro){transition:opacity .5s cubic-bezier(.22,.61,.36,1) .04s}' +
    'html.rg-intro .logo .brand-img,html.rg-reveal .logo .brand-img{opacity:0!important}' +
    '#rgIntro{position:fixed;inset:0;z-index:99999;background:#1F211E;overflow:hidden;' +
    'contain:strict;cursor:pointer}' +
    '#rgIntro canvas,#rgIntro svg{position:absolute;inset:0;width:100%;height:100%;display:block}' +
    '#rgIntro .rg-topo{opacity:.28}' +
    '#rgIntro .rg-skip{position:absolute;right:22px;bottom:20px;margin:0;font:500 10px/1 ' +
    '"IBM Plex Mono",ui-monospace,monospace;letter-spacing:.22em;color:rgba(244,241,233,.34);' +
    'text-transform:uppercase;transition:opacity .3s}';
  document.head.appendChild(css);

  // ------------------------------------------------------------------ build
  var NS = 'http://www.w3.org/2000/svg';
  var vw = window.innerWidth, vh = window.innerHeight;

  var overlay = document.createElement('div');
  overlay.id = 'rgIntro';
  overlay.setAttribute('aria-hidden', 'true');

  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + vw + ' ' + vh);
  svg.setAttribute('preserveAspectRatio', 'none');

  // faint contour lines, echoing the hero
  var topo = document.createElementNS(NS, 'g');
  topo.setAttribute('class', 'rg-topo');
  topo.setAttribute('fill', 'none');
  topo.setAttribute('stroke', '#D8C9AE');
  topo.setAttribute('stroke-width', '1');
  [[0.80, 0.5], [0.87, 0.36], [0.94, 0.26], [0.15, 0.32], [0.22, 0.22]].forEach(function (r) {
    var y = vh * r[0];
    var p = document.createElementNS(NS, 'path');
    p.setAttribute('d', 'M-50,' + y + ' C' + vw * 0.2 + ',' + (y - vh * 0.05) +
      ' ' + vw * 0.5 + ',' + (y + vh * 0.05) + ' ' + (vw + 50) + ',' + (y - vh * 0.02));
    p.setAttribute('opacity', r[1]);
    topo.appendChild(p);
  });
  svg.appendChild(topo);

  var defs = document.createElementNS(NS, 'defs');
  defs.innerHTML =
    '<filter id="rgGlow" x="-60%" y="-60%" width="220%" height="220%">' +
    '<feGaussianBlur stdDeviation="3.2" result="b"/>' +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
    '</filter>';
  svg.appendChild(defs);

  // lockup geometry
  var markW = Math.min(148, vw * 0.30, vh * 0.26);
  var markH = markW * (RG_LOGO.sym.h / RG_LOGO.sym.w);
  var wordW = Math.min(318, vw * 0.62);
  var wordH = wordW * (RG_LOGO.wm.h / RG_LOGO.wm.w);
  var gap = Math.round(markH * 0.22);
  var totalH = markH + gap + wordH;
  var cx = vw / 2, cy = vh / 2 - vh * 0.02;

  var markFrom = { x: cx - markW / 2, y: cy - totalH / 2, s: markW / RG_LOGO.sym.w };
  var wordFrom = { x: cx - wordW / 2, y: cy - totalH / 2 + markH + gap, s: wordW / RG_LOGO.wm.w };

  function group(from) {
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', 'translate(' + from.x + ' ' + from.y + ') scale(' + from.s + ')');
    svg.appendChild(g);
    return g;
  }
  var gMark = group(markFrom), gWord = group(wordFrom);

  // shapes: {stroke, fill, from:[r,g,b], to:[r,g,b], t0, dur, grp}
  var shapes = [];
  function addShape(g, d, to, t0, dur) {
    var fill = document.createElementNS(NS, 'path');
    fill.setAttribute('d', d);
    fill.setAttribute('fill', 'rgb(' + HOT.join(',') + ')');
    fill.setAttribute('opacity', '0');
    g.appendChild(fill);

    var stroke = document.createElementNS(NS, 'path');
    stroke.setAttribute('d', d);
    stroke.setAttribute('fill', 'none');
    stroke.setAttribute('stroke', '#FFF4DE');
    stroke.setAttribute('stroke-width', '2');
    stroke.setAttribute('stroke-linecap', 'round');
    stroke.setAttribute('vector-effect', 'non-scaling-stroke');
    stroke.setAttribute('filter', 'url(#rgGlow)');
    g.appendChild(stroke);

    var len = stroke.getTotalLength();
    stroke.style.strokeDasharray = len;
    stroke.style.strokeDashoffset = len;

    shapes.push({ el: stroke, fill: fill, len: len, t0: t0, dur: dur, to: to, done: false, grp: g });
  }

  RG_LOGO.sym.light.forEach(function (d, i) {
    var t = T.symbol[Math.min(i, T.symbol.length - 1)];
    addShape(gMark, d, LIGHT, t.s, t.d);
  });
  RG_LOGO.sym.rust.forEach(function (d) {
    var t = T.symbol[2];
    addShape(gMark, d, RUST, t.s, t.d);
  });
  RG_LOGO.wm.letters.forEach(function (d, i) {
    addShape(gWord, d, LIGHT, T.wordStart + i * T.wordStep, T.wordDur);
  });

  var canvas = document.createElement('canvas');
  var skip = document.createElement('p');
  skip.className = 'rg-skip';
  skip.textContent = 'atlamak için tıklayın';

  overlay.appendChild(canvas);
  overlay.appendChild(svg);
  overlay.appendChild(skip);

  function start() {
    document.body.appendChild(overlay);
    sizeCanvas();
    measureTargets();
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    last = performance.now();
    t0 = last;
    requestAnimationFrame(frame);
  }

  // ------------------------------------------------------------ fly targets
  var markTo = null, wordTo = null;
  function visible(list) {
    for (var i = 0; i < list.length; i++) if (list[i].getClientRects().length) return list[i];
    return list[0] || null;
  }
  function measureTargets() {
    var m = visible(document.querySelectorAll('.logo .mark'));
    var w = visible(document.querySelectorAll('.logo .word'));
    if (m) { var r = m.getBoundingClientRect(); markTo = { x: r.left, y: r.top, s: r.width / RG_LOGO.sym.w }; }
    if (w) { var q = w.getBoundingClientRect(); wordTo = { x: q.left, y: q.top, s: q.width / RG_LOGO.wm.w }; }
    if (!markTo) markTo = { x: 26, y: 19, s: 26 / RG_LOGO.sym.w };
    if (!wordTo) wordTo = { x: 62, y: 25, s: 60 / RG_LOGO.wm.w };
  }

  // --------------------------------------------------------------- particles
  var ctx = canvas.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
  function sizeCanvas() {
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  var parts = [];
  function spark(x, y, spread, speed) {
    if (parts.length > 460) return;
    var a = Math.random() * Math.PI * 2;
    var v = speed * (0.35 + Math.random() * 0.9);
    parts.push({
      x: x, y: y,
      vx: Math.cos(a) * v * spread,
      vy: Math.sin(a) * v - speed * 0.55,
      life: 0, max: 0.32 + Math.random() * 0.55,
      r: 0.7 + Math.random() * 1.5
    });
  }
  function burst(x, y, n) { for (var i = 0; i < n; i++) spark(x, y, 1, 190); }

  function drawParticles(dt) {
    ctx.clearRect(0, 0, vw, vh);
    ctx.globalCompositeOperation = 'lighter';
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.life += dt;
      if (p.life >= p.max) { parts.splice(i, 1); continue; }
      p.vy += 760 * dt;
      p.vx *= 0.985;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      var k = 1 - p.life / p.max;
      var r = Math.round(255);
      var g = Math.round(120 + 135 * k);
      var b = Math.round(30 + 150 * k * k);
      ctx.globalAlpha = Math.min(1, k * 1.5);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (0.35 + k * 0.85), 0, 6.2832);
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  function head(x, y, power) {
    ctx.globalCompositeOperation = 'lighter';
    var grd = ctx.createRadialGradient(x, y, 0, x, y, 26 * power);
    grd.addColorStop(0, 'rgba(255,252,240,' + (0.95 * power) + ')');
    grd.addColorStop(0.28, 'rgba(255,196,110,' + (0.55 * power) + ')');
    grd.addColorStop(1, 'rgba(255,140,50,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, 26 * power, 0, 6.2832);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  // ------------------------------------------------------------------ loop
  var t0 = 0, last = 0, finished = false, skipped = false, swapped = false;
  var ease = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
  function mix(a, b, t) {
    return 'rgb(' + Math.round(a[0] + (b[0] - a[0]) * t) + ',' +
      Math.round(a[1] + (b[1] - a[1]) * t) + ',' +
      Math.round(a[2] + (b[2] - a[2]) * t) + ')';
  }
  function place(g, from, to, t) {
    var e = ease(t);
    var x = from.x + (to.x - from.x) * e;
    var y = from.y + (to.y - from.y) * e;
    var s = from.s + (to.s - from.s) * e;
    g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + s + ')');
  }

  function frame(now) {
    var t = now - t0;
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    drawParticles(dt);

    for (var i = 0; i < shapes.length; i++) {
      var s = shapes[i];
      var p = (t - s.t0) / s.dur;
      if (p <= 0) continue;
      if (p < 1) {
        var e = easeOut(p);
        s.el.style.strokeDashoffset = s.len * (1 - e);
        // laser head, in screen coordinates
        var pt = s.el.getPointAtLength(s.len * e);
        var m = s.grp === gMark ? markFrom : wordFrom;
        var sx = m.x + pt.x * m.s, sy = m.y + pt.y * m.s;
        head(sx, sy, 1);
        for (var k = 0; k < 2; k++) spark(sx, sy, 1.1, 150);
        s.fill.setAttribute('opacity', String(Math.min(0.9, e * 0.9)));
      } else if (!s.done) {
        s.done = true;
        s.el.style.strokeDashoffset = 0;
        s.fill.setAttribute('opacity', '1');
        var pt2 = s.el.getPointAtLength(s.len);
        var mm = s.grp === gMark ? markFrom : wordFrom;
        burst(mm.x + pt2.x * mm.s, mm.y + pt2.y * mm.s, 16);
      }
      if (s.done) {
        var c = Math.min(1, (t - (s.t0 + s.dur)) / COOL);
        s.fill.setAttribute('fill', mix(HOT, s.to, c));
        s.el.setAttribute('opacity', String(Math.max(0, 1 - c * 1.25)));
      }
    }

    // fly into the header
    if (t >= T.flyStart) {
      var f = Math.min(1, (t - T.flyStart) / T.flyDur);
      place(gMark, markFrom, markTo, f);
      place(gWord, wordFrom, wordTo, f);
      topo.setAttribute('opacity', String(0.28 * (1 - Math.min(1, f * 2))));
      var bg = 1 - easeOut(Math.max(0, Math.min(1, (f - 0.34) / 0.5)));
      overlay.style.background = 'rgba(31,33,30,' + bg + ')';
      skip.style.opacity = '0';
      if (f > 0.05 && !swapped && !root.classList.contains('rg-reveal')) {
        root.classList.add('rg-reveal');
        root.classList.remove('rg-intro');
      }
    }

    if (t >= T.flyStart + T.flyDur && !swapped) swap();
    if (t >= T.end && !finished) { done(); return; }
    requestAnimationFrame(frame);
  }

  // hand the logo back to the real header — the two are exactly aligned,
  // so the switch has to be instant, not a cross-fade
  function swap() {
    swapped = true;
    place(gMark, markFrom, markTo, 1);
    place(gWord, wordFrom, wordTo, 1);
    svg.style.display = 'none';
    overlay.style.background = 'transparent';
    overlay.style.pointerEvents = 'none';
    root.classList.remove('rg-intro');
    root.classList.remove('rg-reveal');
  }

  function done() {
    finished = true;
    if (!swapped) swap();
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    root.classList.remove('rg-intro');
    root.classList.remove('rg-reveal');
  }

  function requestSkip() {
    if (skipped || finished) return;
    skipped = true;
    var now = performance.now();
    if (now - t0 < T.flyStart) t0 = now - T.flyStart;   // jump straight to the fly-out
  }
  overlay.addEventListener('click', requestSkip);
  window.addEventListener('keydown', requestSkip, { once: true });
  window.addEventListener('wheel', requestSkip, { once: true, passive: true });
  window.addEventListener('touchstart', requestSkip, { once: true, passive: true });

  // failsafe — never leave the page hidden
  setTimeout(function () { if (!finished) done(); }, 9000);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
