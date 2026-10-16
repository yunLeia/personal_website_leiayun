import { useEffect, useRef, useState } from 'react';

// The halftone portrait is a regular grid of dots (pitch measured from leia-dots.png).
// We read the dots' size from the image and redraw them on a canvas so they can react:
// hovering swells the dots near the cursor, and a click sends a ripple outward.
const PITCH = 9.217;
const ORIGIN_X = 2.43;
const ORIGIN_Y = 6.7;

type Dot = { x: number; y: number; r: number };
type Ripple = { x: number; y: number; t0: number };

const RIPPLE_SPEED = 170;   // px / s
const RIPPLE_WIDTH = 30;    // px, thickness of the wave front
const RIPPLE_LIFE = 2.1;    // s
const HOVER_RADIUS = 58;    // px

export default function DotPortrait({ src, alt }: { src: string; alt: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = frame.current;
    const cv = canvas.current;
    if (!host || !cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) { void Promise.resolve().then(() => setFailed(true)); return; }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dots: Dot[] = [];
    let natW = 1, natH = 1;
    let cssW = 1, cssH = 1, scale = 1, offX = 0, offY = 0, dpr = 1;
    let raf = 0;
    let cancelled = false;
    const ripples: Ripple[] = [];
    // cursor in CSS px inside the frame, eased so the hover swell glides rather than snaps
    const cursor = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0 };
    let lastTime = 0;

    const layout = () => {
      const box = host.getBoundingClientRect();
      cssW = Math.max(1, box.width); cssH = Math.max(1, box.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(cssW * dpr); cv.height = Math.round(cssH * dpr);
      scale = Math.max(cssW / natW, cssH / natH);   // object-fit: cover
      offX = (cssW - natW * scale) / 2; offY = (cssH - natH * scale) / 2;
    };

    const draw = (now: number) => {
      const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 0.016;
      lastTime = now;
      const t = now / 1000;
      // ease the cursor and its strength
      const k = 1 - Math.exp(-dt * 14);
      cursor.x += (cursor.tx - cursor.x) * k; cursor.y += (cursor.ty - cursor.y) * k;
      cursor.strength += (cursor.target - cursor.strength) * (1 - Math.exp(-dt * 9));
      for (let i = ripples.length - 1; i >= 0; i--) if (t - ripples[i].t0 > RIPPLE_LIFE) ripples.splice(i, 1);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      const hoverOn = cursor.strength > 0.01;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let px = offX + d.x * scale, py = offY + d.y * scale;
        if (px < -8 || py < -8 || px > cssW + 8 || py > cssH + 8) continue;
        let r = d.r * scale, ox = 0, oy = 0;
        for (let j = 0; j < ripples.length; j++) {
          const rp = ripples[j], age = t - rp.t0;
          const dx = px - rp.x, dy = py - rp.y, dist = Math.hypot(dx, dy) || 1;
          const delta = dist - age * RIPPLE_SPEED;
          const front = Math.exp(-(delta * delta) / (RIPPLE_WIDTH * RIPPLE_WIDTH));
          const fade = 1 - age / RIPPLE_LIFE;
          const amp = front * fade * fade;
          const away = Math.min(1, dist / 26);   // nothing shoves dots near the origin, so no hole opens
          r *= 1 + 0.6 * amp;
          ox += (dx / dist) * 3 * amp * away; oy += (dy / dist) * 3 * amp * away;
        }
        if (hoverOn) {
          const dx = px - cursor.x, dy = py - cursor.y, dist = Math.hypot(dx, dy) || 1;
          if (dist < HOVER_RADIUS) {
            const f = (1 - dist / HOVER_RADIUS) ** 2 * cursor.strength;
            const away = Math.min(1, dist / 22);   // dots under the cursor stay put
            r *= 1 + 0.6 * f;
            ox += (dx / dist) * 3.6 * f * away; oy += (dy / dist) * 3.6 * f * away;
          }
        }
        px += ox; py += oy;
        ctx.moveTo(px + r, py);
        ctx.arc(px, py, r, 0, Math.PI * 2);
      }
      ctx.fill();
      // keep animating only while something is moving
      const moving = ripples.length > 0 || Math.abs(cursor.target - cursor.strength) > 0.01
        || Math.abs(cursor.tx - cursor.x) > 0.3 || Math.abs(cursor.ty - cursor.y) > 0.3;
      raf = moving ? requestAnimationFrame(draw) : 0;
      if (!moving) lastTime = 0;
    };
    const kick = () => { if (!raf && !cancelled) raf = requestAnimationFrame(draw); };

    const local = (e: PointerEvent) => {
      const b = cv.getBoundingClientRect();
      return { x: e.clientX - b.left, y: e.clientY - b.top };
    };
    const onMove = (e: PointerEvent) => {
      if (reduced.matches || e.pointerType === 'touch') return;
      const p = local(e);
      if (cursor.target === 0) { cursor.x = p.x; cursor.y = p.y; }   // enter at the pointer, no slide-in
      cursor.tx = p.x; cursor.ty = p.y; cursor.target = 1;
      kick();
    };
    const onLeave = () => { cursor.target = 0; kick(); };
    const onDown = (e: PointerEvent) => {
      if (reduced.matches) return;
      const p = local(e);
      ripples.push({ x: p.x, y: p.y, t0: performance.now() / 1000 });
      if (ripples.length > 6) ripples.shift();
      kick();
    };
    cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerleave', onLeave);
    cv.addEventListener('pointerdown', onDown);

    const ro = new ResizeObserver(() => { if (dots.length) { layout(); draw(performance.now()); } });
    ro.observe(host);

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      natW = img.naturalWidth; natH = img.naturalHeight;
      const off = document.createElement('canvas');
      off.width = natW; off.height = natH;
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) { setFailed(true); return; }
      octx.drawImage(img, 0, 0);
      const alpha = octx.getImageData(0, 0, natW, natH).data;
      const half = Math.floor(PITCH / 2);
      const found: Dot[] = [];
      for (let gy = ORIGIN_Y; gy < natH; gy += PITCH) {
        for (let gx = ORIGIN_X; gx < natW; gx += PITCH) {
          // average alpha over the cell → dot area → radius
          let sum = 0, n = 0;
          const cx = Math.round(gx), cy = Math.round(gy);
          for (let yy = cy - half; yy <= cy + half; yy++) {
            if (yy < 0 || yy >= natH) continue;
            for (let xx = cx - half; xx <= cx + half; xx++) {
              if (xx < 0 || xx >= natW) continue;
              sum += alpha[(yy * natW + xx) * 4 + 3]; n++;
            }
          }
          if (!n) continue;
          const coverage = sum / (n * 255);
          const r = Math.sqrt((coverage * PITCH * PITCH) / Math.PI);
          if (r > 0.45) found.push({ x: gx, y: gy, r });
        }
      }
      dots = found;
      layout();
      draw(performance.now());
    };
    img.onerror = () => { if (!cancelled) setFailed(true); };
    img.src = src;

    const onPref = () => { if (reduced.matches) { ripples.length = 0; cursor.target = 0; kick(); } };
    reduced.addEventListener('change', onPref);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerleave', onLeave);
      cv.removeEventListener('pointerdown', onDown);
      reduced.removeEventListener('change', onPref);
    };
  }, [src]);

  return (
    <div ref={frame} className="dot-portrait">
      {failed
        ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        : <canvas ref={canvas} role="img" aria-label={alt} />}
    </div>
  );
}
