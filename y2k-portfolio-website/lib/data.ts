import { Project, Skill, SocialLink } from './types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'project-alpha',
    title: 'Project Alpha',
    description: 'A cool web app with retro vibes',
    longDescription: 'A comprehensive web application that combines nostalgic Y2K aesthetics with modern React functionality. Built with TypeScript, Next.js, and Tailwind CSS.',
    tags: ['React', 'TypeScript', 'Next.js'],
    image: '/projects/alpha.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project-alpha',
    featured: true,
  },
  {
    id: '2',
    slug: 'digital-dreams',
    title: 'Digital Dreams',
    description: 'Interactive experience design',
    longDescription: 'An immersive digital experience featuring interactive animations and creative UI/UX design patterns.',
    tags: ['JavaScript', 'Canvas', 'WebGL'],
    image: '/projects/dreams.jpg',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '3',
    slug: 'pixel-perfect',
    title: 'Pixel Perfect',
    description: 'UI/UX case study collection',
    longDescription: 'A collection of carefully crafted UI/UX designs showcasing attention to detail and user-centered design principles.',
    tags: ['Figma', 'Design', 'Prototyping'],
    image: '/projects/pixel.jpg',
    featured: false,
  },
];

export const skills: Skill[] = [
  { name: 'React', category: 'frontend', level: 90 },
  { name: 'TypeScript', category: 'frontend', level: 85 },
  { name: 'Next.js', category: 'frontend', level: 80 },
  { name: 'Tailwind CSS', category: 'frontend', level: 90 },
  { name: 'Node.js', category: 'backend', level: 75 },
  { name: 'Figma', category: 'design', level: 85 },
  { name: 'Git', category: 'tools', level: 80 },
  { name: 'UI/UX Design', category: 'design', level: 85 },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:your@email.com', icon: 'mail' },
];