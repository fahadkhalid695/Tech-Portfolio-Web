import { Experience } from '../types';

// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE DATA
// Add new experiences by copying the template from templates/experience-template.ts
// The section will automatically update to show timeline when 2+ entries exist
// ═══════════════════════════════════════════════════════════════════════════

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Python Instructor",
    company: "Teaching Position",
    type: "Teaching",
    location: "Pakistan",
    startDate: "January 2025",
    endDate: "Present",
    description: "Teaching Python programming fundamentals and advanced concepts to students, helping them build strong foundations in software development and problem-solving skills.",
    responsibilities: [
      "Designing and delivering comprehensive Python curriculum covering basics to advanced topics",
      "Creating hands-on coding exercises and real-world projects for practical learning",
      "Mentoring students on best practices, debugging techniques, and code optimization",
      "Evaluating student progress and providing personalized feedback for improvement",
      "Introducing students to AI/ML concepts using Python libraries like NumPy and Pandas"
    ],
    technologies: [
      "Python",
      "NumPy",
      "Pandas",
      "Jupyter Notebooks",
      "VS Code",
      "Git"
    ],
    isCurrent: true
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ADD MORE EXPERIENCES BELOW
  // Copy the template from templates/experience-template.ts and paste here
  // Remember to increment the id for each new entry
  // ═══════════════════════════════════════════════════════════════════════════
];

// Helper function to get current experiences
export const getCurrentExperiences = (): Experience[] => {
  return experiences.filter(exp => exp.endDate === 'Present' || exp.isCurrent);
};

// Helper function to get past experiences
export const getPastExperiences = (): Experience[] => {
  return experiences.filter(exp => exp.endDate !== 'Present' && !exp.isCurrent);
};

// Helper function to calculate total years of experience
export const getTotalYearsOfExperience = (): number => {
  // This is a simplified calculation - can be enhanced for more accuracy
  return experiences.length; // Placeholder - each role counts as experience
};
