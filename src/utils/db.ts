import { openDB } from 'idb';

const DB_NAME = 'social-app-db';
const STORE_NAME = 'posts';
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  },
});

export const addPost = async (post: any) => {
  const db = await dbPromise;
  await db.add(STORE_NAME, post);
};

export const getAllPosts = async () => {
  const db = await dbPromise;
  return await db.getAll(STORE_NAME);
};

export const deletePost = async (id: number) => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
};

export const updatePost = async (post: any) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, post);
};

export const seedPosts = async () => {
  const db = await dbPromise;
  const count = await db.count(STORE_NAME);

  if (count === 0) {
    const samplePosts = [
      {
        id: 1,
        author: 'Alice',
        handle: 'alice_wonder',
        time: '2h',
        content: 'Just enjoyed a wonderful cup of coffee this morning! #coffee #morningvibes',
        likes: 15,
        comments: 3,
        retweets: 1,
        avatar: 'https://i.pravatar.cc/150?img=1',
        image: undefined,
      },
      {
        id: 2,
        author: 'Bob',
        handle: 'bob_builder',
        time: '5h',
        content: 'Working on a new project. So excited to share it soon!',
        likes: 30,
        comments: 7,
        retweets: 5,
        avatar: 'https://i.pravatar.cc/150?img=2',
        image: 'https://picsum.photos/600/400?random=1', // Sample image URL
      },
      {
        id: 3,
        author: 'Charlie',
        handle: 'charlie_chaplin',
        time: '1d',
        content: 'What a beautiful sunset today! Nature never ceases to amaze me. #sunset #nature',
        likes: 50,
        comments: 10,
        retweets: 8,
        avatar: 'https://i.pravatar.cc/150?img=3',
        image: 'https://picsum.photos/600/400?random=2', // Sample image URL
      },
      {
        id: 4,
        author: 'Diana',
        handle: 'diana_prince',
        time: '2d',
        content: 'Reading a great book. Any recommendations for my next read?',
        likes: 22,
        comments: 5,
        retweets: 2,
        avatar: 'https://i.pravatar.cc/150?img=4',
        image: undefined,
      },
    ];

    for (const post of samplePosts) {
      await db.add(STORE_NAME, post);
    }
    console.log('Sample posts added to IndexedDB.');
  }
};