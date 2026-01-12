import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Briefcase, ExternalLink, ChevronRight } from 'lucide-react';
import { experiences } from '../../data/experience';
import { Experience } from '../../types';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  staggerItem,
  timelineBounce,
  useReducedMotion 
} from '../../utils/animations';

// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE SECTION
// - Minimal single-card layout when 1 entry
// - Vertical timeline with alternating cards when 2+ entries
// - Fully data-driven from experience.ts
// ═══════════════════════════════════════════════════════════════════════════

const ExperienceSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const prefersReducedMotion = useReducedMotion();
  const hasMultipleExperiences = experiences.length >= 2;

  return (
    <section 
      id="experience" 
      className="py-20 lg:py-32 section-secondary relative overflow-hidden"
      aria-label="Work Experience"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer(0.1)}
          className="text-center mb-16"
        >
          <motion.span 
            variants={staggerItem}
            className="inline-block px-4 py-2 rounded-full bg-accent-500/10 text-accent-500 text-sm font-medium mb-4"
          >
            Career Journey
          </motion.span>
          
          <motion.h2 
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          
          <motion.p 
            variants={staggerItem}
            className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            {hasMultipleExperiences 
              ? "My professional journey and the impact I've made along the way."
              : "Building experience and making an impact, one role at a time."
            }
          </motion.p>
        </motion.div>

        {/* Experience Content */}
        {hasMultipleExperiences ? (
          <TimelineLayout experiences={experiences} inView={inView} prefersReducedMotion={prefersReducedMotion} />
        ) : (
          <SingleCardLayout experience={experiences[0]} inView={inView} prefersReducedMotion={prefersReducedMotion} />
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE CARD LAYOUT - For 1 experience entry
// ─────────────────────────────────────────────────────────────────────────────

interface SingleCardLayoutProps {
  experience: Experience;
  inView: boolean;
  prefersReducedMotion: boolean;
}

const SingleCardLayout: React.FC<SingleCardLayoutProps> = ({ experience, inView, prefersReducedMotion }) => {
  return (
    <motion.div
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="max-w-3xl mx-auto"
    >
      <ExperienceCard 
        experience={experience} 
        index={0} 
        prefersReducedMotion={prefersReducedMotion}
        isMinimalLayout
      />
      
      {/* Subtle "more coming" indicator */}
      <motion.div 
        variants={fadeInUp}
        className="mt-8 text-center"
      >
        <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary italic">
          More experiences on the horizon...
        </p>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE LAYOUT - For 2+ experience entries
// ─────────────────────────────────────────────────────────────────────────────

interface TimelineLayoutProps {
  experiences: Experience[];
  inView: boolean;
  prefersReducedMotion: boolean;
}

const TimelineLayout: React.FC<TimelineLayoutProps> = ({ experiences, inView, prefersReducedMotion }) => {
  return (
    <div className="relative">
      {/* Central timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent-500 via-purple-500 to-accent-500 hidden lg:block" />
      
      {/* Mobile timeline line */}
      <div className="absolute left-8 w-0.5 h-full bg-gradient-to-b from-accent-500 via-purple-500 to-accent-500 lg:hidden" />

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer(0.2)}
        className="space-y-12 lg:space-y-0"
      >
        {experiences.map((experience, index) => (
          <TimelineItem 
            key={experience.id}
            experience={experience}
            index={index}
            isLeft={index % 2 === 0}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE ITEM - Individual timeline entry
// ─────────────────────────────────────────────────────────────────────────────

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLeft: boolean;
  prefersReducedMotion: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ experience, index, isLeft, prefersReducedMotion }) => {
  return (
    <motion.div
      variants={isLeft ? fadeInLeft : fadeInRight}
      className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${isLeft ? '' : 'lg:flex-row-reverse'}`}
    >
      {/* Timeline marker */}
      <motion.div 
        variants={timelineBounce}
        className={`absolute top-6 w-4 h-4 rounded-full bg-accent-500 border-4 border-light-bg dark:border-dark-bg shadow-lg
          left-6 lg:left-1/2 lg:-translate-x-1/2 z-10`}
      >
        {/* Pulse effect */}
        {experience.isCurrent && (
          <span className="absolute inset-0 rounded-full bg-accent-500 animate-ping opacity-25" />
        )}
      </motion.div>

      {/* Card */}
      <div className={`ml-16 lg:ml-0 ${isLeft ? 'lg:pr-12' : 'lg:pl-12 lg:col-start-2'}`}>
        <ExperienceCard 
          experience={experience}
          index={index}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      {/* Empty space for opposite side */}
      <div className={`hidden lg:block ${isLeft ? 'lg:col-start-2' : ''}`} />
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE CARD - Reusable card component
// ─────────────────────────────────────────────────────────────────────────────

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  prefersReducedMotion: boolean;
  isMinimalLayout?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  experience, 
  index, 
  prefersReducedMotion,
  isMinimalLayout = false 
}) => {
  return (
    <motion.div
      className={`card-incredible p-6 sm:p-8 ${isMinimalLayout ? 'lg:p-10' : ''}`}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.2, 0.9, 0.2, 1] }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          {/* Company Logo */}
          {experience.companyLogo ? (
            <img 
              src={experience.companyLogo} 
              alt={`${experience.company} logo`}
              className="w-12 h-12 rounded-xl object-contain bg-light-bg-tertiary dark:bg-dark-bg-tertiary p-2"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-purple-500/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-accent-500" />
            </div>
          )}
          
          <div>
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
              {experience.role}
            </h3>
            <div className="flex items-center gap-2">
              {experience.companyUrl ? (
                <a 
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-500 hover:underline flex items-center gap-1"
                >
                  {experience.company}
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                  {experience.company}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Type Badge */}
        <span className={`px-3 py-1 rounded-full text-sm font-medium
          ${experience.isCurrent || experience.endDate === 'Present'
            ? 'bg-success-500/20 text-success-500'
            : 'bg-accent-500/20 text-accent-500'
          }`}
        >
          {experience.type}
        </span>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{experience.startDate} - {experience.endDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{experience.location}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        {experience.description}
      </p>

      {/* Responsibilities */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-3 uppercase tracking-wider">
          Key Responsibilities
        </h4>
        <ul className="space-y-2">
          {experience.responsibilities.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              <ChevronRight size={16} className="text-accent-500 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div>
        <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-3 uppercase tracking-wider">
          Technologies Used
        </h4>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="px-3 py-1 text-xs font-medium rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary hover:bg-accent-500/20 hover:text-accent-500 transition-colors duration-200"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
