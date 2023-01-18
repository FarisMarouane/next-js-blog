import path from 'path';
import fs from 'fs';
import Head from 'next/head';
import matter from 'gray-matter';
import markdownToHtml from '../utils/markdownToHtml';
import PostBody from '../components/PostBody';

const resumeFileName = 'about_me';

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
        <title>About me</title>
        <meta name="description" content="Marouane Faris' about me" />
        <meta property="og:title" content="Marouane Faris About me" />
        <meta property="og:description" content="Marouane Faris About me" />
        <meta property="og:image" content="/photo_linkedin.jpeg" />
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
