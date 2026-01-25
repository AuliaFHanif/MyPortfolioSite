import Link from 'next/link';
import { projects } from '@/lib/data';
import ProjectCard from '@/components/projects/ProjectCard';

const FeaturedProjects = () => {
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="bg-yellow-200 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
      <div className="absolute top-4 right-4 text-4xl">😊</div>
      <h2 className="text-4xl font-bold mb-4">FEATURED WORK!</h2>
      <p className="text-xl mb-6">Check out some of my favorite projects ✨</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Link
        href="/projects"
        className="inline-block bg-yellow-300 border-2 border-black px-6 py-3 font-bold hover:bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors"
      >
        VIEW ALL PROJECTS →
      </Link>
    </div>
  );
};

export default FeaturedProjects;