import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Github, 
  Linkedin, 
  Shield, 
  GraduationCap, 
  BookOpen, 
  Cloud, 
  Award, 
  Layers,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { sortedPlatforms } from '../../data/platforms';
import { PlatformStat } from '../../types';
import { usePlatformStats, useAllPlatformStats } from '../../utils/usePlatformStats';
import { 
  staggerContainer, 
  staggerItem,
  fadeInUp,
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
// PLATFORM TILE - Individual platform card with flip effect
// ─────────────────────────────────────────────────────────────────────────────

interface PlatformTileProps {
  platform: PlatformStat;
  prefersReducedMotion: boolean;
}

const PlatformTile: React.FC<PlatformTileProps> = ({ platform, prefersReducedMotion }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const stats = useAllPlatformStats(platform);
  
  const Icon = getIconComponent(platform.icon);
  const hasLiveData = stats.some(s => s.source === 'api' && s.isLive);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(platform.profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={staggerItem}
      className="relative h-48 perspective-1000"
      onMouseEnter={() => !prefersReducedMotion && setIsFlipped(true)}
      onMouseLeave={() => !prefersReducedMotion && setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.9, 0.2, 1] }}
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 w-full h-full card-glass p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-start justify-between">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${platform.color}20` }}
            >
              <Icon className="w-6 h-6" style={{ color: platform.color }} />
            </div>
            
            {/* Live indicator for GitHub */}
            {hasLiveData && (
              <span className="live-pulse relative flex items-center gap-1 text-xs text-success-500">
                <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                Live
              </span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-1">
              {platform.displayName}
            </h3>
            <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mb-2">
              @{platform.username}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-2">
              {stats.slice(0, 2).map((stat, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs rounded-md bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary"
                >
                  {stat.loading ? '...' : stat.value} {platform.stats[index]?.label}
                </span>
              ))}
            </div>
          </div>

          {/* TryHackMe Badge */}
          {platform.badgeImageUrl && (
            <img 
              src={platform.badgeImageUrl}
              alt={`${platform.displayName} badge`}
              className="absolute bottom-4 right-4 w-16 h-16 object-contain opacity-50"
              loading="lazy"
            />
          )}
        </div>

        {/* Back Side - Actions */}
        <div 
          className="absolute inset-0 w-full h-full card-glass p-6 flex flex-col justify-center items-center gap-3"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h4 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
            Quick Actions
          </h4>
          
          <a
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-premium py-2 text-sm"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <ExternalLink size={16} />
              View Profile
            </span>
          </a>
          
          <button
            onClick={handleCopyLink}
            className="w-full btn-secondary py-2 text-sm"
          >
            <span className="flex items-center justify-center gap-2">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>
        </div>
      </motion.div>
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
