---
id: 0
title: "Playing around with Next JS app directory and React Server Components"
lang: "en"
date: '2023-06-27'
lastModified: '2023-07-11'
metaTitle: "React Server Components"
metaDesc: "What are Server Components and how can we use them to improve our React apps ?"
---

As I have been bored lately, I decided to see what's the hype with React Server Components (RSCs) and how, as a frontend engineer, I can use them to deliver faster and better apps to my clients.

But first, what are React Server Components (RSCs)?

According to the React team [blog article](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components), server components "...run ahead of time and are **excluded from your JavaScript bundle**. Server Components can run during the build, letting you read from the filesystem or fetch static content. They can also run on the server, letting you access your data layer without having to build an API. You can pass data by props from Server Components to the interactive Client Components in the browser."

Here's an example of a RSC in the context of a Next JS app (using the [new app directory](https://nextjs.org/docs/app)):

```
export default async function Page() {
  const DB = new Client();
  {/* Direct access to the database from inside the component, without going through an API call*/}
  const articleContent = await DB.getArticleContent(); 
  return <Article articleContent={articleContent} />;
}

```

For the most part, it looks like a regular React component, except that if needed you can now use the async/await syntax to fetch data inside the component (among other differences that we will see further in this article). 

## Benefits of RSCs:

- **The main benefit of RSCs is a reduction in the size of the javascript bundle sent to the client. Indeed, RSCs are only executed on the server, they are never shipped to the client**.
- As mentioned, you only ship to the client the code that is necessary (for instance, packages that are only used in RSCs won't be shipped to the client as they're not needed/used there)
- Access backend resources directly, without passing by an API for instance (DB, etc.)

&nbsp;

## Drawbacks of RSCs:

- They can't have a state or be interactive (therefore they can't use the useState hook)
- They can't use other React hooks like useEffect or useReducer either
- They can't use browser APIs as they are rendered on the server
- They can't use event handlers like onClick
- They  add more complexity to the codebase (although, at least from what I saw so far, this added complexity is limited)
- In my opinion, and this is their major drawback, they don't seem to be production ready yet. The specifications are very recent and are probably going to change significantly in the future. Furthermore, some popular libraries, like react-redux, still don't have RSCs support.

&nbsp;

## How can you get your hands dirty and start playing with Server Components?


As far as I know, the only way to start using RSCs today is through the **Next JS metaframework** and its new app directory.
Inside the app directory, all React Components are Server Components **by default**. If you want a component to be rendered on the client instead, you have to prepend the keywords 'use client' before any imports at the top of the file containing the component. Like so:

```
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
```
&nbsp;

I personally refactored my blog (the one you are visiting right now !) to the new Next JS app directory, where all React components are RSCs by default. You can visit the version that uses the app directory at this [link](https://staging.marouanefaris.dev/), and I must say I didn't see any tangible benefits.

 There could be (at least) two explanations for this:

- My website isn't big/complex enough for the benefits to be visible
- I didn't implement RSCs correctly 🤷

&nbsp;

## Conclusion

All in all, I wouldn't use React Server Components in a production app yet, as I don't think the specifications are stable enough. But they seem very promising because, in theory, they will allow us, when they are ready, to significantly reduce the size of the javascript we developers send to the client with traditional React apps.

## Ressources

If you are interested in knowing more about RSCs, here's a list of ressources that helped me wrap my head around them and write this article:

- A talk by Dan Abramov and Laura Tan from the React Team at Meta: [Data Fetching with React Server Components](https://www.youtube.com/watch?v=TQQPAU21ZUw&t=3276s)

- You can also read this article from freecodecamp for a quick overview of RSCs: [How to Use React Server Components – A Beginner's Guide](https://www.freecodecamp.org/news/react-server-components-for-beginners/)

- An RFC (request for comments) by Lenz Weber-Tronic (phryneas), a senior staff software engineer at Apollo GraphQL and co-maintainer of Redux Toolkit: [The Next.js "App Router", React Server Component & "SSR with Suspense" story
](https://github.com/apollographql/apollo-client-nextjs/blob/pr/RFC-2/RFC.md)