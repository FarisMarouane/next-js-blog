import { Merriweather } from '@next/font/google';
import ContextProvider from '../components/ContextProvider';
import '../styles/globals.css';
import '../styles/components/Toggle.css';
import Layout from '../components/Layout';
import { AppProps } from 'next/app';

const font = Merriweather({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        <>
          <style jsx global>{`
            html {
              font-family: ${font.style.fontFamily};
              font-weight: 400;
              word-wrap: break-word;
              font-kerning: normal;
            }
          `}</style>
          <Component {...pageProps} />
        </>
      </Layout>
    </ContextProvider>
  );
}
