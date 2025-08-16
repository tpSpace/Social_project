import React, { useState, useEffect } from 'react';
import Timeline from '../components/Timeline';
import { addPost, getAllPosts, seedPosts, deletePost } from '../utils/db';

const currentUser = {
    name: 'PhatMotSach',
    handle: 'phatmotsach',
    avatar: 'https://cdn2.fptshop.com.vn/unsafe/800x0/avatar_anime_nam_cute_14_60037b48e5.jpg' // A consistent avatar for the user
};

const Home = () => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchAndSeedPosts = async () => {
            await seedPosts(); // Seed posts if DB is empty
            const dbPosts = await getAllPosts();
            const sortedPosts = dbPosts.sort((a, b) => b.id - a.id);
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

        const newPost = {
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
        const sortedPosts = dbPosts.sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
    };

    const handleDeletePost = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            await deletePost(Number(id));
            const dbPosts = await getAllPosts();
            const sortedPosts = dbPosts.sort((a, b) => b.id - a.id);
            setPosts(sortedPosts);
        }
    };

    const handleEditPost = async (updatedPost: any) => {
        await updatedPost(updatedPost);
        const dbPosts = await getAllPosts();
        const sortedPosts = dbPosts.sort((a, b) => b.id - a.id);
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




