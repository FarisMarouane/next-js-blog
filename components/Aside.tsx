import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/components/Aside.module.css';

const Aside = () => (
  <aside className={styles.aside}>
    <Image
      className={styles.profile_pic}
      src="/photo_linkedin.jpeg"
      alt="marouane_faris_profile_pic"
      width={56}
      height={56}
    />
    <p>
      Personal blog by <Link href="/about_me">Marouane Faris</Link>
      .
      <br />
      Ideas expressed on this blog are stricly my own, and not those of
      potential employers.
      <br />
      <br />
      Made using the{' '}
      <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
        Next JS framework
      </a>
    </p>
  </aside>
);

export default Aside;
