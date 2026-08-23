'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ExperienceLayer() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const finish = window.setTimeout(() => setLoading(false), 1150);
    return () => window.clearTimeout(finish);
  }, []);
  return <AnimatePresence>{loading && <motion.div className="fixed inset-0 z-[110] grid place-items-center bg-[#050407]" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: .6 }}><div className="text-center"><motion.div className="mx-auto grid h-16 w-16 place-items-center rounded-[1.5rem] border border-white/20 bg-white/[.07] text-2xl" animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.04, 1] }} transition={{ duration: 1.15 }}>✦</motion.div><p className="title mt-5 text-xl">Ꚃ𝑜𝓊𝓁 Ꚃ𝑜𝒸𝒾𝑒𝓉𝓎 | ࣪ ִֶָ☾.</p><div className="mx-auto mt-4 h-px w-28 overflow-hidden bg-white/10"><motion.i className="block h-full bg-violet-200" initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: .9, ease: 'easeInOut' }}/></div></div></motion.div>}</AnimatePresence>;
}
