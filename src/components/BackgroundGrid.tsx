import React from 'react';

export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Primary Dot Matrix Grid */}
      <div className="absolute inset-0 digital-grid opacity-75" />
      
      {/* Secondary Blueprint/Schematic Accent Lines */}
      <div className="absolute inset-x-0 top-12 h-[0.5px] bg-brand-orange/5" />
      <div className="absolute inset-x-0 top-1/3 h-[0.5px] bg-brand-orange/3" />
      <div className="absolute inset-y-0 left-12 w-[0.5px] bg-brand-orange/5" />
      <div className="absolute inset-y-0 right-12 w-[0.5px] bg-brand-orange/5" />

      {/* Decorative technical specs in corners */}
      <div className="absolute top-4 left-6 font-mono text-[9px] text-black/20 uppercase tracking-widest">
        SYS_STATUS: ACTIVE // ES_256
      </div>
      <div className="absolute top-4 right-6 font-mono text-[9px] text-brand-orange/30 uppercase tracking-widest">
        DRAFT_MD: TRUE
      </div>
      
      {/* Accent intersection crosses */}
      <div className="absolute top-24 left-24 text-[10px] text-black/15 font-mono select-none">+</div>
      <div className="absolute bottom-24 right-24 text-[10px] text-black/15 font-mono select-none">+</div>
      <div className="absolute top-1/2 right-36 text-[10px] text-black/10 font-mono select-none">+</div>
      <div className="absolute bottom-1/3 left-36 text-[10px] text-black/10 font-mono select-none">+</div>
    </div>
  );
}

interface CardCornersProps {
  color?: string;
  className?: string;
}

export function CardCorners({ color = 'border-brand-orange/30', className = '' }: CardCornersProps) {
  return (
    <>
      <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l ${color} pointer-events-none rounded-tl-[4px] ${className}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${color} pointer-events-none rounded-tr-[4px] ${className}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${color} pointer-events-none rounded-bl-[4px] ${className}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r ${color} pointer-events-none rounded-br-[4px] ${className}`} />
    </>
  );
}
