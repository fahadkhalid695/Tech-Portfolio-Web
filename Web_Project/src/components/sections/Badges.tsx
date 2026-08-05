import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Pause, Play } from 'lucide-react';
import { sortedBadges, learningBadges, communityBadges } from '../../data/badges';
import { Badge } from '../../types';
import { useReducedMotion } from '../../utils/animations';
import { CornerMark, SectionLabel } from '../ui/BlueprintPrimitives';

const SCROLL_SPEED = 28;
const BADGE_WIDTH = 280;

const BadgesSection: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);

  const duplicatedLearning   = [...learningBadges,   ...learningBadges,   ...learningBadges];
  const duplicatedCommunity  = [...communityBadges,  ...communityBadges,  ...communityBadges];

  return (
    <section
      id="badges"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
      aria-label="Digital badges and achievements"
    >
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" aria-hidden="true" />
      <CornerMark corner="tl" className="top-3 left-3" color="#7EC8E3" size={18} />
      <CornerMark corner="tr" className="top-3 right-3" color="#7EC8E3" size={18} />

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={ref} className="mb-10">
          <SectionLabel sheet={8} name="Badges" />

          <motion.h2
            className="font-display font-bold uppercase text-3xl sm:text-4xl"
            style={{ color: 'var(--color-text)', letterSpacing: '0.06em' }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35 }}
          >
            DIGITAL{' '}
            <span style={{ color: 'var(--color-accent)' }}>CREDENTIALS</span>
          </motion.h2>

          <motion.p
            className="text-sm mt-2 max-w-xl"
            style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.7 } : {}}
            transition={{ delay: 0.1 }}
          >
            Verified badges from AWS, Google, Microsoft and more — drag, scroll or hover to browse.
          </motion.p>
        </div>

        {/* Play/Pause */}
        <div className="flex mb-6">
          <button
            onClick={() => setIsUserPaused(!isUserPaused)}
            className="flex items-center gap-2 font-mono-data text-[9px] px-3 py-1.5 border uppercase tracking-widest transition-colors"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
            aria-label={isUserPaused ? 'Play scroll animation' : 'Pause scroll animation'}
          >
            {isUserPaused ? <Play size={12} /> : <Pause size={12} />}
            {isUserPaused ? 'PLAY' : 'PAUSE'}
          </button>
        </div>

        {/* Marquee */}
        <div className="relative">
          {/* Fade masks — use CSS vars so they match both themes */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--color-bg-secondary), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--color-bg-secondary), transparent)' }}
          />

          <div
            className="font-mono-data text-[9px] tracking-widest mb-3 px-1"
            style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
          >
            LEARNING BADGES
          </div>
          <MarqueeTrack
            badges={duplicatedLearning}
            isPaused={isPaused || isUserPaused || prefersReducedMotion}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
            direction="left"
            speed={SCROLL_SPEED}
          />

          <div
            className="font-mono-data text-[9px] tracking-widest mt-8 mb-3 px-1"
            style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
          >
            COMMUNITY &amp; MEMBERSHIP
          </div>
          <MarqueeTrack
            badges={duplicatedCommunity}
            isPaused={isPaused || isUserPaused || prefersReducedMotion}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
            direction="right"
            speed={SCROLL_SPEED - 2}
          />
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-12 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {[
            { v: sortedBadges.length,                                              l: 'TOTAL'    },
            { v: learningBadges.length,                                            l: 'LEARNING' },
            { v: communityBadges.length,                                           l: 'COMMUNITY'},
            { v: new Set(sortedBadges.map(b => b.issuer)).size,                    l: 'ISSUERS'  },
            { v: new Set(sortedBadges.flatMap(b => b.skills || [])).size,          l: 'SKILLS'   },
          ].map(s => (
            <div
              key={s.l}
              className="border p-3 text-center"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="font-display font-bold text-lg" style={{ color: 'var(--color-accent)' }}>
                {s.v}
              </div>
              <div
                className="font-mono-data text-[8px] tracking-widest mt-0.5"
                style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>

        <p
          className="font-mono-data text-[9px] tracking-widest mt-4"
          style={{ color: 'var(--color-text-secondary)', opacity: 0.3 }}
        >
          // HOVER TO PAUSE · DRAG TO BROWSE · CLICK TO VERIFY
        </p>
      </div>
    </section>
  );
};

/* ── MarqueeTrack ─────────────────────────────────────────────────────────── */

interface MarqueeTrackProps {
  badges: Badge[];
  isPaused: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  direction: 'left' | 'right';
  speed: number;
}

const MarqueeTrack: React.FC<MarqueeTrackProps> = ({
  badges, isPaused, onHoverStart, onHoverEnd, direction, speed,
}) => {
  const trackRef  = useRef<HTMLDivElement>(null);
  const animRef   = useRef<number>();
  const posRef    = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX,     setStartX]     = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const totalWidth = badges.length * BADGE_WIDTH;

  useEffect(() => {
    posRef.current = direction === 'right' ? totalWidth / 3 : 0;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
  }, [direction, totalWidth]);

  useEffect(() => {
    if (isPaused || isDragging) { cancelAnimationFrame(animRef.current!); return; }
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000; last = now;
      posRef.current += speed * dt * (direction === 'left' ? 1 : -1);
      const one = totalWidth / 3;
      if (direction === 'left'  && posRef.current >=  one) posRef.current -= one;
      if (direction === 'right' && posRef.current <= -one) posRef.current += one;
      if (trackRef.current) trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current!);
  }, [isPaused, isDragging, direction, speed, totalWidth]);

  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setStartX(e.clientX); setScrollLeft(posRef.current); };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return; e.preventDefault();
    posRef.current = scrollLeft + (startX - e.clientX);
    if (trackRef.current) trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
  };
  const onMouseUp = () => setIsDragging(false);
  const onTouchStart = (e: React.TouchEvent) => { setIsDragging(true); setStartX(e.touches[0].clientX); setScrollLeft(posRef.current); };
  const onTouchMove  = (e: React.TouchEvent) => {
    if (!isDragging) return;
    posRef.current = scrollLeft + (startX - e.touches[0].clientX);
    if (trackRef.current) trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
  };
  const onWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      posRef.current += e.deltaX * 0.5;
      if (trackRef.current) trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
    }
  }, []);

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={onHoverStart}
      onMouseLeave={() => { onHoverEnd(); onMouseUp(); }}
      onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={() => setIsDragging(false)}
      onWheel={onWheel}
    >
      <div ref={trackRef} className="flex gap-4" style={{ willChange: 'transform' }}>
        {badges.map((badge, index) => <BadgeCard key={`${badge.id}-${index}`} badge={badge} />)}
      </div>
    </div>
  );
};

