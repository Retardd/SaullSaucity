'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { House, Menu, X, LogOut, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { nav, server } from '@/constants/content';
import { Button } from '@/components/ui/glass';
import { ExperienceLayer } from './experience-layer';
import Image from 'next/image';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    setProfileOpen(false);
  };

  const renderAuthButton = () => {
    if (!mounted) return <Button href="/login" className="!px-4 !py-2 text-xs">Login</Button>;
    if (session?.user?.image) {
      return (
        <div className="relative flex items-center gap-2">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="relative h-9 w-9 rounded-full overflow-hidden border border-white/10 ring-1 ring-white/5 hover:ring-violet-300/30 transition"
            aria-label="Profile"
          >
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              fill
              sizes="36px"
              className="object-cover"
            />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-white/[0.06] p-2 backdrop-blur-xl shadow-2xl z-50"
              >
                <div className="flex items-center gap-3 px-2 py-3">
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
                    <p className="text-xs text-white/40 truncate">@{session.user.name?.toLowerCase().replace(/\s+/g, '')}</p>
                  </div>
                </div>
                <div className="border-t border-white/10"></div>
                <button
                  onClick={() => { setProfileOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-white/70 hover:bg-white/5 rounded-lg"
                >
                  <User size={14} /> Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 rounded-lg"
                >
                  <LogOut size={14} /> Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
    return <Button href="/login" className="!px-4 !py-2 text-xs">Login</Button>;
  };

  return (
    <>
      <ExperienceLayer />
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-6xl items-center justify-between rounded-full px-3 py-2 glass md:w-[calc(100%-4rem)]">
          <a href="/" aria-label="Home" className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
            <House size={16} />
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.slice(1).map(n => (
              <a
                key={n.href}
                href={n.href}
                className={`rounded-full px-3 py-2 text-xs transition ${
                  path === n.href ? 'bg-white/13 text-white' : 'text-white/55 hover:text-white'
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {renderAuthButton()}
            <button
              onClick={() => setMenu(!menu)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 md:hidden"
              aria-label="Toggle navigation"
            >
              {menu ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </header>
        <AnimatePresence>
          {menu && (
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              className="fixed left-4 right-4 top-20 z-40 rounded-[2rem] p-3 glass md:hidden"
            >
              {nav.map(n => (
                <a
                  onClick={() => setMenu(false)}
                  key={n.href}
                  href={n.href}
                  className="block rounded-2xl px-5 py-3 text-sm text-white/70 hover:bg-white/10"
                >
                  {n.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="mx-auto mt-24 w-[calc(100%-2rem)] max-w-6xl rounded-t-[2rem] border-x border-t border-white/10 bg-white/[.035] px-7 py-9 text-sm text-white/45">
          <div className="flex flex-wrap justify-between gap-6">
            <div>
              <p className="title text-xl text-white">{server.name}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={server.invite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[.06] px-3 py-2 text-center text-xs text-white/70 transition duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[.12] hover:text-white hover:shadow-lg hover:shadow-black/30 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Discord
              </a>
              <a
                href="https://www.instagram.com/kaiiner.fr?igsh=dGU0bXh2dDBpYjg3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[.06] px-3 py-2 text-center text-xs text-white/70 transition duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[.12] hover:text-white hover:shadow-lg hover:shadow-black/30 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Instagram
              </a>
              <a
                href="/tickets"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[.06] px-3 py-2 text-center text-xs text-white/70 transition duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[.12] hover:text-white hover:shadow-lg hover:shadow-black/30 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}