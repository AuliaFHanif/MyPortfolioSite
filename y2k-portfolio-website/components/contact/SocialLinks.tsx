import { Github, Linkedin, Mail } from 'lucide-react';
import { socialLinks } from '@/lib/data';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const SocialLinks = () => {
  return (
    <div className="bg-yellow-200 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="text-2xl font-bold mb-4 text-center">FIND ME ONLINE!</h3>
      <div className="flex justify-center gap-4">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon as keyof typeof iconMap];
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-300 border-2 border-black p-4 hover:bg-pink-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              aria-label={link.name}
            >
              <Icon size={24} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;