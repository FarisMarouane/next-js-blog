import Image from 'next/image';

import styles from '../styles/components/Aside.module.css';

const Aside = () => (
  <aside>
    <div className={styles.aside}>
      <Image
        className={styles.profile_pic}
        src="/photo_linkedin.jpeg"
        alt="marouane_faris_profile_pic"
        width={56}
        height={56}
      />
      <p className={styles.description}>
        Personal blog by{' '}
        <a
          href="https://github.com/FarisMarouane/"
          target="_blank"
          rel="noreferrer"
        >
          Marouane Faris
        </a>
        .
        <br />
        Ideas expressed on this blog are stricly my own, and not those of
        potential employers.
      </p>
    </div>
  </aside>
);

export default Aside;
