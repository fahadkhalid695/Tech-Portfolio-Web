import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import { getResumeUrl, getResumeAction, personalInfo } from '../../data/personalInfo';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  staggerItem,
  floating,
  useReducedMotion 
} from '../../utils/animations';

// ═══════════════════════════════════════════════════════════════════════════
// HERO SECTION - Two-column split layout
// Left: Headline + CTAs + social icons
// Right: Floating card with portrait/interactive element
// ═══════════════════════════════════════════════════════════════════════════

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  const resumeUrl = getResumeUrl();
  const resumeAction = getResumeAction();

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 lg:pt-28"
      aria-label="Hero section"
    >
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 section-primary"
        style={{ y: prefersReducedMotion ? 0 : y2 }}
      >
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={prefersReducedMotion ? {} : {
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          
          {/* Light theme gradient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full light:opacity-30 dark:opacity-0"
            style={{
              background: 'radial-gradient(circle, rgba(11, 99, 255, 0.1) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div 
        className="container-custom relative z-10 px-4 sm:px-6 lg:px-8"
        style={{ y: prefersReducedMotion ? 0 : y1, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          
          {/* Left Column - Text Content */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting */}
            <motion.p 
              variants={staggerItem}
              className="text-base sm:text-lg text-light-text-secondary dark:text-dark-text-secondary mb-4 font-medium"
            >
              <span className="inline-block mr-2">👋</span>
              Hi, I'm
            </motion.p>
            
            {/* Name */}
            <motion.h1 
              variants={staggerItem}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="text-light-text dark:text-dark-text">Fahad </span>
              <span className="gradient-text-animated">Khalid</span>
            </motion.h1>
            
            {/* Headline */}
            <motion.h2 
              variants={staggerItem}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-light-text dark:text-dark-text mb-4"
            >
              Building secure, intelligent systems.
            </motion.h2>
            
            {/* Word swap subtitle */}
            <motion.div variants={staggerItem} className="h-10 mb-6">
              <WordSwap 
                words={['AI/ML Developer', 'Cloud Architect', 'Security Engineer', 'Full Stack Developer']}
              />
            </motion.div>
            
            {/* Subline */}
            <motion.p 
              variants={staggerItem}
              className="text-base sm:text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Computer Science undergraduate passionate about building scalable cloud solutions, 
              intelligent AI systems, and secure infrastructure.
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              variants={staggerItem}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <MagneticButton 
                href="#projects" 
                className="btn-premium group"
                strength={0.3}
                aria-label="View my projects"
              >
                <span className="relative z-10 flex items-center gap-2">
                  See My Work
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0, opacity: 0 }}
                    whileHover={{ x: 4, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </span>
              </MagneticButton>
              
              <MagneticButton 
                href={resumeUrl}
                target={resumeAction.target}
                className="btn-secondary group"
                strength={0.3}
                aria-label={resumeAction.action === 'view' ? 'View resume' : 'Download resume'}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {resumeAction.action === 'view' ? (
                    <>
                      View Resume
                      <ExternalLink size={16} />
                    </>
                  ) : (
                    <>
                      Download Resume
                      <Download size={16} />
                    </>
                  )}
                </span>
              </MagneticButton>
            </motion.div>
            
            {/* Social Icons */}
            <motion.div 
              variants={staggerItem}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <SocialIcon 
                href={personalInfo.social.github}
                icon={<Github size={20} />}
                label="GitHub"
              />
              <SocialIcon 
                href={personalInfo.social.linkedin}
                icon={<Linkedin size={20} />}
                label="LinkedIn"
              />
              <SocialIcon 
                href={`mailto:${personalInfo.contact.email}`}
                icon={<Mail size={20} />}
                label="Email"
              />
            </motion.div>
          </motion.div>
          
          {/* Right Column - Floating Visual */}
          <motion.div 
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            <FloatingCard prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
      >
        <a 
          href="#about" 
          className="flex flex-col items-center gap-2 text-light-text-tertiary dark:text-dark-text-tertiary hover:text-accent-500 dark:hover:text-accent-500 transition-colors duration-300"
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={24} />
        </a>
      </motion.div>
      
      {/* Floating particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                background: i % 2 === 0 
                  ? 'rgba(0, 212, 255, 0.4)' 
                  : 'rgba(168, 85, 247, 0.4)',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// WORD SWAP COMPONENT - Animated word rotation
// ─────────────────────────────────────────────────────────────────────────────

interface WordSwapProps {
  words: string[];
  interval?: number;
}

const WordSwap: React.FC<WordSwapProps> = ({ words, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className="relative h-full flex items-center justify-center lg:justify-start overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.9, 0.2, 1] }}
          className="text-lg sm:text-xl text-accent-500 dark:text-accent-500 font-medium"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING CARD COMPONENT - Interactive visual element
// ─────────────────────────────────────────────────────────────────────────────

interface FloatingCardProps {
  prefersReducedMotion: boolean;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ prefersReducedMotion }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative"
      animate={prefersReducedMotion ? {} : {
        y: [0, -15, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[450px] card-glass p-6 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.2, 0.9, 0.2, 1] }}
      >
        {/* Profile image placeholder / Avatar */}
        <div className="relative w-full h-48 sm:h-56 lg:h-64 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-accent-500/20 to-purple-500/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full ring-glow bg-gradient-to-br from-accent-500 to-purple-500 flex items-center justify-center">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">FK</span>
            </div>
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-accent-500/30"
            animate={prefersReducedMotion ? {} : { rotate: [0, 90, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-purple-500/30"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Mini CV info */}
        <div className="space-y-2" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
            Quick Stats
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent-500/20 text-accent-500">
              AI/ML
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400">
              Cloud
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-success-500/20 text-success-500">
              Security
            </span>
          </div>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            5+ Projects • 3+ Certifications
          </p>
        </div>
        
        {/* Hover effect overlay */}
        <motion.div 
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 50}% ${50 + mousePosition.y * 50}%, rgba(0, 212, 255, 0.15), transparent 50%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      {/* Background glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-accent-500/20 to-purple-500/20 blur-2xl -z-10 opacity-60" />
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL ICON COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, label }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary hover:bg-accent-500 hover:text-white dark:hover:bg-accent-500 transition-colors duration-300"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
};

export default Hero;