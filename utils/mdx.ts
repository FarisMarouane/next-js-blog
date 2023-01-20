import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import readingTime from 'reading-time';

interface ArticleMetadata {
  [key: string]: any;
  slug: string;
  readingTime: string;
}

const articlesPath = path.join(process.cwd(), 'data/blog');

export function getArticleFromSlug(slug: string) {
  const articleDir = path.join(articlesPath, `${slug}.md`);
  const source = fs.readFileSync(articleDir);
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: {
      slug,
      excerpt: data.metaDesc,
      title: data.title,
      publicationDate: data.date,
      readingTime: readingTime(source.toString()).text,
      ...data,
    },
  };
}

export function getAllArticlesMetadata() {
  const articles = fs.readdirSync(path.join(process.cwd(), 'data/blog'));

  return articles.reduce(
    (
      allArticlesMetadata: ArticleMetadata[],
      currentArticleMetadata: string,
    ) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), 'data/blog', currentArticleMetadata),
        'utf-8',
      );
      const { data } = matter(source);

      return [
        {
          ...data,
          slug: currentArticleMetadata.replace('.md', ''),
          readingTime: readingTime(source).text,
        },
        ...allArticlesMetadata,
      ];
    },
    [],
  );
}
