import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, MapPin, Calendar, GraduationCap, ExternalLink, Code, Brain, Shield, Cloud, Sparkles } from 'lucide-react';
import { getResumeUrl, getResumeAction } from '../../data/personalInfo';
import MagneticButton from '../ui/MagneticButton';
import { 
  staggerContainer, 
  staggerItem, 
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  useReducedMotion 
} from '../../utils/animations';

// ═══════════════════════════════════════════════════════════════════════════
// ABOUT SECTION - Two-column layout with glassmorphism card
// Features: animated ring-glow portrait, staggered reveals, scroll-triggered
// ═══════════════════════════════════════════════════════════════════════════

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const prefersReducedMotion = useReducedMotion();
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = [
    { label: 'Years Learning', value: '2+', icon: <Calendar size={20} />, color: 'accent' },
    { label: 'Projects Built', value: '5+', icon: <GraduationCap size={20} />, color: 'purple' },
    { label: 'Technologies', value: '20+', icon: <Code size={20} />, color: 'success' },
  ];

  const highlights = [
    { text: 'AI/ML systems that solve real problems', icon: <Brain size={16} /> },
    { text: 'Scalable cloud infrastructure on AWS & Azure', icon: <Cloud size={16} /> },
    { text: 'Security-first development approach', icon: <Shield size={16} /> },
    { text: 'Clean, maintainable code', icon: <Code size={16} /> },
  ];

  return (
    <section 
      id="about" 
      className="py-20 lg:py-32 section-secondary relative overflow-hidden"
      aria-label="About me"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer(0.1)}
          className="text-center mb-16"
        >
          <motion.span 
            variants={staggerItem}
            className="inline-block px-4 py-2 rounded-full bg-accent-500/10 text-accent-500 text-sm font-medium mb-4"
          >
            Get to Know Me
          </motion.span>
          
          <motion.h2 
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          
          <motion.p 
            variants={staggerItem}
            className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            Passionate about technology, innovation, and creating solutions that make a difference.
          </motion.p>
        </motion.div>
        
        {/* Main Content - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Column - Portrait */}
          <motion.div 
            className="relative flex justify-center lg:justify-start"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInLeft}
          >
            <div className="relative">
              {/* Background glow */}
              <motion.div 
                className="absolute -inset-8 bg-gradient-to-r from-accent-500/20 via-purple-500/20 to-accent-500/20 rounded-full blur-3xl"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Portrait container with ring glow */}
              <div className="relative">
                <motion.div 
                  className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden ring-glow"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/image/pic.jpg" 
                    alt="Fahad Khalid" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
                
                {/* Floating badge */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500 to-purple-500 flex items-center justify-center shadow-xl"
                  animate={prefersReducedMotion ? {} : { 
                    y: [0, -8, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white font-bold text-lg">CS</span>
                </motion.div>
                
                {/* Second floating element */}
                <motion.div 
                  className="absolute -top-2 -left-2 w-12 h-12 rounded-xl bg-success-500/20 backdrop-blur-sm flex items-center justify-center border border-success-500/30"
                  animate={prefersReducedMotion ? {} : { 
                    y: [0, 8, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <Sparkles className="w-5 h-5 text-success-500" />
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Content */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer(0.1, 0.3)}
          >
            <motion.div variants={staggerItem}>
              <h3 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                Computer Science Undergraduate
              </h3>
              <p className="text-accent-500 font-medium text-lg">
                Tech Enthusiast & Problem Solver
              </p>
            </motion.div>
            
            <motion.p 
              variants={staggerItem}
              className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
            >
              I'm a dedicated Computer Science student with a passion for exploring the intersection of 
              technology and innovation. My journey has been focused on developing expertise in{' '}
              <span className="text-accent-500 font-medium">AI/ML</span>,{' '}
              <span className="text-purple-400 font-medium">cloud computing</span>, and{' '}
              <span className="text-success-500 font-medium">cybersecurity</span>.
            </motion.p>
            
            <motion.p 
              variants={staggerItem}
              className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
            >
              I believe in continuous learning and applying theoretical knowledge to practical solutions. 
              My approach combines analytical thinking with creative problem-solving to develop efficient, 
              scalable, and secure applications.
            </motion.p>
            
            {/* Highlights with hover effect */}
            <motion.div variants={staggerItem} className="space-y-3 pt-2">
              <h4 className="text-sm font-semibold text-light-text dark:text-dark-text uppercase tracking-wider">
                What I Build
              </h4>
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-light-text-secondary dark:text-dark-text-secondary group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-accent-500 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="underline-grow">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTAs */}
            <motion.div 
              variants={staggerItem}
              className="flex flex-wrap gap-4 pt-4"
            >
              <MagneticButton 
                href="#contact" 
                className="btn-premium"
                strength={0.3}
                aria-label="Get in touch"
              >
                <span className="relative z-10">Get In Touch</span>
              </MagneticButton>
              
              <MagneticButton 
                href={getResumeUrl()}
                target={getResumeAction().target}
                className="btn-secondary"
                strength={0.3}
                aria-label={getResumeAction().action === 'view' ? 'View resume' : 'Download resume'}
              >
                <span className="flex items-center gap-2">
                  {getResumeAction().action === 'view' ? (
                    <>
                      <ExternalLink size={16} />
                      View Resume
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Download Resume
                    </>
                  )}
                </span>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div 
          className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer(0.1, 0.6)}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="card-glass text-center p-4 sm:p-6 group cursor-default"
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
              whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className={`flex justify-center mb-3 ${
                  stat.color === 'accent' ? 'text-accent-500' :
                  stat.color === 'purple' ? 'text-purple-400' : 'text-success-500'
                }`}
                animate={hoveredStat === index && !prefersReducedMotion ? { 
                  scale: 1.2, 
                  rotate: 360 
                } : { 
                  scale: 1, 
                  rotate: 0 
                }}
                transition={{ duration: 0.4 }}
              >
                {stat.icon}
              </motion.div>
              
              <motion.div 
                className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-1"
                animate={hoveredStat === index && !prefersReducedMotion ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {stat.value}
              </motion.div>
              
              <div className="text-xs sm:text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
