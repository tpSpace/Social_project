import React from 'react';
import Post from './Post';
import PostComposer from './PostComposer';

import type { Post as PostType } from '../types/index';

interface TimelineProps {
  title: string;
  posts: PostType[];
  onNewPost: (content: string, imageFile?: File) => void;
  showComposer?: boolean;
  composerAvatar?: string;
  currentUserHandle?: string;
  onDeletePost?: (id: string) => void;
  onEditPost?: (updatedPost: PostType) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  title,
  posts,
  onNewPost,
  showComposer = false,
  composerAvatar,
  currentUserHandle,
  onDeletePost,
  onEditPost,
}) => {
  return (
    <div className="flex-1 h-full overflow-y-auto">
      <div className="sticky top-0 bg-black bg-opacity-90 backdrop-blur-sm z-10 border-b border-gray-800">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
      </div>

      {showComposer && (
        <PostComposer
          onPost={onNewPost}
          avatar={composerAvatar || 'https://i.pravatar.cc/150?img=1'}
        />
      )}

      <div className="divide-y divide-gray-800">
        {posts.map((post) => (
          <Post 
            key={post.id} 
            post={post}
            isCurrentUserPost={post.handle === currentUserHandle} 
            onDeletePost={onDeletePost}
            onEditPost={onEditPost} 
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No posts yet. Be the first to post something!</p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
