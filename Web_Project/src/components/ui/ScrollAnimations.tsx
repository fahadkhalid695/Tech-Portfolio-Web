/**
 * ScrollAnimations — ambient background orbs + scroll-reveal utility.
 *
 * Note: The scroll progress bar is rendered in App.tsx (ScrollProgress component).
 * This file no longer renders a duplicate.
 *
 * Exports:
 *   default  ScrollAnimations  — wrapper that adds fixed background orbs
 *   named    ScrollReveal      — reusable whileInView wrapper for sections
 *   named    StaggerReveal     — stagger container for children
 */

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';
import { useReducedMotion } from '../../utils/animations';

// ─── Ambient background orbs ─────────────────────────────────────────────────

interface ScrollAnimationsProps {
  children: React.ReactNode;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Fixed ambient orbs — omit animation entirely when reduced-motion */}
      {!prefersReducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          {/* Top-left — violet */}
          <motion.div
            className="absolute top-20 left-20 w-80 h-80 rounded-full opacity-[0.12]"
            style={{
              background: 'radial-gradient(circle, rgba(124, 92, 255, 0.35) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.18, 0.12] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Bottom-right — cyan */}
          <motion.div
            className="absolute bottom-20 right-20 w-72 h-72 rounded-full opacity-[0.10]"
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.10, 0.16, 0.10] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          {/* Center — signal green, very faint */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full opacity-[0.06]"
            style={{
              background: 'radial-gradient(circle, rgba(56, 242, 160, 0.3) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.1, 0.06] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          />
        </div>
      )}

      {children}
    </div>
  );
};

// ─── ScrollReveal — whileInView fade-up, triggered once ──────────────────────

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts after entering viewport */
  delay?: number;
  /** y offset to animate from (default 24px) */
  yOffset?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 24,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: yOffset }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 0.55,
        delay,
        ease: [0.2, 0.9, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// ─── StaggerReveal — stagger container for child elements ───────────────────

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay between each child in seconds (default 0.07) */
  stagger?: number;
  /** Initial delay before first child animates (default 0) */
  delay?: number;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  className = '',
  stagger = 0.07,
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer(prefersReducedMotion ? 0 : stagger, delay)}
    >
      {children}
    </motion.div>
  );
};

/** Use inside <StaggerReveal> for each child item */
export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div className={className} variants={staggerItem}>
    {children}
  </motion.div>
);

export default ScrollAnimations;
