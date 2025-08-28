import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, BadgeCheck } from 'lucide-react';
import type { Post as PostType } from '../types/index';

interface PostProps {
  post: PostType;
  isCurrentUserPost?: boolean;
  onDeletePost?: (id: string) => void;
  onEditPost?: (updatedPost: PostType) => void;
}

const Post: React.FC<PostProps> = ({ 
  post,
  isCurrentUserPost, 
  onDeletePost, 
  onEditPost
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post.likes || 0);
  const [currentRetweets, setCurrentRetweets] = useState(post.retweets || 0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content || '');
  const [displayContent, setDisplayContent] = useState(post.content || '');

  useEffect(() => {
    setDisplayContent(post.content || '');
  }, [post.content]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted);
    setCurrentRetweets(isRetweeted ? currentRetweets - 1 : currentRetweets + 1);
  };

  const handleDelete = () => {
    if (onDeletePost) {
      onDeletePost(post.id);
    }
    setShowDropdown(false);
  };

  const handleEdit = () => {
    setEditedContent(displayContent);
    setIsEditing(true);
    setShowDropdown(false);
  };

  const handleSaveEdit = () => {
    const updatedPost: PostType = {
      ...post,
      content: editedContent,
      updatedAt: new Date().toISOString()
    };

    if (onEditPost) {
      onEditPost(updatedPost);
    }
    setDisplayContent(editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Format time từ createdAt
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`;
    return date.toLocaleDateString();
  };

  // Sử dụng post data đã được transform
  const authorName = post.author?.name || 'Unknown User';
  const authorHandle = post.handle || post.author?.email?.split('@')[0] || 'unknown';
  const postTime = post.time || formatTime(post.createdAt);
  const postAvatar = post.avatar || `https://i.pravatar.cc/150?img=${Math.abs(authorName.charCodeAt(0)) % 10}`;

  return (
    <article className="p-4 hover:bg-gray-950 transition-colors cursor-pointer">
      <div className="flex space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={postAvatar}
            alt={`${authorName}'s avatar`}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-bold text-white hover:underline">
              {authorName}
            </span>
            {post.author?.role === 'ADMIN' && (
              <BadgeCheck className="w-4 h-4 text-blue-500" />
            )}
            <span className="text-gray-500">@{authorHandle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{postTime}</span>
          </div>

          {/* Post Content */}
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white resize-none"
                rows={3}
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-white mb-2">{post.title}</h3>
              <p className="text-gray-300 mb-3">{displayContent}</p>
              
              {/* Cover Image */}
              {post.cover && (
                <div className="mb-3">
                  <img
                    src={post.cover.secureUrl || post.cover.url}
                    alt={post.cover.filename}
                    className="w-full rounded-lg max-h-96 object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-8">
              {/* Like */}
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${
                  isLiked ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{currentLikes}</span>
              </button>

              {/* Comment */}
              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments || 0}</span>
              </button>

              {/* Retweet */}
              <button
                onClick={handleRetweet}
                className={`flex items-center space-x-2 hover:text-green-500 transition-colors ${
                  isRetweeted ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                <Repeat2 className={`w-5 h-5 ${isRetweeted ? 'fill-current' : ''}`} />
                <span>{currentRetweets}</span>
              </button>

              {/* Share */}
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <Share className="w-5 h-5" />
              </button>
            </div>

            {/* More Options */}
            {isCurrentUserPost && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={handleEdit}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
