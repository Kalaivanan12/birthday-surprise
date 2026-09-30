import React, { useEffect, useRef } from 'react';
import { RotateCcw, Heart, Sparkles, Star } from 'lucide-react';
import './FinalSection.css';

/**
 * FinalSection Component:
 * Dramatic full-screen celebration finale with custom canvas fireworks,
 * heart confetti bursts, glowing stars, and smooth replay story navigation.
 */
export default function FinalSection() {
  const canvasRef = useRef(null);

  // Smooth scroll back to top
  const handleReplayStory = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // High-performance romantic fireworks, stars & heart confetti particle engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle arrays
    const particles = [];
    const stars = [];
    const colors = ['#ffffff', '#f3e8ff', '#e9d5ff', '#c084fc', '#a855f7', '#7e22ce', '#ffffff'];

    // Init background twinkling stars
    for (let i = 0; i < 75; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005
      });
    }

    // Firework burst function
    const createFirework = (x, y) => {
      const particleCount = 45;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 4.5 + 1.5;
        particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: baseColor,
          size: Math.random() * 3 + 1.5,
          decay: Math.random() * 0.015 + 0.01,
          isHeart: Math.random() > 0.6
        });
      }
    };

    let timer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.alpha += star.speed;
        const currentAlpha = Math.abs(Math.sin(star.alpha));
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Periodically trigger firework bursts
      timer++;
      if (timer % 55 === 0) {
        const fx = Math.random() * (width * 0.8) + width * 0.1;
        const fy = Math.random() * (height * 0.45) + height * 0.1;
        createFirework(fx, fy);
      }

      // Update and draw fireworks & confetti
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.isHeart) {
          // Draw mini romantic heart particle in purple/white
          ctx.font = `${p.size * 3}px serif`;
          ctx.fillText(Math.random() > 0.5 ? '💜' : '🤍', p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="final-section" id="final-section">
      {/* Canvas for fireworks, stars and confetti */}
      <canvas ref={canvasRef} className="final-canvas"></canvas>

      <div className="final-container">
        <div className="final-sparkle-crown">
          <Sparkles size={32} className="crown-sparkle" color="#f3e8ff" />
          <Heart size={36} fill="#c084fc" color="#ffffff" className="crown-heart" />
          <Sparkles size={32} className="crown-sparkle" color="#f3e8ff" />
        </div>

        <h2 className="final-heading">Happiest Birthday, My Dear Love ❤️</h2>

        <div className="final-message-card glass-card">
          <p className="final-message-line">
            "May your smile always stay this beautiful,
          </p>
          <p className="final-message-line">
            may your dreams come true,
          </p>
          <p className="final-message-line">
            and may I always be there to celebrate every birthday with you."
          </p>
        </div>

        <div className="final-love-statement">
          <span>I Love You More Than Words Can Say. ❤️</span>
        </div>

        <button className="final-replay-btn btn-primary" onClick={handleReplayStory}>
          <RotateCcw size={20} className="replay-icon" />
          <span>Replay Our Story 🔄</span>
        </button>

        <div className="final-watermark">
          Made with endless love, exclusively for you 💖
        </div>
      </div>
    </section>
  );
}
