import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Flashlight, ArrowRight, Keyboard, Compass, RefreshCw } from 'lucide-react';
import Mascot from './Mascot';

interface ScannerProps {
  onEnterIdManually: () => void;
}

export default function Scanner({ onEnterIdManually }: ScannerProps) {
  const [torchOn, setTorchOn] = useState(false);
  const [scanStatus, setScanStatus] = useState<'scanning' | 'found' | 'error'>('scanning');
  const [timerText, setTimerText] = useState('04:22:11');

  // Update mock technical timestamp
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hrs = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      const secs = now.getSeconds().toString().padStart(2, '0');
      setTimerText(`${hrs}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateScanSuccess = () => {
    setScanStatus('found');
    setTimeout(() => {
      onEnterIdManually(); // Trigger transition to Dharpur Dhaba bill screen
    }, 1000);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10 px-5 pt-4">
      
      {/* Header / Mascot */}
      <div className="flex flex-col items-center mb-6 relative">
        <Mascot type="map" className="w-14 h-14 animate-pulse mb-3" />
        <h2 className="font-sans font-black text-xl text-black tracking-tight leading-none text-center">
          Geo-Location Scan
        </h2>
      </div>

      {/* Scanner Viewport Section */}
      <div className="relative aspect-square w-full max-w-sm mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 group mb-6">
        
        {/* Mock Live Camera View (Using beautiful cafe table image with a QR-phone mockup matching the screenshot) */}
        <img 
          src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400&auto=format&fit=crop&q=80" 
          alt="Camera viewport mockup"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-80 scale-105 group-hover:scale-100 transition-all duration-700" 
        />

        {/* Dark vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

        {/* Central Glowing Red Viewfinder Brackets */}
        <div className="absolute inset-8 border border-white/5 flex flex-col justify-between pointer-events-none z-20">
          
          {/* Custom L-Brackets in RED */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-orange" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-orange" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-orange" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-orange" />

          {/* Dynamic Laser Scanning Line */}
          <div className="w-full h-[1.5px] bg-brand-orange/80 shadow-[0_0_12px_rgba(188,0,10,0.8)] absolute top-1/2 left-0 animate-bounce" style={{ animationDuration: '3s' }} />

          {/* Mock QR Code graphic in center to simulate physical scanner target */}
          <div 
            onClick={handleSimulateScanSuccess}
            className="absolute inset-0 m-auto w-32 h-32 rounded-lg bg-black/40 border border-white/20 backdrop-blur-sm cursor-pointer hover:bg-black/50 active:scale-95 transition-all flex flex-col items-center justify-center p-3"
          >
            {/* Quick simulated interactive QR graphic */}
            <div className="grid grid-cols-4 gap-1 w-full aspect-square opacity-70">
              <div className="bg-white rounded-sm border-2 border-black" />
              <div className="bg-white rounded-sm" />
              <div className="bg-white rounded-sm" />
              <div className="bg-white rounded-sm border-2 border-black" />
              <div className="bg-white rounded-sm" />
              <div className="bg-white rounded-sm bg-brand-orange" />
              <div className="bg-white rounded-sm bg-brand-orange" />
              <div className="bg-white rounded-sm" />
              <div className="bg-white rounded-sm" />
              <div className="bg-white rounded-sm bg-brand-orange" />
              <div className="bg-white rounded-sm" />
              <div className="bg-white rounded-sm" />
              <div className="bg-white rounded-sm border-2 border-black" />
              <div className="bg-white rounded-sm" />
              <div className="bg-white rounded-sm" />
              <div className="bg-white rounded-sm border-2 border-black" />
            </div>
            <span className="font-mono text-[7px] text-white/50 tracking-widest uppercase mt-2 select-none animate-pulse">
              CLICK TO SIMULATE SCAN
            </span>
          </div>
        </div>

        {/* Viewport Meta Details labels matching screenshot */}
        <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center z-30 font-mono text-[10px] text-white select-none">
          <span className="text-white/60">ID: PX-SCAN-2024</span>
          <span className="text-brand-orange bg-brand-orange/20 px-1.5 py-0.5 rounded font-bold tracking-widest">
            [ {timerText} ]
          </span>
        </div>
      </div>

      {/* Pulsing Status Text Action bar */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-brand-orange/5 border border-brand-orange/15 px-5 py-2.5 rounded-full text-brand-orange font-mono text-[11px] font-bold tracking-widest uppercase mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
          SCAN RESTAURANT QR
        </div>
        <p className="font-sans text-sm text-black/50">
          {scanStatus === 'scanning' ? 'Scanning for UPI ID...' : 'Connecting to UPI gateway...'}
        </p>
      </div>

      {/* Dual Quick Action Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Gallery Selection Card */}
        <button 
          onClick={handleSimulateScanSuccess}
          className="glass-card rounded-xl py-5 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/60 active:scale-[0.98] transition-all text-center"
        >
          <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black mb-2.5">
            <ImageIcon className="w-5 h-5 text-black/60" />
          </div>
          <span className="font-sans font-bold text-xs text-black uppercase tracking-wider block">
            GALLERY
          </span>
          <span className="font-mono text-[8px] text-black/40 uppercase mt-0.5">
            IMPORT IMAGE
          </span>
        </button>

        {/* Flashlight/Torch toggle Card */}
        <button 
          onClick={() => setTorchOn(!torchOn)}
          className={`glass-card rounded-xl py-5 px-4 flex flex-col items-center justify-center cursor-pointer active:scale-[0.98] transition-all text-center
            ${torchOn ? 'bg-amber-500/10 border-amber-500/25' : 'hover:bg-white/60'}
          `}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 transition-colors
            ${torchOn ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-black/5 text-black'}
          `}>
            <Flashlight className="w-5 h-5" />
          </div>
          <span className={`font-sans font-bold text-xs uppercase tracking-wider block
            ${torchOn ? 'text-amber-600' : 'text-black'}
          `}>
            TORCH
          </span>
          <span className="font-mono text-[8px] text-black/40 uppercase mt-0.5">
            {torchOn ? 'ACTIVE' : 'TOGGLE ON'}
          </span>
        </button>
      </div>

      {/* Manual Override Action Button */}
      <button
        onClick={onEnterIdManually}
        className="w-full py-4 bg-brand-orange hover:bg-brand-orange/95 active:scale-[0.99] transition-all rounded-xl text-white font-sans font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
      >
        <Keyboard className="w-4 h-4" /> Enter ID Manually <ArrowRight className="w-4 h-4" />
      </button>

      {/* Tech Specifications Coordinates */}
      <div className="text-center mt-6">
        <span className="font-mono text-[9px] text-black/30 tracking-widest uppercase">
          SECURE_SCAN_PROTO // ENC: AES-256
        </span>
      </div>
    </div>
  );
}
