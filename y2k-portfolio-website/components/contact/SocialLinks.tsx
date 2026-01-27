'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, X } from 'lucide-react';
import { socialLinks } from '@/lib/data';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const SocialLinks = () => {
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, linkName: string) => {
    if (linkName === 'Email') {
      e.preventDefault();
      setShowEmailPopup(true);
    }
  };

  return (
    <>
      {/* Email Popup */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-purple-300 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full relative">
            <button
              onClick={() => setShowEmailPopup(false)}
              className="absolute top-4 right-4 bg-red-400 border-2 border-black p-2 hover:bg-red-500 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-3xl font-bold mb-4">EMAIL ME HERE!</h3>
              <a
                href="mailto:myemail@gmail.com"
                className="text-xl font-bold text-purple-900 hover:text-purple-600 underline break-all"
              >
                fhanif180902@gmail.com
              </a>
              <div className="mt-6">
                <button
                  onClick={() => setShowEmailPopup(false)}
                  className="bg-yellow-300 border-2 border-black px-6 py-3 font-bold hover:bg-yellow-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  CLOSE ✨
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-yellow-200 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-2xl font-bold mb-4 text-center">FIND ME HERE!</h3>
        <div className="flex justify-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleClick(e, link.name)}
                className="bg-pink-300 border-2 border-black p-4 hover:bg-pink-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                aria-label={link.name}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SocialLinks;