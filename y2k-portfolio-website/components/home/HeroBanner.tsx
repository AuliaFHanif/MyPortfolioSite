import Image from 'next/image';

const HeroBanner = () => {
    return (
        <div className="bg-purple-200 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-2 left-2 text-3xl animate-pulse">⭐</div>
            <div className="absolute bottom-2 right-2 text-3xl animate-pulse">✨</div>
            <div className="absolute top-1/2 right-10 text-2xl opacity-50">💫</div>

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                {/* Photo Section */}
                <div className="relative">
                    <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-yellow-100 overflow-hidden relative">
                        <div className="w-full h-full bg-cyan-200 flex items-center justify-center">
                            <span className="text-6xl">👨‍💻</span>
                        </div>
                        {/* <Image 
              src="/images/farhan.jpg" 
              alt="Aulia Farhan Hanif"
              fill
              className="object-cover"
            /> */}

                        <div className="absolute -top-3 -left-3 text-2xl">⭐</div>
                        <div className="absolute -bottom-3 -right-3 text-2xl">✨</div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-black bg-yellow-200 -z-10"></div>
                </div>

                {/* Intro Section */}
                <div className="flex-1 text-center md:text-left">
                    <div className="bg-purple-50/80 backdrop-blur-sm border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-4xl md:text-5xl font-bold mb-3 ml-20 flex items-center justify-center md:justify-start gap-2 flex-wrap">
                            HELLO, I&apos;M FARHAN!
                            <span className="inline-block animate-bounce">👋</span>
                            
                          
                        </h2>
                        <span className="text-2xl font-normal text-gray-500 ml-2">どうも私はファーハンです</span>
                        <div className="space-y-3">
                            <p className="text-lg font-bold text-purple-600">✨ Japanese Lit Grad turned Fullstack Developer ✨</p>
                            <p className="text-base leading-relaxed text-black">
                                I’m a Fullstack Developer and Japanese Literature graduate who builds intuitive digital solutions. I’m driven by the challenge of solving mundane or complex everyday problems by creating tools that make life seamless.💻
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
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