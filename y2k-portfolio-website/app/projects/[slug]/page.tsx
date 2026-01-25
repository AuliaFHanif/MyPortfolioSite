import Image from 'next/image';
import Link from 'next/link';
import { certifications } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function CertificateViewer({ params }: { params: { slug: string } }) {
  // Find the certificate data to get the proper Display Name
  const cert = certifications.find((c) => c.slug === params.slug);

  // If the slug isn't in our data array, we shouldn't try to render it
  if (!cert) {
    notFound();
  }

  // Construct the path based on the slug
  // Ensure your images are named exactly like the slugs (e.g. toefl-itp.png)
  const imagePath = `/images/${params.slug}.png`;

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-12 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        
        {/* Header with Breadcrumb-style navigation */}
        <div className="mb-8 flex justify-between items-end border-b-4 border-black pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-purple-600">Certification Viewer</p>
            <h1 className="text-2xl md:text-4xl font-black uppercase italic">{cert.name}</h1>
          </div>
          <Link href="/about" className="hidden md:block bg-white border-2 border-black px-4 py-1 font-bold hover:bg-yellow-300 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            CLOSE [X]
          </Link>
        </div>

        {/* Sole Focus: The Image */}
        <div className="bg-white border-[6px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative group">
          <div className="p-2 bg-slate-100">
            <Image
              src={imagePath}
              alt={cert.name}
              width={1200}
              height={1600}
              priority
              className="w-full h-auto border-2 border-black/10"
              // Adding a basic error fallback isn't easy with Next Image, 
              // so ensure the file exists in public/images/[slug].png
            />
          </div>
        </div>

        {/* Mobile/Bottom Navigation */}
        <div className="mt-12 flex justify-center gap-6">
           <Link href="/about" className="bg-cyan-200 border-4 border-black px-8 py-3 font-black uppercase hover:bg-yellow-300 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
            ← Return to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}