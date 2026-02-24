# 🚀 Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Vercel CLI (Fastest)

1. **Install Vercel CLI** (one-time setup):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project**:
   ```bash
   cd path/to/alignment-trail
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow prompts**:
   - "Set up and deploy?" → Yes
   - "Which scope?" → Your account
   - "Link to existing project?" → No
   - "What's your project's name?" → alignment-trail (or whatever you want)
   - "In which directory is your code located?" → ./
   - Accept all defaults

5. **Get your URL!** 
   - You'll get a URL like: `https://alignment-trail.vercel.app`
   - Share it with anyone!

### Option 2: Vercel Dashboard (No CLI needed)

1. **Go to** [vercel.com](https://vercel.com) and sign in

2. **Click "Add New Project"**

3. **Import Git Repository** or **Upload folder**:
   - If using Git: Connect your repo
   - If no Git: Drag and drop the `builder-trail-game` folder

4. **Configure Project**:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

5. **Click "Deploy"**

6. **Done!** Your game is live at `https://your-project.vercel.app`

## Alternative Deployment Options

### GitHub Pages

1. **Create a GitHub repo** for this project

2. **Push your code**:
   ```bash
   cd path/to/alignment-trail
   git init
   git add .
   git commit -m "Initial commit: The Alignment Trail"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/alignment-trail.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repo Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save

4. **Access at**: `https://YOUR_USERNAME.github.io/alignment-trail/`

### Netlify

1. **Go to** [netlify.com](https://netlify.com)

2. **Drag and drop** the `builder-trail-game` folder

3. **Done!** Instant deployment

### Local Testing

Just open `index.html` in any browser:

```bash
# Windows
start index.html

# Or just double-click the file
```

## Custom Domain (Optional)

### On Vercel

1. Go to your project dashboard
2. Settings → Domains
3. Add your custom domain
4. Follow DNS instructions

### Example Domains

- `alignment-trail.yourdomain.com`
- `pm-game.yourdomain.com`
- `thetrail.yourdomain.com`

## Post-Deployment Checklist

- [ ] Game loads without errors
- [ ] Can start a new game
- [ ] Character selection works
- [ ] Approach selection works
- [ ] Events display correctly
- [ ] Choices work
- [ ] Game ends properly
- [ ] Play Again button works

## Updating Your Deployment

### Vercel CLI

```bash
cd path/to/builder-trail-game
vercel --prod
```

### Vercel Dashboard

Just push to your Git repo (if connected) or re-upload the folder.

## Troubleshooting

### "Command not found: vercel"

Install Vercel CLI:
```bash
npm install -g vercel
```

### "No such file or directory"

Make sure you're in the right directory:
```bash
cd path/to/builder-trail-game
```

### Game doesn't load

Check browser console (F12) for errors. Most likely:
- File paths are wrong
- JavaScript error in game.js

### Styles look broken

Make sure `style.css` is in the same directory as `index.html`.

## Performance Tips

This game is already optimized:
- ✅ No external dependencies
- ✅ Pure vanilla JS
- ✅ Minimal CSS
- ✅ No images (yet)
- ✅ Instant load times

## Analytics (Optional)

Want to track plays? Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

## Sharing Your Game

Once deployed, share on:
- Twitter/X
- LinkedIn
- Product Hunt
- Hacker News
- Reddit (r/ProductManagement, r/webgames)
- PM communities

**Pro tip**: Record a short gameplay video for social media!

---

**Ready to deploy?** Run `vercel` in the project directory and you'll be live in 30 seconds! 🚀
