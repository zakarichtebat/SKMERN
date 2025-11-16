# 🚂 Déploiement sur Railway - Module de Contact

## ⚠️ Problème actuel
Le site sur Railway affiche une erreur 500 lors de l'envoi d'un message de contact car :
1. Le nouveau module de contact n'est pas déployé sur Railway
2. Les variables d'environnement email ne sont pas configurées

---

## 🔧 Solution : Configuration en 2 étapes

### Étape 1 : Configurer les variables d'environnement sur Railway

1. **Allez sur Railway Dashboard**
   - URL : https://railway.app
   - Connectez-vous à votre compte

2. **Sélectionnez votre projet FIXILYA**

3. **Cliquez sur votre service backend** (celui qui exécute NestJS)

4. **Allez dans l'onglet "Variables"** (dans le menu de gauche)

5. **Ajoutez ces variables d'environnement :**

   Cliquez sur **"+ New Variable"** et ajoutez une par une :

   ```
   Variable : SMTP_HOST
   Valeur   : smtp.gmail.com
   ```

   ```
   Variable : SMTP_PORT
   Valeur   : 587
   ```

   ```
   Variable : SMTP_USER
   Valeur   : zakariachtebat@gmail.com
   ```

   ```
   Variable : SMTP_PASS
   Valeur   : pcpegyxzdjkbbwjy
   ```

   ```
   Variable : CONTACT_EMAIL
   Valeur   : zakariachtebat@gmail.com
   ```

6. **Sauvegardez** (Railway va redémarrer automatiquement le service)

---

### Étape 2 : Déployer le nouveau code sur Railway

Dans votre terminal, exécutez ces commandes :

```bash
# 1. Allez dans le dossier du projet
cd C:\Users\pc\skiyoo\SKMERN

# 2. Vérifiez les fichiers modifiés
git status

# 3. Ajoutez tous les fichiers modifiés
git add .

# 4. Commitez avec un message
git commit -m "Ajout du module de contact avec envoi d'emails par nodemailer"

# 5. Poussez vers Railway
git push
```

**Railway va automatiquement :**
- Détecter le nouveau commit
- Rebuilder l'application
- Redéployer avec les nouveaux modules de contact

---

## 🎯 Vérification du déploiement

### 1. Vérifier les logs sur Railway

1. Allez dans votre service sur Railway
2. Cliquez sur l'onglet **"Deployments"**
3. Regardez le dernier déploiement
4. Cliquez sur **"View Logs"**
5. Cherchez ces messages :
   - ✅ `Server running on http://...`
   - ✅ `Swagger available on http://.../api`

### 2. Tester l'API directement

Testez si l'endpoint existe :

```bash
curl https://fixilya.up.railway.app/api/contact
```

Si vous voyez une erreur 405 (Method Not Allowed), c'est NORMAL ! 
Ça signifie que l'endpoint existe mais il faut utiliser POST.

### 3. Tester depuis le site web

1. Allez sur **https://fixilya.up.railway.app/#/contact**
2. Remplissez le formulaire
3. Cliquez sur "Envoyer un message"
4. Vous devriez voir : ✅ **"Votre message a été envoyé avec succès"**
5. Vérifiez votre email **zakariachtebat@gmail.com** (et les spams)

---

## 🐛 Dépannage

### Erreur : "SMTP connection failed"

**Cause :** Les variables d'environnement ne sont pas configurées

**Solution :**
1. Vérifiez que TOUTES les variables sont dans Railway
2. Vérifiez qu'il n'y a pas d'espaces dans les valeurs
3. Redémarrez le service sur Railway

### Erreur : "Module not found: contact.module"

**Cause :** Le nouveau code n'est pas déployé

**Solution :**
```bash
git push --force  # Forcer le push si nécessaire
```

### Erreur 500 persistante

**Solution :**
1. Allez dans les logs Railway
2. Cherchez l'erreur exacte
3. Vérifiez que le fichier `.env` local n'a pas été commité (il est dans .gitignore)

---

## 📊 Structure des fichiers déployés

Ces fichiers doivent être sur Railway après le déploiement :

```
skmern-api/
├── src/
│   ├── contact/
│   │   ├── contact.controller.ts  ✅ Nouveau
│   │   ├── contact.service.ts     ✅ Nouveau
│   │   ├── contact.module.ts      ✅ Nouveau
│   │   └── dto/
│   │       └── create-contact.dto.ts  ✅ Nouveau
│   ├── app.module.ts              ✅ Modifié (avec ContactModule)
│   └── ...
├── package.json                   ✅ Modifié (avec nodemailer)
└── WEB/Vue-skmern/dist/          ✅ Rebuilt avec nouvelle API
```

---

## ✅ Checklist finale

- [ ] Variables d'environnement ajoutées sur Railway
- [ ] Code commité et pushé sur Git
- [ ] Railway a redéployé (vérifier dans Deployments)
- [ ] Logs Railway ne montrent pas d'erreurs
- [ ] Test du formulaire de contact réussi
- [ ] Email reçu sur zakariachtebat@gmail.com

---

## 🆘 Besoin d'aide ?

Si le problème persiste après ces étapes :
1. Copiez les logs d'erreur de Railway
2. Vérifiez que le build s'est terminé sans erreurs
3. Testez d'abord en LOCAL pour confirmer que ça marche

**Note :** Les changements sur Railway prennent 2-5 minutes pour se déployer complètement.

