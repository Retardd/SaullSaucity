'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Glass, Button } from '@/components/ui/glass';
import { PageHero } from '@/components/page/page-hero';
import { OwnerTiltCard } from '@/components/page/owner-tilt-card';
import { MessageCircle, Instagram } from 'lucide-react';

type OwnerData = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  image: string;
  imageAlt: string;
  name: string;
  role: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  footer: string;
  footerCode: string;
  socials: { discord: string; instagram: string; instagram2: string };
  socialEyebrow: string;
  socialTitle: string;
  socialSubtitle: string;
  specialThanks: { cardTitle: string; name: string; image: string; role: string; highlights: string[] };
};

export function OwnerContent() {
  const [data, setData] = useState<OwnerData | null>(null);

  useEffect(() => {
    const load = () => fetch('/api/owner', { cache: 'no-store' }).then(r => r.json()).then(d => setData(d)).catch(() => {});
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

  if (!data) return <div className="grid min-h-[50vh] place-items-center text-white/50">Loading...</div>;

  return (
    <>
      <PageHero eyebrow={data.heroEyebrow} title={data.heroTitle}>
        {data.heroSubtitle}
      </PageHero>

      <div className="mx-auto max-w-6xl px-5 pb-20">
        <OwnerTiltCard>
          <Glass className="mx-auto max-w-2xl overflow-hidden p-0" hover={false}>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image src={data.image} alt={data.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 672px" className="object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2 className="title text-4xl text-white md:text-5xl">{data.name}</h2>
                <p className="mt-1 text-sm tracking-widest text-white/70">{data.role}</p>
              </div>
            </div>
            <div className="p-7 md:p-9">
              <h3 className="title mt-3 text-2xl">{data.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/65">{data.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {data.tags.map(tag => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-6 border-t border-white/10 pt-6 text-xs leading-6 text-white/35">
                {data.footer} <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">{data.footerCode}</code>
              </p>
            </div>
          </Glass>
        </OwnerTiltCard>

        <div className="mx-auto mt-6 max-w-2xl">
          <OwnerTiltCard>
            <Glass className="p-7 text-center md:p-8" hover={false}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">{data.specialThanks.cardTitle}</p>
              <div className="relative mx-auto mt-6 h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-white/5">
                <Image src={data.specialThanks.image} alt={data.specialThanks.name} fill sizes="112px" className="object-cover" />
              </div>
              <h3 className="title mt-5 text-2xl">{data.specialThanks.name}</h3>
              <p className="mt-1 text-sm tracking-widest text-violet-200">{data.specialThanks.role}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {data.specialThanks.highlights.map(tag => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </Glass>
          </OwnerTiltCard>
        </div>

        <div className="mx-auto mt-6 max-w-2xl">
          <OwnerTiltCard>
            <Glass className="p-7 text-center md:p-8" hover={false}>
              <h3 className="title mt-3 text-2xl">{data.socialTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">{data.socialSubtitle}</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href={data.socials.instagram2} external className="!px-6">
                  <Instagram size={16} /> Chachaa
                </Button>
                <Button href={data.socials.discord} external className="!px-6">
                  <MessageCircle size={16} /> Discord
                </Button>
                <Button href={data.socials.instagram} external className="!px-6">
                  <Instagram size={16} /> Sevaan
                </Button>
              </div>
            </Glass>
          </OwnerTiltCard>
        </div>
      </div>
    </>
  );
}
