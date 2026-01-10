import { useRef, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface TiltOptions {
  max?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

/**
 * Hook for 3D tilt effect on mouse move
 * Automatically disabled if user prefers reduced motion
 */
export const use3DTilt = (options: TiltOptions = {}) => {
  const {
    max = 15,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * max;
      const rotateY = ((centerX - x) / centerX) * max;

      element.style.transform = `
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
    };

    const handleMouseLeave = () => {
      element.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    };

    element.style.transition = `transform ${speed}ms cubic-bezier(0.2, 0.9, 0.2, 1)`;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [max, perspective, scale, speed, prefersReducedMotion]);

  return ref;
};
