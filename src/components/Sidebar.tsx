import React from 'react';
import { Home, Compass, Bell, Mail, Bookmark, User, MoreHorizontal } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Compass, label: 'Explore' },
    { icon: Bell, label: 'Notifications' },
    { icon: Mail, label: 'Messages' },
    { icon: Bookmark, label: 'Bookmarks' },
    { icon: User, label: 'Profile' },
    { icon: MoreHorizontal, label: 'More' }
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
              <a
                href="#"
                className={`flex items-center space-x-4 px-3 py-3 rounded-full hover:bg-gray-900 transition-colors ${
                  item.active ? 'font-bold' : ''
                }`}
              >
                <item.icon size={26} />
                <span className="text-xl hidden xl:block">{item.label}</span>
              </a>
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
        <div className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-900 cursor-pointer">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">U</span>
          </div>
          <div className="hidden xl:block">
            <div className="font-bold">User Name</div>
            <div className="text-gray-500 text-sm">@username</div>
          </div>
          <MoreHorizontal className="hidden xl:block ml-auto" size={16} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;