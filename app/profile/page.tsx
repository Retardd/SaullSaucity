'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { Glass, Button } from '@/components/ui/glass';
import { LogOut, Mail, User, Settings } from 'lucide-react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-5 py-16">
        <div className="text-center text-white/50">Loading...</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Glass className="p-8 md:p-9" hover={false}>
          <div className="text-center">
            <div className="relative mx-auto h-28 w-28 rounded-full overflow-hidden border border-white/10 bg-white/5">
              <Image
                src={user.image || '/placeholder.png'}
                alt={user.name || 'User'}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <h1 className="title mt-6 text-3xl">{user.name}</h1>
            <p className="mt-1 text-sm text-white/50">@{user.name?.toLowerCase().replace(/\s+/g, '')}</p>

            <div className="mt-8 grid gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/40">Email</p>
                  <p className="text-sm text-white">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/40">Discord ID</p>
                  <p className="text-sm text-white font-mono">{(user as any).id || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex-1"
              >
                <LogOut size={16} className="mr-2" /> Sign out
              </Button>
            </div>
          </div>
        </Glass>

        <p className="mt-6 text-center text-xs text-white/30">
          Connected via Discord
        </p>
      </div>
    </div>
  );
}