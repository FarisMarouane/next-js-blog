'use client';

import PostBody from '../components/PostBody';
import Footer from '../components/Footer';

const Article = ({ articleContent }: { articleContent: string }) => {
  return (
    <>
      <main>
        <article>
          <PostBody content={articleContent} />
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Article;
