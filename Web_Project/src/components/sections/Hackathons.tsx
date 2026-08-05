import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Users, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import { hackathons } from '../../data/hackathons';
import { useReducedMotion } from '../../utils/animations';
import { CornerMark, SectionLabel } from '../ui/BlueprintPrimitives';

const Hackathons: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };

  return (
    <section
      id="hackathons"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
      aria-label="Hackathons and competitions"
    >
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" aria-hidden="true" />
      <CornerMark corner="tl" className="top-3 left-3" color="#7EC8E3" size={18} />
      <CornerMark corner="tr" className="top-3 right-3" color="#7EC8E3" size={18} />

      <div ref={ref} className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionLabel sheet={6} name="Hackathons" />

        <motion.h2
          className="font-display font-bold uppercase text-3xl sm:text-4xl mb-2"
          style={{ color: 'var(--color-text)', letterSpacing: '0.06em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
        >
          FIELD{' '}
          <span style={{ color: 'var(--color-accent)' }}>REPORTS</span>
        </motion.h2>

        <motion.p
          className="text-sm mb-6"
          style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ delay: 0.1 }}
        >
          Competition logs — scroll horizontally or use arrows.
        </motion.p>

        {/* Nav arrows */}
        <div className="flex gap-2 mb-4">
          {(['left', 'right'] as const).map(d => (
            <button
              key={d}
              onClick={() => scroll(d)}
              className="p-2 border transition-colors"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}
              aria-label={`Scroll ${d}`}
            >
              {d === 'left' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          ))}
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
          role="list"
          aria-label="Hackathon cards"
        >
          {hackathons.map((h, i) => (
            <motion.div
              key={h.id}
              role="listitem"
              className="flex-shrink-0 border overflow-hidden"
              style={{
                width: 320,
                scrollSnapAlign: 'start',
                borderColor: 'var(--color-border)',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={h.image}
                  alt={h.name}
                  className="w-full h-full object-cover opacity-75"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 40%, var(--color-bg-secondary) 100%)',
                  }}
                />
                {/* Result badge */}
                <div
                  className="absolute top-3 right-3 font-mono-data text-[9px] px-2 py-0.5 border tracking-widest"
                  style={{
                    borderColor: h.position.toLowerCase().includes('top') || h.position.toLowerCase().includes('80')
                      ? '#E4572E'
                      : 'var(--color-border-accent)',
                    color: h.position.toLowerCase().includes('top') || h.position.toLowerCase().includes('80')
                      ? '#E4572E'
                      : 'var(--color-accent)',
                    background: 'var(--glass-bg)',
                  }}
                >
                  {h.position.toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div
                  className="font-mono-data text-[8px] tracking-widest mb-1"
                  style={{ color: 'var(--color-text-secondary)', opacity: 0.4 }}
                >
                  REPORT #{String(i + 1).padStart(3, '0')}
                </div>

                <h3
                  className="font-display font-bold uppercase text-sm mb-2"
                  style={{ color: 'var(--color-text)', letterSpacing: '0.04em' }}
                >
                  {h.name}
                </h3>

                <div
                  className="flex flex-wrap gap-x-3 gap-y-1 mb-3 font-mono-data text-[9px] tracking-widest"
                  style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }}
                >
                  <span className="flex items-center gap-1"><Calendar size={9} />{h.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={9} />{h.location}</span>
                  <span className="flex items-center gap-1"><Users size={9} />Team×{h.teamSize}</span>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <Code size={10} style={{ color: 'var(--color-accent)', opacity: 0.6 }} />
                  <span
                    className="font-mono-data text-[9px] uppercase tracking-widest"
                    style={{ color: 'var(--color-text-secondary)', opacity: 0.75 }}
                  >
                    {h.project}
                  </span>
                </div>

                <p
                  className="text-xs leading-relaxed mb-3"
                  style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
                >
                  {h.description.slice(0, 120)}{h.description.length > 120 ? '…' : ''}
                </p>

                <div className="flex flex-wrap gap-1">
                  {h.technologies.slice(0, 4).map(t => (
                    <span
                      key={t}
                      className="font-mono-data text-[8px] px-1.5 py-0.5 border tracking-widest"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)', opacity: 0.7 }}
                    >
                      {t}
                    </span>
                  ))}
                  {h.technologies.length > 4 && (
                    <span
                      className="font-mono-data text-[8px] px-1.5 py-0.5"
                      style={{ color: 'var(--color-text-secondary)', opacity: 0.4 }}
                    >
                      +{h.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 max-w-xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {[
            { v: hackathons.length,                                                           l: 'EVENTS'        },
            { v: hackathons.filter(h => h.position.toLowerCase().includes('top')).length,    l: 'TOP PLACEMENTS'},
            { v: new Set(hackathons.flatMap(h => h.technologies)).size,                      l: 'TECHNOLOGIES'  },
            { v: hackathons.reduce((a, h) => a + h.teamSize, 0),                             l: 'PARTICIPANTS'  },
          ].map(s => (
            <div
              key={s.l}
              className="border p-3 text-center"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div
                className="font-display font-bold text-xl"
                style={{ color: 'var(--color-accent)' }}
              >
                {s.v}
              </div>
              <div
                className="font-mono-data text-[8px] tracking-widest mt-0.5"
                style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hackathons;
