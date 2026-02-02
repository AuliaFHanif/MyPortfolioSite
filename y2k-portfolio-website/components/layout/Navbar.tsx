'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'home' },
    { href: '/projects', label: 'projects' },
    { href: '/about', label: 'about' },
    { href: '/skills', label: 'skills' },
    { href: '/certifications', label: 'certifications' },
    { href: '/contact', label: 'contacts' },
  ];

  return (
    // Changed bg-purple-100/80 to a neutral bg-slate-50/90 to stop the clashing
    <nav className="bg-slate-50/90 backdrop-blur-sm border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 m-8 relative z-20">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold hover:text-cyan-600 transition-colors">
            ✨ Farhan's Portfolio ✨
          </h1>
        </Link>
        <div className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 border-2 border-black font-bold uppercase transition-all ${
                pathname === link.href
                  ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' // Active link
                  : 'bg-cyan-200 hover:bg-yellow-200' // Inactive link uses Cyan to match your philosophy box
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;