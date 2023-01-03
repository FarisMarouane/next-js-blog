import '../styles/globals.css';
import '../styles/components/Toggle.css';
import { Merriweather } from '@next/font/google';

const font = Merriweather({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />;
    </>
  );
}
