import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Cloud, BrainCircuit, PenTool as Tool, Check, CheckCircle2, BadgeCheck, Star } from 'lucide-react';
import { skills } from '../../data/skills';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  // Icon mapping
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Code className="w-6 h-6" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6" />;
      case 'AI/ML':
        return <BrainCircuit className="w-6 h-6" />;
      case 'Tools':
        return <Tool className="w-6 h-6" />;
      default:
        return <Check className="w-6 h-6" />;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Beginner':
        return <Check className="w-5 h-5 text-light/70" />;
      case 'Intermediate':
        return <CheckCircle2 className="w-5 h-5 text-primary-400" />;
      case 'Advanced':
        return <BadgeCheck className="w-5 h-5 text-primary-500" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="section bg-dark">
      <div className="container-custom">
        <motion.h2 
          className="section-title text-light mb-16 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              className="card p-6 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary-500/20 rounded-lg text-primary-500 mr-3">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-xl font-bold text-light">{category}</h3>
              </div>

              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {skills
                  .filter(skill => skill.category === category)
                  .map(skill => (
                    <motion.li 
                      key={skill.id}
                      className="flex items-center justify-between p-3 bg-dark-light rounded-lg"
                      variants={itemVariants}
                    >
                      <span className="text-light/90">{skill.name}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-light/70 mr-2">{skill.level}</span>
                        {getLevelIcon(skill.level)}
                      </div>
                    </motion.li>
                  ))
                }
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;