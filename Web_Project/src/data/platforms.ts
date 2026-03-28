import { PlatformStat } from '../types';

// ═══════════════════════════════════════════════════════════════════════════
// PLATFORM STATS DATA
// Username: fahadkhalid695 (consistent across platforms)
// 
// Data Strategy:
// - Platform tiles show profile links + key stats
// - GitHub is shown below as dedicated live stat cards
// ═══════════════════════════════════════════════════════════════════════════

export const USERNAME = 'fahadkhalid695';

export const platforms: PlatformStat[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // GOOGLE SKILLS / SKILLSHOP
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    platform: 'google-skills',
    displayName: 'Google Skills',
    username: USERNAME,
    profileUrl: `https://www.skills.google/public_profiles/422b5228-a8eb-4a54-b6b4-6ffd34fcfd3b`,
    icon: 'GraduationCap',
    color: '#4285F4',
    stats: [
      { label: 'Certifications', value: 3, lastUpdated: 'January 2026' },
    ],
    priority: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MICROSOFT LEARN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 2,
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
    priority: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AWS ACADEMY
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    platform: 'aws-academy',
    displayName: 'AWS Academy',
    username: USERNAME,
    profileUrl: 'https://www.awsacademy.com/',
    icon: 'Cloud',
    color: '#FF9900',
    stats: [
      { label: 'Courses', value: 1, lastUpdated: 'January 2026' },
    ],
    priority: 3,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AWS EDUCATE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    platform: 'aws-educate',
    displayName: 'AWS Educate',
    username: USERNAME,
    profileUrl: 'https://www.awseducate.com/',
    icon: 'Award',
    color: '#FF9900',
    stats: [
      { label: 'Badges', value: 3, lastUpdated: 'January 2026' },
    ],
    priority: 4,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AWS SKILL BUILDER
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 5,
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
    priority: 5,
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
