import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/fahadkhalid695' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/fahad-khalid-aa674430a/' },
    { name: 'Email', icon: <Mail size={20} />, url: 'mailto:fahadkhalid695@gmail.com' },
    { name: 'WhatsApp', icon: <Phone size={20} />, url: 'https://wa.me/923004343753' },
  ];

  return (
    <footer className="bg-dark-lighter py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <h3 className="text-xl font-bold text-light">Fahad Khalid</h3>
            <p className="text-light/70 mt-1">Computer Science Undergraduate | Tech Enthusiast</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-primary-500 transition-colors duration-300"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-dark-light text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-light/50 text-sm"
          >
            &copy; {currentYear} Fahad Khalid. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;