import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

const RightSidebar = () => {
  const trends = [
    { category: 'Trending in Technology', topic: 'Hulk-Hub', posts: '125K posts' },
    { category: 'Trending', topic: 'Social Media', posts: '89.2K posts' },
    { category: 'Technology · Trending', topic: 'React', posts: '45.8K posts' },
    { category: 'Trending in Vietnam', topic: 'Tech News', posts: '23.1K posts' }
  ];

  const whoToFollow = [
    { name: 'Bruce Banner', username: 'hulkscientist', verified: true },
    { name: 'Tony Stark', username: 'ironman', verified: true },
    { name: 'Peter Parker', username: 'spiderman', verified: false }
  ];

  return (
    <div className="p-4 h-full overflow-y-auto">
      {/* Search */}
      <div className="sticky top-0 bg-black pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-900 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* What's happening */}
      <div className="bg-gray-900 rounded-2xl p-4 mb-4">
        <h2 className="text-xl font-bold mb-4">What's happening</h2>
        <div className="space-y-3">
          {trends.map((trend, index) => (
            <div key={index} className="hover:bg-gray-800 p-2 rounded cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm">{trend.category}</p>
                  <p className="font-bold">{trend.topic}</p>
                  <p className="text-gray-500 text-sm">{trend.posts}</p>
                </div>
                <MoreHorizontal className="text-gray-500" size={16} />
              </div>
            </div>
          ))}
        </div>
        <button className="text-blue-500 hover:underline mt-3">Show more</button>
      </div>

      {/* Who to follow */}
      <div className="bg-gray-900 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>
        <div className="space-y-3">
          {whoToFollow.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold">{user.name}</span>
                    {user.verified && (
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">@{user.username}</p>
                </div>
              </div>
              <button className="bg-white text-black px-4 py-1 rounded-full font-bold hover:bg-gray-200 transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
        <button className="text-blue-500 hover:underline mt-3">Show more</button>
      </div>
    </div>
  );
};

export default RightSidebar;