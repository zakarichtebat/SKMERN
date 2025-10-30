# Guide de Contribution

Merci de votre intérêt pour contribuer au projet SKMERN ! 🎉

## Comment Contribuer

### 1. Fork et Clone

```bash
# Fork le projet sur GitHub puis clonez votre fork
git clone https://github.com/VOTRE-USERNAME/SKMERN.git
cd SKMERN
```

### 2. Créer une Branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

### 3. Installer les Dépendances

#### Backend
```bash
cd skmern-api
npm install
cp .env.example .env
# Configurez votre .env
npx prisma generate
npx prisma db push
```

#### Frontend
```bash
cd ../WEB/Vue-skmern
npm install
```

### 4. Faire vos Modifications

- Écrivez du code propre et commenté
- Suivez les conventions de code existantes
- Testez vos modifications localement

### 5. Commit et Push

```bash
git add .
git commit -m "feat: description de votre fonctionnalité"
git push origin feature/ma-nouvelle-fonctionnalite
```

### 6. Créer une Pull Request

- Allez sur GitHub
- Cliquez sur "New Pull Request"
- Décrivez vos modifications en détail
- Attendez la review

## Conventions de Commit

Utilisez le format [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, sans changement de code
- `refactor:` Refactorisation
- `test:` Ajout de tests
- `chore:` Tâches de maintenance

## Standards de Code

### Backend (NestJS)
- Utilisez TypeScript
- Suivez les principes SOLID
- Documentez avec JSDoc
- Créez des DTOs pour la validation

### Frontend (Vue.js)
- Utilisez la Composition API
- Composants réutilisables
- CSS modulaire
- Gestion d'état simple et claire

## Tests

Assurez-vous que tous les tests passent :

```bash
# Backend
cd skmern-api
npm test

# Frontend
cd WEB/Vue-skmern
npm run build
```

## Besoin d'Aide ?

- Ouvrez une issue pour poser des questions
- Contactez : zakariachtebat@gmail.com

Merci pour votre contribution ! 🙏


