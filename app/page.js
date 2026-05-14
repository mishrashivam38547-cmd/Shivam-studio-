"use client";
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

// Aapka purana config jo image 1000144739.jpg mein tha
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function Home() {
  const [data, setData] = useState({ videos: {}, apks: {}, photos: {} });

  useEffect(() => {
    onValue(ref(db, '/'), (snapshot) => {
      const val = snapshot.val();
      if (val) setData(val);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050a18] text-white p-5">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold tracking-widest text-blue-500">SHIVAM STUDIO</h1>
        <p className="text-gray-400 mt-2">Gaming & Technical Hub</p>
      </header>

      {/* --- PHOTO GALLERY SECTION --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-l-4 border-blue-500 pl-3">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.photos ? Object.values(data.photos).map((p, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
              <img src={p.url} alt="Gallery" className="w-full h-48 object-cover hover:scale-105 transition-transform" />
            </div>
          )) : <p className="text-gray-600">No photos yet.</p>}
        </div>
      </section>

      {/* --- VIDEOS & APKs SECTION --- */}
      {/* (Wahi purana layout jo aapne pehle banaya tha) */}

      <footer className="mt-20 text-center opacity-40">
        <button onClick={() => {
          const pass = prompt("Admin Password:");
          if(pass === "SHIVAM77") {
            const photoUrl = prompt("Enter Photo Direct Link (from ImgBB):");
            if(photoUrl) push(ref(db, 'photos'), { url: photoUrl });
          }
        }} className="text-xs italic underline">Admin: Add Photo Link</button>
      </footer>
    </div>
  );
}
