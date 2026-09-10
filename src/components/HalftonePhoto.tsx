import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  alt: string;
  size?: number;
  cell?: number;
  className?: string;
}

// Renders a photo as a newspaper-style halftone dot pattern via canvas.
export default function HalftonePhoto({ src, alt, size = 200, cell = 5, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const px = size * dpr;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      canvas.width = px;
      canvas.height = px;

      const off = document.createElement('canvas');
      off.width = px;
      off.height = px;
      const octx = off.getContext('2d')!;
      const scale = Math.max(px / img.width, px / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      octx.drawImage(img, (px - w) / 2, (px - h) / 2, w, h);
      const { data } = octx.getImageData(0, 0, px, px);

      // Flood-fill the flat backdrop from the top edge only (subjects in a
      // headshot don't touch the top corners, but shoulders often touch the
      // bottom/sides — seeding from those would eat into the subject).
      const bg = new Uint8Array(px * px);
      const [refR, refG, refB] = [data[0], data[1], data[2]];
      const threshold = 22;
      const stack: number[] = [];
      for (let x = 0; x < px; x++) stack.push(x);
      for (let y = 0; y < px * 0.35; y++) {
        stack.push(y * px);
        stack.push(y * px + px - 1);
      }
      const visited = new Uint8Array(px * px);
      while (stack.length) {
        const idx = stack.pop()!;
        if (visited[idx]) continue;
        visited[idx] = 1;
        const p = idx * 4;
        const dr = data[p] - refR;
        const dg = data[p + 1] - refG;
        const db = data[p + 2] - refB;
        if (Math.sqrt(dr * dr + dg * dg + db * db) > threshold) continue;
        bg[idx] = 1;
        const x = idx % px;
        const y = (idx - x) / px;
        if (x > 0) stack.push(idx - 1);
        if (x < px - 1) stack.push(idx + 1);
        if (y > 0) stack.push(idx - px);
        if (y < px - 1) stack.push(idx + px);
      }

      const c = cell * dpr;
      ctx.clearRect(0, 0, px, px);
      ctx.fillStyle = '#191919';

      for (let y = 0; y < px; y += c) {
        for (let x = 0; x < px; x += c) {
          let sum = 0;
          let count = 0;
          let bgCount = 0;
          for (let dy = 0; dy < c && y + dy < px; dy++) {
            for (let dx = 0; dx < c && x + dx < px; dx++) {
              const i = (y + dy) * px + (x + dx);
              const p = i * 4;
              sum += 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
              if (bg[i]) bgCount++;
              count++;
            }
          }
          if (bgCount / count > 0.5) continue;
          const avg = sum / count;
          const darkness = 1 - avg / 255;
          const radius = (c / 2) * Math.sqrt(darkness) * 1.05;
          if (radius > 0.4) {
            ctx.beginPath();
            ctx.arc(x + c / 2, y + c / 2, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };
  }, [src, size, cell]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}
