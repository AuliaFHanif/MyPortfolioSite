'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'home' },
    { href: '/projects', label: 'projects' },
    { href: '/about', label: 'about' },
    { href: '/contact', label: 'contact' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 m-8 relative z-20">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold hover:text-purple-600 transition-colors">
            ✨ Farhan's Portfolio Website ✨
          </h1>
        </Link>
        <div className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 border-2 border-black font-bold uppercase transition-all ${
                pathname === link.href
                  ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-pink-200 hover:bg-yellow-200'
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