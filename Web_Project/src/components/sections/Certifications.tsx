import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';
import { certifications } from '../../data/certifications';

const Certifications: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certifications" className="section bg-dark-lighter">
      <div className="container-custom">
        <motion.h2 
          className="section-title text-light mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Certifications & Achievements
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="card bg-gradient-to-br from-dark to-dark-light border border-dark-light/50 hover:border-primary-500/30 transition-all duration-300 group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Header with logo */}
              <div className="relative p-6 pb-4">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/20 to-success-500/20 rounded-bl-3xl"></div>
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-3 bg-primary-500/20 rounded-xl group-hover:bg-primary-500/30 transition-colors duration-300">
                    <Award size={24} className="text-primary-400" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-light mb-1 group-hover:text-primary-400 transition-colors duration-300">
                      {cert.name}
                    </h3>
                    <div className="flex items-center gap-1 text-light/70 text-sm mb-2">
                      <Building size={14} />
                      <span>{cert.organization}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 text-light/60 text-sm mb-4">
                  <Calendar size={14} />
                  <span>{cert.date}</span>
                </div>

                {/* Verification button */}
                <a 
                  href={cert.verificationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center py-2 px-4 bg-dark-light/50 hover:bg-primary-500/20 border border-dark-light hover:border-primary-500/30 rounded-lg text-light/80 hover:text-primary-400 transition-all duration-300 text-sm font-medium"
                >
                  <span>Verify Certificate</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-success-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">{certifications.length}</div>
              <div className="text-sm text-light/60">Certifications Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-400 mb-2">
                {new Set(certifications.map(c => c.organization)).size}
              </div>
              <div className="text-sm text-light/60">Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-300 mb-2">100%</div>
              <div className="text-sm text-light/60">Verified</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;