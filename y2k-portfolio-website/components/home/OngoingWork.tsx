import React from 'react';

const OngoingWork = () => {
  const currentTasks = [
    {
      task: "Integrating JLPT Vocabulary API",
      progress: 65,
      status: "Coding",
      color: "bg-yellow-300"
    },
    {
      task: "Refining Smart Wardrobe AI logic",
      progress: 90,
      status: "Testing",
      color: "bg-cyan-300"
    },
    {
      task: "Designing Portfolio V2 (Neo-Brutalist)",
      progress: 40,
      status: "Designing",
      color: "bg-pink-300"
    }
  ];

  return (
    <section className="w-full bg-white border-y-4 border-black py-8 px-6 md:px-12 shadow-[0px_10px_0px_0px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-500 border-2 border-black rounded-full animate-pulse"></div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">
              ONGOING PROJECTS
            </h2>
          </div>
        </div>

        {/* Task Grid - Stretches to full width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentTasks.map((item, index) => (
            <div key={index} className="bg-slate-50 border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black bg-black text-white px-2 py-0.5">
                    00{index + 1}
                  </span>
                  <span className="text-[10px] font-bold border-2 border-black px-2 bg-white">
                    {item.status}
                  </span>
                </div>
                <p className="font-black uppercase text-base leading-tight">
                  {item.task}
                </p>
              </div>
              
              {/* Progress Bar Container */}
              <div className="w-full bg-white border-2 border-black h-8 relative overflow-hidden">
                <div 
                  className={`${item.color} h-full border-r-2 border-black transition-all duration-1000 flex items-center justify-end px-2`}
                  style={{ width: `${item.progress}%` }}
                >
                  <span className="text-xs font-black">{item.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Footer Line */}
        <div className="mt-12 flex items-center gap-4 opacity-30">
          <div className="h-[2px] bg-black flex-grow"></div>
        </div>
      </div>
    </section>
  );
};

export default OngoingWork;