import { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import '../styles/components/Toggle.css';
import Layout from '../components/Layout';
import ContextProvider from '../components/ContextProvider';
import { Locale } from '../i18n-config';

export const viewport: Viewport = {
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Marouane Faris',
  icons: [{ url: '/images/favicon.png', type: 'image/png' }],
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={lang}>
      <body>
        <ContextProvider>
          <Layout>{children}</Layout>
        </ContextProvider>
      </body>
    </html>
  );
}
