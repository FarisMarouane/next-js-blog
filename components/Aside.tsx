import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from '../styles/components/Aside.module.css';
import { Locale } from '../i18n-config';
import { Link } from '../src/navigation';

const Aside = ({ locale }: { locale: Locale }) => {
  const t = useTranslations();
  return (
    <aside className={styles.aside}>
      <Image
        className={styles.profile_pic}
        src="/images/photo_linkedin.jpeg"
        alt="marouane_faris_profile_pic"
        width={56}
        height={56}
      />
      <p>
        {t('aside_text_0')} <Link href="/">Marouane Faris</Link>
        .
        <br />
        {t('aside_text_1')}
        <br />
        <br />
        {t('aside_text_2')}{' '}
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          Next JS
        </a>
      </p>
    </aside>
  );
};

export default Aside;
