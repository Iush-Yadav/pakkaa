import React from 'react';
import { Menu, Bell, Users, User, ArrowRight, CheckCircle2, ChevronRight, Award, Flame, TrendingUp } from 'lucide-react';
import { Pact } from '../types';
import Logo from './Logo';
import { CardCorners } from './BackgroundGrid';

interface DashboardProps {
  pacts: Pact[];
  onSelectPact: (pact: Pact) => void;
  onCheckInPact: (pactId: string) => void;
  onNavigateToTab: (tab: string) => void;
  reliabilityDays: number;
  forfeitedAmount: number;
}

export default function Dashboard({
  pacts,
  onSelectPact,
  onCheckInPact,
  onNavigateToTab,
  reliabilityDays,
  forfeitedAmount
}: DashboardProps) {
  
  // Calculate active pacts
  const activePacts = pacts.filter(p => p.status === 'active');

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10 px-5">
      {/* Global Score Circular Meter Section */}
      <div className="flex flex-col items-center justify-center my-8 relative">
        <div className="relative w-32 h-32 flex items-center justify-center mb-2">
          {/* Internal App Logo with simple Welcome-style animation */}
          <div className="flex flex-col items-center justify-center text-center z-10">
            <Logo className="w-24 h-24 text-brand-orange" animate={true} />
          </div>
        </div>

        {/* Floating background coordinates for tech look */}
        <div className="absolute -bottom-2 text-[8px] font-mono text-black/25">
          SYS_CALIBRATION_COEF // ACTIVE.02
        </div>
      </div>

      {/* Quick Analytics Summary Panels */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Card 1: Reliability Days */}
        <div 
          className="glass-card relative rounded-xl p-4 hover:bg-white/60 transition-colors"
        >
          <CardCorners color="border-black/10" />
          <span className="font-mono text-[10px] text-black/50 uppercase tracking-widest block mb-1">
            Reliability
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-sans font-bold text-3xl text-black tracking-tight">
              {reliabilityDays}
            </span>
            <span className="font-mono text-xs text-black/40 font-medium">DAYS</span>
          </div>
          <div className="absolute top-3 right-3 text-emerald-600">
            <Flame className="w-4 h-4 fill-emerald-500/20" />
          </div>
        </div>

        {/* Card 2: Forfeited Amounts */}
        <div 
          className="bg-brand-orange/5 border border-brand-orange/10 relative rounded-xl p-4 hover:bg-brand-orange/10 transition-colors"
        >
          <CardCorners color="border-brand-orange/30" />
          <span className="font-mono text-[10px] text-brand-orange/70 uppercase tracking-widest block mb-1">
            Forfeited
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-sans font-bold text-3xl text-brand-orange tracking-tight">
              ₹{forfeitedAmount}
            </span>
            <span className="font-mono text-xs text-brand-orange/50 font-medium">TOTAL</span>
          </div>
          <div className="absolute top-3 right-3 text-brand-orange">
            <Award className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Section Header: Active Pacts */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-sans font-bold text-xl text-black tracking-tight">
          Active Pacts
        </h3>
        <button 
          onClick={() => onNavigateToTab('groups')}
          className="font-mono text-[11px] text-brand-orange font-semibold tracking-wider flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Active Pacts List */}
      <div className="space-y-4">
        {activePacts.map((pact) => {
          const isWorkout = pact.title.toLowerCase().includes('workout') || pact.title.toLowerCase().includes('run');
          // Gorgeous hotlinked high quality Unsplash illustration
          const imageUrl = isWorkout 
            ? "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80" // kettlebell
            : "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&auto=format&fit=crop&q=80"; // stack of books
          
          return (
            <div 
              key={pact.id} 
              className="glass-card rounded-xl p-5 relative transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg group"
            >
              <CardCorners color="border-black/10" />
              
              {/* Card Header Info */}
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4" onClick={() => onSelectPact(pact)}>
                  <h4 className="font-sans font-bold text-lg text-black tracking-tight group-hover:text-brand-orange transition-colors cursor-pointer">
                    {pact.title}
                  </h4>
                  
                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/5 text-black/60">
                      {pact.isSolo ? (
                        <>
                          <User className="w-3 h-3 text-black/40" /> Solo
                        </>
                      ) : (
                        <>
                          <Users className="w-3 h-3 text-black/40" /> {pact.membersCount} Members
                        </>
                      )}
                    </span>
                    {pact.endsInDays && (
                      <span className="text-[10px] font-mono text-black/40">
                        Ends in {pact.endsInDays} days
                      </span>
                    )}
                    {pact.frequency === 'Daily' && (
                      <span className="text-[10px] font-mono text-black/40 uppercase tracking-widest bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-semibold">
                        Daily
                      </span>
                    )}
                  </div>
                </div>

                {/* Hotlinked 3D-feeling Photo preview */}
                <div 
                  onClick={() => onSelectPact(pact)}
                  className="w-14 h-14 rounded-lg bg-black/5 border border-black/10 overflow-hidden relative cursor-pointer group-hover:scale-105 transition-transform"
                >
                  <img 
                    src={imageUrl} 
                    alt={pact.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all"
                  />
                  <div className="absolute inset-0 bg-brand-orange/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Progress Segment */}
              <div className="mt-5 pt-4 border-t border-black/[0.05]">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-black/40 font-medium">
                    {pact.isSolo ? 'Completion' : 'Success Rate'}
                  </span>
                  <span className="text-black font-bold">
                    {pact.isSolo ? pact.completionRate : pact.successRate}%
                  </span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full h-2 bg-black/[0.05] rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ${pact.isSolo ? 'bg-black' : 'bg-brand-orange'}`}
                    style={{ width: `${pact.isSolo ? pact.completionRate : pact.successRate}%` }}
                  />
                </div>
              </div>

              {/* Dynamic Interactive Check-in Button if Solo and action required */}
              {pact.isSolo && pact.completionRate < 100 && (
                <button
                  onClick={() => onCheckInPact(pact.id)}
                  className="w-full mt-4 py-3 bg-brand-orange hover:bg-brand-orange/95 active:scale-[0.98] transition-all rounded-lg text-white font-sans font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-brand-orange/20"
                >
                  <CheckCircle2 className="w-4 h-4" /> Check In
                </button>
              )}

              {/* Details arrow indicator */}
              <div 
                onClick={() => onSelectPact(pact)}
                className="absolute right-2 bottom-5 translate-y-[-12px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all cursor-pointer text-brand-orange"
              >
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick interactive feature suggestion card */}
      <div className="mt-8 bg-black text-white rounded-xl p-5 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial-gradient from-brand-orange/30 to-transparent opacity-60 pointer-events-none" />
        <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.2em] font-semibold">
          SYSTEM ALERT // MULTIPLAYER
        </span>
        <h4 className="font-sans font-bold text-base mt-1 text-white tracking-tight">
          Want higher stakes?
        </h4>
        <p className="font-sans text-xs text-white/60 mt-1 leading-relaxed max-w-[80%]">
          Create a social squad, lock capital, and get automated GPS or QR validation protocols.
        </p>
        <button 
          onClick={() => onNavigateToTab('create')}
          className="mt-4 px-4 py-2 bg-white text-black font-sans font-bold text-xs rounded hover:bg-white/90 active:scale-95 transition-all flex items-center gap-1"
        >
          Draft Protocol <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
