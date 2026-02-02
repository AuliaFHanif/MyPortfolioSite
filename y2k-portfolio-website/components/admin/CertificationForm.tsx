'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Certification {
  _id?: string;
  slug: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  credentialId?: string;
  order: number;
}

interface CertificationFormProps {
  certification?: Certification;
  isEdit?: boolean;
}

export default function CertificationForm({ certification, isEdit = false }: CertificationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Certification>(
    certification || {
      slug: '',
      name: '',
      issuer: '',
      date: '',
      credentialUrl: '',
      credentialId: '',
      order: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'order' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEdit && certification?._id ? `/api/certifications/${certification._id}` : '/api/certifications';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save certification');
      }

      router.push('/admin/certifications');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-300 border-4 border-black p-4 font-bold">
          ⚠️ {error}
        </div>
      )}

      <div>
        <label className="block font-bold mb-2">SLUG *</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="certification-name"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">CERTIFICATION NAME *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="e.g., AWS Solutions Architect"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">ISSUER *</label>
        <input
          type="text"
          name="issuer"
          value={formData.issuer}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="e.g., Amazon Web Services"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">DATE *</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="e.g., January 2024"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">CREDENTIAL URL</label>
        <input
          type="url"
          name="credentialUrl"
          value={formData.credentialUrl}
          onChange={handleChange}
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="https://credentials.example.com/verify/..."
        />
      </div>

      <div>
        <label className="block font-bold mb-2">CREDENTIAL ID</label>
        <input
          type="text"
          name="credentialId"
          value={formData.credentialId}
          onChange={handleChange}
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="e.g., AWS-123456789"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">ORDER</label>
        <input
          type="number"
          name="order"
          value={formData.order}
          onChange={handleChange}
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-300 border-2 border-black p-3 font-bold hover:bg-green-400 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        {loading ? 'SAVING...' : isEdit ? 'UPDATE CERTIFICATION ✏️' : 'ADD CERTIFICATION ✨'}
      </button>
    </form>
  );
}
