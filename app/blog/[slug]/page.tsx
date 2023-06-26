import Head from 'next/head';
import { Montserrat } from '@next/font/google';
import dayjs from 'dayjs';

import { getAllArticlesMetadata, getArticleFromSlug } from '../../../utils/mdx';
import markdownToHtml from '../../../utils/markdownToHtml';
import PostBody from '../../components/PostBody';
import styles from './Article.module.css';
import ArticleNavigation, {
  IArticleLink,
} from '../../components/ArticleNavigation';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

export async function getArticleData(slug: string) {
  const { content, frontmatter } = getArticleFromSlug(slug);
  const articlesMetadata = getAllArticlesMetadata();

  const htmlContent = await markdownToHtml(content);

  return {
    articleContent: htmlContent,
    frontmatter,
    articlesMetadata: articlesMetadata.map(({ slug, id, title }) => ({
      slug,
      id,
      title,
    })),
  };
}

export function generateStaticParams() {
  const articlesMetadata = getAllArticlesMetadata();

  return articlesMetadata.map(({ slug }) => ({ params: { slug } }));
}

const Article = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { articleContent, frontmatter, articlesMetadata } =
    await getArticleData(slug);
  const { id: currentArticleId } = frontmatter;

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
        <title>{frontmatter.title}</title>
        <meta name="author" content="Marouane Faris" />
        <meta name="description" content={frontmatter.metaDesc} />
        <meta
          property="og:url"
          content={`https://www.marouanefaris.dev/blog/${frontmatter.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${frontmatter.title}`} />
        <meta property="og:description" content={`${frontmatter.metaDesc}`} />
      </Head>
      <main>
        <article>
          <header>
            <h1 className={font.className}>{frontmatter.title}</h1>
            <small className={styles.small}>
              {dayjs(frontmatter.date).format('MMMM D, YYYY')}
              &nbsp;&bull;&nbsp;
              {frontmatter.readingTime}
              &nbsp; (last modified: {frontmatter.lastModified})
            </small>
          </header>
          <PostBody content={articleContent} />
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
