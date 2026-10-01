# Mettre le site en ligne et brancher socoif.com

Le site est 100 % statique : `npm run build` produit le dossier `dist/`. Recommandation : **Netlify**, car le formulaire de contact y fonctionne sans rien configurer (offre gratuite suffisante).

## 1. Publier sur Netlify

1. Créer un compte sur netlify.com et choisir **Add new site → Import an existing project**.
2. Connecter GitHub et choisir le dépôt `So-coif`, puis la branche à publier (par exemple `main` une fois la branche de travail fusionnée).
3. Les réglages sont déjà dans `netlify.toml` (commande `npm run build`, dossier `dist`). Cliquer sur **Deploy**.
4. Le site est visible sur une adresse `xxx.netlify.app`. Vérifier toutes les pages.

## 2. Brancher le domaine socoif.com

1. Dans Netlify : **Domain management → Add a domain** → saisir `socoif.com`.
2. Netlify propose deux méthodes. La plus simple et sans coupure si le domaine est déjà utilisé : **garder le DNS chez le registrar actuel** et modifier deux enregistrements chez lui (OVH, Gandi, IONOS, etc.) :
   - `www` : enregistrement **CNAME** vers `NOM-DU-SITE.netlify.app`
   - domaine nu `socoif.com` : enregistrement **A** vers `75.2.60.5` (Netlify affiche l'adresse à jour dans son interface, utiliser celle-là)
3. Supprimer les anciens enregistrements `A` et `CNAME` qui pointaient vers l'ancien hébergement. **Ne pas toucher aux enregistrements `MX`** : ils font fonctionner la messagerie.
4. Dans Netlify, définir `www.socoif.com` comme **domaine principal** (le site est configuré pour cette adresse, voir `astro.config.mjs`) : `socoif.com` sera redirigé vers `www.socoif.com`.
5. Attendre la propagation (de quelques minutes à 24 h), puis cliquer sur **Verify DNS** et activer **HTTPS** (certificat Let's Encrypt gratuit, automatique).
6. Si le domaine principal choisi est `socoif.com` sans `www`, modifier `site` dans `astro.config.mjs` et l'adresse du sitemap dans `public/robots.txt`.

## 3. Formulaire de contact (Netlify Forms)

- Après le premier déploiement, Netlify détecte le formulaire « contact » tout seul.
- Dans **Site configuration → Forms → Form notifications**, ajouter une **notification e-mail** vers `socoif@gmail.com` : sans cela, les messages restent seulement dans l'interface Netlify.
- Anti-spam : champ piège invisible (honeypot) déjà en place, plus le filtre anti-spam de Netlify (activé par défaut). Pour renforcer, activer reCAPTCHA dans les réglages du formulaire.

### Autre solution : Formspree

Dans `src/pages/contact.astro`, remplacer les attributs de `<form>` par `action="https://formspree.io/f/VOTRE_ID" method="POST"`, retirer `data-netlify` et `netlify-honeypot`, renommer le champ piège en `_gotcha`, et dans le script de la page poster vers l'adresse Formspree avec l'en-tête `Accept: application/json` au lieu de `/`.

## 4. Autres hébergeurs

- **Cloudflare Pages** : commande `npm run build`, dossier `dist`, variable `NODE_VERSION=22`. Le formulaire doit alors passer par Formspree (ci-dessus).
- **Vercel** : même principe, ajouter `{ "cleanUrls": true }` dans un `vercel.json` pour que `/salon` fonctionne sans `.html`. Formulaire via Formspree.

## 5. Après la mise en ligne

- Soumettre `https://www.socoif.com/sitemap-index.xml` dans Google Search Console.
- Revendiquer et compléter la fiche Google Business Profile (mêmes horaires que le site).
- Les anciens liens du site actuel (une seule page) tombent tous sur l'accueil : rien à rediriger.
- Avant le lancement officiel : traiter `A-CONFIRMER.md`, puis retirer la mention « maquette non officielle » (pied de page : `src/components/Footer.astro`, mentions légales : `src/pages/mentions-legales.astro`).
