import Script from 'next/script';
import { Merriweather } from '@next/font/google';
import { AppProps } from 'next/app';
import Head from 'next/head';
import ContextProvider from '../components/ContextProvider';
import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';
import '../styles/globals.css';
import '../styles/components/Toggle.css';

const font = Merriweather({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Marouane Faris</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ContextProvider>
        <Layout>
          <>
            <Script
              async
              src="https://cdn.jsdelivr.net/npm/pwacompat"
              crossOrigin="anonymous"
            />
            <Script src="/scripts.js" />
            <style jsx global>{`
              html {
                font-family: ${font.style.fontFamily};
                font-weight: 400;
                word-wrap: break-word;
                font-kerning: normal;
              }
            `}</style>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </>
        </Layout>
      </ContextProvider>
    </>
  );
}
