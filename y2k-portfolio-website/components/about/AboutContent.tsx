const AboutContent = () => {
    return (
        <div className="space-y-6 text-black">
            {/* Bio Section */}
            <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                    I am a <strong>Fullstack Developer</strong> with a background in <strong>Japanese Literature</strong> (GPA 3.7/4.0), a transition that reflects my lifelong fascination with complex systems—whether they are linguistic or digital. After completing an intensive immersive program at <strong>Hacktiv8</strong>, I pivoted to engineering to build tools that solve real-world problems through logic and code.
                </p>
                <p className="text-lg leading-relaxed">
                    My work is driven by a simple goal: <strong>convenience</strong>. My hobby lies in transforming mundane or complex everyday hurdles into intuitive automated experiences—like my <strong>Smart Wardrobe app</strong> which uses <strong>AI and weather data</strong> to simplify daily decisions.
                </p>
            </div>

            {/* Philosophy Section */}
            <div className="border-t-4 border-black pt-6 mt-6">
                <h3 className="text-2xl font-black mb-4 uppercase italic">My Development Philosophy 🛠️</h3>
                <p className="mb-4 font-bold">I believe software should serve the user, not the other way around.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-yellow-200 border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <strong>🔓 No Subscriptions:</strong> Tools should be owned, not rented.
                    </div>
                    <div className="bg-blue-200 border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <strong>🔌 Offline-First:</strong> Functionality should not depend on an internet connection.
                    </div>
                    <div className="bg-pink-200 border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <strong>📦 Zero Bloat:</strong> Clean code and purposeful features only.
                    </div>
                    <div className="bg-green-200 border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <strong>🛡️ Data Sovereignty:</strong> Your data should belong to you.
                    </div>
                    <div className="col-span-full bg-cyan-200 border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">            
                        <strong>🌐 Open Software:</strong> Building in the open to foster transparency and community trust.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutContent;