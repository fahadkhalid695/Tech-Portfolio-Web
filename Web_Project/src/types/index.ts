// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS - Portfolio Data Structures
// ═══════════════════════════════════════════════════════════════════════════

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  // New optional fields for enhanced project display
  problem?: string;      // Problem statement
  solution?: string;     // Solution approach
  impact?: string;       // Impact/results
  status?: 'Live' | 'In Progress' | 'Completed' | 'Archived';
  featured?: boolean;    // Highlight on portfolio
}

export interface Skill {
  id: number;
  category: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
  // New optional fields
  yearsOfExperience?: number;
  projectsUsedIn?: number;
}

export interface Certification {
  id: number;
  name: string;
  organization: string;
  date: string;
  logo: string;
  verificationUrl: string;
  // New optional fields
  category?: 'Cloud' | 'Security' | 'AI' | 'Development' | 'Other';
  credentialId?: string;
  expiryDate?: string;
}

export interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon: string;
}

export interface Hackathon {
  id: number;
  name: string;
  date: string;
  location: string;
  position: string;
  project: string;
  description: string;
  technologies: string[];
  teamSize: number;
  prize: string;
  image: string;
  // New optional fields for enhanced display
  duration?: string;           // "24h" | "48h" | "72h"
  role?: string;               // "AI Engineer" | "Team Lead" | "Full Stack"
  result?: 'Winner' | 'Finalist' | 'Participant';
  lessonsLearned?: string;     // For flip card back
  challenges?: string;         // Challenges faced
  eventUrl?: string;           // Link to event page
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE TYPES - Easy to add future work history
// ═══════════════════════════════════════════════════════════════════════════

export type ExperienceType = 
  | 'Full-time' 
  | 'Part-time' 
  | 'Internship' 
  | 'Contract' 
  | 'Freelance' 
  | 'Teaching' 
  | 'Volunteer'
  | 'Research';

export interface Experience {
  id: number;
  role: string;                    // "Software Engineer", "Python Instructor"
  company: string;                 // Company or organization name
  type: ExperienceType;            // Employment type
  location: string;                // "Lahore, Pakistan" or "Remote"
  startDate: string;               // "January 2024"
  endDate: string | 'Present';     // "December 2024" or "Present"
  description: string;             // Brief overview
  responsibilities: string[];      // List of key responsibilities/achievements
  technologies: string[];          // Technologies used
  companyLogo?: string;            // Optional logo URL/path
  companyUrl?: string;             // Optional company website
  // Display helpers
  isCurrent?: boolean;             // Auto-calculated based on endDate
}

// ═══════════════════════════════════════════════════════════════════════════
// PLATFORM STATS TYPES - For live stats with intelligent fallback
// ═══════════════════════════════════════════════════════════════════════════

export type PlatformType = 
  | 'github'
  | 'linkedin'
  | 'tryhackme'
  | 'leetcode'
  | 'google-skills'
  | 'microsoft-learn'
  | 'aws-academy'
  | 'aws-educate'
  | 'aws-skill-builder'
  | 'kaggle'
  | 'hackerrank'
  | 'stackoverflow';

export interface PlatformStat {
  id: number;
  platform: PlatformType;
  displayName: string;             // "GitHub", "TryHackMe", etc.
  username: string;                // "fahadkhalid695"
  profileUrl: string;              // Full profile URL
  icon: string;                    // Icon identifier or SVG path
  color: string;                   // Brand color for theming
  
  // Primary: API-based stats (only for platforms with public APIs)
  apiConfig?: {
    endpoint: string;              // API URL
    valuePath: string;             // JSON path to extract value (e.g., "public_repos")
    headers?: Record<string, string>;
  };
  
  // Fallback: Shields.io badge or static image
  badgeUrl?: string;               // Shields.io or platform badge URL
  badgeImageUrl?: string;          // Direct image URL (like TryHackMe badge)
  
  // Static fallback values (always available)
  stats: {
    label: string;                 // "Repos", "Problems Solved", etc.
    value: string | number;        // Static value
    lastUpdated?: string;          // "January 2026"
  }[];
  
  // Display options
  showLivePulse?: boolean;         // Show "live" indicator when data is fresh
  priority?: number;               // Display order (lower = first)
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION & UI TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface AnimationVariants {
  hidden: object;
  visible: object;
  exit?: object;
}

export interface MotionConfig {
  duration: number;
  ease: number[] | string;
  delay?: number;
}

// Theme type for context
export type ThemeMode = 'light' | 'dark';