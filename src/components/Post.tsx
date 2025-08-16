import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, BadgeCheck } from 'lucide-react'; // Added BadgeCheck

interface PostData {
  id: string;
  author: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  retweets: number;
  avatar?: string;
  image?: string;
}

interface PostProps extends PostData {
  isCurrentUserPost?: boolean; // New prop to indicate if it's the current user's post
  onDeletePost?: (id: string) => void; // New prop for delete functionality
  onEditPost?: (updatedPost: PostData) => void; // New prop for edit functionality
}

const Post: React.FC<PostProps> = ({ id, avatar, author, handle, time, content, likes, comments, retweets, image, isCurrentUserPost, onDeletePost, onEditPost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentRetweets, setCurrentRetweets] = useState(retweets);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [editedContent, setEditedContent] = useState(content); // State for edited content
  const [editedImage, setEditedImage] = useState<string | undefined>(image); // State for edited image
  const [newImageFile, setNewImageFile] = useState<File | undefined>(undefined); // State for new image file

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted);
    setCurrentRetweets(isRetweeted ? currentRetweets - 1 : currentRetweets + 1);
  };

  const handleDelete = () => {
    if (onDeletePost) {
      onDeletePost(id);
    }
    setShowDropdown(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  const handleSaveEdit = async () => {
    let imageUrlToSave = editedImage;
    if (newImageFile) {
      imageUrlToSave = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(newImageFile);
      });
    }

    const updatedPost = {
      id,
      author,
      handle,
      time,
      content: editedContent,
      likes,
      comments,
      retweets,
      avatar,
      image: imageUrlToSave,
    };

    console.log('Saving post with image URL:', imageUrlToSave); // Debugging line

    if (onEditPost) {
      onEditPost(updatedPost);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(content);
    setEditedImage(image);
    setNewImageFile(undefined);
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
      setEditedImage(URL.createObjectURL(e.target.files[0])); // For immediate preview
    }
  };

  let dropdownTimeout: ReturnType<typeof setTimeout>; // Declare a variable to hold the timeout ID

  const handleDropdownMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // 200ms delay
  };

  const handleDropdownMouseEnter = () => {
    clearTimeout(dropdownTimeout);
  };

  return (
    <article className="p-4 hover:bg-gray-950 transition-colors cursor-pointer">
      <div className="flex space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-600 flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt={author} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-bold text-lg">{author.charAt(0).toUpperCase()}</span>
          )}
        </div>


        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-bold text-white hover:underline cursor-pointer flex items-center">
              {author}
              {/* Replaced inline SVG with BadgeCheck */}
              <BadgeCheck className="w-4 h-4 text-blue-500 ml-1" />
            </h3>
            <span className="text-gray-400 text-sm">@{handle}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{time}</span>
            {isCurrentUserPost && (
              <div className="relative ml-auto" onMouseLeave={handleDropdownMouseLeave} onMouseEnter={handleDropdownMouseEnter}>
                <button
                  className="text-gray-500 hover:text-gray-300 hover:bg-gray-800 p-1 rounded-full transition-colors"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <MoreHorizontal size={16} />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                      onClick={handleEdit}
                    >
                      Edit Post
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700"
                      onClick={handleDelete}
                    >
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <textarea
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={3}
              />
              {editedImage && (
                <div className="my-2 rounded-2xl border border-gray-800 overflow-hidden">
                  <img src={editedImage} alt="Post image preview" className="w-full h-auto object-cover" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-700 text-white hover:bg-gray-600"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-white text-base leading-normal mb-3 break-words whitespace-pre-wrap">{content}</p>
          )}

          {!isEditing && image && (
            <div className="my-4 rounded-2xl border border-gray-800 overflow-hidden">
                <img src={image} alt="Post image" className="w-full h-auto object-cover" />
            </div>
            )}

          <div className="flex items-center justify-between max-w-md text-gray-500">
            <button className="flex items-center space-x-2 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group">
              <MessageCircle size={18} />
              <span className="text-sm">{comments > 0 ? comments : ''}</span>
            </button>

            <button
              onClick={handleRetweet}
              className={`flex items-center space-x-2 hover:bg-green-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group ${isRetweeted ? 'text-green-500' : 'hover:text-green-500'
                }`}
            >
              <Repeat2 size={18} />
              <span className="text-sm">{currentRetweets > 0 ? currentRetweets : ''}</span>
            </button>

            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 hover:bg-red-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group ${isLiked ? 'text-red-500' : 'hover:text-red-500'
                }`}
            >
              <Heart size={18} className={isLiked ? 'fill-current' : ''} />
              <span className="text-sm">{currentLikes > 0 ? currentLikes : ''}</span>
            </button>

            <button className="flex items-center space-x-2 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors group">
              <Share size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;