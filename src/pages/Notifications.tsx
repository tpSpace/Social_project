import React from 'react';
import { Bell } from 'lucide-react';

// Placeholder data for notifications
const notifications = [
  {
    id: 1,
    type: 'like',
    user: { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    post: 'your photo',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'follow',
    user: { name: 'John Smith', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
    time: '5 hours ago',
  },
  {
    id: 3,
    type: 'comment',
    user: { name: 'Emily White', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    comment: '"This looks great!"',
    post: 'your post',
    time: '1 day ago',
  },
  {
    id: 4,
    type: 'mention',
    user: { name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
    post: 'a post',
    time: '2 days ago',
  },
  {
    id: 5,
    type: 'like',
    user: { name: 'Sarah Green', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' },
    post: 'your comment',
    time: '3 days ago',
  },
];

// Icon component for different notification types
const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'like':
      return (
        <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      );
    case 'follow':
      return (
        <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2h-2a1 1 0 110-2h2v-2a1 1 0 011-1z" />
        </svg>
      );
    case 'comment':
      return (
        <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
        </svg>
      );
    case 'mention':
      return (
        <svg className="h-6 w-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
};

const Notifications = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto">
        <div className="border-b border-gray-200 flex items-center">
          <Bell className='text-gray-200 ml-4' />
          <h1 className="text-2xl font-bold p-4">Notifications</h1>
        </div>
        <ul className="divide-y divide-gray-200 bg-gray-900">
          {notifications.map((notification) => (
            <li key={notification.id} className="p-4 flex items-start space-x-4 hover:bg-gray-700 cursor-pointer">
              <div className="mt-1">
                <NotificationIcon type={notification.type} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <img src={notification.user.avatar} alt={notification.user.name} className="w-8 h-8 rounded-full" />
                </div>
                <p className="text-gray-400 mt-2">
                  <span className="font-bold text-white">{notification.user.name}</span>
                  {notification.type === 'like' && ` liked ${notification.post}.`}
                  {notification.type === 'follow' && ' started following you.'}
                  {notification.type === 'comment' && ` commented: ${notification.comment} on ${notification.post}.`}
                  {notification.type === 'mention' && ` mentioned you in ${notification.post}.`}
                </p>
                <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;