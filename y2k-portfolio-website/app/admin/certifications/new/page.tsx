import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import CertificationForm from '@/components/admin/CertificationForm';

export default async function NewCertificationPage() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">
      <div className="bg-green-300 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-bold">ADD NEW CERTIFICATION ✨</h1>
      </div>

      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CertificationForm />
      </div>
    </div>
  );
}
