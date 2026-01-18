import { Experience } from '../types';

// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE DATA
// Add new experiences by copying the template from templates/experience-template.ts
// The section will automatically update to show timeline when 2+ entries exist
// ═══════════════════════════════════════════════════════════════════════════

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Computer Science Teacher",
    company: "Parasole Academy",
    type: "Teaching",
    location: "Muridke",
    startDate: "December 2025",
    endDate: "Present",
    description: "I am currently serving as a Computer Science Teacher at a Parasole Academy, where I teach Matric and Intermediate-level students. My role involves delivering clear, concept-oriented instruction in core computer science subjects, helping students build a strong foundation in both theoretical concepts and practical understanding.",
    responsibilities: [
      "Concept-based and student-centered teaching methodology",
      "Excellent communication and classroom management skills",
      "Ability to break down complex technical topics into simple explanations",
      "Guidance in logical thinking, fundamentals of programming, and problem-solving",
      "Commitment to student progress, discipline, and academic excellence"
    ],
    technologies: [
      "Software Systems",
      "Computer Networks",
      "C Language",
      "Algorithms",
      "Web development"
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
