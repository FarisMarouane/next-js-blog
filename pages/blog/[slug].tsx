import Head from "next/head";
import dayjs from "dayjs";
import { stripHtml } from "string-strip-html";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import {
  IFrontmatterType,
  getAllArticlesMetadata,
  getArticleFromSlug,
} from "../../utils/mdx";
import markdownToHtml from "../../utils/markdownToHtml";
import PostBody from "../../components/PostBody";
import styles from "../../styles/components/Article.module.css";
import ArticleNavigation, {
  IArticleLink,
} from "../../components/ArticleNavigation";
import { useRouter } from "next/router";
import { getI18nText } from "../../utils/getI18nText";
import useSpeech from "../../hooks/useSpeech";
import useIsFirefox from "../../hooks/useIsFirefox";

const font = Montserrat({ subsets: ["latin"], weight: "900" });

interface IArticleProps {
  articleContent: string;
  frontmatter: IFrontmatterType;
  articlesMetadata: { slug: string; id: number; title: string; lang: string }[];
}

export const getStaticProps = async ({
  params,
  locale,
}: {
  params: { slug: string };
  locale: "en" | "fr";
}) => {
  const { slug } = params;
  const { content, frontmatter } = getArticleFromSlug(locale, slug);
  const articlesMetadata = getAllArticlesMetadata(locale);

  const htmlContent = await markdownToHtml(content);

  return {
    props: {
      articleContent: htmlContent,
      frontmatter,
      articlesMetadata: articlesMetadata
        .map(({ slug, id, title, lang }) => ({
          slug,
          id,
          title,
          lang,
        }))
        .sort((a, b) => a.id - b.id),
    },
  };
};

export function getStaticPaths() {
  const articlesMetadata = getAllArticlesMetadata();

  return {
    paths: [{ params: { slug: "react_server_components" }, locale: "en" }],
    fallback: "blocking",
  };
}

const Article = ({
  articleContent,
  frontmatter,
  articlesMetadata,
}: IArticleProps) => {
  const { locale } = useRouter();

  const { id: currentArticleId } = frontmatter;

  const filteredArticlesMetadata = articlesMetadata.filter(
    (a) => a.lang === locale
  );

  const getLastModifiedDate = () => {
    if (frontmatter.lastModified) {
      return (
        <span>
          &nbsp;&bull;&nbsp;
          {`${getI18nText("blog_article_last_modified", locale as "en" | "fr")}:
          ${frontmatter.lastModified}`}
        </span>
      );
    }
    return;
  };

  let articlesLinks: IArticleLink[] = [];

  for (const articleMetadata of filteredArticlesMetadata) {
    // previous article
    if (articleMetadata.id + 1 === currentArticleId) {
      articlesLinks.push({
        name: articleMetadata.title,
        path: articleMetadata.slug,
      });
    }

    // next article
    if (articleMetadata.id - 1 === currentArticleId) {
      articlesLinks.push({
        name: articleMetadata.title,
        path: articleMetadata.slug,
      });
    }
  }

  const { toggleSpeaking, isSpeaking } = useSpeech(
    stripHtml(articleContent).result,
    locale
  );

  const isFirefox = useIsFirefox();

  const handleClick = () => {
    toggleSpeaking();
  };

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="author" content="Marouane Faris" />
        <meta name="description" content={frontmatter.metaDesc} />
        <meta
          property="og:url"
          content={`https://www.marouanefaris.dev/blog/${frontmatter.slug}`}
        />
        <meta property="og:site_name" content="marouanefaris.dev" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${frontmatter.title}`} />
        <meta property="og:image" content="/photo_linkedin.jpeg" />
        <meta property="og:description" content={`${frontmatter.metaDesc}`} />
        <meta
          property="twitter:image"
          content="https://www.marouanefaris.dev/photo_linkedin.jpeg"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="https://www.marouanefaris.dev" />
        <meta name="twitter:creator" content="@MarouaneFaris1" />
      </Head>
      <main>
        <article>
          <header>
            <h1 className={font.className}>
              {frontmatter.title}{" "}
              {!isFirefox && (
                <button
                  type="button"
                  className={styles.read_article_button}
                  onClick={handleClick}
                >
                  <span>
                    {getI18nText("read_article_aloud", locale as "en" | "fr")}{" "}
                  </span>
                  <Image
                    src={
                      isSpeaking
                        ? "/sound_off_icon_black.png"
                        : "/sound_on_icon_black.png"
                    }
                    alt="cresent"
                    width={16}
                    height={16}
                  />
                </button>
              )}
            </h1>
            <small className={styles.small}>
              {dayjs(frontmatter.date).format("MMMM D, YYYY")}
              &nbsp;&bull;&nbsp;
              {frontmatter.readingTime}
              {getLastModifiedDate()}
            </small>
          </header>
          <PostBody content={articleContent} />
        </article>
      </main>
      <ArticleNavigation
        currentArticleId={currentArticleId}
        articlesLinks={articlesLinks}
      />
    </>
  );
};

export default Article;
