# Quick Start Guide

## Deploy to Netlify

### Option 1: Connect GitHub Repository

1. Sign up or log in at netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select GitHub and authorize access
4. Choose the `rob9206/cnydyno` repository
5. Deploy settings are already configured in `netlify.toml`
6. Click "Deploy site"

Your site will be live in seconds at a URL like `random-name-123456.netlify.app`

### Option 2: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Option 3: Drag and Drop

1. Visit netlify.com/drop
2. Drag the entire project folder
3. Your site goes live instantly

## Custom Domain

After deployment:
1. Go to Site settings → Domain management
2. Add your custom domain
3. Follow DNS configuration steps

That's it! See `DEPLOYMENT.md` for advanced options.
