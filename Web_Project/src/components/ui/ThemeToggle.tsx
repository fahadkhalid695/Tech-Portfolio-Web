import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full flex items-center justify-center bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-bg-tertiary dark:border-dark-bg-tertiary hover:border-accent-500 transition-all duration-200 overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        initial={false}
      />
      
      {/* Sun icon */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 180,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <Sun className="w-4 h-4 text-amber-500" />
      </motion.div>
      
      {/* Moon icon */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -180,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <Moon className="w-4 h-4 text-cyan-400" />
      </motion.div>
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full bg-accent-500/30"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
