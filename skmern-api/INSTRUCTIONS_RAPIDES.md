# 🚀 Instructions Rapides - Configuration Email

## Étapes à suivre MAINTENANT :

### 1️⃣ Installer les dépendances
```bash
cd skmern-api
npm install
```

### 2️⃣ Configurer les emails

Ouvrez ou créez le fichier `skmern-api/.env` et ajoutez ces lignes :

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=abdelilahsakkiou.21@gmail.com
SMTP_PASS=VOTRE_MOT_DE_PASSE_APPLICATION
CONTACT_EMAIL=abdelilahsakkiou.21@gmail.com
```

### 3️⃣ Obtenir un mot de passe d'application Gmail

1. Allez sur : https://myaccount.google.com/apppasswords
2. Activez la validation en 2 étapes si demandé
3. Créez un nouveau mot de passe d'application
4. Copiez le mot de passe (16 caractères)
5. Remplacez `VOTRE_MOT_DE_PASSE_APPLICATION` dans le `.env`

### 4️⃣ Démarrer le serveur
```bash
npm run start:dev
```

### 5️⃣ Tester
- Allez sur votre page Contact
- Remplissez le formulaire
- Cliquez sur "Envoyer un message"
- Vérifiez votre email (et les spams) !

---

## ✅ C'est tout !

Le système d'envoi d'email est maintenant configuré. Chaque message du formulaire de contact sera envoyé à `abdelilahsakkiou.21@gmail.com`.

📖 Pour plus de détails, consultez `CONFIGURATION_EMAIL.md`

