import { PlatformStat } from '../types';

// ═══════════════════════════════════════════════════════════════════════════
// PLATFORM STATS DATA
// Username: fahadkhalid695 (consistent across platforms)
// 
// Data Strategy:
// - GitHub: Live API (with caching to respect rate limits)
// - TryHackMe: Badge image + static stats
// - Others: Profile links + static stats (update manually when needed)
// ═══════════════════════════════════════════════════════════════════════════

export const USERNAME = 'fahadkhalid695';

export const platforms: PlatformStat[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // GITHUB - Live API Stats
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    platform: 'github',
    displayName: 'GitHub',
    username: USERNAME,
    profileUrl: `https://github.com/${USERNAME}`,
    icon: 'Github',
    color: '#181717',
    apiConfig: {
      endpoint: `https://api.github.com/users/${USERNAME}`,
      valuePath: 'public_repos', // Can also use: followers, following, public_gists
    },
    stats: [
      { label: 'Repositories', value: 15, lastUpdated: 'January 2026' },
      { label: 'Followers', value: 10, lastUpdated: 'January 2026' },
    ],
    showLivePulse: true,
    priority: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LINKEDIN - Profile Link Only
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    platform: 'linkedin',
    displayName: 'LinkedIn',
    username: USERNAME,
    profileUrl: `https://linkedin.com/in/${USERNAME}`,
    icon: 'Linkedin',
    color: '#0A66C2',
    stats: [
      { label: 'Followers', value: '200+', lastUpdated: 'January 2026' },
    ],
    priority: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TRYHACKME - Live badge shown in Featured section via iframe
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    platform: 'tryhackme',
    displayName: 'TryHackMe',
    username: USERNAME,
    profileUrl: `https://tryhackme.com/p/${USERNAME}`,
    icon: 'Shield',
    color: '#1C2538',
    // Badge is now shown via iframe in Featured section
    stats: [
      { label: 'Rooms Completed', value: '100+', lastUpdated: 'January 2026' },
      { label: 'Level', value: '9', lastUpdated: 'January 2026' },
    ],
    priority: 3,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GOOGLE SKILLS / SKILLSHOP
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    platform: 'google-skills',
    displayName: 'Google Skills',
    username: USERNAME,
    profileUrl: `https://www.skills.google/public_profiles/422b5228-a8eb-4a54-b6b4-6ffd34fcfd3b`,
    icon: 'GraduationCap',
    color: '#4285F4',
    stats: [
      { label: 'Certifications', value: 3, lastUpdated: 'January 2026' },
    ],
    priority: 4,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MICROSOFT LEARN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    platform: 'microsoft-learn',
    displayName: 'Microsoft Learn',
    username: USERNAME,
    profileUrl: `https://learn.microsoft.com/users/${USERNAME}`,
    icon: 'BookOpen',
    color: '#5E5E5E',
    stats: [
      { label: 'XP Earned', value: '1500+', lastUpdated: 'January 2026' },
      { label: 'Modules', value: 20, lastUpdated: 'January 2026' },
    ],
    priority: 5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AWS ACADEMY
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 6,
    platform: 'aws-academy',
    displayName: 'AWS Academy',
    username: USERNAME,
    profileUrl: 'https://www.awsacademy.com/',
    icon: 'Cloud',
    color: '#FF9900',
    stats: [
      { label: 'Courses', value: 1, lastUpdated: 'January 2026' },
    ],
    priority: 6,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AWS EDUCATE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 7,
    platform: 'aws-educate',
    displayName: 'AWS Educate',
    username: USERNAME,
    profileUrl: 'https://www.awseducate.com/',
    icon: 'Award',
    color: '#FF9900',
    stats: [
      { label: 'Badges', value: 3, lastUpdated: 'January 2026' },
    ],
    priority: 7,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AWS SKILL BUILDER
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 8,
    platform: 'aws-skill-builder',
    displayName: 'AWS Skill Builder',
    username: USERNAME,
    profileUrl: 'https://explore.skillbuilder.aws/',
    icon: 'Layers',
    color: '#FF9900',
    stats: [
      { label: 'Learning Hours', value: '5+', lastUpdated: 'January 2026' },
      { label: 'Courses', value: '1', lastUpdated: 'January 2026' },
    ],
    priority: 8,
  },
];

// Sort platforms by priority
export const sortedPlatforms = [...platforms].sort((a, b) => 
  (a.priority || 999) - (b.priority || 999)
);

// Get platform by type
export const getPlatformByType = (type: PlatformStat['platform']): PlatformStat | undefined => {
  return platforms.find(p => p.platform === type);
};

// Get all AWS platforms
export const getAWSPlatforms = (): PlatformStat[] => {
  return platforms.filter(p => p.platform.startsWith('aws-'));
};
