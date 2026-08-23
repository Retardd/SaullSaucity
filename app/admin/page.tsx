'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, LogOut, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { Glass } from '@/components/ui/glass';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type AdminItem = {
  id: string;
  name: string;
  avatar?: string;
  imageUrl?: string;
  image?: string;
  imageAlt?: string;
  description?: string;
  role?: string;
  title?: string;
  specialThanksImage?: string;
  specialThanksName?: string;
  user?: string;
  tag?: string;
};

type Section = {
  key: 'souls' | 'staff' | 'gallery' | 'owner' | 'ownerSpecialThanks';
  label: string;
  items: AdminItem[];
  imageField: 'avatar' | 'imageUrl' | 'image' | 'specialThanksImage';
  nameField: 'name' | 'title' | 'specialThanksName';
};

export default function AdminPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);

  useEffect(() => {
    const logged = sessionStorage.getItem('admin_logged_in') === 'true';
    if (!logged) {
      router.replace('/login');
    } else {
      setIsAdmin(true);
      fetchContent();
    }
    setChecked(true);
  }, [router]);

  const broadcastUpdate = () => {
    try {
      localStorage.setItem('zanpakuto_update', Date.now().toString());
      window.dispatchEvent(new CustomEvent('zanpakuto:update'));
      new BroadcastChannel('zanpakuto:update').postMessage('update');
    } catch {}
  };

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content', { cache: 'no-store' });
      const data = await res.json();
      const newSections: Section[] = [
        { key: 'souls', label: 'Souls', items: data.souls || [], imageField: 'avatar', nameField: 'name' },
        { key: 'staff', label: 'Staff', items: data.staff || [], imageField: 'avatar', nameField: 'name' },
        { key: 'gallery', label: 'Gallery', items: data.gallery || [], imageField: 'imageUrl', nameField: 'title' },
        { key: 'owner', label: 'Owner Card', items: data.owner ? [data.owner] : [], imageField: 'image', nameField: 'name' },
        { key: 'ownerSpecialThanks', label: 'Special Thanks (Chachaa)', items: data.owner && data.owner.specialThanksImage ? [{ ...data.owner, image: data.owner.specialThanksImage, name: data.owner.specialThanksName }] : [], imageField: 'specialThanksImage', nameField: 'specialThanksName' },
      ];
      setSections(newSections);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    router.push('/login');
  };

  const addToast = (msg: string) => {
    setToasts(prev => [...prev, msg]);
    setTimeout(() => setToasts(prev => prev.slice(1)), 3000);
  };

  const handleImageChange = async (sectionKey: string, itemId: string, imageField: string, file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        await updateImageInDB(sectionKey, itemId, imageField, data.url);
        addToast('Image updated successfully');
      } else {
        addToast('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (e) {
      addToast('Upload error');
    }
  };

  const updateImageInDB = async (sectionKey: string, itemId: string, imageField: string, imageUrl: string) => {
    let type: string;
    switch (sectionKey) {
      case 'souls': type = 'soul'; break;
      case 'staff': type = 'staff'; break;
      case 'gallery': type = 'gallery'; break;
      case 'owner': type = 'owner'; break;
      case 'ownerSpecialThanks': type = 'ownerSpecialThanks'; break;
      default: return;
    }

    const res = await fetch('/api/admin/update-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id: itemId, imageUrl }),
    });
    if (res.ok) {
      fetchContent();
      broadcastUpdate();
    }
  };

  const handleFileSelect = (sectionKey: string, itemId: string, imageField: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageChange(sectionKey, itemId, imageField, file);
  };

  if (!checked) {
    return <div className="grid min-h-[60vh] place-items-center p-10 text-white/50">Checking...</div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">Admin Panel</p>
          <h1 className="title mt-2 text-4xl">Image Editor</h1>
          <p className="mt-2 text-sm text-white/55">Replace any card image across the site. Click an image to upload a new one.</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70 hover:bg-white/10"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {loading && <div className="mt-4 flex items-center gap-2 text-white/50"><Loader2 className="h-5 w-5 animate-spin" /> Loading content...</div>}

      {!loading && sections.map(section => (
        section.items.length > 0 && (
          <Glass key={section.key} className="mt-6 p-6" hover={false}>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet-200 mb-4">{section.label}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {section.items.map(item => {
                const currentImage = item[section.imageField] as string;
                const itemName = item[section.nameField] as string;
                return (
                  <div key={item.id} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 relative">
                      {currentImage ? (
                        <Image
                          src={currentImage}
                          alt={itemName}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/30 text-sm">No image</div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <label className="cursor-pointer">
                          <Upload className="h-8 w-8 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={e => handleFileSelect(section.key, item.id, section.imageField, e)}
                          />
                        </label>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-white truncate">{itemName}</p>
                    {currentImage && (
                      <p className="text-[10px] text-white/30 truncate font-mono">{currentImage}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </Glass>
        )
      ))}

      {!loading && sections.every(s => s.items.length === 0) && (
        <Glass className="mt-6 p-8 text-center" hover={false}>
          <ImageIcon className="mx-auto h-12 w-12 text-white/30" />
          <p className="mt-4 text-white/60">No content found. Run the seed script to populate the database.</p>
        </Glass>
      )}

      <AnimatePresence>
        {toasts.map((toast, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white backdrop-blur-xl shadow-lg"
          >
            {toast}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}