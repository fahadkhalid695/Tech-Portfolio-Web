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
import CustomCursor from './components/ui/CustomCursor';
import ScrollAnimations from './components/ui/ScrollAnimations';
import LoadingAnimation from './components/ui/LoadingAnimation';

// ─── Scroll progress bar using blueprint cyan ─────────────────────────────

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px origin-left z-[9999]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #7EC8E3, #4A9DB8, #7EC8E3)',
      }}
      aria-hidden="true"
    />
  );
};

// ─── App ──────────────────────────────────────────────────────────────────

function App() {
  useEffect(() => {
    document.title = 'Fahad Khalid | AI, Cloud & Cybersecurity';
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);

  return (
    <ThemeProvider>
      {/*
        Use CSS custom properties for background/text so they respond
        to .dark / .light classes applied by ThemeContext.
        Avoid hardcoded Tailwind dark: variants for root-level bg/text.
      */}
      <div
        className="min-h-screen transition-colors duration-300"
        style={{
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
        }}
      >
        <LoadingAnimation />
        <ScrollProgress />
        <CustomCursor />

        <ScrollAnimations>
          <Header />

          <main id="main-content" role="main">
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Hackathons />
            <Certifications />
            <Badges />
            <Platforms />
          </main>

          <Footer />
        </ScrollAnimations>
      </div>
    </ThemeProvider>
  );
}

export default App;
