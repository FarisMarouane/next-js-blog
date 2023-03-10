import Link from 'next/link';
import { Montserrat } from '@next/font/google';
import styles from '../styles/components/ArticlePreview.module.css';

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
    <article>
      <header>
        <h2 className={`${styles.title} ${font.className}`}>
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>
        <small>
          {publicationDate}&nbsp;&bull;&nbsp;{readingTime}
        </small>
      </header>
      <p>{description}</p>
    </article>
  );
};

export default ArticlePreview;
