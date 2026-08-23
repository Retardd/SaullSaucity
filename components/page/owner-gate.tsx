'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const PASSCODE = 'Sevn';

export function OwnerGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem('owner_unlocked');
    if (saved === 'true') setUnlocked(true);
  }, []);

  const handleUnlock = () => {
    setChecking(true);
    setTimeout(() => {
      if (input === PASSCODE) {
        setUnlocked(true);
        sessionStorage.setItem('owner_unlocked', 'true');
        setError(false);
      } else {
        setError(true);
        setInput('');
        setTimeout(() => setError(false), 1200);
      }
      setChecking(false);
    }, 300);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleUnlock();
  };

  if (unlocked) return <>{children}</>;

  // Don't render overlay until mounted to avoid hydration mismatch and to use portal
  if (!mounted) return <>{children}</>;

  const overlay = (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-[#050407]/90 p-4 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-[#1a1030]/90 via-[#110a24]/90 to-[#050407]/95 p-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(120,80,180,0.15)] backdrop-blur-2xl"
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-300/10 via-violet-500/5 to-transparent" />

        <div className="relative">
          <div className="mx-auto grid h-10 w-10 place-items-center text-xl text-white/70">月</div>
          <h2 className="title mt-1 text-[1.35rem] tracking-wide text-white">PASSKEY | パスキ | पासकोड</h2>
          <p className="mt-1 text-[11px] tracking-wide text-white/40">Umm.. Its a bit weird but yeah "Locked.."</p>
        </div>

        <div className="relative mt-6">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="••••"
            type="password"
            autoFocus
            className={`w-full rounded-xl border bg-white/[0.06] px-4 py-3 text-center text-sm tracking-[0.4em] text-white placeholder:text-white/25 outline-none transition ${error ? 'border-red-400/50 bg-red-500/10 shake' : 'border-white/10 focus:border-violet-300/30 focus:bg-white/[0.08]'}`}
          />
          {error && <p className="mt-2 text-xs text-red-300">Wrong passkey.</p>}
        </div>

        <div className="relative mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => (window.location.href = '/')}
            className="rounded-full px-5 py-2.5 text-[11px] font-medium tracking-widest text-white/50 transition hover:text-white"
          >
            CANCEL
          </button>
          <button
            onClick={handleUnlock}
            disabled={checking}
            className="min-w-[110px] rounded-full bg-white px-6 py-2.5 text-xs font-semibold tracking-widest text-black transition hover:bg-white/90 active:scale-95 disabled:opacity-60"
          >
            {checking ? '...' : 'UNLOCK'}
          </button>
        </div>

        <style jsx>{`
          .shake {
            animation: shake 0.3s ease;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
        `}</style>
      </motion.div>
    </div>
  );

  return (
    <>
      {createPortal(overlay, document.body)}
      <div className="invisible pointer-events-none select-none" aria-hidden>
        {children}
      </div>
    </>
  );
}