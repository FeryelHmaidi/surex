# Surex - Payment & Collateral Management System

A modern Angular 21 application for managing maritime commerce payments, transfer operations, and collateral (cautions) across multiple user roles: Importers, Banks, and Maritime Agents.

## 📋 Project Overview

**Surex** is a comprehensive financial transaction management system designed for complex logistics and maritime trade workflows. It provides role-based dashboards, advanced filtering, KPI tracking, and secure transaction management for different stakeholders in the supply chain.

### Key Features
- 🔐 **Role-Based Access Control** - Separate workflows for Importers, Banks, and Maritime Agents
- 📊 **Interactive Dashboard** - Real-time KPIs and transaction overview
- 🔍 **Advanced Filtering** - Filter by status, date range, and search criteria
- 💳 **Multi-Type Transactions** - Support for Cautions (Collateral), Dinar Transfers, and Currency Transfers
- 📈 **Performance Metrics** - Track committed funds, in-progress, closed, and issued operations

## 🚀 Getting Started

### Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🏗️ Project Architecture

### Directory Structure
```
src/app/
├── models/              # TypeScript interfaces and types
│   └── transaction.model.ts
├── services/            # Core business logic
│   └── transaction.service.ts
└── components/          # Reusable UI components
    ├── dashboard/       # Main orchestrator component
    ├── sidebar/         # Navigation sidebar
    ├── kpi-grid/        # Performance metrics display
    ├── filters/         # Transaction filtering controls
    ├── tabs/            # Transaction type selector
    ├── transactions-table/  # Data grid display
    ├── caution-form/    # Collateral management form
    ├── virement-form/   # Transfer form
    └── documents/       # Document management
```

### Technology Stack
- **Framework**: Angular 21 (Latest standalone components)
- **Language**: TypeScript 5+
- **Styling**: CSS with responsive design
- **Testing**: Vitest for unit tests
- **State Management**: RxJS BehaviorSubjects
- **Build Tool**: Angular CLI

## 👥 User Roles

- **Importateur (Importer)** - Can view and manage cautions and transfer operations
- **Banque (Bank)** - Can validate and manage collateral operations  
- **Agent Maritime (Maritime Agent)** - Manages currency transfer operations

## 📦 Code Scaffolding

## 📦 Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## 🔨 Building

To build the project for production, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## ✅ Testing

### Unit Tests

To execute unit tests with [Vitest](https://vitest.dev/), run:

```bash
ng test
```

### End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📚 Documentation

For detailed documentation on the project architecture, best practices, and migration guides, see:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Complete system design and component breakdown
- [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Development guidelines and coding standards
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing strategies and examples
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Setup and initial configuration
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Upgrade and migration documentation
- [CHANGELOG.md](./CHANGELOG.md) - Version history and updates

## 🔗 Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## 📝 License

This project is part of the MSS 2024 stageferiel initiative.
