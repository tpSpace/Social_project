import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Placeholder data for the explore grid
const explorePosts = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/picsum/400/400', likes: 120, comments: 15 },
  { id: 2, imageUrl: 'https://picsum.photos/seed/consectetur/400/400', likes: 256, comments: 32 },
  { id: 3, imageUrl: 'https://picsum.photos/seed/adipiscing/400/400', likes: 98, comments: 8 },
  { id: 4, imageUrl: 'https://picsum.photos/seed/elit/400/400', likes: 432, comments: 55 },
  { id: 5, imageUrl: 'https://picsum.photos/seed/sed/400/400', likes: 175, comments: 21 },
  { id: 6, imageUrl: 'https://picsum.photos/seed/eiusmod/400/400', likes: 301, comments: 40 },
  { id: 7, imageUrl: 'https://picsum.photos/seed/tempor/400/400', likes: 88, comments: 12 },
  { id: 8, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqx0cT1HzvxSTfdYqsGaBkrZGHLsXrfiV6qxA0DhpVwdQARNRjA6lTbNQwRM2KqD9OZkw&usqp=CAU', likes: 521, comments: 78 },
  { id: 9, imageUrl: 'https://media.istockphoto.com/id/1360554439/vi/anh/%C4%91%E1%BA%A3o-nhi%E1%BB%87t-%C4%91%E1%BB%9Bi-maldives.jpg?s=612x612&w=0&k=20&c=pqWxvBFhn0_mJQF-oNyiDS56iahHule2vZmmVbjc_TA=', likes: 210, comments: 25 },
  { id: 10, imageUrl: 'https://picsum.photos/seed/dolore/400/400', likes: 643, comments: 99 },
  { id: 11, imageUrl: 'https://picsum.photos/seed/magna/400/400', likes: 111, comments: 11 },
  { id: 12, imageUrl: 'https://picsum.photos/seed/aliqua/400/400', likes: 222, comments: 22 },
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto p-4 ">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-gray-100 bg-gray-900 border border-gray-700 rounded-full 
               focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
               appearance-none transition-all duration-200 ease-in-out placeholder:text-gray-400"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {explorePosts.map(post => (
            <div key={post.id} className="relative group aspect-w-1 aspect-h-1">
              <img src={post.imageUrl} alt={`Explore post ${post.id}`} className="w-full h-full object-cover rounded-lg shadow-md" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center rounded-lg">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;