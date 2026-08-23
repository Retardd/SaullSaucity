import { ArrowUpRight, Sparkles } from 'lucide-react';
import { server, features } from '@/constants/content';
import { Glass, Button } from '@/components/ui/glass';
import { LogoCard } from '@/components/page/logo-card';
import { ExploreButton } from '@/components/page/explore-modal';

export default function Home() {
  return <><section className="relative flex min-h-[54vh] items-center overflow-hidden lg:min-h-[60vh]"><div className="temple"/><div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pt-16 lg:grid-cols-[1.35fr_.65fr]"><div><p className="eyebrow">A Discord Society · Est. 2024</p><h1 className="title mt-5 max-w-3xl text-6xl leading-[.9] md:text-8xl">{server.name}</h1><p className="mt-7 max-w-lg text-base leading-8 text-white/60">{server.tagline} An elegant community built around connection, creativity, and the stories we carry.</p><div className="mt-9 flex flex-wrap gap-3"><Button href="/join" className="!bg-white !text-black">Enter the Society <ArrowUpRight size={16}/></Button><ExploreButton /></div></div><LogoCard/></div></section><section className="mx-auto max-w-6xl px-5 pb-14 pt-6"><p className="eyebrow">Why join</p><div className="mt-5 grid gap-4 md:grid-cols-3">{features.map((f, i) => <Glass key={f.title} className="p-7"><Sparkles size={18} className="text-violet-200"/><h2 className="title mt-9 text-2xl">{f.title}</h2><p className="mt-3 text-sm leading-7 text-white/50">{f.text}</p><span className="mt-8 block font-mono text-xs text-white/30">0{i + 1}</span></Glass>)}</div></section></>;
}
