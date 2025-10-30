# Guide du Dashboard Administrateur FIXILYA

## 🔐 Système de Rôles

Le système FIXILYA implémente un contrôle d'accès basé sur les rôles (RBAC) avec deux types d'utilisateurs :

### CLIENT (Par défaut)
- Accès aux services publics
- Consultation des services disponibles
- Gestion de son propre profil

### ADMIN (Administrateur)
- Tous les privilèges CLIENT +
- Accès au Dashboard Administrateur
- Gestion complète des services (Créer, Modifier, Supprimer)
- Gestion des utilisateurs
- Visualisation des statistiques

## 🚀 Accès au Dashboard Admin

### Compte Admin par Défaut
Après avoir exécuté le seed de la base de données, un compte admin est automatiquement créé :

```
Email: admin@fixilya.com
Mot de passe: admin123
```

### Se Connecter en tant qu'Admin
1. Allez sur la page de connexion
2. Entrez les identifiants admin
3. Une fois connecté, le bouton "⚙️ Admin" apparaît dans le header
4. Cliquez sur le bouton pour accéder au Dashboard

## 📊 Fonctionnalités du Dashboard

### 1. Statistiques
Affiche une vue d'ensemble du système :
- Nombre total d'utilisateurs
- Nombre total de services
- Nombre d'administrateurs
- Nombre de clients

### 2. Gestion des Services

#### Créer un Service
1. Cliquez sur l'onglet "🛠️ Services"
2. Cliquez sur "➕ Ajouter un service"
3. Remplissez le formulaire :
   - **Titre** : Nom du service (requis)
   - **Description** : Description détaillée (requis)
   - **Catégorie** : Type de service (requis)
   - **Icône** : Emoji ou caractère spécial (requis)
   - **Prix** : Tarif horaire en euros (requis)
   - **Note** : Note sur 5 (par défaut: 5.0)
   - **Image** : URL de l'image du service
   - **Actif** : Cochez pour activer le service
4. Cliquez sur "Enregistrer"

#### Modifier un Service
1. Dans la liste des services, cliquez sur ✏️ pour le service à modifier
2. Modifiez les champs souhaités
3. Cliquez sur "Enregistrer"

#### Supprimer un Service
1. Dans la liste des services, cliquez sur 🗑️ pour le service à supprimer
2. Confirmez la suppression

### 3. Gestion des Utilisateurs

#### Créer un Utilisateur
1. Cliquez sur l'onglet "👥 Utilisateurs"
2. Cliquez sur "➕ Ajouter un utilisateur"
3. Remplissez le formulaire :
   - **Prénom** (requis)
   - **Nom** (requis)
   - **Email** (requis)
   - **Téléphone** (requis)
   - **Mot de passe** (requis pour nouveaux utilisateurs)
   - **Rôle** : CLIENT ou ADMIN
4. Cliquez sur "Enregistrer"

#### Consulter les Utilisateurs
- Voir tous les utilisateurs du système
- Filtrer par rôle (CLIENT/ADMIN)
- Voir le statut (actif/inactif)
- Voir la date de création

#### Notes
- Un administrateur ne peut pas se supprimer lui-même
- La modification et suppression des utilisateurs sont en cours de développement

## 🔒 Sécurité Backend

### Endpoints Protégés
Les endpoints suivants sont protégés et nécessitent une authentification admin :

#### Services
- `POST /services` - Créer un service (Admin uniquement)
- `PUT /services/:id` - Modifier un service (Admin uniquement)
- `DELETE /services/:id` - Supprimer un service (Admin uniquement)
- `GET /services` - Consulter les services (Public)
- `GET /services/:id` - Détails d'un service (Public)

#### Utilisateurs
- `GET /auth/users` - Lister tous les utilisateurs (Admin uniquement)
- `POST /auth/register` - Créer un utilisateur (Public pour CLIENT, Admin pour ADMIN)

### Implémentation Technique

#### Guards
Le système utilise deux guards NestJS :
1. **JwtAuthGuard** : Vérifie l'authentification JWT
2. **RolesGuard** : Vérifie le rôle de l'utilisateur

#### Exemple de Protection
```typescript
@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
async create(@Body() dto: CreateServiceDto) {
  return this.servicesService.create(dto);
}
```

## 🎨 Interface Utilisateur

Le Dashboard Admin dispose d'une interface moderne avec :
- Navigation par onglets (Statistiques, Services, Utilisateurs)
- Tables de données interactives
- Modals pour la création/modification
- Badges de statut colorés
- Design responsive (mobile & desktop)
- Thème sombre professionnel

## 🛠️ Développement

### Créer un Admin depuis l'API
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Admin",
    "prenom": "Super",
    "email": "superadmin@fixilya.com",
    "tel": "+33600000001",
    "password": "password123",
    "role": "ADMIN"
  }'
```

### Tester l'Accès Admin
1. Connectez-vous avec un compte admin
2. Le token JWT contiendra le rôle dans le payload
3. Le frontend vérifie le rôle pour afficher le bouton Admin
4. Le backend vérifie le rôle pour autoriser les actions

## 📝 Prochaines Fonctionnalités

- [ ] Modification des utilisateurs
- [ ] Suppression des utilisateurs
- [ ] Historique des actions admin (logs)
- [ ] Gestion des réservations
- [ ] Tableau de bord analytique avancé
- [ ] Export des données (CSV, PDF)
- [ ] Notifications admin
- [ ] Gestion des catégories de services

## 🆘 Dépannage

### Le bouton Admin n'apparaît pas
- Vérifiez que l'utilisateur connecté a le rôle ADMIN
- Vérifiez que le token JWT est valide
- Vérifiez dans la console du navigateur pour les erreurs

### Erreur 403 lors de la création de service
- Vérifiez que vous êtes connecté en tant qu'admin
- Vérifiez que le token est envoyé dans les headers
- Vérifiez que le backend est démarré

### Les statistiques ne se chargent pas
- Vérifiez que le backend est accessible
- Vérifiez la connexion à la base de données
- Vérifiez les logs du backend

## 📞 Support

Pour toute question ou problème, consultez :
- README.md du projet
- SKMERN_AUTH_README.md pour l'authentification
- Logs du backend : `skmern-api/`
- Console du navigateur pour le frontend

