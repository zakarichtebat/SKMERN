# Configuration de l'envoi d'emails pour le formulaire de contact

Ce guide vous explique comment configurer l'envoi d'emails pour recevoir les messages du formulaire de contact.

## 📧 Configuration avec Gmail

### Étape 1 : Créer un mot de passe d'application Gmail

1. Allez sur votre compte Google : https://myaccount.google.com/
2. Dans le menu de gauche, cliquez sur **Sécurité**
3. Activez la **validation en deux étapes** si ce n'est pas déjà fait
4. Après activation, retournez dans **Sécurité** → **Mots de passe d'application**
5. Sélectionnez :
   - Application : **Autre** (donnez-lui le nom "FIXILYA")
   - Appareil : **Autre** (par exemple "Serveur")
6. Cliquez sur **Générer**
7. Copiez le mot de passe généré (16 caractères)

### Étape 2 : Configurer les variables d'environnement

1. Créez un fichier `.env` à la racine du projet `skmern-api/` (s'il n'existe pas déjà)
2. Ajoutez les variables suivantes :

```env
# Configuration Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=abdelilahsakkiou.21@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx

# Email de destination pour recevoir les messages
CONTACT_EMAIL=abdelilahsakkiou.21@gmail.com
```

⚠️ **Important** : 
- Remplacez `SMTP_PASS` par le mot de passe d'application généré (sans espaces)
- Le `CONTACT_EMAIL` est l'adresse qui recevra les messages du formulaire

## 🔄 Alternative : Autres services SMTP

### Avec Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=votre-email@outlook.com
SMTP_PASS=votre-mot-de-passe
```

### Avec un serveur SMTP personnalisé

```env
SMTP_HOST=smtp.votre-domaine.com
SMTP_PORT=587
SMTP_USER=contact@votre-domaine.com
SMTP_PASS=votre-mot-de-passe
```

## 📦 Installation des dépendances

Installez nodemailer si ce n'est pas déjà fait :

```bash
cd skmern-api
npm install
```

## 🚀 Démarrage

1. Assurez-vous que le fichier `.env` est configuré
2. Démarrez le serveur :

```bash
npm run start:dev
```

3. Le serveur démarrera sur `http://localhost:3000`
4. L'API de contact sera disponible sur `http://localhost:3000/api/contact`

## ✅ Test de l'envoi d'email

### Test depuis le frontend

1. Allez sur votre site web
2. Naviguez vers la page **Contact**
3. Remplissez le formulaire :
   - Prénom
   - Nom
   - Email
   - Téléphone (optionnel)
   - Sujet (sélectionnez un service)
   - Message
4. Cliquez sur **Envoyer un message**
5. Vous devriez recevoir un email à l'adresse configurée dans `CONTACT_EMAIL`

### Test avec Postman ou cURL

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "prenom": "Test",
    "nom": "Utilisateur",
    "email": "test@example.com",
    "telephone": "+212 06 12 34 56 78",
    "sujet": "menage",
    "message": "Ceci est un message de test"
  }'
```

## 🎨 Format de l'email reçu

Vous recevrez un email formaté en HTML avec :
- 📧 Titre : "Nouveau message de contact - [Service sélectionné]"
- 👤 Informations du contact (nom, prénom, email, téléphone)
- 💬 Le message complet
- 🎨 Design professionnel avec les couleurs de FIXILYA

## 🛠️ Dépannage

### Erreur : "Invalid login"
- Vérifiez que vous utilisez un **mot de passe d'application** et non votre mot de passe Gmail
- Assurez-vous que la validation en deux étapes est activée

### Erreur : "Connection timeout"
- Vérifiez votre connexion internet
- Vérifiez que le port 587 n'est pas bloqué par votre firewall

### Les emails ne sont pas reçus
- Vérifiez vos **spams/courriers indésirables**
- Vérifiez que `CONTACT_EMAIL` est correctement configuré
- Regardez les logs du serveur pour voir les erreurs

### Voir les logs du serveur
Les messages d'erreur et de succès sont affichés dans la console :
- ✅ Email envoyé avec succès : affiche le messageId
- ❌ Erreur : affiche le détail de l'erreur

## 📝 Notes de sécurité

1. ⚠️ **Ne commitez JAMAIS le fichier `.env`** sur Git
2. Le fichier `.env` est déjà dans `.gitignore`
3. Utilisez toujours des mots de passe d'application, jamais votre mot de passe principal
4. Pour la production, utilisez des services d'email professionnels comme :
   - SendGrid
   - Mailgun
   - Amazon SES
   - Brevo (ex-Sendinblue)

## 🎯 Prochaines étapes

- [ ] Configurer votre fichier `.env` avec vos identifiants SMTP
- [ ] Tester l'envoi d'email depuis le formulaire
- [ ] Personnaliser le template d'email si nécessaire (dans `src/contact/contact.service.ts`)
- [ ] Déployer en production avec des variables d'environnement sécurisées

