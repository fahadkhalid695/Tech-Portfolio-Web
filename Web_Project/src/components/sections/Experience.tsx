import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { experiences } from '../../data/experience';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.2, 0.9, 0.2, 1],
      },
    },
  };

  if (experiences.length === 0) {
    return null; // Don't render if no experiences
  }

  return (
    <section id="experience" className="section section-light">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <div className="section-title">
            <h2 className="gradient-text-premium">Experience</h2>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Professional journey and key achievements
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500 to-purple-500 hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Timeline marker */}
                  <div className="absolute left-8 top-6 w-4 h-4 bg-accent-500 rounded-full border-4 border-light-bg dark:border-dark-bg hidden md:block transform -translate-x-1/2 z-10" />

                  <div className="md:ml-20">
                    <div className="card-incredible p-6 hover:shadow-2xl transition-all duration-500">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-accent-500/10 rounded-lg">
                              <Briefcase className="w-5 h-5 text-accent-500" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                                {exp.role}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <a
                                  href={exp.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-accent-500 hover:text-accent-400 font-semibold flex items-center gap-1 transition-colors"
                                >
                                  {exp.company}
                                  {exp.companyUrl && (
                                    <ExternalLink className="w-3 h-3" />
                                  )}
                                </a>
                                <span className="text-light-text-tertiary dark:text-dark-text-tertiary">
                                  •
                                </span>
                                <span className="text-sm px-2 py-0.5 bg-accent-500/10 text-accent-500 rounded-full">
                                  {exp.type}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {exp.startDate} - {exp.endDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                        {exp.description}
                      </p>

                      {exp.achievements.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary"
                            >
                              <span className="text-accent-500 mt-1">▸</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text dark:text-dark-text rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
