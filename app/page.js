"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#050a18] text-white p-5">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">SHIVAM STUDIO</h1>
        <Link href="/admin">
          <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg font-bold">
            STUDIO MANAGER
          </button>
        </Link>
      </header>

      <main className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-700 p-4 rounded-xl bg-gray-900/50">
            {/* 1. Logo/Photo */}
            {post.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-32 h-32 rounded-lg mb-4 object-cover" 
              />
            )}
            
            {/* 2. Details */}
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-400 mt-2">{post.description}</p>
            
            {/* 3. Button */}
            <a 
              href={post.downloadUrl || post.link} 
              className="inline-block mt-4 px-6 py-2 bg-blue-600 rounded-full font-bold text-white"
            >
              Download APK
            </a>
          </div>
        ))}
      </main>
    </div>
  );
}
