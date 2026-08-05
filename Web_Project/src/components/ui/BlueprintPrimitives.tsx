/**
 * BlueprintPrimitives — shared SVG/CSS drawing elements for the Blueprint theme.
 *
 * Exports:
 *   CornerMark          — registration crosshair for viewport/section corners
 *   DimensionLine       — SVG line with tick marks at both ends, animates on mount
 *   SectionLabel        — "SHEET 0X/09 — NAME" monospace label
 *   DrawBorder          — SVG rect stroke-dashoffset border animation
 *   BlueprintGrid       — full-bleed background grid div
 */

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion as useFramerReducedMotion } from 'framer-motion';

// ─── CornerMark ───────────────────────────────────────────────────────────────

interface CornerMarkProps {
  /** Which corner: 'tl' | 'tr' | 'bl' | 'br' */
  corner: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;
  color?: string;
  className?: string;
  /** Delay before drawing in (seconds) */
  delay?: number;
}

export const CornerMark: React.FC<CornerMarkProps> = ({
  corner,
  size = 24,
  color = '#7EC8E3',
  className = '',
  delay = 0,
}) => {
  const prefersReducedMotion = useFramerReducedMotion();

  const transforms: Record<string, string> = {
    tl: 'translate(0,0)',
    tr: `translate(${size},0) scale(-1,1)`,
    bl: `translate(0,${size}) scale(1,-1)`,
    br: `translate(${size},${size}) scale(-1,-1)`,
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.25, delay }}
      aria-hidden="true"
    >
      <g transform={transforms[corner]} stroke={color} strokeWidth="1" fill="none" opacity="0.7">
        {/* Horizontal arm */}
        <motion.line
          x1="0" y1="0" x2={size * 0.45} y2="0"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, delay: delay + 0.05 }}
        />
        {/* Vertical arm */}
        <motion.line
          x1="0" y1="0" x2="0" y2={size * 0.45}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, delay: delay + 0.05 }}
        />
        {/* Centre dot */}
        <circle cx="0" cy="0" r="1.5" fill={color} opacity="0.9" />
      </g>
    </motion.svg>
  );
};

// ─── DimensionLine ────────────────────────────────────────────────────────────

interface DimensionLineProps {
  /** Width of the line in px */
  width: number;
  label?: string;
  color?: string;
  delay?: number;
  className?: string;
}

export const DimensionLine: React.FC<DimensionLineProps> = ({
  width,
  label,
  color = '#7EC8E3',
  delay = 0,
  className = '',
}) => {
  const prefersReducedMotion = useFramerReducedMotion();
  const height = 20;
  const tickH = 10;
  const midY = height / 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`overflow-visible pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Main line */}
      <motion.line
        x1="0" y1={midY} x2={width} y2={midY}
        stroke={color} strokeWidth="1" opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, delay, ease: 'easeOut' }}
      />
      {/* Left tick */}
      <motion.line
        x1="0" y1={midY - tickH / 2} x2="0" y2={midY + tickH / 2}
        stroke={color} strokeWidth="1" opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.2, delay: delay + 0.5 }}
      />
      {/* Right tick */}
      <motion.line
        x1={width} y1={midY - tickH / 2} x2={width} y2={midY + tickH / 2}
        stroke={color} strokeWidth="1" opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.2, delay: delay + 0.5 }}
      />
      {/* Label */}
      {label && (
        <motion.text
          x={width / 2} y={midY - 4}
          textAnchor="middle"
          fill={color}
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          opacity="0.55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, delay: delay + 0.6 }}
        >
          {label}
        </motion.text>
      )}
    </svg>
  );
};

// ─── SectionLabel ─────────────────────────────────────────────────────────────

interface SectionLabelProps {
  sheet: number;
  total?: number;
  name: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  sheet,
  total = 9,
  name,
  className = '',
}) => (
  <div className={`flex items-center gap-3 mb-2 ${className}`}>
    <span
      className="font-mono-data text-xs opacity-50"
      style={{ color: '#7EC8E3' }}
      aria-label={`Sheet ${sheet} of ${total}`}
    >
      SHEET {String(sheet).padStart(2, '0')}/{String(total).padStart(2, '0')}
    </span>
    <span className="w-px h-3 opacity-30" style={{ background: '#7EC8E3' }} />
    <span className="font-mono-data text-xs opacity-50" style={{ color: '#7EC8E3' }}>
      {name.toUpperCase()}
    </span>
  </div>
);

// ─── DrawBorder ───────────────────────────────────────────────────────────────
// Animates a rect stroke around a container using pathLength

interface DrawBorderProps {
  width: number;
  height: number;
  color?: string;
  strokeWidth?: number;
  radius?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

export const DrawBorder: React.FC<DrawBorderProps> = ({
  width,
  height,
  color = '#7EC8E3',
  strokeWidth = 1,
  radius = 0,
  delay = 0,
  duration = 0.8,
  className = '',
}) => {
  const prefersReducedMotion = useFramerReducedMotion();

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`absolute inset-0 pointer-events-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      <motion.rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={width - strokeWidth}
        height={height - strokeWidth}
        rx={radius}
        ry={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0.01 : duration,
          delay,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
};

// ─── BlueprintGrid ────────────────────────────────────────────────────────────

interface BlueprintGridProps {
  children: React.ReactNode;
  className?: string;
  /** Whether to animate the grid opacity on mount */
  animate?: boolean;
}

export const BlueprintGrid: React.FC<BlueprintGridProps> = ({
  children,
  className = '',
  animate = false,
}) => {
  const prefersReducedMotion = useFramerReducedMotion();

  if (animate && !prefersReducedMotion) {
    return (
      <motion.div
        className={`blueprint-grid ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={`blueprint-grid ${className}`}>{children}</div>;
};
