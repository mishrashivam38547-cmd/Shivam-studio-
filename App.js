import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Upload, Home, Globe, ShieldCheck, HardDrive } from 'lucide-react';

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
      (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100), 
      (error) => alert("Error: " + error.message),
      () => getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setUploadProgress(0);
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-28 font-sans">
      <nav className="p-5 border-b border-slate-800/50 flex justify-between items-center bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Globe size={18} /></div>
          <h1 className="text-xl font-bold">PRO-DRIVE</h1>
        </div>
        <ShieldCheck size={24} className="text-emerald-500" />
      </nav>

      <div className="max-w-md mx-auto p-6">
        {activeTab === 'home' ? (
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-[2rem] shadow-2xl">
            <h2 className="text-2xl font-black mb-2 text-white">Welcome Back</h2>
            <p className="text-slate-400 text-sm italic">Shivam Studio is ready.</p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
            <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-slate-700 rounded-[2rem] cursor-pointer hover:border-blue-500 transition-all">
              <Upload className="text-blue-500 mb-2" size={32} />
              <span className="text-sm font-semibold">Upload APK or File</span>
              <input type="file" className="hidden" onChange={(e) => uploadFile(e.target.files[0])} />
            </label>
            {uploadProgress > 0 && (
              <div className="w-full bg-slate-800 rounded-full h-2 mt-6">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
            {downloadURL && (
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <p className="text-xs font-bold text-emerald-400 mb-2 uppercase">File Link:</p>
                <input readOnly value={downloadURL} className="w-full bg-slate-950 rounded-lg p-2 text-[10px] text-slate-300" />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-8 left-0 right-0 px-10">
        <div className="max-w-[240px] mx-auto bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around shadow-2xl">
          <button onClick={() => setActiveTab('home')} className={`p-4 rounded-full ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}><Home size={22} /></button>
          <button onClick={() => setActiveTab('upload')} className={`p-4 rounded-full ${activeTab === 'upload' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}><Upload size={22} /></button>
        </div>
      </div>
    </div>
  );
         }
          
