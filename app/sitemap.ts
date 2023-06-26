import { MetadataRoute } from 'next';

import { getAllArticlesMetadata, IArticleMetaData } from '../utils/mdx';

function generateSiteMap(posts: IArticleMetaData[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.marouanefaris.dev</loc>
     </url>
     <url>
       <loc>https://www.marouanefaris.dev/about_me</loc>
     </url>
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`https://www.marouanefaris.dev/blog/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap(): MetadataRoute.Sitemap {
  const postsMetaData = getAllArticlesMetadata();

  const sitemap = [
    {
      url: 'https://www.marouanefaris.dev',
    },
    {
      url: 'https://www.marouanefaris.dev/blog',
    },
  ];

  return sitemap.concat(
    postsMetaData.map(({ slug, date }) => {
      return {
        url: `https://www.marouanefaris.dev/blog/${slug}`,
        lastModified: date,
      };
    }),
  );
}

export default SiteMap;
