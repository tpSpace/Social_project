import React, { useState } from 'react';
import { Image, MapPin, Smile, Calendar } from 'lucide-react';

interface PostComposerProps {
  onPost: (content: string) => void;
}

const PostComposer: React.FC<PostComposerProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const maxLength = 280;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onPost(content);
      setContent('');
    }
  };

  return (
    <div className="border-b border-gray-800 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">U</span>
          </div>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What is happening?!"
              className="w-full bg-transparent text-white text-xl placeholder-gray-500 resize-none focus:outline-none min-h-[120px]"
              rows={3}
              maxLength={maxLength}
            />
            
            {/* Privacy setting */}
            <div className="flex items-center text-blue-500 text-sm mb-4">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Everyone can reply
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                >
                  <Image size={20} />
                </button>
                <button
                  type="button"
                  className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4zM6 6v14h12V6H6zm3-2V3h6v1H9z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                >
                  <Smile size={20} />
                </button>
                <button
                  type="button"
                  className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                >
                  <Calendar size={20} />
                </button>
                <button
                  type="button"
                  className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                >
                  <MapPin size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                {content.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      content.length > maxLength * 0.8 ? 'border-orange-500' : 'border-gray-600'
                    }`}>
                      <span className={`text-xs ${content.length > maxLength * 0.8 ? 'text-orange-500' : 'text-gray-500'}`}>
                        {maxLength - content.length}
                      </span>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:text-gray-500 text-white px-6 py-1.5 rounded-full font-bold transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostComposer;