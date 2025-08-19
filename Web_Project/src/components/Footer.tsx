import React from 'react';
import { Github, Linkedin, Mail, Phone, Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/fahadkhalid695' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/fahad-khalid-aa674430a/' },
    { name: 'Email', icon: <Mail size={20} />, url: 'mailto:fahadkhalid695@gmail.com' },
    { name: 'WhatsApp', icon: <Phone size={20} />, url: 'https://wa.me/923004343753' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark border-t border-dark-light relative">
      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp size={20} />
      </motion.button>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-primary-500 text-2xl font-bold">FK</span>
              <span className="text-light text-xl font-semibold">Fahad Khalid</span>
            </div>
            <p className="text-light/70 leading-relaxed">
              Computer Science Undergraduate passionate about AI/ML, Cloud Computing, and Cybersecurity. 
              Building innovative solutions for tomorrow's challenges.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-light font-semibold text-lg">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {['About', 'Skills', 'Projects', 'Hackathons', 'Certifications', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-light/70 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-light font-semibold text-lg">Connect With Me</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-dark-lighter hover:bg-primary-500/20 border border-dark-light hover:border-primary-500/30 rounded-lg text-light/70 hover:text-primary-400 transition-all duration-300 group"
                  aria-label={link.name}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300 inline-block">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
            <p className="text-light/60 text-sm">
              Open to collaboration and new opportunities
            </p>
          </motion.div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-dark-light">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-light/50 text-sm flex items-center gap-1">
              &copy; {currentYear} Fahad Khalid. Made with 
              <Heart size={14} className="text-red-500 animate-pulse" /> 
              and lots of coffee
            </p>
            <p className="text-light/50 text-sm">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;