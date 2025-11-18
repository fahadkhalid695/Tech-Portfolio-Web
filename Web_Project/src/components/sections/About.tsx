import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, MapPin, Calendar, GraduationCap, ExternalLink, Code, Brain, Shield, Cloud } from 'lucide-react';
import { getResumeUrl, getResumeAction } from '../../data/personalInfo';
import MagneticButton from '../ui/MagneticButton';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = [
    { label: 'Years of Study', value: '2+', icon: <Calendar size={20} />, color: 'primary' },
    { label: 'Projects Completed', value: '5+', icon: <GraduationCap size={20} />, color: 'success' },
    { label: 'Technologies', value: '20+', icon: <Code size={20} />, color: 'secondary' },
  ];

  const interests = [
    { name: 'AI & Machine Learning', icon: <Brain size={20} />, color: 'primary' },
    { name: 'Cloud Computing', icon: <Cloud size={20} />, color: 'success' },
    { name: 'Cybersecurity', icon: <Shield size={20} />, color: 'secondary' },
    { name: 'Full-Stack Development', icon: <Code size={20} />, color: 'coral' },
  ];

  return (
    <section id="about" className="section bg-dark-lighter">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <motion.h2 className="section-title text-light mb-4">
            About Me
          </motion.h2>
          <motion.p
            className="text-light/70 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Passionate about technology, innovation, and creating solutions that make a difference
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-12">
          {/* Profile Image - Takes 2 columns */}
          <motion.div 
            className="lg:col-span-2 relative group"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              {/* Enhanced background decorative elements */}
              <motion.div 
                className="absolute -inset-6 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-success-500/20 rounded-3xl blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Glass morphism container */}
              <div 
                className="relative rounded-2xl p-2 transition-all duration-500 group-hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <motion.img 
                  src="/image/pic.jpg" 
                  alt="Fahad Khalid" 
                  className="w-full h-auto rounded-xl object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-2 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{
                    x: ['100%', '-100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
              </div>
              
              {/* Enhanced floating badge */}
              <motion.div 
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-2xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 10px 30px rgba(0, 255, 240, 0.3)',
                    '0 20px 40px rgba(0, 255, 240, 0.5)',
                    '0 10px 30px rgba(0, 255, 240, 0.3)',
                  ],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.2, rotate: 15 }}
              >
                <div className="text-white font-bold text-xl">CS</div>
              </motion.div>
              
              {/* Floating particles around image */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-500/40 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.4, 1, 0.4],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Description - Takes 3 columns */}
          <motion.div 
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.h3 
                className="text-3xl font-bold text-light mb-3"
                whileHover={{ x: 5 }}
              >
                Computer Science Undergraduate
              </motion.h3>
              <motion.p 
                className="text-primary-400 font-medium text-lg mb-6"
                whileHover={{ x: 3 }}
              >
                Passionate Tech Enthusiast & Problem Solver
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="space-y-4 text-light/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.p
                whileHover={{ x: 3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                I'm a dedicated Computer Science student with a passion for exploring the intersection of technology and innovation. My academic journey has been focused on developing expertise in the cutting-edge fields of <span className="text-primary-400 font-medium">Artificial Intelligence and Machine Learning</span>.
              </motion.p>
              <motion.p
                whileHover={{ x: 3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                Beyond the classroom, I've honed my skills in <span className="text-success-400 font-medium">cloud computing environments</span>, earning certifications in AWS and Azure platforms. My interest in cybersecurity has led me to explore robust security frameworks and ethical hacking techniques.
              </motion.p>
              <motion.p
                whileHover={{ x: 3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                I believe in continuous learning and applying theoretical knowledge to practical solutions. My approach combines analytical thinking with creative problem-solving to develop efficient, scalable, and secure applications.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Areas of Interest - Full Width Below */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h4 className="text-xl font-semibold text-light mb-6 text-center">Areas of Interest</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.name}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-dark/30 border border-dark-light/30 hover:border-primary-500/30 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  backgroundColor: 'rgba(34, 211, 238, 0.08)',
                  boxShadow: '0 10px 30px rgba(34, 211, 238, 0.2)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
              >
                <motion.div 
                  className={`text-${interest.color}-400`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {interest.icon}
                </motion.div>
                <span className="text-sm font-medium text-light/90 text-center">{interest.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats - Full Width */}
        <motion.div 
          className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-xl border border-dark-light/30 transition-all duration-300 relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
              whileHover={{ 
                y: -8,
                scale: 1.05,
                borderColor: `rgba(${stat.color === 'primary' ? '34, 211, 238' : stat.color === 'success' ? '16, 185, 129' : '147, 51, 234'}, 0.5)`,
                boxShadow: `0 20px 40px rgba(${stat.color === 'primary' ? '34, 211, 238' : stat.color === 'success' ? '16, 185, 129' : '147, 51, 234'}, 0.3)`,
              }}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.8 + (index * 0.1) }}
            >
              <motion.div
                className="absolute inset-0 opacity-0"
                style={{
                  background: `linear-gradient(135deg, rgba(${stat.color === 'primary' ? '34, 211, 238' : stat.color === 'success' ? '16, 185, 129' : '147, 51, 234'}, 0.15), transparent)`,
                }}
                animate={{
                  opacity: hoveredStat === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                className={`flex justify-center mb-3 text-${stat.color}-400`}
                animate={hoveredStat === index ? { 
                  scale: 1.3, 
                  rotate: 360 
                } : { 
                  scale: 1, 
                  rotate: 0 
                }}
                transition={{ duration: 0.5 }}
              >
                {stat.icon}
              </motion.div>
              
              <motion.div 
                className="text-3xl font-bold text-light mb-2"
                animate={hoveredStat === index ? { 
                  scale: 1.15,
                } : { 
                  scale: 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {stat.value}
              </motion.div>
              
              <div className="text-sm text-light/60 relative z-10">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Action Buttons - Centered Below */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          <MagneticButton 
            href="#contact" 
            className="btn btn-primary flex items-center gap-2"
            strength={0.3}
          >
            <span>Get In Touch</span>
          </MagneticButton>
          
          <MagneticButton 
            href="#projects" 
            className="btn btn-outline flex items-center gap-2"
            strength={0.3}
          >
            <span>View Projects</span>
          </MagneticButton>
          
          <MagneticButton 
            href={getResumeUrl()}
            className="btn btn-outline flex items-center gap-2 hover:bg-success-500 hover:border-success-500 hover:text-white transition-all duration-300"
            strength={0.3}
          >
            <span className="flex items-center gap-2">
              {getResumeAction().action === 'view' ? (
                <>
                  <ExternalLink size={16} />
                  View Resume
                </>
              ) : (
                <>
                  <Download size={16} />
                  Download Resume
                </>
              )}
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
