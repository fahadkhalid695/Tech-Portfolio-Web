export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
}

export interface Skill {
  id: number;
  category: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
}

export interface Certification {
  id: number;
  name: string;
  organization: string;
  date: string;
  logo: string;
  verificationUrl: string;
}

export interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon: string;
}