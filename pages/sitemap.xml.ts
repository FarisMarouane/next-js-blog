import { GetServerSideProps } from 'next';
import { getAllArticlesMetadata, IArticleMetaData } from '../utils/mdx';

function generateSiteMap(posts: IArticleMetaData[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.marouanefaris.dev</loc>
     </url>
     <url>
       <loc>https://www.marouanefaris.dev/blog</loc>
     </url>
     ${posts
       .map(({ slug, lang, lastModified }) => {
         return `
       <url>
           <loc>${`https://www.marouanefaris.dev/${lang}/blog/${slug}`}</loc>
           ${lastModified ? `<lastmod>${lastModified}</lastmod>` : ''}
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  return;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const postsMetaData = getAllArticlesMetadata();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(postsMetaData);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
