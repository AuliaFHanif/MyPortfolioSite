'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

interface Certification {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export default function AdminCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch('/api/certifications');
      const data = await response.json();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;

    try {
      await fetch(`/api/certifications/${_id}`, { method: 'DELETE' });
      fetchCertifications();
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="bg-white border-4 border-black p-8 text-center">
            <p className="text-2xl font-bold">LOADING... ⏳</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">MANAGE CERTIFICATIONS 🏆</h1>
        <Link
          href="/admin/certifications/new"
          className="bg-green-300 border-2 border-black px-6 py-3 font-bold hover:bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
        >
          <Plus size={20} />
          NEW CERTIFICATION
        </Link>
      </div>

      <div className="space-y-4">
        {certifications.map((cert) => (
          <div
            key={cert._id}
            className="bg-cyan-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">{cert.name}</h3>
                <p className="text-sm font-bold text-gray-700 mb-1">{cert.issuer}</p>
                <p className="text-xs text-gray-600">📅 {cert.date}</p>
                {cert.credentialUrl && (
                  <Link
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    View Credential <ExternalLink size={12} />
                  </Link>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <Link
                  href={`/admin/certifications/${cert._id}/edit`}
                  className="bg-blue-300 border-2 border-black p-3 hover:bg-blue-400 transition-colors"
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(cert._id)}
                  className="bg-red-300 border-2 border-black p-3 hover:bg-red-400 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {certifications.length === 0 && (
        <div className="bg-yellow-200 border-4 border-black p-8 text-center">
          <p className="text-xl font-bold">No certifications yet! Add your first one. ✨</p>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
