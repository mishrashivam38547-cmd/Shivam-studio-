"use client";
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push } from "firebase/database";

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function Home() {
  const [data, setData] = useState({ videos: {}, apks: {}, photos: {} });

  // Fetch Data from Firebase
  useEffect(() => {
    const dataRef = ref(db, '/');
    onValue(dataRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setData(val);
    });
  }, []);

  // Admin Control Function
  const openAdmin = () => {
    const pass = prompt("Admin Password:");
    if (pass === "SHIVAM77") {
      const action = prompt("Kya add karna hai? (Type: photo, apk, or video)").toLowerCase();
      
      if (action === 'photo') {
        const url = prompt("Photo ka Direct Link (ImgBB/PostImages):");
        if (url) push(ref(db, 'photos'), { url });
      } 
      else if (action === 'apk') {
        const name = prompt("App ka naam:");
        const link = prompt("APK Download Link (MediaFire/Drive):");
        if (name && link) push(ref(db, 'apks'), { name, link });
      }
      else if (action === 'video') {
        const title = prompt("Video Title:");
        const url = prompt("Video URL:");
        if (title && url) push(ref(db, 'videos'), { title, url });
      }
    } else {
      alert("Galat Password!");
    }
  };

  return (
    <div className="min-h-screen bg-[#050a18] text-white p-6 font-sans">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter text-blue-500">SHIVAM STUDIO</h1>
        <div className="h-1 w-20 bg-blue-500 mx-auto mt-2 rounded-full"></div>
      </header>

      {/* Photo Gallery Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center border-l-4 border-blue-500 pl-3">
          📸 Photo Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data.photos ? Object.values(data.photos).map((p, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-800 bg-gray-900">
              <img src={p.url} className="w-full h-full object-cover hover:scale-110 transition duration-300" alt="Studio" />
            </div>
          )) : <p className="text-gray-600 text-sm italic">Abhi koi photo nahi hai...</p>}
        </div>
      </section>

      {/* APK Downloads Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center border-l-4 border-green-500 pl-3">
          📲 Technical Downloads (APKs)
        </h2>
        <div className="grid gap-3">
          {data.apks ? Object.values(data.apks).map((a, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-900 p-4 rounded-xl border border-gray-800 shadow-sm">
              <span className="font-medium">{a.name}</span>
              <a href={a.link} target="_blank" className="bg-green-600 px-5 py-1.5 rounded-full text-xs font-bold hover:bg-green-500 transition">
                DOWNLOAD
              </a>
            </div>
          )) : <p className="text-gray-600 text-sm italic">Koi APK link available nahi hai.</p>}
        </div>
      </section>

      {/* Videos Section */}
      <section className="mb-20">
        <h2 className="text-xl font-bold mb-4 flex items-center border-l-4 border-red-500 pl-3">
          🎥 Latest Videos
        </h2>
        <div className="grid gap-3">
          {data.videos ? Object.values(data.videos).map((v, i) => (
            <div key={i} className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col">
              <span className="text-sm font-semibold mb-2">{v.title}</span>
              <a href={v.url} className="text-blue-400 text-xs hover:underline">Watch on YouTube →</a>
            </div>
          )) : <p className="text-gray-600 text-sm italic">Koi video nahi mila.</p>}
        </div>
      </section>

      {/* Admin Panel Button */}
      <footer className="text-center py-10">
        <button 
          onClick={openAdmin}
          className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-blue-500 transition border border-gray-800 px-4 py-1 rounded-full"
        >
          Open Studio Manager
        </button>
      </footer>
    </div>
  );
}
