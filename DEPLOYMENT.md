# Deployment Guide

## Overview

This repository is configured for hosting on Netlify. All files needed for deployment are included.

## File Structure

- `index.html` - Main website page
- `robots.txt` - Search engine crawler instructions  
- `sitemap.xml` - Site structure for search engines
- `netlify.toml` - Netlify hosting configuration

## Deployment Methods

### GitHub Integration (Recommended)

Connect your repository to Netlify for automatic deployments:

1. Create a Netlify account
2. Link your GitHub account
3. Import the cnydyno repository
4. Netlify reads `netlify.toml` automatically
5. Every push to main triggers a new deployment

Benefits:
- Automatic builds on git push
- Deploy previews for pull requests
- Rollback capability
- Branch deploys

### Manual Deployment via CLI

Install Netlify CLI globally:
```bash
npm install netlify-cli --global
```

Authenticate:
```bash
netlify login
```

Deploy to production:
```bash
netlify deploy --prod
```

### Drag and Drop Deployment

For quick testing:
1. Visit netlify.com/drop
2. Drag your project folder
3. Site deploys immediately

Note: Manual deployments don't auto-update when code changes.

## Configuration Details

The `netlify.toml` file specifies:
- Publish directory: root (`.`)
- Build command: none needed (static site)
- Security headers for all pages

## Post-Deployment

After your first deployment:

1. **Custom Domain**: Add in Site settings if desired
2. **HTTPS**: Automatically provisioned by Netlify
3. **Environment**: Production URL will be your-site-name.netlify.app

## Updating Content

Make changes locally, commit, and push. If using GitHub integration, Netlify rebuilds automatically.

For manual deployments, run `netlify deploy --prod` after changes.

## Troubleshooting

**Build fails**: Check that all files are committed
**404 errors**: Verify `index.html` is in the root directory  
**SSL issues**: Wait a few minutes after first deployment

See Netlify docs for advanced configuration options.
