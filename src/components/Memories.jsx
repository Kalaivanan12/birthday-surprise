import React, { useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import './Memories.css';

/**
 * Memories Component:
 * Polaroid-style photo gallery with varied tilts, romantic hover effects,
 * and a fullscreen interactive lightbox modal.
 */
export default function Memories() {
  // ==========================================
  // EDITABLE GALLERY PHOTOS & CAPTIONS
  // ==========================================
  const memoriesList = [
    { id: 1, src: '/assets/images/photo1.jpg', caption: 'Our First Memory ❤️', rotation: -3 },
    { id: 2, src: '/assets/images/photo2.jpg', caption: 'My Favorite Smile 🥹', rotation: 2.5 },
    { id: 3, src: '/assets/images/photo3.jpg', caption: 'That Beautiful Day ✨', rotation: -2 },
    { id: 4, src: '/assets/images/photo4.jpg', caption: 'Forever With You 💕', rotation: 3.5 },
    { id: 5, src: '/assets/images/photo5.jpg', caption: "A Moment I'll Never Forget", rotation: -1.5 },
    { id: 6, src: '/assets/images/photo6.jpg', caption: 'You & Me ❤️', rotation: 4 },
    { id: 7, src: '/assets/images/photo7.jpg', caption: 'My Happy Place', rotation: -2.8 },
    { id: 8, src: '/assets/images/photo8.jpg', caption: 'Another Beautiful Memory', rotation: 2.2 },
    { id: 9, src: '/assets/images/photo9.jpg', caption: 'Always Us', rotation: -3.5 },
    { id: 10, src: '/assets/images/photo10.jpg', caption: 'Forever Begins Here', rotation: 1.8 },
    { id: 11, src: '/assets/images/photo11.jpg', caption: 'A Day to Remember', rotation: -2.5 },
    { id: 12, src: '/assets/images/photo12.jpg', caption: 'My Heart is Yours', rotation: 3.2 },
    { id: 13, src: '/assets/images/photo13.jpg', caption: 'A Beautiful Journey Together', rotation: -1.2 },
    { id: 14, src: '/assets/images/photo14.jpg', caption: 'You Make Me Smile 😊', rotation: 2.7 },
    { id: 15, src: '/assets/images/photo15.jpg', caption: 'Our Love Story 📖', rotation: -3.8 },
    { id: 16, src: '/assets/images/photo16.jpg', caption: 'A Day Full of Laughter', rotation: 1.5 }
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
          Every photo holds a feeling, a laugh, and a heartbeat we shared together.
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

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close photo"
            >
              <X size={26} />
            </button>

            <button
              className="lightbox-nav-btn prev-btn"
              onClick={showPrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="lightbox-image-container">
              <img
                src={memoriesList[activePhotoIndex].src}
                alt={memoriesList[activePhotoIndex].caption}
                className="lightbox-image"
              />
              <div className="lightbox-caption-bar">
                <span className="lightbox-caption-text">
                  {memoriesList[activePhotoIndex].caption}
                </span>
                <span className="lightbox-counter">
                  {activePhotoIndex + 1} / {memoriesList.length}
                </span>
              </div>
            </div>

            <button
              className="lightbox-nav-btn next-btn"
              onClick={showNext}
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
