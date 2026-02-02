'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OngoingWorkItem {
  _id?: string;
  title: string;
  description: string;
  status: 'Planning' | 'Designing' | 'Coding' | 'Testing' | 'Polishing';
  progress: number;
}

interface OngoingWorkFormProps {
  item?: OngoingWorkItem;
  isEdit?: boolean;
}

export default function OngoingWorkForm({ item, isEdit = false }: OngoingWorkFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<OngoingWorkItem>(
    item || {
      title: '',
      description: '',
      status: 'Coding',
      progress: 0,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEdit && item?._id ? `/api/ongoing-work/${item._id}` : '/api/ongoing-work';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save ongoing work');
      }

      router.push('/admin/ongoing-work');
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
        <label className="block font-bold mb-2">TITLE *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Ongoing task title"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">DESCRIPTION *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 h-24"
          placeholder="Short description of the work"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">STATUS *</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="Planning">Planning</option>
          <option value="Designing">Designing</option>
          <option value="Coding">Coding</option>
          <option value="Testing">Testing</option>
          <option value="Polishing">Polishing</option>
        </select>
      </div>

      <div>
        <label className="block font-bold mb-2">PROGRESS: {formData.progress}%</label>
        <input
          type="range"
          name="progress"
          min="0"
          max="100"
          step="5"
          value={formData.progress}
          onChange={handleChange}
          className="w-full h-2 bg-gray-300 border-2 border-black rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-300 border-2 border-black p-3 font-bold hover:bg-green-400 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        {loading ? 'SAVING...' : isEdit ? 'UPDATE ONGOING WORK ✏️' : 'CREATE ONGOING WORK ✨'}
      </button>
    </form>
  );
}
