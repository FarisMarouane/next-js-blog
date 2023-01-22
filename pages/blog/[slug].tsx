import Head from 'next/head';
import dayjs from 'dayjs';
import { Montserrat } from '@next/font/google';
import {
  IFrontmatterType,
  getAllArticlesMetadata,
  getArticleFromSlug,
} from '../../utils/mdx';
import markdownToHtml from '../../utils/markdownToHtml';
import PostBody from '../../components/PostBody';
import styles from '../../styles/components/Article.module.css';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

interface IArticleProps {
  articleContent: string;
  frontmatter: IFrontmatterType;
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { content, frontmatter } = getArticleFromSlug(slug);

  const htmlContent = await markdownToHtml(content);

  return { props: { articleContent: htmlContent, frontmatter } };
}

export function getStaticPaths() {
  const articles = getAllArticlesMetadata();

  return {
    paths: articles.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

const Article = ({ articleContent, frontmatter }: IArticleProps) => {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="author" content="Marouane Faris" />
        <meta name="description" content={frontmatter.metaDesc} />
        <meta property="og:title" content={`${frontmatter.title}`} />
        <meta property="og:description" content={`${frontmatter.metaDesc}`} />
      </Head>
      <main>
        <article>
          <header>
            <h1 className={font.className}>{frontmatter.title}</h1>
            <small className={styles.small}>
              {dayjs(frontmatter.publicationDate).format('MMMM D, YYYY')}
              &nbsp;&bull;&nbsp;
              {frontmatter.readingTime}
            </small>
          </header>
          <PostBody content={articleContent} />
        </article>
      </main>
    </>
  );
};

export default Article;
