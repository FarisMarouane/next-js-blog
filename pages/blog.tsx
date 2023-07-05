import Head from 'next/head';
import Aside from '../components/Aside';
import Footer from '../components/Footer';
import { IArticleMetaData, getAllArticlesMetadata } from '../utils/mdx';
import ArticlePreview from '../components/ArticlePreview';
import { getI18nText } from '../utils/getI18nText';

export const getStaticProps = async ({ locale }: { locale: 'en' | 'fr' }) => {
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
  locale: 'en' | 'fr';
}) {
  return (
    <>
      <Head>
        <meta name="author" content="Marouane Faris" />
        <meta
          name="description"
          content={getI18nText('blog_meta_description', locale)}
        />
        <meta property="og:url" content="https://www.marouanefaris.dev/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={getI18nText('blog_og_title', locale)}
        />
        <meta
          property="og:description"
          content={getI18nText('blog_og_description', locale)}
        />
        <meta property="og:image" content="/photo_linkedin.jpeg" />
        <link rel="icon" href="/favicon.png" type="image/png" />
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
