# So Coif' — Site web

## Structure du projet

```
socoif/
├── index.html          ← Page principale du site
├── css/
│   └── style.css       ← Toute la mise en forme
├── js/
│   └── main.js         ← Interactions (menu, formulaire, animations)
├── images/
│   ├── barbier-portrait.jpg
│   ├── barbier-dyson.png
│   ├── coupe-precision.png
│   ├── atelier-socoif.jpg
│   └── salon-bac.jpg
└── README.md           ← Ce fichier
```

---

## Utiliser avec l'application "Local" (by WP Engine)

Local est prévu pour WordPress. Pour utiliser ce site HTML statique avec Local, deux options :

### Option A — Utiliser Local en mode "PHP simple" (recommandé)

1. Ouvrir **Local**
2. Créer un nouveau site → choisir **"Custom"** comme environnement
3. Une fois le site créé, ouvrir le dossier du site :
   - Clic droit sur le site → **"Open site folder"** (ou **"Reveal in Finder/Explorer"**)
4. Aller dans `app/public/`
5. **Supprimer** tous les fichiers WordPress présents
6. **Copier** tous les fichiers du dossier `socoif/` dans `app/public/`
7. Dans Local, cliquer sur **"Open site"** → le site s'affiche !

### Option B — Serveur local simple (sans Local)

Si tu veux juste prévisualiser le site sans WordPress :

**Avec VS Code :**
- Installer l'extension "Live Server"
- Ouvrir le dossier `socoif/`
- Clic droit sur `index.html` → "Open with Live Server"

**Avec Python (terminal) :**
```bash
cd socoif
python3 -m http.server 8000
# Ouvrir http://localhost:8000
```

---

## Personnaliser le site

### Modifier les textes
Ouvrir `index.html` dans n'importe quel éditeur de texte (VS Code, Notepad++, etc.)

### Modifier les couleurs
Ouvrir `css/style.css` et changer les variables en haut du fichier :
```css
:root {
  --gold: #C9A84C;     /* Couleur or */
  --noir: #0A0A0A;     /* Fond noir */
  --ivory: #F5F0E8;    /* Texte clair */
}
```

### Remplacer les images
Remplacer les fichiers dans le dossier `images/` en gardant les mêmes noms de fichiers.

### Modifier les tarifs / prestations
Dans `index.html`, chercher la section `id="services"` et modifier les prix et descriptions.

---

## Mise en ligne (hébergement)

Pour publier le site sur internet, il suffit d'uploader tout le contenu du dossier `socoif/`
sur n'importe quel hébergeur web (OVH, Infomaniak, o2switch, Hostinger…) via FTP.

Aucune base de données nécessaire — c'est un site HTML statique.
