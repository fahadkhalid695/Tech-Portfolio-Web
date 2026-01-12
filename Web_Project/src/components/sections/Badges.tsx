import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Pause, Play } from 'lucide-react';
import { sortedBadges } from '../../data/badges';
import { Badge } from '../../types';
import { staggerContainer, staggerItem, useReducedMotion } from '../../utils/animations';

// ═══════════════════════════════════════════════════════════════════════════
// BADGES SECTION - Auto-scrolling marquee with gesture support
// Features: Infinite scroll, pause on hover, trackpad/touch gestures
// ═══════════════════════════════════════════════════════════════════════════

const SCROLL_SPEED = 35; // pixels per second (slightly slower for larger cards)
const BADGE_WIDTH = 280; // badge card width + gap (increased for better visibility)

const BadgesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);

  // Duplicate badges for seamless infinite scroll (3x for smooth loop)
  const duplicatedBadges = [...sortedBadges, ...sortedBadges, ...sortedBadges];

  return (
    <section
      id="badges"
      className="py-20 lg:py-32 section-primary relative overflow-hidden"
      aria-label="Digital Badges"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1)}
          className="text-center mb-12"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-500 text-sm font-medium mb-4"
          >
            <Award size={14} className="inline mr-2" />
            Digital Credentials
          </motion.span>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Badges & <span className="gradient-text">Achievements</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            Digital badges earned from industry-leading platforms, showcasing verified skills and accomplishments.
          </motion.p>
        </motion.div>

        {/* Pause/Play Control */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsUserPaused(!isUserPaused)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-500 transition-colors text-sm"
            aria-label={isUserPaused ? 'Play animation' : 'Pause animation'}
          >
            {isUserPaused ? <Play size={16} /> : <Pause size={16} />}
            {isUserPaused ? 'Play' : 'Pause'} Animation
          </button>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Masks for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-light-bg dark:from-dark-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-light-bg dark:from-dark-bg to-transparent z-10 pointer-events-none" />

          {/* Single Row - Scrolls Left */}
          <MarqueeTrack
            badges={duplicatedBadges}
            isPaused={isPaused || isUserPaused || prefersReducedMotion}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
            direction="left"
          />
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {[
            { value: sortedBadges.length, label: 'Total Badges', color: 'text-yellow-500' },
            { value: new Set(sortedBadges.map(b => b.issuer)).size, label: 'Issuers', color: 'text-accent-500' },
            { value: new Set(sortedBadges.flatMap(b => b.skills || [])).size, label: 'Skills Verified', color: 'text-purple-400' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Gesture hint */}
        <p className="text-center mt-6 text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
          💡 Hover to pause • Drag or scroll to browse • Click badge to verify
        </p>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MARQUEE TRACK - Infinite scrolling container with gesture support
// ─────────────────────────────────────────────────────────────────────────────

interface MarqueeTrackProps {
  badges: Badge[];
  isPaused: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  direction: 'left' | 'right';
  className?: string;
}

const MarqueeTrack: React.FC<MarqueeTrackProps> = ({
  badges,
  isPaused,
  onHoverStart,
  onHoverEnd,
  direction,
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);

  // Calculate total width for seamless loop
  const totalWidth = badges.length * BADGE_WIDTH;

  // Auto-scroll animation using requestAnimationFrame
  useEffect(() => {
    if (isPaused || isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const movement = SCROLL_SPEED * deltaTime * (direction === 'left' ? 1 : -1);
      scrollPositionRef.current += movement;

      // Reset position for seamless loop
      const oneSetWidth = totalWidth / 3;
      if (direction === 'left' && scrollPositionRef.current >= oneSetWidth) {
        scrollPositionRef.current -= oneSetWidth;
      } else if (direction === 'right' && scrollPositionRef.current <= -oneSetWidth) {
        scrollPositionRef.current += oneSetWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-scrollPositionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging, direction, totalWidth]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(scrollPositionRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const diff = startX - e.clientX;
    scrollPositionRef.current = scrollLeft + diff;
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-scrollPositionRef.current}px)`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setScrollLeft(scrollPositionRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = startX - e.touches[0].clientX;
    scrollPositionRef.current = scrollLeft + diff;
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-scrollPositionRef.current}px)`;
    }
  };

  // Wheel handler for trackpad horizontal scroll
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // If horizontal scroll (trackpad gesture)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      scrollPositionRef.current += e.deltaX * 0.5;
      
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-scrollPositionRef.current}px)`;
      }
    }
  }, []);

  return (
    <div
      className={`overflow-hidden cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={() => {
        onHoverEnd();
        handleMouseUp();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
      onWheel={handleWheel}
    >
      <div
        ref={trackRef}
        className="flex gap-4"
        style={{ willChange: 'transform' }}
      >
        {badges.map((badge, index) => (
          <BadgeCard key={`${badge.id}-${index}`} badge={badge} />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// BADGE CARD - Individual badge display
// ─────────────────────────────────────────────────────────────────────────────

interface BadgeCardProps {
  badge: Badge;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Platform colors for theming
  const platformColors: Record<string, string> = {
    credly: '#FF6B00',
    google: '#4285F4',
    microsoft: '#00A4EF',
    aws: '#FF9900',
    cisco: '#049FD9',
    oracle: '#F80000',
    ibm: '#0F62FE',
    linkedin: '#0A66C2',
    coursera: '#0056D2',
    tryhackme: '#1C2538',
    other: '#00D4FF',
  };

  const color = platformColors[badge.platform] || platformColors.other;

  const handleClick = (e: React.MouseEvent) => {
    // Don't navigate if it's an iframe badge (let user interact with iframe)
    if (badge.embedUrl) return;
    
    e.stopPropagation(); // Prevent drag interference
    if (badge.verificationUrl) {
      window.open(badge.verificationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Check if this badge uses an iframe embed
  const hasEmbed = !!badge.embedUrl;

  return (
    <motion.div
      className={`flex-shrink-0 group ${hasEmbed ? 'w-80' : 'w-64'} ${!hasEmbed ? 'cursor-pointer' : ''}`}
      whileHover={hasEmbed ? {} : { y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div
        className="card-glass p-5 h-full flex flex-col items-center text-center transition-all duration-300 hover:border-accent-500/30"
        style={{
          boxShadow: `0 0 0 1px ${color}20`,
        }}
      >
        {/* Badge Display - iframe OR image */}
        {hasEmbed ? (
          // Iframe embed for Credly, TryHackMe, etc.
          <div className="w-full mb-4">
            <iframe
              src={badge.embedUrl}
              style={{ 
                border: 'none', 
                width: '100%', 
                height: badge.embedHeight || '200px',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
              title={badge.name}
              loading="lazy"
              allowFullScreen
            />
          </div>
        ) : (
          // Image display - LARGER SIZE
          <div className="relative w-36 h-36 mb-4 flex items-center justify-center">
            {badge.imageUrl && !imageError ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary animate-pulse" />
                  </div>
                )}
                <img
                  src={badge.imageUrl}
                  alt={badge.name}
                  className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-110 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  loading="lazy"
                  draggable={false}
                />
              </>
            ) : (
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${color}20` }}
              >
                <Award size={40} style={{ color }} />
              </div>
            )}

            {/* Verified indicator */}
            {badge.verificationUrl && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success-500 flex items-center justify-center shadow-lg">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Badge Info */}
        <h4 className="text-xs font-semibold text-light-text dark:text-dark-text mb-1 line-clamp-2 group-hover:text-accent-500 transition-colors leading-tight">
          {badge.name}
        </h4>
        <p className="text-[10px] text-light-text-tertiary dark:text-dark-text-tertiary mb-2 line-clamp-1">
          {badge.issuer}
        </p>

        {/* Category tag */}
        {badge.category && (
          <span 
            className="text-[9px] px-2 py-0.5 rounded-full mb-2"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {badge.category}
          </span>
        )}

        {/* View badge hint */}
        <div className="flex items-center gap-1 text-[10px] text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
          <ExternalLink size={10} />
          Verify
        </div>
      </div>
    </motion.div>
  );
};

export default BadgesSection;
