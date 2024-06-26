import { useRouter } from 'next/router';
import style from '../styles/components/404.module.css';
import { Montserrat } from 'next/font/google';
import { getI18nText } from '../utils/getI18nText';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

export default function Custom404() {
  const { locale } = useRouter();
  return (
    <div className={`${style['not-found-error-page']} ${font.className}`}>
      <h1 className={style['error-code']}>404</h1>
      <h2>{getI18nText('404_error_message', locale as 'en' | 'fr')}</h2>
    </div>
  );
}
