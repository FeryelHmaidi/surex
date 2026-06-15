# 🚀 Guide de Démarrage - Surex Angular 21

## ✅ Prérequis

- **Node.js** : v18+ (LTS recommandé)
- **npm** : v9+
- **Angular CLI** : v21 (installé globalement ou via npx)

Vérifier l'installation :
```bash
node --version
npm --version
ng version
```

## 📦 Installation

### 1. Naviguer dans le dossier du projet
```bash
cd c:\Users\user\Desktop\stageferiel2026\surex
```

### 2. Installer les dépendances
```bash
npm install
```

Cela va télécharger tous les packages nécessaires (~500MB).

## 🎮 Démarrer l'Application

### Mode Développement (avec hot reload)
```bash
npm start
```

L'application sera accessible à : **http://localhost:4200**

### Mode Production (optimisé)
```bash
npm run build
```

Les fichiers optimisés seront dans `dist/surex/`

## 🧪 Tester l'Application

### 1. **Tester les Rôles**
   - Utilisez le sélecteur "👤 Rôle" en haut à droite
   - Changez entre : **Importateur**, **Banque**, **Agent Maritime**
   - Les onglets et données changent dynamiquement

### 2. **Tester les Filtres**
   - Statut : Tous, En cours, Clôturé, Émis
   - Plages de dates : Du / Au
   - Recherche : Référence ou motif
   - Réinitialiser : Remet tous les filtres

### 3. **Tester les Onglets**
   - **Importateur** : Voit 3 onglets
   - **Banque** : Voit que "Cautions"
   - **Agent Maritime** : Voit que "Virements Devises"

### 4. **Vérifier les KPI**
   - Total engagé en devise
   - Nombre de dossiers en cours
   - Nombre de validés
   - Nombre émis

## 📝 Structure du Projet

```
surex/
├── src/
│   ├── app/
│   │   ├── components/          # Composants UI
│   │   │   ├── dashboard/
│   │   │   ├── sidebar/
│   │   │   ├── kpi-grid/
│   │   │   ├── filters/
│   │   │   ├── tabs/
│   │   │   └── transactions-table/
│   │   ├── services/            # Logique métier
│   │   │   └── transaction.service.ts
│   │   ├── models/              # Types TypeScript
│   │   │   └── transaction.model.ts
│   │   ├── app.ts               # Composant root
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app.routes.ts        # Routing
│   │   └── app.config.ts        # Configuration
│   ├── styles.css               # Styles globaux
│   ├── main.ts                  # Bootstrap
│   └── index.html               # HTML racine
├── public/
├── package.json
├── angular.json                 # Configuration Angular
├── tsconfig.json                # Configuration TypeScript
└── ARCHITECTURE.md              # Documentation d'architecture
```

## 🔧 Commandes Utiles

```bash
# Démarrer le serveur de développement
npm start

# Compiler uniquement
npm run build

# Exécuter les tests
npm test

# Lint du code
ng lint

# Générer un nouveau composant
ng generate component components/mon-composant

# Générer un service
ng generate service services/mon-service
```

## 🛠️ Configuration de l'Éditeur (VS Code)

### Extensions Recommandées
1. **Angular Language Service**
2. **TypeScript Vue Plugin (Volar)**
3. **Prettier - Code formatter**
4. **ESLint**
5. **Angular Snippets (John Papa)**

### Paramètres VS Code (settings.json)
```json
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "editor.tabSize": 2
}
```

## 🐛 Dépannage

### Port 4200 déjà utilisé
```bash
ng serve --port 4300
```

### Cache npm problématique
```bash
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

### Erreurs de compilation
```bash
# Réinitialiser Angular
ng cache clean
npm run build
```

### Hot reload ne fonctionne pas
```bash
# Redémarrer le serveur
# Ctrl+C
npm start
```

## 📱 Responsive Design

L'application s'adapte à tous les écrans :
- **Desktop** (1024px+) : Sidebar complet, grid 4 colonnes
- **Tablette** (768px-1024px) : Sidebar réduit, grid 2 colonnes
- **Mobile** (< 768px) : Sidebar collapsé, layout vertical

## 🔐 Sécurité

✅ Typage strict TypeScript  
✅ Pas d'évaluation de code dynamique (`eval` supprimé)  
✅ Angular XSS Protection activée par défaut  
✅ CSP Compatible  

## 📈 Performance

- **Bundle size** : ~71 KB (gzipped)
- **Load time** : < 2 secondes
- **Change detection** : Optimisé avec RxJS

## 🚀 Déploiement

### Déploiement sur Vercel
```bash
npm install -g vercel
vercel
```

### Déploiement sur Netlify
```bash
npm run build
# Uploader le dossier dist/surex
```

### Déploiement Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]
```

## 📞 Support et Documentation

- **Angular Docs** : https://angular.io/docs
- **RxJS Docs** : https://rxjs.dev
- **TypeScript Docs** : https://www.typescriptlang.org/docs
- **Architecture.md** : Documentation complète du projet

## ✨ Bonnes Pratiques

✅ Utiliser `ng generate` pour créer composants/services  
✅ Garder les composants petits (< 300 lignes)  
✅ Utiliser les types TypeScript partout  
✅ Unsubscriber avec `takeUntil` dans ngOnDestroy  
✅ Éviter les subscriptions imbriquées  
✅ Utiliser les Observables plutôt que les Promises  

## 🎯 Prochaines Améliorations

- [ ] Ajouter une authentification
- [ ] Intégrer une API backend
- [ ] Ajouter des tests unitaires
- [ ] Implémenter des graphiques
- [ ] Ajouter export PDF/Excel
- [ ] Implémenter la pagination
- [ ] Ajouter des validations de formulaires avancées

---

**Créé avec ❤️ Angular 21**  
**Dernière mise à jour** : 2026-06-15
