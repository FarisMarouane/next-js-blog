import Link from 'next/link';
import styles from '../styles/components/Article.module.css';

const Article = ({
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

export default Article;
