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

export interface WalletLoginData {
  walletAddress: string;
  signature: string;
  message: string;
}

export interface WalletRegisterData {
  walletAddress: string;
  name?: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  walletAddress?: string;
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

  async walletLogin(data: WalletLoginData) {
    const response = await api.post('/auth/wallet/login', data);
    return response.data;
  },

  async walletRegister(data: WalletRegisterData) {
    const response = await api.post('/auth/wallet/register', data);
    return response.data;
  },

  async getNonce(walletAddress: string) {
    const response = await api.get(`/auth/wallet/nonce/${walletAddress}`);
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
      console.error('Error fetching user data:', error);
      throw error;
    }
  },
};