import { Badge } from '../types';

// ═══════════════════════════════════════════════════════════════════════════
// BADGES DATA
// Add your badges from Credly, Google, Microsoft, AWS, etc.
// 
// For Credly badges:
//   - Go to your badge on Credly
//   - Click "Share" → Get the badge ID from the URL
//   - Use credlyBadgeId OR imageUrl (the PNG link)
//
// For other platforms:
//   - Use imageUrl with direct PNG/SVG link
//   - Or use embedUrl for iframe embeds
// ═══════════════════════════════════════════════════════════════════════════

export const badges: Badge[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // AWS BADGES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Introduction to Cloud 101 - Training Badge',
    issuer: 'Amazon Web Services',
    platform: 'aws',
    earnedDate: 'December 2025',
    imageUrl: 'https://www.credly.com/badges/2cc3722e-a42f-419e-b8d1-4c8c73b20068/public_url',
    verificationUrl: 'https://www.credly.com/badges/2cc3722e-a42f-419e-b8d1-4c8c73b20068/public_url',
    category: 'Cloud',
    skills: ['AWS', 'Cloud Computing', 'Cloud Fundamentals'],
    featured: true,
    priority: 1,
  },
  {
    id: 2,
    name: 'Introduction to Generative AI - Training Badge',
    issuer: 'Amazon Web Services',
    platform: 'aws',
    earnedDate: 'December 2025',
    imageUrl: 'https://www.credly.com/badges/fd5dbe56-08c8-4688-a2d1-eb91dcab4ca1/public_url',
    verificationUrl: 'https://www.credly.com/badges/fd5dbe56-08c8-4688-a2d1-eb91dcab4ca1/public_url',
    category: 'AI/ML',
    skills: ['AWS', 'Gen AI', 'Cloud Design'],
    featured: true,
    priority: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GOOGLE BADGES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    name: 'Google Cloud Digital Leader',
    issuer: 'Google Cloud',
    platform: 'google',
    earnedDate: 'November 2024',
    imageUrl: 'https://images.credly.com/size/340x340/images/44994cda-b5b0-44e3-b145-0b4e6b3c4f3d/image.png',
    verificationUrl: 'https://www.credential.net/example',
    category: 'Cloud',
    skills: ['Google Cloud', 'Cloud Fundamentals'],
    priority: 3,
  },
  {
    id: 4,
    name: 'Google AI Essentials',
    issuer: 'Google',
    platform: 'google',
    earnedDate: 'October 2024',
    imageUrl: 'https://images.credly.com/size/340x340/images/1d9d2448-1825-4a67-ade0-54c38a42be33/image.png',
    verificationUrl: 'https://www.credential.net/example',
    category: 'AI/ML',
    skills: ['AI', 'Machine Learning', 'Google AI'],
    priority: 4,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MICROSOFT BADGES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    name: 'Azure Fundamentals',
    issuer: 'Microsoft',
    platform: 'microsoft',
    earnedDate: 'October 2024',
    imageUrl: 'https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png',
    verificationUrl: 'https://learn.microsoft.com/api/credentials/share/example',
    category: 'Cloud',
    skills: ['Azure', 'Cloud Services', 'Microsoft Azure'],
    priority: 5,
  },
  {
    id: 6,
    name: 'Azure AI Fundamentals',
    issuer: 'Microsoft',
    platform: 'microsoft',
    earnedDate: 'September 2024',
    imageUrl: 'https://images.credly.com/size/340x340/images/4136ced8-75d5-4afb-8677-c4f8a7df5b6c/image.png',
    verificationUrl: 'https://learn.microsoft.com/api/credentials/share/example',
    category: 'AI/ML',
    skills: ['Azure AI', 'Machine Learning', 'Cognitive Services'],
    priority: 6,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TRYHACKME BADGES (using iframe embed)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 7,
    name: 'TryHackMe Profile',
    issuer: 'TryHackMe',
    platform: 'tryhackme',
    earnedDate: '2024',
    // Use the iframe embed URL from TryHackMe
    embedUrl: 'https://tryhackme./api/v2/badges/public-profile?userPublicId=3888371',
    embedHeight: '150px',
    verificationUrl: 'https://tryhackme.com/p/fahadkhalid695',
    category: 'Security',
    skills: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing'],
    featured: true,
    priority: 7,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LINKEDIN LEARNING BADGES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 8,
    name: 'Career Essentials in Software Development',
    issuer: 'LinkedIn Learning',
    platform: 'linkedin',
    earnedDate: 'May 2024',
    imageUrl: 'https://images.credly.com/size/340x340/images/e8b7c1e1-0612-4474-b3ea-f1e4e1ca3d94/image.png',
    verificationUrl: 'https://www.linkedin.com/learning/certificates/example',
    category: 'Development',
    skills: ['Software Development', 'Programming'],
    priority: 8,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADD MORE BADGES HERE
  // Copy any template above and fill in your actual badge details
  // Replace imageUrl with your actual badge image URLs from Credly
  // ─────────────────────────────────────────────────────────────────────────
];

// Sort badges by priority (lower number = higher priority)
export const sortedBadges = [...badges].sort((a, b) => (a.priority || 99) - (b.priority || 99));

// Get badges by category
export const getBadgesByCategory = (category: Badge['category']) => 
  badges.filter(b => b.category === category);

// Get featured badges
export const featuredBadges = badges.filter(b => b.featured);

// Get badges by platform
export const getBadgesByPlatform = (platform: Badge['platform']) =>
  badges.filter(b => b.platform === platform);

// Get unique issuers
export const uniqueIssuers = [...new Set(badges.map(b => b.issuer))];

// Get all skills from badges
export const allBadgeSkills = [...new Set(badges.flatMap(b => b.skills || []))];
