import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, MapPin, Calendar, GraduationCap, ExternalLink } from 'lucide-react';
import { getResumeUrl, getResumeAction } from '../../data/personalInfo';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { label: 'Years of Study', value: '3+', icon: <Calendar size={20} /> },
    { label: 'Projects Completed', value: '15+', icon: <GraduationCap size={20} /> },
    { label: 'Technologies', value: '20+', icon: <MapPin size={20} /> },
  ];

  return (
    <section id="about" className="section bg-dark-lighter">
      <div className="container-custom">
        <motion.h2 
          className="section-title text-light mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Background decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-success-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              
              <div className="relative bg-dark border border-dark-light rounded-2xl p-2 group-hover:border-primary-500/30 transition-all duration-300">
                <img 
                  src="/image/pic.jpg" 
                  alt="Fahad Khalid" 
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
              
              {/* Floating badge */}
              <motion.div 
                className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-white font-bold text-lg">CS</div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <h3 className="text-3xl font-bold text-light mb-2">Computer Science Undergraduate</h3>
              <p className="text-primary-400 font-medium">Passionate Tech Enthusiast & Problem Solver</p>
            </div>
            
            <div className="space-y-4 text-light/80 leading-relaxed">
              <p>
                I'm a dedicated Computer Science student with a passion for exploring the intersection of technology and innovation. My academic journey has been focused on developing expertise in the cutting-edge fields of <span className="text-primary-400 font-medium">Artificial Intelligence and Machine Learning</span>.
              </p>
              <p>
                Beyond the classroom, I've honed my skills in <span className="text-success-400 font-medium">cloud computing environments</span>, earning certifications in AWS and Azure platforms. My interest in cybersecurity has led me to explore robust security frameworks and ethical hacking techniques.
              </p>
              <p>
                I believe in continuous learning and applying theoretical knowledge to practical solutions. My approach combines analytical thinking with creative problem-solving to develop efficient, scalable, and secure applications.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 bg-dark/50 rounded-lg border border-dark-light/30 hover:border-primary-500/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                >
                  <div className="flex justify-center mb-2 text-primary-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-light mb-1">{stat.value}</div>
                  <div className="text-xs text-light/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="btn btn-primary flex items-center gap-2">
                Get In Touch
              </a>
              <a href="#projects" className="btn btn-outline flex items-center gap-2">
                View Projects
              </a>
              <a 
                href={getResumeUrl()}
                target={getResumeAction().target}
                rel="noopener noreferrer"
                className="btn btn-outline flex items-center gap-2 hover:bg-success-500 hover:border-success-500 hover:text-white transition-all duration-300"
              >
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
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
