# CS Batağı Monorepo

This repository is a monorepo containing multiple components of the CS Batağı project.

## Structure

- `frontend/`: Contains the frontend web application
  - HTML, CSS, and JavaScript files
  - Data files in JSON format
  - Images and other static assets
- `backend/`: Contains the backend Node.js application
  - Express.js server
  - Database connections (PostgreSQL, MySQL)
  - API endpoints

## Development

### Frontend

To work on the frontend:

```bash
cd frontend
npm install
# Start your development server
```

### Backend

To work on the backend:

```bash
cd backend
npm install
node index.js
```

## Deployment

### Backend Deployment

The backend is deployed to a Google Cloud Platform (GCP) virtual machine using GitHub Actions. The deployment process:

1. Builds a Docker image of the backend
2. Pushes the image to GitHub Container Registry (ghcr.io)
3. Deploys the image to a GCP VM using docker-compose

For setting up GCP credentials, refer to the [instructions.md](instructions.md) file.

### Required Secrets

The following GitHub repository secrets are required for deployment:

- `GOOGLE_CREDENTIALS`: JSON credentials file for GCP service account
- `GCP_ZONE`: The zone where your GCP VM is located
- `GCP_VM_NAME`: The name of your GCP VM
- `AUTH_TOKEN`: Authentication token for the backend
- `DB_PASSWORD`: Database password
- `DB_USER`: Database user
- `CLOUDFLARE_API_TOKEN`: API token for Cloudflare DNS updates
- `MYSQL_PASSWORD`: MySQL database password
- `MYSQL_ROOT_PASSWORD`: MySQL root password
- `MYSQL_USER`: MySQL user
- `POSTGRES_PASSWORD`: PostgreSQL password
- `POSTGRES_READONLY_PASSWORD`: PostgreSQL read-only user password
- `RCON_PASSWORD`: RCON password for game server communication

## GitHub Workflows

- `build_backend.yml`: Builds and pushes the backend Docker image to GitHub Container Registry
- `deploy_backend.yml`: Deploys the backend to a GCP VM
- `deploy_frontend.yml`: Deploys the frontend to GitHub Pages
- `stats.yml`: Updates statistics data in the frontend component

All workflows have been configured with path filtering to only run when relevant files are changed:
- Backend workflows only run when files in the `backend/` directory or the workflow files themselves are modified
- Frontend workflows only run when files in the `frontend/` directory or the workflow files themselves are modified

## GitHub Pages Deployment

The frontend is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment workflow is defined in `.github/workflows/deploy_frontend.yml`. The workflow deploys the content of the `frontend` directory to GitHub Pages, which is then served at the repository's GitHub Pages URL.

## Docker Compose

The project uses Docker Compose for deploying multiple services:
- Backend Node.js application
- PostgreSQL database
- MySQL database (for Get5)
- Caddy reverse proxy
- Cloudflare DDNS updater

The Docker Compose file is configured to use the `main` tag for the backend image from GitHub Container Registry.

## Adding New Components

As the project grows, new components can be added as separate directories at the root level.
