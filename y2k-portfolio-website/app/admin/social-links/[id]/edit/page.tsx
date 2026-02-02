import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import SocialLink from '@/app/models/SocialLink';
import SocialLinkForm from '@/components/admin/SocialLinkForm';

interface SocialLinkData {
  _id: string;
  name: string;
  url: string;
  icon: string;
  order: number;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditSocialLinkPage({ params }: Props) {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  let link: SocialLinkData | null = null;

  try {
    await connectDB();
    const sl = await SocialLink.findById(id).lean();
    
    if (sl) {
      link = {
        _id: sl._id.toString(),
        name: sl.name,
        url: sl.url,
        icon: sl.icon,
        order: sl.order,
      };
    }
  } catch (error) {
    console.error('Error fetching social link:', error);
  }

  if (!link) {
    redirect('/admin/social-links');
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">
      <div className="bg-blue-300 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-bold">EDIT SOCIAL LINK ✏️</h1>
        <p className="text-lg mt-2">{link.name}</p>
      </div>

      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <SocialLinkForm link={link} isEdit={true} />
      </div>
    </div>
  );
}
