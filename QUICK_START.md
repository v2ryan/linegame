# ⚡ Quick Start Guide

Get your Geoboard app running in 5 minutes!

## 🚀 Local Development

```bash
# 1. Navigate to the project
cd geoboard-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit: http://localhost:5173
```

That's it! Your app is running locally! 🎉

## 📤 Deploy to Vercel (Fastest Method)

### First Time Setup

```bash
# 1. Create GitHub repo and push code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/geoboard-app.git
git push -u origin main

# 2. Go to vercel.com
# 3. Click "Import Project"
# 4. Select your GitHub repo
# 5. Click "Deploy"
```

**Done!** Your app is live at `https://your-app.vercel.app` 🌐

### Update Your Live App

```bash
# Make changes, then:
git add .
git commit -m "Update description"
git push

# Vercel automatically deploys! ✨
```

## 📋 Essential Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

## 🆘 Common Issues

**Port already in use?**
```bash
# Vite will automatically use another port (5174, 5175, etc.)
# Or specify a port:
npm run dev -- --port 3000
```

**Build fails?**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
```bash
# Check tsconfig.json is present
# Run: npm run build
# Fix any errors shown
```

## 📚 Full Documentation

- **README.md** - Complete project overview
- **DEPLOYMENT.md** - Detailed deployment guide
- **PROJECT_STRUCTURE.md** - File organization explained

## 🎯 What's Next?

1. ✅ Test locally (`npm run dev`)
2. ✅ Push to GitHub
3. ✅ Deploy to Vercel
4. ✅ Share with students!

---

**Need help?** Check DEPLOYMENT.md for detailed instructions!
