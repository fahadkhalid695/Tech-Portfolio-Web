import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp, Code, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();
  
  const socialLinks = [
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: 'https://github.com/fahadkhalid695' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/fahad-khalid-aa674430a/' },
    { name: 'Email', icon: <Mail className="w-5 h-5" />, url: 'mailto:fahadkhalid695@gmail.com' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Certificates', href: '#certifications' },
    { name: 'Platforms', href: '#platforms' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-light-bg-secondary dark:bg-dark-bg-secondary border-t border-light-bg-tertiary dark:border-dark-bg-tertiary overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/5 to-transparent pointer-events-none" />
      
      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 w-12 h-12 bg-gradient-to-r from-accent-500 to-purple-500 hover:from-accent-600 hover:to-purple-600 text-white rounded-full shadow-lg shadow-accent-500/25 flex items-center justify-center transition-all duration-300 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                FK
              </div>
              <div>
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                  Fahad Khalid
                </h3>
                <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                  Computer Science Undergraduate
                </p>
              </div>
            </div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed max-w-md">
              Passionate about building intelligent, secure systems. Specializing in AI/ML, 
              Cloud Computing, and Cybersecurity. Always learning, always building.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-light-bg-tertiary dark:bg-dark-bg-tertiary hover:bg-accent-500/20 border border-light-bg-tertiary dark:border-dark-bg-tertiary hover:border-accent-500 flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-500 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: index * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-light-text dark:text-dark-text flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-500" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-500 transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-light-text dark:text-dark-text flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-500" />
              Explore
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(4).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-500 transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-light-bg-tertiary dark:border-dark-bg-tertiary">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.3 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-2 text-light-text-tertiary dark:text-dark-text-tertiary text-sm">
              <span>&copy; {currentYear} Fahad Khalid.</span>
              <span className="hidden sm:inline">Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="hidden sm:inline">and lots of coffee</span>
            </div>
            
            <div className="flex items-center gap-2 text-light-text-tertiary dark:text-dark-text-tertiary text-sm">
              <span>Built with</span>
              <span className="px-2 py-1 bg-accent-500/10 text-accent-500 rounded-full text-xs font-medium">
                React
              </span>
              <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-medium">
                TypeScript
              </span>
              <span className="px-2 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-xs font-medium">
                Tailwind
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
