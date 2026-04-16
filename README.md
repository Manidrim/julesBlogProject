# julesBlogProject
Make a Blog Web site with jules

## 🚀 Déploiement

Ce projet est prêt à être déployé gratuitement sur **Render.com** avec une base de données **MongoDB Atlas**.

### 1. Configuration de la base de données (MongoDB Atlas)
1. Créez un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Créez un nouveau Cluster (Shared - Gratuit).
3. Dans "Network Access", ajoutez l'adresse IP `0.0.0.0/0` (pour autoriser l'accès depuis Render).
4. Dans "Database Access", créez un utilisateur avec un mot de passe.
5. Cliquez sur "Connect" > "Drivers" > "Node.js" et copiez votre **Connection String** (elle ressemble à `mongodb+srv://...`).

### 2. Déploiement sur Render.com
1. Créez un compte sur [Render.com](https://render.com).
2. Cliquez sur **New +** > **Web Service**.
3. Connectez votre dépôt GitHub `julesBlogProject`.
4. Configurez les paramètres suivants :
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Dans l'onglet **Environment**, ajoutez les variables suivantes :
   - `MONGODB_URI` : (votre chaîne de connexion MongoDB Atlas)
   - `SESSION_SECRET` : (une phrase secrète aléatoire)
6. Cliquez sur **Deploy Web Service**.

### 3. Créer un compte Admin
Une fois déployé, vous pouvez utiliser la "Shell" sur Render ou exécuter localement en pointant vers la base de données de production :
```bash
MONGODB_URI=votre_url_atlas node createAdmin.js votre_nom_utilisateur votre_mot_de_passe
```
