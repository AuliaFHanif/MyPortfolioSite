'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    setIsAuthorized(true);
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="bg-white border-4 border-black p-8 text-center">
          <p className="text-2xl font-bold">Checking authorization... ⏳</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
