import React, { useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import './Memories.css';

/**
 * Memories Component:
 * Polaroid-style photo gallery with varied tilts, romantic hover effects,
 * and a fullscreen interactive lightbox popup modal with romantic messages.
 */
export default function Memories() {
  // ==========================================
  // EDITABLE GALLERY PHOTOS, CAPTIONS & MESSAGES
  // ==========================================
  const memoriesList = [
    {
      id: 1,
      src: '/assets/images/photo1.jpg',
      caption: 'Our First Memory ❤️',
      msg: 'From the very first moment, my world became brighter. You brought a warmth and magic into my life that I had never felt before.',
      rotation: -3
    },
    {
      id: 2,
      src: '/assets/images/photo2.jpg',
      caption: 'My Favorite Smile 🥹',
      msg: 'Your smile is my absolute favorite sight in the whole universe. Whenever you smile, every worry in my world simply melts away.',
      rotation: 2.5
    },
    {
      id: 3,
      src: '/assets/images/photo3.jpg',
      caption: 'That Beautiful Day ✨',
      msg: 'A day filled with pure magic and laughter. With you, even the simplest, quietest moments turn into unforgettable adventures.',
      rotation: -2
    },
    {
      id: 4,
      src: '/assets/images/photo4.jpg',
      caption: 'Forever With You 💕',
      msg: 'Holding your hand and knowing you are by my side makes me feel like the luckiest person alive. I want every single tomorrow with you.',
      rotation: 3.5
    },
    {
      id: 5,
      src: '/assets/images/photo5.jpg',
      caption: "A Moment I'll Never Forget 🌸",
      msg: 'Time felt like it completely paused right here. Just us, sharing a sweet moment that will stay etched in my heart forever.',
      rotation: -1.5
    },
    {
      id: 6,
      src: '/assets/images/photo6.jpg',
      caption: 'You & Me ❤️',
      msg: 'No matter where life takes us or what storms we face, as long as it is you and me, I know everything will be wonderful.',
      rotation: 4
    },
    {
      id: 7,
      src: '/assets/images/photo7.jpg',
      caption: 'My Happy Place 🏡',
      msg: 'Home is not just a place anymore—it is wherever you are. In your embrace is my safest, sweetest haven.',
      rotation: -2.8
    },
    {
      id: 8,
      src: '/assets/images/photo8.jpg',
      caption: 'Another Beautiful Memory 💫',
      msg: 'Every second spent with you is a priceless treasure. Thank you for making my life so vivid and full of joy.',
      rotation: 2.2
    },
    {
      id: 9,
      src: '/assets/images/photo9.jpg',
      caption: 'Always Us 🔐',
      msg: 'Through all the laughter, the silly jokes, and quiet late nights—it will always be us, hand in hand and heart to heart.',
      rotation: -3.5
    },
    {
      id: 10,
      src: '/assets/images/photo10.jpg',
      caption: 'Forever Begins Here 💍',
      msg: 'I fell in love with all of your cute quirks and your gentle soul. I choose you today, tomorrow, and for all the days to come.',
      rotation: 1.8
    },
    {
      id: 11,
      src: '/assets/images/photo11.jpg',
      caption: 'A Day to Remember 💌',
      msg: 'Looking at this picture still gives me butterflies. You have a special way of making ordinary days feel like fairy tales.',
      rotation: -2.5
    },
    {
      id: 12,
      src: '/assets/images/photo12.jpg',
      caption: 'My Heart is Yours 💖',
      msg: 'You have my whole heart in your hands, and there is no one else in this entire world I would ever trust more with it.',
      rotation: 3.2
    },
    {
      id: 13,
      src: '/assets/images/photo13.jpg',
      caption: 'A Beautiful Journey Together 🌟',
      msg: 'Every step of this journey with you is sweeter than the last. I cannot wait to make thousands more memories with you.',
      rotation: -1.2
    },
    {
      id: 14,
      src: '/assets/images/photo14.jpg',
      caption: 'You Make Me Smile 😊',
      msg: 'Just the thought of your voice and your contagious laugh can instantly turn any gloomy day into pure sunshine.',
      rotation: 2.7
    },
    {
      id: 15,
      src: '/assets/images/photo15.jpg',
      caption: 'Our Love Story 📖',
      msg: 'Every love story is special, but ours is forever my favorite masterpiece. And the best chapters are still waiting to be written.',
      rotation: -3.8
    },
    {
      id: 16,
      src: '/assets/images/photo16.jpg',
      caption: 'A Day Full of Laughter 🎂',
      msg: 'Pure, effortless joy. You make my soul laugh like nobody else can. Wishing you the happiest birthday full of endless love!',
      rotation: 1.5
    }
  ];

  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setActivePhotoIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const showNext = useCallback(() => {
    setActivePhotoIndex((prev) => (prev + 1) % memoriesList.length);
  }, [memoriesList.length]);

  const showPrev = useCallback(() => {
    setActivePhotoIndex((prev) => (prev - 1 + memoriesList.length) % memoriesList.length);
  }, [memoriesList.length]);

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      showNext();
    } else if (distance < -45) {
      showPrev();
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, closeLightbox, showNext, showPrev]);

  return (
    <section className="section-container memories-section" id="memories">
      <div className="section-header">
        <span className="section-tag">
          <Camera size={14} style={{ display: 'inline', marginRight: 6 }} />
          Cherished Moments
        </span>
        <h2 className="section-title">Our Beautiful Memories 📸</h2>
        <p className="section-subtitle">
          Every photo holds a feeling, a laugh, and a heartbeat we shared together. Click any photo to see our special moment.
        </p>
      </div>

      <div className="polaroid-grid">
        {memoriesList.map((photo, index) => (
          <div
            key={photo.id}
            className="polaroid-card"
            style={{ '--rotate-deg': `${photo.rotation}deg` }}
            onClick={() => openLightbox(index)}
          >
            <div className="polaroid-pin">
              <Heart size={14} fill="#a855f7" color="#ffffff" />
            </div>
            <div className="polaroid-image-frame">
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="polaroid-img"
              />
            </div>
            <div className="polaroid-caption">
              <span>{photo.caption}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Interactive Lightbox & Memory Message Modal */}
      {activePhotoIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-card">
              <button
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close photo"
              >
                <X size={20} />
              </button>

              <div
                className="lightbox-image-wrapper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <button
                  className="lightbox-nav-btn prev-btn"
                  onClick={showPrev}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>

                <img
                  src={memoriesList[activePhotoIndex].src}
                  alt={memoriesList[activePhotoIndex].caption}
                  className="lightbox-image"
                />

                <button
                  className="lightbox-nav-btn next-btn"
                  onClick={showNext}
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="lightbox-details">
                <div className="lightbox-header-row">
                  <h3 className="lightbox-caption-title">
                    {memoriesList[activePhotoIndex].caption}
                  </h3>
                  <span className="lightbox-counter">
                    {activePhotoIndex + 1} / {memoriesList.length}
                  </span>
                </div>

                {memoriesList[activePhotoIndex].msg && (
                  <div className="lightbox-message-box">
                    <Heart size={16} className="lightbox-heart-icon" />
                    <p className="lightbox-message-text">
                      "{memoriesList[activePhotoIndex].msg}"
                    </p>
                  </div>
                )}

                <div className="lightbox-mobile-hint">
                  ‹ Swipe photo or tap arrows to browse ›
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
