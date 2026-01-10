/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light theme colors
        'light-bg': '#EDF2F7',
        'light-bg-secondary': '#F7FAFC',
        'light-bg-tertiary': '#E2E8F0',
        'light-text': '#0F172A',
        'light-text-secondary': '#475569',
        'light-text-tertiary': '#64748B',
        
        // Dark theme colors
        'dark-bg': '#0B1929',
        'dark-bg-secondary': '#132337',
        'dark-bg-tertiary': '#1E3A5F',
        'dark-text': '#E6F1FF',
        'dark-text-secondary': '#A8B2D1',
        'dark-text-tertiary': '#8892B0',
        
        // Accent colors (work in both themes)
        primary: {
          50: '#E6F7FF',
          100: '#CCEFFF',
          200: '#99DFFF',
          300: '#66CFFF',
          400: '#33BFFF',
          500: '#00BFFF', // Electric Blue
          600: '#0099CC',
          700: '#007399',
          800: '#004D66',
          900: '#002633',
        },
        cyan: {
          50: '#E6FBFF',
          100: '#CCF7FF',
          200: '#99EFFF',
          300: '#66E7FF',
          400: '#33DFFF',
          500: '#22D3EE', // Cyan
          600: '#1BA9BE',
          700: '#147F8F',
          800: '#0E555F',
          900: '#072A30',
        },
        purple: {
          50: '#F5E6FF',
          100: '#EBCCFF',
          200: '#D799FF',
          300: '#C366FF',
          400: '#AF33FF',
          500: '#9333EA', // Purple
          600: '#7629BB',
          700: '#591F8C',
          800: '#3C145E',
          900: '#1E0A2F',
        },
        success: {
          500: '#10B981',
          400: '#34D399',
        },
        coral: {
          500: '#FF6B6B',
          400: '#FF8787',
        },
        secondary: {
          500: '#9333EA',
          400: '#A855F7',
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
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'draw': 'draw 2s ease-out forwards',
        'magnetic': 'magnetic 0.3s ease-out',
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
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 240, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 255, 240, 0.6)' },
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