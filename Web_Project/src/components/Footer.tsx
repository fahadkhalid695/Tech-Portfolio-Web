import React from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const QUICK_LINKS = ['About', 'Skills', 'Projects', 'Hackathons', 'Certifications', 'Platforms'];

const SOCIAL = [
  { name: 'GitHub',   icon: <Github  size={18} />, url: 'https://github.com/fahadkhalid695' },
  { name: 'LinkedIn', icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/in/fahad-khalid-aa674430a/' },
  { name: 'Email',    icon: <Mail    size={18} />, url: 'mailto:fahadkhalid695@gmail.com' },
  { name: 'WhatsApp', icon: <Phone   size={18} />, url: 'https://wa.me/923004343753' },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t"
      style={{
        background: 'var(--color-bg-secondary)',
        borderColor: 'rgba(126,200,227,0.12)',
      }}
    >
      {/* Back to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute -top-5 right-8 w-10 h-10 flex items-center justify-center border"
        style={{
          background: 'var(--color-bg)',
          borderColor: 'rgba(126,200,227,0.25)',
          color: '#7EC8E3',
        }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </motion.button>

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="container-custom py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono-data text-xl font-bold" style={{ color: '#7EC8E3', letterSpacing: '0.08em' }}>
                FK
              </span>
              <span className="font-display font-bold uppercase text-base tracking-widest" style={{ color: 'var(--color-text)', letterSpacing: '0.10em' }}>
                Fahad Khalid
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', opacity: 0.75 }}>
              CS undergraduate · AI · Cloud · Cybersecurity.
              Building real-world solutions and student communities.
            </p>
            <div className="mt-3 font-mono-data text-[9px] tracking-widest" style={{ color: '#7EC8E3', opacity: 0.4 }}>
              // AWS SBG CAPTAIN · MICROSOFT STUDENT AMBASSADOR
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <h4
              className="font-mono-data text-[10px] uppercase tracking-widest mb-4"
              style={{ color: '#7EC8E3', opacity: 0.5 }}
            >
              QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {QUICK_LINKS.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-mono-data text-[10px] uppercase tracking-widest transition-colors duration-200"
                  style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#7EC8E3';
                    (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)';
                    (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7';
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
          >
            <h4
              className="font-mono-data text-[10px] uppercase tracking-widest mb-4"
              style={{ color: '#7EC8E3', opacity: 0.5 }}
            >
              CONNECT
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {SOCIAL.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex items-center justify-center w-9 h-9 border transition-colors duration-200"
                  style={{
                    borderColor: 'rgba(126,200,227,0.20)',
                    color: 'var(--color-text-secondary)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(126,200,227,0.45)';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#7EC8E3';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(126,200,227,0.20)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p
              className="font-mono-data text-[9px] tracking-widest"
              style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}
            >
              Open to collaborations and opportunities
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'rgba(126,200,227,0.08)' }}
        >
          <p
            className="font-mono-data text-[9px] tracking-widest"
            style={{ color: 'var(--color-text-secondary)', opacity: 0.45 }}
          >
            © {year} FAHAD KHALID · ALL RIGHTS RESERVED
          </p>
          <p
            className="font-mono-data text-[9px] tracking-widest"
            style={{ color: 'var(--color-text-secondary)', opacity: 0.35 }}
          >
            BUILT WITH REACT · TYPESCRIPT · TAILWIND CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
