import Link from 'next/link';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="bg-pink-100 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-pink-400"></div>
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            </div>
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="mb-4">{project.description}</p>
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="bg-purple-200 border-2 border-black px-3 py-1 text-sm font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;