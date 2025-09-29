import { Hackathon } from '../types';

export const hackathons: Hackathon[] = [
  {
    id: 1,
    name: "Bolt Hackathon",
    date: "June 2025",
    location: "Virtual",
    position: "Participant",
    project: "EcoGuard Pro",
    description: "Developed EcoGuard Pro, an AI-powered environmental monitoring system that delivers real-time insights on air quality, water purity, noise levels, and energy consumption. The system features predictive analytics, automated alerts, and smart optimization suggestions to help organizations and individuals make data-driven environmental decisions.",
    technologies: ["IoT", "AI/ML", "Arduino", "Python", "React"],
    teamSize: 1,
    prize: "Participation Certificate",
    image: "https://framerusercontent.com/images/hhl0mPBD6GzlDP5Pq7IjRhgtp4.png"
  },
  {
    id: 2,
    name: "Ignite Coding Competition",
    date: "July 2025",
    location: "Virtual",
    position: "Top 100",
    project: "Digital Pakistan Speed Programming Challenge",
    description: "Participated in Pakistan's premier coding competition focusing on algorithmic problem-solving and dynamic programming challenges. Successfully tackled complex computational problems involving optimization, graph theory, and advanced data structures using efficient algorithms and clean code practices.",
    technologies: ["Dynamic Programming", "Python", "C++", "LeetCode", "Algorithms"],
    teamSize: 3,
    prize: "Participation Certificate",
    image: "/image/ignite.jpg"
  },
  {
    id: 3,
    name: "Kaspersky CTF 2025",
    date: "August 2025",
    location: "Virtual",
    position: "80th In Region",
    project: "Capture The Flag Challenge",
    description: "Competed in Kaspersky's prestigious Capture The Flag cybersecurity competition, solving complex challenges across multiple domains including web exploitation, reverse engineering, digital forensics, AI security, and cryptography. Demonstrated advanced problem-solving skills and deep understanding of cybersecurity principles.",
    technologies: ["Cybersecurity", "Web Exploitation", "Reverse Engineering", "Forensics", "Cryptography", "Python", "Linux"],
    teamSize: 1,
    prize: "Participation Certificate",
    image: "/image/kaspersky-ctf-participation-certificate.png"
  },
  {
    id: 4,
    name: "Kiro Vibe Coding ",
    date: "September 2025",
    location: "Virtual",
    position: "Result Awaiting",
    project: "Bussiness Task Automation",
    description: "Solo participation in an innovative hackathon focused on building projects entirely through vibe coding platforms, developed a Business Task Automation Platform.",
    technologies: ["Business Automation", "Intelligent System", "Low/NO code", "", "React", "Typescript", "Python"],
    teamSize: 1,
    prize: "Result Awaiting",
    image: "/image/kiro.png"
  },
  {
    id: 5,
    name: "Innovista Agentic AI Hackathon",
    date: "September 2025",
    location: "Physical",
    position: "Participant",
    project: "Worker Support AI",
    description: "Participated in a cutting-edge competition on AI agents & autonomy, built Frontline Worker Support AI — a multi-agent emergency coordination system.",
    technologies: ["Multi Agent System", "Google Cloud Funtions", "Firestore", "Rest APIs", "Priority Scoring Engine", "Symptom Analysis", "Case Monitoring"],
    teamSize: 1,
    prize: "Participation",
    image: "/image/innovista.jpeg"
  }
];