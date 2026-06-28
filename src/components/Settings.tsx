import React, { useState } from 'react';
import { User, Shield, CreditCard, ChevronRight, Fingerprint, Lock, CheckCircle2, Save, Sparkles, LogOut } from 'lucide-react';
import { CardCorners } from './BackgroundGrid';
import { AppSettings } from '../types';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface SettingsProps {
  settings: AppSettings;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
}

export default function Settings({ settings, onUpdateSettings }: SettingsProps) {
  const [phone, setPhone] = useState(settings.phone);
  const [upiId, setUpiId] = useState(settings.upiId);
  const [isSaved, setIsSaved] = useState(false);
  const user = auth.currentUser;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({ phone, upiId });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleToggleBiometrics = () => {
    onUpdateSettings({ biometricLock: !settings.biometricLock });
  };

  const handleTogglePro = () => {
    onUpdateSettings({ isPro: !settings.isPro });
  };
  
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10 px-5 pt-2">
      
      {/* Settings Title */}
      <div className="mt-4 mb-6">
        <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.2em] font-semibold">
          SYSTEM_CONFIG
        </span>
        <h2 className="font-sans font-black text-3xl text-black tracking-tight leading-none mt-1">
          Settings
        </h2>
      </div>

      {/* Section 1: Account Intel */}
      <div className="mb-6">
        <h3 className="font-mono text-[10px] text-black/50 font-bold uppercase tracking-widest mb-3">
          01 // ACCOUNT_INTEL
        </h3>

        <div className="glass-card rounded-2xl p-5 relative mb-4">
          <CardCorners color="border-black/10" />

          <div className="flex flex-col items-center mb-6">
             <div className="w-16 h-16 rounded-full bg-black/5 overflow-hidden border border-black/10 mb-3 shadow-sm">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/40">
                    <User className="w-6 h-6" />
                  </div>
                )}
             </div>
             <h3 className="font-sans font-bold text-lg text-black tracking-tight leading-none">
                {user?.displayName || "Anonymous User"}
             </h3>
             <p className="font-mono text-[10px] text-black/50 mt-1">
                {user?.email || "No Email linked"}
             </p>
          </div>

          {/* Edit Profile expands/shows forms directly */}
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-black/[0.04]">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-sans font-bold text-sm text-black">
                  Edit Profile
                </h4>
                <p className="font-mono text-[8.5px] text-black/40 uppercase tracking-wider">
                  PHONE • UPI ID • AVATAR
                </p>
              </div>
            </div>

            {/* Phone Entry */}
            <div>
              <label className="font-mono text-[9px] text-black/50 uppercase block mb-1 font-bold">
                Phone Number
              </label>
              <input 
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/5 border border-black/10 rounded-lg py-2 px-3 text-xs text-black font-mono focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
              />
            </div>

            {/* UPI ID Entry */}
            <div>
              <label className="font-mono text-[9px] text-black/50 uppercase block mb-1 font-bold">
                UPI Wallet ID
              </label>
              <input 
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-black/5 border border-black/10 rounded-lg py-2 px-3 text-xs text-black font-mono focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
              />
            </div>

            {/* Save Button */}
            <button 
              type="submit"
              className="w-full py-2 bg-black hover:bg-black/90 active:scale-95 transition-all rounded-lg text-white font-sans font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Saved Successfully
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save Profile Details
                </>
              )}
            </button>
          </form>
        </div>

        {/* Subscription Tier Box */}
        <div 
          onClick={handleTogglePro}
          className="glass-card rounded-2xl p-5 relative cursor-pointer hover:bg-white/60 transition-colors flex items-center justify-between"
        >
          <CardCorners color="border-brand-orange/10" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-orange/5 text-brand-orange flex items-center justify-center">
              <Sparkles className="w-5 h-5 fill-brand-orange/10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-sans font-bold text-sm text-black">
                  Subscription
                </h4>
                {settings.isPro ? (
                  <span className="font-mono text-[8px] font-bold text-white bg-brand-orange px-1.5 py-0.2 rounded">
                    PRO
                  </span>
                ) : (
                  <span className="font-mono text-[8px] font-bold text-black/50 bg-black/5 px-1.5 py-0.2 rounded">
                    BASIC
                  </span>
                )}
              </div>
              <p className="font-mono text-[9px] text-black/40 mt-0.5 uppercase tracking-wider">
                {settings.isPro ? 'ACTIVE UNTIL 2026-12-31' : 'TAP TO UPGRADE'}
              </p>
            </div>
          </div>

          <span className="font-mono text-[10px] text-brand-orange font-bold uppercase tracking-wider flex items-center gap-0.5 hover:opacity-80">
            MANAGE <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Section 2: Security Protocol */}
      <div className="mb-6">
        <h3 className="font-mono text-[10px] text-black/50 font-bold uppercase tracking-widest mb-3">
          02 // SECURITY_PROTOCOL
        </h3>

        {/* Biometric Lock Toggle */}
        <div 
          onClick={handleToggleBiometrics}
          className="glass-card rounded-2xl p-5 relative cursor-pointer hover:bg-white/60 transition-colors flex items-center justify-between"
        >
          <CardCorners color="border-black/10" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-black">
                Biometric Lock
              </h4>
              <p className="font-mono text-[9px] text-black/40 mt-0.5 uppercase tracking-wider">
                FACE_ID / TOUCH_ID
              </p>
            </div>
          </div>

          {/* Toggle Switch design */}
          <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300
            ${settings.biometricLock ? 'bg-brand-orange' : 'bg-black/10'}
          `}>
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300
              ${settings.biometricLock ? 'translate-x-5' : 'translate-x-0'}
            `} />
          </div>
        </div>
      </div>

      {/* Settings technical specification lines */}
      <div className="text-center font-mono text-[9px] text-black/25 uppercase tracking-widest mt-8 mb-4">
        <p>SECURE_SHELL // VERSION 1.1.4</p>
        <p className="mt-0.5">LOCAL_STORAGE ACTIVE & SYNCED</p>
      </div>

      {/* Sign Out Action */}
      <button 
        onClick={handleSignOut}
        className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-sans font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 border border-red-100 active:scale-95 transition-all mb-8"
      >
        <LogOut className="w-4 h-4" /> DISCONNECT PROTOCOL
      </button>

    </div>
  );
}
