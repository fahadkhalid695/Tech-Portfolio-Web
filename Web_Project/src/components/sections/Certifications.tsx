import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Calendar, Building, CheckCircle, Star, Trophy } from 'lucide-react';
import { certifications } from '../../data/certifications';
import MagneticButton from '../ui/MagneticButton';

const Certifications: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);

  return (
    <section id="certifications" className="section section-light">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <motion.h2 className="section-title text-light mb-4">
            Certifications & Achievements
          </motion.h2>
          <motion.p
            className="text-light/70 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Professional certifications and achievements that validate my expertise and commitment to continuous learning
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="relative group h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCert(cert.id)}
              onHoverEnd={() => setHoveredCert(null)}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(45deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
                  padding: '1px',
                }}
                animate={hoveredCert === cert.id ? {
                  background: [
                    'linear-gradient(0deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
                    'linear-gradient(90deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
                    'linear-gradient(180deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
                    'linear-gradient(270deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
                    'linear-gradient(360deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
                  ],
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Card content */}
              <div 
                className="relative z-10 h-full flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
              {/* Enhanced header */}
              <div className="relative p-6 pb-4">
                {/* Floating verified badge */}
                <motion.div 
                  className="absolute top-4 right-4"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="bg-success-500/20 backdrop-blur-sm border border-success-500/30 text-success-300 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle size={10} />
                    Verified
                  </div>
                </motion.div>
                
                <div className="flex items-start gap-4 relative z-10">
                  <motion.div 
                    className="p-3 bg-primary-500/20 rounded-xl group-hover:bg-primary-500/30 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Award size={24} className="text-primary-400" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-lg font-bold text-light mb-2 group-hover:text-primary-400 transition-colors duration-300"
                      whileHover={{ x: 3 }}
                    >
                      {cert.name}
                    </motion.h3>
                    <motion.div 
                      className="flex items-center gap-2 text-light/70 text-sm mb-3"
                      whileHover={{ x: 2 }}
                    >
                      <Building size={14} className="text-secondary-400" />
                      <span>{cert.organization}</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Enhanced content */}
              <div className="px-6 pb-6 flex-grow flex flex-col">
                <motion.div 
                  className="flex items-center gap-2 text-light/60 text-sm mb-6 bg-dark/30 rounded-lg p-3"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 255, 240, 0.05)' }}
                >
                  <Calendar size={14} className="text-primary-400" />
                  <span>Earned: {cert.date}</span>
                </motion.div>

                {/* Achievement indicator */}
                <motion.div 
                  className="flex items-center gap-2 mb-6 p-3 bg-success-500/10 border border-success-500/20 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <Trophy size={16} className="text-success-400" />
                  <span className="text-success-300 text-sm font-medium">Professional Certification</span>
                </motion.div>

                {/* Enhanced verification button */}
                <div className="mt-auto">
                  <MagneticButton 
                    href={cert.verificationUrl}
                    className="inline-flex items-center gap-2 w-full justify-center py-3 px-4 bg-dark-light/50 hover:bg-primary-500/20 border border-dark-light hover:border-primary-500/30 rounded-lg text-light/80 hover:text-primary-400 transition-all duration-300 text-sm font-medium"
                    strength={0.2}
                  >
                    <span className="flex items-center gap-2">
                      <span>Verify Certificate</span>
                      <ExternalLink size={14} />
                    </span>
                  </MagneticButton>
                </div>
              </div>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                animate={hoveredCert === cert.id ? {
                  x: ['100%', '-100%'],
                } : {}}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Summary stats */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.p 
              className="text-light/70 mb-6 text-lg"
              whileHover={{ scale: 1.02 }}
            >
              Committed to continuous learning and professional development
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              className="text-center p-6 rounded-2xl bg-dark-lighter/50 border border-dark-light/30 hover:border-primary-500/30 transition-all duration-300"
              whileHover={{ 
                y: -5, 
                boxShadow: '0 20px 40px rgba(0, 255, 240, 0.1)' 
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-primary-400 mb-2"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {certifications.length}
              </motion.div>
              <div className="text-sm text-light/60">Certifications Earned</div>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-2xl bg-dark-lighter/50 border border-dark-light/30 hover:border-success-500/30 transition-all duration-300"
              whileHover={{ 
                y: -5, 
                boxShadow: '0 20px 40px rgba(16, 185, 129, 0.1)' 
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-success-400 mb-2"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.2
                }}
              >
                {new Set(certifications.map(c => c.organization)).size}
              </motion.div>
              <div className="text-sm text-light/60">Organizations</div>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-2xl bg-dark-lighter/50 border border-dark-light/30 hover:border-secondary-500/30 transition-all duration-300"
              whileHover={{ 
                y: -5, 
                boxShadow: '0 20px 40px rgba(110, 68, 255, 0.1)' 
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-secondary-400 mb-2"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.4
                }}
              >
                100%
              </motion.div>
              <div className="text-sm text-light/60">Verified</div>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-2xl bg-dark-lighter/50 border border-dark-light/30 hover:border-coral-500/30 transition-all duration-300"
              whileHover={{ 
                y: -5, 
                boxShadow: '0 20px 40px rgba(255, 107, 107, 0.1)' 
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-coral-400 mb-2 flex items-center justify-center gap-1"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.6
                }}
              >
                <Star size={24} />
                A+
              </motion.div>
              <div className="text-sm text-light/60">Excellence Rating</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;