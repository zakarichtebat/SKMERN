# Guide du Système d'Upload d'Images FIXILYA

## 📸 Système de Téléchargement d'Images

Le système FIXILYA permet maintenant aux administrateurs de télécharger directement des images pour les services, au lieu d'entrer des URLs.

## 🎯 Fonctionnalités

### Upload d'Images
- **Format acceptés** : JPG, JPEG, PNG, GIF, WEBP
- **Taille maximale** : 5 MB par image
- **Aperçu en temps réel** : Voir l'image avant l'enregistrement
- **Protection** : Seuls les administrateurs peuvent uploader des images
- **Stockage sécurisé** : Images stockées sur le serveur dans `/uploads/services/`

## 🚀 Utilisation

### Ajouter un Service avec Image

1. **Accéder au Dashboard Admin**
   - Connectez-vous avec un compte admin
   - Cliquez sur "⚙️ Admin" dans le header
   - Allez dans l'onglet "🛠️ Services"

2. **Créer un Nouveau Service**
   - Cliquez sur "➕ Ajouter un service"
   - Remplissez les informations du service

3. **Télécharger une Image**
   - Dans le champ "Image du service", cliquez sur "Choisir un fichier"
   - Sélectionnez une image depuis votre ordinateur
   - Un aperçu de l'image s'affiche immédiatement
   - Pour changer l'image, cliquez sur le ✕ dans le coin de l'aperçu

4. **Enregistrer**
   - Cliquez sur "Enregistrer"
   - L'image est automatiquement uploadée sur le serveur
   - Un message "📤 Upload en cours..." s'affiche pendant l'upload
   - Le service est créé avec l'image uploadée

### Modifier une Image Existante

1. Dans la liste des services, cliquez sur ✏️ pour le service
2. L'aperçu de l'image actuelle s'affiche
3. Cliquez sur "Choisir un fichier" pour sélectionner une nouvelle image
4. L'ancienne image sera remplacée à l'enregistrement

## 🔧 Architecture Technique

### Backend (NestJS)

#### Endpoint d'Upload
```
POST /upload/service-image
Headers: Authorization: Bearer <JWT_TOKEN>
Body: multipart/form-data avec le champ 'file'
```

**Réponse :**
```json
{
  "filename": "service-1730316000000-123456789.jpg",
  "path": "/uploads/services/service-1730316000000-123456789.jpg",
  "size": 245678,
  "mimetype": "image/jpeg"
}
```

#### Configuration Multer
- **Destination** : `./uploads/services/`
- **Naming** : `service-{timestamp}-{random}.{extension}`
- **Filtres** : Seules les images sont acceptées
- **Limite** : 5 MB maximum

#### Serveur de Fichiers Statiques
Les images sont servies via :
```
http://localhost:3000/uploads/services/{filename}
```

### Frontend (Vue.js)

#### Upload Service
```javascript
import { uploadService } from './services/api.js'

// Upload une image
const response = await uploadService.uploadServiceImage(file)
// response.data.path contient le chemin de l'image
```

#### Affichage des Images
Les images uploadées sont automatiquement affichées avec l'URL complète :
```javascript
getImageUrl(imagePath) {
  if (imagePath.startsWith('/uploads/')) {
    return `http://localhost:3000${imagePath}`
  }
  return imagePath
}
```

## 📁 Structure des Fichiers

```
skmern-api/
├── uploads/
│   ├── .gitignore                    # Ignore les images uploadées
│   └── services/
│       ├── .gitignore                # Ignore les images de services
│       └── service-*.jpg/png/...     # Images uploadées (non versionnées)
├── src/
│   ├── upload/
│   │   ├── upload.controller.ts     # Controller d'upload
│   │   └── upload.module.ts         # Module d'upload
│   └── main.ts                       # Configuration fichiers statiques
```

## 🔒 Sécurité

### Protection des Endpoints
- **Authentication** : JWT requis via `JwtAuthGuard`
- **Authorization** : Rôle ADMIN requis via `RolesGuard` et `@Roles(UserRole.ADMIN)`
- **Validation** : 
  - Type de fichier vérifié (images uniquement)
  - Taille de fichier limitée (5 MB max)
  - Extension de fichier validée

### Exemple de Protection
```typescript
@Post('service-image')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth('JWT-auth')
uploadServiceImage(@UploadedFile() file: Express.Multer.File) {
  // ...
}
```

## 🗄️ Base de Données

Les chemins d'images sont stockés dans la table `services` :
```sql
image VARCHAR(255) -- Ex: "/uploads/services/service-1730316000000-123456789.jpg"
```

## 🐛 Dépannage

### Erreur : "Aucun fichier fourni"
- Vérifiez que vous avez bien sélectionné un fichier
- Assurez-vous que le champ file input n'est pas vide

### Erreur : "Seules les images sont autorisées"
- Le fichier doit être au format JPG, JPEG, PNG, GIF ou WEBP
- Vérifiez l'extension du fichier

### Erreur : Taille de fichier trop grande
- La taille maximale est de 5 MB
- Compressez l'image avant de l'uploader

### Image ne s'affiche pas
- Vérifiez que le backend est démarré sur le port 3000
- Vérifiez que le chemin de l'image dans la BDD est correct
- Ouvrez http://localhost:3000/uploads/services/{filename} dans le navigateur

### Erreur 403 lors de l'upload
- Vérifiez que vous êtes connecté en tant qu'admin
- Vérifiez que le token JWT est valide
- Reconnectez-vous si nécessaire

## 📊 Avantages du Système

### Avant (URL)
❌ Dépendance aux URLs externes  
❌ Images peuvent disparaître  
❌ Pas de contrôle sur les images  
❌ Pas d'optimisation possible  

### Après (Upload)
✅ Images hébergées localement  
✅ Contrôle total sur les fichiers  
✅ Aperçu avant enregistrement  
✅ Validation de format et taille  
✅ Sécurité renforcée (admin only)  
✅ Performance optimale  

## 🔄 Migration des Données

Si vous avez des services existants avec des URLs d'images :
1. Les anciennes images avec URLs continueront à fonctionner
2. La méthode `getImageUrl()` gère les deux cas (URL et chemin local)
3. Vous pouvez progressivement migrer vers des images uploadées

## 🚀 Déploiement

### En Production
1. Configurez un CDN pour servir les images (recommandé)
2. Utilisez un service de stockage cloud (AWS S3, Azure Blob, etc.)
3. Mettez en place une stratégie de backup des images
4. Configurez la compression d'images côté serveur

### Variables d'Environnement
```env
# .env
UPLOAD_MAX_SIZE=5242880  # 5 MB en bytes
UPLOAD_DESTINATION=./uploads/services
```

## 📝 TODO Futur

- [ ] Compression automatique des images
- [ ] Génération de thumbnails
- [ ] Upload multiple d'images
- [ ] Galerie d'images pour chaque service
- [ ] Intégration avec un CDN
- [ ] Optimisation d'images (WebP, formats responsive)
- [ ] Suppression des images orphelines
- [ ] Limite de quota par utilisateur

## 📞 Support

Pour toute question concernant le système d'upload :
- Consultez le `ADMIN_GUIDE.md` pour l'administration générale
- Consultez le `README.md` du projet
- Vérifiez les logs du backend en cas d'erreur


