import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Users, Trophy, Code, ExternalLink, Github, Award } from 'lucide-react';
import { hackathons } from '../../data/hackathons';
import MagneticButton from '../ui/MagneticButton';

const Hackathons: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="hackathons" className="section section-light">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <motion.h2 className="section-title text-light mb-4">
            Hackathons & Competitions
          </motion.h2>
          <motion.p
            className="text-light/70 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Collaborative innovation through competitive programming and rapid prototyping
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              className="relative group h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(hackathon.id)}
              onHoverEnd={() => setHoveredCard(null)}
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
                animate={hoveredCard === hackathon.id ? {
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
                className="relative z-10 h-full flex flex-col bg-dark-lighter/90 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
              <div className="relative overflow-hidden">
                <motion.img
                  src={hackathon.image}
                  alt={hackathon.name}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={hoveredCard === hackathon.id ? {
                    x: ['100%', '-100%'],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Position badge with enhanced styling */}
                <motion.div 
                  className="absolute top-4 right-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Trophy size={14} />
                    {hackathon.position}
                  </div>
                </motion.div>
                
                {/* Floating achievement indicator */}
                <motion.div
                  className="absolute top-4 left-4"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="bg-success-500/20 backdrop-blur-sm border border-success-500/30 text-success-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Award size={12} />
                    Winner
                  </div>
                </motion.div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <motion.h3 
                  className="text-xl font-bold text-light mb-3 group-hover:text-primary-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {hackathon.name}
                </motion.h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <motion.div 
                    className="flex items-center gap-2 text-sm text-light/70 bg-dark/30 rounded-lg p-2"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 240, 0.1)' }}
                  >
                    <Calendar size={16} className="text-primary-400" />
                    <span>{hackathon.date}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 text-sm text-light/70 bg-dark/30 rounded-lg p-2"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 240, 0.1)' }}
                  >
                    <MapPin size={16} className="text-success-400" />
                    <span>{hackathon.location}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 text-sm text-light/70 bg-dark/30 rounded-lg p-2"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 240, 0.1)' }}
                  >
                    <Users size={16} className="text-secondary-400" />
                    <span>Team of {hackathon.teamSize}</span>
                  </motion.div>
                </div>

                <div className="mb-4 flex-grow">
                  <motion.h4 
                    className="font-semibold text-primary-400 mb-2 flex items-center gap-2"
                    whileHover={{ x: 3 }}
                  >
                    <Code size={16} />
                    Project: {hackathon.project}
                  </motion.h4>
                  <p className="text-light/80 text-sm leading-relaxed">
                    {hackathon.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {hackathon.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1 bg-primary-500/15 text-primary-300 rounded-full text-xs font-medium border border-primary-500/20"
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: 'rgba(0, 255, 240, 0.2)',
                          borderColor: 'rgba(0, 255, 240, 0.4)'
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Enhanced footer with actions */}
                <div className="pt-4 border-t border-dark-light/50 mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <motion.div 
                      className="flex items-center gap-2 text-success-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Trophy size={16} />
                      <span className="text-sm font-medium">{hackathon.prize}</span>
                    </motion.div>
                    <div className="flex items-center gap-1 text-light/60">
                      <Code size={16} />
                      <span className="text-sm">Hackathon</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Statistics Section */}
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
              Passionate about collaborative problem-solving and innovation through hackathons
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
                {hackathons.length}
              </motion.div>
              <div className="text-sm text-light/60">Hackathons Participated</div>
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
                {hackathons.filter(h => 
                  h.position.toLowerCase().includes('1st') || 
                  h.position.toLowerCase().includes('winner') ||
                  h.position.toLowerCase().includes('first') ||
                  h.position.toLowerCase().includes('place')
                ).length}
              </motion.div>
              <div className="text-sm text-light/60">Wins & Placements</div>
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
                {new Set(hackathons.flatMap(h => h.technologies)).size}
              </motion.div>
              <div className="text-sm text-light/60">Technologies Used</div>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 rounded-2xl bg-dark-lighter/50 border border-dark-light/30 hover:border-coral-500/30 transition-all duration-300"
              whileHover={{ 
                y: -5, 
                boxShadow: '0 20px 40px rgba(255, 107, 107, 0.1)' 
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-coral-400 mb-2"
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
                {hackathons.reduce((total, h) => total + h.teamSize, 0)}
              </motion.div>
              <div className="text-sm text-light/60">Team Members Collaborated</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hackathons;