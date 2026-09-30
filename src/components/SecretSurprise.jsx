import React, { useState } from 'react';
import { Lock, Unlock, Sparkles, Heart, Gift } from 'lucide-react';
import './SecretSurprise.css';

/**
 * SecretSurprise Component:
 * Features a locked romantic surprise trigger that unlocks with an explosion of hearts
 * and unveils the special secret message alongside photo10.jpg.
 */
export default function SecretSurprise() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReveal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsRevealed(true);
    }, 400);
  };

  return (
    <section className="section-container secret-section" id="secret-surprise">
      <div className="section-header">
        <span className="section-tag">
          <Gift size={14} style={{ display: 'inline', marginRight: 6 }} />
          Just Between Us
        </span>
        <h2 className="section-title">A Hidden Wish For You 🤫</h2>
        <p className="section-subtitle">
          I locked a secret thought here that only you are allowed to open.
        </p>
      </div>

      <div className="secret-content-wrapper">
        {!isRevealed ? (
          <div className="secret-trigger-box">
            <div className="secret-orb-glow"></div>
            <button
              className={`secret-button btn-primary ${isAnimating ? 'button-burst' : ''}`}
              onClick={handleReveal}
            >
              <Lock size={22} className="lock-icon" />
              <span>One More Surprise... 🤫❤️</span>
            </button>
            <p className="secret-tap-hint">Tap above to unlock what my heart is whispering</p>
          </div>
        ) : (
          <div className="secret-revealed-card glass-card">
            {/* Ambient Heart Fireworks & Particles */}
            <div className="secret-hearts-burst">
              <span className="burst-heart h-1">💜</span>
              <span className="burst-heart h-2">✨</span>
              <span className="burst-heart h-3">🤍</span>
              <span className="burst-heart h-4">💜</span>
              <span className="burst-heart h-5">💫</span>
            </div>

            <div className="secret-unlocked-badge">
              <Unlock size={18} color="#c084fc" />
              <span>Unlocked with love</span>
            </div>

            {/* Secret Message */}
            <div className="secret-message-body">
              <p className="secret-line-highlight">
                "If I could choose one person to spend every tomorrow with...
              </p>
              <p className="secret-line-core">
                I would still choose you.
              </p>
              <div className="secret-echo">
                <span>Again.</span>
                <span>And again.</span>
                <span>And again. ❤️</span>
              </div>
            </div>

            {/* Display photo14.jpg */}
            <div className="secret-photo-frame">
              <div className="secret-photo-glow"></div>
              <img
                src="/assets/images/photo14.jpg"
                alt="My Forever Choice"
                className="secret-photo"
                loading="lazy"
              />
              <div className="secret-photo-tag">
                <Heart size={16} fill="#c084fc" color="#ffffff" />
                <span>My One & Only</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
