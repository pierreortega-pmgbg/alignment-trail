# The Alignment Trail

> A PM survival game about navigating organizational chaos

![Game Status](https://img.shields.io/badge/status-playable-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎮 Play Now

[Live Demo](#) _(Deploy to Vercel first!)_

## 📖 What Is This?

**The Alignment Trail** is an Oregon Trail-style game about the hardest part of being a Product Manager: getting everyone aligned.

You have **26 weeks**. Align **5 major initiatives**. Don't burn out. Don't lose your team's trust.

### Inspired By

This game is inspired by [The Builder Trail](https://github.com/petergyang/builder-trail-game) by Peter Yang, but with a twist: instead of learning to code, you're navigating the organizational challenges every PM faces.

## 🎯 Game Concept

### The Challenge

You're a PM at BigTechCo. You've got:
- Great ideas
- Solid roadmaps
- Clear vision

But nothing ships without alignment.

### Resources to Manage

- **💰 Savings**: Your financial runway (Bay Area isn't cheap)
- **⚡ Energy**: Your personal capacity (burnout is real)
- **🚀 Momentum**: Your team's drive (lose this, lose everything)
- **🎯 Alignments**: Successfully aligned initiatives (your win condition)

### Choose Your Approach

Pick your alignment strategy:

1. **Data-Driven**: Let the metrics speak (balanced approach)
2. **Relationship-First**: Coffee chats and 1-on-1s (builds lasting trust)
3. **Executive Sponsorship**: Top-down alignment (fast but risky)
4. **Grassroots Coalition**: Bottom-up momentum (organic and resilient)
5. **Strategic Narrative**: Master storytelling (high skill ceiling)

Each approach has different energy costs, speed, and political capital modifiers.

### Navigate Real PM Challenges

- **Stakeholder Conflicts**: Sales vs Engineering, Design vs Data
- **Organizational Chaos**: Reorgs, budget cuts, key people leaving
- **Customer Pressure**: Escalations, competitor launches, viral feature requests
- **Team Dynamics**: Conflicts, mistakes, recognition gaps
- **Personal Decisions**: Late nights, weekend work, work-life balance
- **Strategic Choices**: Tech debt vs features, build vs buy, ethical dilemmas

## 🚀 Quick Start

### Play Locally

1. **Clone or download this folder**
2. **Open `index.html` in your browser**
3. **That's it!** No build step, no dependencies.

### Deploy to Vercel

1. **Install Vercel CLI** (if you haven't already):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to the game folder**:
   ```bash
   cd path/to/builder-trail-game
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new one
   - Accept default settings
   - Get your live URL!

### Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import this folder
4. Click "Deploy"
5. Done!

## 🎨 Features

### ✅ Current Features

- 5 different alignment approaches with unique mechanics
- 12 different initiatives to align (API redesign, mobile app, pricing changes, etc.)
- 30+ events covering real PM scenarios
- Resource management (savings, energy, momentum)
- Multiple endings based on your choices
- Keyboard navigation (number keys + Enter)
- Terminal/retro aesthetic
- Fully client-side (no backend needed)

### 🚧 Future Enhancements

- Pixel art scenes (like the original Builder Trail)
- Character sprites and animations
- Sound effects and music
- More events and initiatives
- Achievement system
- Leaderboard
- Save/load game state
- Mobile-optimized UI

## 🎮 How to Play

### Controls

- **Number keys (1-5)**: Select options
- **Enter**: Confirm choices / Continue
- **Arrow keys**: Navigate character selection

### Tips for Success

1. **Watch your energy**: If it hits zero for 2 weeks, you burn out
2. **Maintain momentum**: If it hits zero for 5 weeks, you lose the thread
3. **Balance work and life**: Your choices affect your work-life balance score
4. **Build political capital**: Successful alignments increase your influence
5. **Choose your battles**: Not every initiative is worth fighting for

### Win Conditions

- Align **5 major initiatives** within **26 weeks**
- Keep your **savings above $0**
- Avoid **burnout** (2 consecutive weeks at 0 energy)
- Avoid **losing the thread** (5 consecutive weeks at 0 momentum)

### Endings

There are multiple endings based on:
- How many initiatives you aligned
- Your work-life balance score
- Whether you hit a lose condition

The best ending? **The Balanced Leader** — align 5 initiatives AND maintain work-life balance.

## 🛠️ Technical Details

### Stack

- **Pure HTML/CSS/JavaScript** (no framework!)
- **Vanilla JS** for game logic
- **CSS Grid & Flexbox** for layout
- **LocalStorage** for potential save states (not implemented yet)

### File Structure

```
builder-trail-game/
├── index.html          # Main HTML file
├── style.css           # All styling (terminal aesthetic)
├── game.js             # Core game engine
├── events.js           # Events and initiatives
├── scenes.js           # Pixel art system (placeholder)
├── assets/             # Future: sprites and images
├── vercel.json         # Vercel deployment config
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

### Why No Framework?

- **Simplicity**: Easy to understand and modify
- **Performance**: Instant load times
- **Portability**: Works anywhere (even file://)
- **Learning**: Great for understanding vanilla JS

## 🎯 Design Philosophy

### Inspired by Oregon Trail

- **Resource management**: Balance multiple competing resources
- **Random events**: Each playthrough is different
- **Narrative choices**: Your decisions matter
- **Time pressure**: 26 weeks to achieve your goal
- **Multiple endings**: Success and failure have nuance

### PM-Specific Themes

- **Alignment is the real work**: Building the thing is easy; getting everyone on board is hard
- **No perfect choices**: Every decision has trade-offs
- **Politics matter**: Influence and relationships are currencies
- **Burnout is real**: Energy management is crucial
- **Balance is rare**: Work-life balance is the hardest achievement

## 🤝 Contributing

Want to add more events, initiatives, or features? Here's how:

### Adding New Events

Edit `events.js` and add to the `EVENTS` array:

```javascript
{
  id: 'your_event_id',
  type: 'conflict', // or 'disruption', 'crisis', 'personal', etc.
  title: 'Event Title',
  text: 'Event description...',
  choices: [
    {
      label: 'Choice 1',
      hint: 'What this choice does',
      effects: { energy: -10, momentum: 5 },
      result: 'What happens after this choice'
    },
    // ... more choices
  ]
}
```

### Adding New Initiatives

Edit `events.js` and add to the `INITIATIVES` array:

```javascript
{
  id: 'initiative_id',
  name: 'Initiative Name',
  description: 'What this initiative is about',
  size: 'small', // or 'medium', 'large'
  baseWeeks: 3,
  baseEnergy: 4,
  baseInfluence: 12
}
```

## 📝 License

MIT License - feel free to fork, modify, and use for your own projects!

## 🙏 Credits

- **Concept inspired by**: [The Builder Trail](https://github.com/petergyang/builder-trail-game) by Peter Yang
- **Original inspiration**: Oregon Trail (1971)
- **Theme**: PM alignment challenges (because shipping is easy, alignment is hard)

## 🐛 Known Issues

- Pixel art scenes not implemented yet (placeholder system in place)
- No save/load functionality
- No mobile optimization yet
- Events can repeat (no event history tracking)

## 📮 Feedback

Found a bug? Have an idea for a new event? Want to contribute?

Open an issue or submit a pull request!

---

**Remember**: In the real world, alignment is never perfect. But that's what makes the game interesting. 🎮
