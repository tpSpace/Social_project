import React, { useState, useRef } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'PhatMotSach',
    username: 'phatmotsach',
    bio: 'Xin chào, tớ là Phát, tớ thích học tập và tìm hiểu những thứ mới mẻ, rất mong được làm quen với mọi người nhé!',
    avatar: 'https://cdn2.fptshop.com.vn/unsafe/800x0/avatar_anime_nam_cute_14_60037b48e5.jpg',
    backgroundAvatar: 'https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-preview.jpg',
    stats: {
      following: 750,
      followers: 140,
    }
  });

  const [editedUser, setEditedUser] = useState({ ...user });
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser(prev => ({ ...prev, backgroundAvatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    // User will handle logout logic
    alert('Logout functionality to be implemented by the user.');
  };

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
                <button onClick={handleEdit} className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out">
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

            <div className="mt-6 flex justify-start space-x-8">
              <div className="text-center">
                <p className="font-bold text-xl">{user.stats.following}</p>
                <p className="text-gray-400">Following</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl">{user.stats.followers}</p>
                <p className="text-gray-400">Followers</p>
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
                  <label htmlFor="name" className="block text-lg font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 transition-color duration-200 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="username" className="block text-lg font-medium">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={editedUser.username}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 transition-color duration-200 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </form>
            )}

            <div className="mt-8 border-t border-gray-700 pt-4">
              <button
                onClick={handleLogout}
                className="w-full text-center text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-colors duration-300 ease-in-out"
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