import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Heart, Utensils, Shield, ShieldAlert, Lock } from 'lucide-react';
import { CardCorners } from './BackgroundGrid';
import { Pact } from '../types';
import Mascot from './Mascot';

interface CreatePactProps {
  onBack: () => void;
  onLockPact: (pact: Partial<Pact>) => void;
}

export default function CreatePact({ onBack, onLockPact }: CreatePactProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-06-27');
  const [time, setTime] = useState('07:00');
  const [stakeAmount, setStakeAmount] = useState(50);
  const [consequenceType, setConsequenceType] = useState<'anti-charity' | 'buy-dinner'>('anti-charity');
  const [isSolo, setIsSolo] = useState(true);
  const [invitees, setInvitees] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lng: -74.0060 }); // NYC default
  const [isEscrowing, setIsEscrowing] = useState(false);

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates({
            lat: Number(pos.coords.latitude.toFixed(4)),
            lng: Number(pos.coords.longitude.toFixed(4))
          });
          setIsLocating(false);
        },
        async () => {
          // Fallback to IP-based location if permission denied
          try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            if (data && data.latitude && data.longitude) {
              setCoordinates({
                lat: Number(data.latitude.toFixed(4)),
                lng: Number(data.longitude.toFixed(4))
              });
            } else {
              alert('Failed to get location. Using default.');
            }
          } catch (e) {
            alert('Failed to get location. Using default.');
          }
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleLock = () => {
    if (!title.trim()) {
      alert('Please enter a pact title first.');
      return;
    }
    
    setIsEscrowing(true);
    setTimeout(() => {
      setIsEscrowing(false);
      // Package details to construct a new locked pact
      onLockPact({
        title: title,
        isSolo: isSolo,
        frequency: 'Daily',
        endsInDays: 7,
        successRate: 100,
        completionRate: 0,
        stakeAmount: stakeAmount,
        consequenceType: consequenceType,
        status: 'locked',
        date: date,
        time: time,
        locationName: 'Designated Target Radius',
        locationCoords: coordinates,
        membersCount: isSolo ? 1 : invitees.split(',').length + 1
      });
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10 px-5 pt-2">
      
      {/* Title block */}
      <div className="text-center mt-4 mb-6 relative">
        <div className="absolute top-0 right-4 animate-bounce">
          <Mascot type="write" className="w-12 h-12" />
        </div>
        <h2 className="font-sans font-black text-2xl text-black tracking-tight leading-none">
          Draft New Pact
        </h2>
        <span className="font-mono text-[9px] text-black/40 uppercase tracking-[0.2em] font-semibold mt-1.5 block">
          INITIALIZATION SEQUENCE
        </span>
      </div>

      {/* Title, Date & Time Entry Form card */}
      <div className="glass-card rounded-2xl p-5 relative mb-5">
        <CardCorners color="border-black/10" />

        <div className="space-y-4">
          {/* Title input */}
          <div>
            <label className="font-mono text-[10px] text-black/50 uppercase tracking-widest block mb-1.5 font-bold">
              Pact Title
            </label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning Run 5K"
              className="w-full bg-black/5 border border-black/10 rounded-lg py-3 px-4 text-sm text-black font-sans font-medium focus:outline-none focus:border-brand-orange focus:bg-white transition-all placeholder:text-black/30"
            />
          </div>

          {/* Date & Time dual grid inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[10px] text-black/50 uppercase tracking-widest block mb-1.5 font-bold">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-black/5 border border-black/10 rounded-lg py-2.5 pl-10 pr-3 text-xs text-black font-mono focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-black/50 uppercase tracking-widest block mb-1.5 font-bold">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <input 
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-black/5 border border-black/10 rounded-lg py-2.5 pl-10 pr-3 text-xs text-black font-mono focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Geolocation Validation card */}
      <div className="glass-card rounded-2xl p-5 relative mb-5">
        <CardCorners color="border-black/10" />

        <label className="font-mono text-[10px] text-black/50 uppercase tracking-widest block mb-3 font-bold">
          Location Validation
        </label>

        {/* Technical graphic drawing map placeholder */}
        <div 
          onClick={handleGetCurrentLocation}
          className="aspect-video w-full rounded-xl bg-black border border-white/10 overflow-hidden relative cursor-pointer group mb-3 flex items-center justify-center"
        >
          {/* Cyberpunk schematic background drawing representing coordinate scanner */}
          <div className="absolute inset-0 blueprint-grid opacity-30" />
          
          {/* Circular coordinate radar */}
          <div className="w-24 h-24 rounded-full border border-brand-orange/20 flex items-center justify-center animate-pulse">
            <div className="w-16 h-16 rounded-full border border-brand-orange/40 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-brand-orange animate-bounce" />
            </div>
          </div>

          {/* Glowing laser tech specs lines */}
          <div className="absolute top-4 left-4 font-mono text-[8px] text-white/40">COORD_LOCK: SYSTEM_AUTOPILOT</div>
          <div className="absolute bottom-4 right-4 font-mono text-[8px] text-white/40">MAP_SYS_OK</div>

          {isLocating && (
            <div className="absolute inset-0 bg-black/85 flex items-center justify-center text-white gap-2 font-mono text-xs">
              <Shield className="w-4 h-4 animate-spin text-brand-orange" /> LOCKING GPS...
            </div>
          )}
        </div>

        {/* Current locked coordinate label readout */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-black/60 justify-center">
          <MapPin className="w-3.5 h-3.5 text-brand-orange" />
          <span>Lat: <span className="font-bold text-black">{coordinates.lat}° N</span>, Lng: <span className="font-bold text-black">{Math.abs(coordinates.lng)}° W</span></span>
        </div>
      </div>

      {/* Stake amount slider card */}
      <div className="glass-card rounded-2xl p-5 relative mb-5">
        <CardCorners color="border-black/10" />

        <div className="flex justify-between items-start mb-2">
          <span className="font-mono text-[10px] text-black/50 uppercase tracking-widest font-bold">
            Stake Amount
          </span>
          {/* Giant amount number */}
          <span className="font-sans font-black text-5xl text-brand-orange tracking-tighter block">
            ₹{stakeAmount}
          </span>
        </div>

        {/* Range Slider */}
        <input 
          type="range"
          min="10"
          max="500"
          step="10"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(Number(e.target.value))}
          className="w-full accent-brand-orange cursor-pointer h-1 bg-black/10 rounded-lg appearance-none mt-4"
        />

        <div className="flex justify-between font-mono text-[9px] text-black/40 mt-2">
          <span>₹10</span>
          <span>₹500</span>
        </div>
      </div>

      {/* Consequence Protocol selection row */}
      <div className="mb-8">
        <label className="font-mono text-[10px] text-black/50 uppercase tracking-widest block mb-3 font-bold">
          Consequence Protocol
        </label>

        <div className="grid grid-cols-2 gap-4">
          {/* Protocol 1: Anti-Charity */}
          <div
            onClick={() => setConsequenceType('anti-charity')}
            className={`glass-card rounded-xl p-4 cursor-pointer relative border transition-all duration-300 flex flex-col justify-between
              ${consequenceType === 'anti-charity' 
                ? 'border-brand-orange bg-brand-orange/[0.02] border-l-4 border-l-brand-orange' 
                : 'hover:bg-white/60'
              }
            `}
          >
            {/* Corner dot check marker */}
            {consequenceType === 'anti-charity' && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-brand-orange" />
            )}
            
            <Heart className={`w-5 h-5 mb-2 ${consequenceType === 'anti-charity' ? 'text-brand-orange' : 'text-black/50'}`} />
            
            <div className="text-left">
              <h4 className="font-sans font-bold text-sm text-black">
                Anti-Charity
              </h4>
              <p className="font-sans text-[11px] text-black/40 mt-0.5 leading-snug">
                Donation to opposed cause on failure.
              </p>
            </div>
          </div>

          {/* Protocol 2: Buy Dinner */}
          <div
            onClick={() => setConsequenceType('buy-dinner')}
            className={`glass-card rounded-xl p-4 cursor-pointer relative border transition-all duration-300 flex flex-col justify-between
              ${consequenceType === 'buy-dinner' 
                ? 'border-brand-orange bg-brand-orange/[0.02] border-l-4 border-l-brand-orange' 
                : 'hover:bg-white/60'
              }
            `}
          >
            {consequenceType === 'buy-dinner' && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-brand-orange" />
            )}
            
            <Utensils className={`w-5 h-5 mb-2 ${consequenceType === 'buy-dinner' ? 'text-brand-orange' : 'text-black/50'}`} />
            
            <div className="text-left">
              <h4 className="font-sans font-bold text-sm text-black">
                Buy Dinner
              </h4>
              <p className="font-sans text-[11px] text-black/40 mt-0.5 leading-snug">
                Funds restaurant UPI for partner check-in.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Group Invite Toggle */}
      <div className="glass-card rounded-2xl p-5 relative mb-8">
        <CardCorners color="border-black/10" />
        <div className="flex justify-between items-center mb-3">
          <label className="font-mono text-[10px] text-black/50 uppercase tracking-widest font-bold">
            Group Pact
          </label>
          <button 
            onClick={() => setIsSolo(!isSolo)}
            className={`w-10 h-5 rounded-full relative transition-colors ${!isSolo ? 'bg-brand-orange' : 'bg-black/10'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${!isSolo ? 'left-5.5' : 'left-0.5'}`} />
          </button>
        </div>
        {!isSolo && (
          <div className="animate-fade-in">
            <input 
              type="text"
              value={invitees}
              onChange={(e) => setInvitees(e.target.value)}
              placeholder="Friend's @username or email (comma separated)"
              className="w-full bg-black/5 border border-black/10 rounded-lg py-2.5 px-3 text-xs text-black font-mono focus:outline-none focus:border-brand-orange focus:bg-white transition-all placeholder:text-black/30"
            />
          </div>
        )}
      </div>

      {/* Lock Pact Action Button */}
      <button
        onClick={handleLock}
        className="w-full py-4 bg-brand-orange hover:bg-brand-orange/95 active:scale-[0.99] transition-all rounded-xl text-white font-sans font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
      >
        <Lock className="w-4 h-4 text-white/80" /> Lock Pact (Escrow ₹{stakeAmount})
      </button>

      {/* Technical Escrow Warning disclaimer */}
      <div className="mt-4 flex items-start gap-2 max-w-xs mx-auto text-center justify-center text-black/35 font-mono text-[8px] uppercase tracking-wider">
        <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 text-brand-orange/50 mt-0.5" />
        <span>SECURE_ESCROW ACTIVE: funds are automatically locked and verified upon commitment</span>
      </div>

      {isEscrowing && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="w-24 h-24 mb-6 rounded-full border-4 border-black/5 border-t-brand-orange animate-spin" />
          <h3 className="font-sans font-black text-2xl text-black tracking-tight mb-2">
            Escrowing Funds...
          </h3>
          <p className="font-mono text-sm text-black/50 uppercase tracking-widest font-bold">
            Processing ₹{stakeAmount}
          </p>
        </div>
      )}
    </div>
  );
}
