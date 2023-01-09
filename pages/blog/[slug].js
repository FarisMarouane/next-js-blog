import dayjs from 'dayjs';
import { Montserrat } from '@next/font/google';
import { getArticleFromSlug } from '../../utils/mdx';
import markdownToHtml from '../../utils/markdownToHtml';
import PostBody from '../../components/PostBody';
import styles from '../../styles/components/Article.module.css';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { content, frontmatter } = getArticleFromSlug(slug);

  const htmlContent = await markdownToHtml(content);

  return { props: { articleContent: htmlContent, frontmatter } };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'example' } }, { params: { slug: 'example2' } }],
    fallback: false,
  };
}

const Article = ({ articleContent, frontmatter }) => {
  return (
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
  );
};

export default Article;
