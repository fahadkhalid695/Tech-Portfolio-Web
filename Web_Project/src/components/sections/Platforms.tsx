import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as Icons from 'lucide-react';
import { platforms } from '../../data/platforms';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { use3DTilt } from '../../hooks/use3DTilt';

const Platforms: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const prefersReducedMotion = useReducedMotion();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.2, 0.9, 0.2, 1],
      },
    },
  };

  const copyToClipboard = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="platforms" className="section section-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <div className="section-title">
            <h2 className="gradient-text-premium">Platforms & Profiles</h2>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Connect with me across different platforms
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {platforms.map((platform) => {
              const IconComponent = Icons[platform.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              
              return (
                <PlatformCard
                  key={platform.id}
                  platform={platform}
                  IconComponent={IconComponent}
                  itemVariants={itemVariants}
                  onCopy={copyToClipboard}
                  isCopied={copiedId === platform.id}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface PlatformCardProps {
  platform: any;
  IconComponent: React.ComponentType<{ className?: string }>;
  itemVariants: any;
  onCopy: (url: string, id: number) => void;
  isCopied: boolean;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  IconComponent,
  itemVariants,
  onCopy,
  isCopied,
}) => {
  const tiltRef = use3DTilt({ max: 10, scale: 1.05 });
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="relative h-48"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={tiltRef}
        className={`relative w-full h-full transition-transform duration-500 cursor-pointer`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 card-incredible p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {platform.isLive && (
            <div className="absolute top-3 right-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500"></span>
              </span>
            </div>
          )}

          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${platform.color}15` }}
          >
            <IconComponent className="w-8 h-8" style={{ color: platform.color }} />
          </div>

          <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-1">
            {platform.name}
          </h3>
          <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mb-3">
            @{platform.username}
          </p>

          {platform.stat && (
            <div className="mt-auto">
              <div className="text-2xl font-bold text-accent-500">
                {platform.stat.value}
              </div>
              <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {platform.stat.label}
              </div>
            </div>
          )}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 card-incredible p-6 flex flex-col items-center justify-center gap-3"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-sm text-center text-light-text-secondary dark:text-dark-text-secondary mb-2">
            {platform.description}
          </p>

          <a
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Icons.ExternalLink className="w-4 h-4" />
            View Profile
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(platform.profileUrl, platform.id);
            }}
            className="w-full px-4 py-2 bg-light-bg-tertiary dark:bg-dark-bg-tertiary hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary text-light-text dark:text-dark-text rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isCopied ? (
              <>
                <Icons.Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Icons.Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Platforms;
