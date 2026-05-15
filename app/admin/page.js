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

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), { ...formData, createdAt: serverTimestamp() });
      alert("Success! App Added.");
      setFormData({ title: '', imageUrl: '', downloadUrl: '', version: '', size: '' });
    } catch (err) { alert("Error: " + err.message); }
  };

  const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #232438', backgroundColor: '#161726', color: 'white', marginBottom: '10px', width: '100%' };

  return (
    <div style={{ backgroundColor: '#0a0b14', minHeight: '100vh', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1>Studio Manager</h1>
      <form onSubmit={handleUpload} style={{ maxWidth: '350px', margin: '0 auto' }}>
        <input placeholder="App Name" style={inputStyle} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        <input placeholder="Image Link" style={inputStyle} value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
        <input placeholder="Download Link" style={inputStyle} value={formData.downloadUrl} onChange={e => setFormData({...formData, downloadUrl: e.target.value})} required />
        <input placeholder="Version" style={inputStyle} value={formData.version} onChange={e => setFormData({...formData, version: e.target.value})} />
        <input placeholder="Size" style={inputStyle} value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} />
        <button type="submit" style={{ padding: '15px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>UPLOAD</button>
      </form>
    </div>
  );
}
