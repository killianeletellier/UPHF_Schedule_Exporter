# UPHF Schedule Exporter

Ce projet permet de **servir votre planning UPHF (Université Polytechnique Hauts-de-France)** sous forme de fichier **ICS** afin de l'importer dans des clients de calendrier externes (Google Calendar, Outlook, etc.).

## Fonctionnalités

- Génération et export de votre planning UPHF au format **ICS**.
- Compatible avec des clients de calendrier externes comme **Google Calendar**, **Outlook**, **Apple Calendar**, etc.

## Prérequis

- **Node.js** version 14.x ou plus.
- **yarn** ou **npm** pour la gestion des dépendances.

## Installation et utilisation

Suivez les étapes ci-dessous pour configurer et lancer le projet sur votre machine locale.

### 1. Cloner le dépôt

Commencez par cloner le dépôt GitHub sur votre machine locale :

```bash
git clone https://github.com/killianeletellier/UPHF_Schedule_Exporter.git
cd UPHF_Schedule_Exporter
```

### 2. Configurer les variables d'environnement

- Ouvrez le fichier `.env.example` et remplacez les valeurs par vos propres identifiants Sesame.

- Renommez ensuite ce fichier en `.env` :

```bash
mv .env.example .env
```

### 3. Installer les dépendances

Installez les dépendances nécessaires à l'aide de **yarn** ou **npm** :

Avec **yarn** :

```bash
yarn
```

Ou avec **npm** :

```bash
npm install
```

### 4. Lancer le projet

Pour démarrer le projet, exécutez simplement la commande suivante :

```bash
node .
```

Le serveur devrait maintenant être actif et servir votre planning UPHF au format **ICS**, prêt à être importé dans des clients de calendrier externes.

### 5. Intégrer le calendrier dans un client externe

Une fois le projet lancé, votre planning sera disponible en tant que fichier **ICS** !

Pour intégrer votre calendrier dans un client de calendrier externe (Google Calendar, Outlook, Apple Calendar, etc.) :

1. Ouvrez votre client de calendrier.
2. Cherchez l'option pour **ajouter un calendrier à partir d'une URL**.
3. Entrez l'URL suivante : `http://localhost:3000`.
4. Validez pour ajouter votre planning UPHF.

### Option pour utilisation à distance

Si vous souhaitez rendre votre service accessible à distance, vous pouvez soit déployer le projet sur un serveur externe, soit utiliser un outil tel que **[localtunnel](https://localtunnel.github.io/www/)** pour exposer temporairement votre service local.

Avec **localtunnel**, vous pouvez exécuter la commande suivante pour obtenir une URL publique :

```bash
npx localtunnel --port 3000
```

Cette URL pourra ensuite être utilisée dans votre client de calendrier externe en place de `http://localhost:3000`.

## Contribution

Ce code a été fait rapidement, pour un usage personnel et peut contenir des problèmes d'optimisation.
Les contributions sont donc les bienvenues ! Si vous avez des suggestions, ouvrez une **issue** ou soumettez une **pull request**.

---

## Licence

Ce projet est sous licence [MIT](LICENSE).