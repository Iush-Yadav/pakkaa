import React from 'react';
import { Heart, X, Share2, MessageCircle, Send } from 'lucide-react';
import { CardCorners } from './BackgroundGrid';
import Mascot from './Mascot';

interface CharityConsequenceProps {
  onClose: () => void;
  onShareToStories: () => void;
}

export default function CharityConsequence({ onClose, onShareToStories }: CharityConsequenceProps) {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10 px-5 pt-4">
      
      {/* Upper Navigation Row */}
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em] font-black">
          SYS_RELEASE_PROTOCOL
        </span>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Consequence Card */}
      <div className="glass-card rounded-3xl p-6 relative mb-8 text-center border-l-4 border-l-brand-orange">
        <CardCorners color="border-brand-orange/40" />

        {/* Mascot celebrate icon */}
        <div className="absolute top-2 right-2 animate-bounce">
          <Mascot type="celebrate" className="w-16 h-16 bg-transparent shadow-none border-none" />
        </div>

        {/* Circular heart icon badge */}
        <div className="w-16 h-16 rounded-full bg-brand-orange/5 text-brand-orange flex items-center justify-center mx-auto mb-4 border border-brand-orange/10 shadow-lg shadow-brand-orange/5">
          <Heart className="w-8 h-8 fill-brand-orange/10" strokeWidth={2.5} />
        </div>

        <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] font-extrabold block mb-1">
          CHARITY PACT COMPLETED
        </span>

        {/* Giant amount */}
        <h2 className="font-sans font-black text-5xl text-brand-orange tracking-tighter mb-4 tabular-nums">
          ₹600
        </h2>

        {/* Status indicator block */}
        <span className="inline-block font-mono text-[11px] font-bold text-white bg-brand-orange px-5 py-1.5 rounded-md uppercase tracking-[0.2em] mb-6">
          DONATED
        </span>

        {/* Description body text */}
        <p className="font-sans text-sm text-black/70 leading-relaxed max-w-xs mx-auto mb-6">
          Our cricket pact funded <span className="font-bold text-black">6 school meals</span> via <span className="font-bold text-brand-orange">Akshaya Patra</span>.
        </p>

        {/* Vikas didn't show caption card */}
        <div className="bg-black/[0.02] border border-black/[0.04] rounded-2xl p-4 flex items-center gap-3 text-left">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-black/10 flex-shrink-0 bg-black/5">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
              alt="Vikas"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale" 
            />
          </div>
          <div>
            <p className="font-sans text-[12px] text-black/70 leading-snug">
              <span className="font-bold text-black">Vikas</span> didn't show, but his missed commitment did good.
            </p>
          </div>
        </div>
      </div>

      {/* Share Actions buttons */}
      <div className="space-y-3">
        {/* Instagram Share button (gradient outline/text style) */}
        <button
          onClick={onShareToStories}
          className="w-full py-4 glass-card hover:bg-white/60 active:scale-[0.99] transition-all rounded-xl text-black font-sans font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4 text-black/60" /> Share to Instagram Stories
        </button>

        {/* WhatsApp Share button */}
        <button
          onClick={onShareToStories}
          className="w-full py-4 bg-brand-orange hover:bg-brand-orange/95 active:scale-[0.99] transition-all rounded-xl text-white font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
        >
          <Send className="w-4 h-4 text-white/80" /> Send via WhatsApp
        </button>
      </div>

      {/* Tech line footer */}
      <div className="text-center mt-6">
        <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest">
          SYS_ESCROW_REC // CODE_772A_PA
        </span>
      </div>

    </div>
  );
}
