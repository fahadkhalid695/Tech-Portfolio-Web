import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '../../data/certifications';

const Certifications: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certifications" className="section bg-dark">
      <div className="container-custom">
        <motion.h2 
          className="section-title text-light mb-16 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Certifications & Achievements
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-primary-500/30 transform md:translateX(-0.5px)"></div>
          
          <div className="space-y-12">
            {certifications.map((cert, index) => (
              <motion.div 
                key={cert.id}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 bg-primary-500 rounded-full transform -translate-x-2 md:-translate-x-2.5 mt-4 z-10"></div>
                
                {/* Content */}
                <div className={`w-full md:w-1/2 ${
                  index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                }`}>
                  <div className="card p-6 h-full">
                    <div className="flex items-start mb-4">
                      <div className="mr-4 bg-dark-light p-2 rounded-lg">
                        <Award className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-light">{cert.name}</h3>
                        <p className="text-primary-400">{cert.organization}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-light/70 text-sm">{cert.date}</span>
                      <a 
                        href={cert.verificationUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-300 text-sm"
                      >
                        Verify <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;