import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Tag } from 'lucide-react';
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
    <section id="projects" className="section bg-dark-lighter">
      <div className="container-custom">
        <motion.h2 
          className="section-title text-light mb-16 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          My Projects
        </motion.h2>
        
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {allTags.map((tag, index) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tag 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-dark-light text-light/70 hover:bg-dark hover:text-light'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6"
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
      className="card overflow-hidden group h-full flex flex-col"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5 }
        }
      }}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full flex justify-between">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-dark/80 rounded-full text-light hover:text-primary-500 transition-colors duration-300"
              aria-label="View GitHub Repository"
            >
              <Github size={20} />
            </a>
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-dark/80 rounded-full text-light hover:text-primary-500 transition-colors duration-300"
              aria-label="View Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-light mb-2">{project.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-md"
            >
              <Tag size={12} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-light/70 text-sm mb-4 flex-grow">{project.description}</p>
        
        <div className="flex justify-between mt-auto">
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary-500 hover:text-primary-400 transition-colors duration-300 flex items-center"
          >
            <Github size={16} className="mr-1" /> GitHub
          </a>
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-primary-500 hover:text-primary-400 transition-colors duration-300 flex items-center"
          >
            Live Demo <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;