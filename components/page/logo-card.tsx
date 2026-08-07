'use client';
import Image from 'next/image';
import { useState } from 'react';

type Position = { x: number; y: number; active: boolean };

export function LogoCard() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0, active: false });
  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({ x: (event.clientX - bounds.left) / bounds.width - .5, y: (event.clientY - bounds.top) / bounds.height - .5, active: true });
  };
  // Reverse the axes so the portion nearest the pointer is the portion that
  // visually moves toward the viewer, instead of tilting away from it.
  const rotateX = position.y * 15;
  const rotateY = position.x * -15;
  return <div className="self-center [perspective:1200px] lg:mt-12" onPointerMove={handleMove} onPointerLeave={() => setPosition({ x: 0, y: 0, active: false })}><div className="relative aspect-square overflow-hidden rounded-[2rem] will-change-transform [transform-style:preserve-3d]" style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${position.active ? 1.045 : 1})`, transition: position.active ? 'transform 90ms ease-out' : 'transform 650ms cubic-bezier(.16,1,.3,1)' }}><Image src="/Pics/LOGO.jpg" alt="Soul Society logo" fill priority sizes="(min-width: 1024px) 360px, 88vw" className="object-cover" style={{ transform: `scale(${position.active ? 1.075 : 1.025}) translate(${position.x * -9}px, ${position.y * -9}px)`, transition: position.active ? 'transform 90ms ease-out' : 'transform 650ms cubic-bezier(.16,1,.3,1)' }}/><div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(238,220,255,.38),transparent_37%)] mix-blend-screen" style={{ '--x': `${(position.x + .5) * 100}%`, '--y': `${(position.y + .5) * 100}%`, opacity: position.active ? .72 : 0, transition: 'opacity 350ms ease' } as React.CSSProperties}/></div></div>;
}
