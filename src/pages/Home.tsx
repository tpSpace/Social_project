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

const currentUser = {
    name: 'PhatMotSach',
    handle: 'phatmotsach',
    avatar: 'https://cdn2.fptshop.com.vn/unsafe/800x0/avatar_anime_nam_cute_14_60037b48e5.jpg' // A consistent avatar for the user
};

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchAndSeedPosts = async () => {
            await seedPosts(); // Seed posts if DB is empty
            const dbPosts = await getAllPosts();
            const sortedPosts = (dbPosts as Post[]).sort((a, b) => b.id - a.id);
            setPosts(sortedPosts);
        };
        fetchAndSeedPosts();
    }, []);

    const handleNewPost = async (content: string, imageFile?: File) => {
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
            handle: currentUser.handle,
            time: 'now',
            content,
            likes: 0,
            comments: 0,
            retweets: 0,
            avatar: currentUser.avatar,
            image: imageUrl, // Store the Data URL string
        };
        await addPost(newPost);
        const dbPosts = await getAllPosts();
        const sortedPosts = (dbPosts as Post[]).sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
    };

    const handleDeletePost = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            await deletePost(id);
            const dbPosts = await getAllPosts();
            const sortedPosts = (dbPosts as Post[]).sort((a, b) => b.id - a.id);
            setPosts(sortedPosts);
        }
    };

    const handleEditPost = async (updatedPost: Post) => {
        await updatePost(updatedPost);
        const dbPosts = await getAllPosts();
        const sortedPosts = (dbPosts as Post[]).sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
    };

    return (
        <Timeline 
            title="Home" 
            posts={posts} 
            onNewPost={handleNewPost} 
            showComposer 
            showTabs 
            composerAvatar={currentUser.avatar}
            currentUserHandle={currentUser.handle}
            onDeletePost={handleDeletePost}
            onEditPost={handleEditPost}
        />
    );
};

export default Home;