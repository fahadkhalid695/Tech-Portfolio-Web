export interface Platform {
  id: number;
  name: string;
  username: string;
  profileUrl: string;
  icon: string; // Icon name from lucide-react or custom SVG
  stat?: {
    label: string;
    value: string;
  };
  description: string;
  color: string; // Hex color for brand
  isLive?: boolean; // Show live pulse indicator
}

export const platforms: Platform[] = [
  {
    id: 1,
    name: 'GitHub',
    username: 'fahadkhalid695',
    profileUrl: 'https://github.com/fahadkhalid695',
    icon: 'Github',
    stat: {
      label: 'Repositories',
      value: '20+',
    },
    description: 'Open source projects and contributions',
    color: '#181717',
    isLive: true,
  },
  {
    id: 2,
    name: 'LinkedIn',
    username: 'Fahad Khalid',
    profileUrl: 'https://www.linkedin.com/in/fahad-khalid-aa674430a/',
    icon: 'Linkedin',
    stat: {
      label: 'Connections',
      value: '500+',
    },
    description: 'Professional network and updates',
    color: '#0A66C2',
  },
  {
    id: 3,
    name: 'TryHackMe',
    username: 'fahadkhalid695',
    profileUrl: 'https://tryhackme.com/p/fahadkhalid695',
    icon: 'Shield',
    stat: {
      label: 'Rank',
      value: 'Top 10%',
    },
    description: 'Cybersecurity challenges and learning',
    color: '#212C42',
  },
  {
    id: 4,
    name: 'Google Cloud Skills',
    username: 'Fahad Khalid',
    profileUrl: '#',
    icon: 'Cloud',
    stat: {
      label: 'Badges',
      value: '5+',
    },
    description: 'Cloud computing certifications',
    color: '#4285F4',
  },
  {
    id: 5,
    name: 'LeetCode',
    username: 'fahadkhalid695',
    profileUrl: '#',
    icon: 'Code2',
    stat: {
      label: 'Problems',
      value: '100+',
    },
    description: 'Algorithm and data structure practice',
    color: '#FFA116',
  },
];
