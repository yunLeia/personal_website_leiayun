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

      const c = cell * dpr;
      ctx.fillStyle = '#f7f6f2';
      ctx.fillRect(0, 0, px, px);
      ctx.fillStyle = '#191919';

      for (let y = 0; y < px; y += c) {
        for (let x = 0; x < px; x += c) {
          let sum = 0;
          let count = 0;
          for (let dy = 0; dy < c && y + dy < px; dy++) {
            for (let dx = 0; dx < c && x + dx < px; dx++) {
              const i = ((y + dy) * px + (x + dx)) * 4;
              sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
              count++;
            }
          }
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
