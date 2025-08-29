import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Quan trọng! Để gửi cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto refresh token trước khi hết hạn (mỗi 50 phút)
setInterval(async () => {
  try {
    console.log('🔄 [API] Auto-refreshing token...');
    await api.post('/auth/refresh');
    console.log('✅ [API] Auto-refresh successful');
  } catch (error) {
    console.log('⚠️ [API] Auto-refresh failed, will retry later');
  }
}, 50 * 60 * 1000); // 50 phút

// Interceptor để xử lý refresh token tự động
api.interceptors.response.use(
  (response) => {
    console.log('✅ [API] Request successful:', response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.log('❌ [API] Request failed:', {
      url: originalRequest.url,
      method: originalRequest.method,
      status: error.response?.status,
      message: error.message
    });

    // Nếu 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('🔄 [API] Token expired, attempting automatic refresh...');
        
        // Gọi refresh endpoint (cookies sẽ tự động gửi)
        await api.post('/auth/refresh');
        
        console.log('✅ [API] Token refreshed successfully, retrying request...');
        
        // Retry original request với cookies mới
        return api(originalRequest);
      } catch (refreshError) {
        console.error('❌ [API] Token refresh failed:', refreshError);
        
        // Thử refresh thêm 1 lần nữa trước khi redirect
        try {
          console.log('🔄 [API] Second attempt to refresh token...');
          await api.post('/auth/refresh');
          console.log('✅ [API] Second refresh successful, retrying request...');
          return api(originalRequest);
        } catch (secondRefreshError) {
          console.error('❌ [API] Second refresh also failed, redirecting to login');
          
          // Clear user data và redirect to login
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');
          
          // Redirect to login page
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);