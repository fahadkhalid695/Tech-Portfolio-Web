import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Tag, Star, Eye } from 'lucide-react';
import { projects } from '../../data/projects';
import { Project } from '../../types';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState<string>('All');
  
  // Get unique tags from all projects
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(project => project.tags)))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  return (
    <section id="projects" className="section bg-dark">
      <div className="container-custom">
        <motion.h2 
          className="section-title text-light mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Featured Projects
        </motion.h2>
        
        <motion.p
          className="text-center text-light/70 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A showcase of my technical projects spanning AI/ML, web development, and innovative solutions. 
          Each project represents a unique challenge and learning experience.
        </motion.p>
        
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {allTags.map((tag, index) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === tag 
                  ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25' 
                  : 'bg-dark-lighter text-light/70 border-dark-light hover:bg-primary-500/10 hover:text-primary-400 hover:border-primary-500/30'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* Dynamic Projects summary */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">{projects.length}</div>
              <div className="text-sm text-light/60">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-400 mb-2">
                {new Set(projects.flatMap(p => p.tags)).size}
              </div>
              <div className="text-sm text-light/60">Technologies Used</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-300 mb-2">
                {Math.round((projects.filter(p => p.githubUrl.includes('github.com')).length / projects.length) * 100)}%
              </div>
              <div className="text-sm text-light/60">Open Source</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      className="relative bg-dark-lighter border border-dark-light/50 rounded-2xl overflow-hidden group h-full flex flex-col transition-all duration-500"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6 }
        }
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
          padding: '1px',
        }}
        initial={false}
        animate={{
          background: [
            'linear-gradient(0deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
            'linear-gradient(90deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
            'linear-gradient(180deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
            'linear-gradient(270deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
            'linear-gradient(360deg, transparent, rgba(0, 255, 240, 0.3), transparent)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col bg-dark-lighter/90 rounded-2xl">
        <div className="relative overflow-hidden h-56">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
        
        {/* Enhanced hover overlay with buttons */}
        <motion.div 
          className="absolute inset-0 bg-dark/60 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-4">
            <motion.a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-primary-500/20 hover:text-primary-300 transition-all duration-300 border border-white/20 hover:border-primary-500/30"
              aria-label="View GitHub Repository"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-success-500/20 hover:text-success-300 transition-all duration-300 border border-white/20 hover:border-success-500/30"
              aria-label="View Live Demo"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={24} />
            </motion.a>
          </div>
        </motion.div>

          {/* Featured badge for first 3 projects */}
          {project.id <= 3 && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 bg-primary-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                <Star size={12} />
                Featured
              </div>
            </div>
          )}
        </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-light group-hover:text-primary-400 transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-3 py-1 bg-primary-500/15 text-primary-300 text-xs rounded-full font-medium border border-primary-500/20"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center px-3 py-1 bg-light/10 text-light/60 text-xs rounded-full font-medium">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
        
        <p className="text-light/70 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>
        
        {/* Enhanced buttons */}
        <div className="flex gap-3 mt-auto">
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 group/btn relative overflow-hidden bg-dark border border-dark-light hover:border-primary-500/50 text-light hover:text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-primary-500/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
            <Github size={16} className="relative z-10" />
            <span className="relative z-10">Code</span>
          </a>
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 group/btn relative overflow-hidden bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
            <Eye size={16} className="relative z-10" />
            <span className="relative z-10">Demo</span>
          </a>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default Projects;