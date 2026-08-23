import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import './globals.css';
import { SiteShell } from '@/components/layout/site-shell';
import ClickSpark from '@/components/ui/click-spark';

export const metadata: Metadata = {
  title: 'Ꚃ𝑜𝓊𝓁 Ꚃ𝑜𝒸𝒾𝑒𝓉𝓎 | ࣪ ִֶָ☾.',
  description: 'An elegant Discord community.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClickSpark sparkColor="#c6a9db" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
            <SiteShell>{children}</SiteShell>
          </ClickSpark>
        </Providers>
      </body>
    </html>
  );
}