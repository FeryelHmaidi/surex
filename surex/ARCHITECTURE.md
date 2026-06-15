# Surex - Gestion des Paiements et Cautions - Architecture Angular 21

## 📋 Description

Conversion complète d'une application de gestion des surestaries en une application Angular 21 structurée avec les meilleures pratiques.

## 🏗️ Architecture et Structure

### Modèles et Types (`src/app/models/`)
- **transaction.model.ts** : Définit tous les types et interfaces TypeScript fortement typés
  - `Transaction` : Interface complète pour les transactions
  - `FilterCriteria` : Critères de filtrage
  - `KPIData` : Données des indicateurs clés de performance
  - Types énumérés : `ActorType`, `TransactionType`, `StatutType`, `DeviseType`

### Services (`src/app/services/`)
- **transaction.service.ts** : Service centralisé de gestion des données
  - Gestion des transactions avec BehaviorSubjects pour la réactivité
  - Filtrage complexe basé sur les rôles utilisateurs
  - Gestion des filtres (statut, dates, recherche)
  - Calcul des KPI
  - Détermination des onglets visibles selon le rôle

### Composants (`src/app/components/`)

#### 1. **sidebar/** - Navigation principale
- Navigation responsive
- Affichage du rôle utilisateur actuel
- Icônes emoji pour chaque section
- Styles adaptatifs pour mobile

#### 2. **dashboard/** - Composant principal
- Orchestration de tous les sous-composants
- Sélecteur de rôle (Importateur, Banque, Agent Maritime)
- Affichage dynamique du titre et sous-titre selon le rôle
- Gestion des données filtrées

#### 3. **kpi-grid/** - Affichage des indicateurs
- 4 cartes KPI : Total engagé, En cours, Clôturés, Émis
- Mise à jour automatique basée sur les données filtrées
- Animations au survol

#### 4. **filters/** - Barre de filtrage
- Filtrage par statut
- Filtrage par plages de dates
- Recherche par référence ou motif
- Bouton de réinitialisation
- Liaison bidirectionnelle avec ngModel

#### 5. **tabs/** - Sélection des types de transactions
- Onglets dynamiques selon le rôle utilisateur
  - **Importateur** : Cautions, Virements DT, Virements Devises
  - **Banque** : Cautions uniquement
  - **Agent Maritime** : Virements Devises uniquement
- État actif dynamique

#### 6. **transactions-table/** - Tableau des opérations
- Affichage des transactions filtrées
- Code couleur pour les statuts
- Actions contextuelles (Approuver pour certains rôles)
- Formatage des montants et dates

## 🔄 Flux de Données Réactif

```
TransactionService (RxJS BehaviorSubjects)
         ↓
    Composants (Souscription avec takeUntil)
         ↓
    Template (Liaison de données avec async pipe ou property)
```

## 👥 Gestion des Rôles

### Importateur
- Vue : Cautions & Virements
- Permissions : Créer et gérer ses propres opérations

### Banque
- Vue : Cautions uniquement
- Permissions : Valider les cautions douanières

### Agent Maritime
- Vue : Virements Devises uniquement
- Permissions : Gérer les virements vers armateurs

## 🎨 Styles et Thème

### Couleurs principales
- Primaire : `#0f2b3d` (Bleu foncé)
- Gris : `#f3f4f6` (Fond)
- Texte : `#1f2937` (Gris foncé)

### Responsive Design
- Breakpoint : `1024px`
- Sidebar : Collapses en mode mobile
- Grid KPI : 2 colonnes sur tablette

## 📦 Dépendances

```json
{
  "@angular/common": "^21.2.0",
  "@angular/compiler": "^21.2.0",
  "@angular/core": "^21.2.0",
  "@angular/forms": "^21.2.0",
  "@angular/platform-browser": "^21.2.0",
  "@angular/router": "^21.2.0",
  "rxjs": "~7.8.0"
}
```

## 🚀 Démarrage

```bash
# Installation des dépendances
npm install

# Serveur de développement (http://localhost:4200)
npm start

# Build production
npm run build

# Tests
npm test
```

## ✅ Bonnes Pratiques Respectées

✓ **Composants Standalone** : Tous les composants sont standalone  
✓ **Typage Strict** : Aucun `any`, typage complet  
✓ **Séparation des Responsabilités** : Composants petits et focalisés  
✓ **Réactivité RxJS** : Utilisation de BehaviorSubjects et Observables  
✓ **Gestion Mémoire** : Utilisation de `takeUntil` pour unsubscribe  
✓ **Styles Modulaires** : CSS encapsulé par composant  
✓ **Architecture en Couches** : Models → Services → Components  
✓ **Format de Code** : Respecte les conventions Angular  

## 🔧 Fichiers Clés

| Fichier | Description |
|---------|-------------|
| `src/app/app.ts` | Composant racine |
| `src/app/app.routes.ts` | Configuration du routing |
| `src/app/app.config.ts` | Configuration de l'application |
| `src/app/services/transaction.service.ts` | Service de données |
| `src/app/models/transaction.model.ts` | Interfaces TypeScript |
| `src/styles.css` | Styles globaux |

## 📝 Notes de développement

- **Données simulées** : Contenues dans le service (peuvent être remplacées par appels API)
- **RxJS Operators** : `map`, `takeUntil` pour gestion optimale des Observables
- **Change Detection** : OnPush possible sur les composants de présentation
- **Localisation** : Framework en place pour i18n (dates, devise)

## 🎯 Évolutions Futures

- [ ] Ajouter des dialogues de confirmation pour actions
- [ ] Implémenter les appels API backend
- [ ] Ajouter des graphiques de suivi
- [ ] Exporter les données en PDF/Excel
- [ ] Authentification utilisateur
- [ ] Audit trail des modifications
