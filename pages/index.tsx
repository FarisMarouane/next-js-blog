import path from 'path';
import fs from 'fs';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import matter from 'gray-matter';

import markdownToHtml from '../utils/markdownToHtml';
import PostBody from '../components/PostBody';
import Footer from '../components/Footer';
import { getI18nText } from '../utils/getI18nText';

const resumeFileName = 'about_me';

type Props = {
  locale?: string;
  articleContent: string;
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const resumeDir = path.join(
    path.join(process.cwd(), 'data'),
    `${resumeFileName}.${locale}.md`,
  );
  const source = fs.readFileSync(resumeDir);
  const { content } = matter(source);

  const htmlContent = await markdownToHtml(content);

  return { props: { articleContent: htmlContent, locale } };
};

const Home = ({
  articleContent,
  locale,
}: {
  articleContent: string;
  locale: 'en' | 'fr';
}) => {
  return (
    <>
      <Head>
        <title>{getI18nText('home_head_title', locale)}</title>
        <meta name="author" content="Marouane Faris" />
        <meta
          name="description"
          content={getI18nText('home_meta_description', locale)}
        />
        <meta property="og:url" content="https://www.marouanefaris.dev" />
        <meta property="og:type" content="profile" />
        <meta
          property="og:title"
          content={getI18nText('home_head_title', locale)}
        />
        <meta
          property="og:description"
          content={getI18nText('home_head_title', locale)}
        />
        <meta property="og:image" content="/photo_linkedin.jpeg" />
      </Head>
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
