import { Metadata, Viewport } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

import '../../../styles/globals.css';
import '../../../styles/components/Toggle.css';
import Layout from '../../../components/Layout';
import ContextProvider from '../../../components/ContextProvider';
import { i18n, Locale } from '../../../i18n-config';

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

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body>
        <ContextProvider>
          <Layout locale={locale}>{children}</Layout>
        </ContextProvider>
      </body>
    </html>
  );
}
