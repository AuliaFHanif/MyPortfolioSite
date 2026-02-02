'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Skill {
  _id?: string;
  name: string;
  category: 'frontend' | 'backend' | 'languages' | 'tools';
  level: number;
  order: number;
}

interface SkillsFormProps {
  skill?: Skill;
  isEdit?: boolean;
}

export default function SkillsForm({ skill, isEdit = false }: SkillsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Skill>(
    skill || {
      name: '',
      category: 'frontend',
      level: 50,
      order: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const url = isEdit && skill?._id ? `/api/skills/${skill._id}` : '/api/skills';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save skill');
      }

      router.push('/admin/skills');
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
        <label className="block font-bold mb-2">SKILL NAME *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="e.g., React, Python, etc."
        />
      </div>

      <div>
        <label className="block font-bold mb-2">CATEGORY *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="languages">Languages</option>
          <option value="tools">Tools</option>
        </select>
      </div>

      <div>
        <label className="block font-bold mb-2">LEVEL: {formData.level}%</label>
        <input
          type="range"
          name="level"
          min="0"
          max="100"
          step="5"
          value={formData.level}
          onChange={handleChange}
          className="w-full h-2 bg-gray-300 border-2 border-black rounded"
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
        {loading ? 'SAVING...' : isEdit ? 'UPDATE SKILL ✏️' : 'ADD SKILL ✨'}
      </button>
    </form>
  );
}
