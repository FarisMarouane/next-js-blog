import { unstable_setRequestLocale } from 'next-intl/server';

import '../../../styles/globals.css';
import '../../../styles/components/Toggle.css';
import { i18n, Locale } from '../../../i18n-config';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  return <>{children}</>;
}
