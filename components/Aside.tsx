import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/components/Aside.module.css';
import { getI18nText } from '../utils/getI18nText';

const Aside = ({ locale }: { locale: 'en' | 'fr' }) => {
  return (
    <aside className={styles.aside}>
      <Image
        className={styles.profile_pic}
        src="/photo_linkedin.jpeg"
        alt="marouane_faris_profile_pic"
        width={56}
        height={56}
      />
      <p>
        {getI18nText('aside_text_0', locale)}{' '}
        <Link href="/">Marouane Faris</Link>
        .
        <br />
        {getI18nText('aside_text_1', locale)}
        <br />
        <br />
        {getI18nText('aside_text_2', locale)}{' '}
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          Next JS
        </a>
      </p>
    </aside>
  );
};

export default Aside;
