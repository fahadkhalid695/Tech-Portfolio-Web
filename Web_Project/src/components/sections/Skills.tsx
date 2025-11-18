import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Cloud, Brain, Wrench } from 'lucide-react';
import { skills } from '../../data/skills';
import MagneticButton from '../ui/MagneticButton';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Code size={24} className="text-primary-400" />;
      case 'Cloud':
        return <Cloud size={24} className="text-success-400" />;
      case 'AI/ML':
        return <Brain size={24} className="text-primary-300" />;
      case 'Tools':
        return <Wrench size={24} className="text-light/70" />;
      default:
        return <Code size={24} className="text-primary-400" />;
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'Programming':
        return 'from-primary-500/20 to-primary-600/10';
      case 'Cloud':
        return 'from-success-500/20 to-success-600/10';
      case 'AI/ML':
        return 'from-primary-300/20 to-primary-400/10';
      case 'Tools':
        return 'from-light/10 to-light/5';
      default:
        return 'from-primary-500/20 to-primary-600/10';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'bg-success-500';
      case 'Intermediate':
        return 'bg-primary-500';
      case 'Beginner':
        return 'bg-light/40';
      default:
        return 'bg-light/40';
    }
  };

  const getLevelPercentage = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 90;
      case 'Intermediate':
        return 70;
      case 'Beginner':
        return 40;
      default:
        return 40;
    }
  };

  return (
    <section id="skills" className="section bg-dark-lighter">
      <div className="container-custom">
        <motion.h2 
          className="section-title text-light mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Skills & Technologies
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillCategories).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              className={`card bg-gradient-to-br ${getCategoryGradient(category)} border border-dark-light/50 hover:border-primary-500/30 transition-all duration-300 group`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-dark/30">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-xl font-bold text-light group-hover:text-primary-400 transition-colors">
                    {category}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      className="group/skill relative p-3 rounded-lg transition-all duration-300 hover:bg-dark/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: (categoryIndex * 0.15) + (skillIndex * 0.1) }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      onHoverStart={() => setHoveredSkill(skill.id)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-light font-medium group-hover/skill:text-primary-300 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs text-light/60 font-medium">
                          {skill.level}
                        </span>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full bg-dark/50 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full ${getLevelColor(skill.level)} rounded-full relative overflow-hidden`}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${getLevelPercentage(skill.level)}%` } : {}}
                            transition={{ 
                              duration: 1.2, 
                              delay: (categoryIndex * 0.15) + (skillIndex * 0.1) + 0.3,
                              ease: "easeOut"
                            }}
                            whileHover={{ 
                              boxShadow: `0 0 20px ${skill.level === 'Advanced' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(0, 255, 240, 0.5)'}`,
                            }}
                          >
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={hoveredSkill === skill.id ? {
                                x: ['-100%', '100%'],
                              } : {}}
                              transition={{
                                duration: 1,
                                ease: "easeInOut",
                              }}
                            />
                          </motion.div>
                        </div>
                        
                        {/* Skill level indicator dots */}
                        <div className="flex justify-between mt-1">
                          {[1, 2, 3].map((dot) => (
                            <div
                              key={dot}
                              className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                                (skill.level === 'Advanced') ||
                                (skill.level === 'Intermediate' && dot <= 2) ||
                                (skill.level === 'Beginner' && dot <= 1)
                                  ? getLevelColor(skill.level).replace('bg-', 'bg-')
                                  : 'bg-dark/50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Skills Summary */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                {skills.filter(s => s.level === 'Advanced').length}
              </div>
              <div className="text-sm text-light/60">Advanced Skills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-400 mb-2">
                {skills.filter(s => s.level === 'Intermediate').length}
              </div>
              <div className="text-sm text-light/60">Intermediate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-light/70 mb-2">
                {Object.keys(skillCategories).length}
              </div>
              <div className="text-sm text-light/60">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-300 mb-2">
                {skills.length}
              </div>
              <div className="text-sm text-light/60">Total Skills</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;