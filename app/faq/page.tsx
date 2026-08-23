'use client';
import React from 'react'; import { Search } from 'lucide-react'; import { PageHero } from '@/components/page/page-hero'; import { Accordion } from '@/components/page/accordion'; import { faqs } from '@/constants/content';

export default function FAQ() {
  const [query, setQuery] = React.useState('');

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(query.toLowerCase()) || 
    f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <PageHero eyebrow="A little clarity" title="Frequently asked">
        Everything you may want to know before you enter.
      </PageHero>
      <div className="mx-auto mb-5 flex max-w-3xl items-center gap-3 rounded-full px-5 py-3 glass">
        <Search size={16} className="text-white/45"/>
        <input
          aria-label="Search frequently asked questions"
          placeholder="Search the archives"
          className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div>{filteredFaqs.length === 0 && <p className="text-white/40 text-sm mt-4">No results found. Try a different keyword.</p>}</div>
      <Accordion items={filteredFaqs.length > 0 ? filteredFaqs : faqs}/>
    </>
  );
}