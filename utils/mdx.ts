import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Locale } from '../i18n-config';

// This type is almost useless because of [key: string]: string | number | undefined;
export interface IFrontmatterType {
  id: number;
  title: string;
  lang: Locale;
  date: string;
  lastModified?: string;
  metatitle: string;
  metaDesc: string;
}

export interface IArticleMetaData extends IFrontmatterType {
  slug: string;
  readingTime: string;
}

interface IArticle {
  content: string;
  frontmatter: Omit<IArticleMetaData, 'metatitle' | 'lang'>;
}

const articlesPath = path.join(process.cwd(), 'data/blog');

export function getArticleFromSlug(
  locale: string,
  slug: string,
): IArticle | undefined {
  const articlePath = path.join(articlesPath, locale, `${slug}.md`);

  let source;
  try {
    source = fs.readFileSync(articlePath);
  } catch (error) {
    console.error(`Error reading file: ${articlePath}`);
    return;
  }

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

export function getAllArticlesMetadata(locale = ''): IArticleMetaData[] {
  // Return all articles metadata, in all lang,
  if (!locale) {
    const englishArticlesMeta = fs
      .readdirSync(path.join(articlesPath, 'en'))
      .reduce(
        (allArticlesMetadata: IArticleMetaData[], currentArticle: string) => {
          const source = fs.readFileSync(
            path.join(articlesPath, 'en', currentArticle),
            'utf-8',
          );
          const { data } = matter(source);

          return [
            {
              ...(data as IFrontmatterType),
              slug: currentArticle.replace(/.md/, ''),
              readingTime: readingTime(source).text,
            },
            ...allArticlesMetadata,
          ];
        },
        [],
      );

    const frenchArticlesMeta = fs
      .readdirSync(path.join(articlesPath, 'fr'))
      .reduce(
        (allArticlesMetadata: IArticleMetaData[], currentArticle: string) => {
          const source = fs.readFileSync(
            path.join(articlesPath, 'fr', currentArticle),
            'utf-8',
          );
          const { data } = matter(source);

          return [
            {
              ...(data as IFrontmatterType),
              slug: currentArticle.replace(/.md/, ''),
              readingTime: readingTime(source).text,
            },
            ...allArticlesMetadata,
          ];
        },
        [],
      );

    return [...englishArticlesMeta, ...frenchArticlesMeta];

    // Return metadata only of articles in locale lang
  } else {
    return fs
      .readdirSync(path.join(articlesPath, locale))
      .reduce(
        (allArticlesMetadata: IArticleMetaData[], currentArticle: string) => {
          const source = fs.readFileSync(
            path.join(articlesPath, locale, currentArticle),
            'utf-8',
          );
          const { data } = matter(source);

          return [
            {
              ...(data as IFrontmatterType),
              slug: currentArticle.replace(/.md/, ''),
              readingTime: readingTime(source).text,
            },
            ...allArticlesMetadata,
          ];
        },
        [],
      );
  }
}
