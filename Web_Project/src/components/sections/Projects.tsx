import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Eye } from 'lucide-react';
import { projects } from '../../data/projects';
import { Project } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ProjectModal from '../ui/ProjectModal';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="projects" className="section section-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="gradient-text-premium mb-4">Featured Projects</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Real solutions to real problems. Each project tells a story of challenge, innovation, and impact.
          </p>
        </motion.div>

        {/* Grid of project cards - 3 across on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
              onOpenModal={() => setSelectedProject(project)}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-500 mb-2">{projects.length}</div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {new Set(projects.flatMap(p => p.tags)).size}
            </div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-500 mb-2">100%</div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Live & Working</div>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
  onOpenModal: () => void;
  prefersReducedMotion: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  inView,
  onOpenModal,
  prefersReducedMotion,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative card-incredible overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: index * 0.1,
      }}
      whileHover={prefersReducedMotion ? {} : { y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onOpenModal}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={isHovered && !prefersReducedMotion ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live
        </div>

        {/* Overlay with details - fades in on hover */}
        <motion.div
          className="absolute inset-0 bg-dark-bg/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-dark-text text-center text-sm line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex gap-3">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-dark-bg-secondary hover:bg-accent-500/20 border border-dark-bg-tertiary hover:border-accent-500 rounded-xl text-dark-text hover:text-accent-500 transition-all"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-dark-bg-secondary hover:bg-accent-500/20 border border-dark-bg-tertiary hover:border-accent-500 rounded-xl text-dark-text hover:text-accent-500 transition-all"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>

          <span className="text-xs text-dark-text-tertiary">Click to view details</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2 group-hover:text-accent-500 transition-colors">
          {project.title}
        </h3>

        {/* One-line problem statement */}
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 text-xs font-medium bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text dark:text-dark-text rounded-full"
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                color: '#00D4FF',
              }}
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 text-xs font-medium bg-accent-500/10 text-accent-500 rounded-full">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-500 to-purple-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-accent-500/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="w-4 h-4" />
            View Project
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
