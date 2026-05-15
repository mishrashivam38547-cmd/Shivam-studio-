"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

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
    <div style={{ backgroundColor: '#050a18', minHeight: '100vh', width: '100vw', margin: 0, padding: 0, color: 'white', fontFamily: 'sans-serif' }}>
      {/* 1. HEADER SECTION */}
      <header style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1 style={{ fontSize: '28px', margin: 0, fontWeight: 'bold' }}>SHIVAM STUDIO</h1>
        <a href="/admin" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            STUDIO MANAGER
          </button>
        </a>
      </header>

      {/* 2. MAIN CONTENT (APK CARDS) */}
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {posts.map((post) => (
            <div key={post.id} style={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #1e293b', 
              borderRadius: '24px', 
              padding: '24px', 
              marginBottom: '30px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}>
              
              {/* Image 1. */}
              <img 
                src={post.imageUrl || post.logo || "https://via.placeholder.com/150"} 
                alt="App Logo"
                style={{ width: '120px', height: '120px', borderRadius: '22px', marginBottom: '15px', objectFit: 'cover', border: '3px solid #334155' }} 
              />

              {/* Title & Description 2. */}
              <h2 style={{ fontSize: '22px', margin: '10px 0', color: '#f8fafc' }}>{post.title}</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '20px', lineHeight: '1.5' }}>
                {post.description}
              </p>

              {/* Download Button 3. */}
              <a href={post.downloadUrl || post.link} style={{ 
                width: '100%', 
                background: 'linear-gradient(to right, #2563eb, #3b82f6)', 
                color: 'white', 
                padding: '14px 0', 
                borderRadius: '12px', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                fontSize: '16px',
                textAlign: 'center'
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
            
