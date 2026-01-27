import Image from 'next/image';

const HeroBanner = () => {
  return (
    <div className="bg-purple-300 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-2 left-2 text-3xl animate-pulse">⭐</div>
      <div className="absolute bottom-2 right-2 text-3xl animate-pulse">✨</div>
      <div className="absolute top-1/2 right-10 text-2xl opacity-50">💫</div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Photo Section */}
        <div className="relative">
          <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden relative">
            {/* Replace with your actual photo */}
            <div className="w-full h-full bg-gradient-to-br from-blue-200 to-pink-200 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
            {/* Uncomment and use this when you have your photo */}
            {/* <Image 
              src="/images/farhan.jpg" 
              alt="Aulia Farhan Hanif"
              fill
              className="object-cover"
            /> */}
            
            {/* Decorative corner stars */}
            <div className="absolute -top-3 -left-3 text-2xl">⭐</div>
            <div className="absolute -bottom-3 -right-3 text-2xl">✨</div>
          </div>
          {/* Polaroid effect */}
          <div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-black bg-yellow-200 -z-10"></div>
        </div>

        {/* Intro Section */}
        <div className="flex-1 text-center md:text-left w-full">
          <div className="bg-white/80 backdrop-blur-sm border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 flex items-center justify-center md:justify-center gap-2 flex-wrap">
              HELLO, I&apos;M FARHAN! 
              <span className="inline-block animate-bounce">👋</span>
            </h2>
            <p className="text-2xl font-normal text-gray-500 mb-3 text-center">どうも私はファーハンです</p>
            <div className="space-y-3">
              <p className="text-lg font-bold text-purple-600 text-center">✨ Japanese Lit Grad turned Fullstack Developer ✨</p>
              <p className="text-base leading-relaxed text-center md:text-left">
                I&apos;m a Fullstack Developer and Japanese Literature graduate who builds intuitive digital solutions. I&apos;m driven by the challenge of solving mundane or complex everyday problems by creating tools that make life seamless. 💻
              </p>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                <span className="bg-pink-200 border-2 border-black px-3 py-1 text-sm font-bold">Javascript</span>
                <span className="bg-yellow-200 border-2 border-black px-3 py-1 text-sm font-bold">Typescript</span>
                <span className="bg-blue-200 border-2 border-black px-3 py-1 text-sm font-bold">MongoDB</span>
                <span className="bg-green-200 border-2 border-black px-3 py-1 text-sm font-bold">PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;