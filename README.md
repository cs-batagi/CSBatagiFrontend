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
- `jekyll-gh-pages.yml`: Deploys the frontend to GitHub Pages

## GitHub Pages Deployment

The frontend is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment workflow is defined in `.github/workflows/jekyll-gh-pages.yml`. The workflow deploys the content of the `frontend` directory to GitHub Pages, which is then served at the repository's GitHub Pages URL.

## Adding New Components

As the project grows, new components (like backend services) can be added as separate directories at the root level.
