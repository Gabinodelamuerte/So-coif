# Projet : site officiel de So Coif' (Willems)

## Objectif
Transformer la maquette `prototype-socoif.html` (un seul fichier, navigation par `#/...`) en **vrai site web multi-pages**, propre, rapide, référencé, prêt à être mis en ligne pour le salon.

Le prototype est la référence pour : le design, les textes, les tarifs, la structure des pages et l'expérience immersive de l'accueil. Ne pas réécrire les contenus, les reprendre.

## Le salon
- So Coif', coiffeur et barbier, 27 rue Jean-Baptiste Lebas, 59780 Willems (Nord)
- Tél. 03 20 34 67 16, e-mail socoif@gmail.com
- Réservation : https://www.planity.com/so-coif-willems-59780
- Facebook : https://www.facebook.com/p/Socoif-100054956426354/
- Site actuel : https://www.socoif.com (une seule page)
- Horaires : mardi au vendredi 9h30-19h, samedi 9h-18h, fermé dimanche et lundi

## Direction artistique (à conserver)
- Ambiance barbier rustique, à l'ancienne : noyer sombre, cuir rouge sang, laiton, papier kraft
- Typographies : Bevan (titres) et IM Fell English (texte)
- Accueil immersif : poteau de barbier et coupe-chou en 3D (Three.js), scroll qui ouvre la lame, son optionnel (Web Audio, coupé par défaut)
- Curseur : point blanc qui grossit sur les éléments cliquables (souris uniquement)
- Pages intérieures sobres, sans 3D

## À faire
1. **Vraies pages avec vraies URLs** : `/`, `/salon`, `/prestations`, `/equipe`, `/galerie`, `/avis`, `/contact`, `/mentions-legales` (plus de routage par hash).
2. **Stack proposée** : site statique avec Astro, la 3D de l'accueil chargée à part et seulement sur `/`. Une autre stack statique simple est acceptable si elle est justifiée.
3. **Performance** : 3D chargée en différé, repli propre sans WebGL, `prefers-reduced-motion` respecté, polices en local, images optimisées (AVIF/WebP), bon score Lighthouse mobile.
4. **SEO local** : `<title>` et meta description par page, Open Graph, `sitemap.xml`, `robots.txt`, données structurées JSON-LD (`HairSalon` : adresse, horaires, téléphone, avis agrégés, prestations principales).
5. **Accessibilité** : navigation clavier, focus visible, contrastes, textes alternatifs, HTML sémantique.
6. **Formulaire de contact** : aujourd'hui il prépare un e-mail (`mailto`). Proposer une vraie solution (Netlify Forms, Formspree ou équivalent) avec anti-spam et confirmation.
7. **Galerie** : le prototype a des cadres vides. Prévoir un dossier d'images et une galerie qui se remplit toute seule à partir de ce dossier (avec `alt` et chargement différé).
8. **Prestations** : mettre les tarifs dans un fichier de données (JSON ou YAML) modifiable sans toucher au code, avec les filtres par catégorie de la maquette.
9. **Mise en ligne** : préparer le déploiement (Netlify, Vercel ou Cloudflare Pages), avec un guide court en français pour brancher le domaine socoif.com.
10. **Tester** : lancer le site en local et vérifier chaque page sur ordinateur et sur mobile avant de conclure.

## Points à confirmer avec le salon (ne pas trancher seul)
- Horaires : le site dit 9h30 en semaine, Planity 9h, Facebook indique 8h30 le samedi.
- Prix du rasage à l'ancienne : 68 € ou 69 € selon la source (la maquette utilise 69 €).
- Gamme produits : le site met Keune en avant, Planity montre Davines, Ybera et Genoma.
- Environ 30 prestations Planity ne sont pas visibles publiquement (catégories repliées).
- Avis Google : chiffre de 4,9 sur environ 120 avis issu d'annuaires, à rafraîchir depuis la fiche officielle.
- Un annuaire évoque un second salon à Lille : absent du site officiel, ne pas l'ajouter sans confirmation.
- Mentions légales : SIREN 494 732 860, SIRET 494 732 860 00015, NAF 9602A viennent d'annuaires, à faire valider par le salon.
- Le site actuel affiche de faux avis d'exemple : ne pas les reprendre, afficher de vrais avis fournis par le salon.

## Règles de travail
- Tout le contenu du site est en français.
- Ne pas inventer d'informations sur le salon : en cas de doute, laisser un commentaire `TODO` et me poser la question.
- Ce projet part d'une maquette non officielle : garder la mention tant que le salon n'a pas validé.
