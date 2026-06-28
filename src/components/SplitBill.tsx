import React, { useState } from 'react';
import { ArrowLeft, Bell, QrCode, DollarSign, Wallet, Users, ChevronRight, HelpCircle } from 'lucide-react';
import { CardCorners } from './BackgroundGrid';

interface SplitBillProps {
  onBack: () => void;
  onConfirmRelease: (amount: number, recipient: string, payor: string) => void;
}

export default function SplitBill({ onBack, onConfirmRelease }: SplitBillProps) {
  // Configurable inputs for real-time math testing!
  const [totalBill, setTotalBill] = useState(800);
  const [vikasStake, setVikasStake] = useState(200);
  const [splitCount, setSplitCount] = useState(4); // 1/4 split

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setTotalBill(val);
  };

  const handleVikasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setVikasStake(val);
  };

  const remaining = Math.max(0, totalBill - vikasStake);
  const yourShare = Math.round(remaining / splitCount);

  const handleConfirm = () => {
    onConfirmRelease(yourShare, "Dharpur Dhaba", "Vikas Khanna");
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10 px-5 pt-2">
      
      {/* Detail Headers */}
      <div className="flex justify-between items-baseline mt-4 mb-2 font-mono text-[9px] text-black/40 uppercase tracking-widest">
        <span>DESTINATION</span>
        <span>002 / SETTLE</span>
      </div>

      {/* Destination Name Title */}
      <h2 className="font-sans font-black text-3xl text-black tracking-tight leading-none mb-1">
        Dharpur Dhaba
      </h2>

      {/* UPI metadata line */}
      <div className="flex items-center gap-1.5 font-mono text-[10px] text-black/50 mb-6 uppercase tracking-wider">
        <QrCode className="w-3.5 h-3.5 text-black/40" />
        UPI ID: <span className="text-black font-semibold">dharpur.dhaba@okaxis</span>
      </div>

      {/* Main interactive Bill Card */}
      <div className="glass-card rounded-2xl p-6 relative mb-6">
        <CardCorners color="border-brand-orange/30" />

        <span className="font-mono text-[10px] text-black/50 uppercase tracking-[0.2em] block mb-2 font-semibold">
          TOTAL BILL (INR)
        </span>

        {/* Input box to type values directly */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans font-black text-4xl text-black">₹</span>
          <input 
            type="number"
            value={totalBill || ''}
            onChange={handleBillChange}
            className="font-sans font-black text-5xl text-black bg-transparent border-b border-dashed border-black/20 focus:border-brand-orange outline-none w-full tabular-nums py-1 tracking-tighter"
            placeholder="0"
          />
        </div>

        <div className="font-mono text-[9px] text-brand-orange font-bold uppercase tracking-widest flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange block animate-pulse" />
          MANUAL OVERRIDE ENABLED
        </div>
      </div>

      {/* Settlement Breakdown Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4 font-mono text-[11px] text-black font-bold uppercase tracking-widest">
          <svg className="w-4 h-4 text-brand-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="2" y="2" width="8" height="8" rx="1" />
            <rect x="14" y="14" width="8" height="8" rx="1" />
            <path d="M10 6h4v12h-4" />
          </svg>
          SETTLEMENT BREAKDOWN
        </div>

        {/* Row 1: Vikas's Stake */}
        <div className="glass-card rounded-xl p-4 relative mb-4 flex items-center justify-between border-l-2 border-l-brand-orange">
          <div className="flex items-center gap-3">
            {/* Vikas profile photo */}
            <div className="w-11 h-11 rounded-full overflow-hidden border border-black/10 bg-black/5">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Vikas"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-black">
                Vikas's Stake
              </h4>
              <p className="font-mono text-[9px] text-black/40 uppercase tracking-wider">
                PAID SEPARATELY
              </p>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            {/* Interactive Vikas deduction input */}
            <div className="flex items-center font-sans font-bold text-base text-brand-orange">
              <span>-₹</span>
              <input 
                type="number"
                value={vikasStake || ''}
                onChange={handleVikasChange}
                className="w-16 bg-transparent border-b border-dashed border-brand-orange/20 text-right font-sans font-bold text-base text-brand-orange focus:outline-none focus:border-brand-orange tabular-nums"
                placeholder="0"
              />
            </div>
            <span className="font-mono text-[9px] text-brand-orange bg-brand-orange/5 px-1.5 py-0.2 rounded uppercase font-semibold mt-0.5">
              ADJUSTED
            </span>
          </div>
        </div>

        {/* Share Outputs split layout */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Remaining Pool */}
          <div className="glass-card rounded-xl p-4 relative">
            <span className="font-mono text-[9px] text-black/40 uppercase tracking-widest block mb-1">
              REMAINING
            </span>
            <span className="font-sans font-extrabold text-2xl text-black tabular-nums tracking-tight">
              ₹{remaining}
            </span>
            <div className="w-12 h-1 bg-black/15 mt-3 rounded-full" />
          </div>

          {/* User's individual share split */}
          <div className="glass-card rounded-xl p-4 relative border-l border-brand-orange/40 bg-brand-orange/[0.01]">
            <span className="font-mono text-[9px] text-brand-orange/80 uppercase tracking-widest block mb-1 font-bold">
              YOUR SHARE
            </span>
            <span className="font-sans font-extrabold text-2xl text-black tabular-nums tracking-tight">
              ₹{yourShare}
            </span>
            <p className="font-mono text-[9px] text-black/40 uppercase mt-2 tracking-wider">
              1/{splitCount} SPLIT
            </p>
          </div>

        </div>
      </div>

      {/* Tech Specifications Coordinates Footer */}
      <div className="border-t border-black/[0.05] pt-4 mb-6 grid grid-cols-3 gap-2 font-mono text-[8px] text-black/30 uppercase tracking-widest">
        <div>
          <span className="block text-black/20">TXNID:</span>
          <span className="font-semibold block">9942_DPD_S77</span>
        </div>
        <div>
          <span className="block text-black/20">COORDINATE:</span>
          <span className="font-semibold block">28.6139 | 77.2090</span>
        </div>
        <div>
          <span className="block text-black/20">ENCRYPTION:</span>
          <span className="font-semibold block">AES-256</span>
        </div>
      </div>

      {/* Primary Confirm Action Button */}
      <button
        onClick={handleConfirm}
        className="w-full py-4 bg-brand-orange hover:bg-brand-orange/95 active:scale-[0.99] transition-all rounded-xl text-white font-sans font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
      >
        CONFIRM & RELEASE <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
