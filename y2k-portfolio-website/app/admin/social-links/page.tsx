'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import Swal from 'sweetalert2';

interface SocialLink {
  _id: string;
  name: string;
  url: string;
  icon: string;
}

export default function AdminSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/social-links');
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching social links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`/api/social-links/${_id}`, { method: 'DELETE' });
      await Swal.fire({
        title: 'Deleted!',
        text: 'Social link has been deleted.',
        icon: 'success',
        confirmButtonColor: '#22c55e'
      });
      fetchLinks();
    } catch (error) {
      console.error('Error deleting social link:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete social link.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const iconTypeToColor = {
    github: 'bg-gray-800 text-white',
    linkedin: 'bg-blue-600 text-white',
    mail: 'bg-red-500 text-white',
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
        <h1 className="text-4xl font-bold">MANAGE SOCIAL LINKS 🔗</h1>
        <Link
          href="/admin/social-links/new"
          className="bg-green-300 border-2 border-black px-6 py-3 font-bold hover:bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
        >
          <Plus size={20} />
          NEW LINK
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <div
            key={link._id}
            className="bg-pink-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{link.name}</h3>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 break-all flex items-center gap-1"
                >
                  Visit <ExternalLink size={12} />
                </Link>
              </div>
              <div className={`${(iconTypeToColor[link.icon as keyof typeof iconTypeToColor] || 'bg-gray-300')} px-2 py-1 rounded text-xs font-bold`}>
                {link.icon}
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/social-links/${link._id}/edit`}
                className="flex-1 bg-blue-300 border-2 border-black p-2 hover:bg-blue-400 transition-colors text-center font-bold text-sm"
              >
                <Edit size={16} className="inline mr-1" />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(link._id)}
                className="flex-1 bg-red-300 border-2 border-black p-2 hover:bg-red-400 transition-colors text-center font-bold text-sm"
              >
                <Trash2 size={16} className="inline mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {links.length === 0 && (
        <div className="bg-yellow-200 border-4 border-black p-8 text-center">
          <p className="text-xl font-bold">No social links yet! Add your first one. ✨</p>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
