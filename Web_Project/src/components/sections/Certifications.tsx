import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { certifications } from '../../data/certifications';
import CertStamp from '../ui/CertStamp';
import { CornerMark, SectionLabel } from '../ui/BlueprintPrimitives';

const TOTAL = 9;

const Certifications: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [filter, setFilter] = useState('All');

  const orgs = ['All', ...Array.from(new Set(certifications.map(c => c.organization)))];
  const filtered = filter === 'All' ? certifications : certifications.filter(c => c.organization === filter);

  return (
    <section
      id="certifications"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
      aria-label="Certifications and credentials"
    >
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" aria-hidden="true" />
      <CornerMark corner="tl" className="top-3 left-3" color="#7EC8E3" size={18} />
      <CornerMark corner="br" className="bottom-3 right-3" color="#7EC8E3" size={18} />

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="mb-10">
          <SectionLabel sheet={7} total={TOTAL} name="Certifications" />

          <motion.h2
            className="font-display font-bold uppercase text-3xl sm:text-4xl"
            style={{ color: 'var(--color-text)', letterSpacing: '0.06em' }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35 }}
          >
            VERIFIED{' '}
            <span style={{ color: 'var(--color-accent)' }}>CREDENTIALS</span>
          </motion.h2>

          <motion.p
            className="text-sm mt-2"
            style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.7 } : {}}
            transition={{ delay: 0.1 }}
          >
            Each stamp is an issued, verifiable credential — click to verify.
          </motion.p>
        </div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
        >
          {orgs.map(org => (
            <button
              key={org}
              onClick={() => setFilter(org)}
              className="font-mono-data text-[9px] px-3 py-1 border uppercase tracking-widest transition-colors duration-200"
              style={{
                borderColor: filter === org ? '#E4572E' : 'var(--color-border)',
                color: filter === org ? '#E4572E' : 'var(--color-text-secondary)',
                background: filter === org ? 'rgba(228,87,46,0.08)' : 'transparent',
                opacity: filter === org ? 1 : 0.65,
              }}
            >
              {org}
            </button>
          ))}
        </motion.div>

        {/* Stamp grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <CertStamp
                  issuer={cert.organization}
                  name={cert.name}
                  date={cert.date}
                  verifyUrl={cert.verificationUrl}
                  delay={inView ? i * 0.08 : 0}
                  index={i}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-sm mt-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {[
            { v: certifications.length,                                           l: 'TOTAL'    },
            { v: new Set(certifications.map(c => c.organization)).size,           l: 'ISSUERS'  },
            { v: '100%',                                                          l: 'VERIFIED' },
          ].map(s => (
            <div
              key={s.l}
              className="border p-3 text-center"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="font-display font-bold text-xl" style={{ color: '#E4572E' }}>
                {s.v}
              </div>
              <div
                className="font-mono-data text-[9px] tracking-widest mt-1"
                style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}
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

export default Certifications;
