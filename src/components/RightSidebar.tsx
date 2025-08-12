import React from 'react';
import { Search, MoreHorizontal, BadgeCheck } from 'lucide-react';

const RightSidebar = () => {
  const trends = [
    { category: 'Trending in Technology', topic: 'Hulk-Hub', posts: '125K posts' },
    { category: 'Trending', topic: 'Social Media', posts: '89.2K posts' },
    { category: 'Technology · Trending', topic: 'React', posts: '45.8K posts' },
    { category: 'Trending in Vietnam', topic: 'Tech News', posts: '23.1K posts' }
  ];

  const whoToFollow = [
    { name: 'Bruce Banner Is A Very Long Name That Should Be Truncated', username: 'hulkscientist_with_a_super_long_username', verified: true },
    { name: 'Tony Stark', username: 'ironman', verified: true },
    { name: 'Peter Parker', username: 'spiderman', verified: false }
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Search */}
      <div className="sticky top-0 bg-black pb-4 z-10">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-900 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1 space-y-4">
        {/* What's happening */}
        <div className="bg-gray-900 rounded-2xl p-4">
          <h2 className="text-xl font-bold mb-4">What's happening</h2>
          <div className="space-y-3">
            {trends.map((trend) => (
              <div
                key={trend.topic}
                className="hover:bg-gray-800 p-2 rounded cursor-pointer"
              >
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
            {whoToFollow.map((user) => (
              <div
                key={user.username}
                className="flex items-center justify-between"
              >
                {/* Avatar + Info */}
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {user.name.charAt(0)}
                    </span>
                  </div>

                  {/* Name + Username */}
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold truncate overflow-hidden whitespace-nowrap max-w-[100px]">
                        {user.name}
                      </span>
                      {user.verified && (
                        <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-gray-500 text-sm truncate overflow-hidden whitespace-nowrap max-w-[100px]">
                      @{user.username}
                    </p>
                  </div>
                </div>

                {/* Follow Button */}
                <button className="bg-white text-black px-4 py-1 rounded-full font-bold hover:bg-gray-200 transition-colors flex-shrink-0">
                  Follow
                </button>
              </div>
            ))}
          </div>
          <button className="text-blue-500 hover:underline mt-3">Show more</button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
