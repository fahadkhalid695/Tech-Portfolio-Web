import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Github, Linkedin, Shield, GraduationCap,
  BookOpen, Cloud, Award, Layers, ExternalLink,
} from 'lucide-react';
import { sortedPlatforms } from '../../data/platforms';
import { PlatformStat } from '../../types';
import { useAllPlatformStats } from '../../utils/usePlatformStats';
import { useTheme } from '../../contexts/ThemeContext';
import { staggerItem, useReducedMotion } from '../../utils/animations';
import { CornerMark, SectionLabel } from '../ui/BlueprintPrimitives';

const PlatformsSection: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  // Reload LinkedIn badge script on theme change
  useEffect(() => {
    const existing = document.querySelector('script[src="https://platform.linkedin.com/badges/js/profile.js"]');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.querySelector('script[src="https://platform.linkedin.com/badges/js/profile.js"]')?.remove();
    };
  }, [theme]);

  return (
    <section
      id="platforms"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
      aria-label="Platform profiles"
    >
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" aria-hidden="true" />
      <CornerMark corner="tl" className="top-3 left-3" color="#7EC8E3" size={18} />
      <CornerMark corner="br" className="bottom-3 right-3" color="#7EC8E3" size={18} />

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={ref}>
          <SectionLabel sheet={9} name="Platforms" />
          <motion.h2
            className="font-display font-bold uppercase text-3xl sm:text-4xl mb-2"
            style={{ color: 'var(--color-text)', letterSpacing: '0.06em' }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35 }}
          >
            ONLINE{' '}
            <span style={{ color: 'var(--color-accent)' }}>PRESENCE</span>
          </motion.h2>
          <motion.p
            className="text-sm mb-10"
            style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.7 } : {}}
            transition={{ delay: 0.1 }}
          >
            Learning platforms, communities, and live profiles.
          </motion.p>
        </div>

        {/* Platform tiles grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {sortedPlatforms.map(platform => (
            <PlatformTile key={platform.id} platform={platform} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </motion.div>

        {/* Live badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div
            className="font-mono-data text-[9px] tracking-widest mb-6"
            style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
          >
            LIVE PROFILE BADGES
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            <GitHubLiveCard prefersReducedMotion={prefersReducedMotion} />

            {/* TryHackMe */}
            <div
              className="border p-5"
              style={{ borderColor: 'var(--color-border)', background: 'var(--glass-bg)' }}
            >
              <div
                className="font-mono-data text-[9px] tracking-widest mb-4 flex items-center gap-2"
                style={{ color: 'var(--color-text-secondary)', opacity: 0.55 }}
              >
                <Shield size={12} style={{ color: '#1C2538' }} />
                TRYHACKME PROFILE
              </div>
              <iframe
                src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3888371"
                style={{ border: 'none', width: '100%', maxWidth: 320, height: 180 }}
                title="TryHackMe Badge"
                loading="lazy"
              />
              <a
                href="https://tryhackme.com/p/fahadkhalid695"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 font-mono-data text-[9px] tracking-widest uppercase"
                style={{ color: 'var(--color-accent)', opacity: 0.8 }}
              >
                <ExternalLink size={10} /> VIEW PROFILE
              </a>
            </div>

            {/* LinkedIn */}
            <div
              className="border p-5"
              style={{ borderColor: 'var(--color-border)', background: 'var(--glass-bg)' }}
            >
              <div
                className="font-mono-data text-[9px] tracking-widest mb-4 flex items-center gap-2"
                style={{ color: 'var(--color-text-secondary)', opacity: 0.55 }}
              >
                <Linkedin size={12} style={{ color: '#0A66C2' }} />
                LINKEDIN PROFILE
              </div>
              <div
                key={`linkedin-${theme}`}
                className="badge-base LI-profile-badge"
                data-locale="en_US"
                data-size="medium"
                data-theme={theme === 'light' ? 'light' : 'dark'}
                data-type="VERTICAL"
                data-vanity="fahadkhalid695"
                data-version="v1"
              >
                <a
                  className="badge-base__link LI-simple-link"
                  href="https://pk.linkedin.com/in/fahadkhalid695?trk=profile-badge"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Fahad Khalid
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── PlatformTile ─────────────────────────────────────────────────────────── */

interface PlatformTileProps {
  platform: PlatformStat;
  prefersReducedMotion: boolean;
}

