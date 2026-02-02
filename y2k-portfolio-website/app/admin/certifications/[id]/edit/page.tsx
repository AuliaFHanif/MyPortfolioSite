import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import Certification from '@/app/models/Certification';
import CertificationForm from '@/components/admin/CertificationForm';

interface CertificationData {
  _id: string;
  slug: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  credentialId?: string;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCertificationPage({ params }: Props) {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  let certification: CertificationData | null = null;

  try {
    await connectDB();
    const cert = await Certification.findById(id).lean();
    
    if (cert) {
      certification = {
        _id: cert._id.toString(),
        slug: cert.slug,
        name: cert.name,
        issuer: cert.issuer,
        date: cert.date,
        credentialUrl: cert.credentialUrl,
        credentialId: cert.credentialId,
      };
    }
  } catch (error) {
    console.error('Error fetching certification:', error);
  }

  if (!certification) {
    redirect('/admin/certifications');
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">
      <div className="bg-blue-300 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-bold">EDIT CERTIFICATION ✏️</h1>
        <p className="text-lg mt-2">{certification.name}</p>
      </div>

      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CertificationForm certification={certification} isEdit={true} />
      </div>
    </div>
  );
}
