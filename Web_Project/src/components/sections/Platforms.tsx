import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Github, 
  Linkedin, 
  Shield, 
  GraduationCap, 
  BookOpen, 
  Cloud, 
  Award, 
  Layers
} from 'lucide-react';
import { sortedPlatforms } from '../../data/platforms';
import { PlatformStat } from '../../types';
import { useAllPlatformStats } from '../../utils/usePlatformStats';
import { 
  staggerContainer, 
  staggerItem,
  useReducedMotion 
} from '../../utils/animations';

// ═══════════════════════════════════════════════════════════════════════════
// PLATFORMS SECTION
// Display platform tiles with live stats (GitHub API) and static badges
// ═══════════════════════════════════════════════════════════════════════════

const PlatformsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="platforms" 
      className="py-20 lg:py-32 section-secondary relative overflow-hidden"
      aria-label="Platform Profiles"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer(0.1)}
          className="text-center mb-16"
        >
          <motion.span 
            variants={staggerItem}
            className="inline-block px-4 py-2 rounded-full bg-accent-500/10 text-accent-500 text-sm font-medium mb-4"
          >
            Online Presence
          </motion.span>
          
          <motion.h2 
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            My <span className="gradient-text">Platforms</span>
          </motion.h2>
          
          <motion.p 
            variants={staggerItem}
            className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            Connect with me across different platforms and check out my learning journey.
          </motion.p>
        </motion.div>

        {/* Platform Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sortedPlatforms.map((platform) => (
            <PlatformTile 
              key={platform.id} 
              platform={platform}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM TILE - Individual platform card
// ─────────────────────────────────────────────────────────────────────────────

interface PlatformTileProps {
  platform: PlatformStat;
  prefersReducedMotion: boolean;
}

const PlatformTile: React.FC<PlatformTileProps> = ({ platform }) => {
  const stats = useAllPlatformStats(platform);
  
  const Icon = getIconComponent(platform.icon);
  const hasLiveData = stats.some(s => s.source === 'api' && s.isLive);

  return (
    <motion.div
      variants={staggerItem}
      className="relative group"
    >
      <a
        href={platform.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block card-glass p-5 h-full hover:border-accent-500/30 transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${platform.color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color: platform.color }} />
          </div>
            
          {/* Live indicator for GitHub */}
          {hasLiveData && (
            <span className="flex items-center gap-1 text-xs text-success-500">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* Title & Username */}
        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-1">
          {platform.displayName}
        </h3>
        <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mb-3">
          @{platform.username}
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap gap-2 mb-3">
          {stats.map((stat, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs rounded-md bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary"
            >
              {stat.loading ? '...' : stat.value} {platform.stats[index]?.label}
            </span>
          ))}
        </div>

        {/* TryHackMe Badge */}
        {platform.badgeImageUrl && (
          <img 
            src={platform.badgeImageUrl}
            alt={`${platform.displayName} badge`}
            className="w-24 h-auto object-contain opacity-70 mt-2"
            loading="lazy"
          />
        )}
      </a>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Get icon component from string
// ─────────────────────────────────────────────────────────────────────────────

const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
    Github,
    Linkedin,
    Shield,
    GraduationCap,
    BookOpen,
    Cloud,
    Award,
    Layers,
  };
  
  return icons[iconName] || Cloud;
};

export default PlatformsSection;
