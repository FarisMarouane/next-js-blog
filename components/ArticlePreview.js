import Link from 'next/link';
import { Montserrat } from '@next/font/google';
import styles from '../styles/components/ArticlePreview.module.css';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

const ArticlePreview = ({
  title,
  publicationDate,
  readingTime,
  description,
  slug,
}) => {
  return (
    <>
      <header>
        <h3 className={`${styles.title} ${font.className}`}>
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <small>
          {publicationDate}&nbsp;&bull;&nbsp;{readingTime}
        </small>
      </header>
      <p>{description}</p>
    </>
  );
};

export default ArticlePreview;
