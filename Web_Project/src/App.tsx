import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Hackathons from './components/sections/Hackathons';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import CustomCursor from './components/ui/CustomCursor';
import ScrollAnimations from './components/ui/ScrollAnimations';
import LoadingAnimation from './components/ui/LoadingAnimation';

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'Fahad Khalid | Portfolio';
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
        <LoadingAnimation />
        <CustomCursor />
        <ScrollAnimations>
          <Header />
          
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Hackathons />
            <Certifications />
            <Contact />
          </main>
          
          <Footer />
        </ScrollAnimations>
      </div>
    </ThemeProvider>
  );
}

export default App;