import { Hackathon } from '../types';

export const hackathons: Hackathon[] = [
  {
    id: 1,
    name: "TechCrunch Disrupt Hackathon",
    date: "March 2024",
    location: "San Francisco, CA",
    position: "2nd Place",
    project: "AI-Powered Code Review Assistant",
    description: "Developed an intelligent code review system using machine learning to automatically detect bugs, security vulnerabilities, and suggest improvements.",
    technologies: ["Python", "TensorFlow", "React", "Node.js"],
    teamSize: 4,
    prize: "$5,000",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    name: "NASA Space Apps Challenge",
    date: "October 2023",
    location: "Virtual",
    position: "Winner - Local Chapter",
    project: "Mars Weather Predictor",
    description: "Created a machine learning model to predict Martian weather patterns using NASA's open data, helping future Mars missions plan activities.",
    technologies: ["Python", "Scikit-learn", "Flask", "Vue.js"],
    teamSize: 3,
    prize: "NASA Recognition",
    image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    name: "HackTheBox University CTF",
    date: "December 2023",
    location: "Online",
    position: "Top 10",
    project: "Cybersecurity Challenge Solutions",
    description: "Competed in various cybersecurity challenges including web exploitation, cryptography, and reverse engineering tasks.",
    technologies: ["Python", "Bash", "SQL", "JavaScript"],
    teamSize: 2,
    prize: "Certificate & Swag",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 4,
    name: "Google Developer Student Clubs Hackathon",
    date: "September 2023",
    location: "University Campus",
    position: "1st Place",
    project: "EcoTrack - Carbon Footprint Tracker",
    description: "Built a mobile app that tracks daily activities and calculates carbon footprint, providing personalized recommendations for reducing environmental impact.",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
    teamSize: 4,
    prize: "$3,000 + Google Cloud Credits",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 5,
    name: "MLH Local Hack Day",
    date: "February 2024",
    location: "Local Tech Hub",
    position: "Participant",
    project: "Smart Study Planner",
    description: "Developed an AI-powered study planner that adapts to learning patterns and optimizes study schedules for maximum retention.",
    technologies: ["Python", "Django", "React", "PostgreSQL"],
    teamSize: 3,
    prize: "Participation Certificate",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];