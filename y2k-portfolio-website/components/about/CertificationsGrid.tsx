import { certifications } from '@/lib/data';
import Link from 'next/link';

const CertificationsGrid = () => {
  return (
    <div className="bg-cyan-200 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-black mb-6 italic uppercase">CERTIFICATIONS 🏆</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => {
          const hasLocalImage = Boolean(cert.localImage);
          const targetHref = hasLocalImage
            ? `/certifications/${cert.slug}`
            : cert.credentialUrl ?? '#';

          return (
            <div 
              key={cert.id}
              className="bg-white border-4 border-black p-5 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group"
            >
              <h3 className="text-lg font-black text-black mb-1 uppercase leading-tight">
                {cert.name}
              </h3>
              <p className="text-sm font-bold text-black/60 mb-1">{cert.issuer}</p>
              <p className="text-xs font-bold text-black/40 mb-4 tracking-widest">📅 {cert.date}</p>
              
              <Link 
                href={targetHref}
                target={hasLocalImage ? undefined : "_blank"}
                rel={hasLocalImage ? undefined : "noopener noreferrer"}
                className={`inline-block border-2 border-black px-4 py-2 font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${
                  hasLocalImage 
                    ? 'bg-purple-300 hover:bg-purple-400' 
                    : 'bg-yellow-300 hover:bg-yellow-400'
                }`}
              >
                {hasLocalImage ? "View Credential 📄" : "Verify Online →"}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CertificationsGrid;
