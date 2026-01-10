import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getResumeUrl } from '../../data/personalInfo';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const prefersReducedMotion = useReducedMotion();

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/fahadkhalid695', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/fahad-khalid-aa674430a/', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:fahadkhalid695@gmail.com', label: 'Email' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-bg via-light-bg-secondary to-light-bg-tertiary dark:from-dark-bg dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
        {/* Slow animated gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={prefersReducedMotion ? {} : {
            background: [
              'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
      </div>

      <motion.div
        className="container-custom relative z-10"
        style={{ opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text, CTAs, Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.2 }}
          >
            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
            >
              <span className="text-light-text dark:text-dark-text">
                Building secure,{' '}
              </span>
              <span className="gradient-text-premium">
                intelligent systems.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.div
              className="flex items-center gap-4 mb-8 text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.45 }}
            >
              <span className="font-medium">AI</span>
              <span className="w-1 h-1 rounded-full bg-accent-500" />
              <span className="font-medium">Cloud</span>
              <span className="w-1 h-1 rounded-full bg-accent-500" />
              <span className="font-medium">Cybersecurity</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.6 }}
            >
              {/* Primary CTA */}
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-purple-500 text-white rounded-2xl font-semibold overflow-hidden shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 transition-all duration-300"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">View Projects</span>
                <motion.div
                  className="relative z-10"
                  animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href={getResumeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-light-bg-secondary dark:bg-dark-bg-secondary border-2 border-light-bg-tertiary dark:border-dark-bg-tertiary hover:border-accent-500 text-light-text dark:text-dark-text rounded-2xl font-semibold overflow-hidden transition-all duration-300"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Download Resume</span>
                <Download className="w-5 h-5 relative z-10" />
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-accent-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </motion.a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.75 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-bg-tertiary dark:border-dark-bg-tertiary hover:border-accent-500 hover:bg-accent-500/10 text-light-text dark:text-dark-text hover:text-accent-500 transition-all duration-300"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: 0.85 + index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Visual Identity Block */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
          >
            {/* Floating card */}
            <motion.div
              className="relative card-incredible p-8 backdrop-blur-xl"
              animate={prefersReducedMotion ? {} : {
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Portrait */}
              <div className="relative mb-6">
                <div className="relative w-48 h-48 mx-auto">
                  {/* Animated ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-500 to-purple-500 opacity-20 blur-xl"
                    animate={prefersReducedMotion ? {} : {
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  <img
                    src="/image/pic.jpg"
                    alt="Fahad Khalid"
                    className="relative w-full h-full rounded-full object-cover border-4 border-light-bg dark:border-dark-bg shadow-2xl"
                  />
                </div>
              </div>

              {/* Mini CV */}
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                  Fahad Khalid
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Computer Science Undergraduate
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-500">5+</div>
                    <div className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">20+</div>
                    <div className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-500">5+</div>
                    <div className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">Certs</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
