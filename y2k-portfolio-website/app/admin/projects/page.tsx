'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

interface Project {
  _id: string;
  slug: string;
  title: string;
  description: string;
  featured: boolean;
  tags: string[];
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await fetch(`/api/projects/${_id}`, { method: 'DELETE' });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="bg-white border-4 border-black p-8 text-center">
          <p className="text-2xl font-bold">LOADING... ⏳</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">MANAGE PROJECTS 💼</h1>
        <Link
          href="/admin/projects/new"
          className="bg-green-300 border-2 border-black px-6 py-3 font-bold hover:bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
        >
          <Plus size={20} />
          NEW PROJECT
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  {project.featured && (
                    <span className="bg-yellow-300 border-2 border-black px-2 py-1 text-sm font-bold">
                      ⭐ FEATURED
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-3">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-200 border border-black px-2 py-1 text-xs font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <Link
                  href={`/admin/projects/${project._id}/edit`}
                  className="bg-blue-300 border-2 border-black p-3 hover:bg-blue-400 transition-colors"
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-300 border-2 border-black p-3 hover:bg-red-400 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="bg-yellow-200 border-4 border-black p-8 text-center">
            <p className="text-xl font-bold">No projects yet! Create your first one. ✨</p>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}