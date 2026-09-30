import React, { useEffect, useRef } from 'react';
import { Clock, Heart, Sparkles, Compass, Smile, Flame, Cake, Infinity as InfinityIcon } from 'lucide-react';
import './Timeline.css';

/**
 * Timeline Component:
 * Interactive milestone timeline with staggered reveal animations
 * powered by JavaScript IntersectionObserver.
 */
export default function Timeline() {
  // ==========================================
  // EDITABLE TIMELINE ITEMS
  // ==========================================
  const timelineMilestones = [
    {
      id: 1,
      title: 'Where It All Started',
      date: 'Chapter One',
      description: 'The universe aligned the stars when our paths crossed. A simple greeting turned into the best chapter of my life.',
      icon: Sparkles
    },
    {
      id: 2,
      title: 'Our First Memory',
      date: 'The First Spark',
      description: 'The nervous butterflies, the endless conversations, and the warmth that made me never want that day to end.',
      icon: Heart
    },
    {
      id: 3,
      title: 'The Day You Made Me Smile',
      date: 'Pure Happiness',
      description: 'You did something so uniquely you, and right then I knew my heart would forever belong in your hands.',
      icon: Smile
    },
    {
      id: 4,
      title: 'Our Favorite Adventure',
      date: 'Exploring Hand-in-Hand',
      description: 'No matter where we travel or what we do, every destination is magical as long as I am standing next to you.',
      icon: Compass
    },
    {
      id: 5,
      title: 'Today — Your Birthday 🎂',
      date: 'A Day To Celebrate You',
      description: 'Celebrating the birth of the most genuine, radiant, and lovable human being. Thank you for existing.',
      icon: Cake
    },
    {
      id: 6,
      title: 'Our Future ❤️',
      date: 'Forever & Beyond',
      description: 'Countless more sunrises, late-night talks, tight hugs, and dreams coming true together.',
      icon: InfinityIcon
    }
  ];

  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-visible');
          }
        });
      },
      { threshold: 0.25 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-container timeline-section" id="timeline">
      <div className="section-header">
        <span className="section-tag">
          <Clock size={14} style={{ display: 'inline', marginRight: 6 }} />
          Our Journey
        </span>
        <h2 className="section-title">Little Moments, Big Memories ❤️</h2>
        <p className="section-subtitle">
          Every second with you is a treasure etched into my soul.
        </p>
      </div>

      <div className="timeline-container">
        <div className="timeline-center-line"></div>

        {timelineMilestones.map((item, index) => {
          const IconComponent = item.icon;
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`timeline-item ${isEven ? 'timeline-left' : 'timeline-right'}`}
            >
              <div className="timeline-node">
                <div className="node-glow"></div>
                <div className="node-circle">
                  <IconComponent size={20} color="#c084fc" />
                </div>
              </div>

              <div className="timeline-card glass-card">
                <div className="timeline-date-badge">{item.date}</div>
                <h3 className="timeline-item-title">{item.title}</h3>
                <p className="timeline-item-desc">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
