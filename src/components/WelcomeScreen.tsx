import React, { useEffect } from 'react';
import Logo from './Logo';

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-white z-[100] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-48 h-48">
        <Logo className="w-full h-full" animate={true} />
      </div>
      <div className="mt-8 font-sans font-black text-4xl tracking-tighter text-black animate-fade-in-delayed">
        Pakka<span className="text-brand-orange">.</span>
      </div>
      <div className="absolute bottom-12 font-mono text-[10px] text-black/40 tracking-[0.2em] uppercase font-semibold animate-fade-in-delayed">
        Digital Escrow Protocol
      </div>
    </div>
  );
}
