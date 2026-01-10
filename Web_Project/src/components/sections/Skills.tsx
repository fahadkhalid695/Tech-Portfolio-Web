import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Cloud, Brain, Shield, Layers, ChevronDown } from 'lucide-react';
import { skills } from '../../data/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Group skills by category
  const skillGroups = {
    'Frontend': skills.filter(s => ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind'].includes(s.name)),
    'Backend': skills.filter(s => ['Python', 'Node.js', 'FastAPI', 'REST APIs'].includes(s.name)),
    'Cloud': skills.filter(s => ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'].includes(s.name)),
    'Security': skills.filter(s => ['Cybersecurity', 'Penetration Testing', 'Network Security'].includes(s.name)),
    'AI/ML': skills.filter(s => ['Machine Learning', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Pandas', 'NumPy'].includes(s.name)),
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      'Frontend': <Code className="w-6 h-6" />,
      'Backend': <Layers className="w-6 h-6" />,
      'Cloud': <Cloud className="w-6 h-6" />,
      'Security': <Shield className="w-6 h-6" />,
      'AI/ML': <Brain className="w-6 h-6" />,
    };
    return icons[category] || <Code className="w-6 h-6" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Frontend': 'accent',
      'Backend': 'purple',
      'Cloud': 'cyan',
      'Security': 'yellow',
      'AI/ML': 'pink',
    };
    return colors[category] || 'accent';
  };

  const getProficiencyWidth = (level: string) => {
    const widths: Record<string, string> = {
      'Advanced': '90%',
      'Intermediate': '70%',
      'Beginner': '40%',
    };
    return widths[level] || '50%';
  };

  return (
    <section id="skills" className="section section-light">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="gradient-text-premium mb-4">Skills & Expertise</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Depth over breadth. These are the tools I actually use to build real solutions.
          </p>
        </motion.div>

        {/* Interactive skill group cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillGroups).map(([category, categorySkills], index) => {
            const isExpanded = expandedCard === category;
            const color = getCategoryColor(category);

            return (
              <motion.div
                key={category}
                className={`relative card-incredible p-6 cursor-pointer transition-all duration-500 ${
                  activeSkill === category ? 'ring-2 ring-accent-500' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: index * 0.1,
                }}
                whileHover={prefersReducedMotion ? {} : {
                  y: -8,
                  scale: 1.02,
                }}
                onClick={() => setExpandedCard(isExpanded ? null : category)}
                onMouseEnter={() => setActiveSkill(category)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                {/* Subtle background glow for active card */}
                {activeSkill === category && (
                  <motion.div
                    className="absolute inset-0 bg-accent-500/5 rounded-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center text-${color}-500`}>
                      {getCategoryIcon(category)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                        {category}
                      </h3>
                      <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                        {categorySkills.length} skills
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                  </motion.div>
                </div>

                {/* Skills list - expands on hover/click */}
                <motion.div
                  className="relative z-10 space-y-3 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      className="group/skill"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: skillIndex * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-light-text dark:text-dark-text group-hover/skill:text-accent-500 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
                          {skill.level}
                        </span>
                      </div>
                      
                      {/* Visual proficiency indicator */}
                      <div className="relative h-2 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r from-${color}-500 to-${color}-400 rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView && isExpanded ? { width: getProficiencyWidth(skill.level) } : {}}
                          transition={{
                            duration: 1,
                            delay: skillIndex * 0.1,
                            ease: 'easeOut',
                          }}
                        />
                      </div>

                      {/* Context on hover */}
                      <motion.div
                        className="mt-1 text-xs text-light-text-tertiary dark:text-dark-text-tertiary opacity-0 group-hover/skill:opacity-100 transition-opacity"
                      >
                        Used in 3+ projects
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Collapsed preview - show top 3 skills */}
                {!isExpanded && (
                  <motion.div
                    className="relative z-10 flex flex-wrap gap-2"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isExpanded ? 0 : 1 }}
                  >
                    {categorySkills.slice(0, 3).map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 text-xs font-medium bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text dark:text-dark-text rounded-full"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {categorySkills.length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium bg-accent-500/10 text-accent-500 rounded-full">
                        +{categorySkills.length - 3}
                      </span>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-500 mb-2">{skills.length}</div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Total Skills</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {skills.filter(s => s.level === 'Advanced').length}
            </div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Advanced</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-500 mb-2">5</div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">2+</div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Years Learning</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
