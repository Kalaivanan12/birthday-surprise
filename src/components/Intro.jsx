import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import './Intro.css';

/**
 * Intro Component:
 * Cinematic opening splash screen that greets the user,
 * initiates audio playback upon interaction, and smoothly reveals the main website.
 */
export default function Intro({ onOpenSurprise }) {
  const [isFading, setIsFading] = useState(false);

  const handleClick = () => {
    setIsFading(true);
    // Allow fade animation to play before notifying parent
    setTimeout(() => {
      onOpenSurprise();
    }, 900);
  };

  return (
    <div className={`intro-overlay ${isFading ? 'intro-fade-out' : ''}`}>
      {/* Background ambient glowing orbs */}
      <div className="intro-glow-circle circle-1"></div>
      <div className="intro-glow-circle circle-2"></div>

      <div className="intro-card glass-card">
        <div className="intro-icon-wrapper">
          <Heart className="intro-heart-pulse" size={44} fill="#c084fc" color="#ffffff" />
        </div>

        <h1 className="intro-title">Hey My Love ❤️</h1>
        <p className="intro-subtitle">I made something special for you...</p>

        <button className="intro-btn btn-primary" onClick={handleClick}>
          <Sparkles size={20} className="sparkle-spin" />
          <span>Open Your Surprise 💝</span>
        </button>

        <span className="intro-hint">Turn your volume up for the best experience 🎵</span>
      </div>
    </div>
  );
}
