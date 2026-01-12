/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════
        // MODERN DARK THEME (Primary Theme)
        // ═══════════════════════════════════════════════════════════
        'dark-bg': '#0F172A',           // Very dark navy - primary background
        'dark-bg-secondary': '#0B1220', // Card/surface background
        'dark-bg-tertiary': '#1E293B',  // Elevated surfaces
        'dark-text': '#E6EEF8',         // Off-white - primary text
        'dark-text-secondary': '#94A3B8', // Muted text
        'dark-text-tertiary': '#64748B',  // Subtle text
        'dark-muted': '#6B7280',         // Muted gray
        
        // ═══════════════════════════════════════════════════════════
        // SOFT PROFESSIONAL LIGHT THEME
        // ═══════════════════════════════════════════════════════════
        'light-bg': '#FFFFFF',          // Pure white base
        'light-bg-secondary': '#F6F9FF', // Soft blue-tinted surface
        'light-bg-tertiary': '#EEF2FF',  // Elevated surfaces
        'light-text': '#0F172A',         // Dark slate - primary text
        'light-text-secondary': '#475569', // Muted text
        'light-text-tertiary': '#64748B',  // Subtle text
        'light-muted': '#94A3B8',          // Muted gray
        
        // ═══════════════════════════════════════════════════════════
        // ACCENT COLORS (Work in both themes)
        // ═══════════════════════════════════════════════════════════
        accent: {
          DEFAULT: '#00D4FF',  // Cyan - primary accent (dark theme)
          light: '#0B63FF',    // Electric blue - primary accent (light theme)
          50: '#E6FBFF',
          100: '#CCF7FF',
          200: '#99EFFF',
          300: '#66E7FF',
          400: '#33DFFF',
          500: '#00D4FF',      // Main cyan
          600: '#00A8CC',
          700: '#007D99',
          800: '#005266',
          900: '#002933',
        },
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#0B63FF',      // Electric Blue (light theme accent)
          600: '#0952CC',
          700: '#0741A3',
          800: '#053080',
          900: '#031F5C',
        },
        cyan: {
          50: '#E6FBFF',
          100: '#CCF7FF',
          200: '#99EFFF',
          300: '#66E7FF',
          400: '#33DFFF',
          500: '#00D4FF',      // Cyan accent
          600: '#00A8CC',
          700: '#007D99',
          800: '#005266',
          900: '#002933',
        },
        purple: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',      // Purple accent
          600: '#9333EA',
          700: '#7C3AED',
          800: '#6D28D9',
          900: '#5B21B6',
        },
        // Result-based hackathon glows
        gold: {
          DEFAULT: '#FFD700',
          glow: 'rgba(255, 215, 0, 0.4)',
        },
        success: {
          50: '#ECFDF5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        coral: {
          400: '#FF8787',
          500: '#FF6B6B',
        },
        secondary: {
          400: '#A855F7',
          500: '#9333EA',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Poppins',
          'Inter',
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      spacing: {
        // 8-point grid system
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '9': '72px',
        '10': '80px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1s infinite',
        'float-more-delayed': 'float 3s ease-in-out 2s infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'draw': 'draw 2s ease-out forwards',
        'magnetic': 'magnetic 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.6s var(--ease) forwards',
        'fade-in': 'fade-in 0.4s var(--ease) forwards',
        'scale-in': 'scale-in 0.4s var(--ease) forwards',
        'slide-in-left': 'slide-in-left 0.6s var(--ease) forwards',
        'slide-in-right': 'slide-in-right 0.6s var(--ease) forwards',
        'bounce-in': 'bounce-in 0.5s var(--ease) forwards',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        magnetic: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '50%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(0.95)', opacity: '1' },
        },
      },
      screens: {
        'sm': '320px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};