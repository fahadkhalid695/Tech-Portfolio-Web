import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Cloud, Brain, Wrench, Shield, ChevronDown, Sparkles } from 'lucide-react';
import { skills } from '../../data/skills';
import {
  staggerContainer,
  staggerItem,
  useReducedMotion,
} from '../../utils/animations';

// ═══════════════════════════════════════════════════════════════════════════
// SKILLS SECTION - Interactive category cards with expand/collapse
// Features: progress indicators, project context tooltips, staggered entries
// ═══════════════════════════════════════════════════════════════════════════

interface CategoryConfig {
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
  progressColor: string;
  glowColor: string;
}

const getCategoryConfig = (category: string): CategoryConfig => {
  const configs: Record<string, CategoryConfig> = {
    Programming: {
      icon: <Code size={24} />,
      gradient: 'from-accent-500 to-blue-600',
      textColor: 'text-accent-500',
      progressColor: 'bg-accent-500',
      glowColor: 'rgba(0, 212, 255, 0.3)',
    },
    Cloud: {
      icon: <Cloud size={24} />,
      gradient: 'from-success-500 to-emerald-600',
      textColor: 'text-success-500',
      progressColor: 'bg-success-500',
      glowColor: 'rgba(16, 185, 129, 0.3)',
    },
    'AI/ML': {
      icon: <Brain size={24} />,
      gradient: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-400',
      progressColor: 'bg-purple-500',
      glowColor: 'rgba(168, 85, 247, 0.3)',
    },
    Security: {
      icon: <Shield size={24} />,
      gradient: 'from-orange-500 to-red-600',
      textColor: 'text-orange-400',
      progressColor: 'bg-orange-500',
      glowColor: 'rgba(249, 115, 22, 0.3)',
    },
    Tools: {
      icon: <Wrench size={24} />,
      gradient: 'from-slate-400 to-slate-600',
      textColor: 'text-slate-400',
      progressColor: 'bg-slate-500',
      glowColor: 'rgba(148, 163, 184, 0.3)',
    },
  };
  return configs[category] || configs.Tools;
};

const getLevelPercentage = (level: string): number => {
  switch (level) {
    case 'Advanced':
      return 90;
    case 'Intermediate':
      return 65;
    case 'Beginner':
      return 35;
    default:
      return 35;
  }
};

const getLevelLabel = (level: string): string => {
  switch (level) {
    case 'Advanced':
      return 'Expert';
    case 'Intermediate':
      return 'Proficient';
    case 'Beginner':
      return 'Learning';
    default:
      return 'Learning';
  }
};

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const prefersReducedMotion = useReducedMotion();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Group skills by category
  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <section
      id="skills"
      className="py-20 lg:py-32 section-primary relative overflow-hidden"
      aria-label="Skills and technologies"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1)}
          className="text-center mb-16"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block px-4 py-2 rounded-full bg-accent-500/10 text-accent-500 text-sm font-medium mb-4"
          >
            Technical Expertise
          </motion.span>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            A comprehensive toolkit built through continuous learning and hands-on projects.
          </motion.p>
        </motion.div>

        {/* Category Cards Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1, 0.3)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {Object.entries(skillCategories).map(([category, categorySkills]) => {
            const config = getCategoryConfig(category);
            const isExpanded = expandedCategory === category;
            const advancedCount = categorySkills.filter(s => s.level === 'Advanced').length;

            return (
              <motion.div
                key={category}
                variants={staggerItem}
                className="card-incredible cursor-pointer"
                onClick={() => toggleCategory(category)}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: isExpanded ? `0 0 40px ${config.glowColor}` : undefined,
                }}
              >
                <div className="p-6">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} text-white`}
                      >
                        {config.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-light-text dark:text-dark-text">
                          {category}
                        </h3>
                        <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                          {categorySkills.length} skills • {advancedCount} advanced
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown
                        size={20}
                        className="text-light-text-tertiary dark:text-dark-text-tertiary"
                      />
                    </motion.div>
                  </div>

                  {/* Quick Preview (collapsed) */}
                  {!isExpanded && (
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill.id}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            skill.level === 'Advanced'
                              ? `bg-gradient-to-r ${config.gradient} text-white`
                              : 'bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary'
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                      {categorySkills.length > 4 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-tertiary dark:text-dark-text-tertiary">
                          +{categorySkills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Expanded Skills List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 mt-4"
                      >
                        {categorySkills.map((skill, index) => (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-light-text dark:text-dark-text font-medium">
                                {skill.name}
                              </span>
                              <span
                                className={`text-xs font-medium ${config.textColor}`}
                              >
                                {getLevelLabel(skill.level)}
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-2 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${config.progressColor} rounded-full relative`}
                                initial={{ width: 0 }}
                                animate={{ width: `${getLevelPercentage(skill.level)}%` }}
                                transition={{
                                  duration: 1,
                                  delay: index * 0.1,
                                  ease: [0.2, 0.9, 0.2, 1],
                                }}
                              >
                                {/* Shimmer effect on hover */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                  initial={{ x: '-100%' }}
                                  whileHover={{ x: '100%' }}
                                  transition={{ duration: 0.6 }}
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1, 0.8)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            {
              value: skills.filter((s) => s.level === 'Advanced').length,
              label: 'Advanced',
              color: 'text-accent-500',
            },
            {
              value: skills.filter((s) => s.level === 'Intermediate').length,
              label: 'Intermediate',
              color: 'text-purple-400',
            },
            {
              value: Object.keys(skillCategories).length,
              label: 'Categories',
              color: 'text-success-500',
            },
            {
              value: skills.length,
              label: 'Total Skills',
              color: 'text-orange-400',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="card-glass text-center p-4 sm:p-6"
            >
              <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expandable hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-8 text-sm text-light-text-tertiary dark:text-dark-text-tertiary flex items-center justify-center gap-2"
        >
          <Sparkles size={14} />
          Click any category to see detailed skills
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;