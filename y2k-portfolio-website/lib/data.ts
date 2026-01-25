import { Project, Skill, SocialLink, Certification } from './types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'my-wardrobe-app',
    title: 'MyWardrobeApp',
    description: "A centralized digital wardrobe for the whole family, designed to organize, track, and manage clothing inventory with ease.",
    longDescription: 'A centralized digital wardrobe for the whole family designed to simplify clothing management. Built with Vite and React for a high-performance frontend, the app uses Sequelize to manage complex relational data for multiple users. By organizing and tracking inventory in one intuitive dashboard, it transforms the mundane task of wardrobe organization into a streamlined, automated experience for every household member.',
    tags: ['Vite', 'React', 'PostgreSQL', 'Sequelize', 'Weather API', 'Gemini API'],
    image: '/projects/alpha.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project-alpha',
    featured: true,
  },
 {
    id: '2',
    slug: 'crucial-website-clone',
    title: 'Crucial Website Clone',
    description: 'A high-performance reconstruction of the Crucial hardware site, built to master type-safe architecture and server-side rendering.',
    longDescription: 'A technical deep-dive into the Next.js ecosystem, this project involved recreating the complex UI of the Crucial website. The primary goal was to implement a robust, type-safe codebase using TypeScript while leveraging Next.js for optimized performance. It features a responsive layout, and modular component architecture.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'React', 'DaisyUI'],
    image: '/projects/crucial-clone.jpg', 
    liveUrl: 'https://example.com',
    featured: false,
  },
 {
    id: '3',
    slug: 'twitter-clone-mobile',
    title: 'Twitter Clone',
    description: 'A cross-platform mobile social media application focused on real-time data fetching and complex relational schemas.',
    longDescription: 'This project serves as a deep dive into the Apollo/GraphQL ecosystem. By building a Twitter-inspired interface with Expo Go, I implemented intricate features such as nested reply threads and user interactions. The focus was on optimizing query performance with Apollo Client and managing a relational database via a GraphQL gateway to ensure a smooth, reactive mobile user experience.',
    tags: ['React Native', 'GraphQL', 'Apollo', 'Expo Go'],
    image: '/projects/twitter-clone.jpg',
    liveUrl: 'https://github.com/your-username/your-repo',
    featured: true,
  },
  {
    id: '4',
    slug: 'my-cuisine-app',
    title: 'MyCuisineApp',
    description: 'A robust RESTful API for restaurant management featuring secure authentication, role-based access control, and cloud-integrated image processing.',
    longDescription: 'Developed as a comprehensive backend solution, this project manages a complex cuisine and category ecosystem. It features a dual-layer access system: a public-facing API with advanced filtering/pagination and a protected administrative dashboard. Key technical highlights include custom middleware for JWT authentication, role-based authorization (RBAC), centralized error handling for Sequelize, and seamless image hosting integration via the Cloudinary API.',
    tags: ['Node JS', 'Express', 'Sequelize', 'PostgreSQL', 'JWT', 'Cloudinary'],
    image: '/projects/api-documentation.jpg',
    liveUrl: 'https://github.com/your-username/your-repo',
    featured: false,
  }
];

export const skills: Skill[] = [
  
  { name: 'React', category: 'frontend', level: 90 },
  { name: 'Next.js', category: 'frontend', level: 85 },
  { name: 'React Native', category: 'frontend', level: 80 },
  { name: 'TypeScript', category: 'frontend', level: 85 },
  { name: 'Tailwind CSS', category: 'frontend', level: 90 },
  { name: 'Vite', category: 'frontend', level: 85 },

  { name: 'Node.js', category: 'backend', level: 85 },
  { name: 'Express', category: 'backend', level: 85 },
  { name: 'GraphQL', category: 'backend', level: 75 },
  { name: 'Apollo Client', category: 'backend', level: 75 },
  { name: 'Sequelize', category: 'backend', level: 85 },
  { name: 'PostgreSQL', category: 'backend', level: 80 },
  { name: 'JWT Authentication', category: 'backend', level: 80 },

  { name: 'Git', category: 'tools', level: 85 },
  { name: 'Expo Go', category: 'tools', level: 80 },
  { name: 'Cloudinary', category: 'tools', level: 75 },
  { name: 'Gemini/OpenAI API', category: 'tools', level: 70 },

  { name: 'JavaScript', category: 'languages', level: 95 },
 
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/AuliaFHanif', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aulia-farhan-hanif-53b69b377/', icon: 'linkedin' },
  { name: 'Email', url: 'fhanif180902@email.com', icon: 'mail' },
];

export const certifications: Certification[] = [
  {
    id: '1',
    slug: 'toefl-itp',
    name: 'TOEFL ITP (Score: 630/677)',
    issuer: 'Educational Testing Service (ETS)',
    date: 'Jan 2024',
    credentialUrl: 'https://aws.amazon.com/verification',
    localImage: '/images/toefl-itp.png',
  },
  {
    id: '2',
    slug: 'hackerrank-react-basic',
    name: 'React (Basic)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    credentialUrl: 'https://www.hackerrank.com/certificates/iframe/394738b5d0a8',
    // No localImage: will redirect directly to HackerRank
  },
  {
    id: '3',
    slug: 'jlpt-n2',
    name: 'Japanese Language Proficiency Test N2',
    issuer: 'Japan Foundation',
    date: 'Aug 2023',
    credentialUrl: 'https://coursera.org/verify',
  },
  {
    id: '4',
    slug: 'hackerrank-sw-intern',
    name: 'Software Engineering Intern',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    credentialUrl: 'https://www.hackerrank.com/certificates/iframe/2a5f2e9f0e42',
  },
  {
    id: '5',
    slug: 'hackerrank-css-basic',
    name: 'CSS (Basic)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    credentialUrl: 'https://www.hackerrank.com/certificates/iframe/7cc99182ebe1',
  },
  {
    id: '6',
    slug: 'hackerrank-problem-solving-basic',
    name: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    credentialUrl: 'https://www.hackerrank.com/certificates/iframe/a6cea99d5971',
  },
  {
    id: '7',
    slug: 'hackerrank-javascript-basic',
    name: 'JavaScript (Basic)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    credentialUrl: 'https://www.hackerrank.com/certificates/iframe/b34c8ec4888b',
  },
];