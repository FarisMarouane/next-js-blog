import dayjs from 'dayjs';
import { Montserrat } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import {
  IArticleMetaData,
  IFrontmatterType,
  getAllArticlesMetadata,
  getArticleFromSlug,
} from '../../../../../utils/mdx';
import markdownToHtml from '../../../../../utils/markdownToHtml';
import PostBody from '../../../../../components/PostBody';
import styles from '../../../../../styles/components/Article.module.scss';
import ArticleNavigation, {
  IArticleLink,
} from '../../../../../components/ArticleNavigation';

import { Locale } from '../../../../../i18n-config';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import ReadArticle from '../../../../../components/ReadArticle';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

interface IArticleContainerProps {
  articleContent: string | undefined;
  frontmatter: IFrontmatterType | undefined;
  articlesMetadata:
    | { slug: string; id: number; title: string; lang: string }[]
    | undefined;
}

interface IArticleProps {
  articleContent: string;
  frontmatter: Omit<IArticleMetaData, 'metatitle' | 'lang'>;
  articlesMetadata: { slug: string; id: number; title: string; lang: string }[];
  locale: Locale;
}

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const articlesMetadata = getAllArticlesMetadata(locale);
  return articlesMetadata.map(({ slug }) => ({ slug }));
}

const ArticleContainer = async ({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) => {
  unstable_setRequestLocale(locale);
  const article = getArticleFromSlug(locale, slug);

  if (!article) notFound();

  const { content, frontmatter } = article;
  const articlesMetadata = getAllArticlesMetadata(locale)
    .map(({ slug, id, title, lang }) => ({
      slug,
      id,
      title,
      lang,
    }))
    .sort((a, b) => a.id - b.id);

  const htmlContent = await markdownToHtml(content);

  if (!frontmatter || !htmlContent || !articlesMetadata) return null;

  return (
    <Article
      articleContent={htmlContent}
      frontmatter={frontmatter}
      articlesMetadata={articlesMetadata}
      locale={locale}
    />
  );
};

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata | undefined> {
  const article = getArticleFromSlug(locale, slug);

  if (!article) return;

  const { frontmatter } = article;

  return {
    metadataBase: new URL('https://marouanefaris.dev'),
    title: frontmatter.title,
    authors: { name: 'Marouane Faris' },
    description: frontmatter.metaDesc,
    openGraph: {
      url: `/blog/${frontmatter.slug}`,
      siteName: 'marouanefaris.dev',
      title: frontmatter.title,
      images: '/images/photo_linkedin.jpeg',
      description: frontmatter.metaDesc,
    },
    twitter: {
      images: '/images/photo_linkedin.jpeg',
      card: 'summary',
      site: 'https://www.marouanefaris.dev',
      creator: '@MarouaneFaris1',
    },
  };
}

const Article = async ({
  articleContent,
  frontmatter,
  articlesMetadata,
  locale,
}: IArticleProps) => {
  const t = await getTranslations();
  const { id: currentArticleId } = frontmatter;

  const filteredArticlesMetadata = articlesMetadata.filter(
    (a) => a.lang === locale,
  );

  const getLastModifiedDate = () => {
    if (frontmatter.lastModified) {
      return (
        <span>
          &nbsp;&bull;&nbsp;
          {`${t('blog_article_last_modified')}:
          ${frontmatter.lastModified}`}
        </span>
      );
    }
    return;
  };

  let articlesLinks: IArticleLink[] = [];

  for (const articleMetadata of filteredArticlesMetadata) {
    // previous article
    if (articleMetadata.id + 1 === currentArticleId) {
      articlesLinks.push({
        name: articleMetadata.title,
        path: articleMetadata.slug,
      });
    }

    // next article
    if (articleMetadata.id - 1 === currentArticleId) {
      articlesLinks.push({
        name: articleMetadata.title,
        path: articleMetadata.slug,
      });
    }
  }

  return (
    <>
      <main>
        <article>
          <header>
            <h1 className={font.className}>
              {frontmatter.title}{' '}
              <ReadArticle
                articleContent={articleContent}
                locale={locale}
                titleTranslation={t('read_article_aloud')}
              />
            </h1>
            <small className={styles.small}>
              {dayjs(frontmatter.date).format('MMMM D, YYYY')}
              &nbsp;&bull;&nbsp;
              {frontmatter.readingTime}
              {getLastModifiedDate()}
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

export default ArticleContainer;
