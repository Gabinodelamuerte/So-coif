# Points à confirmer avec le salon

Rien de ceci n'a été tranché. Les emplacements concernés portent un commentaire `TODO`.

1. **Horaires** : le site actuel dit 9h30 en semaine, Planity 9h, Facebook 8h30 le samedi. Le site reprend la maquette (mardi au vendredi 9h30-19h, samedi 9h-18h). À changer à trois endroits : `src/pages/index.astro`, `src/pages/contact.astro` et `src/data/salon.json` (utilisé pour les données structurées Google).
2. **Rasage à l'ancienne** : 68 € ou 69 € selon la source (69 € utilisé). `src/data/prestations.json`, note `verifier`.
3. **Gamme produits** : Keune mis en avant sur le site actuel, Planity montre Davines, Ybera et Genoma. Textes Keune conservés (pages Le salon et Équipe).
4. **Prestations manquantes** : environ 30 prestations Planity ne sont pas visibles publiquement.
5. **Avis Google** : 4,9 sur environ 120 avis (annuaires), à rafraîchir depuis la fiche officielle (`src/data/avis.json`).
6. **Avis clients** : la page Avis affiche trois résumés de la maquette. À remplacer par de vrais avis fournis par le salon. Les faux avis de l'ancien site n'ont pas été repris.
7. **Second salon à Lille** évoqué par un annuaire : non ajouté.
8. **Mentions légales** : SIREN 494 732 860, SIRET 494 732 860 00015, NAF 9602A viennent d'annuaires. Le directeur de la publication est à indiquer. L'hébergeur affiché est Netlify (`salon.json`) : à adapter si autre.
9. **Photos** : les cinq photos de la galerie viennent de l'ancien site du dépôt, dont un portrait signé « Laurent Versalie » (© visible sur l'image). Confirmer que le salon a les droits, et fournir d'autres photos (équipe, rasage, couleurs, fêtes).
10. **Mention « maquette non officielle »** : à retirer une fois le site validé.
11. **Note Planity** : « 5,0 sur 1 092 avis » vient de la maquette ; les données structurées reprennent ces chiffres. À actualiser.
