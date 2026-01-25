import AboutContent from '@/components/about/AboutContent';
import SkillsGrid from '@/components/about/SkillsGrid';
import CertificationsGrid from '@/components/about/CertificationsGrid';

export default function CertificationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
      <CertificationsGrid />
    </div>
  );
}