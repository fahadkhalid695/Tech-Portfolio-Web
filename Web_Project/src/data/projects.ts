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
    title: "Survivors Prediction",
    description: "This project predicts the survival of persons who faced an accident using a dataset. We performed data cleaning, Exploratory Data Analysis (EDA), and trained our model on the data.",
    image: "/image/lg.png",
    tags: ["Python", "AI/ML", "Numpy", "Scikit-Learn"],
    githubUrl: "https://github.com/fahadkhalid695/Survival-Prediction-Project",
    demoUrl: "https://colab.research.google.com/drive/13K8zoV3B0kvA43zT5Kwx-tnn8Z5NN91r?usp=sharing"
  },
  {
    id: 3,
    title: "EcoGuard Pro",
    description: "EcoGuard Pro is an AI-powered environmental monitoring system that delivers real-time insights on air, water, noise, and energy. It features predictive analytics, automated alerts, and smart optimization suggestions.",
    image: "/image/ecoguard.png",
    tags: ["IoT", "AI/ML", "Arduino"],
    githubUrl: "https://github.com/fahadkhalid695/EcoGuard",
    demoUrl: "https://rococo-ganache-6f0e7e.netlify.app/"
  },
  {
    id: 4,
    title: "OfficeOS",
    description: "Empowering businesses to focus on innovation by automating the routine, optimizing the complex, and intelligently managing the essential.",
    image: "/image/officeos.png",
    tags: ["Agentic AI", "AI/ML", "Automation", "Business", "React", "WebSocket", "NodeJS", "Docker", "Kubernetes", "CI/CD"],
    githubUrl: "https://github.com/fahadkhalid695/Business-task-automation",
    demoUrl: "https://business-task-automation.vercel.app/"
  },
  {
    id: 5,
    title: "Titanic Survival Analysis",
    description: "This project explores the survival patterns of Titanic passengers using the authentic Seaborn dataset. We perform data cleaning, professional EDA, and build a baseline machine learning model to predict survival probability.",
    image: "/image/Titanic.jpg",
    tags: ["Python", "AI/ML", "Matplotlib", "Seaborn", "Pandas", "Numpy", "Scikit-learn", "Regression"],
    githubUrl: "https://github.com/fahadkhalid695/Titanic-Survival-Analysis",
    demoUrl: "https://colab.research.google.com/drive/1ugTW5BEVKy-DLlAgNlo_ci5FUF3zIf0F?usp=sharing"
  }  
];