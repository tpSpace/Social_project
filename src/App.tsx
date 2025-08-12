import React from 'react';
import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';
import RightSidebar from './components/RightSidebar';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-7xl mx-auto flex h-screen">
        {/* Left Sidebar */}
        <aside className="w-64 h-full overflow-y-auto custom-scrollbar">
          <Sidebar />
        </aside>
        
        {/* Main Timeline */}
        <div className="flex-1 h-full overflow-y-auto border-l border-r border-gray-800 custom-scrollbar">
          <Timeline />
        </div>
        
        {/* Right Sidebar */}
        <aside className="w-92 h-full overflow-y-auto custom-scrollbar">
          <RightSidebar />
        </aside>
      </main>
    </div>
  );
}

export default App;
