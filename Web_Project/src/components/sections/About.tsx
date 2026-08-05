import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, ExternalLink, Brain, Cloud, Shield, Code } from 'lucide-react';
import { getResumeUrl, getResumeAction } from '../../data/personalInfo';
import MagneticButton from '../ui/MagneticButton';
import { useReducedMotion } from '../../utils/animations';
import { CornerMark, SectionLabel, DimensionLine } from '../ui/BlueprintPrimitives';

const HIGHLIGHTS = [
  { text: 'AI/ML systems and agentic AI applications',   icon: <Brain  size={14} /> },
  { text: 'Scalable cloud infrastructure on AWS & Azure', icon: <Cloud  size={14} /> },
  { text: 'Security-first development approach',          icon: <Shield size={14} /> },
  { text: 'Clean, maintainable, documented code',         icon: <Code   size={14} /> },
];

const STATS = [
  { value: '2+',  label: 'YEARS LEARNING' },
  { value: '8+',  label: 'PROJECTS'       },
  { value: '20+', label: 'TECHNOLOGIES'   },
];

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    hidden:  { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };

  return (
    <section
      id="about"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
      aria-label="About Fahad Khalid"
    >
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" aria-hidden="true" />
      <CornerMark corner="tl" className="top-3 left-3" color="#7EC8E3" size={18} />
      <CornerMark corner="br" className="bottom-3 right-3" color="#7EC8E3" size={18} />

      <div ref={ref} className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionLabel sheet={2} name="About" />

        <motion.h2
          className="font-display font-bold uppercase text-3xl sm:text-4xl mb-2"
          style={{ color: 'var(--color-text)', letterSpacing: '0.06em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          ENTITY{' '}
          <span style={{ color: 'var(--color-accent)' }}>PROFILE</span>
        </motion.h2>

        <div className="mb-8">
          <DimensionLine width={220} label="SECTION 02" color="#7EC8E3" delay={inView ? 0.2 : 0} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: Portrait + stats ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {/* Portrait framed as a technical drawing */}
            <div className="relative inline-block">
              <div className="border-2 p-1" style={{ borderColor: 'rgba(126,200,227,0.25)' }}>
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 overflow-hidden">
                  <img
                    src="/image/pic.jpg"
                    alt="Portrait photograph of Fahad Khalid"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Light blueprint wash — on dark only */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'rgba(13,43,78,0.08)', mixBlendMode: 'multiply' }}
                  />
                </div>
              </div>
              {/* Caption */}
              <div
                className="mt-1 font-mono-data text-[9px] tracking-widest text-center"
                style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
              >
                FIG. 01 — SUBJECT: FAHAD KHALID
              </div>
            </div>

            {/* Stats table */}
            <div
              className="mt-6 grid grid-cols-3 gap-0 border"
              style={{ borderColor: 'rgba(126,200,227,0.18)' }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`p-3 text-center ${i < STATS.length - 1 ? 'border-r' : ''}`}
                  style={{ borderColor: 'rgba(126,200,227,0.18)' }}
                >
                  <div className="font-display font-bold text-xl" style={{ color: 'var(--color-accent)' }}>
                    {s.value}
                  </div>
                  <div
                    className="font-mono-data text-[8px] tracking-widest mt-0.5"
                    style={{ color: 'var(--color-text-secondary)', opacity: 0.55 }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: text content ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-5"
          >
            <motion.div variants={itemVariants}>
              <h3
                className="font-display font-bold uppercase text-xl"
                style={{ color: 'var(--color-text)', letterSpacing: '0.04em' }}
              >
                Computer Science Undergraduate
              </h3>
              <p
                className="font-mono-data text-xs mt-1 tracking-widest"
                style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
              >
                // SPECIALIZATION: AI · CLOUD · CYBERSECURITY
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Dedicated CS student with a passion for the intersection of technology and
              innovation. My work spans{' '}
              <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>AI/ML and Generative AI</strong>,{' '}
              <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>cloud computing</strong>, and{' '}
              <strong style={{ color: '#E4572E', fontWeight: 600 }}>cybersecurity</strong> — building
              real-world systems and applied solutions.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Beyond code, I lead two student communities:{' '}
              <strong style={{ color: '#FF9900', fontWeight: 600 }}>AWS Student Builder Group Leader</strong>{' '}
              at PGC Muridke and a{' '}
              <strong style={{ color: '#0078D4', fontWeight: 600 }}>Microsoft Student Ambassador</strong>{' '}
              — focused on bringing cloud, AI, and developer education to students.
            </motion.p>

            {/* Capabilities list */}
            <motion.div variants={itemVariants}>
              <div
                className="font-mono-data text-[9px] tracking-widest mb-3"
                style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}
              >
                CAPABILITIES:
              </div>
              <div className="space-y-2">
                {HIGHLIGHTS.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--color-accent)', opacity: 0.7 }}
                    />
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {h.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-2">
              <MagneticButton href={getResumeUrl()} className="btn-premium" strength={0.3}>
                <span className="flex items-center gap-2 relative z-10">
                  {getResumeAction().action === 'view'
                    ? <><ExternalLink size={13} aria-hidden="true" /> VIEW RESUME</>
                    : <><Download size={13} aria-hidden="true" /> RESUME</>}
                </span>
              </MagneticButton>
              <MagneticButton href="#projects" className="btn-secondary" strength={0.3}>
                VIEW WORK
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
