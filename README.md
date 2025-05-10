# CS Batagi Frontend

This repository contains the frontend code for the CS Batagi project, a web application for tracking and displaying statistics.

## Setup

### Firebase Configuration

This project uses Firebase for messaging and notifications. The Firebase configuration is stored as GitHub secrets and injected during the build process to avoid exposing sensitive information in the repository.

#### Setting up GitHub Secrets

To set up the required secrets for the Firebase configuration:

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Add the following secrets:

   - `FIREBASE_API_KEY`: Your Firebase API key
   - `FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
   - `FIREBASE_APP_ID`: Your Firebase app ID

These values can be found in your Firebase project settings.

### Local Development

For local development, follow these steps to set up your environment:

1. Copy the `.env.example` file to a new file named `.env`:
   ```
   cp .env.example .env
   ```

2. Edit the `.env` file and replace the placeholder values with your actual Firebase configuration.

3. Install the required dependencies:
   ```
   npm install
   ```

4. Run the setup script to create a local version of the Firebase configuration:
   ```
   npm run setup-local
   ```

5. This will create a file named `firebase-messaging-sw.local.js`. For local testing, you can rename this file to `firebase-messaging-sw.js`.

**Important:** Do not commit your `.env` file or the `firebase-messaging-sw.local.js` file to the repository, as they contain sensitive information.

## GitHub Workflows

### GitHub Pages Deployment

The `jekyll-gh-pages.yml` workflow handles the deployment of the site to GitHub Pages. It automatically injects the Firebase configuration from GitHub secrets during the build process.

### Stats Update

The `stats.yml` workflow updates the statistics data in the repository. It can be triggered manually from the GitHub Actions tab.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
