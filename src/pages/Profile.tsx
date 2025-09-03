import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface User {
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

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        
        // Lấy user data từ backend API
        const response = await authService.getMe();
        
        if (response.success && response.data) {
          // Transform backend user data sang frontend format
          const userData = response.data;
          const transformedUser: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            username: userData.username || userData.email.split('@')[0], // Lấy từ backend hoặc fallback
            bio: userData.bio || '', // Lấy từ backend
            avatar: userData.avatar?.url || 'https://i.pravatar.cc/150?img=1', // Sử dụng avatar từ backend hoặc mặc định
            backgroundAvatar: userData.backgroundAvatar || 'https://picsum.photos/800/200', // Lấy từ backend
            occupation: userData.occupation || '', // Lấy từ backend
            location: userData.location || '', // Lấy từ backend
            joinDate: userData.joinDate || new Date().getFullYear().toString(), // Lấy từ backend
            stats: {
              following: 0,
              followers: 0
            }
          };
          
          setUser(transformedUser);
          setEditedUser(transformedUser);
        } else {
          // Fallback: lấy từ localStorage nếu API fail
          const userStr = localStorage.getItem('user');
          if (userStr) {
            const userData = JSON.parse(userStr);
            const fallbackUser: User = {
              id: userData.id || Date.now().toString(),
              name: userData.name,
              email: userData.email,
              username: userData.username || userData.email.split('@')[0],
              bio: userData.bio || '',
              avatar: userData.avatar || 'https://i.pravatar.cc/150?img=1',
              backgroundAvatar: userData.backgroundAvatar || 'https://picsum.photos/800/200',
              occupation: userData.occupation || '',
              location: userData.location || '',
              joinDate: userData.joinDate || new Date().getFullYear().toString(),
              stats: {
                following: 0,
                followers: 0
              }
            };
            setUser(fallbackUser);
            setEditedUser(fallbackUser);
          }
        }
      } catch (error: any) {
        console.error('Error loading user data:', error);
        
        // Nếu 401, redirect to login
        if (error.response?.status === 401) {
          toast.error('Session expired, please login again');
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');
          navigate('/login');
          return;
        }
        
        toast.error('Failed to load profile data');
        
        // Fallback to localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const userData = JSON.parse(userStr);
          const fallbackUser: User = {
            id: userData.id || Date.now().toString(),
            name: userData.name,
            email: userData.email,
            username: userData.username || userData.email.split('@')[0],
            bio: userData.bio || '',
            avatar: userData.avatar || 'https://i.pravatar.cc/150?img=1',
            backgroundAvatar: userData.backgroundAvatar || 'https://picsum.photos/800/200',
            occupation: userData.occupation || '',
            location: userData.location || '',
            joinDate: userData.joinDate || new Date().getFullYear().toString(),
            stats: {
              following: 0,
              followers: 0
            }
          };
          setUser(fallbackUser);
          setEditedUser(fallbackUser);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setEditedUser({ ...user });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedUser) {
      try {
        // Gọi API update user profile
        const updateData = {
          name: editedUser.name,
          bio: editedUser.bio,
          occupation: editedUser.occupation,
          location: editedUser.location,
          username: editedUser.username,
          joinDate: editedUser.joinDate
        };
        
        const response = await userService.updateProfile(updateData);
        
        if (response.success) {
          // Cập nhật state với data mới từ backend
          setUser(editedUser);
          setIsEditing(false);
          toast.success('Profile updated successfully!');
          
          // Cập nhật localStorage với data mới
          const currentUserStr = localStorage.getItem('user');
          if (currentUserStr) {
            const currentUser = JSON.parse(currentUserStr);
            const updatedUser = { ...currentUser, ...updateData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
        } else {
          toast.error(response.error || 'Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editedUser) {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editedUser) {
      const file = e.target.files[0];
      
      try {
        // Upload avatar lên backend
        const response = await userService.uploadAvatar(file);
        
        if (response.success && response.data?.user?.avatarUrl) {
          // Cập nhật avatar với URL từ backend
          const newAvatar = response.data.user.avatarUrl;
          setEditedUser({ ...editedUser, avatar: newAvatar });
          
          // Cập nhật localStorage
          const currentUserStr = localStorage.getItem('user');
          if (currentUserStr) {
            const currentUser = JSON.parse(currentUserStr);
            currentUser.avatar = newAvatar;
            localStorage.setItem('user', JSON.stringify(currentUser));
          }
          
          toast.success('Avatar updated successfully!');
        } else {
          toast.error('Failed to upload avatar');
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        toast.error('Failed to upload avatar');
      }
    }
  };

  const handleBackgroundChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editedUser) {
      const file = e.target.files[0];
      
      console.log('🖼️ [BACKGROUND] File selected:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      try {
        console.log('📤 [BACKGROUND] Starting upload...');
        
        // Upload background image lên uploads chung
        const formData = new FormData();
        formData.append('file', file);
        
        console.log('📋 [BACKGROUND] FormData created:', formData);
        
        const response = await api.post('/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log('📥 [BACKGROUND] Upload response:', response.data);
        console.log('📋 [BACKGROUND] Response data structure:', {
          success: response.data.success,
          data: response.data.data,
          hasUrl: !!response.data.data?.url,
          hasSecureUrl: !!response.data.data?.secureUrl,
          dataKeys: response.data.data ? Object.keys(response.data.data) : []
        });
        
        if (response.data.success && response.data.data?.url) {
          console.log('✅ [BACKGROUND] Upload successful!');
          
          // Cập nhật background với URL từ backend
          const newBackground = response.data.data.url;
          console.log('🔗 [BACKGROUND] New background URL:', newBackground);
          
          setEditedUser({ ...editedUser, backgroundAvatar: newBackground });
          console.log('🔄 [BACKGROUND] Local state updated');
          
          // Cập nhật localStorage
          const currentUserStr = localStorage.getItem('user');
          if (currentUserStr) {
            const currentUser = JSON.parse(currentUserStr);
            currentUser.backgroundAvatar = newBackground;
            localStorage.setItem('user', JSON.stringify(currentUser));
            console.log('💾 [BACKGROUND] LocalStorage updated');
          }
          
          toast.success('Background updated successfully!');
          
          // Cập nhật background vào database
          console.log('💾 [BACKGROUND] Updating profile in database...');
          try {
            const updateResponse = await userService.updateProfile({
              backgroundAvatar: newBackground
            });
            
            console.log('✅ [BACKGROUND] Profile update response:', updateResponse);
            toast.success('Background updated and saved to profile!');
          } catch (updateError) {
            console.error('❌ [BACKGROUND] Error updating profile:', updateError);
            toast.error('Background uploaded but failed to save to profile');
          }
        } else {
          console.error('❌ [BACKGROUND] Upload response invalid:', response.data);
          toast.error('Failed to upload background');
        }
      } catch (error: any) {
        console.error('❌ [BACKGROUND] Error uploading background:', error);
        console.error('❌ [BACKGROUND] Error details:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
        toast.error('Failed to upload background');
      }
    } else {
      console.log('⚠️ [BACKGROUND] No file selected or editedUser not available');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    toast.success('Logout successful!');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !editedUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load profile data</p>
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

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-md">
          {/* Background Avatar and Profile Header */}
          <div className="relative">
            <img
              src={editedUser.backgroundAvatar}
              alt="Background Avatar"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            {isEditing && (
              <>
                <button 
                  onClick={() => backgroundInputRef.current?.click()}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  Edit Background
                </button>
                <input
                  type="file"
                  ref={backgroundInputRef}
                  onChange={handleBackgroundChange}
                  className="hidden"
                  accept="image/*"
                />
              </>
            )}
            <div className="absolute bottom-0 left-4 transform translate-y-1/2">
              <img
                src={editedUser.avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-900"
              />
              {isEditing && (
                <>
                  <button 
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    Edit
                  </button>
                  <input
                    type="file"
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                    className="hidden"
                    accept="image/*"
                  />
                </>
              )}
            </div>
            <div className="absolute bottom-4 right-4">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button onClick={handleSave} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out">
                    Save
                  </button>
                  <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition-colors duration-300 ease-in-out">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={handleEdit} className="border border-blue-500 text-blue-500 px-4 py-2 bg-opacity-40 bg-gray-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out">
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="pt-20 px-6 pb-6">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-500">@{user.username}</p>
            </div>

            <div className="mt-4 flex flex-col space-y-2 text-gray-400 text-lg">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{user.occupation}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{user.location}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  Joined {user.joinDate && user.joinDate.length === 4 ? 
                    `${user.joinDate}` : 
                    new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                  }
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-start space-x-8">
              <div className="text-center flex">
                <p className="font-bold text-lg">{user.stats?.following || 0}</p>
                <p className="text-gray-400 text-lg ml-1">Following</p>
              </div>
              <div className="text-center flex">
                <p className="font-bold text-lg">{user.stats?.followers || 0}</p>
                <p className="text-gray-400 text-lg ml-1">Followers</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Bio</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border transition-color duration-200 bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  rows={4}
                />
              ) : (
                <p className="text-gray-400 mt-2 text-lg">{user.bio}</p>
              )}
            </div>

            {isEditing && (
              <form onSubmit={handleSave} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xl font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 transition-color duration-200 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="username" className="block text-xl font-medium">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={editedUser.username}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 transition-color duration-200 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="occupation" className="block text-xl font-medium">Occupation</label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={editedUser.occupation}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 transition-color duration-200 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-xl font-medium">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={editedUser.location}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 transition-color duration-200 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="joinDate" className="block text-xl font-medium">Join Year</label>
                  <input
                    type="number"
                    id="joinDate"
                    name="joinDate"
                    min="1900"
                    max="2030"
                    value={editedUser.joinDate}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 transition-color duration-200 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="2024"
                  />
                </div>
              </form>
            )}

            <div className="mt-8 border-t border-gray-700 pt-5">
              <button
                onClick={handleLogout}
                className="w-full text-center text-red-500 hover:bg-red-500 hover:text-white px-3 py-3 rounded-md transition-colors duration-300 ease-in-out"
              >
                Log Out
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;