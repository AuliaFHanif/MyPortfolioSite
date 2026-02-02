'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
}

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      await fetch(`/api/skills/${_id}`, { method: 'DELETE' });
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const categoryColors = {
    frontend: 'bg-blue-200',
    backend: 'bg-purple-200',
    languages: 'bg-green-200',
    tools: 'bg-orange-200',
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
        <h1 className="text-4xl font-bold">MANAGE SKILLS 🛠️</h1>
        <Link
          href="/admin/skills/new"
          className="bg-green-300 border-2 border-black px-6 py-3 font-bold hover:bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
        >
          <Plus size={20} />
          NEW SKILL
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className={`${(categoryColors[skill.category as keyof typeof categoryColors] || 'bg-gray-200')} border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{skill.name}</h3>
                <p className="text-sm font-bold text-gray-600 capitalize">{skill.category}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/skills/${skill._id}/edit`}
                  className="bg-blue-300 border-2 border-black p-2 hover:bg-blue-400 transition-colors"
                >
                  <Edit size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="bg-red-300 border-2 border-black p-2 hover:bg-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="w-full bg-white border-2 border-black h-6 relative overflow-hidden">
              <div
                className="bg-black h-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <p className="text-xs font-bold mt-2">{skill.level}%</p>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="bg-yellow-200 border-4 border-black p-8 text-center">
          <p className="text-xl font-bold">No skills yet! Add your first skill. ✨</p>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
