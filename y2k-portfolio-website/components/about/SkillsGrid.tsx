import { skills } from '@/lib/data';

const SkillsGrid = () => {
  const categories = {
    frontend: skills.filter(s => s.category === 'frontend'),
    backend: skills.filter(s => s.category === 'backend'),
    languages: skills.filter(s => s.category === 'languages'),
    tools: skills.filter(s => s.category === 'tools'),
  };

  return (
    <div className="bg-blue-100 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-black mb-6 italic uppercase tracking-tight">SKILLS & EXPERTISE</h2>
      
      <div className="space-y-8">
        {Object.entries(categories).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-xl font-bold mb-4 uppercase bg-yellow-200 border-2 border-black px-4 py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {categorySkills.map((skill) => (
                <div 
                  key={skill.name}
                  className="bg-pink-200 border-2 border-black p-4 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center"
                >
                  <div className="text-lg mb-3 uppercase tracking-tighter">{skill.name}</div>
                  
                  {skill.level && (
                    <div className="flex items-center gap-3 w-full">
                      {/* Mastery Label next to bar */}
                      <span className="text-xs uppercase whitespace-nowrap">Mastery:</span>
                      
                      {/* Increased height to h-8 for larger text space */}
                      <div className="flex-grow bg-white border-2 border-black h-8 relative overflow-hidden">
                        <div 
                          className="bg-purple-500 h-full flex items-center justify-center transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        >
                          {/* Larger percentage text */}
                          <span className="text-sm text-white font-black px-2">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsGrid;