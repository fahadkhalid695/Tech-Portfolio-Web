import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section bg-dark-lighter">
      <div className="container-custom">
        <motion.h2 
          className="section-title text-light mb-16 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden relative">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Fahad Khalid" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-500 rounded-lg flex items-center justify-center transform rotate-12">
              <div className="transform -rotate-12 text-light font-bold text-3xl">
                CS
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-light">Computer Science Undergraduate</h3>
            <p className="text-light/80 leading-relaxed">
              I'm a dedicated Computer Science student with a passion for exploring the intersection of technology and innovation. My academic journey has been focused on developing expertise in the cutting-edge fields of Artificial Intelligence and Machine Learning.
            </p>
            <p className="text-light/80 leading-relaxed">
              Beyond the classroom, I've honed my skills in cloud computing environments, earning certifications in AWS and Azure platforms. My interest in cybersecurity has led me to explore robust security frameworks and ethical hacking techniques.
            </p>
            <p className="text-light/80 leading-relaxed">
              I believe in continuous learning and applying theoretical knowledge to practical solutions. My approach combines analytical thinking with creative problem-solving to develop efficient, scalable, and secure applications.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <a href="#contact" className="btn btn-primary">
                Get In Touch
              </a>
              <a href="#projects" className="btn btn-outline">
                View Projects
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;