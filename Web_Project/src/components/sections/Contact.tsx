import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Github, Linkedin, Mail, Phone, MessageCircle, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import {
  staggerContainer,
  staggerItem,
  fadeInLeft,
  fadeInRight,
  useReducedMotion,
} from '../../utils/animations';

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT SECTION - Form with validation and toast feedback
// Features: floating labels, social links grid, success/error states
// ═══════════════════════════════════════════════════════════════════════════

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setToast({ message: 'Message sent successfully! I\'ll get back to you soon.', type: 'success' });

      setTimeout(() => {
        setFormStatus('idle');
        setToast(null);
      }, 5000);
    }, 1500);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={20} />,
      url: 'https://github.com/fahadkhalid695',
      color: '#333',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      url: 'https://www.linkedin.com/in/fahad-khalid-aa674430a/',
      color: '#0A66C2',
    },
    {
      name: 'Email',
      icon: <Mail size={20} />,
      url: 'mailto:fahadkhalid695@gmail.com',
      color: '#EA4335',
    },
    {
      name: 'WhatsApp',
      icon: <Phone size={20} />,
      url: 'https://wa.me/923004343753',
      color: '#25D366',
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 section-primary relative overflow-hidden"
      aria-label="Contact me"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 left-1/2 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-success-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1)}
          className="text-center mb-16"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block px-4 py-2 rounded-full bg-accent-500/10 text-accent-500 text-sm font-medium mb-4"
          >
            <MessageCircle size={14} className="inline mr-2" />
            Let's Talk
          </motion.span>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            Have a question or want to work together? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInLeft}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Contact Information
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Feel free to reach out through the contact form or connect with me on social media.
              </p>

              {/* Location */}
              <div className="flex items-center gap-3 text-light-text-secondary dark:text-dark-text-secondary mb-4">
                <div className="p-2 rounded-lg bg-accent-500/10">
                  <MapPin size={18} className="text-accent-500" />
                </div>
                <span>Pakistan</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glass p-4 flex items-center gap-3 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
                  style={{ '--hover-color': link.color } as React.CSSProperties}
                >
                  <div
                    className="p-2 rounded-lg transition-colors duration-300"
                    style={{ background: `${link.color}20` }}
                  >
                    <span style={{ color: link.color }}>{link.icon}</span>
                  </div>
                  <span className="text-light-text dark:text-dark-text font-medium group-hover:text-accent-500 transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInRight}
          >
            <div className="card-incredible p-6 sm:p-8">
              {formStatus === 'success' ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-success-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-success-500" />
                  </div>
                  <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text dark:text-dark-text focus:outline-none ${
                        errors.name
                          ? 'border-red-500'
                          : focusedField === 'name'
                          ? 'border-accent-500 ring-2 ring-accent-500/20'
                          : 'border-light-bg-tertiary dark:border-dark-bg-tertiary'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text dark:text-dark-text focus:outline-none ${
                        errors.email
                          ? 'border-red-500'
                          : focusedField === 'email'
                          ? 'border-accent-500 ring-2 ring-accent-500/20'
                          : 'border-light-bg-tertiary dark:border-dark-bg-tertiary'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text dark:text-dark-text focus:outline-none resize-none ${
                        errors.message
                          ? 'border-red-500'
                          : focusedField === 'message'
                          ? 'border-accent-500 ring-2 ring-accent-500/20'
                          : 'border-light-bg-tertiary dark:border-dark-bg-tertiary'
                      }`}
                      placeholder="Your message..."
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <MagneticButton
                    onClick={handleSubmit}
                    disabled={formStatus === 'submitting'}
                    className={`btn-premium w-full flex items-center justify-center gap-2 ${
                      formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    strength={0.3}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span className="relative z-10">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Send Message</span>
                        <Send size={18} className="relative z-10" />
                      </>
                    )}
                  </MagneticButton>
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