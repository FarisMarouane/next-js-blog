import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import Aside from '../../../../components/Aside';
import Footer from '../../../../components/Footer';
import { getAllArticlesMetadata } from '../../../../utils/mdx';
import ArticlePreview from '../../../../components/ArticlePreview';
import { Locale } from '../../../../i18n-config';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = await getTranslations({ locale });
  return {
    metadataBase: new URL('https://marouanefaris.dev'),
    authors: { name: 'Marouane Faris' },
    description: t('blog_meta_description'),
    openGraph: {
      url: '/blog',
      type: 'website',
      title: t('blog_og_title'),
      description: t('blog_og_description'),
      images: '/images/photo_linkedin.jpeg',
    },
    twitter: {
      images: '/images/photo_linkedin.jpeg',
      card: 'summary',
      site: 'https://www.marouanefaris.dev',
      creator: '@MarouaneFaris1',
    },
  };
}

export default function Blog({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const allArticlesMetaData = getAllArticlesMetadata(locale);
  const t = useTranslations();

  return (
    <>
      <Aside locale={locale} />
      <main>
        {allArticlesMetaData
          .sort((a, b) => {
            if (a.id > b.id) return -1;
            return 1;
          })
          .map((articleMetaData) => (
            <ArticlePreview
              locale={locale}
              key={articleMetaData.id}
              title={articleMetaData.title}
              readingTime={articleMetaData.readingTime}
              publicationDate={articleMetaData.date}
              description={articleMetaData.metaDesc}
              slug={articleMetaData.slug}
            />
          ))}
      </main>
      <Footer footerTranslation={t('footer_about_me')} locale={locale} />
    </>
  );
}
