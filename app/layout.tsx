import type { Metadata } from 'next';
import Script from 'next/script';
import { Merriweather } from 'next/font/google';

import Layout from './components/Layout';
import './style/global.css';

export const metadata: Metadata = {
  title: 'Marouane Faris',
  viewport: 'width=device-width, initial-scale=1',
  colorScheme: 'light dark',
  manifest: '/manifest.json',
  icons: [{ rel: 'icon', url: '/favicon.png', type: 'image/png' }],
};

const font = Merriweather({ subsets: ['latin'], weight: '400' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={font.className} lang="en">
      <Script
        async
        src="https://cdn.jsdelivr.net/npm/pwacompat"
        crossOrigin="anonymous"
      />
      <Script src="/scripts.js" />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
