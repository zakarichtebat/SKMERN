# 🔐 SKMERN Auth System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.0-green.svg)](https://vuejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10+-red.svg)](https://nestjs.com/)

**Système d'authentification complet** développé avec les technologies modernes du stack SKMERN (SQL, Kotlin/JS, Express/NestJS, React/Vue, Node.js).

## 🌟 Fonctionnalités

### ✅ Authentification Complète

- **Inscription** avec validation des données
- **Connexion** sécurisée avec JWT
- **Gestion de session** persistante
- **Protection des routes** avec guards

### 👤 Gestion de Profil Avancée

- **Informations personnelles** : nom, prénom, email, téléphone
- **Champs complémentaires** : CV, photo de profil, statut
- **Mise à jour en temps réel** du profil
- **Historique** des modifications

### 🔒 Sécurité

- **Hachage des mots de passe** avec bcrypt
- **Tokens JWT** avec expiration
- **Validation** côté client et serveur
- **Protection CORS** configurée

## 🛠 Technologies Utilisées

### Backend API

- **NestJS** - Framework Node.js robuste
- **Prisma** - ORM moderne pour TypeScript
- **MySQL** - Base de données relationnelle
- **JWT** - Authentification par tokens
- **Swagger** - Documentation API interactive

### Frontend

- **Vue.js 3** - Framework JavaScript progressif
- **Axios** - Client HTTP pour les API calls
- **CSS3** - Design moderne et responsive
- **LocalStorage** - Persistance de session

## 📁 Structure du Projet

```
SKMERN/
├── skmern-api/              # API Backend (NestJS)
│   ├── src/
│   │   ├── auth/           # Module d'authentification
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-auth.guard.ts
│   │   ├── prisma.service.ts
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma    # Schéma de base de données
│   └── package.json
│
├── WEB/Vue-skmern/         # Frontend (Vue.js)
│   ├── src/
│   │   ├── components/     # Composants Vue
│   │   │   ├── LoginForm.vue
│   │   │   ├── RegisterForm.vue
│   │   │   └── UserProfile.vue
│   │   ├── services/
│   │   │   └── api.js      # Service API Axios
│   │   ├── App.vue
│   │   └── main.js
│   └── package.json
│
└── README.md               # Documentation principale
```

## 🚀 Installation et Configuration

### Prérequis

- **Node.js** 18+
- **MySQL** 8.0+
- **npm** ou **yarn**

### 1. Cloner le repository

```bash
git clone git@github.com:zakarichtebat/SKMERN.git
cd SKMERN
```

### 2. Configuration Backend

```bash
cd skmern-api

# Installation des dépendances
npm install

# Configuration des variables d'environnement
cp .env.example .env
# Éditez le fichier .env avec vos configurations

# Génération du client Prisma
npx prisma generate

# Migration de la base de données
npx prisma db push

# Démarrage du serveur de développement
npm run start:dev
```

### 3. Configuration Frontend

```bash
cd ../WEB/Vue-skmern

# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev
```

## 🌐 URLs d'Accès

- **Frontend Vue.js** : `http://localhost:5173`
- **API Backend** : `http://localhost:3000`
- **Documentation Swagger** : `http://localhost:3000/api`

## 📋 API Endpoints

| Méthode | Endpoint         | Description         | Authentification |
| ------- | ---------------- | ------------------- | ---------------- |
| POST    | `/auth/register` | Inscription         | ❌               |
| POST    | `/auth/login`    | Connexion           | ❌               |
| GET     | `/auth/profile`  | Récupérer le profil | ✅ JWT           |
| PUT     | `/auth/profile`  | Modifier le profil  | ✅ JWT           |

## 📱 Captures d'Écran

### Interface d'Inscription

- Formulaire avec validation en temps réel
- Champs obligatoires : nom, prénom, email, téléphone, mot de passe

### Interface de Connexion

- Authentification par email et mot de passe
- Gestion des erreurs et succès

### Profil Utilisateur

- Affichage des informations personnelles
- Modification des champs complémentaires
- Interface moderne et intuitive

## 🧪 Tests avec Swagger

1. Démarrez l'API : `npm run start:dev`
2. Accédez à : `http://localhost:3000/api`
3. Testez l'inscription avec POST `/auth/register`
4. Copiez le token JWT reçu
5. Cliquez sur "Authorize" et entrez : `Bearer VOTRE_TOKEN`
6. Testez les endpoints protégés

## 🔐 Variables d'Environnement

```env
# Base de données
DATABASE_URL="mysql://username:password@localhost:3306/skmern_db"

# JWT
JWT_SECRET="votre-cle-secrete-jwt-tres-longue-et-secure"

# Serveur
PORT=3000
```

## 🏗 Modèle de Données

### Table Users

```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- nom (VARCHAR, NOT NULL)
- prenom (VARCHAR, NOT NULL)
- email (VARCHAR, UNIQUE, NOT NULL)
- tel (VARCHAR, NOT NULL)
- password (VARCHAR, NOT NULL) -- Hashé avec bcrypt
- cv (TEXT, NULLABLE)
- photo (VARCHAR, NULLABLE)
- statut (ENUM: active, inactive, pending, blocked)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

## 👨‍💻 Développeur

**Zakaria Chtebat**

- 🎓 Étudiant à l'École Supérieure de Technologie de Nador
- 💼 Spécialisation : Développement Web et Mobile
- 📧 Email : zakariachtebat@gmail.com
- 🔗 GitHub : [@zakarichtebat](https://github.com/zakarichtebat)

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contributions

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 🔄 Mises à Jour Futures

- [ ] Upload de fichiers pour les photos
- [ ] Réinitialisation de mot de passe par email
- [ ] Authentification à deux facteurs (2FA)
- [ ] Gestion des rôles et permissions
- [ ] API rate limiting
- [ ] Tests unitaires et d'intégration
- [ ] Déploiement Docker

---

⭐ **Si ce projet vous a plu, n'hésitez pas à lui donner une étoile !** ⭐
