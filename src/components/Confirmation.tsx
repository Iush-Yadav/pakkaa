import React from 'react';
import { Check, X, Share2, ChevronRight, CheckCircle } from 'lucide-react';
import { CardCorners } from './BackgroundGrid';

interface ConfirmationProps {
  amount: number;
  recipient: string;
  payor: string;
  onDone: () => void;
  onViewPacts: () => void;
}

export default function Confirmation({ amount, recipient, payor, onDone, onViewPacts }: ConfirmationProps) {
  // Format current timestamp
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
  const timeStr = new Date().toTimeString().slice(0, 8);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10 px-5 pt-4">
      
      {/* Header bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-1.5 text-brand-orange font-sans font-bold text-sm tracking-tight">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          Confirmation
        </div>
        <button 
          onClick={onDone}
          className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Pulsing Success Ring */}
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="relative w-24 h-24 flex items-center justify-center mb-4">
          {/* Concentric ambient background rings */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/5 border border-emerald-500/10 animate-ping opacity-60" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 rounded-full bg-emerald-500/10 border border-emerald-500/20" />
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Check className="w-8 h-8" strokeWidth={3} />
          </div>
        </div>

        <h2 className="font-sans font-black text-3xl text-black tracking-tight mb-1">
          Payment Released
        </h2>
        <span className="font-mono text-[9px] text-black/50 tracking-[0.2em] font-semibold block uppercase">
          TRANSACTION VERIFIED • SECURE
        </span>
      </div>

      {/* Transaction Invoice Detail Box */}
      <div className="glass-card rounded-2xl p-6 relative mb-6">
        <CardCorners color="border-emerald-500/30" />

        <div className="space-y-4 font-sans text-sm">
          {/* Row 1: RECIPIENT */}
          <div className="flex justify-between items-baseline pb-3 border-b border-black/[0.04]">
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-wider font-semibold">
              RECIPIENT_ID
            </span>
            <span className="font-bold text-black text-right">
              {recipient}
            </span>
          </div>

          {/* Row 2: TOTAL SETTLED */}
          <div className="flex justify-between items-baseline pb-3 border-b border-black/[0.04]">
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-wider font-semibold">
              TOTAL_SETTLED
            </span>
            <span className="font-black text-lg text-brand-orange text-right tabular-nums">
              ₹{amount}
            </span>
          </div>

          {/* Row 3: STATUS */}
          <div className="flex justify-between items-baseline pb-3 border-b border-black/[0.04]">
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-wider font-semibold">
              STATUS
            </span>
            <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-500/5 px-2 py-0.5 rounded uppercase tracking-widest text-right">
              SUCCESSFUL
            </span>
          </div>

          {/* Row 4: PAYOR */}
          <div className="flex justify-between items-baseline pb-3 border-b border-black/[0.04]">
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-wider font-semibold">
              PAYOR
            </span>
            <span className="font-semibold text-black text-right">
              {payor || 'Alex Khanna'}
            </span>
          </div>

          {/* Row 5: TIMESTAMP */}
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-wider font-semibold">
              TIME_STAMP
            </span>
            <span className="font-mono text-xs text-black/70 font-semibold text-right">
              {dateStr} | {timeStr}
            </span>
          </div>
        </div>

        {/* Dinner comment box */}
        <div className="bg-black/5 rounded-xl p-4 border border-black/[0.03] text-center mt-6">
          <p className="font-sans text-xs italic text-black/60">
            "Dinner settled. Vikas paid his dues 🍽️"
          </p>
        </div>
      </div>

      {/* Share to Chat Widget Button */}
      <div className="glass-card rounded-xl p-4 flex items-center justify-between hover:bg-white/60 active:scale-[0.99] transition-all cursor-pointer mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-orange text-white flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-sans font-bold text-sm text-black">
              Share to Group Chat
            </h4>
            <p className="font-sans text-xs text-black/40">
              Update the crew that the bill is clear.
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-black/30" />
      </div>

      {/* Footer System Message */}
      <div className="text-center font-mono text-[9px] text-black/30 tracking-widest leading-relaxed mb-6">
        <p>REF NO: TXN-0294-8271-9920</p>
        <p className="max-w-xs mx-auto mt-1">
          ALL DUES FOR 'DINNER COLLECTION' HAVE BEEN RECONCILED. THANK YOU FOR USING PAKKA.
        </p>
      </div>

      {/* Navigation Buttons Row at base */}
      <div className="grid grid-cols-2 gap-4">
        {/* Done Button */}
        <button
          onClick={onDone}
          className="py-3 px-4 border border-black/15 bg-transparent hover:bg-black/5 active:scale-95 transition-all rounded-lg text-black font-sans font-bold text-xs uppercase tracking-wider text-center"
        >
          DONE
        </button>

        {/* View Pacts Button */}
        <button
          onClick={onViewPacts}
          className="py-3 px-4 bg-brand-orange hover:bg-brand-orange/95 active:scale-95 transition-all rounded-lg text-white font-sans font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md shadow-brand-orange/20"
        >
          VIEW PACTS <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
