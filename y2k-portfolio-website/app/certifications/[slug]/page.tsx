'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Certification {
  _id: string;
  slug: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  credentialId?: string;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default function CertificatePage({ params }: Props) {
  const { slug } = use(params);
  const [cert, setCert] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  useEffect(() => {
    fetch('/api/certifications')
      .then(res => res.json())
      .then(data => {
        const found = data.find((c: Certification) => c.slug === slug);
        if (!found) {
          setNotFoundFlag(true);
        } else {
          setCert(found);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch certifications:', err);
        setNotFoundFlag(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (notFoundFlag || !cert) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-purple-50 p-6 md:p-12 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-black uppercase italic mb-12 border-b-8 border-black inline-block">
          {cert.name}
        </h1>

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

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/about"
            className="bg-cyan-200 border-4 border-black px-8 py-3 font-black uppercase hover:bg-yellow-300 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all inline-block"
          >
            ← Back to About
          </Link>
          {cert.credentialUrl && (
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