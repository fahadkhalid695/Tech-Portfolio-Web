/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium color palette - "Confident Minimalism"
        primary: {
          50: '#e6ffff',
          100: '#ccffff',
          200: '#99ffff',
          300: '#66ffff',
          400: '#33ffff',
          500: '#00fff0', // Electric Cyan - main accent
          600: '#00ccbf',
          700: '#00998f',
          800: '#00665f',
          900: '#003330',
        },
        secondary: {
          50: '#f3f0ff',
          100: '#e6e0ff',
          200: '#ccc2ff',
          300: '#b3a3ff',
          400: '#9985ff',
          500: '#6e44ff', // Soft Purple - secondary accent
          600: '#5833cc',
          700: '#422699',
          800: '#2c1a66',
          900: '#160d33',
        },
        coral: {
          50: '#fff5f5',
          100: '#ffebeb',
          200: '#ffd6d6',
          300: '#ffc2c2',
          400: '#ffadad',
          500: '#ff6b6b', // Vibrant Coral - energy accent
          600: '#cc5555',
          700: '#994040',
          800: '#662a2a',
          900: '#331515',
        },
        // Background colors - Deep & Rich
        dark: '#0a192f', // Rich Navy - primary background
        'dark-lighter': '#112240', // Secondary background for depth
        'dark-light': '#1e2a4a', // Tertiary background
        'dark-accent': '#233554', // For subtle highlights
        // Text colors - High contrast
        light: '#e6f1ff', // Off-white primary text
        'light-secondary': '#8892b0', // Light gray secondary text
        'light-accent': '#a8b2d1', // Accent text color
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