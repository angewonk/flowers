import React, { useEffect, useRef } from 'react';

interface PetalParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
}

interface BloomParticle {
  x: number;
  y: number;
  size: number;
  maxSize: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'flower' | 'heart' | 'sparkle';
  angle: number;
}

export const InteractivePetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial background falling petals
    const petalColors = ['#F472B6', '#FB7185', '#F87171', '#FDA4AF', '#F43F5E', '#FFFFFF'];
    const petals: PetalParticle[] = [];
    const blooms: BloomParticle[] = [];

    const numPetals = Math.min(Math.floor(width / 35), 30);
    for (let i = 0; i < numPetals; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.6 + 0.3,
      });
    }

    // Spawn flowers on click/tap
    const handleTap = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const colors = ['#F472B6', '#FBBF24', '#EC4899', '#A855F7', '#38BDF8', '#FB7185'];

      // Spawn 8 flower petals radiating outward
      for (let i = 0; i < 8; i++) {
        blooms.push({
          x: clientX,
          y: clientY,
          size: 2,
          maxSize: Math.random() * 12 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: Math.random() * 40 + 30,
          type: i % 2 === 0 ? 'flower' : 'heart',
          angle: (i * Math.PI) / 4 + Math.random() * 0.2,
        });
      }
    };

    window.addEventListener('click', handleTap);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render falling petals
      petals.forEach((petal) => {
        petal.y += petal.speedY;
        petal.x += Math.sin(petal.y * 0.01) * 0.5 + petal.speedX;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);
        ctx.globalAlpha = petal.opacity;
        ctx.fillStyle = petal.color;

        // Draw oval petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size, petal.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render click bloom animations
      for (let i = blooms.length - 1; i >= 0; i--) {
        const b = blooms[i];
        b.life++;
        const progress = b.life / b.maxLife;

        const currentDist = progress * 40;
        const currentX = b.x + Math.cos(b.angle) * currentDist;
        const currentY = b.y + Math.sin(b.angle) * currentDist - progress * 15;
        const alpha = 1 - progress;

        ctx.save();
        ctx.translate(currentX, currentY);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = b.color;

        if (b.type === 'heart') {
          // Draw mini heart
          ctx.beginPath();
          ctx.arc(-2, -2, 4, 0, Math.PI * 2);
          ctx.arc(2, -2, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(-6, -1);
          ctx.lineTo(0, 6);
          ctx.lineTo(6, -1);
          ctx.fill();
        } else {
          // Draw mini flower blossom
          for (let p = 0; p < 5; p++) {
            const rot = (p * Math.PI * 2) / 5;
            ctx.beginPath();
            ctx.ellipse(
              Math.cos(rot) * 5,
              Math.sin(rot) * 5,
              4,
              2.5,
              rot,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
          ctx.fillStyle = '#FEF08A';
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        if (b.life >= b.maxLife) {
          blooms.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleTap);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};
