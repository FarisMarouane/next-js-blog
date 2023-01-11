import path from 'path';
import fs from 'fs';
import Head from 'next/head';
import matter from 'gray-matter';
import { Montserrat } from '@next/font/google';
import markdownToHtml from '../utils/markdownToHtml';
import PostBody from '../components/PostBody';

const resumeFileName = 'resume';
const font = Montserrat({ subsets: ['latin'], weight: '900' });

export async function getStaticProps() {
  const resumeDir = path.join(
    path.join(process.cwd(), 'data'),
    `${resumeFileName}.md`,
  );
  const source = fs.readFileSync(resumeDir);
  const { content } = matter(source);

  const htmlContent = await markdownToHtml(content);

  return { props: { articleContent: htmlContent } };
}

const Article = ({ articleContent }) => {
  return (
    <>
      <Head>
        <title>Resume</title>
        <meta name="description" content="Marouane Faris' resume" />
      </Head>
      <main>
        <article>
          <PostBody content={articleContent} />
        </article>
      </main>
    </>
  );
};

export default Article;
