import Link from 'next/link';
import { ReactNode } from 'react';
import styles from '../styles/components/ArticleNavigation.module.css';

export interface IArticleLink {
  path: string;
  name: string;
}

const ArticleNavigation = ({
  articlesLinks,
  currentArticleId,
}: {
  articlesLinks: IArticleLink[];
  currentArticleId: number;
}) => {
  let jsxToRender: ReactNode;

  if (articlesLinks.length === 1) {
    const isFirstArticle = currentArticleId === 0;
    jsxToRender = (
      <li
        key={currentArticleId}
        style={{ marginLeft: `${isFirstArticle && 'auto'}` }}
      >
        <Link
          rel={isFirstArticle ? 'next' : 'prev'}
          href={articlesLinks[0].path}
        >
          {!isFirstArticle && '← '}
          {articlesLinks[0].name} {isFirstArticle && ' →'}
        </Link>
      </li>
    );
  } else {
    jsxToRender = articlesLinks.map(({ path, name }, index) => (
      <li key={name}>
        <Link rel={index === 0 ? 'next' : 'prev'} href={path}>
          {index === 0 && '← '} {name} {index === 1 && ' →'}
        </Link>
      </li>
    ));
  }

  return (
    <nav style={{ marginTop: '20px' }}>
      <ul className={styles.unorderedList}>{jsxToRender}</ul>
    </nav>
  );
};

export default ArticleNavigation;
