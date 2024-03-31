import Head from 'next/head';
import Aside from '../components/Aside';
import Footer from '../components/Footer';
import { IArticleMetaData, getAllArticlesMetadata } from '../utils/mdx';
import ArticlePreview from '../components/ArticlePreview';
import { getI18nText } from '../utils/getI18nText';
import { Locale } from '../i18n-config';

export const getStaticProps = async ({ locale }: { locale: Locale }) => {
  const allArticlesMetaData = getAllArticlesMetadata(locale);
  return {
    props: { allArticlesMetaData, locale },
  };
};

export default function Blog({
  allArticlesMetaData,
  locale,
}: {
  allArticlesMetaData: IArticleMetaData[];
  locale: Locale;
}) {
  return (
    <>
      <Head>
        <meta name="author" content="Marouane Faris" />
        <meta
          name="description"
          content={getI18nText('blog_meta_description', locale)}
        />
        <meta property="og:url" content="https://www.marouanefaris.dev/blog" />
        <meta property="og:site_name" content="marouanefaris.dev" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={getI18nText('blog_og_title', locale)}
        />
        <meta
          property="og:description"
          content={getI18nText('blog_og_description', locale)}
        />
        <meta property="og:image" content="/images/photo_linkedin.jpeg" />
        <meta
          property="twitter:image"
          content="https://www.marouanefaris.dev/images/photo_linkedin.jpeg"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="https://www.marouanefaris.dev" />
        <meta name="twitter:creator" content="@MarouaneFaris1" />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </Head>
      <Aside locale={locale} />
      <main>
        {allArticlesMetaData
          .sort((a, b) => {
            if (a.id > b.id) return -1;
            return 1;
          })
          .map((articleMetaData) => (
            <ArticlePreview
              key={articleMetaData.id}
              title={articleMetaData.title}
              readingTime={articleMetaData.readingTime}
              publicationDate={articleMetaData.date}
              description={articleMetaData.metaDesc}
              slug={articleMetaData.slug}
            />
          ))}
      </main>
      <Footer locale={locale} />
    </>
  );
}
