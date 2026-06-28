import React from 'react';
import { ShieldCheck, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import { CardCorners } from './BackgroundGrid';

interface StakeLockedProps {
  amount: number;
  onGoToDashboard: () => void;
}

export default function StakeLocked({ amount, onGoToDashboard }: StakeLockedProps) {
  // Generate mock technical IDs
  const txId = `TXN_PX_${Math.floor(1000 + Math.random() * 9000)}`;
  const timeStr = new Date().toUTCString().slice(17, 25) + " UTC";

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10 px-5 pt-4">
      
      {/* Title Header Block */}
      <div className="mb-4">
        <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.2em] font-extrabold">
          SYSTEM_EVENT
        </span>
        <h2 className="font-sans font-black text-2xl text-black tracking-tight leading-none">
          STAKE_LOCKED_V1.0
        </h2>
      </div>

      {/* Cyberpunk WebGL Canvas visual placeholder matching screen */}
      <div className="w-full aspect-[4/3] bg-black rounded-2xl relative border border-white/10 overflow-hidden mb-6 flex flex-col justify-between p-4">
        
        {/* Animated matrix dots blueprint grid in green or red */}
        <div className="absolute inset-0 blueprint-grid opacity-25" />

        {/* 3D abstract geometric wireframes with glowing vector brackets */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 border border-brand-orange/30 rounded transform rotate-45 animate-spin" style={{ animationDuration: '10s' }} />
          <div className="w-16 h-16 border border-brand-orange/50 rounded absolute transform -rotate-12 animate-pulse" />
          <Layers className="w-10 h-10 text-brand-orange animate-bounce absolute" />
        </div>

        {/* Floating tech readouts overlay */}
        <div className="font-mono text-[8px] text-white/40 uppercase tracking-widest flex justify-between z-10 select-none">
          <span>SECURE_PROOF_V1 // INITIALIZED</span>
          <span>GATE: CR-RUN-3000</span>
        </div>

        {/* Technical Frame stats in bottom left corner matching mockup */}
        <div className="font-mono text-[8px] text-white/50 leading-relaxed z-10 select-none text-left">
          <p>RENDER_ENGINE: WebGL</p>
          <p>FPS: 60.00</p>
        </div>
      </div>

      {/* Invoice Receipt Detail Panel */}
      <div className="glass-card rounded-2xl p-6 relative mb-8">
        <CardCorners color="border-brand-orange/30" />

        {/* Header with red indicator tick bubble */}
        <div className="flex justify-between items-center pb-4 border-b border-black/[0.04] mb-5">
          <span className="font-mono text-[10px] text-black/50 uppercase tracking-widest font-extrabold">
            TRANSACTION_RECEIPT
          </span>
          <div className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Total amount */}
        <h3 className="font-sans font-black text-5xl text-black tracking-tighter mb-1 tabular-nums text-left">
          ₹{amount}
        </h3>
        <p className="font-sans text-xs text-black/50 text-left font-medium mb-6">
          Commitment Deposit Confirmed
        </p>

        {/* Receipt sub table */}
        <div className="space-y-3.5 font-mono text-[10px] text-black/50 uppercase border-t border-black/[0.04] pt-4">
          
          <div className="flex justify-between items-baseline">
            <span className="text-black/40">TXN_ID:</span>
            <span className="bg-black/5 px-2 py-0.5 rounded text-black font-semibold tracking-wider font-mono text-[9px]">
              {txId}
            </span>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="text-black/40">TIMESTAMP:</span>
            <span className="font-semibold text-black tracking-wider">
              {timeStr}
            </span>
          </div>

        </div>
      </div>

      {/* Confirm release action button */}
      <button
        onClick={onGoToDashboard}
        className="w-full py-4 bg-brand-orange hover:bg-brand-orange/95 active:scale-[0.99] transition-all rounded-xl text-white font-sans font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
      >
        GO TO DASHBOARD <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
}
