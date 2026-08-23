'use client';

import { useState } from 'react';

type Position = { x: number; y: number; active: boolean };

export function OwnerTiltCard({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0, active: false });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
      active: true,
    });
  };

  const rotateX = position.y * 10;
  const rotateY = position.x * -12;
  const scale = position.active ? 1.02 : 1;

  return (
    <div
      className="mx-auto max-w-2xl [perspective:1400px]"
      onPointerMove={handleMove}
      onPointerLeave={() => setPosition({ x: 0, y: 0, active: false })}
    >
      <div
        className="relative will-change-transform [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transition: position.active ? 'transform 90ms ease-out' : 'transform 700ms cubic-bezier(.16,1,.3,1)',
        }}
      >
        {children}
        {/* 3D glare / light follow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,.18),transparent_45%)] mix-blend-screen"
          style={
            {
              '--x': `${(position.x + 0.5) * 100}%`,
              '--y': `${(position.y + 0.5) * 100}%`,
              opacity: position.active ? 0.85 : 0,
              transition: 'opacity 300ms ease',
            } as React.CSSProperties
          }
        />
        {/* subtle depth shadow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,.45)]"
          style={{ opacity: position.active ? 1 : 0, transition: 'opacity 300ms ease' }}
        />
      </div>
    </div>
  );
}
