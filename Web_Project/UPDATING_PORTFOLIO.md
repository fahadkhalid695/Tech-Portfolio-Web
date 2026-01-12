# 📝 Updating Your Portfolio

This guide explains how to update and customize your portfolio content. All data is stored in the `src/data/` directory, making it easy to modify without touching the UI code.

---

## 📁 File Structure

```
src/data/
├── personalInfo.ts      # Your personal details & resume
├── skills.ts            # Technical skills by category
├── projects.ts          # Project showcase
├── hackathons.ts        # Hackathon achievements
├── certifications.ts    # Professional certifications
├── badges.ts            # Digital badges & credentials
├── socialLinks.ts       # Social media links
└── templates/           # Reference templates
```

---

## 👤 Personal Information

**File:** `src/data/personalInfo.ts`

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Professional Title",
  email: "your.email@example.com",
  location: "Your City, Country",
  about: "A brief bio about yourself...",
  
  // Resume configuration
  resume: {
    url: '/resume.pdf',           // Path to your resume in public folder
    action: 'view' | 'download',  // 'view' opens in browser, 'download' downloads
  },
};
```

### Adding Your Resume
1. Place your resume PDF in the `public/` folder
2. Update `resume.url` to match the filename
3. Set `resume.action` to either `'view'` or `'download'`

---

## 💼 Skills

**File:** `src/data/skills.ts`

```typescript
export const skills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',        // Options: frontend, backend, cloud, security, ai, database, tools, mobile
    level: 90,                   // Proficiency percentage (0-100)
    icon: SiReact,               // Import from 'react-icons/si'
    color: '#61DAFB',           // Brand color (hex)
    description: 'Building modern UIs with React and Next.js',
  },
];
```

### Available Categories
- `frontend` - Frontend technologies
- `backend` - Backend/server technologies
- `cloud` - Cloud platforms & services
- `security` - Cybersecurity tools & practices
- `ai` - AI/ML frameworks & tools
- `database` - Database systems
- `tools` - Development tools & DevOps
- `mobile` - Mobile development

---

## 🚀 Projects

**File:** `src/data/projects.ts`

```typescript
export const projects: Project[] = [
  {
    id: 'unique-project-id',
    title: 'Project Name',
    description: 'Brief description of what the project does...',
    longDescription: 'Detailed description with key features and technologies used.',
    technologies: ['React', 'TypeScript', 'Node.js'],
    image: '/image/project-screenshot.png',  // Place in public/image/
    liveUrl: 'https://your-project.com',     // Optional
    githubUrl: 'https://github.com/you/repo', // Optional
    category: 'web' | 'mobile' | 'ai' | 'security' | 'cloud' | 'other',
    featured: true,              // Show prominently
    status: 'completed',         // Options: completed, in-progress, archived
    startDate: 'Jan 2024',
    endDate: 'Mar 2024',        // Or 'Present' for ongoing
  },
];
```

### Adding Project Images
1. Create/add images to `public/image/`
2. Reference as `/image/your-image.png`
3. Recommended size: 800x600px or 16:9 ratio

---

## 🏆 Hackathons

**File:** `src/data/hackathons.ts`

```typescript
export const hackathons: Hackathon[] = [
  {
    id: 'hackathon-id',
    name: 'Hackathon Name 2024',
    organizer: 'Organizing Company/University',
    date: 'Month 2024',
    location: 'City, Country',     // Or 'Virtual'
    achievement: '1st Place',      // Your placement/achievement
    projectName: 'Your Project Name',
    projectDescription: 'What your team built during the hackathon.',
    technologies: ['Python', 'TensorFlow', 'Flask'],
    teamSize: 4,
    devpostUrl: 'https://devpost.com/software/project',  // Optional
    githubUrl: 'https://github.com/team/project',        // Optional
    image: '/image/hackathon-photo.jpg',                 // Optional
    featured: true,
  },
];
```

---

## 🎓 Certifications

**File:** `src/data/certifications.ts`

```typescript
export const certifications: Certification[] = [
  {
    id: 'cert-id',
    name: 'Certification Name',
    issuer: 'Issuing Organization',
    issueDate: 'Jan 2024',
    expirationDate: 'Jan 2027',    // Optional - omit if no expiry
    credentialId: 'ABC123XYZ',     // Your credential ID
    credentialUrl: 'https://verify.example.com/cert/ABC123', // Verification link
    image: '/image/cert-badge.png', // Badge image (optional)
    skills: ['Cloud', 'Security', 'DevOps'],
    category: 'cloud' | 'security' | 'development' | 'ai' | 'data' | 'other',
    featured: true,
  },
];
```

### Getting Certificate Images
- **Credly:** Right-click badge → "Copy image address"
- **Google:** Download from your Google Cloud Skills Boost profile
- **Microsoft:** Download from Microsoft Learn achievements

---

## 🏅 Digital Badges

**File:** `src/data/badges.ts`

Badges can display as **images** or **iframes** (for live embeds):

### Image Badge
```typescript
{
  id: 1,
  name: 'AWS Cloud Practitioner',
  issuer: 'Amazon Web Services',
  platform: 'credly',            // credly, google, microsoft, aws, linkedin, tryhackme, etc.
  earnedDate: 'March 2024',
  imageUrl: 'https://images.credly.com/size/340x340/images/xxx/badge.png',
  verificationUrl: 'https://www.credly.com/badges/your-badge-id',
  category: 'Cloud',
  skills: ['AWS', 'Cloud Computing'],
  featured: true,
  priority: 1,                   // Lower number = appears first
}
```

### Iframe Embed (TryHackMe, etc.)
```typescript
{
  id: 2,
  name: 'TryHackMe Profile',
  issuer: 'TryHackMe',
  platform: 'tryhackme',
  earnedDate: '2024',
  embedUrl: 'https://tryhackme.com/api/v2/badges/public-profile?userPublicId=YOUR_ID',
  embedHeight: '150px',
  verificationUrl: 'https://tryhackme.com/p/yourusername',
  category: 'Security',
  skills: ['Cybersecurity', 'Penetration Testing'],
}
```

### Getting Badge URLs

**Credly:**
1. Go to your badge on Credly
2. Click "Share" → "Embed"
3. Copy the image URL from `src="..."` attribute
4. Or use format: `https://www.credly.com/badges/{badge-id}/public_url`

