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
    position: "Participant",
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
    position: "Participant",
    project: "Capture The Flag Challenge",
    description: "Competed in Kaspersky's prestigious Capture The Flag cybersecurity competition, solving complex challenges across multiple domains including web exploitation, reverse engineering, digital forensics, AI security, and cryptography. Demonstrated advanced problem-solving skills and deep understanding of cybersecurity principles.",
    technologies: ["Cybersecurity", "Web Exploitation", "Reverse Engineering", "Forensics", "Cryptography", "Python", "Linux"],
    teamSize: 1,
    prize: "Participation Certificate",
    image: "/image/kaspersky-ctf-participation-certificate.png"
  }
];