import React from 'react';

type MascotType = 'hello' | 'write' | 'megaphone' | 'map' | 'celebrate';

interface MascotProps {
  type: MascotType;
  className?: string;
}

export default function Mascot({ type, className = "" }: MascotProps) {
  // You can replace this src with the actual uploaded mascot image URL or sliced version
  // For now, we'll use a visual placeholder with the brand orange color
  const icons = {
    'hello': '👋',
    'write': '✍️',
    'megaphone': '📢',
    'map': '📍',
    'celebrate': '🎊'
  };

  return (
    <div className={`flex items-center justify-center rounded-full bg-white shadow-lg shadow-brand-orange/20 border-2 border-brand-orange/10 ${className}`}>
      {/* 
        To use your actual image, replace the contents of this div with:
        <img src="/path-to-your-mascot-image.png" alt={`Mascot ${type}`} className="w-full h-full object-contain" />
        If it's a sprite sheet, you can use background-position to show the right mascot based on the `type`.
      */}
      <span className="text-2xl" aria-label={type}>{icons[type]}</span>
    </div>
  );
}
