import React from 'react';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export default function Logo({ className = "w-10 h-10", animate = false }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Grid Lines */}
      <g className={animate ? "animate-fade-in-delayed" : ""}>
        <line x1="30" y1="10" x2="30" y2="90" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" />
        <line x1="70" y1="10" x2="70" y2="90" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" />
        <line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" />
        <line x1="10" y1="60" x2="90" y2="60" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" />
        
        {/* Corner Accents */}
        <path d="M85 10 L95 10 L95 20" stroke="#ff4d00" strokeWidth="1" fill="none" />
        <path d="M85 90 L95 90 L95 80" stroke="#ff4d00" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M5 90 L15 90 L15 80" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
        
        {/* Dots accent */}
        <circle cx="10" cy="80" r="0.5" fill="currentColor" opacity="0.5" />
        <circle cx="10" cy="85" r="0.5" fill="currentColor" opacity="0.5" />
        <circle cx="15" cy="90" r="0.5" fill="currentColor" opacity="0.5" />
      </g>

      {/* The 'प' Shape - Double drafting lines */}
      <g strokeWidth="2.5" strokeLinecap="square">
        {/* TOP HORIZONTAL */}
        <g className={animate ? "animate-slide-in-right" : ""}>
          {/* Upper orange */}
          <line x1="22" y1="32" x2="82" y2="32" stroke="#ff4d00" strokeDasharray="10 3 4 3" />
          {/* Lower black */}
          <line x1="26" y1="38" x2="76" y2="38" stroke="#111111" strokeDasharray="3 5 12 4" />
        </g>
        
        {/* LEFT VERTICAL */}
        <g className={animate ? "animate-slide-in-down" : ""}>
          {/* Outer orange */}
          <line x1="32" y1="32" x2="32" y2="62" stroke="#ff4d00" strokeDasharray="8 4 4 4" />
          {/* Inner black */}
          <line x1="38" y1="38" x2="38" y2="56" stroke="#111111" strokeDasharray="4 6 8 3" />
        </g>
        
        {/* MIDDLE HORIZONTAL */}
        <g className={animate ? "animate-slide-in-left" : ""}>
          {/* Lower orange */}
          <line x1="32" y1="62" x2="74" y2="62" stroke="#ff4d00" strokeDasharray="6 4 8 2" />
          {/* Upper black */}
          <line x1="38" y1="56" x2="68" y2="56" stroke="#111111" strokeDasharray="4 4" />
        </g>
        
        {/* RIGHT VERTICAL */}
        <g className={animate ? "animate-slide-in-up" : ""}>
          {/* Inner orange */}
          <line x1="68" y1="32" x2="68" y2="85" stroke="#ff4d00" strokeDasharray="5 3" />
          {/* Outer black */}
          <line x1="74" y1="38" x2="74" y2="85" stroke="#111111" strokeDasharray="2 6 6 2" />
        </g>
      </g>
    </svg>
  );
}
