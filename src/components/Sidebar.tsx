import { useEffect, useState } from 'react';
import { Home, Compass, Bell, Mail, Bookmark, User as UserIcon, MoreHorizontal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import type { User } from '../types/index';
import { authService } from '../services/auth.service';

const Sidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Ưu tiên lấy data từ backend API
        const response = await authService.getMe();
        
        if (response.success && response.data) {
          const userData = response.data;
          // Transform backend user data sang frontend format
          const transformedUser: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            username: userData.username || userData.email.split('@')[0], // Sử dụng username từ backend hoặc tạo từ email
            bio: userData.bio || 'Frontend Developer',
            avatar: userData.avatar?.url || 'https://i.pravatar.cc/150?img=1', // Sử dụng avatar từ backend hoặc mặc định
            backgroundAvatar: userData.backgroundAvatar || 'https://picsum.photos/800/200',
            occupation: userData.occupation || 'Developer',
            location: userData.location || 'Vietnam',
            joinDate: userData.joinDate || '2024',
            stats: {
              following: 0,
              followers: 0
            }
          };
          setUser(transformedUser);
          
          // Cập nhật localStorage với data mới từ backend
          localStorage.setItem('user', JSON.stringify(transformedUser));
        } else {
          // Fallback: lấy từ localStorage nếu API fail
          const userStr = localStorage.getItem('user');
          if (userStr) {
            try {
              const userData = JSON.parse(userStr);
              const transformedUser: User = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                username: userData.username || userData.email.split('@')[0],
                bio: userData.bio || 'Frontend Developer',
                avatar: userData.avatar?.url || 'https://i.pravatar.cc/150?img=1',
                backgroundAvatar: userData.backgroundAvatar || 'https://picsum.photos/800/200',
                occupation: userData.occupation || 'Developer',
                location: userData.location || 'Vietnam',
                joinDate: userData.joinDate || '2024',
                stats: {
                  following: 0,
                  followers: 0
                }
              };
              setUser(transformedUser);
            } catch (error) {
              console.error('Error parsing user data:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error loading user data from API:', error);
        
        // Fallback to localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            const userData = JSON.parse(userStr);
            const transformedUser: User = {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              username: userData.username || userData.email.split('@')[0],
              bio: userData.bio || 'Frontend Developer',
              avatar: userData.avatar?.url || 'https://i.pravatar.cc/150?img=1',
              backgroundAvatar: userData.backgroundAvatar || 'https://picsum.photos/800/200',
              occupation: userData.occupation || 'Developer',
              location: userData.location || 'Vietnam',
              joinDate: userData.joinDate || '2024',
              stats: {
                following: 0,
                followers: 0
              }
            };
            setUser(transformedUser);
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      }
    };

    loadUserData();
  }, [location]);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Mail, label: 'Messages', path: '/messages' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
    { icon: UserIcon, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">H</span> 
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center space-x-4 px-3 py-3 rounded-full hover:bg-gray-900 transition-colors ${
                  location.pathname === item.path ? 'font-bold' : ''
                }`}
              >
                <item.icon size={26} />
                <span className="text-xl hidden xl:block">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Post Button */}
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full mt-6 w-full xl:w-auto">
        <Link to="/">
          <span className="hidden xl:block">Post</span>
          <span className="xl:hidden">+</span>
        </Link>
      </button>

      {/* User Profile */}
      <div className="mt-auto pt-4">
        <Link to="/profile">
          {user && (
              <div className="flex items-center justify-between p-3 rounded-full hover:bg-gray-900 cursor-pointer w-full">
                  <div className="flex items-center space-x-3">
                      <img
                          src={user.avatar}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="hidden xl:block">
                      <div className="font-bold">{user.name}</div>
                      <div className="text-gray-500 text-sm">@{user.username}</div>
                      </div>
                  </div>
                  <MoreHorizontal className="hidden xl:block" size={20} />
              </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
