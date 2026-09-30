import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import './MusicPlayer.css';

/**
 * MusicPlayer Component:
 * Custom romantic audio player featuring playback controls, seekable progress bar,
 * volume slider, live equalizer animation, and floating docked mini-player mode.
 */
export default function MusicPlayer({ audioRef, isPlaying, setIsPlaying }) {
  // ==========================================
  // EDITABLE SONG DETAILS
  // ==========================================
  const songDetails = {
    title: 'Our Song ❤️',
    artist: 'For My Favorite Person',
    albumCover: '/assets/images/photo14.jpg'
  };

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const progressBarRef = useRef(null);

  // Set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [audioRef, volume]);

  // Sync audio progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0;
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, setIsPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio play prevented:", err);
      });
    }
  };

  const handleSeek = (e) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = Math.max(0, Math.min(duration, (clickX / width) * duration));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`music-player-wrapper ${isCollapsed ? 'player-collapsed' : ''}`}>
      <div className="music-player-card glass-card">
        {/* Collapse / Expand Toggle */}
        <button
          className="player-collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand Player' : 'Collapse Player'}
        >
          {isCollapsed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <div className="player-inner">
          {/* Album Cover with Spinning Vinyl Effect */}
          <div className={`album-art-container ${isPlaying ? 'art-spinning' : ''}`}>
            <img
              src={songDetails.albumCover}
              alt="Album Art"
              className="album-art-img"
            />
            <div className="album-center-dot"></div>
          </div>

          {/* Song Info & Equalizer */}
          <div className="player-info-section">
            <div className="player-meta-row">
              <div className="player-song-info">
                <h4 className="song-title">{songDetails.title}</h4>
                <p className="song-artist">{songDetails.artist}</p>
              </div>

              {/* Animated Audio Equalizer */}
              <div className={`audio-equalizer ${isPlaying ? 'equalizer-active' : ''}`}>
                <span className="eq-bar bar-1"></span>
                <span className="eq-bar bar-2"></span>
                <span className="eq-bar bar-3"></span>
                <span className="eq-bar bar-4"></span>
              </div>
            </div>

            {/* Progress Bar & Timers */}
            <div className="player-progress-container">
              <div
                className="progress-bar-track"
                ref={progressBarRef}
                onClick={handleSeek}
              >
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="progress-handle"></div>
                </div>
              </div>
              <div className="player-timers">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls & Volume */}
            <div className="player-controls-row">
              <button
                className="player-play-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} fill="#ffffff" /> : <Play size={20} fill="#ffffff" style={{ marginLeft: 2 }} />}
              </button>

              <div className="volume-control-wrapper">
                <button
                  className="volume-mute-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={18} color="#e9d5ff" />
                  ) : (
                    <Volume2 size={18} color="#e9d5ff" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  aria-label="Volume Slider"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
