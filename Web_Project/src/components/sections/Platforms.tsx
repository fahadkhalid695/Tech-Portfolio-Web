import React, { useEffect } from 'react';
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
  Layers,
  ExternalLink
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
// Display platform tiles with live stats and embedded badges
// NO HOVER OVERLAYS - Clean simple cards that link directly
// ═══════════════════════════════════════════════════════════════════════════

const PlatformsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const prefersReducedMotion = useReducedMotion();

  // Load LinkedIn badge script for the embedded profile card.
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://platform.linkedin.com/badges/js/profile.js"]');
      if (existingScript) existingScript.remove();
    };
  }, []);

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

        {/* Featured Live Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-xl font-semibold text-light-text dark:text-dark-text text-center mb-8">
            Live Profile Badges
          </h3>
          
          <div className="flex flex-wrap justify-center gap-8 items-start">
            {/* GitHub Live Stats */}
            <motion.a 
              href="https://github.com/fahadkhalid695"
              target="_blank"
              rel="noopener noreferrer"
              className="card-glass p-6 rounded-xl text-center block"
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
            >
              <h4 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-4 flex items-center justify-center gap-2">
                <Github size={16} style={{ color: '#181717' }} />
                GitHub Stats
              </h4>
              <img
                src="https://github-readme-stats.vercel.app/api?username=fahadkhalid695&show_icons=true&theme=tokyonight&hide_border=true&count_private=true&include_all_commits=true&cache_seconds=86400"
                alt="GitHub Stats"
                className="h-[165px] w-auto rounded-lg"
                loading="lazy"
              />
              <div className="inline-flex items-center gap-1 mt-4 text-sm text-accent-500 hover:underline">
                <ExternalLink size={14} />
                View Full Profile
              </div>
            </motion.a>

            {/* GitHub Streak */}
            <motion.a 
              href="https://github.com/fahadkhalid695"
              target="_blank"
              rel="noopener noreferrer"
              className="card-glass p-6 rounded-xl text-center block"
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
            >
              <h4 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-4 flex items-center justify-center gap-2">
                <Github size={16} style={{ color: '#181717' }} />
                GitHub Streak
              </h4>
              <img
                src="https://streak-stats.demolab.com/?user=fahadkhalid695&theme=tokyonight&hide_border=true"
                alt="GitHub Streak"
                className="h-[165px] w-auto rounded-lg"
                loading="lazy"
              />
              <div className="inline-flex items-center gap-1 mt-4 text-sm text-accent-500 hover:underline">
                <ExternalLink size={14} />
                View Full Profile
              </div>
            </motion.a>

            {/* TryHackMe Live Badge */}
            <motion.div
              className="card-glass p-6 rounded-xl text-center"
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
            >
              <h4 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-4 flex items-center justify-center gap-2">
                <Shield size={16} style={{ color: '#1C2538' }} />
                TryHackMe Profile
              </h4>
              <iframe
                src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3888371"
                style={{ border: 'none', width: '320px', height: '180px', borderRadius: '8px' }}
                title="TryHackMe Badge"
                loading="lazy"
              />
              <a
                href="https://tryhackme.com/p/fahadkhalid695"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 text-sm text-accent-500 hover:underline"
              >
                <ExternalLink size={14} />
                View Full Profile
              </a>
            </motion.div>

            {/* LinkedIn Live Badge */}
            <motion.div
              className="card-glass p-6 rounded-xl text-center"
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
            >
              <h4 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-4 flex items-center justify-center gap-2">
                <Linkedin size={16} style={{ color: '#0A66C2' }} />
                LinkedIn Profile
              </h4>
              <div
                className="badge-base LI-profile-badge"
                data-locale="en_US"
                data-size="medium"
                data-theme="dark"
                data-type="VERTICAL"
                data-vanity="fahadkhalid695"
                data-version="v1"
              >
                <a
                  className="badge-base__link LI-simple-link"
                  href="https://pk.linkedin.com/in/fahadkhalid695?trk=profile-badge"
                >
                  Fahad Khalid
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM TILE - Simple card with NO hover overlay/popup
// Just a clean link card that takes you to the profile
// ─────────────────────────────────────────────────────────────────────────────

interface PlatformTileProps {
  platform: PlatformStat;
  prefersReducedMotion: boolean;
}

const PlatformTile: React.FC<PlatformTileProps> = ({ platform, prefersReducedMotion }) => {
  const stats = useAllPlatformStats(platform);
  
  const Icon = getIconComponent(platform.icon);
  const hasLiveData = stats.some(s => s.source === 'api' && s.isLive);

  return (
    <motion.a
      href={platform.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={staggerItem}
      whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="block card-glass p-5 hover:border-accent-500/30 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
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
      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-1 group-hover:text-accent-500 transition-colors">
        {platform.displayName}
      </h3>
      <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mb-3">
        @{platform.username}
      </p>
      
      {/* Stats */}
      <div className="flex flex-wrap gap-2">
        {stats.map((stat, index) => (
          <span 
            key={index}
            className="px-2 py-1 text-xs rounded-md bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary"
          >
            {stat.loading ? '...' : stat.value} {platform.stats[index]?.label}
          </span>
        ))}
      </div>

      {/* View Profile hint on hover */}
      <div className="mt-4 flex items-center gap-1 text-xs text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink size={12} />
        View Profile
      </div>
    </motion.a>
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
