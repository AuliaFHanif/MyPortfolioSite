import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import Project from '@/app/models/Project';
import ProjectForm from '@/components/admin/ProjectForm';

interface ProjectData {
  _id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: Props) {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  let project: ProjectData | null = null;

  try {
    await connectDB();
    const proj = await Project.findById(id).lean();
    
    if (proj) {
      project = {
        _id: proj._id.toString(),
        slug: proj.slug,
        title: proj.title,
        description: proj.description,
        longDescription: proj.longDescription,
        tags: proj.tags,
        images: proj.images || [],
        liveUrl: proj.liveUrl,
        githubUrl: proj.githubUrl,
        featured: proj.featured,
        order: proj.order,
      };
    }
  } catch (error) {
    console.error('Error fetching project:', error);
  }

  if (!project) {
    redirect('/admin/projects');
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">
      <div className="bg-blue-300 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-bold">EDIT PROJECT ✏️</h1>
        <p className="text-lg mt-2">{project.title}</p>
      </div>

      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <ProjectForm project={project} isEdit={true} />
      </div>
    </div>
  );
}
