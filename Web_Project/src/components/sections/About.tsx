import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Lightbulb, Heart, X } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showModal, setShowModal] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Parallax effect for portrait
  const portraitY = useTransform(scrollY, [0, 1000], [0, -50]);

  const highlights = [
    {
      icon: <Code className="w-5 h-5" />,
      title: 'What I Build',
      description: 'Intelligent systems that solve real problems — from AI-powered applications to secure cloud infrastructure.',
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: 'How I Think',
      description: 'Analytical yet creative. I break down complex challenges into elegant, scalable solutions.',
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: 'What I Care About',
      description: 'Building technology that matters. Security, efficiency, and user experience are non-negotiable.',
    },
  ];

  const funFacts = [
    { label: 'Coffee consumed', value: '∞ cups' },
    { label: 'Lines of code', value: '10,000+' },
    { label: 'Late night debugging', value: 'Too many' },
    { label: 'Favorite language', value: 'Python & TypeScript' },
    { label: 'Learning style', value: 'Build → Break → Fix' },
    { label: 'Motivation', value: 'Solving impossible problems' },
  ];

  return (
    <section id="about" className="section section-dark relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Portrait */}
            <motion.div
              className="relative"
              style={prefersReducedMotion ? {} : { y: portraitY }}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Animated glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent-500 to-purple-500 opacity-0"
                  animate={inView && !prefersReducedMotion ? {
                    opacity: [0, 0.3, 0],
                    scale: [0.95, 1.05, 0.95],
                  } : {}}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                />

                {/* Portrait card */}
                <motion.div
                  className="relative card-incredible p-2 cursor-pointer"
                  onClick={() => setShowModal(true)}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src="/image/pic.jpg"
                    alt="Fahad Khalid"
                    className="w-full rounded-2xl"
                  />
                  
                  {/* Click hint */}
                  <motion.div
                    className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="text-white font-medium">Click for fun facts →</span>
                  </motion.div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-accent-500/20 rounded-full blur-3xl" />
                <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
              </div>
            </motion.div>

            {/* Right: Text blocks */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.3 }}
            >
              {/* Intro paragraph - line by line */}
              <div className="space-y-4">
                {[
                  "I'm Fahad Khalid, a Computer Science student passionate about building intelligent, secure systems.",
                  "My journey spans AI/ML, cloud architecture, and cybersecurity — always focused on creating solutions that matter.",
                  "I believe in learning by doing, breaking things to understand them, and writing code that solves real problems.",
                ].map((line, index) => (
                  <motion.p
                    key={index}
                    className="text-light-text-secondary dark:text-dark-text-secondary text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.5,
                      delay: 0.4 + index * 0.15,
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Bullet-style highlights */}
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    className="group relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.5,
                      delay: 0.7 + index * 0.1,
                    }}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-500 group-hover:bg-accent-500/20 group-hover:scale-110 transition-all duration-300">
                        {highlight.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2 relative inline-block">
                          {highlight.title}
                          {/* Animated underline */}
                          <motion.div
                            className="absolute -bottom-1 left-0 h-0.5 bg-accent-500"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Personal philosophy */}
              <motion.div
                className="relative p-6 rounded-2xl bg-gradient-to-r from-accent-500/5 to-purple-500/5 border-l-4 border-accent-500"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 1.2 }}
              >
                <p className="text-light-text dark:text-dark-text italic">
                  "Code is poetry. Security is art. Innovation is the bridge between them."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Fun Facts Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="relative w-full max-w-2xl card-incredible p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary hover:bg-accent-500 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
              Fun Facts & Journey
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  className="p-4 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-bg-tertiary dark:border-dark-bg-tertiary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mb-1">
                    {fact.label}
                  </div>
                  <div className="text-lg font-bold text-accent-500">
                    {fact.value}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-accent-500/10 border border-accent-500/20">
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <strong className="text-accent-500">Journey Timeline:</strong> Started coding at 18 → 
                Fell in love with AI/ML → Explored cloud & security → Now building the future, one commit at a time.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default About;
