import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const articlesPath = path.join(process.cwd(), 'data/blog');

export function getArticleFromSlug(slug) {
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
      readingTime: readingTime(source).text,
      ...data,
    },
  };
}

export function getAllArticles() {
  const articles = fs.readdirSync(path.join(process.cwd(), 'data/blog'));

  return articles.reduce((allArticles, article) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'data/blog', article),
      'utf-8',
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: article.replace('.md', ''),
        readingTime: readingTime(source).text,
      },
      ...allArticles,
    ];
  }, []);
}
