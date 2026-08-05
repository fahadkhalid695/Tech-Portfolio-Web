/**
 * Card — glassmorphism card with cursor-follow inner glow (desktop only).
 *
 * Uses card-incredible from theme.css for the base glass treatment.
 * Extends with a radial inner glow that follows the cursor on hover
 * (pointer: fine devices only — mice, not touch).
 */

import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../utils/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  /** Show a cyan/violet gradient inner glow on hover (desktop only) */
  glow?: boolean;
  /** Whether to apply the gradient-overlay variant */
  gradient?: boolean;
  /** Disable all Framer Motion animations (e.g., inside Suspense or AnimatePresence) */
  static?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glow = true,
  gradient = false,
  static: isStatic = false,
  onClick,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Only track cursor on pointer:fine (mouse) devices
  const canTrack = typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canTrack || !cardRef.current || prefersReducedMotion) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGlowPos({ x, y });
    },
    [canTrack, prefersReducedMotion]
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setGlowPos({ x: 50, y: 50 });
  };

  const hoverAnimation = hover && !prefersReducedMotion
    ? { y: -6, transition: { duration: 0.3, ease: [0.2, 0.9, 0.2, 1] as number[] } }
    : {};

  const content = (
    <div
      ref={cardRef}
      className={`card-incredible relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      {/* Gradient overlay variant */}
      {gradient && (
        <div
          className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, transparent 50%, rgba(124, 92, 255, 0.06) 100%)',
          }}
        />
      )}

      {/* Cursor-follow inner glow — desktop only, respects reduced-motion */}
      {glow && canTrack && !prefersReducedMotion && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(280px circle at ${glowPos.x}% ${glowPos.y}%, rgba(0, 212, 255, 0.10) 0%, rgba(124, 92, 255, 0.06) 40%, transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  if (isStatic) {
    return content;
  }

  return (
    <motion.div
      whileHover={hoverAnimation}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
    >
      {content}
    </motion.div>
  );
};

export default Card;
