import { getAllArticlesMetadata } from '../../utils/mdx';

function SiteMap() {
  const postsMetaData = getAllArticlesMetadata();

  const MainSiteMaps = [
    {
      url: 'https://www.marouanefaris.dev',
      lastModified: '',
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://www.marouanefaris.dev/blog',
      changeFrequency: 'yearly',
      lastModified: '',
    },
  ];

  return [
    ...MainSiteMaps,
    ...postsMetaData.map(({ slug, lang, lastModified }) => {
      return {
        url: `https://www.marouanefaris.dev/${lang}/blog/${slug}`,
        lastModified: lastModified ?? '',
        changeFrequency: 'yearly',
      };
    }),
  ];
}

export default SiteMap;
