import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

import markdownToHtml from '../utils/markdownToHtml';
import PostBody from '../components/PostBody';
import Footer from '../components/Footer';
import { getI18nText } from '../utils/getI18nText';
import { Locale } from '../i18n-config';
import { Metadata } from 'next';

const resumeFileName = 'about_me';
const locale = 'fr';

export const metaData: Metadata = {
  title: getI18nText('home_head_title', locale),
  authors: { name: 'Marouane Faris' },
  description: getI18nText('home_meta_description', locale),
  openGraph: {
    url: 'https://www.marouanefaris.dev',
    type: 'profile',
    title: getI18nText('home_og_title', locale),
    description: getI18nText('home_og_description', locale),
    images: 'https://www.marouanefaris.dev/images/photo_linkedin.jpeg',
  },
  twitter: {
    images: 'https://www.marouanefaris.dev/images/photo_linkedin.jpeg',
    card: 'summary',
    site: 'https://www.marouanefaris.dev',
    creator: '@MarouaneFaris1',
  },
};

const Home = async ({ locale = 'fr' }: { locale: Locale }) => {
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
      <Footer locale={locale} />
    </>
  );
};

export default Home;
