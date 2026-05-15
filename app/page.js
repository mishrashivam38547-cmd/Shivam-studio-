"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

// 1. Firebase Configuration (Aapki keys automatic .env se lega)
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
    <main style={{ 
      backgroundColor: '#050a18', 
      minHeight: '100vh', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px', 
      paddingTop: '120px',
      fontFamily: 'sans-serif' 
    }}>
      
      {/* HEADER: Title aur Studio Manager Button */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px' 
      }}>
        <h1 style={{ fontSize: '26px', margin: '0', fontWeight: 'bold' }}>SHIVAM STUDIO</h1>
        <a href="/admin" style={{ textDecoration: 'none' }}>
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: 'white', 
            color: 'black', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            STUDIO MANAGER
          </button>
        </a>
      </div>

      {/* APK LIST: Cards Section */}
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ 
            backgroundColor: 'rgba(255,255,255,0.05)', 
            border: '1px solid #333', 
            borderRadius: '25px', 
            padding: '25px', 
            marginBottom: '25px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            
            {/* 1. PHOTO/LOGO */}
            <img 
              src={post.imageUrl || "https://via.placeholder.com/150"} 
              alt="Logo"
              style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '20px', 
                marginBottom: '15px', 
                objectFit: 'cover',
                border: '2px solid #444'
              }} 
            />

            {/* 2. NAME & DESCRIPTION */}
            <h2 style={{ fontSize: '22px', margin: '5px 0', color: '#fff' }}>{post.title}</h2>
            <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '20px', lineHeight: '1.4' }}>
              {post.description}
            </p>

            {/* 3. DOWNLOAD BUTTON */}
            <a href={post.downloadUrl || post.link} style={{ 
              width: '100%', 
              background: 'linear-gradient(135deg, #0070f3, #00a1ff)', 
              color: 'white', 
              padding: '14px 0', 
              borderRadius: '12px', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'block'
            }}>
              DOWNLOAD NOW 📥
            </a>
          </div>
        ))}
      </div>
    </main>
  );
                   }
