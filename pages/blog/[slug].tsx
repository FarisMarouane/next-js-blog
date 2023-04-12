import Head from 'next/head';
import dayjs from 'dayjs';
import { Montserrat } from '@next/font/google';
import {
  IArticleMetadata,
  getAllArticlesMetadata,
  getArticleContentFromSlug,
  IArticleContent,
} from '../../utils/mdx';
import PostBody from '../../components/PostBody';
import styles from '../../styles/components/Article.module.css';
import ArticleNavigation, {
  IArticleLink,
} from '../../components/ArticleNavigation';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

interface IArticleProps {
  articleContent: IArticleContent;
  articleMetadata: IArticleMetadata;
  articlesMetadata: { slug: string; id: number; title: string }[];
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const articlesMetadata = await getAllArticlesMetadata();
  const articleContent = await getArticleContentFromSlug(slug);
  const articleMetadata = articlesMetadata.find(({ articleContentId }) => {
    return articleContentId === Number(slug);
  });

  return {
    props: {
      articleContent,
      articleMetadata,
      articlesMetadata: articlesMetadata.map(({ articleContentId, title }) => ({
        slug: String(articleContentId),
        id: articleContentId,
        title,
      })),
    },
  };
}

export async function getStaticPaths() {
  const articlesMetadata = await getAllArticlesMetadata();

  return {
    paths: articlesMetadata.map(({ articleContentId }) => ({
      params: { slug: `${articleContentId}` },
    })),
    fallback: false,
  };
}

const Article = ({
  articleContent,
  articleMetadata,
  articlesMetadata,
}: IArticleProps) => {
  const { articleContentId: currentArticleId } = articleMetadata;

  let articlesLinks: IArticleLink[] = [];

  for (const articleMetadata of articlesMetadata) {
    if (articleMetadata.id + 1 === currentArticleId) {
      articlesLinks.unshift({
        name: articleMetadata.title,
        path: articleMetadata.slug,
      });
    }

    if (articleMetadata.id - 1 === currentArticleId) {
      articlesLinks.unshift({
        name: articleMetadata.title,
        path: articleMetadata.slug,
      });
    }
  }

  return (
    <>
      <Head>
        <title>{articleMetadata.title}</title>
        <meta name="author" content="Marouane Faris" />
        <meta name="description" content={articleMetadata.metaDesc} />
        <meta
          property="og:url"
          content={`https://www.marouanefaris.dev/blog/${articleMetadata.articleContentId}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${articleMetadata.title}`} />
        <meta
          property="og:description"
          content={`${articleMetadata.metaDesc}`}
        />
      </Head>
      <main>
        <article>
          <header>
            <h1 className={font.className}>{articleMetadata.title}</h1>
            <small className={styles.small}>
              {dayjs(articleMetadata.date).format('MMMM D, YYYY')}
              &nbsp;&bull;&nbsp;
              {articleMetadata.readingTime}
              &nbsp;{' '}
              {!!articleMetadata.lastModified ? (
                <>
                  (last modified:{' '}
                  {dayjs(articleMetadata.lastModified).format('MMMM D, YYYY')})
                </>
              ) : null}
            </small>
          </header>
          <PostBody content={articleContent.article_content} />
        </article>
      </main>
      <ArticleNavigation
        currentArticleId={currentArticleId}
        articlesLinks={articlesLinks}
      />
    </>
  );
};

export default Article;
