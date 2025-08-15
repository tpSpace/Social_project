import React, { useState, useMemo } from 'react';
import { Bell, Heart, UserPlus, MessageSquare, AtSign } from 'lucide-react';

// Placeholder data for notifications
const notifications = [
  {
    id: 1,
    type: 'like',
    user: { name: 'Jane Doe', username: 'janedoe', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    post: { id: 'post1', excerpt: 'A beautiful sunset...' },
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'follow',
    user: { name: 'John Smith', username: 'johnsmith', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
    time: '5 hours ago',
    read: true,
  },
  {
    id: 3,
    type: 'comment',
    user: { name: 'Emily White', username: 'emilywhite', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    comment: { excerpt: '"This looks great!"' },
    post: { id: 'post2', excerpt: 'My new artwork.' },
    time: '1 day ago',
    read: false,
  },
  {
    id: 4,
    type: 'mention',
    user: { name: 'Michael Brown', username: 'michaelbrown', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
    post: { id: 'post3', excerpt: 'Check out this article.' },
    time: '2 days ago',
    read: true,
  },
  {
    id: 5,
    type: 'like',
    user: { name: 'Sarah Green', username: 'sarahgreen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' },
    post: { id: 'post1', excerpt: 'A beautiful sunset...' },
    time: '3 days ago',
    read: true,
  },
];

const NotificationIcon = ({ type }: { type: string }) => {
  const iconProps = { size: 24, className: "mr-4" };
  switch (type) {
    case 'like': return <Heart {...iconProps} className={`${iconProps.className} text-red-500`} />;
    case 'follow': return <UserPlus {...iconProps} className={`${iconProps.className} text-blue-500`} />;
    case 'comment': return <MessageSquare {...iconProps} className={`${iconProps.className} text-green-500`} />;
    case 'mention': return <AtSign {...iconProps} className={`${iconProps.className} text-purple-500`} />;
    default: return <Bell {...iconProps} className={`${iconProps.className} text-gray-400`} />;
  }
};

const NotificationItem = ({ notification }: { notification: any }) => (
  <li className={`p-4 flex items-start space-x-4 border-b border-gray-800 transition-colors duration-200 ${notification.read ? 'bg-gray-900' : 'bg-gray-800'} hover:bg-gray-700 cursor-pointer`}>
    <NotificationIcon type={notification.type} />
    <div className="flex-1">
      <div className="flex items-center mb-1">
        <img src={notification.user.avatar} alt={notification.user.name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="text-gray-200">
            <span className="font-bold text-white">{notification.user.name}</span>
            <span className="text-gray-400"> @{notification.user.username}</span>
          </p>
          <p className="text-sm text-gray-500">{notification.time}</p>
        </div>
      </div>
      <div className="text-gray-300 ml-13">
        {notification.type === 'like' && `liked your post: "${notification.post.excerpt}"`}
        {notification.type === 'follow' && 'started following you.'}
        {notification.type === 'comment' && `commented on your post: ${notification.comment.excerpt}`}
        {notification.type === 'mention' && `mentioned you in a post: "${notification.post.excerpt}"`}
      </div>
    </div>
    {!notification.read && <div className="w-3 h-3 bg-blue-500 rounded-full self-center"></div>}
  </li>
);

const Notifications = () => {
  const [filter, setFilter] = useState('All');

  const filteredNotifications = useMemo(() => {
    if (filter === 'All') return notifications;
    return notifications.filter(n => n.type === filter.toLowerCase().slice(0, -1));
  }, [filter]);

  const tabs = ['All', 'Likes', 'Comments', 'Follows', 'Mentions'];

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto max-w-2xl">
        <div className="p-4 sticky top-0 bg-black bg-opacity-80 backdrop-blur-sm z-10">
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        
        <div className="border-b border-gray-800 flex justify-around">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`py-3 px-4 text-center w-full font-semibold transition-colors duration-200 
                ${filter === tab 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-500 hover:bg-gray-800'}`}>
              {tab}
            </button>
          ))}
        </div>

        <ul>
          {filteredNotifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;