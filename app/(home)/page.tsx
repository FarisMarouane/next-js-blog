import type { Metadata } from 'next';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

import markdownToHtml from '../../utils/markdownToHtml';

import Article from './Article';

export const metadata: Metadata = {
  description:
    'Hello There, my name is Marouane and I am a React JS expert with 5 years of experience in frontend web developement',
  openGraph: {
    type: 'website',
    url: 'https://marouanefaris.dev',
    title: 'Marouane Faris',
    description: 'About me',
    images: [
      {
        url: '/photo_linkedin.jpeg',
      },
    ],
  },
};

const resumeFileName = 'about_me';

async function getArticleContent() {
  const resumeDir = path.join(
    path.join(process.cwd(), 'data'),
    `${resumeFileName}.md`,
  );
  const source = fs.readFileSync(resumeDir);
  const { content } = matter(source);

  const htmlContent = await markdownToHtml(content);

  return htmlContent;
}

export default async function Page() {
  const articleContent = await getArticleContent();
  return <Article articleContent={articleContent} />;
}
