import { GetServerSideProps } from 'next';
import { getAllArticlesMetadata, IArticleMetadata } from '../utils/mdx';

function generateSiteMap(posts: IArticleMetadata[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.marouanefaris.dev</loc>
     </url>
     <url>
       <loc>https://www.marouanefaris.dev/about_me</loc>
     </url>
     ${posts
       .map(({ articleContentId }) => {
         return `
       <url>
           <loc>${`https://www.marouanefaris.dev/blog/${articleContentId}`}</loc>
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
  const postsMetaData = await getAllArticlesMetadata();

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
