import Link from 'next/link';
import { ReactNode } from 'react';
import styles from '../styles/components/ArticleNavigation.module.css';

export interface IArticleLink {
  path: string;
  name: string;
  id: number;
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
    const isLastArticle = currentArticleId !== 0;
    jsxToRender = (
      <li style={{ marginLeft: `${!isLastArticle && 'auto'}` }}>
        <Link
          rel={isLastArticle ? 'prev' : 'next'}
          href={articlesLinks[0].path}
        >
          {isLastArticle && '← '} {articlesLinks[0].name}{' '}
          {!isLastArticle && ' →'}
        </Link>
      </li>
    );
  } else {
    jsxToRender = articlesLinks.map(({ path, name }, index) => (
      <li key={name}>
        <Link rel={index === 0 ? 'prev' : 'next'} href={path}>
          {index === 0 && '← '} {name} {index === 1 && ' →'}
        </Link>
      </li>
    ));
  }

  return (
    <nav>
      <ul className={styles.unorderedList}>{jsxToRender}</ul>
    </nav>
  );
};

export default ArticleNavigation;
