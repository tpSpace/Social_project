export interface Post {
  id: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  coverId?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    username?: string;
    bio?: string;
    occupation?: string;
    location?: string;
    joinDate?: string;
    avatarId?: {
      _id: string;
      secureUrl: string;
      url?: string;
      filename: string;
    };
    backgroundAvatar?: string;
  };
  cover?: {
    id: string;
    filename: string;
    mime: string;
    size: number;
    secureUrl: string;
    url?: string;
  };
  // Frontend fields for compatibility
  handle?: string;
  time?: string;
  likes?: number;
  comments?: number;
  retweets?: number;
  avatar?: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  avatar: string;
  backgroundAvatar: string;
  occupation: string;
  location: string;
  joinDate: string;
  stats: {
    following: number;
    followers: number;
  };
}