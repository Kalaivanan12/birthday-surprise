import React, { useState, useEffect, useRef } from 'react';
import { Mail, Heart, Sparkles, Feather } from 'lucide-react';
import './LoveLetter.css';

/**
 * LoveLetter Component:
 * Features a luxurious glassmorphism love letter card with a dynamic typewriter effect,
 * wax seal motif, and editable romantic paragraphs.
 */
export default function LoveLetter() {
  // ==========================================
  // EDITABLE LOVE LETTER PARAGRAPHS HERE
  // ==========================================
  const paragraphs = [
   "I don't know exactly when it happened, but somewhere between our conversations, our silly moments, and the memories we created, you became a part of my heart that I never want to lose.",
   "You are more than just someone I love. You are the person I look for when I want to share something, the person I think about when I smile for no reason, and the person who can make an ordinary day feel incredibly special.",
   "There are so many things I love about you — your smile, your voice, your laugh, the way you care, the little things you do without even realizing how much they mean to me. But more than anything, I love the feeling of being loved by you.",
   "If I could give you one thing in this world, I would give you the ability to see yourself through my eyes, even for a moment. Then you would understand just how beautiful, precious, and irreplaceable you are to me.",
   "I don't want to be there only for your birthdays or your happiest moments. I want to be there for the quiet days, the difficult days, the crazy days, and all the ordinary days in between. I want to make memories with you that we'll look back on years from now and smile about.",
   "No matter how many birthdays come and go, I hope I get to celebrate every single one of them beside you. I want to see your smile, hear your laugh, annoy you a little, make you happy, and remind you again and again how deeply you are loved.",
   "Today is your birthday, but honestly, I feel like I'm the lucky one — because the world gave me you. ❤️",
   "Happiest Birthday, my love. You are my favorite person, my happiest thought, my safest place, and one of the most beautiful parts of my life.",
   "I love you more than I know how to put into words. And if forever is real, I hope mine has you in it. ❤️"
  ];

  const fullText = paragraphs.join("\n\n");
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const letterRef = useRef(null);

  // Trigger typing effect when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (letterRef.current) {
      observer.observe(letterRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Typewriter effect logic
  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 28); // Smooth typing cadence

    return () => clearInterval(interval);
  }, [hasStarted, fullText]);

  return (
    <section className="section-container love-letter-section" id="love-letter" ref={letterRef}>
      <div className="section-header">
        <span className="section-tag">
          <Mail size={14} style={{ display: 'inline', marginRight: 6 }} />
          From The Heart
        </span>
        <h2 className="section-title">To The Most Beautiful Person In My World 💌</h2>
        <p className="section-subtitle">Words will never be enough, but here is a piece of my heart...</p>
      </div>

      <div className="letter-wrapper">
        <div className="letter-card glass-card">
          <div className="letter-header">
            <div className="letter-icon-feather">
              <Feather size={24} color="#c084fc" />
            </div>
            <div className="letter-date">A Letter For Your Birthday ✨</div>
          </div>

          <div className="letter-content">
            <pre className="typewriter-text">
              {displayedText}
              {!isTypingComplete && <span className="typewriter-cursor">|</span>}
            </pre>
          </div>

          <div className="letter-footer">
            <div className="letter-signature">
              <span>Forever & Always Yours,</span>
              <div className="signature-name">Your Love ❤️</div>
            </div>

            {/* Wax seal decoration */}
            <div className="wax-seal">
              <Heart size={20} fill="#ffffff" color="#ffffff" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
