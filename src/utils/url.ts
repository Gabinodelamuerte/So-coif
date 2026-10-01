// Préfixe les liens internes avec le chemin de base du site (utile sur GitHub Pages,
// où le site vit sous /So-coif ; sur un domaine à la racine, la base vaut "/").
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (chemin: string): string => (chemin === '/' ? base || '/' : base + chemin);
export const BASE = base;
