# CNY Dyno Website - Deployment Guide

## Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

**Via Netlify Drop (No account needed initially):**
1. Go to https://app.netlify.com/drop
2. Drag and drop your entire `cnydyno` folder onto the page
3. Your site will be live instantly with a random URL
4. Create a free Netlify account to claim the site and set up a custom domain

**Via Netlify CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your project folder
cd c:\Users\dawso\Downloads\cnydyno
netlify deploy --prod
```

**Via GitHub + Netlify (Best for updates):**
1. Create a GitHub account at https://github.com
2. Create a new repository
3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cnydyno.git
   git branch -M main
   git push -u origin main
   ```
4. Go to https://app.netlify.com
5. Click "Add new site" → "Import an existing project"
6. Connect to GitHub and select your repository
7. Deploy settings are auto-detected from netlify.toml
8. Click "Deploy site"

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd c:\Users\dawso\Downloads\cnydyno
vercel --prod
```

### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push your code to GitHub
3. Go to repository Settings → Pages
4. Select branch: main, folder: / (root)
5. Save and wait for deployment

## Custom Domain Setup

### For cnydyno.com:

1. **Purchase domain** (if not already owned):
   - Namecheap, GoDaddy, Google Domains, etc.

2. **Configure DNS** (example for Netlify):
   - Add A record: `@` → `75.2.60.5`
   - Add CNAME record: `www` → `your-site.netlify.app`
   
3. **In Netlify Dashboard**:
   - Go to Domain settings
   - Add custom domain: `cnydyno.com`
   - Enable HTTPS (automatic with Let's Encrypt)

## Post-Deployment Checklist

- [ ] Test all navigation links
- [ ] Verify Square booking widget works
- [ ] Test mobile responsiveness
- [ ] Check all contact links (phone, email)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is accessible
- [ ] Test page load speed (should be fast - it's a static site)
- [ ] Set up Google Analytics (optional)

## Updating Your Site

After initial deployment via GitHub:

```bash
# Make changes to your files
# Then commit and push
git add .
git commit -m "Description of changes"
git push
```

Netlify/Vercel will automatically rebuild and deploy your changes.

## Support

- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- GitHub Pages: https://pages.github.com

## Current Status

✅ Website files ready
✅ Git repository initialized
✅ SEO files created (robots.txt, sitemap.xml)
✅ Netlify configuration added
⏳ Ready to deploy!
