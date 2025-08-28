import { api } from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatarId?: string;
}

export const authService = {
  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  async refresh() {
    try {
      const response = await api.post('/auth/refresh');
      return response.data;
    } catch (error) {
      console.error('Refresh token failed:', error);
      throw error;
    }
  },

  async getMe() {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error: any) {
      // Nếu access token hết hạn, thử refresh
      if (error.response?.status === 401) {
        console.log('Access token expired, trying to refresh...');
        try {
          await this.refresh();
          // Thử lại sau khi refresh
          const retryResponse = await api.get('/users/me');
          return retryResponse.data;
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          throw refreshError;
        }
      }
      throw error;
    }
  },
};