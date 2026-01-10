export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Freelance';
  startDate: string;
  endDate: string | 'Present';
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
}

export const experiences: Experience[] = [
  // Add your experiences here
  // Example:
  // {
  //   id: 1,
  //   role: 'Software Engineering Intern',
  //   company: 'Tech Company',
  //   location: 'Remote',
  //   type: 'Internship',
  //   startDate: 'Jun 2024',
  //   endDate: 'Present',
  //   description: 'Working on AI-powered features and cloud infrastructure',
  //   achievements: [
  //     'Built scalable microservices handling 10K+ requests/day',
  //     'Reduced API response time by 40%',
  //   ],
  //   technologies: ['React', 'Node.js', 'AWS', 'Docker'],
  //   companyUrl: 'https://company.com'
  // }
];
