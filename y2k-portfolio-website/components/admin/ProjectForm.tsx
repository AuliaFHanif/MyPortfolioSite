'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';

interface Project {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

interface ProjectFormProps {
  project?: Project;
  isEdit?: boolean;
}

export default function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagsInput, setTagsInput] = useState(project?.tags.join(', ') || '');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [formData, setFormData] = useState<Project>(
    project || {
      slug: '',
      title: '',
      description: '',
      longDescription: '',
      tags: [],
      images: [],
      liveUrl: '',
      githubUrl: '',
      featured: false,
      order: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    setFormData({
      ...formData,
      tags: e.target.value.split(',').map(t => t.trim()).filter(t => t),
    });
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImageUrl.trim()],
      });
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEdit && project?._id ? `/api/projects/${project._id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save project');
      }

      router.push('/admin/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-300 border-4 border-black p-4 font-bold">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold mb-2">SLUG *</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="project-name"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">TITLE *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Project Title"
          />
        </div>
      </div>

      <div>
        <label className="block font-bold mb-2">DESCRIPTION *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 h-20"
          placeholder="Short description"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">LONG DESCRIPTION *</label>
        <textarea
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 h-32"
          placeholder="Detailed description"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">TAGS (comma-separated)</label>
        <input
          type="text"
          value={tagsInput}
          onChange={handleTagsChange}
          className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="React, Next.js, TypeScript"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">IMAGES (Cloudinary URLs) *</label>
        <div className="space-y-3">
          {/* Add new image */}
          <div className="flex gap-2">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="flex-1 border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="https://res.cloudinary.com/..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddImage();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="bg-green-300 border-2 border-black px-4 py-2 font-bold hover:bg-green-400 flex items-center gap-2"
            >
              <Plus size={16} />
              ADD
            </button>
          </div>

          {/* Display added images */}
          {formData.images.length > 0 && (
            <div className="space-y-2">
              {formData.images.map((img, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 border-2 border-black p-2"
                >
                  <span className="flex-1 text-sm truncate">{img}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="bg-red-300 border-2 border-black p-1 hover:bg-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {formData.images.length === 0 && (
            <p className="text-sm text-gray-600 italic">
              No images added yet. Add at least one image.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold mb-2">LIVE URL</label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">GITHUB URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="flex items-end">
          <label className="flex items-center gap-2 font-bold cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5"
            />
            FEATURED
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-300 border-2 border-black p-3 font-bold hover:bg-green-400 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        {loading ? 'SAVING...' : isEdit ? 'UPDATE PROJECT ✏️' : 'CREATE PROJECT ✨'}
      </button>
    </form>
  );
}
