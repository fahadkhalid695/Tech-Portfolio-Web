import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, ChevronLeft, ChevronRight, Calendar, Building, X } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Certifications: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [groupBy, setGroupBy] = useState<'all' | 'category'>('all');
  const prefersReducedMotion = useReducedMotion();

  // Group certificates by category
  const groupedCerts = {
    'Cloud': certifications.filter(c => c.name.toLowerCase().includes('cloud') || c.name.toLowerCase().includes('aws') || c.name.toLowerCase().includes('azure')),
    'Security': certifications.filter(c => c.name.toLowerCase().includes('security') || c.name.toLowerCase().includes('cyber')),
    'AI': certifications.filter(c => c.name.toLowerCase().includes('ai') || c.name.toLowerCase().includes('machine') || c.name.toLowerCase().includes('data')),
    'Other': certifications.filter(c => {
      const name = c.name.toLowerCase();
      return !name.includes('cloud') && !name.includes('aws') && !name.includes('azure') && 
             !name.includes('security') && !name.includes('cyber') && 
             !name.includes('ai') && !name.includes('machine') && !name.includes('data');
    }),
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const displayCerts = groupBy === 'all' ? certifications : Object.values(groupedCerts).flat();

  return (
    <section id="certifications" className="section section-light">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="gradient-text-premium mb-4">Certifications</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-6">
            Continuous learning validated by industry-recognized credentials.
          </p>

          {/* Group toggle */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setGroupBy('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                groupBy === 'all'
                  ? 'bg-accent-500 text-white'
                  : 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text hover:bg-accent-500/10'
              }`}
            >
              All Certificates
            </button>
            <button
              onClick={() => setGroupBy('category')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                groupBy === 'category'
                  ? 'bg-accent-500 text-white'
                  : 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text hover:bg-accent-500/10'
              }`}
            >
              By Category
            </button>
          </div>
        </motion.div>

        {/* Horizontal carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-light-bg dark:bg-dark-bg border border-light-bg-tertiary dark:border-dark-bg-tertiary rounded-full flex items-center justify-center shadow-xl hover:bg-accent-500 hover:border-accent-500 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-light-text dark:text-dark-text group-hover:text-white" />
            </motion.button>
          )}

          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-light-bg dark:bg-dark-bg border border-light-bg-tertiary dark:border-dark-bg-tertiary rounded-full flex items-center justify-center shadow-xl hover:bg-accent-500 hover:border-accent-500 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-light-text dark:text-dark-text group-hover:text-white" />
            </motion.button>
          )}

          {/* Cards container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide snap-x snap-mandatory"
          >
            {displayCerts.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                index={index}
                inView={inView}
                onOpenPreview={() => setSelectedCert(cert)}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-500 mb-2">{certifications.length}</div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Certifications</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {new Set(certifications.map(c => c.organization)).size}
            </div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Organizations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-500 mb-2">100%</div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">2+</div>
            <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Years Learning</div>
          </div>
        </motion.div>
      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </section>
  );
};

interface CertificateCardProps {
  cert: any;
  index: number;
  inView: boolean;
  onOpenPreview: () => void;
  prefersReducedMotion: boolean;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  cert,
  index,
  inView,
  onOpenPreview,
  prefersReducedMotion,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex-shrink-0 w-[320px] snap-center"
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: index * 0.1,
      }}
    >
      <motion.div
        className="card-incredible p-6 h-full cursor-pointer"
        whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onOpenPreview}
      >
        {/* Soft border glow on active */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-accent-500/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="relative z-10">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-accent-500" />
          </div>

          {/* Certificate name */}
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2 line-clamp-2">
            {cert.name}
          </h3>

          {/* Issuer */}
          <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">
            <Building className="w-4 h-4" />
            <span>{cert.organization}</span>
          </div>

          {/* Year */}
          <div className="flex items-center gap-2 text-sm text-light-text-tertiary dark:text-dark-text-tertiary mb-4">
            <Calendar className="w-4 h-4" />
            <span>{cert.date}</span>
          </div>

          {/* Credential type */}
          <div className="inline-block px-3 py-1 bg-accent-500/10 text-accent-500 text-xs font-medium rounded-full mb-4">
            Professional Certificate
          </div>

          {/* Verify button - fades in on hover */}
          <motion.a
            href={cert.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-bg-tertiary dark:border-dark-bg-tertiary hover:border-accent-500 text-light-text dark:text-dark-text hover:text-accent-500 rounded-xl text-sm font-medium transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View Credential</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface CertificateModalProps {
  cert: any;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl card-incredible p-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-bg-secondary hover:bg-accent-500 text-dark-text hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center flex-shrink-0">
            <Award className="w-10 h-10 text-accent-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-dark-text mb-2">{cert.name}</h2>
            <p className="text-dark-text-secondary">{cert.organization}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-dark-text-secondary">
            <Calendar className="w-5 h-5 text-accent-500" />
            <span>Issued: {cert.date}</span>
          </div>
          <div className="p-4 bg-dark-bg-secondary rounded-xl border border-dark-bg-tertiary">
            <p className="text-sm text-dark-text-secondary">
              This certification validates professional competency and demonstrates commitment to continuous learning and skill development.
            </p>
          </div>
        </div>

        <a
          href={cert.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-accent-500 to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-accent-500/25"
        >
          <ExternalLink className="w-5 h-5" />
          Verify Credential
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Certifications;
