---
id: 0
title: "L'asymétrie d'information dans le marché d'emploi des développeurs"
lang: "fr"
date: '2023-04-02'
lastModified: '2023-06-02'
metaTitle: "Asymétrie d'information"
metaDesc: "L'asymétrie d'information dans le marché d'emploi des développeurs et proposition d'une solution"
---

Tous les développeurs web savent à quel point le processus de recherche d'emploi peut être pénible. Certes, le taux de chômage dans notre secteur d'activité est très bas (avoisinant les 3%, ce qui correspond à une situation de [plein emploi](https://fr.wikipedia.org/wiki/Plein_emploi)), mais ce n'est pas le fait de trouver un emploi en soi qui pose problème .

C'est plutôt l'absurdité d'une bonne partie du processus des entretiens qu'un développeur doit endurer avant de trouver un poste qui est le souci. Tu dois passer une bonne partie de ton temps à essayer de convaincre des personnes **non-techniques** qui ne connaissent pas ton métier que tu es compétent. Autrement dit, entre toi, jeune développeur ou développeuse dynamique, et ton poste de rêve, se trouve généralement un recruteur/chasseur de têtes qui cherche à évaluer tes compétences et l'adéquation de ton profil avec le poste, alors qu'il ne comprend pas ce que tu fais. C'est un exemple parfait d'[asymétrie d'information](https://fr.wikipedia.org/wiki/Asym%C3%A9trie_d%27information), en particulier tel qu'elle est décrite dans le célébre problème économique du marché des voitures d'occasions ([The Market for Lemons](https://fr.wikipedia.org/wiki/The_Market_for_%E2%80%9CLemons%E2%80%9D))

Extrait de l'article wikipedia en français sur **The Market for Lemons:**

*"L'article décrit le marché d'occasion des automobiles. Parmi ces voitures, certaines sont en bon état, et d'autres comportent des défauts cachés, plus ou moins graves, connus du vendeur mais que l'acheteur ne peut découvrir avant d'avoir acheté le véhicule. Ces voitures comportant des défauts cachés sont désignées en argot américain par le terme de "lemons", qu'on retrouve dans le titre de l'article.*

*Ce marché ne fonctionne ainsi pas dans des conditions de concurrence pure et parfaite : le grand nombre d'agents de part et d'autre assure l'atomicité, mais les biens échangés sont hétérogènes (les voitures sont de qualités différentes) et il existe une asymétrie d'information entre vendeurs et acheteurs.*

*Dans ce marché, les vendeurs qui savent que leur voiture est en bon état veulent en tirer un prix correspondant à la qualité de leur véhicule, tandis que les vendeurs d'automobiles défectueuses sont prêts à les vendre à un prix faible. De leur côté, les acheteurs savent qu'ils n'ont pas la possibilité de distinguer entre une bonne voiture et une guimbarde. Face à un vendeur, qui peut être de bonne foi aussi bien qu'un vendeur de guimbarde qui ment, un acheteur sera prêt à payer un prix inférieur à celui d'un bon véhicule, puisqu'il sait qu'il risque de tomber sur une voiture de mauvaise qualité. Sachant cela, le vendeur d'une bonne voiture qui ne veut pas vendre son véhicule à moins que sa valeur refuse toujours l'offre qui lui est faite. De ce fait ne restent sur le marché que les guimbardes (les seules vendues à un prix suffisamment faible pour des acheteurs méfiants), et les bonnes voitures d'occasion ne trouvent pas preneur.*

*Le nœud du modèle est que les vendeurs de guimbardes peuvent toujours se faire passer pour des vendeurs de bons véhicules aux yeux des acheteurs. Étant incapables de distinguer l'un de l'autre, ces derniers revoient à la baisse ce qu'ils sont prêts à payer, conduisant à l'éviction des bons vendeurs."*

Tout ce que le recruteur (l'acheteur ) veut généralement savoir, c'est si tu (toi le vendeur de tes compétences de dev) as travaillé X années avec le langage J, Y années avec le framework R et bien sûr le classique, si tu as déjà fais de l'AGILITÉ (j'exagère à peine !). Le plus souvent,  il ne sait pas du tout à quoi sert le langage J ni même ce qu'est un framework. Il va surtout prêter attention à ce que tu prononces les bons  **mots clés** lors de ta présentation (par exemple: React, hooks, redux, ES6, Vanilla JS, tests unitaires, CI, etc. dans le contexte d'un poste de développeur frontend) sans avoir une idée de ce que peuvent concrètement représenter ces termes.

Je me suis ainsi déjà retrouvé dans une situation absurde où un recruteur m'avait demandé si je faisais des tests unitaires, et si oui, quelles librairies j'avais utilisées. À peine avais-je mentionné le mot "Jest" (un framework de test javascript), le recruteur s'est exclamé en disant: "C'est ça!". Je me demande ce qui serait arrivé si j'avais mentionné le nom d'un autre framework de test dont il n'avait jamais entendu parler, par exemple Mocha ou Jasmine.


Cette situation pousse beaucoup de développeurs à essayer de deviner ce que veulent entendre les recruteurs pour ensuite le dire au cours des entretiens, conduisant potentiellement ainsi à une situation de [sélection adverse](https://fr.wikipedia.org/wiki/S%C3%A9lection_adverse): *les développeurs les moins compétents,  mais qui ont réussi à s'adapter aux attentes et préjugés (j'utilise ce terme de manière neutre) des recruteurs non-techniques, risquent d'êtres ceux dont les profils sont présentés aux clients finaux voire, dans les cas les plus extrêmes, être ceux qui sont recrutés*.

C'est un peu bizarre comme situation vous nous trouvez pas ?

**Alors quelles solutions à ce problème d'asymétrie d'informations ?**

Avant de commencer par proposer la solution la plus directe à ce problème, je vais commencer par dire en QUOI déjà c'est un problème qui nuit à tous les acteurs de ce marché:

- Le phénomène de *sélection adverse* conduit les recruteurs/chasseurs de têtes à prendre une décision non conforme à leur meilleur intérêt (satisfaire le client final en lui présentant les candidats aux profils les plus adéquats), dans un marché des développeurs qui est déjà structurellement très tendu.
- Les recruteurs/chasseurs de têtes se retrouvent à faire du volume et n'arrivent pas à se distinguer de leurs concurrents sur le marché du recrutement. Les recruteurs qui, grâce une bonne connaissance (**bien sûr adaptées à leur besoin, il s'agit pas d'en faire des devs !**) du métier des développeurs, arriveront à satisfaire le mieux les besoins des clients finaux qui les ont mandatés. Ils pourront ainsi positivement se distinguer de leurs concurrents et ainsi gagner plus d'argent.
- **Les développeurs aussi seront plus satisfaits, car les entretiens non-techniques ne seront plus pour eux le fardeau qu'ils représentent très souvent aujourd'hui. Ils apprécieront d'avoir face à eux des personnes qui comprennent en quoi consiste leur métier**.
- Sans vraiment pouvoir le démontrer, je suis également convaincu que beaucoup de développeurs renoncent à changer d'employeur juste pour éviter de passer par l'enfer des entretiens, rendant ainsi encore plus difficile le recrutement des bonnes compétences.

&nbsp;

Une solution à ce problème, serait de réduire l'asymétrie d'information présente dans ce marché à travers des formations visant à **accroître la connaissance qu'ont les recruteurs non-techniques** du métier de développeur web.
