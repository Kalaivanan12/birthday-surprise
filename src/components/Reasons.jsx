import React, { useEffect, useRef } from 'react';
import { Heart, Sparkles, Smile, ShieldCheck, Stars, Laugh } from 'lucide-react';
import './Reasons.css';

/**
 * Reasons Component:
 * Grid of romantic reason cards that animate smoothly into the viewport
 * with subtle hover glows and glassmorphism.
 */
export default function Reasons() {
  // ==========================================
  // EDITABLE REASONS LIST
  // ==========================================
  const reasonsList = [
   { id: 1, title: 'Your Smile 😊', description: 'Your smile has this magical way of making everything feel better. No matter how my day is going, seeing you smile can instantly make my world a little brighter.', icon: Smile, glowColor: 'rgba(168, 85, 247, 0.45)' }, { id: 2, title: 'Your Kind Heart ❤️', description: 'I love how genuinely kind you are. The way you care about people, understand their feelings, and give love so naturally is one of the most beautiful things about you.', icon: Heart, glowColor: 'rgba(192, 132, 252, 0.45)' }, { id: 3, title: 'The Way You Care 🥹', description: 'It is the little things you do that mean the most to me. Your messages, your questions, your concern, and those little moments when you simply make sure I am okay.', icon: ShieldCheck, glowColor: 'rgba(147, 51, 234, 0.45)' }, { id: 4, title: 'Your Beautiful Soul ✨', description: 'There is something so special about the person you are inside. Your heart, your dreams, your innocence, and the way you see the world make you truly unforgettable to me.', icon: Stars, glowColor: 'rgba(216, 180, 254, 0.45)' }, { id: 5, title: 'Your Laugh 😂', description: 'I could listen to your laugh a thousand times and still smile every single time. Your happiness is contagious, and hearing you laugh is one of my favorite sounds in the world.', icon: Laugh, glowColor: 'rgba(168, 85, 247, 0.45)' }, { id: 6, title: "Simply Because You're You ❤️", description: 'I do not love you because you are perfect. I love you because you are you — with your little habits, your dreams, your silly moments, your beautiful heart, and everything that makes you uniquely you.', icon: Sparkles, glowColor: 'rgba(192, 132, 252, 0.45)' }
  ];

  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reason-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-container reasons-section" id="reasons">
      <div className="section-header">
        <span className="section-tag">
          <Heart size={14} style={{ display: 'inline', marginRight: 6 }} />
          Countless Reasons
        </span>
        <h2 className="section-title">Reasons Why I Love You ❤️</h2>
        <p className="section-subtitle">
          If I wrote every reason why I love you, eternity wouldn't be long enough.
        </p>
      </div>

      <div className="reasons-grid">
        {reasonsList.map((reason, index) => {
          const IconComp = reason.icon;
          return (
            <div
              key={reason.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="reason-card glass-card"
              style={{
                '--delay': `${index * 0.12}s`,
                '--glow-color': reason.glowColor
              }}
            >
              <div className="reason-number">0{index + 1}</div>

              <div className="reason-icon-box">
                <IconComp size={28} className="reason-icon" />
              </div>

              <h3 className="reason-card-title">{reason.title}</h3>
              <p className="reason-card-desc">{reason.description}</p>

              <div className="reason-card-corner-glow"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
