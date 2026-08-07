import type { Metadata } from 'next';
import './globals.css';
import { SiteShell } from '@/components/layout/site-shell';
export const metadata: Metadata = { title: 'Ꚃ𝑜𝓊𝓁 Ꚃ𝑜𝒸𝒾𝑒𝓉𝓎 | ࣪ ִֶָ☾.', description: 'An elegant Discord community.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>; }
