import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, BadgeCheck } from 'lucide-react'; // Added BadgeCheck

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

const Post: React.FC<PostProps> = ({ id, avatar, author, handle, time, content, likes, comments, retweets }) => {
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
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-600 flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt={author} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-bold text-lg">{author.charAt(0).toUpperCase()}</span>
          )}
        </div>


        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-bold text-white hover:underline cursor-pointer flex items-center">
              {author}
              {/* Replaced inline SVG with BadgeCheck */}
              <BadgeCheck className="w-4 h-4 text-blue-500 ml-1" />
            </h3>
            <span className="text-gray-400 text-sm">@{handle}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{time}</span>
            <button className="ml-auto text-gray-500 hover:text-gray-300 hover:bg-gray-800 p-1 rounded-full transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <p className="text-white text-base leading-normal mb-3 break-words whitespace-pre-wrap">{content}</p>

          <div className="flex items-center justify-between max-w-md text-gray-500">
            <button className="flex items-center space-x-2 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group">
              <MessageCircle size={18} />
              <span className="text-sm">{comments > 0 ? comments : ''}</span>
            </button>

            <button
              onClick={handleRetweet}
              className={`flex items-center space-x-2 hover:bg-green-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group ${isRetweeted ? 'text-green-500' : 'hover:text-green-500'
                }`}
            >
              <Repeat2 size={18} />
              <span className="text-sm">{currentRetweets > 0 ? currentRetweets : ''}</span>
            </button>

            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 hover:bg-red-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group ${isLiked ? 'text-red-500' : 'hover:text-red-500'
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