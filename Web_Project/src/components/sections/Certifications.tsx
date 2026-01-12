import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Calendar, Building, CheckCircle, Filter } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { Certification } from '../../types';
import {
  staggerContainer,
  staggerItem,
  useReducedMotion,
} from '../../utils/animations';

// ═══════════════════════════════════════════════════════════════════════════
// CERTIFICATIONS SECTION - Filter system with provider-themed cards
// Features: animated borders, provider colors, staggered entries
// ═══════════════════════════════════════════════════════════════════════════

// Provider color configurations
const getProviderConfig = (org: string): { color: string; bgColor: string; borderColor: string } => {
  const orgLower = org.toLowerCase();
  
  if (orgLower.includes('aws') || orgLower.includes('amazon')) {
    return { color: '#FF9900', bgColor: 'rgba(255, 153, 0, 0.1)', borderColor: 'rgba(255, 153, 0, 0.3)' };
  }
  if (orgLower.includes('azure') || orgLower.includes('microsoft')) {
    return { color: '#0078D4', bgColor: 'rgba(0, 120, 212, 0.1)', borderColor: 'rgba(0, 120, 212, 0.3)' };
  }
  if (orgLower.includes('google') || orgLower.includes('gcp')) {
    return { color: '#4285F4', bgColor: 'rgba(66, 133, 244, 0.1)', borderColor: 'rgba(66, 133, 244, 0.3)' };
  }
  if (orgLower.includes('udemy')) {
    return { color: '#A435F0', bgColor: 'rgba(164, 53, 240, 0.1)', borderColor: 'rgba(164, 53, 240, 0.3)' };
  }
  if (orgLower.includes('coursera')) {
    return { color: '#0056D2', bgColor: 'rgba(0, 86, 210, 0.1)', borderColor: 'rgba(0, 86, 210, 0.3)' };
  }
  if (orgLower.includes('linkedin')) {
    return { color: '#0A66C2', bgColor: 'rgba(10, 102, 194, 0.1)', borderColor: 'rgba(10, 102, 194, 0.3)' };
  }
  if (orgLower.includes('cisco')) {
    return { color: '#049FD9', bgColor: 'rgba(4, 159, 217, 0.1)', borderColor: 'rgba(4, 159, 217, 0.3)' };
  }
  // Default accent color
  return { color: '#00D4FF', bgColor: 'rgba(0, 212, 255, 0.1)', borderColor: 'rgba(0, 212, 255, 0.3)' };
};

const Certifications: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<string>('All');

  // Get unique organizations
  const organizations = ['All', ...Array.from(new Set(certifications.map((c) => c.organization)))];

  const filteredCerts =
    filter === 'All'
      ? certifications
      : certifications.filter((c) => c.organization === filter);

  return (
    <section
      id="certifications"
      className="py-20 lg:py-32 section-secondary relative overflow-hidden"
      aria-label="Certifications and achievements"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-success-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl" />
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
            className="inline-block px-4 py-2 rounded-full bg-success-500/10 text-success-500 text-sm font-medium mb-4"
          >
            <Award size={14} className="inline mr-2" />
            Verified Credentials
          </motion.span>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Certifications & <span className="gradient-text">Achievements</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            Professional certifications that validate expertise and commitment to continuous learning.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <Filter size={18} className="text-light-text-tertiary dark:text-dark-text-tertiary self-center mr-2" />
          {organizations.map((org) => {
            const config = org !== 'All' ? getProviderConfig(org) : null;
            return (
              <button
                key={org}
                onClick={() => setFilter(org)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === org
                    ? 'text-white shadow-lg'
                    : 'bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary hover:opacity-80'
                }`}
                style={
                  filter === org && config
                    ? { background: config.color, boxShadow: `0 4px 20px ${config.color}40` }
                    : filter === org
                    ? { background: 'linear-gradient(135deg, #00D4FF, #A855F7)' }
                    : undefined
                }
              >
                {org}
              </button>
            );
          })}
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1, 0.4)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                index={index}
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: certifications.length, label: 'Certifications', color: 'text-accent-500' },
            {
              value: new Set(certifications.map((c) => c.organization)).size,
              label: 'Organizations',
              color: 'text-purple-400',
            },
            { value: '100%', label: 'Verified', color: 'text-success-500' },
            { value: 'A+', label: 'Rating', color: 'text-orange-400' },
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
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// CERTIFICATION CARD - Provider-themed with animated border
// ═══════════════════════════════════════════════════════════════════════════

interface CertificationCardProps {
  cert: Certification;
  index: number;
  prefersReducedMotion: boolean;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  cert,
  index,
  prefersReducedMotion,
}) => {
  const config = getProviderConfig(cert.organization);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="card-incredible group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
      style={{
        borderColor: isHovered ? config.borderColor : undefined,
        boxShadow: isHovered ? `0 0 30px ${config.color}30` : undefined,
      }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent, ${config.color}40, transparent)`,
          backgroundSize: '200% 200%',
        }}
        animate={
          isHovered && !prefersReducedMotion
            ? { backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }
            : {}
        }
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            className="p-3 rounded-xl"
            style={{ background: config.bgColor }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
          >
            <Award size={24} style={{ color: config.color }} />
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-1 group-hover:text-accent-500 transition-colors line-clamp-2">
              {cert.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
              <Building size={14} style={{ color: config.color }} />
              <span className="truncate">{cert.organization}</span>
            </div>
          </div>

          {/* Verified badge */}
          <motion.div
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-success-500/10 text-success-500 text-xs font-medium"
            animate={
              !prefersReducedMotion
                ? { y: [0, -2, 0] }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle size={10} />
            <span className="hidden sm:inline">Verified</span>
          </motion.div>
        </div>

        {/* Date */}
        <div
          className="flex items-center gap-2 text-sm mb-4 p-2 rounded-lg"
          style={{ background: config.bgColor }}
        >
          <Calendar size={14} style={{ color: config.color }} />
          <span className="text-light-text-secondary dark:text-dark-text-secondary">
            Earned: {cert.date}
          </span>
        </div>

        {/* Verify Button */}
        <motion.a
          href={cert.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300"
          style={{
            background: isHovered ? config.color : config.bgColor,
            color: isHovered ? 'white' : config.color,
            border: `1px solid ${config.borderColor}`,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink size={16} />
          Verify Certificate
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Certifications;