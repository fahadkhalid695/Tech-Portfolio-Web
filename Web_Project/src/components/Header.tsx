import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Home, User, Briefcase, Award, Mail, Trophy, Globe, GraduationCap, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from './ui/ThemeToggle';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: <Home size={18} /> },
    { name: 'About', href: '#about', icon: <User size={18} /> },
    { name: 'Experience', href: '#experience', icon: <Briefcase size={18} /> },
    { name: 'Skills', href: '#skills', icon: <Code size={18} /> },
    { name: 'Projects', href: '#projects', icon: <GraduationCap size={18} /> },
    { name: 'Hackathons', href: '#hackathons', icon: <Trophy size={18} /> },
    { name: 'Certifications', href: '#certifications', icon: <Award size={18} /> },
    { name: 'Badges', href: '#badges', icon: <Medal size={18} /> },
    { name: 'Platforms', href: '#platforms', icon: <Globe size={18} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={18} /> },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-md py-2 shadow-lg border-b border-light-bg-tertiary dark:border-dark-bg-tertiary' 
          : 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container-custom px-4">
        <div className="flex justify-between items-center">
          {/* Logo - Fahad Khalid on one line */}
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <span className="text-accent-500 text-xl font-bold">FK</span>
            <span className="text-light-text dark:text-dark-text text-base font-semibold whitespace-nowrap">Fahad Khalid</span>
          </motion.a>

          {/* Desktop Navigation - Compact and pushed right */}
          <nav className="hidden lg:flex items-center gap-1 ml-auto">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-light-text dark:text-dark-text hover:text-accent-500 transition-colors duration-200 font-medium text-xs px-2 py-1.5 rounded-md hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                {link.name}
              </motion.a>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-light-text dark:text-dark-text hover:text-accent-500 transition-colors duration-200 p-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0, 
          opacity: isOpen ? 1 : 0,
          display: isOpen ? 'block' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden bg-light-bg-secondary dark:bg-dark-bg-secondary border-t border-light-bg-tertiary dark:border-dark-bg-tertiary shadow-lg"
      >
        <div className="container-custom py-3 px-4">
          <nav className="grid grid-cols-2 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center text-light-text dark:text-dark-text hover:text-accent-500 py-2 px-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition-colors duration-200 text-sm"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-2 opacity-60">{link.icon}</span>
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;