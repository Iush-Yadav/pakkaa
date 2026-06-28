import React, { useState, useEffect } from 'react';
import { X, MapPin, CheckCircle2, AlertCircle, Clock, RefreshCw, Compass, ShieldCheck } from 'lucide-react';
import { Pact, Member } from '../types';

interface LivePactProps {
  pact: Pact;
  onClose: () => void;
  onUserCheckedIn: () => void;
}

export default function LivePact({ pact, onClose, onUserCheckedIn }: LivePactProps) {
  // Mock members if not provided
  const [members, setMembers] = useState<Member[]>([
    { name: 'Sarah K.', status: 'checked_in', checkedInTime: '5m ago', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { name: 'David L.', status: 'checked_in', checkedInTime: '2m ago', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { name: 'Alex M. (You)', status: 'action_required', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
    { name: 'Elena R.', status: 'pending', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80' }
  ]);

  // Timer logic - starting at 4 minutes 12 seconds
  const [timeLeft, setTimeLeft] = useState(252); // 4 * 60 + 12
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [gpsCoordinates, setGpsCoordinates] = useState({ lat: 40.785091, lng: -73.968285 }); // Near Central Park

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time (e.g. "04:12")
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCheckInNow = () => {
    if (isVerifying) return;
    
    setIsVerifying(true);
    setVerificationProgress(0);

    // Simulate real Geolocation API call
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsCoordinates({
            lat: Number(position.coords.latitude.toFixed(6)),
            lng: Number(position.coords.longitude.toFixed(6))
          });
        },
        () => {
          // Fallback to central park mock coordinates
        }
      );
    }

    // Step-by-step verification progress simulation
    const interval = setInterval(() => {
      setVerificationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Update user status to checked_in
            setMembers(prevMembers => 
              prevMembers.map(m => 
                m.name.includes('(You)') 
                  ? { ...m, status: 'checked_in', checkedInTime: 'Just now' } 
                  : m
              )
            );
            setIsVerifying(false);
            onUserCheckedIn(); // Propagate state up
          }, 600);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  const checkedInCount = members.filter(m => m.status === 'checked_in').length;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar pb-12 relative z-10">
      {/* Upper Navigation Back Row */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.04]">
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 active:scale-95 transition-all flex items-center justify-center text-black"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="font-mono text-[9px] text-black/40 uppercase tracking-[0.25em] font-semibold block">
            LIVE PACT
          </span>
          <span className="font-sans font-bold text-lg text-black tracking-tight block">
            {pact.title}
          </span>
        </div>
        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      {/* Main Radar Screen content */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-6 text-center">
        {/* Time Remaining Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-orange/5 text-brand-orange font-mono text-[10px] font-bold uppercase tracking-widest mb-2 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange block" />
          Time Remaining
        </div>

        {/* Big Digit Ticking Countdown Timer */}
        <h2 className="font-sans font-black text-6xl text-black tracking-tight mb-8 tabular-nums">
          {formatTime(timeLeft)}
        </h2>

        {/* Concentric Radar Check-in Area */}
        <div className="relative w-72 h-72 flex items-center justify-center mb-6">
          {/* Faint Concentric Circles */}
          <div className="absolute inset-0 rounded-full border border-black/5 animate-ping opacity-30" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-8 rounded-full border border-black/5" />
          <div className="absolute inset-16 rounded-full border border-black/[0.03]" />

          {/* Large Interactive Core Button with custom state */}
          <button
            onClick={handleCheckInNow}
            disabled={members.some(m => m.name.includes('(You)') && m.status === 'checked_in') || isVerifying}
            className={`w-48 h-48 rounded-full flex flex-col items-center justify-center relative cursor-pointer active:scale-95 transition-all duration-300 z-20 shadow-xl
              ${members.some(m => m.name.includes('(You)') && m.status === 'checked_in')
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-brand-orange text-white hover:bg-brand-orange/95 shadow-brand-orange/30'
              }
            `}
          >
            {isVerifying ? (
              <div className="flex flex-col items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold">
                  {verificationProgress}%
                </span>
                <span className="font-sans text-[11px] text-white/80 mt-1">GPS LOCKING</span>
              </div>
            ) : members.some(m => m.name.includes('(You)') && m.status === 'checked_in') ? (
              <div className="flex flex-col items-center justify-center">
                <ShieldCheck className="w-10 h-10 mb-2 text-white" />
                <span className="font-sans font-bold text-sm tracking-tight">Verified</span>
                <span className="font-mono text-[9px] text-white/80 mt-1">SAFE ESCROW</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <MapPin className="w-8 h-8 mb-2 animate-bounce text-white" />
                <span className="font-sans font-bold text-lg tracking-tight">Check In Now</span>
                <span className="font-mono text-[9px] text-white/80 uppercase tracking-wider mt-1">
                  100m Required
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Coordinates readout banner */}
        <div className="bg-black/5 rounded-lg px-4 py-2 border border-black/[0.04] mb-8 max-w-sm flex items-center gap-2">
          <Compass className="w-4 h-4 text-black/50" />
          <span className="font-mono text-[10px] text-black/60 uppercase tracking-widest">
            {isVerifying ? 'CALIBRATING GPS...' : `LOCK: ${gpsCoordinates.lat}° N, ${Math.abs(gpsCoordinates.lng)}° W`}
          </span>
        </div>

        {/* Location Specific Requirements label */}
        <p className="font-mono text-[11px] text-black/50 uppercase tracking-[0.15em] leading-relaxed max-w-xs">
          MUST BE WITHIN 100M OF CENTRAL PARK
        </p>
      </div>

      {/* Squad Status list row */}
      <div className="border-t border-black/[0.05] pt-6 px-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-mono text-[11px] text-black/50 uppercase tracking-widest font-bold">
            SQUAD STATUS
          </span>
          <span className="font-mono text-[11px] text-black/60 font-semibold">
            {checkedInCount}/{members.length} Checked In
          </span>
        </div>

        {/* Squad members block */}
        <div className="space-y-3">
          {members.map((member, idx) => (
            <div 
              key={idx}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300
                ${member.status === 'checked_in' 
                  ? 'bg-emerald-500/5 border-emerald-500/10' 
                  : member.status === 'action_required'
                  ? 'bg-brand-orange/5 border-brand-orange/10 border-l-4 border-l-brand-orange'
                  : 'bg-black/[0.01] border-black/[0.03]'
                }
              `}
            >
              <div className="flex items-center gap-3">
                {/* Avatar with fallback */}
                <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10 bg-black/5">
                  <img 
                    src={member.avatarUrl} 
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div>
                  <h5 className="font-sans font-bold text-sm text-black">
                    {member.name}
                  </h5>
                  <p className="font-mono text-[10px] text-black/40">
                    {member.status === 'checked_in' 
                      ? `Checked in ${member.checkedInTime}` 
                      : member.status === 'action_required'
                      ? 'Action Required'
                      : 'Pending check-in'
                    }
                  </p>
                </div>
              </div>

              {/* Status icon badge */}
              <div>
                {member.status === 'checked_in' ? (
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : member.status === 'action_required' ? (
                  <button 
                    onClick={handleCheckInNow}
                    className="w-7 h-7 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center animate-pulse"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-black/5 text-black/30 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
