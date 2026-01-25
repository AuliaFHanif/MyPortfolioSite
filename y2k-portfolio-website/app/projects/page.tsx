import ProjectGrid from '@/components/projects/ProjectGrid';

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="bg-purple-300 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-8">
        <h1 className="text-5xl font-bold mb-4">MY PROJECTS ⭐</h1>
        <p className="text-xl">A collection of my favorite work and experiments</p>
      </div>
      
      <ProjectGrid />
    </div>
  );
}