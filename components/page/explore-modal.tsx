'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, X, BookOpen, HelpCircle, Shield, Users } from 'lucide-react';
import { Glass, Button } from '@/components/ui/glass';

const exploreItems = [
  {
    title: 'Rules',
    desc: 'Honor, quiet strength, and our code',
    href: '/rules',
    icon: BookOpen,
  },
  {
    title: 'FAQs',
    desc: 'Answers before you enter',
    href: '/faq',
    icon: HelpCircle,
  },
  {
    title: 'Staff',
    desc: 'Those who tend the flame',
    href: '/staff',
    icon: Shield,
  },
  {
    title: 'Souls',
    desc: 'Special souls of the society',
    href: '/members',
    icon: Users,
  },
];

function ExploreTilt({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    setPos({ x: (e.clientX - b.left) / b.width - 0.5, y: (e.clientY - b.top) / b.height - 0.5, active: true });
  };
  const rx = pos.y * 9;
  const ry = pos.x * -11;
  return (
    <div className="[perspective:900px]" onPointerMove={handleMove} onPointerLeave={() => setPos({ x: 0, y: 0, active: false })}>
      <div
        className="relative will-change-transform [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(${pos.active ? 1.02 : 1})`,
          transition: pos.active ? 'transform 80ms ease-out' : 'transform 600ms cubic-bezier(.16,1,.3,1)',
        }}
      >
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,.14),transparent_45%)] mix-blend-screen"
          style={{ '--x': `${(pos.x + 0.5) * 100}%`, '--y': `${(pos.y + 0.5) * 100}%`, opacity: pos.active ? 0.9 : 0, transition: 'opacity 280ms ease' } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

export function ExploreButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      {/* Trigger button - renamed from "Read our code" to "Explore" */}
      <Button onClick={() => setOpen(true)} className="!px-6">
        Explore <Compass size={16} />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-black/60 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Explore"
              className="glass relative w-full max-w-xl overflow-hidden rounded-[2rem] p-6 shadow-2xl md:p-7"
              initial={{ opacity: 0, scale: 0.96, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.97, y: 8, filter: 'blur(6px)' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onMouseDown={e => e.stopPropagation()}
            >
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-200/15 to-transparent" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                onMouseDown={e => e.stopPropagation()}
                aria-label="Close explore"
                className="absolute right-5 top-5 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X size={16} className="pointer-events-none" />
              </button>

              <div className="relative pr-12">
                <h2 className="title text-3xl">Explore</h2>
                <p className="mt-2 text-sm leading-6 text-white/55">Choose where to go — each card leads to its dedicated page.</p>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-3">
                {exploreItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <a key={item.title} href={item.href} onClick={() => setOpen(false)} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/70 rounded-[1.5rem]">
                      <ExploreTilt>
                        <Glass className="p-5 h-full !rounded-[1.5rem] group-hover:!border-white/25 transition" hover={false}>
                          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-violet-200">
                            <Icon size={18} />
                          </div>
                          <h3 className="title mt-4 text-xl">{item.title}</h3>
                          <p className="mt-1 text-xs leading-5 text-white/55">{item.desc}</p>
                          <span className="mt-4 inline-flex text-xs text-white/40 group-hover:text-white/70 transition">Open →</span>
                        </Glass>
                      </ExploreTilt>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
