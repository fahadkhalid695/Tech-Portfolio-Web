import { Experience } from '../types';

// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE DATA — ordered: Microsoft Student Ambassador → AWS SBG Leader → CS Teacher
// ═══════════════════════════════════════════════════════════════════════════

export const experiences: Experience[] = [

  // ─── 01 — Microsoft Student Ambassador ───────────────────────────────────
  {
    id: 1,
    role: "Microsoft Student Ambassador",
    company: "Microsoft",
    type: "Volunteer",
    location: "Remote / Pakistan",
    startDate: "July 2026",
    endDate: "Present",
    description: "Serving as a Microsoft Student Ambassador — helping students explore Microsoft technologies, fostering a learning community, and bridging students with resources, tools, and opportunities in cloud, AI, and software development.",
    responsibilities: [
      "Promote Microsoft technologies and learning resources within the student community",
      "Organise and support technology-focused sessions, workshops, and learning events",
      "Help students access Microsoft Azure, GitHub, and developer tools",
      "Share knowledge on cloud computing, AI, and software development",
      "Connect students with the broader Microsoft ecosystem and student programs"
    ],
    technologies: [
      "Microsoft Azure",
      "GitHub",
      "Azure AI",
      "Microsoft Learn",
      "Cloud Computing",
      "Community Building"
    ],
    isCurrent: true,
    companyUrl: "https://mvp.microsoft.com/en-US/studentambassadors/profile/0d95577c-3bc7-49cc-a00f-0178ac3d14c2"
  },

  // ─── 02 — AWS Student Builder Group Leader ────────────────────────────────
  {
    id: 2,
    role: "AWS Student Builder Group Leader",
    company: "AWS Student Builder Group — PGC Muridke",
    type: "Volunteer",
    location: "PGC Campus, Muridke",
    startDate: "February 2026",
    endDate: "Present",
    description: "Founding and leading the AWS Student Builder Group at PGC Muridke — building a student technology community focused on cloud computing, AI, and hands-on learning with AWS services.",
    responsibilities: [
      "Founded and currently lead the AWS Student Builder Group (SBG) at PGC Muridke",
      "Recruited and coordinated the core team and community members",
      "Planned and facilitated cloud-focused workshops, technical sessions, and learning events",
      "Promoted cloud computing and AWS education among students",
      "Supported students in exploring AWS services, cloud architecture, and AI on AWS",
      "Coordinated community activities and student engagement initiatives"
    ],
    technologies: [
      "AWS",
      "Cloud Computing",
      "Cloud Architecture",
      "AI on AWS",
      "Community Leadership",
      "Event Management"
    ],
    isCurrent: true,
    companyUrl: "https://builder.aws.com/community/@rfk695"
  },

  // ─── 03 — Computer Science Teacher ───────────────────────────────────────
  {
    id: 3,
    role: "Computer Science Teacher",
    company: "Parasole Academy",
    type: "Teaching",
    location: "Muridke",
    startDate: "December 2025",
    endDate: "May 2026",
    description: "Served as a Computer Science Teacher at Parasole Academy, teaching Matric and Intermediate-level students. Delivered concept-oriented instruction in core computer science subjects, helping students build a strong foundation in both theoretical and practical understanding.",
    responsibilities: [
      "Concept-based and student-centered teaching methodology",
      "Clear communication and effective classroom management",
      "Breaking down complex technical topics into simple, accessible explanations",
      "Guiding students in logical thinking, programming fundamentals, and problem-solving",
      "Commitment to student progress, discipline, and academic excellence"
    ],
    technologies: [
      "Software Systems",
      "Computer Networks",
      "C Language",
      "Algorithms",
      "Web Development"
    ],
    isCurrent: false
  }
];

// Helper: get currently active roles
export const getCurrentExperiences = (): Experience[] =>
  experiences.filter(exp => exp.isCurrent === true);

// Helper: get completed roles
export const getPastExperiences = (): Experience[] =>
  experiences.filter(exp => !exp.isCurrent);

// Helper: total count
export const getTotalYearsOfExperience = (): number => experiences.length;
