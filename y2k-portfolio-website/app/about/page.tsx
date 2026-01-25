import AboutContent from '@/components/about/AboutContent';
import SkillsGrid from '@/components/about/SkillsGrid';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
      <div className="bg-purple-200 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-5xl font-bold mb-6">ABOUT ME 😊</h1>
        <AboutContent />
      </div>
      
      <SkillsGrid />
    </div>
  );
}