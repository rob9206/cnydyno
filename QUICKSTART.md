# 🚀 Quick Start - Deploy Your Thunderhorse Tuning Website

## ✅ What's Ready

Your website is 100% ready to go live! Here's what we've prepared:

- ✅ Professional, responsive website (`index.html`)
- ✅ SEO optimization (robots.txt, sitemap.xml, meta tags)
- ✅ Git repository initialized
- ✅ Deployment configuration (netlify.toml)
- ✅ Square booking integration already working

## 🎯 Easiest Way to Deploy (5 minutes)

### Method 1: Netlify Drop (No Installation Required!)

This is the **FASTEST** way to get your site online:

1. **Open your browser** and go to: https://app.netlify.com/drop

2. **Drag and drop** your entire `cnydyno` folder onto the page
   - Location: `c:\Users\dawso\Downloads\cnydyno`
   - Just drag the whole folder!

3. **Done!** Your site is now live with a URL like: `random-name-123.netlify.app`

4. **Optional - Claim your site:**
   - Create a free Netlify account
   - Click "Claim site" to manage it
   - Change the site name to something like `thunderhorse-tuning.netlify.app`
   - Add your custom domain `thunderhorsetuning.com` later

### Method 2: GitHub + Netlify (Best for Long-Term)

This method lets you easily update your site later:

**Step 1: Create GitHub Account**
- Go to https://github.com/signup
- Create a free account

**Step 2: Create a New Repository**
- Click the "+" icon → "New repository"
- Name it: `thunderhorse-tuning` (or keep your existing repo name)
- Keep it public
- Don't initialize with README (we already have files)
- Click "Create repository"

**Step 3: Push Your Code to GitHub**

Open PowerShell in your project folder and run:

```powershell
cd c:\Users\dawso\Downloads\cnydyno

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/thunderhorse-performance.git

# Rename branch to main
git branch -M main

# Push your code
git push -u origin main
```

You'll be prompted to login to GitHub.

**Step 4: Deploy to Netlify**
- Go to https://app.netlify.com
- Sign up with your GitHub account
- Click "Add new site" → "Import an existing project"
- Choose "GitHub"
- Select your `cnydyno` repository
- Click "Deploy site"

**Done!** Your site is live and will auto-update whenever you push changes to GitHub.

## 🌐 Setting Up Your Custom Domain (thunderhorseperformance.com)

### If you already own thunderhorseperformance.com:

1. **In Netlify Dashboard:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter: `thunderhorseperformance.com`
   - Click "Verify"

2. **Update Your Domain's DNS Settings:**

   Login to your domain registrar (GoDaddy, Namecheap, etc.) and add these DNS records:

   **For Netlify:**
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   ```

3. **Enable HTTPS:**
   - Back in Netlify, go to Domain settings
   - Click "Verify DNS configuration"
   - Enable HTTPS (automatic with Let's Encrypt)
   - Wait 24 hours for DNS to propagate

### If you DON'T own thunderhorseperformance.com yet:

1. **Purchase the domain:**
   - Namecheap: https://www.namecheap.com
   - Google Domains: https://domains.google
   - GoDaddy: https://www.godaddy.com
   - Cost: ~$10-15/year

2. **Follow the DNS setup above**

## 📱 Testing Your Live Site

After deployment, test:

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] "Book Now" button opens Square booking
- [ ] Phone number is clickable on mobile
- [ ] Email link works
- [ ] All sections scroll smoothly
- [ ] Mobile responsive design works
- [ ] FAQ accordions expand/collapse

## 🔄 Updating Your Website Later

If you used GitHub + Netlify:

1. Make changes to your files locally
2. Open PowerShell in your project folder:

```powershell
cd c:\Users\dawso\Downloads\cnydyno
git add .
git commit -m "Describe your changes"
git push
```

3. Netlify automatically rebuilds and deploys your changes (takes ~1 minute)

## 📊 Next Steps (Optional)

After your site is live:

1. **Google Search Console**
   - Add your site: https://search.google.com/search-console
   - Submit your sitemap: `https://thunderhorseperformance.com/sitemap.xml`

2. **Google Analytics** (track visitors)
   - Create account: https://analytics.google.com
   - Add tracking code to your site

3. **Google Business Profile**
   - Claim your business: https://business.google.com
   - Link to your website

4. **Social Media**
   - Update Facebook/Instagram with new website link
   - The Open Graph tags are already set up for nice link previews

## 🆘 Need Help?

- **Netlify Support:** https://docs.netlify.com
- **GitHub Help:** https://docs.github.com
- **DNS Issues:** Usually take 24-48 hours to propagate

## 📁 Your Project Files

```
cnydyno/
├── index.html          # Your website
├── robots.txt          # SEO - tells search engines what to index
├── sitemap.xml         # SEO - helps Google find your pages
├── netlify.toml        # Netlify configuration
├── .gitignore          # Git ignore file
├── README.md           # Project documentation
├── DEPLOYMENT.md       # Detailed deployment guide
└── QUICKSTART.md       # This file!
```

---

## 🎉 You're Ready!

Your website is professional, fast, and ready to bring in customers. The easiest path is:

1. Go to https://app.netlify.com/drop
2. Drag your `cnydyno` folder
3. Share your new URL!

Good luck with Thunder Horse Performance! 🏍️⚡
