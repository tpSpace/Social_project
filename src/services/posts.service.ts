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
}

export interface CreatePostData {
  title: string;
  content?: string;
  status?: 'DRAFT' | 'PUBLISHED';
}

export const postsService = {
  async getAllPosts() {
    const response = await api.get('/posts');
    return response.data;
  },

  async getPost(id: string) {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  async createPost(data: CreatePostData) {
    const response = await api.post('/posts', data);
    return response.data;
  },

  async updatePost(id: string, data: Partial<CreatePostData>) {
    const response = await api.patch(`/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: string) {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};
