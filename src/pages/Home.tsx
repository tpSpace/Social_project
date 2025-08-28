import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsService } from '../services/posts.service';
import Timeline from '../components/Timeline';
import { toast } from 'react-hot-toast';
import type { Post, User } from '../types';

const Home = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Lấy thông tin user từ localStorage
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Lấy danh sách posts từ backend
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: postsService.getAllPosts,
    enabled: !!currentUser,
  });

  // Tạo post mới
  const createPostMutation = useMutation({
    mutationFn: postsService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create post');
    },
  });

  // Xóa post
  const deletePostMutation = useMutation({
    mutationFn: postsService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully!');
    },
  });

  // Cập nhật post
  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      postsService.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post updated successfully!');
    },
  });

  const handleNewPost = async (content: string, imageFile?: File) => {
    if (!currentUser) return;
    
    // Tạo title từ content một cách thông minh
    let title = content.trim();
    
    // Nếu content quá dài, cắt ngắn và thêm "..."
    if (title.length > 50) {
      title = title.substring(0, 50).trim() + '...';
    }
    
    // Nếu content rỗng, sử dụng title mặc định
    if (!title) {
      title = 'New Post';
    }
    
    // Đảm bảo title và content khác nhau
    if (title === content) {
      // Nếu giống hệt, thay đổi title một chút
      if (content.length > 30) {
        title = content.substring(0, 30).trim() + '...';
      } else {
        title = content + ' - Post';
      }
    }
    
    // Tạo post với hoặc không có image
    if (imageFile) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('status', 'PUBLISHED');
      formData.append('cover', imageFile);
      
      console.log('Creating post with image:', { title, content, imageFile: imageFile.name });
      console.log('FormData entries:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      createPostMutation.mutate(formData);
    } else {
      console.log('Creating post without image:', { title, content });
      createPostMutation.mutate({
        title: title,
        content: content,
        status: 'PUBLISHED'
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(id);
    }
  };

  const handleEditPost = async (updatedPost: Post) => {
    updatePostMutation.mutate({
      id: updatedPost.id,
      data: {
        title: updatedPost.title,
        content: updatedPost.content,
        status: 'PUBLISHED'
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load posts</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p>Please login to view posts</p>
        </div>
      </div>
    );
  }

  return (
    <Timeline 
      title="Home" 
      posts={posts} 
      onNewPost={handleNewPost} 
      showComposer 
      composerAvatar={currentUser.avatar}
      currentUserHandle={currentUser.username}
      onDeletePost={handleDeletePost}
      onEditPost={handleEditPost}
    />
  );
};

export default Home;