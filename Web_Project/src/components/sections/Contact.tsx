import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Github, Linkedin, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'fahadkhalid695@gmail.com', href: 'mailto:fahadkhalid695@gmail.com' },
    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+92 300 4343753', href: 'tel:+923004343753' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: 'Pakistan', href: null },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="w-6 h-6" />, url: 'https://github.com/fahadkhalid695', color: '#181717' },
    { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6" />, url: 'https://www.linkedin.com/in/fahad-khalid-aa674430a/', color: '#0A66C2' },
  ];

  return (
    <section id="contact" className="section section-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="gradient-text-premium mb-4">Let's Connect</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Get in Touch
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                Whether you have a question, want to discuss a project, or just want to say hi, 
                feel free to reach out. I'm always open to new opportunities and collaborations.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-bg-tertiary dark:border-dark-bg-tertiary hover:border-accent-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-500 group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                      {info.label}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-light-text dark:text-dark-text font-medium hover:text-accent-500 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-light-text dark:text-dark-text font-medium">
                        {info.value}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                Connect on Social
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-bg-tertiary dark:border-dark-bg-tertiary hover:border-accent-500 flex items-center justify-center text-light-text dark:text-dark-text hover:text-accent-500 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.4 }}
          >
            <div className="card-incredible p-8">
              {formStatus === 'success' ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-500 mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-light-text dark:text-dark-text font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-light-bg-secondary dark:bg-dark-bg-secondary border-2 border-light-bg-tertiary dark:border-dark-bg-tertiary rounded-xl focus:outline-none focus:border-accent-500 text-light-text dark:text-dark-text transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-light-text dark:text-dark-text font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-light-bg-secondary dark:bg-dark-bg-secondary border-2 border-light-bg-tertiary dark:border-dark-bg-tertiary rounded-xl focus:outline-none focus:border-accent-500 text-light-text dark:text-dark-text transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-light-text dark:text-dark-text font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-light-bg-secondary dark:bg-dark-bg-secondary border-2 border-light-bg-tertiary dark:border-dark-bg-tertiary rounded-xl focus:outline-none focus:border-accent-500 text-light-text dark:text-dark-text resize-none transition-all duration-300"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 transition-all duration-300 ${
                      formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    whileHover={prefersReducedMotion || formStatus === 'submitting' ? {} : { scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
