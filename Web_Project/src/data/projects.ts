import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Cafe Sales Analysis",
    description: "This project explores the sales of different menu items using a dataset. We perform data cleaning, Exploratory Data Analysis (EDA) analyze the sales report of the cafe.",
    image: "/image/cafe_project.png",
    tags: ["Python", "Matplotlib", "Numpy", "Pandas"],
    githubUrl: "https://github.com/fahadkhalid695/Cafe-Sales-Analysis",
    demoUrl: "https://colab.research.google.com/drive/1U_nj9m1ZCnZn0YjguzsL2qc8Qz-A4cx1?usp=sharing"
  },
  {
    id: 2,
    title: "Survial Prediction using Logistic Regression",
    description: "This project predicts the survival of persons who faced an accident using a dataset. We performed data cleaning, Exploratory Data Analysis (EDA), and trained our model on the data.",
    image: "/image/lg.png",
    tags: ["Python", "Logistic Regression", "Numpy", "Scikit-Learn"],
    githubUrl: "https://github.com/fahadkhalid695/Survival-Prediction-Project",
    demoUrl: "https://colab.research.google.com/drive/13K8zoV3B0kvA43zT5Kwx-tnn8Z5NN91r?usp=sharing"
  },
  {
    id: 3,
    title: "Secure IoT Data Collection Platform",
    description: "An end-to-end encrypted IoT platform for secure data collection, processing, and visualization from distributed sensor networks.",
    image: "https://images.pexels.com/photos/4584830/pexels-photo-4584830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["IoT", "Python", "MQTT", "Encryption"],
    githubUrl: "https://github.com/fahad-khalid/secure-iot",
    demoUrl: "https://demo.fahad-khalid.com/secure-iot"
  },
  {
    id: 4,
    title: "Blockchain-Based Supply Chain Tracker",
    description: "A transparent supply chain tracking system built with Ethereum smart contracts to ensure authenticity and traceability.",
    image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Blockchain", "Ethereum", "Solidity", "Web3.js"],
    githubUrl: "https://github.com/fahad-khalid/blockchain-supply",
    demoUrl: "https://demo.fahad-khalid.com/blockchain-supply"
  },
  {
    id: 5,
    title: "ML-Powered Financial Analyzer",
    description: "A machine learning application that analyzes financial data to predict market trends and provide investment recommendations.",
    image: "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Python", "Scikit-learn", "Pandas", "Finance"],
    githubUrl: "https://github.com/fahad-khalid/financial-analyzer",
    demoUrl: "https://demo.fahad-khalid.com/financial-analyzer"
  },
  {
    id: 6,
    title: "Cybersecurity Training Platform",
    description: "An interactive platform for learning cybersecurity concepts through gamified challenges and hands-on exercises.",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Security", "Vue.js", "Node.js", "Docker"],
    githubUrl: "https://github.com/fahad-khalid/cyber-training",
    demoUrl: "https://demo.fahad-khalid.com/cyber-training"
  }
];