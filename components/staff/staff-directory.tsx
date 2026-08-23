'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { UserRound, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Glass } from '@/components/ui/glass';

type StaffMember = { id: string; name: string; user: string; description: string; role: string; tone: string; avatar: string | null };

function AvatarPlaceholder({ member, large = false }: { member: StaffMember; large?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, active: false });
  const sizeClass = large ? 'h-44 w-44 rounded-[2rem] sm:h-52 sm:w-52' : 'h-14 w-14 rounded-2xl';
  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!large) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({ x: (event.clientX - bounds.left) / bounds.width - .5, y: (event.clientY - bounds.top) / bounds.height - .5, active: true });
  };
  const rotation = { x: position.y * 12, y: position.x * -12 };
  return <div className={large ? '[perspective:1000px]' : undefined} onPointerMove={handleMove} onPointerLeave={() => large && setPosition({ x: 0, y: 0, active: false })}>
    <div className={`relative grid place-items-center overflow-hidden bg-gradient-to-br ${member.tone} ${sizeClass} ${large ? 'will-change-transform [transform-style:preserve-3d]' : ''}`} style={large ? { transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${position.active ? 1.035 : 1})`, transition: position.active ? 'transform 90ms ease-out' : 'transform 650ms cubic-bezier(.16,1,.3,1)' } : undefined}>
      {member.avatar && !imageFailed ? <Image src={member.avatar} alt={`${member.name} profile picture`} fill sizes={large ? '(max-width: 640px) 11rem, 13rem' : '3.5rem'} className="object-cover" onError={() => setImageFailed(true)} style={large ? { transform: `scale(${position.active ? 1.07 : 1.02}) translate(${position.x * -7}px, ${position.y * -7}px)`, transition: position.active ? 'transform 90ms ease-out' : 'transform 650ms cubic-bezier(.16,1,.3,1)' } : undefined}/> : <div className={`grid place-items-center bg-black/25 text-white/70 backdrop-blur-sm ${large ? 'h-[calc(100%-8px)] w-[calc(100%-8px)] rounded-[1.6rem]' : 'h-[calc(100%-6px)] w-[calc(100%-6px)] rounded-xl'}`}>
        {large ? <span className="eyebrow text-[.58rem]">PFP</span> : <UserRound size={18}/>} 
      </div>}
      {large && <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(238,220,255,.3),transparent_40%)] mix-blend-screen" style={{ '--x': `${(position.x + .5) * 100}%`, '--y': `${(position.y + .5) * 100}%`, opacity: position.active ? .7 : 0, transition: 'opacity 300ms ease' } as React.CSSProperties}/>}
    </div>
  </div>;
}

function StaffProfileModal({ member, onClose }: { member: StaffMember; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
    <motion.section role="dialog" aria-modal="true" aria-labelledby="staff-id-name" className="glass relative w-full max-w-md overflow-hidden rounded-[2rem] p-6 text-center shadow-2xl sm:p-8" initial={{ opacity: 0, scale: .94, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: .97, y: 8, filter: 'blur(5px)' }} transition={{ duration: .28, ease: [0.16, 1, 0.3, 1] }} onMouseDown={event => event.stopPropagation()}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-200/15 to-transparent" />
      <button type="button" onClick={onClose} onMouseDown={e => e.stopPropagation()} aria-label="Close staff profile" className="absolute right-5 top-5 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/5 text-white/65 transition hover:bg-white/10 hover:text-white"><X size={16} className="pointer-events-none" /></button>
      <p className="eyebrow relative">Soul Society · Staff Identity</p>
      <div className="relative mx-auto mt-7 w-fit"><AvatarPlaceholder member={member} large/></div>
      <h2 id="staff-id-name" className="title relative mt-6 text-4xl">{member.name}</h2>
      <p className="relative mt-2 text-sm text-white/50">{member.user}</p>
      <p className="relative mx-auto mt-6 max-w-xs text-sm leading-6 text-white/65">{member.description}</p>
      <div className="relative mt-7 border-t border-white/10 pt-5"><p className="eyebrow text-violet-200">{member.role}</p></div>
    </motion.section>
  </motion.div>;
}

export function StaffDirectory() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);

  useEffect(() => {
    const load = () => fetch('/api/staff', { cache: 'no-store' }).then(r => r.json()).then(setStaff).catch(() => {});
    load();
    const interval = setInterval(load, 3000);
    const onStorage = (e: StorageEvent) => { if (e.key === 'zanpakuto_update') load(); };
    const onVisibility = () => { if (document.visibilityState === 'visible') load(); };
    const onCustom = () => load();
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('zanpakuto:update', onCustom);
    let bc: BroadcastChannel | null = null;
    try { bc = new BroadcastChannel('zanpakuto:update'); bc.onmessage = load; } catch {}
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('zanpakuto:update', onCustom);
      bc?.close();
    };
  }, []);

  if (staff.length === 0) return <div className="mx-auto max-w-6xl px-5 py-10 text-center text-white/40">Loading staff...</div>;

  return <><div className="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-3">{staff.map(member => <Glass key={member.id} className="overflow-hidden p-0"><button type="button" onClick={() => setSelectedMember(member)} className="block w-full p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-violet-200/80"><AvatarPlaceholder member={member}/><p className="title mt-12 text-2xl">{member.name}</p><p className="mt-1 text-xs text-white/45">{member.user}</p><p className="mt-4 text-sm text-white/55">{member.description}</p><p className="mt-5 border-t border-white/10 pt-4 text-xs uppercase tracking-widest text-violet-200">{member.role}</p></button></Glass>)}</div><AnimatePresence>{selectedMember && <StaffProfileModal member={selectedMember} onClose={() => setSelectedMember(null)}/>}</AnimatePresence></>;
}