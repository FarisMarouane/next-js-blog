import { Metadata } from 'next';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import markdownToHtml from '../../../utils/markdownToHtml';
import PostBody from '../../../components/PostBody';
import Footer from '../../../components/Footer';
import { Locale } from '../../../i18n-config';

const resumeFileName = 'about_me';

type props = {
  params: {
    locale: Locale;
  };
};

export async function generateMetadata({
  params: { locale },
}: props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return {
    metadataBase: new URL('https://marouanefaris.dev'),
    title: t('home_head_title'),
    authors: { name: 'Marouane Faris' },
    description: t('home_meta_description'),
    openGraph: {
      url: '/',
      type: 'profile',
      title: t('home_og_title'),
      description: t('home_og_description'),
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

const Home = async ({ params: { locale } }: props) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const resumeDir = path.join(
    path.join(process.cwd(), 'data'),
    `${resumeFileName}.${locale}.md`,
  );
  const source = fs.readFileSync(resumeDir);
  const { content } = matter(source);

  const articleContent = await markdownToHtml(content);
  return (
    <>
      <main>
        <article>
          <PostBody content={articleContent} />
        </article>
      </main>
      <Footer footerTranslation={t('footer_about_me')} locale={locale} />
    </>
  );
};

export default Home;
