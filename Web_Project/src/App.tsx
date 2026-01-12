import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Hackathons from './components/sections/Hackathons';
import Certifications from './components/sections/Certifications';
import Badges from './components/sections/Badges';
import Platforms from './components/sections/Platforms';
import Contact from './components/sections/Contact';
import CustomCursor from './components/ui/CustomCursor';
import ScrollAnimations from './components/ui/ScrollAnimations';
import LoadingAnimation from './components/ui/LoadingAnimation';

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL PROGRESS BAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 via-purple-500 to-accent-500 origin-left z-[9999]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// Section Order: Hero → About → Experience → Skills → Projects → Hackathons → 
//                Certifications → Platforms → Contact
// ═══════════════════════════════════════════════════════════════════════════

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'Fahad Khalid | Portfolio';
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
        {/* Loading Animation */}
        <LoadingAnimation />
        
        {/* Scroll Progress Indicator */}
        <ScrollProgress />
        
        {/* Custom Cursor (desktop only) */}
        <CustomCursor />
        
        {/* Main Content with Scroll Animations */}
        <ScrollAnimations>
          <Header />
          
          <main role="main">
            {/* Hero Section */}
            <Hero />
            
            {/* About Section */}
            <About />
            
            {/* Experience Section (NEW) */}
            <Experience />
            
            {/* Skills Section */}
            <Skills />
            
            {/* Projects Section */}
            <Projects />
            
            {/* Hackathons Section */}
            <Hackathons />
            
            {/* Certifications Section */}
            <Certifications />
            
            {/* Badges Section (NEW) - Auto-scrolling marquee */}
            <Badges />
            
            {/* Platforms Section */}
            <Platforms />
            
            {/* Contact Section */}
            <Contact />
          </main>
          
          <Footer />
        </ScrollAnimations>
      </div>
    </ThemeProvider>
  );
}

export default App;