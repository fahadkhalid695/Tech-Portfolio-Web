# 🚀 Fahad Khalid - Portfolio Website

A modern, minimalistic, and futuristic portfolio website showcasing expertise in Computer Science, AI/ML, Cloud Computing, and Cybersecurity.

## ✨ Features

- **Minimalistic Design**: Clean, professional interface with deep navy background and cyan-purple gradient accents
- **Glassmorphism UI**: Subtle glass effects with backdrop blur for modern aesthetics
- **Smooth Animations**: Framer Motion powered transitions and scroll animations
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **Interactive Components**: Magnetic buttons, custom cursor, and hover effects
- **Performance Optimized**: Fast loading with Vite and React
- **Type Safe**: Built with TypeScript for reliability

## 🎨 Design System

### Color Palette
- **Primary Background**: Deep Navy (#0A192F)
- **Accent Colors**: Electric Blue (#00BFFF), Cyan (#22D3EE)
- **Gradient**: Cyan → Purple (#22D3EE → #9333EA)
- **Text**: Off-white (#EAEAEA)

### Typography
- **Headings**: Poppins (Bold, Confident)
- **Body**: Roboto (Readable, Modern)
- **Code**: Space Grotesk

### Design Elements
- Rounded corners (12-16px)
- Glassmorphism cards with backdrop blur
- Subtle shadow depth for hierarchy
- Smooth transitions (300ms cubic-bezier)

## 📊 Project Statistics

- **Total Lines of Code**: ~4,100 lines
  - Source Files (src/): 3,896 lines
  - Configuration: 206 lines
- **Components**: 19 React components
- **Sections**: 7 main sections
- **UI Components**: 5 reusable components
- **Data Files**: 6 structured data modules

## 🛠️ Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Custom CSS** - Glassmorphism & gradients

### Icons & Assets
- **Lucide React** - Icon library
- **Google Fonts** - Poppins, Roboto, Inter

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/          # Main page sections
│   │   ├── Hero.tsx       # Landing section
│   │   ├── About.tsx      # About me
│   │   ├── Skills.tsx     # Technical skills
│   │   ├── Projects.tsx   # Portfolio projects
│   │   ├── Hackathons.tsx # Competition history
│   │   ├── Certifications.tsx # Certificates
│   │   └── Contact.tsx    # Contact form
│   ├── ui/                # Reusable UI components
│   │   ├── MagneticButton.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── LoadingAnimation.tsx
│   │   ├── ScrollAnimations.tsx
│   │   └── HorizontalScroll.tsx
│   ├── Header.tsx         # Navigation
│   └── Footer.tsx         # Footer
├── data/                  # Content data
│   ├── personalInfo.ts
│   ├── skills.ts
│   ├── projects.ts
│   ├── hackathons.ts
│   ├── certifications.ts
│   ├── socialLinks.ts
│   └── templates/         # Data templates
├── types/                 # TypeScript types
├── utils/                 # Helper functions
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles
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

1. **Hero** - Eye-catching landing with animated text and icons
2. **About** - Personal introduction with downloadable resume
3. **Skills** - Technical expertise organized by category
4. **Projects** - Portfolio showcase with live demos and GitHub links
5. **Hackathons** - Competition achievements and team projects
6. **Certifications** - Professional certificates and credentials
7. **Contact** - Terminal-style contact form with social links

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
