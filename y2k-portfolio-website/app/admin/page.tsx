import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { Briefcase, Award, Link2, Settings } from 'lucide-react';

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const sections = [
    {
      name: 'Projects',
      href: '/admin/projects',
      icon: Briefcase,
      color: 'bg-purple-300',
      description: 'Manage your portfolio projects',
    },
    {
      name: 'Skills',
      href: '/admin/skills',
      icon: Settings,
      color: 'bg-pink-300',
      description: 'Update your technical skills',
    },
    {
      name: 'Certifications',
      href: '/admin/certifications',
      icon: Award,
      color: 'bg-yellow-300',
      description: 'Manage certifications & credentials',
    },
    {
      name: 'Social Links',
      href: '/admin/social-links',
      icon: Link2,
      color: 'bg-blue-300',
      description: 'Update social media links',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
      <div className="bg-linear-to-r from-purple-300 to-pink-300 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-5xl font-bold mb-4">ADMIN DASHBOARD 🎯</h1>
        <p className="text-xl">Welcome back, {session.email}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.name}
              href={section.href}
              className={`${section.color} border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all`}
            >
              <div className="flex items-start gap-4">
                <Icon size={40} />
                <div>
                  <h2 className="text-2xl font-bold mb-2">{section.name}</h2>
                  <p>{section.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}