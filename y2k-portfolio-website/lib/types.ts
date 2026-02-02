export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'languages';
  level?: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Certification {
  id: string;
  slug: string;
  name: string;
  result?: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export interface OngoingWork {
  id: string;
  title: string;
  description: string;
  status: 'Planning' | 'Designing' | 'Coding' | 'Testing' | 'Polishing';
  progress: number;
}