import Aside from '../components/Aside';
import Footer from '../components/Footer';
import { IArticleMetaData, getAllArticlesMetadata } from '../utils/mdx';
import ArticlePreview from '../components/ArticlePreview';

export function getStaticProps() {
  const allArticlesMetaData = getAllArticlesMetadata();
  return {
    props: { allArticlesMetaData },
  };
}

export default function Home({
  allArticlesMetaData,
}: {
  allArticlesMetaData: IArticleMetaData[];
}) {
  return (
    <>
      <Aside />
      <main>
        {allArticlesMetaData
          .sort((a, b) => {
            if (a.id < b.id) return -1;
            return 1;
          })
          .map((articleMetaData) => (
            <ArticlePreview
              key={articleMetaData.id}
              title={articleMetaData.title}
              readingTime={articleMetaData.readingTime}
              publicationDate={articleMetaData.date}
              description={articleMetaData.metaDesc}
              slug={articleMetaData.slug}
            />
          ))}
      </main>
      <Footer />
    </>
  );
}
