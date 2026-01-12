import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, X, ChevronLeft, ChevronRight, Star, Layers } from 'lucide-react';
import { projects } from '../../data/projects';
import { Project } from '../../types';
import {
  staggerContainer,
  staggerItem,
  calculate3DTilt,
  useReducedMotion,
} from '../../utils/animations';

// ═══════════════════════════════════════════════════════════════════════════
// PROJECTS SECTION - 3D tilt cards with modal carousel
// Features: hover reveals, click-to-modal, keyboard navigation
// ═══════════════════════════════════════════════════════════════════════════

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get unique tags
  const allTags = ['All', ...Array.from(new Set(projects.flatMap((project) => project.tags)))];

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((project) => project.tags.includes(filter));

  // Modal navigation
  const navigateProject = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedProject) return;
      const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id);
      const newIndex =
        direction === 'next'
          ? (currentIndex + 1) % filteredProjects.length
          : (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
      setSelectedProject(filteredProjects[newIndex]);
    },
    [selectedProject, filteredProjects]
  );

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') setSelectedProject(null);
      if (e.key === 'ArrowLeft') navigateProject('prev');
      if (e.key === 'ArrowRight') navigateProject('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, navigateProject]);

  return (
    <section
      id="projects"
      className="py-20 lg:py-32 section-secondary relative overflow-hidden"
      aria-label="Featured projects"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1)}
          className="text-center mb-12"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4"
          >
            <Layers size={14} className="inline mr-2" />
            My Work
          </motion.span>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            A showcase of technical projects spanning AI/ML, web development, and innovative
            solutions.
          </motion.p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tag
                  ? 'bg-gradient-to-r from-accent-500 to-purple-500 text-white shadow-lg'
                  : 'bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary hover:text-accent-500 hover:bg-accent-500/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1, 0.4)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1, 0.8)}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16"
        >
          {[
            { value: projects.length, label: 'Projects', color: 'text-accent-500' },
            {
              value: new Set(projects.flatMap((p) => p.tags)).size,
              label: 'Technologies',
              color: 'text-purple-400',
            },
            {
              value: `${Math.round(
                (projects.filter((p) => p.githubUrl.includes('github.com')).length /
                  projects.length) *
                  100
              )}%`,
              label: 'Open Source',
              color: 'text-success-500',
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="card-glass text-center p-4 sm:p-6"
            >
              <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-xs sm:text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onPrev={() => navigateProject('prev')}
            onNext={() => navigateProject('next')}
            currentIndex={filteredProjects.findIndex((p) => p.id === selectedProject.id)}
            totalCount={filteredProjects.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT CARD - 3D tilt with hover reveals
// ═══════════════════════════════════════════════════════════════════════════

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  prefersReducedMotion: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, prefersReducedMotion }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTiltStyle(calculate3DTilt(x, y, rect.width, rect.height, 8));
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItem}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="card-tilt cursor-pointer group"
      style={{
        transform: `perspective(1000px) rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/40 to-transparent" />

        {/* Featured badge */}
        {project.id <= 2 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-to-r from-accent-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <Star size={10} fill="currentColor" />
            Featured
          </div>
        )}

        {/* Hover overlay with quick actions */}
        <motion.div
          className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur rounded-xl text-white hover:bg-accent-500/30 transition-colors"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="View GitHub"
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur rounded-xl text-white hover:bg-success-500/30 transition-colors"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="View Demo"
          >
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2 group-hover:text-accent-500 transition-colors">
          {project.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-accent-500/10 text-accent-500 font-medium"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-tertiary dark:text-dark-text-tertiary">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT MODAL - Full details with carousel navigation
// ═══════════════════════════════════════════════════════════════════════════

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark-bg/90 backdrop-blur-md" />

      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-light-bg dark:bg-dark-bg-secondary rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-dark-bg/50 backdrop-blur text-white hover:bg-dark-bg/80 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Navigation */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-dark-bg/50 backdrop-blur text-white hover:bg-dark-bg/80 transition-colors"
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-dark-bg/50 backdrop-blur text-white hover:bg-dark-bg/80 transition-colors"
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>

        {/* Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />

          {/* Counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-dark-bg/70 backdrop-blur text-white text-sm">
            {currentIndex + 1} / {totalCount}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-4">
            {project.title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-accent-500/10 text-accent-500 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-8">
            {project.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <Github size={18} />
              View Code
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium flex items-center gap-2"
            >
              <ExternalLink size={18} />
              <span className="relative z-10">Live Demo</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;