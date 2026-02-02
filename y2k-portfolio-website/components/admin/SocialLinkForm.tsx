'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SocialLink {
  _id?: string;
  name: string;
  url: string;
  icon: string;
  order: number;
}

interface SocialLinkFormProps {
  link?: SocialLink;
  isEdit?: boolean;
}

export default function SocialLinkForm({ link, isEdit = false }: SocialLinkFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<SocialLink>(
    link || {
      name: '',
      url: '',
      icon: 'github',
      order: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const url = isEdit && link?._id ? `/api/social-links/${link._id}` : '/api/social-links';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save social link');
      }

      router.push('/admin/social-links');
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
        <label className="block font-bold mb-2">NAME *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="e.g., GitHub, LinkedIn"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">URL *</label>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="https://github.com/yourprofile"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">ICON *</label>
        <select
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="github">GitHub</option>
          <option value="linkedin">LinkedIn</option>
          <option value="mail">Email</option>
        </select>
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
        {loading ? 'SAVING...' : isEdit ? 'UPDATE LINK ✏️' : 'ADD LINK ✨'}
      </button>
    </form>
  );
}
