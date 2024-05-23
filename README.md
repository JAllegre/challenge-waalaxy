# Waalaxy challenge

Cette petite appli gère un éditeur d'avatar avec des actions qui peuvent lui être appliquées de façon différé (changement de couleur et de taille).

## Challenge

Comme demandé dans l’énoncé du challenge :

- Après un `npm install -g nx && npm install`, le frontend et le backend peuvent être lancé avec `nx start frontend` et `nx start backend`, mais aussi avec les commandes initiales : `nx serve ...`

- L'appli gère une queue d'action (SetColor et SetSize) ainsi que son affichage avec les contraintes demandés

- Le boilerplate suivant a été utilisé https://github.com/Waapi-Pro/test-boilerplate.

- Une base sqlite a été utilisée pour simplifier le codage. Cette DB est utilisée aussi bien pour gérer la file d'attente que pour stocker l'état final de l'avatar. La base est automatiquement créée au démarrage du backend

- L'interface affiche un éditeur d'action avec l'état immédiat des changement, la queue d'actions en cours avec les crédits restants et aussi l’état courant de l'avatar

- Le code est scalable car basé sur une queue en DB (il serait préférable dans la vraie vie d'utiliser un queue manager ). On peut lancer plusieurs backend et plusieurs frontend sans souci du fait de cette gestion de queue déportée

## Notes:

- Tout est configurable dans le fichier constants.ts, notamment pour réduire les temps de polling afin de faciliter le débogage

- J'ai utilisé une simple API REST pour poster les actions et des websockets pour la remonté de messages

- J'ai ajouté un repertoire nx partagé ("shared") afin de pouvoir partager les types entre le front et le back

- La gestion CORs a été simplifié au maximum pour laisser tout entrer , dans la vrai vie il faudrait les blinder

- Aucune gestion responsive n'a été faite car ça nécessiterait trop de temps

- Quelques tests unitaires ont été ajoutés du coté backend

- J'ai due plusieurs fois effacer le repertoire .nx/ et cache/ pour que les app remarche, je ne connaissais pas nx donc à voir comment faire mieux

- Je n'ai pas utilisé de global state manager (genre redux/rtk,zustand,...) pour cet exercice car inutile du fait de la simplicité de l'architecture

- Je n'ai pas utilisé de librairie graphique particulière (genre MUI, Chakra, ...) mais je suis resté sur les styled-components comme spécifié

- J'ai essayé de montrer toutes les facettes mes compétences dans cet exercice (TS,classes, singleton, socket, rest, hooks,)

- J'ai due supprimer la règle eslint "react-hooks/exhaustive-deps" pour éviter les pièges ( cette règle est certaines autres ne devraient pas être désactivées, on peut en discuter bien sur )

## Temps passé

J'ai passé environ 2,5 jours entier pour réaliser ce projet car j'ai voulu y intégrer pas mal de choses
