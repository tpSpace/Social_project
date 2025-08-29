import { api } from './api';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content?: string;
  status: 'DRAFT' | 'PUBLISHED';
  coverId?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatarId?: {
      _id: string;
      secureUrl: string;
      url?: string;
      filename: string;
    };
  };
  cover?: {
    id: string;
    filename: string;
    mime: string;
    size: number;
    secureUrl: string;
    url?: string;
  };
}

export interface CreatePostData {
  title: string;
  content?: string;
  status?: 'DRAFT' | 'PUBLISHED';
}

export const postsService = {
  async getAllPosts() {
    try {
      const response = await api.get('/posts');
      console.log('Raw API response:', response);
      
      // Lấy posts từ response.data.data
      if (response.data && response.data.success && response.data.data) {
        // Transform backend data sang frontend format
        return response.data.data.map((post: any) => {
          console.log('Raw post data:', post);
          console.log('Author data:', post.author);
          console.log('Cover data:', post.cover);
          
          return {
            ...post,
            handle: post.author?.email?.split('@')[0] || 'user',
            time: new Date(post.createdAt).toLocaleDateString(),
            likes: 0, // TODO: Add from backend
            comments: 0, // TODO: Add from backend
            retweets: 0, // TODO: Add from backend
            avatar: post.author?.avatarId?.secureUrl || post.author?.avatarId?.url || '/default-avatar.png',
            image: post.cover ? `https://res.cloudinary.com/dyzvxodz2/image/upload/v1/${post.cover.id}` : null, // Corrected Cloudinary URL
            // Đảm bảo author data được giữ nguyên
            author: post.author || {
              _id: post.authorId?._id || post.authorId,
              name: post.authorId?.name || 'Unknown Author',
              email: post.authorId?.email || 'unknown@email.com',
              role: post.authorId?.role || 'USER'
            }
          };
        });
      } else {
        console.warn('Unexpected posts response format:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  async getPost(id: string) {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  async createPost(data: CreatePostData | FormData) {
    let response;
    
    try {
      if (data instanceof FormData) {
        // Xử lý upload với image
        console.log('Creating post with FormData:', data);
        
        // Log FormData contents
        for (let [key, value] of data.entries()) {
          console.log(`${key}:`, value);
        }
        
        // Không set Content-Type header, để browser tự động set với boundary
        response = await api.post('/posts', data);
      } else {
        // Xử lý post không có image
        console.log('Creating post without image:', data);
        response = await api.post('/posts', data);
      }
      
      return response.data;
    } catch (error: any) {
      // Nếu token hết hạn, thử refresh
      if (error.response?.status === 401) {
        console.log('Token expired, trying to refresh...');
        try {
          // Refresh token
          await api.post('/auth/refresh');
          console.log('Token refreshed, retrying post creation...');
          
          // Thử lại sau khi refresh
          if (data instanceof FormData) {
            response = await api.post('/posts', data);
          } else {
            response = await api.post('/posts', data);
          }
          
          console.log('Post created successfully after refresh:', response.data);
          return response.data;
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          throw refreshError;
        }
      }
      
      console.error('Error creating post:', error);
      throw error;
    }
  },

  async updatePost(id: string, data: Partial<CreatePostData>) {
    try {
      const response = await api.patch(`/posts/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  async deletePost(id: string) {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },
};
