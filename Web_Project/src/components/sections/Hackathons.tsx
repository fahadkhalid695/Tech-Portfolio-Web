import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Users, Trophy, Code, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { hackathons } from '../../data/hackathons';
import { Hackathon } from '../../types';
import {
  staggerContainer,
  staggerItem,
  useReducedMotion,
} from '../../utils/animations';

// ═══════════════════════════════════════════════════════════════════════════
// HACKATHONS SECTION - Horizontal scroll with result-based glows
// Features: wheel→sideways navigation, story reveals, keyboard accessible
// ═══════════════════════════════════════════════════════════════════════════

// Determine glow color based on position/result
const getResultGlow = (position: string): { class: string; color: string; label: string } => {
  const posLower = position.toLowerCase();
  
  if (posLower.includes('1st') || posLower.includes('winner') || posLower.includes('first') || posLower.includes('gold')) {
    return { class: 'card-glow-gold', color: '#FFD700', label: '🥇 Winner' };
  }
  if (posLower.includes('2nd') || posLower.includes('second') || posLower.includes('silver') || posLower.includes('runner')) {
    return { class: 'card-glow-cyan', color: '#00D4FF', label: '🥈 Runner-up' };
  }
  if (posLower.includes('3rd') || posLower.includes('third') || posLower.includes('bronze')) {
    return { class: 'card-glow-cyan', color: '#00D4FF', label: '🥉 3rd Place' };
  }
  if (posLower.includes('top') || posLower.includes('finalist') || posLower.includes('place')) {
    return { class: 'card-glow-cyan', color: '#00D4FF', label: '🎯 Top Performer' };
  }
  return { class: 'card-glow-white', color: '#FFFFFF', label: '🏁 Participant' };
};

const Hackathons: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const prefersReducedMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Scroll navigation
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Wheel to horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    // Only horizontal scroll if container is hovered and has overflow
    const container = scrollContainerRef.current;
    const isScrollable = container.scrollWidth > container.clientWidth;
    
    if (isScrollable && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  };

  // Stats
  const wins = hackathons.filter(
    (h) =>
      h.position.toLowerCase().includes('1st') ||
      h.position.toLowerCase().includes('winner') ||
      h.position.toLowerCase().includes('first')
  ).length;
  
  const topPlacements = hackathons.filter(
    (h) =>
      h.position.toLowerCase().includes('top') ||
      h.position.toLowerCase().includes('2nd') ||
      h.position.toLowerCase().includes('3rd') ||
      h.position.toLowerCase().includes('place')
  ).length;

  return (
    <section
      id="hackathons"
      className="py-20 lg:py-32 section-primary relative overflow-hidden"
      aria-label="Hackathons and competitions"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
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
            className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4"
          >
            <Zap size={14} className="inline mr-2" />
            Competitions
          </motion.span>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Hackathons & <span className="gradient-text">Challenges</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            Collaborative innovation through competitive programming and rapid prototyping.
          </motion.p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary hover:bg-accent-500/20 text-light-text dark:text-dark-text transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary hover:bg-accent-500/20 text-light-text dark:text-dark-text transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          className="flex flex-row gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {hackathons.map((hackathon, index) => (
            <HackathonCard
              key={hackathon.id}
              hackathon={hackathon}
              index={index}
              isHovered={hoveredCard === hackathon.id}
              onHover={() => setHoveredCard(hackathon.id)}
              onLeave={() => setHoveredCard(null)}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-4 text-sm text-light-text-tertiary dark:text-dark-text-tertiary"
        >
          ← Scroll or use arrow buttons to explore →
        </motion.p>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1, 0.8)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: hackathons.length, label: 'Participated', color: 'text-accent-500' },
            { value: wins, label: 'Wins', color: 'text-yellow-500' },
            { value: topPlacements, label: 'Top Placements', color: 'text-purple-400' },
            {
              value: new Set(hackathons.flatMap((h) => h.technologies)).size,
              label: 'Technologies',
              color: 'text-success-500',
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="card-glass text-center p-4 sm:p-6"
            >
              <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-xs sm:text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// HACKATHON CARD - With result-based glow and story reveal
// ═══════════════════════════════════════════════════════════════════════════

interface HackathonCardProps {
  hackathon: Hackathon;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  prefersReducedMotion: boolean;
}

const HackathonCard: React.FC<HackathonCardProps> = ({
  hackathon,
  index,
  isHovered,
  onHover,
  onLeave,
  prefersReducedMotion,
}) => {
  const resultGlow = getResultGlow(hackathon.position);

  return (
    <motion.div
      className={`card-incredible ${resultGlow.class} min-w-[340px] max-w-[340px] flex-shrink-0 scroll-snap-align-start group`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
      style={{
        boxShadow: isHovered ? `0 0 40px ${resultGlow.color}40` : undefined,
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-t-xl">
        <motion.img
          src={hackathon.image}
          alt={hackathon.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/30 to-transparent" />

        {/* Result Badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
          style={{
            background: `linear-gradient(135deg, ${resultGlow.color}40, ${resultGlow.color}20)`,
            border: `1px solid ${resultGlow.color}60`,
            color: resultGlow.color,
          }}
        >
          <Trophy size={12} />
          {hackathon.position}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2 group-hover:text-accent-500 transition-colors line-clamp-1">
          {hackathon.name}
        </h3>

        {/* Meta info */}
        <div className="flex flex-wrap gap-2 mb-3 text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-accent-500" />
            {hackathon.date}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-success-500" />
            {hackathon.location}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-purple-400" />
            Team of {hackathon.teamSize}
          </span>
        </div>

        {/* Project */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-sm font-medium text-accent-500 mb-1">
            <Code size={14} />
            {hackathon.project}
          </div>
          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
            {hackathon.description}
          </p>
        </div>

        {/* Tech Stack - reveals on hover */}
        <motion.div
          className="flex flex-wrap gap-1 mt-auto"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {hackathon.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-full bg-accent-500/10 text-accent-500 font-medium"
            >
              {tech}
            </span>
          ))}
          {hackathon.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-tertiary dark:text-dark-text-tertiary">
              +{hackathon.technologies.length - 4}
            </span>
          )}
        </motion.div>

        {/* Prize footer */}
        <div className="mt-4 pt-3 border-t border-light-bg-tertiary dark:border-dark-bg-tertiary">
          <div className="flex items-center justify-between">
            <span className="text-xs text-success-500 font-medium">{hackathon.prize}</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: `${resultGlow.color}20`,
                color: resultGlow.color,
              }}
            >
              {resultGlow.label}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hackathons;