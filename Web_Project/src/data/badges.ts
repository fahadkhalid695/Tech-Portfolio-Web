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
    name: 'Cloud Computing 101',
    issuer: 'Amazon Web Services',
    platform: 'aws',
    earnedDate: 'December 2025',
    imageUrl: 'https://images.credly.com/size/220x220/images/e51a8579-188d-4363-8ed1-12ad164ef57b/blob',
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
    imageUrl: 'https://images.credly.com/size/680x680/images/e50c657a-edd9-4c93-b1cf-2b6634b54abf/blob',
    verificationUrl: 'https://www.credly.com/badges/fd5dbe56-08c8-4688-a2d1-eb91dcab4ca1/public_url',
    category: 'AI/ML',
    skills: ['AWS', 'Gen AI', 'Cloud Design'],
    featured: true,
    priority: 2,
  },
    {
    id: 5,
    name: 'AWS Student Community Member',
    issuer: 'AWS',
    platform: 'aws',
    earnedDate: 'December 2025',
    imageUrl: 'https://images.credly.com/size/680x680/images/346dd316-2bda-4465-a6d8-537b3ffa2920/blob',
    verificationUrl: 'https://www.credly.com/badges/82c00361-51c7-4cbc-a37f-56bb4a69d021/public_url',
    category: 'Cloud',
    skills: ['Community', 'Cloud Services', 'AWS'],
    priority: 5,
  },
      {
    id: 7,
    name: 'Cloud Foundations - Training Badge',
    issuer: 'AWS',
    platform: 'aws',
    earnedDate: 'January 2025',
    imageUrl: 'https://images.credly.com/size/220x220/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob',
    verificationUrl: 'https://images.credly.com/size/220x220/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob',
    category: 'Cloud',
    skills: ['Clou Foundations', 'Cloud Services', 'AWS'],
    priority: 5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GOOGLE BADGES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    name: 'Cloud Security',
    issuer: 'Google Cloud',
    platform: 'google',
    earnedDate: 'December 2025',
    imageUrl: 'https://cdn.qwiklabs.com/BSm15qJin6iYgcQpTDwsRFDxw25eEdpTreetqdZ%2Bm%2Bo%3D',
    verificationUrl: 'https://www.skills.google/public_profiles/422b5228-a8eb-4a54-b6b4-6ffd34fcfd3b/badges/21440315',
    category: 'Cloud',
    skills: ['Google Cloud', 'Cloud Fundamentals', 'Cloud Analyst'],
    priority: 3,
  },
  {
    id: 4,
    name: 'Gemini for Application Developers',
    issuer: 'Google',
    platform: 'google',
    earnedDate: 'October 2024',
    imageUrl: 'https://cdn.qwiklabs.com/mkdm%2BgBAjNifUkBRYiF0o%2BprE7C3LvFpTEe%2B39dP7rU%3D',
    verificationUrl: 'https://www.skills.google/public_profiles/422b5228-a8eb-4a54-b6b4-6ffd34fcfd3b/badges/21330858',
    category: 'AI/ML',
    skills: ['AI', 'Machine Learning', 'Google AI'],
    priority: 4,
  },
    {
    id: 11,
    name: 'Create Your Own Retro Arcade Game',
    issuer: 'Google',
    platform: 'google',
    earnedDate: 'October 2024',
    imageUrl: 'https://cdn.qwiklabs.com/QOijoo%2BxhaGeYV6dLWSN7Vt6CjCsEStbvzKScBa6m%2FE%3D',
    verificationUrl: 'https://www.skills.google/public_profiles/422b5228-a8eb-4a54-b6b4-6ffd34fcfd3b/badges/21310963',
    category: 'AI/ML',
    skills: ['AI', 'Machine Learning', 'Google AI'],
    priority: 11,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MICROSOFT BADGES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    name: 'Copilot for application Developers',
    issuer: 'Microsoft',
    platform: 'microsoft',
    earnedDate: 'October 2024',
    imageUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/fahadkhalid695/6EC762C274CFC226?sharingId=5FF9E4503AB95564',
    verificationUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/fahadkhalid695/6EC762C274CFC226?sharingId=5FF9E4503AB95564',
    category: 'Cloud',
    skills: ['Azure', 'Cloud Services', 'Microsoft Azure'],
    priority: 5,
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
    embedUrl: 'https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3888371',
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


  // ─────────────────────────────────────────────────────────────────────────
  // INTRO TO CLOUD COMPUTING
  // ─────────────────────────────────────────────────────────────────────────


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
