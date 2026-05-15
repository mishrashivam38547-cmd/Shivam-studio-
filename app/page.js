"use client";
import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfS3MOG86wZuukQj-3TjX60b-F806kvQ0",
  authDomain: "shivam-anime.firebaseapp.com",
  projectId: "shivam-anime",
  storageBucket: "shivam-anime.firebasestorage.app",
  messagingSenderId: "858703658309",
  appId: "1:858703658309:web:1185863a9a77129dc5122d",
  measurementId: "G-MHY46LNG07"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
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
    <div style={{ backgroundColor: '#0a0b14', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <header style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #161726' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#3b82f6' }}>SHIVAM STUDIO</h1>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Premium APK & Anime Store</p>
      </header>

      {/* Apps Grid - मोबाइल पर 2 और PC पर ज्यादा ऐप्स दिखेंगे */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
        gap: '15px', 
        padding: '20px' 
      }}>
        {posts.map((post) => (
          <div key={post.id} style={{ 
            background: '#161726', 
            borderRadius: '15px', 
            padding: '12px', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: 'none' // यहाँ से सफ़ेद लाइन हट गई है
          }}>
            <img 
              src={post.imageUrl || 'https://via.placeholder.com/150'} 
              alt={post.title} 
              style={{ width: '100%', borderRadius: '10px', marginBottom: '10px', aspectRatio: '1/1', objectFit: 'cover' }} 
            />
            <h3 style={{ fontSize: '0.9rem', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {post.title}
            </h3>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '10px' }}>
              {post.version} • {post.size}
            </p>
            <a 
              href={post.downloadUrl} 
              target="_blank" 
              style={{ 
                background: '#3b82f6', 
                color: 'white', 
                textDecoration: 'none', 
                padding: '8px', 
                borderRadius: '8px', 
                fontSize: '0.8rem', 
                fontWeight: 'bold' 
              }}
            >
              DOWNLOAD
            </a>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '20px', fontSize: '0.7rem', color: '#475569' }}>
        © 2026 Shivam Studio. All rights reserved.
      </footer>
    </div>
  );
              }
                  
