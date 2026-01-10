import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Users, Trophy, Code, ExternalLink, ChevronLeft, ChevronRight, Zap, Target, Award } from 'lucide-react';
import { hackathons } from '../../data/hackathons';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Hackathons: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const prefersReducedMotion = useReducedMotion();

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getResultColor = (position: string) => {
    const pos = position.toLowerCase();
    if (pos.includes('1st') || pos.includes('winner') || pos.includes('first')) {
      return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-400', glow: 'shadow-yellow-500/50' };
    }
    if (pos.includes('2nd') || pos.includes('finalist') || pos.includes('top')) {
      return { bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', text: 'text-cyan-400', glow: 'shadow-cyan-500/50' };
    }
    return { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-400', glow: 'shadow-purple-500/50' };
  };

  return (
    <section id="hackathons" className="section section-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-accent-500" />
            <span className="text-sm font-medium text-accent-500">Pressure. Teamwork. Impact.</span>
          </motion.div>

          <h2 className="gradient-text-premium mb-4">Hackathons & Competitions</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Fast-paced innovation through competitive programming and rapid prototyping
          </p>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative">
          {/* Navigation arrows */}
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-light-bg dark:bg-dark-bg border border-light-bg-tertiary dark:border-dark-bg-tertiary rounded-full flex items-center justify-center shadow-xl hover:bg-accent-500 hover:border-accent-500 transition-all duration-300 group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-light-text dark:text-dark-text group-hover:text-white" />
            </motion.button>
          )}

          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-light-bg dark:bg-dark-bg border border-light-bg-tertiary dark:border-dark-bg-tertiary rounded-full flex items-center justify-center shadow-xl hover:bg-accent-500 hover:border-accent-500 transition-all duration-300 group"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-light-text dark:text-dark-text group-hover:text-white" />
            </motion.button>
          )}

          {/* Cards container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {hackathons.map((hackathon, index) => (
              <HackathonCard
                key={hackathon.id}
                hackathon={hackathon}
                index={index}
                inView={inView}
                isFlipped={flippedCards.has(hackathon.id)}
                onFlip={() => toggleFlip(hackathon.id)}
                getResultColor={getResultColor}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard
            icon={<Trophy className="w-6 h-6" />}
            value={hackathons.length}
            label="Hackathons"
            color="text-accent-500"
          />
          <StatCard
            icon={<Award className="w-6 h-6" />}
            value={hackathons.filter(h => h.position.toLowerCase().includes('1st') || h.position.toLowerCase().includes('winner')).length}
            label="Wins"
            color="text-yellow-500"
          />
          <StatCard
            icon={<Code className="w-6 h-6" />}
            value={new Set(hackathons.flatMap(h => h.technologies)).size}
            label="Technologies"
            color="text-purple-500"
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            value={hackathons.reduce((sum, h) => sum + h.teamSize, 0)}
            label="Collaborators"
            color="text-cyan-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

interface HackathonCardProps {
  hackathon: any;
  index: number;
  inView: boolean;
  isFlipped: boolean;
  onFlip: () => void;
  getResultColor: (position: string) => any;
  prefersReducedMotion: boolean;
}

const HackathonCard: React.FC<HackathonCardProps> = ({
  hackathon,
  index,
  inView,
  isFlipped,
  onFlip,
  getResultColor,
  prefersReducedMotion,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const resultColors = getResultColor(hackathon.position);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1,
      }}
      className="flex-shrink-0 w-[380px] h-[520px] snap-center"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onFlip}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 card-incredible overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={hackathon.image}
              alt={hackathon.name}
              className="w-full h-full object-cover"
              animate={isHovered && !prefersReducedMotion ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />

            {/* Result badge */}
            <div className={`absolute top-4 right-4 px-3 py-1.5 ${resultColors.bg} ${resultColors.border} border backdrop-blur-sm rounded-full flex items-center gap-2`}>
              <Trophy className={`w-4 h-4 ${resultColors.text}`} />
              <span className={`text-xs font-bold ${resultColors.text}`}>{hackathon.position}</span>
            </div>

            {/* Duration badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-dark-bg/80 backdrop-blur-sm border border-accent-500/30 rounded-full flex items-center gap-2">
              <Zap className="w-3 h-3 text-accent-500" />
              <span className="text-xs font-medium text-accent-500">48h Sprint</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2 line-clamp-2">
              {hackathon.name}
            </h3>

            <div className="flex items-center gap-4 mb-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{hackathon.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Team of {hackathon.teamSize}</span>
              </div>
            </div>

            {/* Project name with role */}
            <div className="mb-4 p-3 bg-accent-500/5 border-l-4 border-accent-500 rounded">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-accent-500" />
                <span className="text-xs font-semibold text-accent-500 uppercase">Project</span>
              </div>
              <p className="text-sm font-bold text-light-text dark:text-dark-text">{hackathon.project}</p>
            </div>

            {/* Description - revealed on hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={isHovered ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 overflow-hidden"
            >
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-3">
                {hackathon.description}
              </p>
            </motion.div>

            {/* Tech stack - fades in on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-4"
            >
              {hackathon.technologies.slice(0, 4).map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text dark:text-dark-text rounded-full"
                >
                  {tech}
                </span>
              ))}
              {hackathon.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs bg-accent-500/10 text-accent-500 rounded-full">
                  +{hackathon.technologies.length - 4}
                </span>
              )}
            </motion.div>

            {/* CTA - slides from bottom on hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-auto"
            >
              <div className="text-xs text-center text-accent-500 font-medium">
                Click to see lessons learned →
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back of card - Lessons Learned */}
        <div
          className="absolute inset-0 card-incredible p-6 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-accent-500">Lessons Learned</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFlip();
              }}
              className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-500"
            >
              ← Back
            </button>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto">
            <div>
              <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Challenges Faced
              </h4>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Time constraints, technical complexity, and team coordination under pressure.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-500" />
                What I Learned
              </h4>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Rapid prototyping, effective collaboration, and delivering under tight deadlines.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-500" />
                Impact
              </h4>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {hackathon.prize}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-light-bg-tertiary dark:border-dark-bg-tertiary">
            <div className="flex flex-wrap gap-2">
              {hackathon.technologies.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-accent-500/10 text-accent-500 rounded-full border border-accent-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color }) => {
  return (
    <div className="card-incredible p-6 text-center hover:scale-105 transition-transform duration-300">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-current/10 mb-3 ${color}`}>
        {icon}
      </div>
      <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{label}</div>
    </div>
  );
};

export default Hackathons;
