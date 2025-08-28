import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      console.log('Login response:', response);
      
      // Kiểm tra response structure
      if (response.success && response.data) {
        // Lưu thông tin user
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // Kiểm tra xem có tokens trong response không
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
        }
        if (response.refresh_token) {
          localStorage.setItem('refresh_token', response.refresh_token);
        }
        
        // Nếu không có tokens, có thể backend sử dụng session/cookies
        // Lưu user info để sử dụng cho các API calls
        localStorage.setItem('isAuthenticated', 'true');
        
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Login response format error');
      }
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-black p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
            <span className="text-black font-bold text-2xl">H</span>
          </div>
          <h1 className="text-3xl font-bold">Sign in to Hulk-Hub</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loginMutation.isPending}
            className="w-full bg-white text-black font-bold py-3 px-4 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-4 text-gray-500">or</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <div className="space-y-4">
          <button className="w-full bg-white text-black font-semibold py-2 px-4 rounded-full border border-gray-700 hover:bg-gray-200 transition-colors">
            Sign in with Google
          </button>
          <button className="w-full bg-white text-black font-semibold py-2 px-4 rounded-full border border-gray-700 hover:bg-gray-200 transition-colors">
            Sign in with Apple
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="mt-6 text-center text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
