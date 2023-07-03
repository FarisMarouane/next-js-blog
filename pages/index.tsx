import path from 'path';
import fs from 'fs';
import Head from 'next/head';
import matter from 'gray-matter';
import markdownToHtml from '../utils/markdownToHtml';
import PostBody from '../components/PostBody';
import Footer from '../components/Footer';

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

const Article = ({ articleContent }: { articleContent: string }) => {
  return (
    <>
      <Head>
        <title>About me</title>
        <meta name="author" content="Marouane Faris" />
        <meta
          name="description"
          content="Hello There, my name is Marouane and I am a React JS expert with 5 years of experience in frontend web developement"
        />
        <meta property="og:url" content="https://www.marouanefaris.dev" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="About me" />
        <meta property="og:description" content="About me" />
        <meta property="og:image" content="/photo_linkedin.jpeg" />
      </Head>
      <main>
        <article>
          <PostBody content={articleContent} />
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Article;
