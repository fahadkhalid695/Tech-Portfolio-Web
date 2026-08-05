/**
 * Hero — Blueprint "title block" treatment.
 *
 * Layout:
 *   - Full-viewport blueprint grid background
 *   - Corner crosshair / registration marks at all four corners
 *   - Left: headline + dimension line + sub-copy + CTAs
 *   - Bottom-right: title-block box (name / role / SHEET 01 / date / REV)
 *
 * Load sequence (no WebGL):
 *   1. Grid fades in (0→400ms)
 *   2. Corner marks draw (150ms each, staggered)
 *   3. Title-block border strokes around perimeter (SVG pathLength, 600ms)
 *   4. Dimension line extends under headline (550ms)
 *   5. Text content fades + 8px rise (staggered, 80ms/child)
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { CornerMark, DimensionLine, DrawBorder } from '../ui/BlueprintPrimitives';
import { getResumeUrl, getResumeAction, personalInfo } from '../../data/personalInfo';
import { useReducedMotion } from '../../utils/animations';

// Sheet data
const SHEET = { number: '01', total: '09', title: 'OVERVIEW — FK PORTFOLIO', rev: 'A' };
const TODAY = new Date().toISOString().slice(0, 10);

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const resumeUrl = getResumeUrl();
  const resumeAction = getResumeAction();

  // Title-block ref for DrawBorder sizing
  const [tbSize, setTbSize] = useState({ w: 340, h: 140 });
  const tbRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (tbRef.current) {
      const r = tbRef.current.getBoundingClientRect();
      setTbSize({ w: r.width, h: r.height });
    }
  }, []);

  // Stagger delays for text content (after border draws ~0.7s)
  const textDelay = prefersReducedMotion ? 0.05 : 0.75;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
      aria-label="Hero — Title block"
    >
      {/* Blueprint grid background */}
      <motion.div
        className="absolute inset-0 blueprint-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* ── Corner registration marks ── */}
      <CornerMark corner="tl" className="top-4 left-4"   delay={prefersReducedMotion ? 0 : 0.42} />
      <CornerMark corner="tr" className="top-4 right-4"  delay={prefersReducedMotion ? 0 : 0.48} />
      <CornerMark corner="bl" className="bottom-4 left-4"  delay={prefersReducedMotion ? 0 : 0.44} />
      <CornerMark corner="br" className="bottom-4 right-4" delay={prefersReducedMotion ? 0 : 0.46} />

      {/* ── Main content ── */}
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 pb-20">

        {/* Left column — headline */}
        <div className="flex-1 max-w-2xl">

          {/* Sheet label */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: textDelay - 0.1 }}
          >
            <span className="font-mono-data text-[10px] tracking-widest" style={{ color: '#7EC8E3', opacity: 0.6 }}>
              SHEET {SHEET.number}/{SHEET.total}
            </span>
            <span className="w-8 border-t opacity-30" style={{ borderColor: '#7EC8E3' }} />
            <span className="font-mono-data text-[10px] tracking-widest" style={{ color: '#7EC8E3', opacity: 0.6 }}>
              {SHEET.title}
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            className="font-mono-data text-xs mb-3 tracking-widest"
            style={{ color: '#7EC8E3', opacity: 0.7 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.35, delay: textDelay }}
          >
            // ENTITY: FAHAD KHALID
          </motion.p>

          {/* Name headline */}
          <div className="relative mb-2">
            <motion.h1
              className="font-display font-bold uppercase"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                letterSpacing: '0.06em',
                color: '#EAF4FF',
                lineHeight: 1.05,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: textDelay + 0.08 }}
            >
              FAHAD{' '}
              <span style={{ color: '#7EC8E3' }}>KHALID</span>
            </motion.h1>
          </div>

          {/* Dimension line under headline */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: textDelay + 0.25 }}
          >
            <DimensionLine
              width={380}
              label="PORTFOLIO v2026"
              color="#7EC8E3"
              delay={textDelay + 0.28}
            />
          </motion.div>

          {/* Role / word-swap */}
          <motion.div
            className="h-8 mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: textDelay + 0.18 }}
          >
            <WordSwap
              words={[
                'CS UNDERGRADUATE',
                'AI / ML BUILDER',
                'CLOUD ENGINEER',
                'CYBERSECURITY PRACTITIONER',
                'AI AGENT BUILDER',
                'AWS SBG CAPTAIN',
                'MICROSOFT STUDENT AMBASSADOR',
                'COMMUNITY BUILDER',
                'SOFTWARE ENGINEER',
              ]}
              intervalMs={3800}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-sm leading-relaxed max-w-lg mb-6"
            style={{ color: '#7EC8E3', opacity: 0.75 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ duration: 0.4, delay: textDelay + 0.28 }}
          >
            Computer Science undergraduate building AI systems, cloud infrastructure,
            and security solutions — while leading student communities around AWS and Microsoft technologies.
            {' '}
            <span className="font-mono-data text-[10px] tracking-widest" style={{ color: '#E4572E', opacity: 0.9 }}>
              ● ACTIVE
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: textDelay + 0.38 }}
          >
            <MagneticButton href="#projects" className="btn-premium" strength={0.3}>
              <span className="flex items-center gap-2 relative z-10">
                VIEW WORK <ArrowRight size={14} />
              </span>
            </MagneticButton>
            <MagneticButton href={resumeUrl} className="btn-secondary" strength={0.3}>
              <span className="flex items-center gap-2">
                {resumeAction.action === 'view'
                  ? <><ExternalLink size={13} /> RESUME</>
                  : <><Download size={13} /> RESUME</>}
              </span>
            </MagneticButton>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex gap-3 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: textDelay + 0.48 }}
          >
            {[
              { href: personalInfo.social.github,           icon: <Github size={16} />,   label: 'GitHub'   },
              { href: personalInfo.social.linkedin,         icon: <Linkedin size={16} />, label: 'LinkedIn' },
              { href: `mailto:${personalInfo.contact.email}`, icon: <Mail size={16} />,   label: 'Email'    },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-8 h-8 border transition-colors duration-200"
                style={{
                  borderColor: 'rgba(126,200,227,0.25)',
                  color: '#7EC8E3',
                  opacity: 0.7,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right column — title block */}
        <motion.div
          className="relative self-end lg:self-auto shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: textDelay + 0.15 }}
        >
          <div ref={tbRef} className="relative" style={{ width: 'clamp(260px, 30vw, 340px)' }}>
            {/* Animated border */}
            <DrawBorder
              width={tbSize.w}
              height={tbSize.h}
              color="#7EC8E3"
              strokeWidth={1}
              delay={prefersReducedMotion ? 0 : 0.52}
              duration={0.75}
            />

            {/* Title block content */}
            <div
              className="border font-mono-data text-xs"
              style={{ borderColor: 'rgba(126,200,227,0.18)' }}
            >
              {/* Row: title */}
              <div className="px-3 py-2 border-b" style={{ borderColor: 'rgba(126,200,227,0.18)' }}>
                <div className="text-[9px] opacity-40 uppercase tracking-widest mb-0.5" style={{ color: '#7EC8E3' }}>TITLE</div>
                <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: '#EAF4FF' }}>
                  CS · AI · CLOUD · SECURITY
                </div>
              </div>

              {/* Row: name + role */}
              <div className="grid grid-cols-2">
                <div className="px-3 py-2 border-r border-b" style={{ borderColor: 'rgba(126,200,227,0.18)' }}>
                  <div className="text-[9px] opacity-40 uppercase tracking-widest mb-0.5" style={{ color: '#7EC8E3' }}>DRAWN BY</div>
                  <div className="text-[10px]" style={{ color: '#EAF4FF' }}>Fahad Khalid</div>
                </div>
                <div className="px-3 py-2 border-b" style={{ borderColor: 'rgba(126,200,227,0.18)' }}>
                  <div className="text-[9px] opacity-40 uppercase tracking-widest mb-0.5" style={{ color: '#7EC8E3' }}>ROLE</div>
                  <div className="text-[10px]" style={{ color: '#EAF4FF' }}>Engineer / Educator</div>
                </div>
              </div>

              {/* Row: sheet + date + rev */}
              <div className="grid grid-cols-3">
                <div className="px-3 py-2 border-r" style={{ borderColor: 'rgba(126,200,227,0.18)' }}>
                  <div className="text-[9px] opacity-40 uppercase tracking-widest mb-0.5" style={{ color: '#7EC8E3' }}>SHEET</div>
                  <div className="text-[10px]" style={{ color: '#EAF4FF' }}>{SHEET.number} OF {SHEET.total}</div>
                </div>
                <div className="px-3 py-2 border-r" style={{ borderColor: 'rgba(126,200,227,0.18)' }}>
                  <div className="text-[9px] opacity-40 uppercase tracking-widest mb-0.5" style={{ color: '#7EC8E3' }}>DATE</div>
                  <div className="text-[10px]" style={{ color: '#EAF4FF' }}>{TODAY}</div>
                </div>
                <div className="px-3 py-2">
                  <div className="text-[9px] opacity-40 uppercase tracking-widest mb-0.5" style={{ color: '#7EC8E3' }}>REV</div>
                  <div className="text-[10px]" style={{ color: '#E4572E', fontWeight: 700 }}>{SHEET.rev}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dimension line below title block */}
          <div className="mt-2">
            <DimensionLine
              width={tbSize.w}
              label={`${tbSize.w}px`}
              color="#7EC8E3"
              delay={prefersReducedMotion ? 0 : 1.35}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        style={{ color: '#7EC8E3', opacity: 0.5 }}
        animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-label="Scroll to about section"
      >
        <span className="font-mono-data text-[9px] tracking-widest">SCROLL</span>
        <ChevronDown size={16} />
      </motion.a>
    </section>
  );
};

// ─── WordSwap ─────────────────────────────────────────────────────────────────

const WordSwap: React.FC<{ words: string[]; intervalMs?: number }> = ({ words, intervalMs = 3200 }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % words.length), intervalMs);
    return () => clearInterval(t);
  }, [words.length, intervalMs]);

  return (
    <div className="overflow-hidden h-full flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.2, 0.9, 0.2, 1] }}
          className="font-mono-data text-sm tracking-widest font-semibold"
          style={{ color: '#7EC8E3' }}
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
