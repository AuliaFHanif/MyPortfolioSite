import { skills } from '@/lib/data';

const SkillsGrid = () => {
  const categories = {
    frontend: skills.filter(s => s.category === 'frontend'),
    backend: skills.filter(s => s.category === 'backend'),
    design: skills.filter(s => s.category === 'design'),
    tools: skills.filter(s => s.category === 'tools'),
  };

  return (
    <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-bold mb-6">SKILLS & EXPERTISE</h2>
      
      <div className="space-y-6">
        {Object.entries(categories).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-xl font-bold mb-3 uppercase bg-yellow-200 border-2 border-black px-3 py-1 inline-block">
              {category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              {categorySkills.map((skill) => (
                <div 
                  key={skill.name}
                  className="bg-pink-200 border-2 border-black p-3 text-center font-bold hover:bg-pink-300 transition-colors"
                >
                  <div className="text-sm">{skill.name}</div>
                  {skill.level && (
                    <div className="mt-2 w-full bg-white border border-black h-2">
                      <div 
                        className="bg-purple-500 h-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
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