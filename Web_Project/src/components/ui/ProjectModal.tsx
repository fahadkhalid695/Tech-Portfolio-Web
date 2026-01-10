import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  // Keyboard navigation
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto card-incredible"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-dark-bg-secondary hover:bg-accent-500 text-dark-text hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Image */}
            <div className="relative h-80 overflow-hidden rounded-t-3xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Title */}
              <div>
                <h2 className="text-3xl font-bold text-dark-text mb-2">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-accent-500/10 text-accent-500 rounded-full border border-accent-500/20"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 212, 255, 0.2)' }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Problem → Solution → Impact */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-accent-500 mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-sm">1</span>
                    Problem
                  </h3>
                  <p className="text-dark-text-secondary leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-purple-500 mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm">2</span>
                    Solution
                  </h3>
                  <p className="text-dark-text-secondary leading-relaxed">
                    Built a comprehensive solution using modern technologies and best practices, 
                    focusing on scalability, performance, and user experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-cyan-500 mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-sm">3</span>
                    Impact
                  </h3>
                  <p className="text-dark-text-secondary leading-relaxed">
                    Successfully deployed and actively used, demonstrating real-world application 
                    and solving actual user problems.
                  </p>
                </div>
              </div>

              {/* Tech Stack with Icons */}
              <div>
                <h3 className="text-lg font-bold text-dark-text mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tech, index) => (
                    <motion.div
                      key={index}
                      className="px-4 py-2 bg-dark-bg-secondary border border-dark-bg-tertiary rounded-xl text-dark-text font-medium"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(0, 212, 255, 0.5)' }}
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Challenges & Learnings */}
              <div>
                <h3 className="text-lg font-bold text-dark-text mb-4">Challenges & Learnings</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-dark-bg-secondary rounded-xl border border-dark-bg-tertiary">
                    <h4 className="font-semibold text-yellow-500 mb-2">Challenge</h4>
                    <p className="text-dark-text-secondary text-sm">
                      Implementing complex features while maintaining code quality and performance.
                    </p>
                  </div>
                  <div className="p-4 bg-dark-bg-secondary rounded-xl border border-dark-bg-tertiary">
                    <h4 className="font-semibold text-green-500 mb-2">Learning</h4>
                    <p className="text-dark-text-secondary text-sm">
                      Gained deep understanding of architecture patterns, optimization techniques, 
                      and best practices for production-ready applications.
                    </p>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t border-dark-bg-tertiary">
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-dark-bg-secondary border border-dark-bg-tertiary hover:border-accent-500 text-dark-text hover:text-accent-500 rounded-xl font-medium transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-5 h-5" />
                  View Code
                </motion.a>
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-accent-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
