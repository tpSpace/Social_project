import React from 'react';
import { Home, Compass, Bell, Mail, Bookmark, User, MoreHorizontal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Mail, label: 'Messages', path: '/messages' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: MoreHorizontal, label: 'More', path: '#' } // Or handle as a dropdown/modal
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-lg">H</span>
        </div>
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
        <span className="hidden xl:block">Post</span>
        <span className="xl:hidden">+</span>
      </button>

      {/* User Profile */}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between p-3 rounded-full hover:bg-gray-900 cursor-pointer w-full">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <div className="hidden xl:block">
              <div className="font-bold">Hulk</div>
              <div className="text-gray-500 text-sm">@hulkmaster</div>
            </div>
          </div>
          <MoreHorizontal className="hidden xl:block" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;