import DB from './db';
import dayjs from 'dayjs';

export interface IArticleMetadata {
  id: number;
  title: string;
  date: string;
  lastModified: string | null;
  metaTitle: string;
  metaDesc: string;
  articleContentId: number;
  readingTime: string;
}

interface IDbArticleMetadata {
  id: number;
  title: string;
  date: Date;
  lastmodified: Date | null;
  metatitle: string;
  metadesc: string;
  articlecontentid: number;
  reading_time: string;
}

export interface IArticleContent {
  article_id: number;
  article_content: string;
}

export async function getArticleContentFromSlug(
  slug: string,
): Promise<IArticleContent> {
  const { rows }: { rows: IArticleContent[] } = await DB.query(
    `SELECT * FROM articles_content WHERE article_id=${slug}`,
  );

  const article_content = rows[0];

  return article_content;
}

export async function getAllArticlesMetadata(): Promise<IArticleMetadata[]> {
  const { rows: articlesMetadata }: { rows: IDbArticleMetadata[] } =
    await DB.query('SELECT * FROM articles_metadata');

  return articlesMetadata.reduce(
    (
      allArticlesMetadata: IArticleMetadata[],
      currentArticleMetadata: IDbArticleMetadata,
    ) => {
      return [
        ...allArticlesMetadata,
        {
          id: currentArticleMetadata.id,
          title: currentArticleMetadata.title,
          date: dayjs(currentArticleMetadata.date).format('YYYY-MM-DD'),
          lastModified:
            currentArticleMetadata.lastmodified !== null
              ? dayjs(currentArticleMetadata.lastmodified).format('YYYY-MM-DD')
              : null,
          metaTitle: currentArticleMetadata.metatitle,
          metaDesc: currentArticleMetadata.metadesc,
          articleContentId: currentArticleMetadata.articlecontentid,
          readingTime: currentArticleMetadata.reading_time,
        },
      ];
    },
    [],
  );
}
