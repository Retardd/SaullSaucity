'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ExperienceLayer() {
  const [loading, setLoading] = useState(true);
  const [point, setPoint] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const finish = window.setTimeout(() => setLoading(false), 1150);
    const move = (event: PointerEvent) => setPoint({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move);
    return () => { window.clearTimeout(finish); window.removeEventListener('pointermove', move); };
  }, []);
  return <><motion.div aria-hidden className="pointer-events-none fixed z-[100] hidden h-7 w-7 rounded-full border border-white/50 mix-blend-screen md:block" animate={{ x: point.x - 14, y: point.y - 14 }} transition={{ type: 'spring', stiffness: 900, damping: 48, mass: .18 }} /><div aria-hidden className="pointer-events-none fixed z-[99] hidden h-48 w-48 rounded-full bg-violet-400/10 blur-3xl md:block" style={{ transform: `translate(${point.x - 96}px, ${point.y - 96}px)` }} /><AnimatePresence>{loading && <motion.div className="fixed inset-0 z-[110] grid place-items-center bg-[#050407]" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: .6 }}><div className="text-center"><motion.div className="mx-auto grid h-16 w-16 place-items-center rounded-[1.5rem] border border-white/20 bg-white/[.07] text-2xl" animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.04, 1] }} transition={{ duration: 1.15 }}>✦</motion.div><p className="title mt-5 text-xl">Ꚃ𝑜𝓊𝓁 Ꚃ𝑜𝒸𝒾𝑒𝓉𝓎 | ࣪ ִֶָ☾.</p><div className="mx-auto mt-4 h-px w-28 overflow-hidden bg-white/10"><motion.i className="block h-full bg-violet-200" initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: .9, ease: 'easeInOut' }}/></div></div></motion.div>}</AnimatePresence></>;
}
