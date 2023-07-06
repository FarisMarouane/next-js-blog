---
id: 2
title: "Exploration du Next JS app directory et des React Server Components"
date: '2023-07-03'
metaTitle: "React Server Components"
metaDesc: "Qu'est-ce que les composants serveur React et comment pouvons-nous les utiliser pour améliorer nos applications React ?"
---

Comme je m'ennuyais ces derniers temps, j'ai décidé de jeter un coup d'oeil sur les React Server Components (RSC) pour voir comment, en tant que développeur frontend, je peux les utiliser pour offrir des applications plus rapides et de meilleures qualitées à mes clients.

Mais tout d'abord, en quoi consistent les React Server Components (RSC) ?

Selon l'équipe  de React, dans un article de blog (https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components), les composants serveur React "...s'exécutent en avance et sont **exclus de votre bundle JavaScript**. Les Server Components peuvent s'exécuter pendant la phase de build, ce qui vous permet de lire à partir du système de fichiers ou de récupérer du contenu statique. Ils peuvent également s'exécuter sur le serveur, ce qui vous permet d'accéder à votre couche de données sans avoir à créer une API. Vous pouvez transmettre des données via des props depuis les Server Components vers les composants interactifs Client dans le navigateur."

Voici un exemple d'un RSC dans le contexte d'une application Next JS (utilisant le nouveau répertoire "app") :

```
export default async function Page() {
  const articleContent = await getArticleContent();
  return <Article articleContent={articleContent} />;
}
```

Dans l'ensemble, cela ressemble à un composant React classique, sauf que si nécessaire, vous pouvez maintenant utiliser la syntaxe async/await pour récupérer des données à l'intérieur du composant (parmi d'autres différences que nous verrons plus loin dans l'article).

## Avantages des RSC :

- **Le principal avantage des RSC est une réduction de la taille du bundle JavaScript envoyé au client. En effet, les RSC ne s'exécutent que sur le serveur et ne sont jamais envoyés au client**.
- Comme mentionné, vous ne transmettez au client que le code nécessaire (par exemple, les packages utilisés uniquement dans les RSC ne seront pas envoyés au client car ils ne sont pas nécessaires/utilisés là-bas).
- Accès direct aux ressources backend, sans passer par une API par exemple (base de données, etc.).

&nbsp;

## Inconvénients des RSC :

- Ils ne peuvent pas avoir d'état ou être interactifs (par conséquent, ils ne peuvent pas utiliser le hook useState).
- Ils ne peuvent pas utiliser d'autres hooks React tels que useEffect ou useReducer.
- Ils ne peuvent pas utiliser les API du navigateur car ils sont rendus sur le serveur.
- Ils ne peuvent pas utiliser des gestionnaires d'événements comme onClick.
- Ils ajoutent plus de complexité au code (bien que, d'après ce que j'ai vu jusqu'à présent, cette complexité supplémentaire soit limitée).
- À mon avis, et c'est leur principal inconvénient, ils ne semblent pas encore prêts pour être utilisés production. Les spécifications sont très récentes et vont probablement changer de manière significative à l'avenir.

&nbsp;

## Comment pouvez-vous commencer à utiliser les Server Components ?

Pour autant que je sache, la seule façon de commencer à utiliser les RSC aujourd'hui est par le biais du metaframework **Next JS** et de son nouveau répertoire ["app"](https://nextjs.org/docs/app).
Dans le répertoire "app", tous sont des composants serveur React par défaut. Si vous souhaitez qu'un composant soit rendu côté client, vous devez préfixer les mots-clés "use client" avant les imports en haut du fichier contenant le composant. Comme ceci :

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

Personnellement, j'ai refondu mon blog (celui que vous visitez en ce moment !) vers le nouveau répertoire "app" Next JS, où tous les composants React sont des RSC par défaut. Vous pouvez visiter la version qui utilise le répertoire d'application à ce [lien](https://staging.marouanefaris.dev/), et je dois dire que je n'ai pas remarqué d'avantages tangibles.

Il pourrait y avoir deux explications à cela :

- mon site web n'est pas assez grand/complexe pour que les avantages soient visibles
- je n'ai pas implémenté correctement les RSC 🤷

&nbsp;

## Conclusion

Dans l'ensemble, avec les RSC, je n'utiliserais pas encore les React Server Components dans une application de production, car je ne pense pas que les spécifications soient assez stables. Cependant, ils semblent très prometteurs car, en théorie, ils nous permettront, lorsqu'ils seront prêts, de réduire considérablement la taille du code JavaScript que nous, développeurs, envoyons au client avec les applications React traditionnelles.

Si vous souhaitez en savoir plus sur les RSC, vous pouvez regarder cette [présentation](https://www.youtube.com/watch?v=TQQPAU21ZUw&t=3276s) de Dan Abramov et Laura Tan de l'équipe React chez Meta.

Vous pouvez également lire cet article de freecodecamp pour obtenir un aperçu rapide des RSC : [article](https://www.freecodecamp.org/news/react-server-components-for-beginners/)