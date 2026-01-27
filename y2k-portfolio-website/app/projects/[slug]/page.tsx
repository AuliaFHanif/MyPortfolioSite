'use client';

import { projects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    params.then(({ slug: unwrappedSlug }) => {
      setSlug(unwrappedSlug);
    });
  }, [params]);

  if (!slug) return null;

  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();
  
  const images = (project.images || []).filter((img) => img.startsWith('http'));
  const fallbackImage = 'https://res.cloudinary.com/db3xxjbxj/image/upload/v1769496315/Gemini_Generated_Image_rcieo0rcieo0rcie_b5262l.png';
  const currentImage = images.length > 0 ? images[currentImageIndex] : fallbackImage;

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12 text-black font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <nav className="mb-12">
          <Link 
            href="/projects" 
            className="group inline-flex items-center gap-2 bg-white border-4 border-black px-6 py-2 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            ← Back to Archive
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* IMAGE SECTION */}
          <div className="lg:col-span-7 lg:mt-15">
            <div className="relative bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              {project.featured && (
                <div className="absolute top-4 left-4 z-10 bg-yellow-300 border-2 border-black px-3 py-1 font-black uppercase text-xs">
                  ⭐ Featured
                </div>
              )}
              <Image 
                key={currentImageIndex}
                src={currentImage} 
                alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                width={1200} 
                height={800} 
                priority
                className="w-full h-auto object-cover border-b-4 border-black"
              />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <div className="flex items-center justify-between gap-2 bg-white border-t-4 border-black p-3">
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="flex-1 bg-black text-white font-bold uppercase text-xs px-3 py-2 border-2 border-black hover:bg-zinc-800 transition-colors"
                  >
                    ← Previous
                  </button>
                  <span className="font-black uppercase text-xs whitespace-nowrap">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="flex-1 bg-black text-white font-bold uppercase text-xs px-3 py-2 border-2 border-black hover:bg-zinc-800 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-2 bg-black">
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" className="p-4 text-center font-black uppercase text-white hover:bg-zinc-800 transition-colors border-r-2 border-white/20">
                    Source Code
                  </a>
                ) : (
                  <div className="p-4 text-center font-black uppercase text-white bg-red-600 border-r-2 border-white/20">
                    No Source Code
                  </div>
                )}
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" className="p-4 text-center font-black uppercase bg-cyan-300 text-black hover:bg-cyan-400 transition-colors">
                    Live Demo ↗
                  </a>
                ) : (
                  <div className="p-4 text-center font-black uppercase text-white bg-red-600">
                    No Live Demo
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="lg:col-span-5 space-y-8">
            <header className="space-y-4">
              <h1 className="text-5xl font-black uppercase italic leading-[0.9] tracking-tighter">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-pink-200 border-2 border-black px-3 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black uppercase italic mb-4 border-b-2 border-black pb-2">
                Project Overview
              </h2>
              <p className="text-lg font-bold mb-6 leading-tight text-black/80">
                {project.description}
              </p>
              <div className="prose prose-slate max-w-none">
                <p className="whitespace-pre-wrap font-medium leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}