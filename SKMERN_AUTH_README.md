# SKMERN - Système d'Authentification Complet

## Vue d'ensemble

Ce projet implémente un système d'authentification complet avec :

- **API Backend** : NestJS avec Prisma et MySQL
- **Frontend** : Vue.js 3 avec Axios
- **Authentification JWT** avec gestion des sessions
- **Gestion des profils utilisateur** avec champs complémentaires

## Structure des Données

### Modèle Utilisateur

**Champs obligatoires à l'inscription :**

- `nom` : Nom de famille
- `prenom` : Prénom
- `email` : Adresse email (unique)
- `tel` : Numéro de téléphone
- `password` : Mot de passe (hashé avec bcrypt)

**Champs complémentaires (modifiables après inscription) :**

- `cv` : Curriculum vitae / description professionnelle
- `photo` : URL de la photo de profil
- `statut` : Statut du compte (active/inactive/pending/blocked)

**Champs système :**

- `id` : Identifiant unique
- `createdAt` : Date de création
- `updatedAt` : Date de dernière modification

## Configuration

### 1. Configuration de l'API (Backend)

#### Variables d'environnement

Créez un fichier `.env` dans le dossier `skmern-api/` :

```env
# Configuration de la base de données
DATABASE_URL="mysql://username:password@localhost:3306/skmern_db"

# Configuration JWT
JWT_SECRET="votre-cle-secrete-jwt-tres-longue-et-secure"

# Port du serveur
PORT=3000
```

#### Installation et démarrage

```bash
cd skmern-api

# Installation des dépendances
npm install

# Génération du client Prisma
npx prisma generate

# Migration de la base de données
npx prisma db push

# Démarrage en mode développement
npm run start:dev
```

### 2. Configuration du Frontend

#### Installation et démarrage

```bash
cd WEB/Vue-skmern

# Installation des dépendances
npm install

# Démarrage en mode développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## Fonctionnalités

### 1. Inscription

- Formulaire avec les champs : nom, prénom, email, téléphone, mot de passe
- Validation des données côté client et serveur
- Génération automatique du token JWT
- Redirection vers le profil après inscription

### 2. Connexion

- Authentification par email et mot de passe
- Génération du token JWT
- Sauvegarde de la session dans localStorage
- Redirection vers le profil après connexion

### 3. Gestion du Profil

- Affichage des informations personnelles (non modifiables)
- Modification des informations complémentaires (CV, photo, statut)
- Affichage des informations système (dates)
- Déconnexion

### 4. Sécurité

- Mots de passe hashés avec bcrypt
- Tokens JWT avec expiration (24h)
- Validation des données avec class-validator
- Protection CORS configurée

## Endpoints API

### Authentification

| Méthode | Endpoint         | Description         | Corps de la requête                   |
| ------- | ---------------- | ------------------- | ------------------------------------- |
| POST    | `/auth/register` | Inscription         | `{nom, prenom, email, tel, password}` |
| POST    | `/auth/login`    | Connexion           | `{email, password}`                   |
| GET     | `/auth/profile`  | Récupérer le profil | Requiert token JWT                    |
| PUT     | `/auth/profile`  | Modifier le profil  | `{cv?, photo?, statut?}` + token JWT  |

### Réponses

**Succès d'authentification :**

```json
{
  "user": {
    "id": 1,
    "nom": "Doe",
    "prenom": "John",
    "email": "john@example.com",
    "tel": "1234567890",
    "cv": null,
    "photo": null,
    "statut": "active",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Architecture Technique

### Backend (NestJS)

```
src/
├── auth/
│   ├── dto/
│   │   ├── register.dto.ts
│   │   ├── login.dto.ts
│   │   └── update-profile.dto.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── prisma.service.ts
├── app.module.ts
└── main.ts
```

### Frontend (Vue.js)

```
src/
├── components/
│   ├── LoginForm.vue
│   ├── RegisterForm.vue
│   └── UserProfile.vue
├── services/
│   └── api.js
├── App.vue
└── main.js
```

## Utilisation

1. **Première visite** : L'utilisateur voit le formulaire de connexion/inscription
2. **Inscription** : Remplir les champs obligatoires (nom, prénom, email, téléphone, mot de passe)
3. **Connexion automatique** : Après inscription, l'utilisateur est automatiquement connecté
4. **Profil** : L'utilisateur peut consulter et modifier son profil
5. **Champs complémentaires** : CV, photo, et statut peuvent être ajoutés/modifiés
6. **Persistance** : La session est sauvegardée et restaurée au rafraîchissement

## Validation

### Côté Client (Vue.js)

- Validation des formats (email, URL)
- Vérification de la concordance des mots de passe
- Longueur minimale du mot de passe (6 caractères)

### Côté Serveur (NestJS)

- Validation des DTOs avec class-validator
- Vérification de l'unicité de l'email
- Sanitisation des données

## Personnalisation

### Statuts disponibles

- `active` : Utilisateur actif (par défaut)
- `inactive` : Utilisateur inactif
- `pending` : En attente de validation
- `blocked` : Utilisateur bloqué

### Styles

Le design utilise un thème moderne avec :

- Gradient de fond
- Effets de transparence (backdrop-filter)
- Design responsive
- Animations CSS

## Dépannage

### Erreurs communes

1. **Erreur de connexion à la base de données**

   - Vérifiez la `DATABASE_URL` dans le fichier `.env`
   - Assurez-vous que MySQL est démarré

2. **Erreur CORS**

   - Vérifiez que l'URL du frontend correspond à celle configurée dans `main.ts`

3. **Token expiré**

   - Les tokens expirent après 24h, l'utilisateur doit se reconnecter

4. **Erreur de validation**
   - Vérifiez que tous les champs obligatoires sont remplis
   - Respectez les formats requis (email valide, etc.)

## Sécurité

- **Jamais** de mot de passe en clair en base
- **Jamais** de token JWT dans les logs
- Utilisez HTTPS en production
- Configurez les variables d'environnement de manière sécurisée
- Changez la clé JWT en production

## Next Steps

Pour aller plus loin, vous pourriez ajouter :

- Upload de fichiers pour les photos
- Réinitialisation de mot de passe par email
- Authentification à deux facteurs
- Gestion des rôles et permissions
- Limitation du taux de requêtes
- Logs d'audit
