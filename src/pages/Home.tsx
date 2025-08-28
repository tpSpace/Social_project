import React, { useState, useEffect } from 'react';
import Timeline from '../components/Timeline';
import { addPost, getAllPosts, seedPosts, deletePost, updatePost } from '../utils/db';

// Define a type for the post object for type safety
export interface Post {
    id: number;
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

interface User {
    id?: number;
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

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        // Lấy thông tin user từ localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const userData = JSON.parse(userStr);
                // Chuyển đổi từ backend user format sang frontend user format
                const user: User = {
                    id: parseInt(userData.id) || Date.now(),
                    name: userData.name,
                    email: userData.email,
                    username: userData.email.split('@')[0], // Tạm thời dùng email làm username
                    bio: 'Frontend Developer',
                    avatar: 'https://i.pravatar.cc/150?img=1', // Avatar mặc định
                    backgroundAvatar: 'https://picsum.photos/800/200',
                    occupation: 'Developer',
                    location: 'Vietnam',
                    joinDate: '2024',
                    stats: {
                        following: 0,
                        followers: 0
                    }
                };
                setCurrentUser(user);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }

        const fetchAndSeedPosts = async () => {
            try {
                // Kiểm tra xem đã có posts chưa
                const existingPosts = await getAllPosts();
                
                if (existingPosts.length === 0) {
                    // Chỉ seed posts nếu database trống
                    await seedPosts();
                    console.log('✅ Sample posts added to IndexedDB');
                } else {
                    console.log('✅ Posts already exist in IndexedDB');
                }
                
                // Lấy tất cả posts và sắp xếp
                const dbPosts = await getAllPosts();
                const sortedPosts = (dbPosts as Post[]).sort((a, b) => b.id - a.id);
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                // Fallback: hiển thị posts mặc định
                setPosts([]);
            }
        };
        
        fetchAndSeedPosts();
    }, []);

    const handleNewPost = async (content: string, imageFile?: File) => {
        if (!currentUser) return;

        let imageUrl: string | undefined;
        if (imageFile) {
            imageUrl = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result as string);
                };
                reader.readAsDataURL(imageFile);
            });
        }

        const newPost: Post = {
            id: Date.now(),
            author: currentUser.name,
            handle: currentUser.username,
            time: 'now',
            content,
            likes: 0,
            comments: 0,
            retweets: 0,
            avatar: currentUser.avatar,
            image: imageUrl,
        };
        
        try {
            await addPost(newPost);
            const dbPosts = await getAllPosts();
            const sortedPosts = (dbPosts as Post[]).sort((a, b) => b.id - a.id);
            setPosts(sortedPosts);
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleDeletePost = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(id);
                const dbPosts = await getAllPosts();
                const sortedPosts = (dbPosts as Post[]).sort((a, b) => b.id - a.id);
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const handleEditPost = async (updatedPost: Post) => {
        try {
            await updatePost(updatedPost);
            const dbPosts = await getAllPosts();
            const sortedPosts = (dbPosts as Post[]).sort((a, b) => b.id - a.id);
            setPosts(sortedPosts);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <Timeline 
            title="Home" 
            posts={posts} 
            onNewPost={handleNewPost} 
            showComposer 
            showTabs 
            composerAvatar={currentUser.avatar}
            currentUserHandle={currentUser.username}
            onDeletePost={handleDeletePost}
            onEditPost={handleEditPost}
        />
    );
};

export default Home;