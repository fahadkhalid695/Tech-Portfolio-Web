import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Home, User, Briefcase, Award, Mail, Trophy, Globe, GraduationCap } from 'lucide-react';
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
    { name: 'Home', href: '#home', icon: <Home size={20} /> },
    { name: 'About', href: '#about', icon: <User size={20} /> },
    { name: 'Experience', href: '#experience', icon: <Briefcase size={20} /> },
    { name: 'Skills', href: '#skills', icon: <Code size={20} /> },
    { name: 'Projects', href: '#projects', icon: <GraduationCap size={20} /> },
    { name: 'Hackathons', href: '#hackathons', icon: <Trophy size={20} /> },
    { name: 'Certifications', href: '#certifications', icon: <Award size={20} /> },
    { name: 'Platforms', href: '#platforms', icon: <Globe size={20} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={20} /> },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-md py-2 shadow-lg border-b border-light-bg-tertiary dark:border-dark-bg-tertiary' 
          : 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <span className="text-primary-500 text-2xl font-bold">FK</span>
            <span className="ml-2 text-light text-xl font-semibold hidden sm:inline-block">Fahad Khalid</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-light-text dark:text-dark-text hover:text-primary-500 transition-colors duration-300 font-medium text-sm px-2 py-1 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-light-text dark:text-dark-text hover:text-primary-500 transition-colors duration-300 p-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
        className="md:hidden bg-light-bg-secondary dark:bg-dark-bg-secondary border-t border-light-bg-tertiary dark:border-dark-bg-tertiary shadow-lg"
      >
        <div className="container-custom py-4">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center text-light-text dark:text-dark-text hover:text-primary-500 py-2 px-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-2">{link.icon}</span>
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