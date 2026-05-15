"use client";
import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

// 1. Aapki Firebase Config (Fixed & Direct)
const firebaseConfig = {
  apiKey: "AIzaSyCulND3XoR7XhJIdZe6SRI8_-D3Ikj7w0w",
  authDomain: "studio-shivam.firebaseapp.com",
  projectId: "studio-shivam",
  storageBucket: "studio-shivam.firebasestorage.app",
  messagingSenderId: "9621435697",
  appId: "1:9621435697:web:e690304ef64667f0b7ac10"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      console.error("Firebase Error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#020617', 
      minHeight: '100vh', 
      color: '#f8fafc', 
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      margin: 0,
      padding: '0 0 50px 0'
    }}>
      
      {/* --- PROFESSIONAL NAVBAR --- */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 5%', 
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid #1e293b'
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#3b82f6' }}>SHIVAM STUDIO</h1>
        <a href="/admin" style={{ textDecoration: 'none' }}>
          <button style={{ 
            backgroundColor: '#ffffff', 
            color: '#000', 
            padding: '8px 16px', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '13px'
          }}>MANAGER</button>
        </a>
      </nav>

      {/* --- HERO SECTION --- */}
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Premium Apps & Games</h2>
        <p style={{ color: '#94a3b8', fontSize: '15px' }}>Download the latest professional APKs for free.</p>
      </div>

      {/* --- MAIN APP LIST --- */}
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px', padding: '0 20px' }}>
        {loading ? (
          <p>Loading Apps...</p>
        ) : posts.length === 0 ? (
          <p style={{ color: '#64748b' }}>No Apps available yet.</p>
        ) : posts.map((post) => (
          <div key={post.id} style={{ 
            backgroundColor: '#0f172a', 
            border: '1px solid #1e293b', 
            borderRadius: '28px', 
            width: '100%', 
            maxWidth: '400px', 
            padding: '20px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            
            {/* 1. LOGO SECTION */}
            <div style={{ position: 'relative', marginBottom: '15px' }}>
              <img 
                src={post.imageUrl || "https://via.placeholder.com/150"} 
                alt="Logo"
                style={{ 
                  width: '110px', 
                  height: '110px', 
                  borderRadius: '24px', 
                  objectFit: 'cover',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                  border: '2px solid #334155'
                }} 
              />
            </div>

            {/* 2. DETAILS SECTION */}
            <div style={{ textAlign: 'center', marginBottom: '20px', width: '100%' }}>
              <h3 style={{ fontSize: '22px', margin: '0 0 8px 0', fontWeight: 'bold', color: '#fff' }}>
                {post.title}
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#94a3b8', 
                margin: 0, 
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {post.description}
              </p>
            </div>

            {/* 3. DOWNLOAD BUTTON SECTION */}
            <a href={post.downloadUrl || post.link} style={{ 
              width: '100%', 
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', 
              color: 'white', 
              padding: '14px 0', 
              borderRadius: '16px', 
              textDecoration: 'none', 
              fontWeight: '800',
              fontSize: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
              transition: '0.3s'
            }}>
              DOWNLOAD APK 📥
            </a>
          </div>
        ))}
      </main>

      {/* --- FOOTER --- */}
      <footer style={{ textAlign: 'center', marginTop: '60px', padding: '20px', borderTop: '1px solid #1e293b' }}>
        <p style={{ fontSize: '12px', color: '#64748b' }}>© 2026 SHIVAM STUDIO. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
