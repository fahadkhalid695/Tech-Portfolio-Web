// Data Helper Utilities
// These functions help maintain data consistency and generate statistics

import { Project, Skill, Hackathon, Certification } from '../types';

// Auto-generate next available ID for each data type
export const getNextId = {
  project: (projects: Project[]): number => {
    return projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
  },
  
  skill: (skills: Skill[]): number => {
    return skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;
  },
  
  hackathon: (hackathons: Hackathon[]): number => {
    return hackathons.length > 0 ? Math.max(...hackathons.map(h => h.id)) + 1 : 1;
  },
  
  certification: (certifications: Certification[]): number => {
    return certifications.length > 0 ? Math.max(...certifications.map(c => c.id)) + 1 : 1;
  }
};

// Validate data entries
export const validateData = {
  project: (project: Project): string[] => {
    const errors: string[] = [];
    if (!project.title?.trim()) errors.push('Title is required');
    if (!project.description?.trim()) errors.push('Description is required');
    if (!project.githubUrl?.trim()) errors.push('GitHub URL is required');
    if (!project.demoUrl?.trim()) errors.push('Demo URL is required');
    if (!project.tags?.length) errors.push('At least one tag is required');
    return errors;
  },
  
  skill: (skill: Skill): string[] => {
    const errors: string[] = [];
    if (!skill.name?.trim()) errors.push('Skill name is required');
    if (!skill.category?.trim()) errors.push('Category is required');
    if (!['Beginner', 'Intermediate', 'Advanced'].includes(skill.level)) {
      errors.push('Level must be Beginner, Intermediate, or Advanced');
    }
    return errors;
  },
  
  hackathon: (hackathon: Hackathon): string[] => {
    const errors: string[] = [];
    if (!hackathon.name?.trim()) errors.push('Hackathon name is required');
    if (!hackathon.project?.trim()) errors.push('Project name is required');
    if (!hackathon.description?.trim()) errors.push('Description is required');
    if (!hackathon.technologies?.length) errors.push('At least one technology is required');
    if (hackathon.teamSize < 1) errors.push('Team size must be at least 1');
    return errors;
  },
  
  certification: (certification: Certification): string[] => {
    const errors: string[] = [];
    if (!certification.name?.trim()) errors.push('Certification name is required');
    if (!certification.organization?.trim()) errors.push('Organization is required');
    if (!certification.verificationUrl?.trim()) errors.push('Verification URL is required');
    return errors;
  }
};

// Generate statistics from data
export const generateStats = {
  projects: (projects: Project[]) => ({
    total: projects.length,
    technologies: new Set(projects.flatMap(p => p.tags)).size,
    categories: new Set(projects.flatMap(p => p.tags)).size
  }),
  
  skills: (skills: Skill[]) => ({
    total: skills.length,
    advanced: skills.filter(s => s.level === 'Advanced').length,
    intermediate: skills.filter(s => s.level === 'Intermediate').length,
    beginner: skills.filter(s => s.level === 'Beginner').length,
    categories: new Set(skills.map(s => s.category)).size
  }),
  
  hackathons: (hackathons: Hackathon[]) => ({
    total: hackathons.length,
    wins: hackathons.filter(h => 
      h.position.toLowerCase().includes('1st') || 
      h.position.toLowerCase().includes('winner') ||
      h.position.toLowerCase().includes('first')
    ).length,
    technologies: new Set(hackathons.flatMap(h => h.technologies)).size
  }),
  
  certifications: (certifications: Certification[]) => ({
    total: certifications.length,
    organizations: new Set(certifications.map(c => c.organization)).size,
    thisYear: certifications.filter(c => c.date.includes('2024')).length
  })
};

// Helper to create template entries
export const createTemplate = {
  project: (overrides: Partial<Project> = {}): Omit<Project, 'id'> => ({
    title: "New Project Title",
    description: "Project description goes here...",
    image: "/image/placeholder.png",
    tags: ["Technology"],
    githubUrl: "https://github.com/username/repo",
    demoUrl: "https://demo-url.com",
    ...overrides
  }),
  
  skill: (overrides: Partial<Skill> = {}): Omit<Skill, 'id'> => ({
    category: "Programming",
    name: "New Skill",
    level: "Intermediate" as const,
    icon: "SkillIcon",
    ...overrides
  }),
  
  hackathon: (overrides: Partial<Hackathon> = {}): Omit<Hackathon, 'id'> => ({
    name: "Hackathon Name",
    date: "Month Year",
    location: "Location",
    position: "Position",
    project: "Project Name",
    description: "Project description...",
    technologies: ["Technology"],
    teamSize: 1,
    prize: "Prize",
    image: "https://example.com/image.jpg",
    ...overrides
  }),
  
  certification: (overrides: Partial<Certification> = {}): Omit<Certification, 'id'> => ({
    name: "Certification Name",
    organization: "Organization",
    date: "Month Year",
    logo: "https://example.com/logo.jpg",
    verificationUrl: "https://verification-url.com",
    ...overrides
  })
};