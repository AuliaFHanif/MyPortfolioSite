const QuickInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-blue-200 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <h3 className="text-xl font-bold mb-2">LOADING NEW POST COMPLETED!</h3>
        <p className="text-sm">Check out my latest work and creative experiments</p>
      </div>

      <div className="bg-pink-200 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-xl font-bold mb-4">HAPPINESS LOADING...</h3>
        <div className="w-full bg-gray-100 border-2 border-black h-6 mb-4">
          <div className="bg-yellow-300 h-full w-3/4 border-r-2 border-black"></div>
        </div>
        <button className="bg-green-300 border-2 border-black px-6 py-2 font-bold w-full hover:bg-green-400 transition-colors">
          DO IT
        </button>
      </div>
    </div>
  );
};

export default QuickInfo;