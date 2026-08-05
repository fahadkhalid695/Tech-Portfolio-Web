/**
 * ProjectSheet — "pinned paper sheet" project card for the Blueprint theme.
 *
 * Visual spec:
 * - cream/vellum background (--paper), dark ink text (--paper-ink)
 * - deterministic rotation derived from index: (-2deg to +2deg)
 * - layered box-shadow for physical paper depth
 * - on hover: rotation → 0deg, card lifts, SVG stroke-draw of a simple icon
 * - reduced-motion: no rotation, no stroke-draw, simple opacity fade only
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useReducedMotion } from '../../utils/animations';

// Deterministic rotation per index (never re-randomized on render)
const getRotation = (index: number): number => {
  const angles = [-1.8, 1.2, -0.9, 1.7, -1.4, 0.8, -1.1, 1.5];
  return angles[index % angles.length];
};

// Simple SVG technical-illustration icon that stroke-draws on hover
const TechIcon: React.FC<{ tags: string[]; draw: boolean; color: string }> = ({ tags, draw, color }) => {
  const isAI = tags.some(t => /ai|ml|torch|sklearn|tensor/i.test(t));
  const isCloud = tags.some(t => /cloud|aws|azure|gcp|docker|k8s|kubernetes/i.test(t));
  const isWeb = tags.some(t => /react|next|vite|tailwind|node/i.test(t));
  const isSec = tags.some(t => /security|ctf|crypto|cyber/i.test(t));

  const dashLen = 80;
  const transProps = {
    initial: { pathLength: 0 },
    animate: { pathLength: draw ? 1 : 0 },
    transition: { duration: 0.45, ease: 'easeOut' as const },
  };

  if (isAI) return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* Brain / network */}
      <motion.circle cx="16" cy="16" r="6" stroke={color} strokeWidth="1.2" fill="none" {...transProps} />
      <motion.line x1="16" y1="10" x2="16" y2="4"  stroke={color} strokeWidth="1" {...transProps} />
      <motion.line x1="16" y1="22" x2="16" y2="28" stroke={color} strokeWidth="1" {...transProps} />
      <motion.line x1="10" y1="16" x2="4"  y2="16" stroke={color} strokeWidth="1" {...transProps} />
      <motion.line x1="22" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1" {...transProps} />
      <motion.circle cx="16" cy="4"  r="2" stroke={color} strokeWidth="1" fill="none" {...transProps} />
      <motion.circle cx="16" cy="28" r="2" stroke={color} strokeWidth="1" fill="none" {...transProps} />
      <motion.circle cx="4"  cy="16" r="2" stroke={color} strokeWidth="1" fill="none" {...transProps} />
      <motion.circle cx="28" cy="16" r="2" stroke={color} strokeWidth="1" fill="none" {...transProps} />
    </svg>
  );

  if (isCloud) return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <motion.path d="M8 20 Q4 20 4 16 Q4 10 10 10 Q11 6 16 6 Q22 6 22 12 Q26 12 26 17 Q26 20 22 20 Z"
        stroke={color} strokeWidth="1.2" fill="none" {...transProps} />
      <motion.line x1="16" y1="20" x2="16" y2="28" stroke={color} strokeWidth="1" {...transProps} />
      <motion.line x1="11" y1="25" x2="21" y2="25" stroke={color} strokeWidth="1" {...transProps} />
    </svg>
  );

  if (isSec) return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <motion.path d="M16 4 L28 9 L28 18 Q28 26 16 30 Q4 26 4 18 L4 9 Z"
        stroke={color} strokeWidth="1.2" fill="none" {...transProps} />
      <motion.polyline points="11,16 15,20 21,13" stroke={color} strokeWidth="1.5" fill="none" {...transProps} />
    </svg>
  );

  // Default: web/brackets
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <motion.polyline points="12,10 6,16 12,22"  stroke={color} strokeWidth="1.5" fill="none" {...transProps} />
      <motion.polyline points="20,10 26,16 20,22" stroke={color} strokeWidth="1.5" fill="none" {...transProps} />
      <motion.line x1="14" y1="25" x2="18" y2="7" stroke={color} strokeWidth="1" {...transProps} />
    </svg>
  );
};

// ─── ProjectSheet ─────────────────────────────────────────────────────────────

interface ProjectSheetProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  image?: string;
  index: number;
  onClick?: () => void;
}

const ProjectSheet: React.FC<ProjectSheetProps> = ({
  title,
  description,
  tags,
  githubUrl,
  demoUrl,
  image,
  index,
  onClick,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const baseRotation = prefersReducedMotion ? 0 : getRotation(index);

  return (
    <motion.div
      className="cursor-pointer group relative"
      style={{ rotate: baseRotation }}
      whileHover={prefersReducedMotion ? {} : { rotate: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      onClick={onClick}
    >
      {/* The paper card */}
      <div
        className="card-sheet overflow-hidden"
        style={{
          boxShadow: isHovered
            ? '12px 20px 48px rgba(0,0,0,0.65), 3px 5px 12px rgba(0,0,0,0.35)'
            : '6px 10px 28px rgba(0,0,0,0.55), 2px 3px 8px rgba(0,0,0,0.30)',
        }}
      >
        {/* Sheet header strip — mimics a drawing title strip */}
        <div
          className="flex items-center justify-between px-3 py-1.5 border-b"
          style={{ borderColor: 'rgba(13,43,78,0.15)', background: 'rgba(13,43,78,0.04)' }}
        >
          <span className="font-mono-data text-[9px] opacity-50" style={{ color: '#0D2B4E' }}>
            DWG-{String(index + 1).padStart(3, '0')} / PROJECT
          </span>
          <TechIcon tags={tags} draw={isHovered} color="#0D2B4E" />
        </div>

        {/* Image */}
        {image && (
          <div className="relative h-36 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Ink-wash overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(244,240,228,0.9) 100%)' }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <h3
            className="font-display font-bold text-base mb-1 uppercase tracking-wide"
            style={{ color: '#0D2B4E', letterSpacing: '0.04em' }}
          >
            {title}
          </h3>
          <p className="text-xs leading-relaxed mb-3" style={{ color: '#2A5278', opacity: 0.85 }}>
            {description.length > 110 ? description.slice(0, 108) + '…' : description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="font-mono-data text-[9px] px-1.5 py-0.5 border"
                style={{
                  borderColor: 'rgba(13,43,78,0.20)',
                  color: '#0D2B4E',
                  background: 'rgba(13,43,78,0.04)',
                  letterSpacing: '0.04em',
                }}
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="font-mono-data text-[9px] px-1.5 py-0.5" style={{ color: '#2A5278', opacity: 0.6 }}>
                +{tags.length - 4}
              </span>
            )}
          </div>

          {/* CTA row */}
          <div className="flex gap-3 pt-2 border-t" style={{ borderColor: 'rgba(13,43,78,0.12)' }}>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-[10px] font-mono-data uppercase tracking-wider hover:opacity-100 transition-opacity"
              style={{ color: '#0D2B4E', opacity: 0.6, letterSpacing: '0.08em' }}
            >
              <Github size={11} /> Code
            </a>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-[10px] font-mono-data uppercase tracking-wider hover:opacity-100 transition-opacity"
              style={{ color: '#0D2B4E', opacity: 0.6, letterSpacing: '0.08em' }}
            >
              <ExternalLink size={11} /> Live
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectSheet;
