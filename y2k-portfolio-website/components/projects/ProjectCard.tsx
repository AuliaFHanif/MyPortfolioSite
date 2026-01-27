import Link from 'next/link';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group h-full">
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div className="bg-pink-100 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:-translate-y-1 h-full flex flex-col">
          {/* Mac-style Window Controls */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 border-2 border-black rounded-full bg-pink-400"></div>
            <div className="w-3 h-3 border-2 border-black rounded-full bg-purple-400"></div>
            <div className="w-3 h-3 border-2 border-black rounded-full bg-blue-400"></div>
          </div>
          
          <h3 className="text-2xl font-black mb-3 uppercase italic tracking-tighter">
            {project.title}
          </h3>
          
          <p className="mb-6 grow font-medium leading-tight">
            {project.description}
          </p>
          
          <div className="flex gap-2 flex-wrap mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-purple-200 border-2 border-black px-2 py-0.5 text-xs font-black uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* The New "Button" */}
          <div className="mt-auto bg-black text-white py-3 px-4 text-center font-black uppercase text-sm transition-colors border-2 border-black">
            CLICK FOR MORE DETAILS
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;