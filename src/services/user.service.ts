import { api } from './api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  avatar: string;
  backgroundAvatar: string;
  occupation: string;
  location: string;
  joinDate: string;
  stats: {
    following: number;
    followers: number;
  };
}

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  occupation?: string;
  location?: string;
}

export const userService = {
  async getProfile() {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  async updateProfile(data: UpdateProfileData) {
    try {
      const response = await api.patch('/users/me', data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  async uploadAvatar(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  },

  async searchUsers(query: string) {
    try {
      const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  async followUser(userId: string) {
    try {
      const response = await api.post(`/users/${userId}/follow`);
      return response.data;
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  },

  async unfollowUser(userId: string) {
    try {
      const response = await api.delete(`/users/${userId}/follow`);
      return response.data;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  },
};
