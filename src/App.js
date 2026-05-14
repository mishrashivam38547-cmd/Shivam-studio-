import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Upload, Home, Globe, ShieldCheck, HardDrive } from 'lucide-react';

// IMPORTANT: Apne Firebase Console se ye details yahan bharein
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function ProfessionalApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');

  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      }, 
      (error) => alert("Error: " + error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setUploadProgress(0);
        });
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-28 font-sans">
      {/* Navigation Bar */}
      <nav className="p-5 border-b border-slate-800/50 flex justify-between items-center bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Globe size={18} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">SHIVAM-STUDIO</h1>
        </div>
        <ShieldCheck size={24} className="text-emerald-500" />
      </nav>

      <div className="max-w-md mx-auto p-6">
        {activeTab === 'home' ? (
          /* Home Tab */
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <HardDrive size={80} />
              </div>
              <h2 className="text-3xl font-black mb-2 text-white">Welcome</h2>
              <p className="text-slate-400 text-sm italic">System is live and secure.</p>
              <div className="mt-6 flex gap-2">
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] text-blue-400 font-bold uppercase tracking-widest">Active</span>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Verified</span>
              </div>
            </div>
          </div>
        ) : (
          /* Upload Tab */
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-bold mb-6 text-center">Cloud Storage</h3>
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-[2rem] cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all group">
              <div className="bg-blue-600/10 p-4 rounded-full group-hover:scale-110 transition-transform">
                <Upload className="text-blue-500" size={32} />
              </div>
              <span className="mt-4 text-sm font-semibold text-slate-300">Select APK or File</span>
              <p className="text-[10px] text-slate-500 mt-2">Maximum size: 100MB</p>
              <input type="file" className="hidden" onChange={(e) => uploadFile(e.target.files[0])} />
            </label>

            {uploadProgress > 0 && (
              <div className="mt-8 space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            {downloadURL && (
              <div className="mt-8 p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl animate-in slide-in-from-bottom-4">
                <p className="text-[10px] font-black text-emerald-400 mb-3 uppercase tracking-widest">Success! Link Generated:</p>
                <div className="flex gap-2">
                   <input readOnly value={downloadURL} className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-[10px] text-slate-400 focus:outline-none" />
                   <button onClick={() => {navigator.clipboard.writeText(downloadURL); alert("Link Copied!");}} className="bg-emerald-600 p-3 rounded-lg text-white hover:bg-emerald-500 transition-colors">
                     Copy
                   </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-0 right-0 px-10">
        <div className="max-w-[260px] mx-auto bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-full p-2.5 flex justify-around shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`p-4 rounded-full transition-all duration-300 ${activeTab === 'home' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Home size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('upload')} 
            className={`p-4 rounded-full transition-all duration-300 ${activeTab === 'upload' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Upload size={24} />
          </button>
        </div>
      </div>
    </div>
  );
         }
         
