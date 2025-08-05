import React from 'react';
import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';
import RightSidebar from './components/RightSidebar';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto flex">
        {/* Left Sidebar */}
        <div className="w-64 fixed h-full">
          <Sidebar />
        </div>
        
        {/* Main Timeline */}
        <div className="flex-1 ml-64 mr-80">
          <div className="border-l border-r border-gray-800 min-h-screen">
            <Timeline />
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="w-80 fixed right-0 h-full">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;