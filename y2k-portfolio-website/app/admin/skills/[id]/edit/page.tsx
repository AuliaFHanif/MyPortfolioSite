import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import Skills from '@/app/models/Skills';
import SkillsForm from '@/components/admin/SkillsForm';

interface SkillData {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'languages' | 'tools';
  level: number;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditSkillPage({ params }: Props) {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  let skill: SkillData | null = null;

  try {
    await connectDB();
    const sk = await Skills.findById(id).lean();
    
    if (sk) {
      skill = {
        _id: sk._id.toString(),
        name: sk.name,
        category: sk.category,
        level: sk.level,
      };
    }
  } catch (error) {
    console.error('Error fetching skill:', error);
  }

  if (!skill) {
    redirect('/admin/skills');
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">
      <div className="bg-blue-300 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-bold">EDIT SKILL ✏️</h1>
        <p className="text-lg mt-2">{skill.name}</p>
      </div>

      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <SkillsForm skill={skill} isEdit={true} />
      </div>
    </div>
  );
}
