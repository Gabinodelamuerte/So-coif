# So Coif' : site officiel (Willems)

Site statique multi-pages construit avec [Astro](https://astro.build). Maquette de référence : `docs/prototype-socoif.html`. Cahier des charges : `CLAUDE.md`.

> Ce site part d'une maquette non officielle : la mention reste affichée (pied de page et mentions légales) tant que le salon ne l'a pas validé. Les points à faire confirmer sont listés dans [`A-CONFIRMER.md`](A-CONFIRMER.md).

## Commandes

```bash
npm install        # une fois
npm run dev        # site en local sur http://localhost:4321
npm run build      # génère le site dans dist/
npm run preview    # prévisualise le build
```

Node 20 ou plus récent.

## Pages

`/`, `/salon`, `/prestations`, `/equipe`, `/galerie`, `/avis`, `/contact`, `/mentions-legales` (+ `/merci` après envoi du formulaire, et une page 404). Une page = un fichier de `src/pages/`.

## Modifier le contenu sans toucher au code

| Quoi | Où |
| --- | --- |
| Tarifs et prestations (catégories, filtres, carte de l'accueil) | `src/data/prestations.json` |
| Coordonnées, horaires, mentions légales | `src/data/salon.json` (les horaires affichés sont aussi dans `index.astro` et `contact.astro`, voir `A-CONFIRMER.md`) |
| Équipe | `src/data/equipe.json` |
| Avis et notes | `src/data/avis.json` |
| Photos de la galerie | déposer les images dans `src/assets/galerie/` |
| Texte alternatif des photos | `src/data/galerie-alt.json` (facultatif, clé = nom du fichier) |

### Galerie

Déposez des `.jpg`, `.png`, `.webp` ou `.avif` dans `src/assets/galerie/` : la galerie se remplit toute seule, par ordre alphabétique du nom de fichier (préfixez par `01-`, `02-`… pour choisir l'ordre). Les images sont converties automatiquement en AVIF et WebP, à plusieurs tailles, et chargées en différé. Pensez à décrire chaque photo dans `galerie-alt.json`.

### Tarifs

Dans `prestations.json`, chaque catégorie a un `id`, un `filtre` (libellé du bouton), un `titre`, une `intro` facultative et ses `prestations` (`nom`, `prix`, `duree`, `description`). Ajouter `"accueil": { "libelle": "…", "ordre": 9 }` à une prestation la fait apparaître sur la carte de la page d'accueil. Le champ `verifier` est une note interne, jamais affichée.

## Accueil immersif

- `src/scripts/accueil.js` : scroll, poteau et coupe-chou 3D, son (coupé par défaut). Chargé uniquement sur `/`.
- Three.js est chargé à part (fichier séparé), après l'affichage de la page. Tant qu'il n'est pas prêt, ou sans WebGL, un poteau en CSS prend le relais.
- `prefers-reduced-motion` est respecté (poteau sans rotation automatique, pas d'animation CSS).
- Three.js est volontairement figé en `0.128.0`, la version de la maquette : les versions récentes changent le calcul des lumières et donc l'aspect de la scène.

## Formulaire de contact

Par défaut Netlify Forms (Formspree ou ouverture de la messagerie selon les variables de construction) : anti-spam par champ piège (honeypot) et filtre Netlify, confirmation sur `/merci`. Sans JavaScript, le formulaire fonctionne aussi. En local (`npm run dev`), l'envoi échoue et le message d'erreur s'affiche : c'est normal, il faut être hébergé sur Netlify. Détails et alternatives (Formspree) dans [`DEPLOIEMENT.md`](DEPLOIEMENT.md).

## Mise en ligne

GitHub Pages (workflow inclus) ou Netlify : détails dans `DEPLOIEMENT.md`. Variables de construction utiles : `SITE`, `BASE` (chemin de base), `PUBLIC_FORM_MODE=mailto`, `PUBLIC_FORM_ENDPOINT` (Formspree), `PUBLIC_HOST=github`.

Voir [`DEPLOIEMENT.md`](DEPLOIEMENT.md).
