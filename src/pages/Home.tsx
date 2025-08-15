import React, { useState } from 'react';
import Timeline from '../components/Timeline';

const initialPosts = [
    {
      id: '1',
      author: 'Bruce Banner',
      handle: 'hulkscientist',
      time: '2h',
      content: 'Just launched Hulk-Hub! A place where everyone can share their thoughts and connect with the community. The future of social networking is here! 🚀',
      likes: 1247,
      comments: 89,
      retweets: 234,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqx0cT1HzvxSTfdYqsGaBkrZGHLsXrfiV6qxA0DhpVwdQARNRjA6lTbNQwRM2KqD9OZkw&usqp=CAU'
    },
    {
      id: '2',
      author: 'Tony Stark',
      handle: 'ironman',
      time: '4h',
      content: 'AI integration in social platforms is revolutionary. The technology behind Hulk-Hub\'s recommendation system is absolutely brilliant. Excited to see where this goes! 🤖✨',
      likes: 892,
      comments: 156,
      retweets: 178,
      avatar: 'https://media.istockphoto.com/id/1360554439/vi/anh/%C4%91%E1%BA%A3o-nhi%E1%BB%87t-%C4%91%E1%BB%9Bi-maldives.jpg?s=612x612&w=0&k=20&c=pqWxvBFhn0_mJQF-oNyiDS56iahHule2vZmmVbjc_TA='
    },
    {
      id: '3',
      author: 'Natasha Romanoff',
      handle: 'blackwidow',
      time: '6h',
      content: 'Privacy and security should always be the foundation of any social platform. Impressed by the encryption standards implemented here. Well done team! 🔒',
      likes: 743,
      comments: 92,
      retweets: 167,
      avatar: 'https://picsum.photos/seed/eiusmod/400/400'
    },
];

const Home = () => {
    const [posts, setPosts] = useState(initialPosts);

    const handleNewPost = (content: string) => {
        const newPost = {
          id: Date.now().toString(),
          author: 'You',
          handle: 'yourhandle',
          time: 'now',
          content,
          likes: 0,
          comments: 0,
          retweets: 0,
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
        };
        setPosts([newPost, ...posts]);
      };

    return <Timeline title="Home" posts={posts} onNewPost={handleNewPost} showComposer showTabs />;
};

export default Home;