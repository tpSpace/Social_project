import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';

interface PostProps {
  id: string;
  author: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  retweets: number;
  avatar?: string;
}

const Post: React.FC<PostProps> = ({ id, author, handle, time, content, likes, comments, retweets }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentRetweets, setCurrentRetweets] = useState(retweets);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted);
    setCurrentRetweets(isRetweeted ? currentRetweets - 1 : currentRetweets + 1);
  };

  return (
    <article className="p-4 hover:bg-gray-950 transition-colors cursor-pointer">
      <div className="flex space-x-4">
        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">{author.charAt(0).toUpperCase()}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-bold text-white hover:underline cursor-pointer flex items-center">
              {author}
              <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </h3>
            <span className="text-gray-400 text-sm">@{handle}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{time}</span>
            <button className="ml-auto text-gray-500 hover:text-gray-300 hover:bg-gray-800 p-1 rounded-full transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
          
          <p className="text-white text-base leading-normal mb-3">{content}</p>
          
          <div className="flex items-center justify-between max-w-md text-gray-500">
            <button className="flex items-center space-x-2 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group">
              <MessageCircle size={18} />
              <span className="text-sm">{comments > 0 ? comments : ''}</span>
            </button>
            
            <button
              onClick={handleRetweet}
              className={`flex items-center space-x-2 hover:bg-green-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group ${
                isRetweeted ? 'text-green-500' : 'hover:text-green-500'
              }`}
            >
              <Repeat2 size={18} />
              <span className="text-sm">{currentRetweets > 0 ? currentRetweets : ''}</span>
            </button>
            
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 hover:bg-red-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group ${
                isLiked ? 'text-red-500' : 'hover:text-red-500'
              }`}
            >
              <Heart size={18} className={isLiked ? 'fill-current' : ''} />
              <span className="text-sm">{currentLikes > 0 ? currentLikes : ''}</span>
            </button>
            
            <button className="flex items-center space-x-2 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group">
              <Share size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;