import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { certifications } from '@/lib/data';

type Props = {
  params: { slug: string };
};

export default function CertificatePage({ params }: Props) {
  const cert = certifications.find((c) => c.slug === params.slug);

  if (!cert) {
    return notFound();
  }

  const hasLocalImage = Boolean(cert.localImage);

  return (
    <div className="min-h-screen bg-purple-50 p-6 md:p-12 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-black uppercase italic mb-12 border-b-8 border-black inline-block">
          {cert.name}
        </h1>

        {hasLocalImage ? (
          <div className="relative bg-yellow-50 border-[6px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="p-2 md:p-4 bg-blue-50">
              <Image
                src={cert.localImage!}
                alt={cert.name}
                width={1200}
                height={1600}
                priority
                className="w-full h-auto border-2 border-black/10"
              />
            </div>

            <div className="absolute bottom-4 right-4 bg-yellow-300 border-4 border-black px-6 py-2 font-black uppercase text-lg md:text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {cert.issuer}
            </div>
          </div>
        ) : (
          <div className="bg-pink-50 border-[6px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg font-bold mb-3">{cert.name}</p>
            <p className="text-sm text-gray-700 mb-2">Issuer: {cert.issuer}</p>
            <p className="text-sm text-gray-700 mb-4">Date: {cert.date}</p>
            {cert.credentialId && (
              <p className="text-xs text-gray-600 mb-3">Credential ID: {cert.credentialId}</p>
            )}
            {cert.credentialUrl && (
              <Link
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-300 border-2 border-black px-4 py-2 font-black uppercase hover:bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors"
              >
                View Credential →
              </Link>
            )}
          </div>
        )}

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/about"
            className="bg-cyan-200 border-4 border-black px-8 py-3 font-black uppercase hover:bg-yellow-300 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all inline-block"
          >
            ← Back to About
          </Link>
          {cert.credentialUrl && !hasLocalImage && (
            <Link
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-200 border-4 border-black px-8 py-3 font-black uppercase hover:bg-purple-300 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all inline-block"
            >
              Open Credential
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}