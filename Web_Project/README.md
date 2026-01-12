# 🚀 Fahad Khalid - Portfolio Website

A modern, minimalistic, and futuristic portfolio website showcasing expertise in Computer Science, AI/ML, Cloud Computing, and Cybersecurity.

## ✨ Features

- **Modern Dark Theme**: Deep navy background (#0F172A) with electric cyan (#00D4FF) accents
- **Light/Dark Mode Toggle**: Seamlessly switch between themes
- **Glassmorphism UI**: Subtle glass effects with backdrop blur for modern aesthetics
- **Smooth Animations**: Framer Motion powered transitions and scroll animations
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **Interactive Components**: Magnetic buttons, custom cursor, and hover effects
- **Auto-Scrolling Badge Marquee**: Showcase digital credentials with gesture support
- **Performance Optimized**: Fast loading with Vite and React
- **Type Safe**: Built with TypeScript for reliability

## 🎨 Design System

### Color Palette
**Dark Theme:**
- **Primary Background**: Deep Navy (#0F172A)
- **Secondary Background**: Slate (#1E293B)
- **Accent Color**: Electric Cyan (#00D4FF)
- **Text**: Off-white (#F1F5F9)

**Light Theme:**
- **Primary Background**: Light Gray (#FAFAFA)
- **Secondary Background**: White (#FFFFFF)
- **Accent Color**: Deep Cyan (#00B4D8)
- **Text**: Dark Slate (#0F172A)

### Typography
- **Headings**: Inter (Bold, Modern)
- **Body**: Inter (Readable, Clean)
- **Code**: JetBrains Mono

### Design Elements
- Rounded corners (12-16px)
- Glassmorphism cards with backdrop blur
- Subtle shadow depth for hierarchy
- Smooth transitions (300ms cubic-bezier)
- Animated gradient text effects

## 📊 Project Statistics

- **Total Lines of Code**: ~6,500+ lines
  - Source Files (src/): 5,800+ lines
  - Configuration: 700+ lines
- **Components**: 22 React components
- **Sections**: 10 main sections
- **UI Components**: 7 reusable components
- **Data Files**: 7 structured data modules

## 🛠️ Tech Stack

### Core
- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 5.4** - Build tool & dev server

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS
- **Framer Motion 11** - Animation library
- **Custom CSS** - Glassmorphism & gradients

### Icons & Assets
- **Lucide React** - Icon library
- **React Icons** - Extended icon sets
- **Google Fonts** - Inter, JetBrains Mono

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/              # Main page sections
│   │   ├── Hero.tsx           # Landing section with animated text
│   │   ├── About.tsx          # About me with stats
│   │   ├── Experience.tsx     # Work experience timeline
│   │   ├── Skills.tsx         # Technical skills grid
│   │   ├── Projects.tsx       # Portfolio showcase
│   │   ├── Hackathons.tsx     # Competition achievements
│   │   ├── Certifications.tsx # Professional certificates
│   │   ├── Badges.tsx         # Digital badges marquee
│   │   ├── Platforms.tsx      # Developer profiles
│   │   └── Contact.tsx        # Contact form
│   ├── ui/                    # Reusable UI components
│   │   ├── Card.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── LoadingAnimation.tsx
│   │   ├── ScrollAnimations.tsx
│   │   ├── HorizontalScroll.tsx
│   │   └── ThemeToggle.tsx
│   ├── Header.tsx             # Navigation with theme toggle
│   └── Footer.tsx             # Footer
├── contexts/
│   └── ThemeContext.tsx       # Theme state management
├── data/                      # Content data files
│   ├── personalInfo.ts
│   ├── skills.ts
│   ├── projects.ts
│   ├── hackathons.ts
│   ├── certifications.ts
│   ├── badges.ts
│   ├── socialLinks.ts
│   └── templates/             # Data templates for reference
├── types/
│   └── index.ts               # TypeScript interfaces
├── utils/
│   ├── animations.ts          # Animation utilities
│   └── dataHelpers.ts         # Data helper functions
├── styles/
│   └── theme.css              # Custom theme styles
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Web_Project
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview production build
```bash
npm run preview
```

## 📝 Customization

### Update Personal Information
Edit `src/data/personalInfo.ts`:
```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  // ... more fields
};
```

### Add Projects
Use the template in `src/data/templates/project-template.ts`:
```typescript
{
  id: 'unique-id',
  title: 'Project Name',
  description: 'Description',
  // ... more fields
}
```

### Add Skills
Edit `src/data/skills.ts` to add new skills with categories.

### Modify Colors
Update `tailwind.config.js` to change the color scheme.

## 🎯 Sections Overview

1. **Hero** - Eye-catching landing with animated text, role titles, and CTAs
2. **About** - Personal introduction with statistics and downloadable resume
3. **Experience** - Professional work experience timeline
4. **Skills** - Technical expertise organized by category with proficiency levels
5. **Projects** - Portfolio showcase with live demos and GitHub links
6. **Hackathons** - Competition achievements with horizontal scroll
7. **Certifications** - Professional certificates and credentials
8. **Badges** - Auto-scrolling marquee of digital badges from Credly, TryHackMe, etc.
9. **Platforms** - Developer profiles (GitHub, LeetCode, TryHackMe) with quick links
10. **Contact** - Contact form with social links

## 📝 Updating Content

See [UPDATING_PORTFOLIO.md](./UPDATING_PORTFOLIO.md) for detailed instructions on:
- Updating personal information
- Adding projects, certifications, and badges
- Customizing theme colors
- Adding images and assets

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy 'dist' folder to gh-pages branch
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 👤 Author

**Fahad Khalid**
- GitHub: [@fahadkhalid695](https://github.com/fahadkhalid695)
- LinkedIn: [Fahad Khalid](https://www.linkedin.com/in/fahad-khalid-aa674430a/)
- Email: fahadkhalid695@gmail.com

## 🙏 Acknowledgments

- Design inspiration from modern tech portfolios
- Framer Motion for smooth animations
- Tailwind CSS for rapid styling
- React community for excellent tools and libraries

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
