import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { getResumeUrl } from '../../data/personalInfo';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Floating resume button that appears when user scrolls to bottom
 */
const FloatingResume: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show when user is near bottom (80% scrolled)
      const threshold = documentHeight * 0.8;
      setIsVisible(scrollPosition >= threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = () => {
    window.open(getResumeUrl(), '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: [0.2, 0.9, 0.2, 1],
          }}
          className="fixed bottom-8 right-8 z-40"
        >
          <button
            onClick={handleDownload}
            className="group relative flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-accent-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-accent-500/50 transition-all duration-300 hover:scale-105"
            aria-label="Download Resume"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <FileText className="w-5 h-5 relative z-10" />
            <span className="font-semibold text-sm relative z-10">Resume</span>
            <Download className="w-4 h-4 relative z-10 group-hover:animate-bounce" />
            
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-accent-500 animate-ping opacity-20" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingResume;