const PlatformTile: React.FC<PlatformTileProps> = ({ platform, prefersReducedMotion }) => {
  const stats = useAllPlatformStats(platform);
  const Icon = getIconComponent(platform.icon);

  return (
    <motion.a
      href={platform.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={staggerItem}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
      className="block group"
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--glass-bg)',
        padding: '1.25rem',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-accent)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${platform.color}18` }}
      >
        <Icon className="w-5 h-5" style={{ color: platform.color }} />
      </div>

      <h3
        className="font-display font-bold uppercase text-sm mb-0.5"
        style={{ color: 'var(--color-text)', letterSpacing: '0.04em' }}
      >
        {platform.displayName}
      </h3>
      <p
        className="font-mono-data text-[9px] tracking-widest mb-3"
        style={{ color: 'var(--color-text-secondary)', opacity: 0.55 }}
      >
        @{platform.username}
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-1.5">
        {stats.map((stat, i) => (
          <span
            key={i}
            className="font-mono-data text-[8px] px-2 py-0.5 border tracking-widest"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)', opacity: 0.75 }}
          >
            {stat.loading ? '…' : stat.value} {platform.stats[i]?.label}
          </span>
        ))}
      </div>

      <div
        className="flex items-center gap-1 mt-3 font-mono-data text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: 'var(--color-accent)' }}
      >
        <ExternalLink size={10} /> View
      </div>
    </motion.a>
  );
};

/* ── GitHub Live Card ─────────────────────────────────────────────────────── */

interface GitHubProfileApi {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

const GITHUB_USERNAME = 'fahadkhalid695';

const GitHubLiveCard: React.FC<{ prefersReducedMotion: boolean }> = ({ prefersReducedMotion }) => {
  const [profile, setProfile] = useState<GitHubProfileApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then(r => r.json())
      .then(d => { if (mounted) { setProfile(d); setLoading(false); } })
      .catch(() => { if (mounted) { setError(true); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  return (
    <a
      href={`https://github.com/${GITHUB_USERNAME}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      style={{ border: '1px solid var(--color-border)', background: 'var(--glass-bg)', padding: '1.25rem' }}
    >
      <div
        className="font-mono-data text-[9px] tracking-widest mb-4 flex items-center justify-between"
        style={{ color: 'var(--color-text-secondary)', opacity: 0.55 }}
      >
        <span className="flex items-center gap-2">
          <Github size={12} />
          GITHUB LIVE PROFILE
        </span>
        <span className="flex items-center gap-1" style={{ color: '#10B981' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
          LIVE
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <img
          src={profile?.avatar_url || `https://github.com/${GITHUB_USERNAME}.png`}
          alt="GitHub avatar"
          className="w-14 h-14 rounded-full"
          style={{ border: '1px solid var(--color-border)' }}
          loading="lazy"
        />
        <div>
          <p className="font-display font-bold text-sm" style={{ color: 'var(--color-text)' }}>
            {loading ? 'Loading…' : profile?.name || 'Fahad Khalid'}
          </p>
          <p className="font-mono-data text-[9px] tracking-widest" style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }}>
            @{GITHUB_USERNAME}
          </p>
          {profile?.bio && (
            <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>
              {profile.bio}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { l: 'REPOS',     v: profile?.public_repos },
          { l: 'FOLLOWERS', v: profile?.followers    },
          { l: 'FOLLOWING', v: profile?.following    },
        ].map(s => (
          <div
            key={s.l}
            className="text-center border p-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="font-display font-bold text-base" style={{ color: 'var(--color-accent)' }}>
              {loading ? '…' : s.v ?? '--'}
            </div>
            <div className="font-mono-data text-[7px] tracking-widest" style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="font-mono-data text-[8px]" style={{ color: '#E4572E', opacity: 0.7 }}>
          // LIVE STATS UNAVAILABLE — SHOWING FALLBACK
        </p>
      )}

      <div
        className="flex items-center gap-1 font-mono-data text-[9px] tracking-widest uppercase"
        style={{ color: 'var(--color-accent)', opacity: 0.8 }}
      >
        <ExternalLink size={10} /> VIEW FULL PROFILE
      </div>
    </a>
  );
};

/* ── Icon helper ──────────────────────────────────────────────────────────── */

const getIconComponent = (name: string) => {
  const map: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
    Github, Linkedin, Shield, GraduationCap, BookOpen, Cloud, Award, Layers,
  };
  return map[name] || Cloud;
};

export default PlatformsSection;
