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
    <main style={{ backgroundColor: '#050a18', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '100px' }}>
      
      {/* Header aur Upload Button */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', textAlign: 'left' }}>
        <h1 style={{ fontSize: '24px', margin: '0' }}>SHIVAM STUDIO</h1>
        <Link href="/admin"> 
          <button style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
            STUDIO MANAGER
          </button>
        </Link>
      </div>

      {/* APK Cards Section */}
      <div style={{ width: '100%', maxWidth: '400px', marginTop: '40px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '20px', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            
            {/* 1. Logo */}
            <img 
              src={post.imageUrl || "https://via.placeholder.com/150"} 
              style={{ width: '100px', height: '100px', borderRadius: '15px', marginBottom: '15px', objectFit: 'cover' }} 
            />

            {/* 2. Details */}
            <h2 style={{ fontSize: '20px', margin: '5px 0' }}>{post.title}</h2>
            <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '15px' }}>{post.description}</p>

            {/* 3. Download Button */}
            <a href={post.downloadUrl} style={{ width: '100%', backgroundColor: '#0070f3', color: 'white', padding: '12px 0', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
              DOWNLOAD NOW 📥
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
