# CS Batağı Monorepo

This repository is a monorepo containing multiple components of the CS Batağı project.

## Structure

- `frontend/`: Contains the frontend web application
  - HTML, CSS, and JavaScript files
  - Data files in JSON format
  - Images and other static assets

## Development

### Frontend

To work on the frontend:

```bash
cd frontend
npm install
# Start your development server
```

## GitHub Workflows

- `stats.yml`: Updates statistics data in the frontend component
- `deploy.yml`: Deploys the frontend to GitHub Pages

## GitHub Pages Deployment

The frontend is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment workflow is defined in `.github/workflows/deploy.yml`. The workflow deploys the content of the `frontend` directory to the `gh-pages` branch, which is then served by GitHub Pages.

## Adding New Components

As the project grows, new components (like backend services) can be added as separate directories at the root level.