/* ── BadgeCard ────────────────────────────────────────────────────────────── */

const PLATFORM_COLORS: Record<string, string> = {
  credly: '#FF6B00', google: '#4285F4', microsoft: '#00A4EF',
  aws: '#FF9900', cisco: '#049FD9', oracle: '#F80000',
  ibm: '#0F62FE', linkedin: '#0A66C2', coursera: '#0056D2',
  tryhackme: '#1C2538', other: '#7EC8E3',
};

const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const color = PLATFORM_COLORS[badge.platform] || PLATFORM_COLORS.other;
  const hasEmbed = !!badge.embedUrl;

  const handleClick = (e: React.MouseEvent) => {
    if (hasEmbed) return;
    e.stopPropagation();
    if (badge.verificationUrl) window.open(badge.verificationUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className={`flex-shrink-0 group ${hasEmbed ? 'w-80' : 'w-64'} ${!hasEmbed ? 'cursor-pointer' : ''}`}
      whileHover={hasEmbed ? {} : { y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div
        className="card-glass p-5 h-full flex flex-col items-center text-center"
        style={{ boxShadow: `0 0 0 1px ${color}25` }}
      >
        {hasEmbed ? (
          <div className="w-full mb-4">
            <iframe
              src={badge.embedUrl} title={badge.name} loading="lazy" allowFullScreen
              style={{ border: 'none', width: '100%', height: badge.embedHeight || '200px', borderRadius: '6px' }}
            />
          </div>
        ) : (
          <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
            {badge.imageUrl && !imageError ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-full animate-pulse"
                      style={{ background: 'var(--color-bg-tertiary)' }}
                    />
                  </div>
                )}
                <img
                  src={badge.imageUrl} alt={badge.name} draggable={false} loading="lazy"
                  className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </>
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `${color}20` }}>
                <Award size={36} style={{ color }} />
              </div>
            )}
            {badge.verificationUrl && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#10B981' }}>
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        )}

        <h4
          className="text-xs font-semibold mb-1 line-clamp-2 leading-tight transition-colors"
          style={{ color: 'var(--color-text)' }}
        >
          {badge.name}
        </h4>
        <p className="text-[10px] mb-1 line-clamp-1" style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }}>
          {badge.issuer}
        </p>
        {badge.category && (
          <span className="font-mono-data text-[9px] px-2 py-0.5 mb-2" style={{ background: `${color}15`, color }}>
            {badge.category}
          </span>
        )}
        <div
          className="flex items-center gap-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity mt-auto"
          style={{ color: 'var(--color-accent)' }}
        >
          <ExternalLink size={10} /> Verify
        </div>
      </div>
    </motion.div>
  );
};

export default BadgesSection;
