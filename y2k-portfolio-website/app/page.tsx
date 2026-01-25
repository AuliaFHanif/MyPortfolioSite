import HeroBanner from '@/components/home/HeroBanner';
import QuickInfo from '@/components/home/QuickInfo';
import FeaturedProjects from '@/components/home/FeaturedProjects';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
      <HeroBanner />
      <FeaturedProjects />
    </div>
  );
}