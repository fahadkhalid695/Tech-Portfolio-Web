// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE TEMPLATE
// Copy this template and add to src/data/experience.ts
// ═══════════════════════════════════════════════════════════════════════════

/*
INSTRUCTIONS:
1. Copy the template object below
2. Paste it in src/data/experience.ts inside the experiences array
3. Update all fields with your information
4. INCREMENT the id to be unique (next available number)
5. The UI will automatically update to show the new experience

TIPS:
- Use "Present" for endDate if you're currently in this role
- Set isCurrent: true for your current position
- Keep responsibilities to 3-5 bullet points for best display
- Use consistent technology naming across experiences
*/

// ─────────────────────────────────────────────────────────────────────────────
// COPY FROM HERE ↓
// ─────────────────────────────────────────────────────────────────────────────

/*
{
  id: 2, // INCREMENT THIS - must be unique
  role: "Your Job Title",
  company: "Company Name",
  type: "Full-time", // Options: "Full-time" | "Part-time" | "Internship" | "Contract" | "Freelance" | "Teaching" | "Volunteer" | "Research"
  location: "City, Country", // or "Remote"
  startDate: "Month Year", // e.g., "January 2024"
  endDate: "Present", // or "Month Year" if ended, e.g., "December 2024"
  description: "Brief 1-2 sentence overview of your role and impact at the company.",
  responsibilities: [
    "Key responsibility or achievement #1 - be specific and quantify if possible",
    "Key responsibility or achievement #2 - focus on impact",
    "Key responsibility or achievement #3 - highlight technical skills used",
    "Key responsibility or achievement #4 - optional",
    "Key responsibility or achievement #5 - optional"
  ],
  technologies: [
    "Tech1",
    "Tech2", 
    "Tech3",
    "Tech4"
  ],
  companyLogo: "/image/company-logo.png", // Optional - place logo in public/image/
  companyUrl: "https://company.com", // Optional - link to company website
  isCurrent: false // Set to true if this is your current position
},
*/

// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE ENTRIES (for reference)
// ─────────────────────────────────────────────────────────────────────────────

/*
// Example 1: Software Engineering Internship
{
  id: 2,
  role: "Software Engineering Intern",
  company: "Tech Startup XYZ",
  type: "Internship",
  location: "Lahore, Pakistan",
  startDate: "June 2024",
  endDate: "August 2024",
  description: "Developed full-stack features for the company's main product, improving user engagement by 25%.",
  responsibilities: [
    "Built 3 new features using React and Node.js, deployed to 10,000+ users",
    "Reduced API response time by 40% through database query optimization",
    "Collaborated with design team to implement responsive UI components",
    "Participated in code reviews and agile sprint planning sessions"
  ],
  technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
  companyUrl: "https://techstartup.com",
  isCurrent: false
},

// Example 2: Freelance Work
{
  id: 3,
  role: "AI/ML Developer",
  company: "Freelance",
  type: "Freelance",
  location: "Remote",
  startDate: "March 2024",
  endDate: "May 2024",
  description: "Delivered custom machine learning solutions for 3 clients in healthcare and e-commerce sectors.",
  responsibilities: [
    "Developed predictive models achieving 92% accuracy for client business metrics",
    "Created automated data pipelines processing 1M+ records daily",
    "Provided technical documentation and training for client teams"
  ],
  technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "FastAPI"],
  isCurrent: false
},

// Example 3: Research Position
{
  id: 4,
  role: "Research Assistant",
  company: "University AI Lab",
  type: "Research",
  location: "University Name",
  startDate: "September 2023",
  endDate: "December 2023",
  description: "Contributed to NLP research project focused on sentiment analysis in low-resource languages.",
  responsibilities: [
    "Collected and annotated dataset of 50,000+ text samples",
    "Implemented baseline models using transformers architecture",
    "Co-authored research paper submitted to international conference"
  ],
  technologies: ["Python", "PyTorch", "Hugging Face", "BERT", "spaCy"],
  companyUrl: "https://university.edu/ailab",
  isCurrent: false
}
*/
