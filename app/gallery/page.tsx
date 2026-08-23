'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PageHero } from '@/components/page/page-hero';
import { Glass } from '@/components/ui/glass';

type GalleryItem = { id: string; title: string | null; imageUrl: string; tag: string | null };

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  useEffect(() => {
    const load = () => fetch('/api/gallery', { cache: 'no-store' }).then(r => r.json()).then(setItems).catch(() => {});
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

  return <>
    <PageHero eyebrow="Fragments of the Society" title="The archive">A future home for moments, artwork, and memories shared by our community.</PageHero>
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 md:grid-cols-4">
      {(items.length ? items : Array.from({length:8}, (_,i)=> ({id:String(i), title:`Archive · ${String(i+1).padStart(2,'0')}`, imageUrl: '', tag: `Archive ${i+1}`} as GalleryItem))).map((item,i) => (
        <Glass key={item.id} className={`relative min-h-40 overflow-hidden p-0 ${i===0||i===5?'md:col-span-2 md:min-h-64':''}`}>
          {item.imageUrl ? <Image src={item.imageUrl} alt={item.title || 'Archive'} fill className="object-cover" sizes="(max-width:768px)50vw,25vw" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(176,129,219,.24),transparent_30%),linear-gradient(140deg,transparent,rgba(31,17,44,.8))]" />}
          <span className="relative eyebrow p-4 block">{item.title || `Archive · ${String(i+1).padStart(2,'0')}`}</span>
        </Glass>
      ))}
    </div>
  </>;
}