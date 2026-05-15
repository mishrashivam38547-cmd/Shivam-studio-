"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

// Firebase Configuration
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
    <div style={{ backgroundColor: '#050a18', minHeight: '100vh', width: '100%', color: 'white', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      
      {/* 1. Header Section */}
      <header style={{ padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1 style={{ fontSize: '32px', margin: 0, fontWeight: 'bold', letterSpacing: '-1px' }}>SHIVAM STUDIO</h1>
        <a href="/admin" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '8px 18px', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
            STUDIO MANAGER
          </button>
        </a>
      </header>

      {/* 2. Posts List */}
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {posts.map((post) => (
            <div key={post.id} style={{ 
              backgroundColor: '#111827', 
              border: '1px solid #1f2937', 
              borderRadius: '24px', 
              padding: '24px', 
              marginBottom: '30px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
            }}>
              
              {/* 1. Logo Format */}
              <img 
                src={post.imageUrl || "https://via.placeholder.com/150"} 
                alt="Logo"
                style={{ width: '110px', height: '110px', borderRadius: '20px', marginBottom: '15px', objectFit: 'cover', border: '3px solid #374151' }} 
              />

              {/* 2. Details Format */}
              <h2 style={{ fontSize: '24px', margin: '10px 0', fontWeight: 'bold' }}>{post.title}</h2>
              <p style={{ fontSize: '15px', color: '#9ca3af', marginBottom: '20px', lineHeight: '1.5' }}>
                {post.description}
              </p>

              {/* 3. Button Format */}
              <a href={post.downloadUrl || post.link} style={{ 
                width: '100%', 
                background: 'linear-gradient(to right, #2563eb, #3b82f6)', 
                color: 'white', 
                padding: '15px 0', 
                borderRadius: '14px', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                fontSize: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
              }}>
                DOWNLOAD NOW 📥
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
