---
id: 1
title: "React Server Components - Part 2"
lang: "en"
date: '2024-04-14'
metaTitle: "React Server Components - Part 2"
metaDesc: "My attempt at moving my blog to the new App router"
---

Despite all of its promises, I would still not recommend moving an entire Next JS app to the new App router. It's not ready yet in my opinion.
After about a week of trying, I still can't make my blog work the same after I moved it to the App router :(

And it's just a regular blog with nothing fancy (you can have a look at the code [here](https://github.com/FarisMarouane/next-js-blog/tree/main). The main roadblock I faced was trying to make the internationalization work the same way it did under the Pages router.

You see, if you use the old Pages router, Next JS has a built-in [support](https://nextjs.org/docs/pages/building-your-application/routing/internationalization) that meets the needs of a simple website like my blog. With the new App router, Next JS doesn't have such support anymore and you have to either choose to manually configure it with the help of the documentation or use an external library.

I don't know why, maybe I am doing something wrong, maybe there's something about how server components work that I don't fully understand yet, maybe I integrated the next-intl library incorrectly, but under the App router the entire app re-renders when I switch locales. That wasn't the case under the Pages directory.

To be continued ...