import React from 'react';
import { ChevronDown, BrainCircuit, Cloud, Shield } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-0"
    >
      <motion.div 
        className="container-custom text-center z-10"
        style={{ y: y1, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.6, -0.05, 0.01, 0.99],
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text mb-6 relative gradient-text-premium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="inline-block"
            >
              Fahad
            </motion.span>
            {' '}
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="inline-block gradient-text"
            >
              Khalid
            </motion.span>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: "60%", x: "-50%" }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            />
          </motion.h1>
        </motion.div>
        
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
                "Cloud Architect",
                "Cybersecurity Engineer"
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
            <span className="mt-2 text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary">AI/ML</span>
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
            <span className="mt-2 text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary">Cloud</span>
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
            <span className="mt-2 text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary">Security</span>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8 sm:mt-16"
        >
          <MagneticButton 
            href="#projects" 
            className="btn btn-primary text-sm sm:text-base group relative overflow-hidden"
            strength={0.4}
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.div>
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5,
          ease: "easeInOut" 
        }}
      >
        <a href="#about" className="text-light-text-tertiary dark:text-dark-text-tertiary hover:text-primary-500 transition-colors duration-300">
          <ChevronDown size={24} sm:size={32} />
        </a>
      </motion.div>
      
      {/* Enhanced Background effects with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-light-bg via-light-bg-secondary to-light-bg-tertiary dark:from-dark-bg dark:via-dark-bg-secondary dark:to-dark-bg-tertiary"
        style={{ y: y2 }}
      />
      
      <motion.div 
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 240, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(110, 68, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
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
    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-light-text-secondary dark:text-dark-text-secondary inline-block">
      {currentText}
      <span className="animate-pulse text-primary-500">|</span>
    </h2>
  );
};

export default Hero;