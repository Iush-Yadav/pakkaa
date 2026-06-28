import React, { useRef, useState, useEffect } from 'react';

interface BorderGlowProps {
  children: React.ReactNode;
  edgeSensitivity?: number;
  glowColor?: string; // RGB format like "0 200 83"
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  className?: string;
}

export default function BorderGlow({
  children,
  edgeSensitivity = 30,
  glowColor = "255 77 0", // Pakka orange default
  backgroundColor = "#ffffff",
  borderRadius = 24,
  glowRadius = 120,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#ff4d00', '#ff7300', '#ff9433'],
  className = ""
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is within edge sensitivity range
      const nearLeft = x < edgeSensitivity;
      const nearRight = x > rect.width - edgeSensitivity;
      const nearTop = y < edgeSensitivity;
      const nearBottom = y > rect.height - edgeSensitivity;

      if (nearLeft || nearRight || nearTop || nearBottom || isHovered) {
        setCoords({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [edgeSensitivity, isHovered]);

  const gradientColors = colors.join(', ');

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-[1.5px] transition-all duration-300 ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        background: isHovered || animated
          ? `radial-gradient(${glowRadius}px circle at ${coords.x}px ${coords.y}px, ${gradientColors}, transparent)`
          : `rgba(${glowColor}, 0.15)`,
        boxShadow: isHovered 
          ? `0 0 ${glowRadius / 3}px rgba(${glowColor}, ${0.1 * glowIntensity}), inset 0 0 12px rgba(${glowColor}, 0.05)` 
          : 'none'
      }}
    >
      {/* Glow highlight layer */}
      {(isHovered || animated) && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            borderRadius: `${borderRadius}px`,
            background: `radial-gradient(${glowRadius * 1.5}px circle at ${coords.x}px ${coords.y}px, rgba(${glowColor}, ${0.25 * glowIntensity}), transparent ${coneSpread + 40}%)`,
            zIndex: 0,
          }}
        />
      )}

      {/* Inner background content */}
      <div
        className="relative h-full w-full z-10 overflow-hidden"
        style={{
          borderRadius: `${borderRadius - 1}px`,
          backgroundColor: backgroundColor,
        }}
      >
        {children}
      </div>
    </div>
  );
}
