import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/projects';
import { Project } from '../../types';
import { useReducedMotion } from '../../utils/animations';
import ProjectSheet from '../ui/ProjectSheet';
import { CornerMark, SectionLabel } from '../ui/BlueprintPrimitives';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags))).slice(0, 8)];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.tags.includes(filter));

  const navigate = useCallback((dir: 'prev' | 'next') => {
    if (!selectedProject) return;
    const i = filtered.findIndex(p => p.id === selectedProject.id);
    const ni = dir === 'next' ? (i + 1) % filtered.length : (i - 1 + filtered.length) % filtered.length;
    setSelectedProject(filtered[ni]);
  }, [selectedProject, filtered]);

  React.useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') setSelectedProject(null);
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [selectedProject, navigate]);

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--color-bg-secondary)' }}>
      {/* Section grid overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden="true" />
      <CornerMark corner="tl" className="top-3 left-3" color="#7EC8E3" size={18} delay={0} />
      <CornerMark corner="tr" className="top-3 right-3" color="#7EC8E3" size={18} delay={0} />

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={ref} className="mb-10">
          <SectionLabel sheet={5} name="Projects" />
          <motion.h2
            className="font-display font-bold uppercase text-3xl sm:text-4xl"
            style={{ color: 'var(--color-text)', letterSpacing: '0.06em' }}
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35 }}
          >
            FEATURED <span style={{ color: 'var(--color-accent)' }}>WORK</span>
          </motion.h2>
          <motion.p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 0.7 } : {}} transition={{ delay: 0.1 }}>
            Each card is a separate drawing — hover to straighten and read the spec.
          </motion.p>
        </div>

        {/* Filter tags */}
        <motion.div className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className="font-mono-data text-[9px] px-3 py-1 border uppercase tracking-widest transition-colors duration-200"
              style={{
                borderColor: filter === tag ? 'var(--color-accent)' : 'var(--color-border)',
                color: filter === tag ? 'var(--color-text)' : 'var(--color-text-secondary)',
                background: filter === tag ? 'rgba(126,200,227,0.10)' : 'transparent',
                opacity: filter === tag ? 1 : 0.65,
              }}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Cards grid — "scattered sheets on a drafting table" */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectSheet
                key={project.id}
                index={i}
                title={project.title}
                description={project.description}
                tags={project.tags}
                githubUrl={project.githubUrl}
                demoUrl={project.demoUrl}
                image={project.image}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-3 gap-4 max-w-md mt-14"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          {[
            { v: projects.length, l: 'PROJECTS' },
            { v: new Set(projects.flatMap(p => p.tags)).size, l: 'TECHNOLOGIES' },
            { v: '100%', l: 'OPEN SOURCE' },
          ].map(s => (
            <div key={s.l} className="border p-3 text-center" style={{ borderColor: 'var(--color-border)' }}>
              <div className="font-display font-bold text-xl" style={{ color: 'var(--color-accent)' }}>{s.v}</div>
              <div className="font-mono-data text-[9px] tracking-widest mt-1" style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0" style={{ background: 'rgba(8,33,61,0.92)', backdropFilter: 'blur(8px)' }} />
            <motion.div
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto card-sheet"
              initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              onClick={e => e.stopPropagation()}
              style={{ rotate: 0 }}
            >
              <button onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 z-10 p-1.5 border" style={{ borderColor: 'rgba(13,43,78,0.2)', color: '#0D2B4E' }}>
                <X size={16} />
              </button>
              <button onClick={() => navigate('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-1.5 border" style={{ borderColor: 'rgba(13,43,78,0.2)', color: '#0D2B4E' }}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => navigate('next')}
                className="absolute right-10 top-1/2 -translate-y-1/2 z-10 p-1.5 border" style={{ borderColor: 'rgba(13,43,78,0.2)', color: '#0D2B4E' }}>
                <ChevronRight size={18} />
              </button>
              <div className="relative h-52 overflow-hidden">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(244,240,228,0.95) 100%)' }} />
              </div>
              <div className="p-6">
                <h2 className="font-display font-bold uppercase text-2xl mb-1" style={{ color: '#0D2B4E', letterSpacing: '0.06em' }}>{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedProject.tags.map(t => (
                    <span key={t} className="font-mono-data text-[9px] px-2 py-0.5 border" style={{ borderColor: 'rgba(13,43,78,0.2)', color: '#0D2B4E' }}>{t}</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#2A5278' }}>{selectedProject.description}</p>
                <div className="flex gap-4">
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono-data text-xs uppercase tracking-widest border px-4 py-2 transition-colors hover:bg-opacity-5"
                    style={{ borderColor: 'rgba(13,43,78,0.3)', color: '#0D2B4E' }}>
                    <Github size={14} /> CODE
                  </a>
                  <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono-data text-xs uppercase tracking-widest px-4 py-2 text-white"
                    style={{ background: '#0D2B4E' }}>
                    <ExternalLink size={14} /> LIVE DEMO
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
