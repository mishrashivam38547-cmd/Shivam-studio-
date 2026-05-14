'use client';

import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function ShivamStudio() {
  const [data, setData] = useState({ videos: [], apks: [] });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const dataRef = ref(db, 'content/');
    onValue(dataRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setData(val);
    });
  }, []);

  const handleUpload = (type) => {
    const title = prompt("Enter Title:");
    const link = prompt("Enter Link:");
    if (title && link) {
      const newData = { ...data };
      if (!newData[type]) newData[type] = [];
      newData[type].push({ title, link });
      set(ref(db, 'content/'), newData);
    }
  };

  return (
    <div className="min-h-screen bg-[#050a18] text-white p-6 font-sans">
      <nav className="flex justify-between items-center mb-10 bg-[#0a1227] p-4 rounded-xl border border-white/10">
        <h1 className="text-xl font-bold tracking-tighter uppercase">SHIVAM-STUDIO</h1>
        <button onClick={() => {
          const p = prompt("Admin Password?");
          if(p === "SHIVAM77") setIsAdmin(true);
        }} className="text-xs opacity-50">Admin</button>
      </nav>

      {isAdmin && (
        <div className="bg-blue-900/20 p-4 rounded-lg mb-8 border border-blue-500">
          <h2 className="font-bold mb-2 text-blue-400">Admin Panel</h2>
          <button onClick={() => handleUpload('videos')} className="bg-blue-600 px-4 py-2 rounded mr-2 text-sm font-bold">Add Video</button>
          <button onClick={() => handleUpload('apks')} className="bg-green-600 px-4 py-2 rounded text-sm font-bold">Add APK</button>
        </div>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-3">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.videos?.map((v, i) => (
            <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-blue-500/50 transition">
              <iframe className="w-full aspect-video rounded-lg mb-3" src={v.link.includes('youtube.com') ? v.link.replace("watch?v=", "embed/") : v.link} frameBorder="0" allowFullScreen></iframe>
              <p className="font-medium">{v.title}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6 border-l-4 border-green-500 pl-3">Downloads</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.apks?.map((a, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center hover:scale-105 transition">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center font-black">APK</div>
              <h3 className="font-bold mb-4">{a.title}</h3>
              <a href={a.link} target="_blank" className="block w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-sm font-bold">DOWNLOAD</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

            
