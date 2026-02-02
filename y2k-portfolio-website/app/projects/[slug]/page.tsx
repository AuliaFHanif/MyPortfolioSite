'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  _id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Project) => p.slug === slug);
        if (!found) {
          setNotFoundFlag(true);
        } else {
          setProject(found);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err);
        setNotFoundFlag(true);
        setLoading(false);
      });
  }, [slug]);

  const nextImage = () => {
    if (project && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (notFoundFlag || !project) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-4 md:p-12 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="mb-8 border-b-4 border-black pb-6">
          <p className="text-xs font-black uppercase tracking-widest text-purple-600 mb-2">Project</p>
          <h1 className="text-3xl md:text-5xl font-black uppercase italic mb-4">{project.title}</h1>
          <p className="text-gray-700 text-lg">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-yellow-300 border-2 border-black px-4 py-1 font-bold text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Project Images Carousel */}
        {project.images && project.images.length > 0 ? (
          <div className="relative mb-12">
            {/* Main Image */}
            <div className="bg-white border-[6px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <img
                src={project.images[currentImageIndex] || "https://res.cloudinary.com/db3xxjbxj/image/upload/v1769496315/Gemini_Generated_Image_rcieo0rcieo0rcie_b5262l.png"}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-auto border-2 border-black/10"
                onError={(e) => {
                  e.currentTarget.src = "https://res.cloudinary.com/db3xxjbxj/image/upload/v1769496315/Gemini_Generated_Image_rcieo0rcieo0rcie_b5262l.png";
                }}
              />
            </div>

            {/* Navigation Buttons - Only show if more than 1 image */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-300 border-4 border-black p-3 hover:bg-purple-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} className="font-black" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-300 border-4 border-black p-3 hover:bg-purple-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight size={32} className="font-black" />
                </button>

                {/* Image Indicators/Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-4 h-4 border-2 border-black transition-all ${
                        index === currentImageIndex
                          ? 'bg-purple-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                          : 'bg-white hover:bg-purple-200'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="text-center mt-3">
                  <span className="bg-yellow-300 border-2 border-black px-4 py-1 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {currentImageIndex + 1} / {project.images.length}
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white border-[6px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-hidden mb-12">
            <img
              src="https://res.cloudinary.com/db3xxjbxj/image/upload/v1769496315/Gemini_Generated_Image_rcieo0rcieo0rcie_b5262l.png"
              alt={project.title}
              className="w-full h-auto border-2 border-black/10"
            />
          </div>
        )}

        {/* Long Description */}
        <div className="bg-white border-4 border-black p-8 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-2">About This Project</h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{project.longDescription}</p>
        </div>

        {/* Links & Navigation */}
        <div className="flex flex-wrap gap-4 mb-12">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-300 border-4 border-black px-8 py-3 font-black uppercase hover:bg-green-400 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block"
            >
              → View Live
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 text-white border-4 border-black px-8 py-3 font-black uppercase hover:bg-slate-900 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block"
            >
              → GitHub Repo
            </Link>
          )}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="bg-cyan-200 border-4 border-black px-8 py-3 font-black uppercase hover:bg-yellow-300 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}