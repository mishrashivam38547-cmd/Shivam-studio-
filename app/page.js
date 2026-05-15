"use client";
import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

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
      <nav style={{ padding: '20px', textAlign: 'center', background: '#0f101a', borderBottom: '1px solid #1e1e2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '900' }}>SHIVAM<span style={{ color: '#3b82f6' }}>STUDIO</span></h1>
        <a href="/admin"><button style={{ background: 'white', color: 'black', border: 'none', padding: '5px 12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>MANAGER</button></a>
      </nav>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', padding: '15px', maxWidth: '1000px', margin: '0 auto' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ backgroundColor: '#161726', borderRadius: '25px', padding: '15px 10px', textAlign: 'center', border: '1px solid #232438' }}>
            <img src={post.imageUrl || "https://via.placeholder.com/150"} style={{ width: '80px', height: '80px', borderRadius: '18px', marginBottom: '10px', objectFit: 'cover' }} />
            <h2 style={{ fontSize: '15px', margin: '8px 0', fontWeight: 'bold' }}>{post.title}</h2>
            <p style={{ fontSize: '11px', color: '#94a3b8' }}>{post.version || "v1.0"} • {post.size || "MB"}</p>
            <a href={post.downloadUrl} style={{ background: 'linear-gradient(45deg, #833ab4, #fd1d1d)', width: '45px', height: '45px', borderRadius: '12px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', textDecoration: 'none' }}>
              <span style={{ fontSize: '20px' }}>📥</span>
            </a>
          </div>
        ))}
      </main>
    </div>
  );
  }
