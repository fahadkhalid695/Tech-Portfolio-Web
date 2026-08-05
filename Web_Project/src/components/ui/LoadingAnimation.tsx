import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingAnimation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#0D2B4E' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          {/* Blueprint grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: [
                'repeating-linear-gradient(0deg, rgba(126,200,227,0.06) 0px, rgba(126,200,227,0.06) 1px, transparent 1px, transparent 40px)',
                'repeating-linear-gradient(90deg, rgba(126,200,227,0.06) 0px, rgba(126,200,227,0.06) 1px, transparent 1px, transparent 40px)',
              ].join(','),
            }}
          />

          {/* Corner marks */}
          {(['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'] as const).map((pos, i) => (
            <motion.div
              key={pos}
              className={`absolute ${pos} w-5 h-5`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line
                  x1={i % 2 === 1 ? 20 : 0} y1={i > 1 ? 20 : 0}
                  x2={i % 2 === 1 ? 11 : 9}  y2={i > 1 ? 20 : 0}
                  stroke="#7EC8E3" strokeWidth="1"
                />
                <line
                  x1={i % 2 === 1 ? 20 : 0} y1={i > 1 ? 20 : 0}
                  x2={i % 2 === 1 ? 20 : 0}  y2={i > 1 ? 11 : 9}
                  stroke="#7EC8E3" strokeWidth="1"
                />
                <circle cx={i % 2 === 1 ? 20 : 0} cy={i > 1 ? 20 : 0} r="1.5" fill="#7EC8E3" />
              </svg>
            </motion.div>
          ))}

          {/* Main content */}
          <div className="text-center relative z-10">
            {/* Sheet label */}
            <motion.div
              className="font-mono-data text-[9px] tracking-widest mb-4"
              style={{ color: '#7EC8E3', opacity: 0.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.2 }}
            >
              INITIALISING · SHEET 01/09
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div
                className="font-display font-bold uppercase"
                style={{
                  fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                  letterSpacing: '0.08em',
                  color: '#EAF4FF',
                }}
              >
                FAHAD{' '}
                <span style={{ color: '#7EC8E3' }}>KHALID</span>
              </div>
            </motion.div>

            {/* Animated underline */}
            <motion.div
              className="mx-auto mt-3 h-px"
              style={{ background: '#7EC8E3', opacity: 0.4 }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            />

            {/* Subtitle */}
            <motion.div
              className="font-mono-data text-[10px] tracking-widest mt-3"
              style={{ color: '#7EC8E3', opacity: 0.55 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ delay: 0.9 }}
            >
              CS · AI · CLOUD · CYBERSECURITY
            </motion.div>

            {/* Loading dots */}
            <motion.div
              className="flex justify-center gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5"
                  style={{ background: '#7EC8E3' }}
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.22 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
