# Mettre le site en ligne et brancher socoif.com

Le site est 100 % statique : `npm run build` produit le dossier `dist/`. Recommandation : **Netlify**, car le formulaire de contact y fonctionne sans rien configurer (offre gratuite suffisante).

## 0. Option la plus simple : GitHub Pages (adresse en github.io)

Le dépôt contient déjà le workflow `.github/workflows/pages.yml`. Une fois pour toutes, dans GitHub :

1. **Settings → Pages → Build and deployment → Source : GitHub Actions**.
2. Le workflow se lance à chaque push sur `main` ou sur la branche `claude/acces-ressource-sthyfb` (onglet **Actions** pour suivre). Si le déploiement depuis cette branche est refusé (règle de l'environnement `github-pages`), fusionnez la pull request dans `main`, ou autorisez la branche dans **Settings → Environments → github-pages → Deployment branches**.
3. Le site est alors en ligne sur **https://gabinodelamuerte.github.io/So-coif/**.

Limites de GitHub Pages : pas de back-end, donc **Netlify Forms ne marche pas**. Par défaut, le formulaire de contact ouvre la messagerie du visiteur avec le message prêt à envoyer. Pour un vrai envoi sans quitter le site : créer un formulaire sur formspree.io (gratuit), puis dans **Settings → Secrets and variables → Actions → Variables**, ajouter la variable `FORM_ENDPOINT` avec l'adresse Formspree (`https://formspree.io/f/xxxx`) et relancer le workflow.

Pour brancher plus tard socoif.com sur GitHub Pages : **Settings → Pages → Custom domain**, mais il faudra alors construire le site sans le chemin `/So-coif` (retirer `BASE` dans le workflow et mettre `SITE` à `https://www.socoif.com`).

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

Dans `src/pages/contact.astro`, remplacer les attributs de `<form>` par `action="https://formspree.io/f/VOTRE_ID" method="POST"`, retirer `data-netlify` et `netlify-honeypot`, et dans le script de la page poster vers l'adresse Formspree avec l'en-tête `Accept: application/json` au lieu de `/`.

## 4. Autres hébergeurs

- **Cloudflare Pages** : commande `npm run build`, dossier `dist`, variable `NODE_VERSION=22`. Le formulaire doit alors passer par Formspree (ci-dessus).
- **Vercel** : même principe, ajouter `{ "cleanUrls": true }` dans un `vercel.json` pour que `/salon` fonctionne sans `.html`. Formulaire via Formspree.

## 5. Après la mise en ligne

- Soumettre `https://www.socoif.com/sitemap-index.xml` dans Google Search Console.
- Revendiquer et compléter la fiche Google Business Profile (mêmes horaires que le site).
- Les anciens liens du site actuel (une seule page) tombent tous sur l'accueil : rien à rediriger.
- Avant le lancement officiel : traiter `A-CONFIRMER.md`, puis retirer la mention « maquette non officielle » (pied de page : `src/components/Footer.astro`, mentions légales : `src/pages/mentions-legales.astro`).
