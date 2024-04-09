import { Montserrat } from 'next/font/google';
import { useTranslations } from 'next-intl';

import '../../styles/globals.css';
import style from '../../styles/components/404.module.css';
import { unstable_setRequestLocale } from 'next-intl/server';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

// Render error page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  unstable_setRequestLocale('en');

  const t = useTranslations();
  return (
    <div className={`${style['not-found-error-page']} ${font.className}`}>
      <h1 className={style['error-code']}>404</h1>
      <h2>{t('404_error_message')}</h2>
    </div>
  );
}
