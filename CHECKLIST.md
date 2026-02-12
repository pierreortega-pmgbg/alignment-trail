# ✅ Deployment Checklist

## Pre-Deployment Testing

### Local Testing
- [ ] Open `index.html` in browser
- [ ] Game loads without console errors (F12)
- [ ] Can enter name
- [ ] Can select character (Adam, Alex, Amelia, Bob)
- [ ] Can choose alignment approach (all 5 options work)
- [ ] Can select initiative
- [ ] Events display correctly
- [ ] Choices work and affect resources
- [ ] HUD updates properly
- [ ] Initiative progress bar works
- [ ] Game ends with proper ending screen
- [ ] Play Again button works
- [ ] Keyboard navigation works (1-5, Enter)

### Cross-Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if on Mac)

### Mobile Testing (Optional)
- [ ] Open on phone
- [ ] Touch controls work
- [ ] Text is readable
- [ ] Layout doesn't break

## Deployment Steps

### Option 1: Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Navigate to project
cd path/to/alignment-trail

# 3. Deploy
vercel

# 4. Follow prompts and get your URL!
```

**Checklist**:
- [ ] Vercel CLI installed
- [ ] Logged into Vercel account
- [ ] Deployed successfully
- [ ] Got deployment URL
- [ ] Tested live URL

### Option 2: Vercel Dashboard

1. [ ] Go to [vercel.com](https://vercel.com)
2. [ ] Sign in
3. [ ] Click "Add New Project"
4. [ ] Upload `builder-trail-game` folder
5. [ ] Click "Deploy"
6. [ ] Wait for deployment
7. [ ] Get URL
8. [ ] Test live URL

## Post-Deployment Testing

### Live Site Testing
- [ ] Visit your deployed URL
- [ ] Game loads correctly
- [ ] No console errors
- [ ] Play through one complete game
- [ ] All features work as expected
- [ ] Mobile view works (if applicable)

### Performance Check
- [ ] Page loads in < 2 seconds
- [ ] No lag during gameplay
- [ ] Smooth transitions

## Sharing

### Social Media
- [ ] Tweet about it (with screenshot)
- [ ] Post on LinkedIn
- [ ] Share in PM communities
- [ ] Post on Reddit (r/ProductManagement, r/webgames)

### Documentation
- [ ] Update README with live URL
- [ ] Add screenshots/GIF
- [ ] Write a blog post (optional)

## Optional Enhancements

### Quick Wins
- [ ] Add Google Analytics
- [ ] Add Open Graph meta tags for social sharing
- [ ] Add favicon
- [ ] Create a demo video

### Future Features
- [ ] Add more events
- [ ] Add sound effects
- [ ] Add pixel art scenes
- [ ] Add save/load
- [ ] Add achievements

## Troubleshooting

### If deployment fails:
1. Check all files are in the folder
2. Check for JavaScript errors in console
3. Try deploying again
4. Check Vercel logs

### If game doesn't work on live site:
1. Check browser console for errors
2. Verify all files deployed correctly
3. Check file paths are correct
4. Clear browser cache and try again

## Success Criteria

### Minimum Viable Launch
- [x] Game is playable
- [ ] Game is deployed
- [ ] Game is accessible via URL
- [ ] No critical bugs

### Ideal Launch
- [x] Game is playable
- [ ] Game is deployed
- [ ] Game is accessible via URL
- [ ] No critical bugs
- [ ] Shared on social media
- [ ] Got initial feedback
- [ ] Analytics set up

## Final Steps

1. [ ] Complete all pre-deployment testing
2. [ ] Deploy to Vercel
3. [ ] Test live site
4. [ ] Share URL with friends
5. [ ] Gather feedback
6. [ ] Plan next iteration

---

## Quick Commands Reference

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# Open project in browser
vercel open

# View logs
vercel logs
```

---

## URLs to Update

After deployment, update these files with your live URL:

- [ ] `README.md` - Update "Play Now" link
- [ ] `package.json` - Update repository URL (if using Git)
- [ ] Social media posts - Include live URL

---

## 🎉 You're Ready!

Once you've checked off all the items above, your game is ready to share with the world!

**Estimated time**: 15-30 minutes

**Let's go!** 🚀
