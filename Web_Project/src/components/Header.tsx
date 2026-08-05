/**
 * Header — Blueprint sheet-index navigation.
 *
 * Desktop: horizontal list of "SHEET 01/09 — SECTION" labels.
 * Active section tracked via IntersectionObserver.
 * Each entry is clickable and jumps to its section.
 * Mobile: hamburger → drawer with same sheet labels.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ui/ThemeToggle';

interface SheetEntry {
  id: string;
  sheet: string;
  name: string;
  href: string;
}

const SHEETS: SheetEntry[] = [
  { id: 'home',         sheet: '01', name: 'HERO',           href: '#home'         },
  { id: 'about',        sheet: '02', name: 'ABOUT',          href: '#about'        },
  { id: 'experience',   sheet: '03', name: 'EXPERIENCE',     href: '#experience'   },
  { id: 'skills',       sheet: '04', name: 'SKILLS',         href: '#skills'       },
  { id: 'projects',     sheet: '05', name: 'PROJECTS',       href: '#projects'     },
  { id: 'hackathons',   sheet: '06', name: 'HACKATHONS',     href: '#hackathons'   },
  { id: 'certifications',sheet:'07', name: 'CERTS',          href: '#certifications'},
  { id: 'badges',       sheet: '08', name: 'BADGES',         href: '#badges'       },
  { id: 'platforms',    sheet: '09', name: 'PLATFORMS',      href: '#platforms'    },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      entries => {
        // Pick the most visible section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.4], rootMargin: '-80px 0px -20% 0px' }
    );

    SHEETS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const activeSheet = SHEETS.find(s => s.id === activeId) ?? SHEETS[0];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b'
          : ''
      }`}
      style={{
        background: scrolled ? 'rgba(8,33,61,0.96)' : 'rgba(13,43,78,0.80)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(126,200,227,0.12)',
      }}
    >
      {/* Top micro-bar: current sheet indicator */}
      <div
        className="border-b hidden lg:flex items-center px-6 py-0.5"
        style={{ borderColor: 'rgba(126,200,227,0.08)' }}
      >
        <span className="font-mono-data text-[9px] tracking-widest" style={{ color: '#7EC8E3', opacity: 0.45 }}>
          NOW VIEWING: SHEET {activeSheet.sheet}/09 — {activeSheet.name}
        </span>
      </div>

      <div className="container-custom px-4">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <motion.a
            href="#home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 shrink-0"
          >
            <span
              className="font-mono-data text-lg font-bold"
              style={{ color: '#7EC8E3', letterSpacing: '0.08em' }}
            >
              FK
            </span>
            <span
              className="font-display text-sm font-bold uppercase tracking-widest hidden sm:block"
              style={{ color: '#EAF4FF', letterSpacing: '0.10em' }}
            >
              Fahad Khalid
            </span>
          </motion.a>

          {/* Desktop nav — sheet index */}
          <nav className="hidden lg:flex items-center gap-0 ml-auto" aria-label="Sheet index navigation">
            {SHEETS.map((sheet, i) => {
              const isActive = activeId === sheet.id;
              return (
                <motion.a
                  key={sheet.id}
                  href={sheet.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.025 }}
                  className="relative px-2 py-2 group"
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className="font-mono-data text-[9px] block transition-colors duration-200"
                    style={{
                      color: isActive ? '#7EC8E3' : '#4A7FA5',
                      letterSpacing: '0.06em',
                      opacity: isActive ? 1 : 0.7,
                    }}
                  >
                    {sheet.sheet}
                  </span>
                  <span
                    className="font-mono-data text-[9px] block transition-colors duration-200 whitespace-nowrap"
                    style={{
                      color: isActive ? '#EAF4FF' : '#7EC8E3',
                      letterSpacing: '0.04em',
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    {sheet.name}
                  </span>
                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: '#7EC8E3' }}
                      layoutId="active-sheet-line"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </motion.a>
              );
            })}
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border transition-colors"
              style={{ borderColor: 'rgba(126,200,227,0.2)', color: '#7EC8E3' }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t overflow-hidden"
            style={{ background: 'rgba(8,33,61,0.98)', borderColor: 'rgba(126,200,227,0.12)' }}
          >
            <nav className="container-custom py-3 px-4 grid grid-cols-2 gap-1">
              {SHEETS.map(sheet => {
                const isActive = activeId === sheet.id;
                return (
                  <a
                    key={sheet.id}
                    href={sheet.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 border transition-colors"
                    style={{
                      borderColor: isActive ? 'rgba(126,200,227,0.35)' : 'rgba(126,200,227,0.10)',
                      background: isActive ? 'rgba(126,200,227,0.06)' : 'transparent',
                    }}
                  >
                    <span className="font-mono-data text-[9px]" style={{ color: '#7EC8E3', opacity: 0.55 }}>
                      {sheet.sheet}
                    </span>
                    <span className="font-mono-data text-[10px] uppercase tracking-wider" style={{ color: '#EAF4FF', opacity: isActive ? 1 : 0.7 }}>
                      {sheet.name}
                    </span>
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
