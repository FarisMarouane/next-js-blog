import { getAllArticlesMetadata } from '../utils/mdx';

function generateSiteMap(posts) {
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

function SiteMap() {
  return;
}

export async function getServerSideProps({ res }) {
  const posts = getAllArticlesMetadata();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
