/**
 * Skills — Blueprint Technical Spec sheet, redesigned August 2026.
 *
 * Design decisions:
 * - Six semantic categories matching the new skills.ts data structure
 * - No fake percentage bars — uses text proficiency labels only
 * - Category cards are always visible; clicking expands the skill chips
 * - Skills displayed as technical chips with proficiency labels
 * - Category icons and tech counts shown in collapsed view
 * - Blueprint visual language: borders, mono labels, corner marks
 * - Full light/dark theme support
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import { skills, SKILL_CATEGORY_ORDER } from '../../data/skills';
import { useReducedMotion } from '../../utils/animations';
import { CornerMark, SectionLabel, DimensionLine } from '../ui/BlueprintPrimitives';

// ─── Category metadata ────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, {
  code: string;
  shortDesc: string;
  color: string;
  dimColor: string;
}> = {
  "AI & Machine Learning": {
    code: "01",
    shortDesc: "Models · Agents · Vision · Gen AI",
    color: '#7EC8E3',
    dimColor: 'rgba(126,200,227,0.12)',
  },
  "Cloud & DevOps": {
    code: "02",
    shortDesc: "AWS · Azure · GCP · Containers",
    color: '#7EC8E3',
    dimColor: 'rgba(126,200,227,0.10)',
  },
  "Cybersecurity": {
    code: "03",
    shortDesc: "Security · CTF · Cloud IAM",
    color: '#E4572E',
    dimColor: 'rgba(228,87,46,0.10)',
  },
  "Software Development": {
    code: "04",
    shortDesc: "Python · JS/TS · React · APIs",
    color: '#7EC8E3',
    dimColor: 'rgba(126,200,227,0.10)',
  },
  "Data & Databases": {
    code: "05",
    shortDesc: "Analysis · Pandas · MongoDB · SQL",
    color: '#7EC8E3',
    dimColor: 'rgba(126,200,227,0.10)',
  },
  "Tools & Platforms": {
    code: "06",
    shortDesc: "Copilot · Kiro · Gemini · Vercel",
    color: '#7EC8E3',
    dimColor: 'rgba(126,200,227,0.10)',
  },
};

// Proficiency label display
const LEVEL_LABELS: Record<string, { text: string; opacity: number }> = {
  Advanced:     { text: 'ADVANCED',     opacity: 1    },
  Intermediate: { text: 'INTERMEDIATE', opacity: 0.75 },
  Beginner:     { text: 'LEARNING',     opacity: 0.55 },
};

// ─── Skills Section ───────────────────────────────────────────────────────────

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const prefersReducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Group skills by category in the specified display order
  const grouped = SKILL_CATEGORY_ORDER.reduce<Record<string, typeof skills>>((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Total counts
  const totalSkills = skills.length;
  const advancedCount = skills.filter(s => s.level === 'Advanced').length;

  return (
    <section
      id="skills"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
      aria-label="Technical skills"
    >
      {/* Background grid */}
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" aria-hidden="true" />
      <CornerMark corner="tl" className="top-3 left-3" color="#7EC8E3" size={18} />
      <CornerMark corner="tr" className="top-3 right-3" color="#7EC8E3" size={18} />

      <div ref={ref} className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <SectionLabel sheet={4} name="Skills" />

        <motion.h2
          className="font-display font-bold uppercase text-3xl sm:text-4xl mb-2"
          style={{ color: 'var(--color-text)', letterSpacing: '0.06em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          TECHNICAL{' '}
          <span style={{ color: 'var(--color-accent)' }}>SPEC</span>
        </motion.h2>

        <motion.p
          className="text-sm mb-3 max-w-lg"
          style={{ color: 'var(--color-text-secondary)', opacity: 0.8 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.8 } : {}}
          transition={{ delay: 0.1 }}
        >
          Skills organised by domain — click any category to view the full specification.
        </motion.p>

        {/* Summary dimension line */}
        <div className="mb-8">
          <DimensionLine
            width={260}
            label={`${totalSkills} SKILLS · ${advancedCount} ADVANCED · ${SKILL_CATEGORY_ORDER.length} DOMAINS`}
            color="#7EC8E3"
            delay={inView ? 0.2 : 0}
          />
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {SKILL_CATEGORY_ORDER.map((cat, ci) => {
            const catSkills = grouped[cat] ?? [];
            const meta = CATEGORY_META[cat];
            const isExp = expanded === cat;
            const advCount = catSkills.filter(s => s.level === 'Advanced').length;

            return (
              <motion.div
                key={cat}
                className="border cursor-pointer group"
                style={{
                  borderColor: isExp
                    ? `${meta.color}40`
                    : 'rgba(126,200,227,0.15)',
                  background: isExp
                    ? meta.dimColor
                    : 'rgba(8,33,61,0.50)',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: ci * 0.06 }}
                onClick={() => setExpanded(isExp ? null : cat)}
                whileHover={prefersReducedMotion ? {} : {
                  borderColor: `${meta.color}35`,
                }}
                role="button"
                aria-expanded={isExp}
                aria-label={`${cat} skills category`}
              >
                {/* Card header */}
                <div
                  className="flex items-start justify-between p-4 border-b"
                  style={{ borderColor: 'rgba(126,200,227,0.10)' }}
                >
                  <div className="flex-1 min-w-0 pr-3">
                    {/* Category code + name */}
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-mono-data text-[9px] tracking-widest flex-shrink-0"
                        style={{ color: meta.color, opacity: 0.6 }}
                      >
                        {meta.code}
                      </span>
                      <span
                        className="font-mono-data text-[8px] opacity-25"
                        style={{ color: meta.color }}
                      >
                        ——
                      </span>
                    </div>
                    <div
                      className="font-display font-bold uppercase text-sm leading-tight"
                      style={{ color: 'var(--color-text)', letterSpacing: '0.05em' }}
                    >
                      {cat}
                    </div>
                    <div
                      className="font-mono-data text-[9px] mt-1 tracking-wide"
                      style={{ color: 'var(--color-text-secondary)', opacity: 0.65 }}
                    >
                      {meta.shortDesc}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    {/* Count badge */}
                    <span
                      className="font-mono-data text-[9px] px-2 py-0.5 border tracking-widest"
                      style={{
                        borderColor: 'rgba(126,200,227,0.20)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {catSkills.length}
                    </span>
                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isExp ? 180 : 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                    >
                      <ChevronDown
                        size={13}
                        style={{ color: meta.color, opacity: 0.6 }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Collapsed: quick chip preview */}
                {!isExp && (
                  <div className="p-3 flex flex-wrap gap-1.5">
                    {catSkills.slice(0, 4).map(s => (
                      <span
                        key={s.id}
                        className="font-mono-data text-[9px] px-2 py-0.5 border tracking-wider"
                        style={{
                          borderColor: s.level === 'Advanced'
                            ? `${meta.color}40`
                            : 'rgba(126,200,227,0.15)',
                          color: s.level === 'Advanced'
                            ? 'var(--color-text)'
                            : 'var(--color-text-secondary)',
                          opacity: s.level === 'Advanced' ? 1 : 0.7,
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                    {catSkills.length > 4 && (
                      <span
                        className="font-mono-data text-[9px] px-2 py-0.5"
                        style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
                      >
                        +{catSkills.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Expanded: full skill list */}
                <AnimatePresence>
                  {isExp && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4">
                        {/* Column headers */}
                        <div
                          className="flex items-center justify-between mb-3 pb-2 border-b"
                          style={{ borderColor: 'rgba(126,200,227,0.08)' }}
                        >
                          <span
                            className="font-mono-data text-[8px] tracking-widest uppercase"
                            style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
                          >
                            TECHNOLOGY
                          </span>
                          <span
                            className="font-mono-data text-[8px] tracking-widest uppercase"
                            style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
                          >
                            PROFICIENCY
                          </span>
                        </div>

                        {/* Skill rows */}
                        <div className="space-y-2.5">
                          {catSkills.map((s, si) => {
                            const lvl = LEVEL_LABELS[s.level];
                            return (
                              <motion.div
                                key={s.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: prefersReducedMotion ? 0 : 0.22,
                                  delay: si * 0.04,
                                }}
                                className="flex items-center justify-between gap-3"
                              >
                                {/* Skill name */}
                                <div className="flex items-center gap-2 min-w-0">
                                  <span
                                    className="w-1 h-1 flex-shrink-0 rounded-full"
                                    style={{ background: meta.color, opacity: 0.6 }}
                                  />
                                  <span
                                    className="font-mono-data text-[10px] tracking-wide truncate"
                                    style={{ color: 'var(--color-text)' }}
                                  >
                                    {s.name}
                                  </span>
                                </div>

                                {/* Proficiency label — no fake % */}
                                <span
                                  className="font-mono-data text-[8px] tracking-widest flex-shrink-0 border px-1.5 py-0.5"
                                  style={{
                                    borderColor: s.level === 'Advanced'
                                      ? `${meta.color}35`
                                      : 'rgba(126,200,227,0.12)',
                                    color: s.level === 'Advanced'
                                      ? meta.color
                                      : 'var(--color-text-secondary)',
                                    opacity: lvl.opacity,
                                  }}
                                >
                                  {lvl.text}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Footer: advanced count */}
                        <div
                          className="mt-4 pt-3 border-t font-mono-data text-[8px] tracking-widest"
                          style={{
                            borderColor: 'rgba(126,200,227,0.08)',
                            color: 'var(--color-text-secondary)',
                            opacity: 0.45,
                          }}
                        >
                          {advCount} ADVANCED · {catSkills.length - advCount} IN PROGRESS
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Summary stats row */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-12 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
        >
          {SKILL_CATEGORY_ORDER.map((cat, i) => {
            const catSkills = grouped[cat] ?? [];
            const meta = CATEGORY_META[cat];
            return (
              <button
                key={cat}
                onClick={() => setExpanded(prev => prev === cat ? null : cat)}
                className="border p-2 text-center transition-colors duration-200"
                style={{
                  borderColor: expanded === cat
                    ? `${meta.color}40`
                    : 'rgba(126,200,227,0.12)',
                  background: expanded === cat ? meta.dimColor : 'transparent',
                }}
                aria-label={`Jump to ${cat}`}
              >
                <div
                  className="font-display font-bold text-base"
                  style={{ color: meta.color }}
                >
                  {catSkills.length}
                </div>
                <div
                  className="font-mono-data text-[8px] tracking-widest mt-0.5 leading-tight"
                  style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}
                >
                  {meta.code}
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Hint */}
        <motion.p
          className="font-mono-data text-[9px] tracking-widest mt-6"
          style={{ color: 'var(--color-text-secondary)', opacity: 0.35 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.35 } : {}}
          transition={{ delay: 0.75 }}
        >
          // CLICK ANY CATEGORY TO EXPAND FULL SPECIFICATION
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;
