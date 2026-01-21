# Deployment Guide: GitHub + Vercel

This guide will walk you through deploying your Geoboard app to Vercel using GitHub.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git installed on your computer

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `geoboard-app` (or your preferred name)
   - **Description**: "Interactive 9x9 geometry geoboard learning app"
   - **Visibility**: Public or Private (your choice)
   - **Do NOT** initialize with README (we already have one)
5. Click "Create repository"

## Step 2: Push Your Code to GitHub

Open your terminal in the `geoboard-app` folder and run:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Geoboard app"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/geoboard-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended for beginners)

1. Go to [vercel.com](https://vercel.com) and log in

2. Click "Add New" → "Project"

3. Click "Import Git Repository"

4. If this is your first time:
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub account

5. Find and select your `geoboard-app` repository

6. Configure your project:
   - **Project Name**: `geoboard-app` (or customize)
   - **Framework Preset**: Vite (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `dist` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

7. Click "Deploy"

8. Wait for the deployment to complete (usually 1-2 minutes)

9. Your app is now live! 🎉
   - You'll get a URL like: `https://geoboard-app.vercel.app`
   - Or: `https://geoboard-app-username.vercel.app`

### Option B: Using Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from your project directory:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - What's your project's name? **geoboard-app**
   - In which directory is your code located? **./**
   - Want to override the settings? **N**

5. Your app will be deployed and you'll get a URL

## Step 4: Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

## Automatic Deployments

Once set up, every time you push to GitHub:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically:
1. Detect the new commit
2. Build your project
3. Deploy the new version
4. Your site updates automatically! 🚀

## Environment Variables (if needed in future)

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Environment Variables"
3. Add variables as needed

## Troubleshooting

### Build fails on Vercel

- Check the build logs in Vercel Dashboard
- Make sure your `package.json` has correct dependencies
- Verify the build command is `npm run build`

### App doesn't load

- Check browser console for errors
- Verify the output directory is set to `dist`
- Make sure all dependencies are in `dependencies` (not `devDependencies`)

### Need to update

```bash
# Make changes to your code
git add .
git commit -m "Description of changes"
git push
# Vercel automatically deploys!
```

## Preview Deployments

Every pull request gets its own preview URL automatically! Great for testing before merging.

## Useful Commands

```bash
# Check deployment status
vercel ls

# Open project in browser
vercel --prod

# View logs
vercel logs
```

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

---

**Your app is now deployed! Share the URL with students and enjoy! 🎓**
