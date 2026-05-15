"use client";
import { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

export default function Admin() {
  const [formData, setFormData] = useState({ title: '', imageUrl: '', downloadUrl: '', version: '', size: '' });
  const [inputPass, setInputPass] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const MY_PASSWORD = "Shivam8591@";

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPass === MY_PASSWORD) { setIsLogged(true); } 
    else { alert("Incorrect Key!"); }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), { ...formData, createdAt: serverTimestamp() });
      alert("Uploaded!");
      setFormData({ title: '', imageUrl: '', downloadUrl: '', version: '', size: '' });
    } catch (err) { alert("Error: " + err.message); }
  };

  if (!isLogged) {
    return (
      <div style={{ background: '#0a0b14', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <form onSubmit={handleLogin} style={{ background: '#161726', padding: '30px', borderRadius: '20px', border: '1px solid #232438', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Shivam Personal Dashboard</h2>
          <input 
            type="password" 
            placeholder="Enter Security Key" 
            style={{ padding: '12px', width: '100%', marginBottom: '15px', borderRadius: '8px', border: '1px solid #3b82f6', background: '#0a0b14', color: 'white' }} 
            onChange={(e) => setInputPass(e.target.value)} 
          />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>ACCESS</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0a0b14', minHeight: '100vh', color: 'white', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Studio Manager</h1>
      <form onSubmit={handleUpload} style={{ maxWidth: '350px', margin: '0 auto' }}>
        <input placeholder="App Name" style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', background: '#161726', color: 'white', border: '1px solid #232438' }} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        <input placeholder="Image Link" style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', background: '#161726', color: 'white', border: '1px solid #232438' }} value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
        <input placeholder="Download Link" style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', background: '#161726', color: 'white', border: '1px solid #232438' }} value={formData.downloadUrl} onChange={e => setFormData({...formData, downloadUrl: e.target.value})} required />
        <input placeholder="Version" style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', background: '#161726', color: 'white', border: '1px solid #232438' }} value={formData.version} onChange={e => setFormData({...formData, version: e.target.value})} />
        <input placeholder="Size" style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', background: '#161726', color: 'white', border: '1px solid #232438' }} value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} />
        <button type="submit" style={{ padding: '15px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', width: '100%', fontWeight: 'bold' }}>UPLOAD</button>
      </form>
    </div>
  );
    }
    
