'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('access_token', data.token);
      }

      router.push('/admin');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-200 via-pink-200 to-blue-200 flex items-center justify-center p-8">
      <div className="bg-purple-300 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">ADMIN LOGIN 🔐</h1>
          <p className="text-lg">Portfolio Dashboard</p>
        </div>

        {error && (
          <div className="bg-red-300 border-2 border-black p-3 mb-4 font-bold">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block font-bold mb-2">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-300 border-2 border-black px-6 py-3 font-bold hover:bg-yellow-400 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN ✨'}
          </button>
        </div>
      </div>
    </div>
  );
}