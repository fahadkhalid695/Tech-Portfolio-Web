import { Variants, Transition, useReducedMotion as useFramerReducedMotion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION UTILITIES
// Modern animation variants and helpers for consistent motion design
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// EASING FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const easing = {
  // Primary easing - smooth and natural
  default: [0.2, 0.9, 0.2, 1] as const,
  // Ease out - quick start, slow end (for entrances)
  out: [0, 0, 0.2, 1] as const,
  // Ease in - slow start, quick end (for exits)
  in: [0.4, 0, 1, 1] as const,
  // Bounce - playful overshoot
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  // Spring-like
  spring: [0.43, 0.13, 0.23, 0.96] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// DURATION PRESETS
// ─────────────────────────────────────────────────────────────────────────────

export const duration = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
  slowest: 1,
};

// ─────────────────────────────────────────────────────────────────────────────
// TRANSITION PRESETS
// ─────────────────────────────────────────────────────────────────────────────

export const transition: Record<string, Transition> = {
  default: {
    duration: duration.normal,
    ease: easing.default,
  },
  fast: {
    duration: duration.fast,
    ease: easing.default,
  },
  slow: {
    duration: duration.slow,
    ease: easing.default,
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  springBouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  },
  springGentle: {
    type: 'spring',
    stiffness: 200,
    damping: 35,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fade in with upward motion - most common entrance animation
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.default,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: duration.fast,
      ease: easing.in,
    },
  },
};

/**
 * Fade in with downward motion
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.default,
    },
  },
};

/**
 * Fade in from left
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slow,
      ease: easing.default,
    },
  },
};

/**
 * Fade in from right
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slow,
      ease: easing.default,
    },
  },
};

/**
 * Simple fade
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.normal,
      ease: easing.default,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: duration.fast,
    },
  },
};

/**
 * Scale in with fade
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.default,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: duration.fast,
    },
  },
};

/**
 * Bounce in effect
 */
export const bounceIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  },
};

/**
 * Stagger container - use as parent for staggered children
 */
export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Stagger children item - use as child inside stagger container
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.default,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HOVER ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scale on hover with lift effect
 */
export const hoverScale = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: duration.fast,
    ease: easing.default,
  },
};

/**
 * Hover tap animation for buttons
 */
export const hoverTap = {
  whileHover: {
    scale: 1.02,
    y: -2,
  },
  whileTap: {
    scale: 0.98,
  },
  transition: {
    duration: duration.fast,
    ease: easing.default,
  },
};

/**
 * Glow effect on hover (use with CSS shadow)
 */
export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)',
  },
  transition: {
    duration: duration.normal,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SPECIAL ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Floating animation - continuous gentle motion
 */
export const floating: Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-1, 1, -1],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/**
 * Pulse animation
 */
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/**
 * Timeline marker bounce
 */
export const timelineBounce: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 15,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D TILT HELPER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate 3D tilt transform based on mouse position
 * @param x - Mouse X position relative to element center (-1 to 1)
 * @param y - Mouse Y position relative to element center (-1 to 1)
 * @param maxTilt - Maximum tilt angle in degrees
 */
export const calculate3DTilt = (
  x: number,
  y: number,
  maxTilt: number = 10
): { rotateX: number; rotateY: number } => {
  return {
    rotateX: y * maxTilt * -1, // Invert Y for natural feel
    rotateY: x * maxTilt,
  };
};

/**
 * Get 3D tilt style object for inline styles
 */
export const get3DTiltStyle = (
  rotateX: number,
  rotateY: number
): React.CSSProperties => ({
  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  transformStyle: 'preserve-3d',
});

// ─────────────────────────────────────────────────────────────────────────────
// REDUCED MOTION SUPPORT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Custom hook that returns reduced motion preference
 * Use this to conditionally apply animations
 */
export const useReducedMotion = (): boolean => {
  const prefersReducedMotion = useFramerReducedMotion();
  return prefersReducedMotion === true;
};

/**
 * Get animation variants with reduced motion fallback
 * Returns instant transitions when user prefers reduced motion
 */
export const getMotionVariants = (
  variants: Variants,
  prefersReducedMotion: boolean
): Variants => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.01 }
      },
      exit: { 
        opacity: 0,
        transition: { duration: 0.01 }
      },
    };
  }
  return variants;
};

/**
 * Create reduced motion safe variants
 */
export const createSafeVariants = (variants: Variants): Variants => {
  // These variants automatically respect prefers-reduced-motion
  // through Framer Motion's built-in support
  return variants;
};

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL ANIMATION HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Viewport options for scroll-triggered animations
 */
export const viewportConfig = {
  once: true,
  margin: '-100px',
  amount: 0.2,
};

/**
 * Viewport options for elements that should animate every time
 */
export const viewportConfigRepeat = {
  once: false,
  margin: '-50px',
  amount: 0.3,
};

// ─────────────────────────────────────────────────────────────────────────────
// WORD/CHARACTER ANIMATION HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Split text into words for animation
 */
export const splitTextIntoWords = (text: string): string[] => {
  return text.split(' ');
};

/**
 * Split text into characters for animation
 */
export const splitTextIntoChars = (text: string): string[] => {
  return text.split('');
};

/**
 * Word animation variants
 */
export const wordAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: duration.normal,
      ease: easing.default,
    },
  }),
};

/**
 * Character animation variants
 */
export const charAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.02,
      duration: duration.fast,
      ease: easing.default,
    },
  }),
};
