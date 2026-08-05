/**
 * CertStamp — ink-stamp style certification badge.
 *
 * On scroll into view: scales from 1.15 → 1.0 with a bounce (stamping-down),
 * rotated ~-8deg, accent-stamp color, mix-blend-mode: multiply (light) / normal (dark).
 *
 * Reduced-motion: simple opacity fade only.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from '../../utils/animations';

interface CertStampProps {
  /** Issuer short name shown in ring (e.g. "AWS", "Google") */
  issuer: string;
  /** Cert name shown inside */
  name: string;
  /** Date shown at bottom */
  date: string;
  /** Optional verification URL */
  verifyUrl?: string;
  /** Stagger delay in seconds */
  delay?: number;
  /** Accent colour override — defaults to accent-stamp #E4572E */
  color?: string;
  /** Show "APPROVED" text across the stamp */
  approved?: boolean;
  index?: number;
}

const CertStamp: React.FC<CertStampProps> = ({
  issuer,
  name,
  date,
  verifyUrl,
  delay = 0,
  color = '#E4572E',
  approved = true,
  index = 0,
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const stampVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2, delay } },
      }
    : {
        hidden: { opacity: 0, scale: 1.18, rotate: -9 },
        visible: {
          opacity: 1,
          scale: 1,
          rotate: -8,
          transition: {
            delay,
            duration: 0.38,
            ease: [0.175, 0.885, 0.32, 1.275],
          },
        },
      };

  const Wrapper = verifyUrl ? 'a' : 'div';
  const wrapperProps = verifyUrl
    ? { href: verifyUrl, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Verify ${name}` }
    : {};

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stampVariants}
      className="inline-flex"
    >
      {/* @ts-ignore — polymorphic wrapper */}
      <Wrapper {...wrapperProps} className="block">
        <div
          className="relative flex flex-col items-center justify-center p-4 cursor-pointer select-none"
          style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            border: `3px solid ${color}`,
            color,
            mixBlendMode: 'normal',
          }}
        >
          {/* Outer ring label */}
          <svg
            viewBox="0 0 160 160"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <path
                id={`arc-top-${index}`}
                d="M 20,80 A 60,60 0 0,1 140,80"
              />
              <path
                id={`arc-bottom-${index}`}
                d="M 140,80 A 60,60 0 0,1 20,80"
              />
            </defs>
            <text fontSize="10" fontFamily="JetBrains Mono, monospace" fill={color} opacity="0.8" letterSpacing="3">
              <textPath href={`#arc-top-${index}`} startOffset="50%" textAnchor="middle">
                {issuer.toUpperCase()}
              </textPath>
            </text>
            <text fontSize="9" fontFamily="JetBrains Mono, monospace" fill={color} opacity="0.6" letterSpacing="2">
              <textPath href={`#arc-bottom-${index}`} startOffset="50%" textAnchor="middle">
                {date.toUpperCase()}
              </textPath>
            </text>
            {/* Inner dashed ring */}
            <circle cx="80" cy="80" r="55" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
          </svg>

          {/* Centre content */}
          <div className="relative z-10 flex flex-col items-center text-center gap-1 px-3">
            {approved && (
              <span
                className="font-mono-data font-bold tracking-widest text-[9px] opacity-70"
                style={{ letterSpacing: '0.2em' }}
              >
                VERIFIED
              </span>
            )}
            <span
              className="font-display font-bold text-[11px] leading-tight text-center"
              style={{ maxWidth: 90 }}
            >
              {name.length > 28 ? name.slice(0, 26) + '…' : name}
            </span>
          </div>

          {/* Hover: slight scale */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            whileHover={prefersReducedMotion ? {} : { scale: 1.04 }}
            style={{ border: `1px solid ${color}`, opacity: 0.2, borderRadius: '50%' }}
          />
        </div>
      </Wrapper>
    </motion.div>
  );
};

export default CertStamp;
