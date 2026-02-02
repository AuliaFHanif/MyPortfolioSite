'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Home, LayoutDashboard, Briefcase, Settings, Award, Link2 } from 'lucide-react';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    localStorage.removeItem('access_token');
    router.push('/admin/login');
  };

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: Briefcase },
    { href: '/admin/skills', label: 'Skills', icon: Settings },
    { href: '/admin/certifications', label: 'Certifications', icon: Award },
    { href: '/admin/social-links', label: 'Social Links', icon: Link2 },
  ];

  return (
    <aside className="w-64 bg-purple-300 border-r-4 border-black p-6 shadow-[8px_0px_0px_0px_rgba(0,0,0,1)] min-h-screen flex flex-col">
      {/* Logo/Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-black uppercase mb-2">Admin</h1>
        <Link href="/" className="flex items-center gap-2 font-bold text-sm bg-yellow-300 border-2 border-black px-3 py-2 hover:bg-yellow-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Home size={16} />
          View Site
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 border-2 border-black font-bold text-sm transition-all rounded-none ${
                isActive
                  ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-pink-200 hover:bg-pink-300'
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 border-2 border-black font-bold text-sm bg-red-300 hover:bg-red-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-auto"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}