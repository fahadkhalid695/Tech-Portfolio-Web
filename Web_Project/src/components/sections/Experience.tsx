import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { experiences } from '../../data/experience';
import { useReducedMotion } from '../../utils/animations';
import { CornerMark, SectionLabel, DimensionLine } from '../ui/BlueprintPrimitives';

const Experience: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      id="experience"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
      aria-label="Work experience"
    >
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" aria-hidden="true" />
      <CornerMark corner="tl" className="top-3 left-3" color="#7EC8E3" size={18} />
      <CornerMark corner="br" className="bottom-3 right-3" color="#7EC8E3" size={18} />

      <div ref={ref} className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionLabel sheet={3} name="Experience" />

        <motion.h2
          className="font-display font-bold uppercase text-3xl sm:text-4xl mb-2"
          style={{ color: 'var(--color-text)', letterSpacing: '0.06em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          WORK{' '}
          <span style={{ color: 'var(--color-accent)' }}>HISTORY</span>
        </motion.h2>

        <div className="mb-8">
          <DimensionLine width={200} label="SECTION 03" color="#7EC8E3" delay={inView ? 0.2 : 0} />
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical guide line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'rgba(126,200,227,0.20)' }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="relative md:pl-10"
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.12 }}
              >
                {/* Timeline marker dot */}
                <div
                  className="absolute left-0 top-4 w-2 h-2 border hidden md:block -translate-x-0.5"
                  style={{
                    borderColor: exp.isCurrent ? '#E4572E' : 'var(--color-accent)',
                    background: exp.isCurrent ? '#E4572E' : 'rgba(126,200,227,0.15)',
                  }}
                />

                {/* Card — uses CSS vars so light/dark both work */}
                <div
                  className="border p-5"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* ── Header ── */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3
                        className="font-display font-bold uppercase text-base"
                        style={{ color: 'var(--color-text)', letterSpacing: '0.04em' }}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-mono-data text-xs transition-opacity hover:opacity-100"
                            style={{ color: 'var(--color-accent)', opacity: 0.85 }}
                          >
                            {exp.company} <ExternalLink size={10} />
                          </a>
                        ) : (
                          <span
                            className="font-mono-data text-xs"
                            style={{ color: 'var(--color-text-secondary)', opacity: 0.85 }}
                          >
                            {exp.company}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Active badge */}
                    {exp.isCurrent && (
                      <span
                        className="font-mono-data text-[9px] px-2 py-0.5 tracking-widest border animate-signal-pulse flex-shrink-0"
                        style={{ borderColor: '#E4572E', color: '#E4572E' }}
                      >
                        ● ACTIVE
                      </span>
                    )}
                  </div>

                  {/* ── Meta row ── */}
                  <div
                    className="flex flex-wrap gap-4 mb-3 font-mono-data text-[9px] tracking-widest"
                    style={{ color: 'var(--color-text-secondary)', opacity: 0.65 }}
                  >
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {exp.startDate} — {exp.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {exp.location}
                    </span>
                    <span
                      className="border px-1.5 py-0.5"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* ── Description ── */}
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {exp.description}
                  </p>

                  {/* ── Responsibilities ── */}
                  <div className="mb-4">
                    <div
                      className="font-mono-data text-[9px] tracking-widest mb-2"
                      style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
                    >
                      RESPONSIBILITIES:
                    </div>
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((r, ri) => (
                        <li
                          key={ri}
                          className="flex items-start gap-2 text-xs"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <ChevronRight
                            size={12}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: 'var(--color-accent)', opacity: 0.6 }}
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ── Technologies ── */}
                  <div>
                    <div
                      className="font-mono-data text-[9px] tracking-widest mb-2"
                      style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
                    >
                      STACK:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map(t => (
                        <span
                          key={t}
                          className="font-mono-data text-[9px] px-2 py-0.5 border tracking-widest"
                          style={{
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text-secondary)',
                            opacity: 0.8,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
