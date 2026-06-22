# 📑 Surex - Documentation Technique

![Angular](https://img.shields.io/badge/Angular-21-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 1. 📋 Aperçu du projet

L'application **Surex** est une plateforme web moderne développée en Angular 21, dédiée à la gestion, au suivi et à la validation des cautions bancaires (cautions douanières, garanties) et des virements (en Dinars Tunisiens et en Devises internationales) dans le cadre de la gestion des surestaries de conteneurs.

L'application s'adresse à trois principaux acteurs intervenant dans la chaîne logistique et financière :
1.  **L'Importateur** : qui initie et suit l'ensemble des opérations.
2.  **La Banque** : chargée d'approuver et de valider les cautions bancaires émises.
3.  **L'Agent Maritime** : qui valide et transfère les ordres de virement en devises vers les armateurs internationaux.

### Informations projet
*   **Nom du projet** : Surex - Gestion des Surestaries & Cautions
*   **Type** : Application Frontend Web (Angular 21)
*   **Statut** : En développement (Phase d'audit et d'optimisation)
*   **Auteur(s)** : Stagiaire Fériel (2026)
*   **Période** : Stage (Juin 2026)

---

## 2. 🎯 Fonctionnalités principales

L'application Surex s'articule autour des fonctionnalités clés suivantes :

*   **Tableau de bord dynamique multi-rôles** : L'interface s'adapte en temps réel selon le rôle sélectionné (titres, statistiques, onglets de navigation et actions autorisées).
*   **Grille d'indicateurs clés (KPI)** : Calcul automatique des statistiques (montants cumulés, volume de dossiers par statut : *En cours*, *Émis*, *Clôturé*).
*   **Système de filtrage multi-critères** : Filtrage par statut de transaction, recherche par mot-clé (référence, motif), et filtrage par plage de dates d'émission.
*   **Saisie et Modification des Cautions** : Formulaire dédié avec contrôles de saisie (RIB émetteur de 20 chiffres, cohérence des dates, montants strictement positifs).
*   **Saisie et Modification des Virements** : Formulaire de virement en Dinars Tunisiens ou en devises avec double contrôle de validité des RIB émetteur et bénéficiaire.
*   **Espace de Gestion Documentaire** : Importation de fichiers par glisser-déposer (*Drag & Drop*) de pièces jointes justificatives (BL, Swifts, BAD) avec tri par type de document et recherche textuelle.

---

## 3. 🏗️ Architecture & Stack technique

### Stack Technique

| Couche | Technologie |
| :--- | :--- |
| **Frontend** | Angular 21 (Composants Standalone, API réactive RxJS avec BehaviorSubjects) |
| **Langage** | TypeScript 5.9 (Mode strict activé) |
| **Styling** | CSS3 Vanilla (Design responsive & moderne, animations au survol) |
| **Outil de test** | Vitest & Angular Test Bed |
| **Build & Compilation** | Angular CLI / npm |

### Schéma d'Architecture Applicative

```
[ Navigateur Client / UI ]
         │
         ▼ (Liaison bidirectionnelle & Événements)
[ Composants Standalone (Smart / Dumb) ]
         │
         ▼ (Flux de données réactifs RxJS)
[ TransactionService (BehaviorSubjects) ]
         │
         ▼ (Données Mockées en mémoire)
[ Transaction / Client Local ]
```

---

## 4. 📂 Structure du projet (Frontend)

Le projet respecte une organisation modulaire structurée comme suit :

```
surex/src/
├── app/
│   ├── components/            # Composants standalone de l'interface
│   │   ├── caution-form/      # Formulaire de saisie/modification de cautions
│   │   ├── dashboard/         # Composant conteneur principal (Orchestrateur)
│   │   ├── documents/         # Espace de téléversement et gestion documentaire
│   │   ├── filters/           # Composant de filtrage des transactions
│   │   ├── kpi-grid/          # Composant de visualisation des indicateurs KPI
│   │   ├── sidebar/           # Barre de navigation latérale responsive
│   │   ├── tabs/              # Onglets adaptatifs selon le rôle utilisateur
│   │   ├── transaction-detail/# Page de détail des opérations (à implémenter)
│   │   ├── transactions-table/# Tableau d'affichage des transactions
│   │   └── virement-form/     # Formulaire de saisie/modification de virements
│   ├── models/                # Types et interfaces TypeScript
│   │   └── transaction.model.ts
│   ├── services/              # Logique métier et gestion réactive de l'état
│   │   └── transaction.service.ts
│   ├── app.ts                 # Composant racine (Bootstrap)
│   ├── app.html               # Gabarit HTML principal
│   ├── app.css                # Styles CSS globaux de l'infrastructure
│   ├── app.routes.ts          # Définition des routes de l'application
│   └── app.config.ts          # Fournisseurs et configurations système
├── styles.css                 # Thème et styles CSS globaux de l'application
├── main.ts                    # Fichier de démarrage de l'application
└── index.html                 # Point d'entrée HTML
```

---

## 5. ⚙️ Prérequis

Pour pouvoir compiler et exécuter l'application localement, vous devez disposer des outils suivants sur votre poste :

*   **Node.js** : Version 18.x ou supérieure (LTS recommandée).
*   **npm** : Version 9.x ou supérieure.
*   **Angular CLI** : Version 21.x.

---

## 6. 🚀 Installation et Démarrage

### 1. Cloner le projet
```bash
git clone <url-du-depot-gitlab>
cd surex
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm start
```
L'application compilera à chaud et sera accessible à l'adresse suivante : **`http://localhost:4200`**.

---

## 7. 🔧 Configuration

### Fichiers d'environnement
Actuellement, les fichiers d'environnement configurés dans le projet se situent dans la structure standard de build :

*   **Mode Local / Développement** : Configuré pour s'exécuter localement.
*   **Appels API** : Actuellement simulés localement au sein du service de données. Pour basculer vers un backend Spring Boot (comme dans l'exemple de référence), un fichier `src/environments/environment.ts` doit être créé contenant la clé `apiUrl: 'http://localhost:8080/api'`.

---

## 8. 📦 Modules et composants principaux

### Description des Composants UI

| Composant | Description | Route |
| :--- | :--- | :--- |
| `DashboardComponent` | Orchestre la page d'accueil, souscrit aux données filtrées du service et affiche les sous-composants correspondants. | `/` et `/dashboard` |
| `CautionFormComponent` | Contient le formulaire d'édition/création des cautions. Valide les informations de garantie et les RIB bancaires. | `/caution/new` et `/caution/:id` |
| `VirementFormComponent` | Contient le formulaire d'édition/création de virement. Valide les données des bénéficiaires et les RIB. | `/virement/new` et `/virement/:id` |
| `DocumentsComponent` | Propose un espace d'association de fichiers justificatifs aux conteneurs, avec tri et prévisualisation. | `/documents` |
| `SidebarComponent` | Fournit le menu de navigation et adapte ses éléments d'affichage au rôle connecté. | Partagé |
| `TransactionsTableComponent` | Affiche la liste tabulaire filtrée des transactions et contient les boutons d'action. | Partagé |

---

## 9. 🛣️ Routes principales

L'application implémente un routage réactif défini dans le fichier [app.routes.ts](file:///C:/Users/user/Desktop/stageferiel2026/surex/src/app/app.routes.ts) :

| Route | Composant Associé | Garde (Guard) | Description |
| :--- | :--- | :--- | :--- |
| `/` | `DashboardComponent` | Aucune | Redirection vers le tableau de bord de l'utilisateur connecté |
| `/dashboard` | `DashboardComponent` | Aucune | Tableau de bord principal avec les KPIs et la table des transactions |
| `/caution/new` | `CautionFormComponent` | Aucune | Formulaire de création d'une caution douanière ou de bonne exécution |
| `/caution/:id` | `CautionFormComponent` | Aucune | Formulaire de modification d'une caution existante (chargement par ID) |
| `/virement/new` | `VirementFormComponent` | Aucune | Formulaire de création d'un virement (Dinar ou Devises) |
| `/virement/:id` | `VirementFormComponent` | Aucune | Formulaire de modification d'un virement existant (chargement par ID) |
| `/documents` | `DocumentsComponent` | Aucune | Gestionnaire de documents associés (BL, factures, BAD) |

---

## 10. 🔐 Authentification & Sécurité

*   **Gestion des rôles (Simulée)** : L'application n'intègre pas encore de protocole OAuth2 ou JWT. L'authentification et les droits d'accès sont gérés via le service réactif en fonction du rôle sélectionné dans l'en-tête (Importateur, Banque, Agent Maritime).
*   **Protection CSRF et XSS** : L'utilisation des directives standard d'Angular et la liaison de propriétés désactivent les injections de scripts HTML dans les templates.

---

## 11. 🔌 Services & API (Endpoints consommés)

### `TransactionService`

Le service central [transaction.service.ts](file:///C:/Users/user/Desktop/stageferiel2026/surex/src/app/services/transaction.service.ts) expose les méthodes suivantes :

| Méthode | Type de retour | Description |
| :--- | :--- | :--- |
| `getCurrentActor()` | `Observable<ActorType>` | Récupère le rôle actif actuel (Importateur, Banque, Agent). |
| `setCurrentActor(actor)` | `void` | Met à jour le rôle actif et diffuse la modification à tous les abonnés. |
| `getFilteredTransactions()` | `Observable<Transaction[]>` | Combine les flux de filtres, de rôles et d'onglets pour renvoyer la liste filtrée des transactions. |
| `getKPIData(transactions)` | `KPIData` | Calcule dynamiquement les indicateurs à afficher dans les cartes KPI. |
| `getVisibleTabs(actor)` | `TransactionType[]` | Renvoie la liste des onglets visibles selon le rôle connecté. |

---

## 12. 🧪 Tests

### Commandes d'exécution
*   **Tests unitaires** : `npm test` (Exécution via le test runner Vitest).

### Couverture des tests

| Type | Outil | Couverture actuelle |
| :--- | :--- | :--- |
| **Unitaires** | Vitest | ~5% (Un seul fichier `app.spec.ts` présent et actuellement en échec) |
| **E2E** | Non configuré | 0% |

---

## 13. 📦 Build & Déploiement

### Commande de compilation de production
```bash
npm run build
```
Cette commande génère des artefacts optimisés et minifiés dans le dossier `dist/surex/`, prêts à être déployés sur un serveur web (Nginx, Apache) ou une plateforme de cloud (Netlify, Vercel).
