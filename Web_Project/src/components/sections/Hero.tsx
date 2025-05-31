import React from 'react';
import { ChevronDown, BrainCircuit, Cloud, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-dark to-dark-lighter px-4 sm:px-0"
    >
      <div className="container-custom text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-light mb-6"
        >
          Fahad Khalid
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="h-12 sm:h-14">
            <TypewriterText 
              texts={[
                "Computer Science Undergraduate",
                "Tech Enthusiast",
                "AI/ML Developer",
                "Cloud Architect"
              ]} 
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-8 sm:mt-16 mb-8 space-x-4 sm:space-x-16"
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut" 
            }}
          >
            <BrainCircuit size={32} sm:size={48} className="text-primary-500" />
            <span className="mt-2 text-sm sm:text-base text-light/80">AI/ML</span>
          </motion.div>
          
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <Cloud size={32} sm:size={48} className="text-success-500" />
            <span className="mt-2 text-sm sm:text-base text-light/80">Cloud</span>
          </motion.div>
          
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Shield size={32} sm:size={48} className="text-primary-300" />
            <span className="mt-2 text-sm sm:text-base text-light/80">Security</span>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 sm:mt-16"
        >
          <a 
            href="#projects" 
            className="btn btn-primary text-sm sm:text-base"
          >
            View My Work
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5,
          ease: "easeInOut" 
        }}
      >
        <a href="#about" className="text-light/50 hover:text-primary-500 transition-colors duration-300">
          <ChevronDown size={24} sm:size={32} />
        </a>
      </motion.div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)]"></div>
    </section>
  );
};

interface TypewriterTextProps {
  texts: string[];
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  React.useEffect(() => {
    const text = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, currentText.length + 1));
        
        if (currentText.length === text.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(text.substring(0, currentText.length - 1));
        
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts]);
  
  return (
    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-light/90 inline-block">
      {currentText}
      <span className="animate-pulse text-primary-500">|</span>
    </h2>
  );
};

export default Hero;