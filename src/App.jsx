import React, { useState, useRef, useEffect } from 'react';
import Intro from './components/Intro';
import Hero from './components/Hero';
import LoveLetter from './components/LoveLetter';
import Memories from './components/Memories';
import Timeline from './components/Timeline';
import MusicPlayer from './components/MusicPlayer';
import Reasons from './components/Reasons';
import SecretSurprise from './components/SecretSurprise';
import FinalSection from './components/FinalSection';
import './App.css';

/**
 * Main App Component:
 * Coordinates the full romantic journey:
 * 1. Intro overlay with user interaction trigger
 * 2. Background audio management
 * 3. Ambient floating hearts system
 * 4. Cinematic sections (Hero, LoveLetter, Memories, Timeline, Reasons, SecretSurprise, FinalSection)
 * 5. Floating Music Player
 */
export default function App() {
  const [isSurpriseOpened, setIsSurpriseOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Triggered when lover clicks "Open Your Surprise 💝"
  const handleOpenSurprise = () => {
    setIsSurpriseOpened(true);

    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio autoplay blocked by browser:", err);
      });
    }
  };

  // Generate romantic floating hearts for the background
  const heartElements = Array.from({ length: 22 }).map((_, i) => {
    const left = Math.random() * 96; // 0% to 96%
    const delay = Math.random() * 8; // 0s to 8s
    const duration = Math.random() * 6 + 7; // 7s to 13s
    const size = Math.random() * 18 + 14; // 14px to 32px
    const heartSymbols = ['💜', '🤍', '✨', '💜', '💫', '🤍'];
    const symbol = heartSymbols[i % heartSymbols.length];

    return (
      <span
        key={i}
        className="floating-heart-item"
        style={{
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          fontSize: `${size}px`
        }}
      >
        {symbol}
      </span>
    );
  });

  return (
    <div className="app-root">
      {/* Hidden background audio element */}
      <audio ref={audioRef} src="/assets/song.mp3" preload="auto" loop />

      {/* Intro Opening Splash Screen */}
      {!isSurpriseOpened && (
        <Intro onOpenSurprise={handleOpenSurprise} />
      )}

      {/* Main Website - Revealed with smooth transition */}
      <main className={`main-content ${isSurpriseOpened ? 'content-revealed' : 'content-hidden'}`}>
        {/* Ambient floating hearts (starts when surprise is opened) */}
        {isSurpriseOpened && (
          <div className="floating-hearts-layer" aria-hidden="true">
            {heartElements}
          </div>
        )}

        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Love Letter Section */}
        <LoveLetter />

        {/* 3. Memories Polaroid Gallery */}
        <Memories />

        {/* 4. Timeline Section */}
        <Timeline />

        {/* 5. Reasons Why I Love You */}
        <Reasons />

        {/* 6. Secret Surprise Section */}
        <SecretSurprise />

        {/* 7. Dramatic Birthday Finale */}
        <FinalSection />

        {/* 8. Docked Floating Music Player */}
        <MusicPlayer
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </main>
    </div>
  );
}
