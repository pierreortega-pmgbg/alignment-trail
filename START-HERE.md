# 🎮 START HERE - The Alignment Trail

## ⚡ Quick Start (30 seconds)

1. **Open `index.html` in your browser** (double-click it)
2. **Play the game!** 
3. **When ready to deploy**: See `DEPLOY.md`

---

## 🎯 What You Built

**The Alignment Trail** - A PM survival game about navigating organizational chaos.

### Your Version vs Peter's

| Aspect | Peter's Builder Trail | Your Alignment Trail |
|--------|----------------------|---------------------|
| **Theme** | PM learning to code | PM navigating alignment challenges |
| **Goal** | Ship 3 apps | Align 5 initiatives |
| **Tools** | AI coding tools | Alignment approaches |
| **Challenges** | Building & shipping | Stakeholder conflicts, reorgs, politics |
| **Resources** | Same (Savings, Energy, Momentum) | Same + Political Capital |

---

## 🎮 How to Play

1. **Choose your name and character**
2. **Pick an alignment approach** (Data-Driven, Relationship-First, etc.)
3. **Select initiatives to work on** (API redesign, mobile app, etc.)
4. **Navigate events** - make choices that affect your resources
5. **Align 5 initiatives within 26 weeks** without burning out

### Win Conditions

- ✅ Align 5 major initiatives
- ✅ Keep savings above $0
- ✅ Avoid burnout (2 weeks at 0 energy)
- ✅ Avoid losing momentum (5 weeks at 0 momentum)

### Best Ending

**The Balanced Leader** - Align 5 initiatives AND maintain work-life balance. The rarest achievement!

---

## 🚀 Deploy to Vercel (2 minutes)

### Option 1: CLI (Fastest)

```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Navigate to project
cd path/to/alignment-trail

# Deploy!
vercel
```

### Option 2: Dashboard (No CLI)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Drag and drop this folder
4. Click "Deploy"
5. Done! 🎉

**Full instructions**: See `DEPLOY.md`

---

## 📝 What's Included

### Files Created

- ✅ `index.html` - Main game file
- ✅ `style.css` - Terminal/retro styling
- ✅ `game.js` - Core game engine (600+ lines)
- ✅ `events.js` - 30+ PM events + 12 initiatives
- ✅ `scenes.js` - Pixel art system (placeholder)
- ✅ `vercel.json` - Deployment config
- ✅ `README.md` - Full documentation
- ✅ `DEPLOY.md` - Deployment guide
- ✅ `.gitignore` - Git ignore rules

### Features Implemented

- ✅ 5 alignment approaches with unique mechanics
- ✅ 12 different initiatives to align
- ✅ 30+ realistic PM events
- ✅ Resource management (savings, energy, momentum, political capital)
- ✅ Multiple endings based on choices
- ✅ Keyboard navigation
- ✅ Terminal aesthetic
- ✅ No dependencies (pure HTML/CSS/JS)

---

## 🎨 Customization Ideas

### Easy Customizations

1. **Add more events**: Edit `events.js`, add to `EVENTS` array
2. **Add more initiatives**: Edit `events.js`, add to `INITIATIVES` array
3. **Change colors**: Edit CSS variables in `style.css`
4. **Adjust difficulty**: Change constants in `game.js` (TOTAL_WEEKS, ALIGNMENT_GOAL, etc.)

### Advanced Customizations

1. **Add pixel art scenes**: Implement canvas rendering in `scenes.js`
2. **Add sound effects**: Use Web Audio API
3. **Add save/load**: Use LocalStorage
4. **Add achievements**: Track player actions and unlock badges
5. **Add leaderboard**: Integrate with a backend service

---

## 🐛 Testing Checklist

Before deploying, test these:

- [ ] Game loads without errors (F12 console)
- [ ] Can enter name and select character
- [ ] Can choose alignment approach
- [ ] Can select initiatives
- [ ] Events display with choices
- [ ] Choices affect resources correctly
- [ ] HUD updates properly
- [ ] Game ends with proper ending screen
- [ ] Play Again button works
- [ ] Keyboard navigation works (1-5, Enter)

---

## 📊 Game Balance

Current settings (in `game.js`):

```javascript
TOTAL_WEEKS = 26          // Half a year
ALIGNMENT_GOAL = 5        // Need 5 successful alignments
WEEKLY_INCOME = 4000      // Day job salary
WEEKLY_EXPENSES = 3500    // Bay Area life
WEEKLY_ENERGY_DRAIN = 4   // Natural energy loss
WEEKLY_MOMENTUM_DECAY = 4 // Natural momentum loss
```

**Feel free to adjust these** to make the game easier or harder!

---

## 🎯 Next Steps

### 1. Test Locally ✅
You should already have the game open in your browser!

### 2. Play Through Once
- Get a feel for the game
- Check for bugs
- See if events make sense

### 3. Deploy to Vercel
```bash
vercel
```

### 4. Share!
- Tweet about it
- Post on LinkedIn
- Share in PM communities
- Get feedback

### 5. Iterate
- Add more events based on feedback
- Adjust difficulty
- Add new features

---

## 💡 Pro Tips

### For Players

1. **Watch your energy** - It's your most precious resource
2. **Build momentum early** - It compounds over time
3. **Don't ignore work-life balance** - It affects your ending
4. **Political capital matters** - Successful alignments build influence
5. **Not all initiatives are equal** - Choose strategically

### For Developers

1. **Events are easy to add** - Just edit `events.js`
2. **Balance is iterative** - Playtest and adjust
3. **Keep it simple** - No framework = easy to modify
4. **Document your changes** - Future you will thank you
5. **Share your version** - Others might want to fork it

---

## 🤝 Sharing Your Version

Once deployed, you can:

1. **Fork and customize** - Make your own version
2. **Add your industry** - Healthcare PM? Finance PM? Adapt the events!
3. **Add your company culture** - Make it specific to your org
4. **Share on social** - Tag me if you want!

---

## 📚 Resources

- **Original inspiration**: [The Builder Trail](https://github.com/petergyang/builder-trail-game) by Peter Yang
- **Vercel docs**: [vercel.com/docs](https://vercel.com/docs)
- **Game design**: Oregon Trail (1971)

---

## 🎉 You're Done!

You've built a fully functional PM survival game!

**Next**: Play it, deploy it, share it! 🚀

Questions? Check `README.md` for full documentation.

---

**Have fun playing The Alignment Trail!** 🎮
