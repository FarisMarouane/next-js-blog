import { useTranslations } from 'next-intl';

import style from '../../../styles/components/404.module.css';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className={`${style['not-found-error-page']} ${font.className}`}>
      <h1 className={style['error-code']}>404</h1>
      <h2>{t('404_error_message')}</h2>
    </div>
  );
}
