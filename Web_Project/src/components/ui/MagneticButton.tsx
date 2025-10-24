import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  disabled?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const buttonContent = (
    <motion.div
      ref={ref}
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative overflow-hidden"
        whileHover="hover"
        initial="initial"
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={{
            initial: { x: '-100%' },
            hover: { x: '100%' },
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-xl"
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            hover: { opacity: 1, scale: 1.1 },
          }}
          transition={{ duration: 0.3 }}
        />
        
        {children}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className="inline-block">
      {buttonContent}
    </button>
  );
};

export default MagneticButton;