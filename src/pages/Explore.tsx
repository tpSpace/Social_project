import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

// Placeholder data for the explore grid
const explorePosts = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/picsum/400/400', likes: 120, comments: 15, description: 'A beautiful landscape.' },
  { id: 2, imageUrl: 'https://picsum.photos/seed/consectetur/400/400', likes: 256, comments: 32, description: 'Exploring the city streets.' },
  { id: 3, imageUrl: 'https://picsum.photos/seed/adipiscing/400/400', likes: 98, comments: 8, description: 'Delicious food from a local cafe.' },
  { id: 4, imageUrl: 'https://picsum.photos/seed/elit/400/400', likes: 432, comments: 55, description: 'A stunning sunset over the mountains.' },
  { id: 5, imageUrl: 'https://picsum.photos/seed/sed/400/400', likes: 175, comments: 21, description: 'Cute puppy playing in the park.' },
  { id: 6, imageUrl: 'https://picsum.photos/seed/eiusmod/400/400', likes: 301, comments: 40, description: 'Architectural marvels.' },
  { id: 7, imageUrl: 'https://picsum.photos/seed/tempor/400/400', likes: 88, comments: 12, description: 'A peaceful walk in the forest.' },
  { id: 8, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqx0cT1HzvxSTfdYqsGaBkrZGHLsXrfiV6qxA0DhpVwdQARNRjA6lTbNQwRM2KqD9OZkw&usqp=CAU', likes: 521, comments: 78, description: 'Winter wonderland.' },
  { id: 9, imageUrl: 'https://media.istockphoto.com/id/1360554439/vi/anh/%C4%91%E1%BA%A3o-nhi%E1%BB%87t-%C4%91%E1%BB%9Bi-maldives.jpg?s=612x612&w=0&k=20&c=pqWxvBFhn0_mJQF-oNyiDS56iahHule2vZmmVbjc_TA=', likes: 210, comments: 25, description: 'Tropical paradise.' },
  { id: 10, imageUrl: 'https://picsum.photos/seed/dolore/400/400', likes: 643, comments: 99, description: 'Vintage car show.' },
  { id: 11, imageUrl: 'https://picsum.photos/seed/magna/400/400', likes: 111, comments: 11, description: 'A quiet library scene.' },
  { id: 12, imageUrl: 'https://picsum.photos/seed/aliqua/400/400', likes: 222, comments: 22, description: 'Street art and graffiti.' },
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return explorePosts;
    return explorePosts.filter(post => 
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto p-4">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-gray-100 bg-gray-900 border border-gray-700 rounded-full 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
               transition-all duration-300 ease-in-out placeholder:text-gray-500"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="relative group aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              <img src={post.imageUrl} alt={post.description} className="w-full h-full object-cover rounded-lg shadow-md group-hover:scale-110 transition-transform duration-500 ease-in-out" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-lg">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-6">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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