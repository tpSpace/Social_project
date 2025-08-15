import React from 'react';
import { Search, Settings2, MailPlus } from 'lucide-react';

// Placeholder data
const conversations = [
  {
    id: 1,
    name: 'Tony Stark',
    username: 'ironman',
    avatar: 'https://media.istockphoto.com/id/1360554439/vi/anh/%C4%91%E1%BA%A3o-nhi%E1%BB%87t-%C4%91%E1%BB%9Bi-maldives.jpg?s=612x612&w=0&k=20&c=pqWxvBFhn0_mJQF-oNyiDS56iahHule2vZmmVbjc_TA=',
    lastMessage: 'Perfect, see you then.',
    time: '1h',
    unread: 2,
  },
  {
    id: 2,
    name: 'Peter Parker',
    username: 'spiderman',
    avatar: 'https://picsum.photos/seed/picsum/400/400',
    lastMessage: 'Did you see that new movie? It was awesome!',
    time: '3h',
    unread: 0,
  },
  {
    id: 3,
    name: 'Steve Rogers',
    username: 'captainamerica',
    avatar: 'https://picsum.photos/seed/eiusmod/400/400',
    lastMessage: 'On my way.',
    time: '1d',
    unread: 0,
  },
];

const ConversationItem = ({ conv }: { conv: any }) => (
  <div className="p-3 flex space-x-3 hover:bg-gray-900 cursor-pointer border-b border-gray-800">
    <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <span className="font-bold truncate">{conv.name}</span>
          <span className="text-gray-500 truncate">@{conv.username}</span>
        </div>
        <span className="text-gray-500 text-sm">{conv.time}</span>
      </div>
      <div className="flex justify-between items-start mt-1">
        <p className="text-gray-400 truncate max-w-xs">{conv.lastMessage}</p>
        {conv.unread > 0 && (
          <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {conv.unread}
          </span>
        )}
      </div>
    </div>
  </div>
);

const Messages = () => {
  return (
    <div className="w-full h-screen flex">
      {/* Left Pane: Conversations */}
      <div className="w-2/5 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-xl p-3 flex items-center justify-between z-10 border-b border-gray-800">
            <h1 className="text-xl font-bold">Messages</h1>
            <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-white"><Settings2 size={20} /></button>
                <button className="text-gray-400 hover:text-white"><MailPlus size={20} /></button>
            </div>
        </div>
        {/* Search */}
        <div className="p-3 border-b border-gray-800">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input type="text" placeholder="Search Direct Messages" className="w-full bg-gray-900 text-white rounded-full py-2 pl-11 pr-4 focus:outline-none" />
            </div>
        </div>
        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => <ConversationItem key={conv.id} conv={conv} />)}
        </div>
      </div>

      {/* Right Pane: Chat */}
      <div className="w-3/5 flex flex-col items-center justify-center text-center p-8">
        <div className="max-w-sm">
            <h2 className="text-3xl font-bold mb-2">Select a message</h2>
            <p className="text-gray-500">
                Choose from your existing conversations, start a new one, or just keep swimming.
            </p>
            <button className="mt-6 bg-blue-500 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors">
                New Message
            </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;