**TryHackMe:**
1. Go to your profile → Settings
2. Get your public user ID
3. Use: `https://tryhackme.com/api/v2/badges/public-profile?userPublicId={YOUR_ID}`

---

## 🔗 Social Links

**File:** `src/data/socialLinks.ts`

```typescript
export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: Github,                // Import from 'lucide-react'
    color: '#333',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourprofile',
    icon: Linkedin,
    color: '#0A66C2',
  },
  // Add more social links...
];
```

---

## 🎨 Customizing Theme Colors

**File:** `tailwind.config.js`

### Accent Color
```javascript
accent: {
  DEFAULT: '#00D4FF',  // Primary accent color
  // ... other shades
}
```

### Dark Theme Background
```javascript
dark: {
  bg: {
    DEFAULT: '#0F172A',        // Main background
    secondary: '#1E293B',      // Card backgrounds
    tertiary: '#334155',       // Subtle elements
  },
}
```

### Light Theme Background
```javascript
light: {
  bg: {
    DEFAULT: '#FAFAFA',
    secondary: '#FFFFFF',
    tertiary: '#F1F5F9',
  },
}
```

---

## 🖼️ Adding Images

All images should be placed in `public/image/`:

```
public/
└── image/
    ├── profile.jpg        # Your profile photo
    ├── project-1.png      # Project screenshots
    ├── cert-badge.png     # Certification badges
    └── hackathon.jpg      # Event photos
```

**Recommended Formats:**
- Profile: 400x400px, JPG/PNG
- Projects: 800x600px or 16:9, PNG/WebP
- Badges: 340x340px, PNG

---

## ✅ Quick Checklist

When updating your portfolio:

- [ ] Update `personalInfo.ts` with your details
- [ ] Add your resume to `public/` folder
- [ ] Add at least 3-5 projects
- [ ] Include your certifications with verification URLs
- [ ] Add digital badges from Credly/TryHackMe
- [ ] Update social links
- [ ] Add project/hackathon images
- [ ] Test all external links work

---

## 🚀 After Making Changes

1. **Development Mode:** Changes appear instantly with hot reload
2. **Build:** Run `npm run build` to create production build
3. **Test:** Run `npm run preview` to test production build
4. **Deploy:** Push to GitHub for automatic deployment (if configured)

---

## 🆘 Troubleshooting

### Images Not Loading
- Check file path starts with `/image/` (not `./image/`)
- Verify file exists in `public/image/`
- Check filename matches exactly (case-sensitive)

### Badge Images Not Showing
- Credly images may require direct image URL (not badge URL)
- Use format: `https://images.credly.com/size/340x340/images/xxx/image.png`

### Iframe Not Displaying
- Check embedUrl is correct
- Some platforms block iframe embedding
- Verify CORS settings allow embedding

---

Need more help? Check the [README.md](./README.md) for setup instructions.
