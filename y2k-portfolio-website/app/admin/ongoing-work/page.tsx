'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import Swal from 'sweetalert2';

interface OngoingWorkItem {
  _id: string;
  title: string;
  description: string;
  status: string;
  progress: number;
}

const statusColors: Record<string, string> = {
  Planning: 'bg-yellow-200',
  Designing: 'bg-pink-200',
  Coding: 'bg-purple-200',
  Testing: 'bg-cyan-200',
  Polishing: 'bg-green-200',
};

export default function AdminOngoingWork() {
  const [items, setItems] = useState<OngoingWorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/ongoing-work');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching ongoing work:', error);
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
      await fetch(`/api/ongoing-work/${_id}`, { method: 'DELETE' });
      await Swal.fire({
        title: 'Deleted!',
        text: 'Item has been deleted.',
        icon: 'success',
        confirmButtonColor: '#22c55e'
      });
      fetchItems();
    } catch (error) {
      console.error('Error deleting ongoing work:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete item.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
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
          <h1 className="text-4xl font-bold">MANAGE ONGOING WORK 🔧</h1>
          <Link
            href="/admin/ongoing-work/new"
            className="bg-green-300 border-2 border-black px-6 py-3 font-bold hover:bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
          >
            <Plus size={20} />
            NEW ITEM
          </Link>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item._id}
              className={`${statusColors[item.status] || 'bg-gray-200'} border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black bg-black text-white px-2 py-1">
                      00{index + 1}
                    </span>
                    <span className="text-xs font-bold border-2 border-black px-2 bg-white">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-700 mb-4">{item.description}</p>
                  <div className="w-full bg-white border-2 border-black h-6 relative overflow-hidden">
                    <div
                      className="bg-black h-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-xs font-bold mt-2">{item.progress}%</p>
                </div>

                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/admin/ongoing-work/${item._id}/edit`}
                    className="bg-blue-300 border-2 border-black p-3 hover:bg-blue-400 transition-colors"
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-300 border-2 border-black p-3 hover:bg-red-400 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="bg-yellow-200 border-4 border-black p-8 text-center">
              <p className="text-xl font-bold">No ongoing work yet! Add your first item. ✨</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
