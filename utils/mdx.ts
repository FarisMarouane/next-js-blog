import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// This type is almost useless because of [key: string]: string | number | undefined;
export interface IFrontmatterType {
  id: number;
  date: string;
  lastModified?: string;
  title: string;
  metatitle: string;
  metaDesc: string;
  socialImage?: string;
}

export interface IArticleMetaData extends IFrontmatterType {
  slug: string;
  readingTime: string;
}

interface IArticle {
  content: string;
  frontmatter: Omit<IArticleMetaData, 'metatitle'>;
}

const articlesPath = path.join(process.cwd(), 'data/blog');

export function getArticleFromSlug(slug: string): IArticle {
  const articleDir = path.join(articlesPath, `${slug}.md`);
  const source = fs.readFileSync(articleDir);
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: {
      slug,
      metaDesc: data.metaDesc,
      title: data.title,
      date: data.date,
      readingTime: readingTime(source.toString()).text,
      id: data.id,
      ...data,
    },
  };
}

export function getAllArticlesMetadata(): IArticleMetaData[] {
  const articles = fs.readdirSync(path.join(process.cwd(), 'data/blog'));

  return articles.reduce(
    (allArticlesMetadata: IArticleMetaData[], currentArticle: string) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), 'data/blog', currentArticle),
        'utf-8',
      );
      const { data } = matter(source);

      return [
        {
          ...(data as IFrontmatterType),
          slug: currentArticle.replace('.md', ''),
          readingTime: readingTime(source).text,
        },
        ...allArticlesMetadata,
      ];
    },
    [],
  );
}
