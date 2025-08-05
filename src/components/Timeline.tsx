import React, { useState } from 'react';
import PostComposer from './PostComposer';
import Post from './Post';
import { Sparkles } from 'lucide-react';

interface PostData {
  id: string;
  author: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  retweets: number;
}

const Timeline = () => {
  const [posts, setPosts] = useState<PostData[]>([
    {
      id: '1',
      author: 'Bruce Banner',
      handle: 'hulkscientist',
      time: '2h',
      content: 'Just launched Hulk-Hub! A place where everyone can share their thoughts and connect with the community. The future of social networking is here! 🚀',
      likes: 1247,
      comments: 89,
      retweets: 234
    },
    {
      id: '2',
      author: 'Tony Stark',
      handle: 'ironman',
      time: '4h',
      content: 'AI integration in social platforms is revolutionary. The technology behind Hulk-Hub\'s recommendation system is absolutely brilliant. Excited to see where this goes! 🤖✨',
      likes: 892,
      comments: 156,
      retweets: 178
    },
    {
      id: '3',
      author: 'Natasha Romanoff',
      handle: 'blackwidow',
      time: '6h',
      content: 'Privacy and security should always be the foundation of any social platform. Impressed by the encryption standards implemented here. Well done team! 🔒',
      likes: 743,
      comments: 92,
      retweets: 167
    },
    {
      id: '4',
      author: 'Steve Rogers',
      handle: 'captainamerica',
      time: '8h',
      content: 'Sometimes the best conversations happen in the most unexpected places. Hulk-Hub is bringing people together from all walks of life. That\'s what community is all about.',
      likes: 1034,
      comments: 203,
      retweets: 289
    },
    {
      id: '5',
      author: 'Peter Parker',
      handle: 'spiderman',
      time: '12h',
      content: 'Web development has come so far! The responsive design on this platform is incredible. Works perfectly on every device. Great job to the dev team! 🕷️💻',
      likes: 567,
      comments: 78,
      retweets: 145
    }
  ]);

  const handleNewPost = (content: string) => {
    const newPost: PostData = {
      id: Date.now().toString(),
      author: 'You',
      handle: 'yourhandle',
      time: 'now',
      content,
      likes: 0,
      comments: 0,
      retweets: 0
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Home</h1>
          <Sparkles size={20} className="text-gray-500" />
        </div>
        
        {/* Tabs */}
        <div className="flex mt-4">
          <button className="flex-1 text-center py-4 font-bold border-b-2 border-blue-500">
            For you
          </button>
          <button className="flex-1 text-center py-4 text-gray-500 hover:bg-gray-900">
            Following
          </button>
        </div>
      </div>
      
      <PostComposer onPost={handleNewPost} />
      
      <div className="divide-y divide-gray-800">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      {/* Load more */}
      <div className="text-center py-8 border-t border-gray-800">
        <button className="text-blue-500 hover:underline">
          Show more posts
        </button>
      </div>
    </div>
  );
};

export default Timeline;