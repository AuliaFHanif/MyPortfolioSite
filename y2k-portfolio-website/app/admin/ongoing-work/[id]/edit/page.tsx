import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import OngoingWork from '@/app/models/OngoingWork';
import OngoingWorkForm from '@/components/admin/OngoingWorkForm';

interface OngoingWorkData {
  _id: string;
  title: string;
  description: string;
  status: 'Planning' | 'Designing' | 'Coding' | 'Testing' | 'Polishing';
  progress: number;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditOngoingWorkPage({ params }: Props) {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  let item: OngoingWorkData | null = null;

  try {
    await connectDB();
    const doc = await OngoingWork.findById(id).lean();

    if (doc) {
      item = {
        _id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        status: doc.status,
        progress: doc.progress,
      };
    }
  } catch (error) {
    console.error('Error fetching ongoing work:', error);
  }

  if (!item) {
    redirect('/admin/ongoing-work');
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">
      <div className="bg-blue-300 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-bold">EDIT ONGOING WORK ✏️</h1>
        <p className="text-lg mt-2">{item.title}</p>
      </div>

      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <OngoingWorkForm item={item} isEdit={true} />
      </div>
    </div>
  );
}
