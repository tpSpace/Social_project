import { api } from './api';

export interface UploadResponse {
  id: string;
  filename: string;
  mime: string;
  size: number;
  secureUrl: string;
  url?: string;
}

export const uploadService = {
  async uploadFile(file: File, folder?: string) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (folder) {
        formData.append('folder', folder);
      }
      
      const response = await api.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  async getFileInfo(fileId: string) {
    try {
      const response = await api.get(`/uploads/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting file info:', error);
      throw error;
    }
  },

  async deleteFile(fileId: string) {
    try {
      const response = await api.delete(`/uploads/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },
};
