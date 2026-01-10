import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * Scroll progress indicator at the top of the page
 */
const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-accent-500 to-purple-500 origin-left transition-transform duration-150"
      style={{ transform: `scaleX(${progress / 100})` }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
