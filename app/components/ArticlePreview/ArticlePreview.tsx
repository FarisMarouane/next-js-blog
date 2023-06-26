import Link from 'next/link';
import { Montserrat } from 'next/font/google';

import styles from './ArticlePreview.module.css';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

interface IArticlePreviewProps {
  title: string;
  publicationDate: string;
  readingTime: string;
  description: string;
  slug: string;
}

const ArticlePreview = ({
  title,
  publicationDate,
  readingTime,
  description,
  slug,
}: IArticlePreviewProps) => {
  return (
    <article className={styles.article}>
      <header>
        <h2 className={`${styles.title} ${font.className}`}>{title}</h2>
      </header>
      <small className={styles.small}>
        {publicationDate}&nbsp;&bull;&nbsp;{readingTime}
      </small>
      <p className={`${styles.articlePreview} articlePreview`}>{description}</p>
      <Link className="articlePreviewLink" href={`/blog/${slug}`} />
    </article>
  );
};

export default ArticlePreview;
