import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Calendar, Stars } from 'lucide-react';
import './Hero.css';

/**
 * Hero Component:
 * Full-screen hero section featuring romantic typography,
 * a glowing circular image frame of photo1.jpg, floating hearts, and cinematic ambient glow.
 */
export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  // ==========================================
  // EDITABLE NICKNAMES (Cycles one by one)
  // ==========================================
  const nicknames = [
    'My Love ❤️',
    'My Dear ❤️',
    'My Bun ❤️'
  ];

  const [currentNicknameIndex, setCurrentNicknameIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Nickname cycling effect (changes every 2.6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentNicknameIndex((prev) => (prev + 1) % nicknames.length);
        setIsAnimating(false);
      }, 400); // Duration matches CSS exit animation
    }, 2600);

    return () => clearInterval(interval);
  }, [nicknames.length]);

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* Ambient background particles */}
      <div className="hero-ambient-glow glow-top"></div>
      <div className="hero-ambient-glow glow-bottom"></div>

      <div className="hero-container" style={{ transform: `translateY(${offsetY}px)` }}>
        <div className="hero-badge">
          <Sparkles size={16} className="hero-badge-icon" />
          <span>A Special Day For A Special Angel</span>
        </div>

        <h1 className="hero-title">
          Happiest Birthday,{' '}
          <span className="rotating-nickname-container">
            <span
              className={`gradient-text rotating-nickname ${
                isAnimating ? 'nickname-exit' : 'nickname-enter'
              }`}
            >
              {nicknames[currentNicknameIndex]}
            </span>
          </span>
        </h1>

        <p className="hero-subtitle">
          Today isn't just your birthday... <br />
          <span>It's the day my favorite person came into this world.</span>
        </p>

        {/* Circular Glowing Photo Frame */}
        <div className="hero-photo-wrapper">
          <div className="hero-photo-ring ring-outer"></div>
          <div className="hero-photo-ring ring-inner"></div>
          <div className="hero-photo-container">
            <img
              src="/assets/images/photo1.jpg"
              alt="My Love"
              className="hero-photo"
              loading="lazy"
            />
          </div>

          {/* Floating decorative heart badges */}
          <div className="floating-badge badge-1">
            <Heart size={20} fill="#c084fc" color="#ffffff" />
          </div>
          <div className="floating-badge badge-2">
            <Stars size={20} color="#ffffff" />
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="mouse-icon">
            <div className="mouse-wheel"></div>
          </div>
          <span>Scroll to explore our story</span>
        </div>
      </div>
    </section>
  );
}
