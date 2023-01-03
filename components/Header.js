import styles from '../styles/components/Header.module.css';
import Link from 'next/link';

import { Montserrat } from '@next/font/google';
import ToggleInput from './Toggle';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

const Header = ({ title }) => (
  <header className={`${styles.header} ${font.className}`}>
    <h1 className={styles.title}>
      <Link href="/">{title}</Link>
    </h1>
    <ToggleInput />
  </header>
);

export default Header;
