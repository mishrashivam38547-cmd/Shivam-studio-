"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

// Aapki Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Firebase Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // "posts" collection se data nikalna
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen p-4 flex flex-col items-center">
      <h1 className="site-title">SHIVAM STUDIO</h1>
      
      <div className="w-full max-w-md mt-10">
        {posts.map((post) => (
          <div key={post.id} className="apk-card">
            {/* 1. Logo Format */}
            <img 
              src={post.imageUrl || "https://via.placeholder.com/150"} 
              alt={post.title} 
              className="apk-logo" 
            />

            {/* 2. Name & Details Format */}
            <div className="text-center">
              <h2 className="apk-name">{post.title}</h2>
              <p className="apk-desc">{post.description}</p>
            </div>

            {/* 3. Button Format */}
            <a href={post.downloadUrl} className="download-btn">
              DOWNLOAD NOW 📥
            </a>
          </div>
        ))}
      </div>
    </main>
  );
                }
