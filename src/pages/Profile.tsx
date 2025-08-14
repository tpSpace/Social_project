import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'PhatMotSach',
    username: 'phatmotsach',
    bio: 'Xin chào, tớ là Phát, tớ thích học tập và tìm hiểu những thứ mới mẻ, rất mong được làm quen với mọi người nhé!',
    avatar: 'https://cdn2.fptshop.com.vn/unsafe/800x0/avatar_anime_nam_cute_14_60037b48e5.jpg',
    stats: {
      following: 750,
      followers: 140,
    }
  });

  const [editedUser, setEditedUser] = useState({ ...user });

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

  const handleLogout = () => {
    // User will handle logout logic
    alert('Logout functionality to be implemented by the user.');
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 pt-5">
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <div className="flex items-center flex-col space-x-6 space-y-3">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold flex justify-center">{user.name}</h1>
              <p className="text-gray-500 flex justify-center">@{user.username}</p>
            </div>
            <div className="ml-auto">
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

          <div className="mt-6 flex justify-center space-x-8 text-white">
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
                className="w-full mt-2 p-2 border transition-color duration-200 border-gray-800 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                rows={4}
              />
            ) : (
              <p className="text-gray-400 mt-2 text-lg">{user.bio}</p>
            )}
          </div>

          {isEditing && (
            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-white">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  custom-class-for-model
                  value={editedUser.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-3 transition-color duration-200 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:ring-1 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-lg font-medium text-white">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editedUser.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-3 transition-color duration-200 bg-white border text-gray-800 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:ring-1 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </form>
          )}

          <div className="mt-8 border-t pt-4">
            <button
              onClick={handleLogout}
              className="w-full text-center text-red-600 hover:bg-red-100 px-2 py-3 rounded-xl transition-colors duration-300 ease-in-out"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;