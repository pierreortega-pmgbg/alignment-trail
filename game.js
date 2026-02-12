// ========================================
// THE ALIGNMENT TRAIL — Game Engine
// ========================================

// --- Constants ---
const TOTAL_WEEKS = 26;
const ALIGNMENT_GOAL = 5; // Successfully align 5 major initiatives
const WEEKLY_INCOME = 4000;
const WEEKLY_EXPENSES = 3500;
const WEEKLY_ENERGY_DRAIN = 4;
const WEEKLY_MOMENTUM_DECAY = 4;
const QUIET_WEEK_CHANCE = 0.08;
const QUIET_WEEK_ENERGY = 12;

// --- Alignment Approaches (Tools) ---
const APPROACHES = {
  'data_driven': {
    name: 'Data-Driven',
    tagline: 'Let the metrics speak',
    description: 'Build dashboards, run A/B tests, present ROI. Stakeholders trust numbers.',
    energyMod: 1.0,
    alignmentSpeedMod: 1.0,
    politicalCapitalMod: 1.0,
    momentumOnSuccess: 0,
    specialText: 'Balanced approach, works in most orgs'
  },
  'relationship_first': {
    name: 'Relationship-First',
    tagline: 'Coffee chats and 1-on-1s',
    description: 'Build trust before pushing initiatives. Slower but creates lasting buy-in.',
    energyMod: 0.75,
    alignmentSpeedMod: 0.9,
    politicalCapitalMod: 1.2,
    momentumOnSuccess: 5,
    specialText: 'Low energy, builds lasting relationships'
  },
  'executive_sponsor': {
    name: 'Executive Sponsorship',
    tagline: 'Top-down alignment',
    description: 'Get a VP to champion your cause. Fast but risky if priorities shift.',
    energyMod: 0.5,
    alignmentSpeedMod: 0.7,
    politicalCapitalMod: 0.7,
    momentumOnSuccess: 0,
    specialText: 'Fastest start, vulnerable to reorgs'
  },
  'grassroots': {
    name: 'Grassroots Coalition',
    tagline: 'Build from the bottom up',
    description: 'Rally ICs and team leads. Takes time but creates organic momentum.',
    energyMod: 0.9,
    alignmentSpeedMod: 0.95,
    politicalCapitalMod: 1.0,
    momentumOnSuccess: 0,
    specialText: 'Organic growth, resilient to changes'
  },
  'strategic_narrative': {
    name: 'Strategic Narrative',
    tagline: 'Tell a compelling story',
    description: 'Master the art of the memo, the deck, the all-hands pitch. High skill ceiling.',
    energyMod: 1.3,
    alignmentSpeedMod: 1.1,
    politicalCapitalMod: 1.3,
    momentumOnSuccess: 10,
    specialText: 'Hard to master, powerful when done right'
  }
};

// --- State ---
const state = {
  week: 0,
  savings: 30000,
  energy: 100,
  momentum: 50,
  alignmentsAchieved: 0,
  peakMomentum: 50,
  zeroEnergyWeeks: 0,
  zeroMomentumWeeks: 0,
  lastEventId: null,
  currentEvent: null,
  phase: 'intro', // intro | nameCharacterSelect | approachSelect | initiativeSelect | event | result | ending

  // Player identity
  playerName: '',
  character: 'Adam',

  // Approach system
  approach: null,

  // Initiative system
  activeInitiative: null,
  completedInitiatives: [],
  totalPoliticalCapital: 0,

  // Hidden stats
  influenceSkill: 10,
  reputation: 30,
  workLifeBalance: 0,

  // Inflection points
  firedInflections: [],

  // Pixel art overlay
  pendingScene: null
};

// --- DOM ---
let hudEl, contentEl;

function init() {
  hudEl = document.getElementById('hud');
  contentEl = document.getElementById('content');
  renderIntro();
  document.addEventListener('keydown', handleKeydown);
}

// ========================================
// RENDERING
// ========================================

function renderIntro() {
  state.phase = 'intro';
  hudEl.innerHTML = '';
  contentEl.innerHTML = `
    <div class="intro-screen">
      <h1 class="game-title">The Alignment Trail</h1>
      <div class="game-subtitle">A PM SURVIVAL GAME</div>
      
      <div class="intro-text">
        <p>You are a Product Manager at BigTechCo.</p>
        <p>You've got great ideas. Solid roadmaps. Clear vision.</p>
        <p>But nothing ships without alignment.</p>
        <p>You have 26 weeks. Align 5 major initiatives. Don't burn out. Don't lose your team's trust.</p>
      </div>
      
      <button class="btn" onclick="renderNameCharacterSelect()">
        <span class="btn-hint">Press Enter</span>
        Begin
      </button>
    </div>
  `;
}

function renderNameCharacterSelect() {
  state.phase = 'nameCharacterSelect';
  hudEl.innerHTML = '';

  const characters = [
    { name: 'Adam', color: '#39bae6', icon: '▲' },
    { name: 'Alex', color: '#98c379', icon: '●' },
    { name: 'Amelia', color: '#c678dd', icon: '■' },
    { name: 'Bob', color: '#e5c07b', icon: '◆' }
  ];
  const charCards = characters.map((char, i) => `
    <div class="character-card" data-char="${char.name}" onclick="selectCharPreview('${char.name}')">
      <div class="character-preview" data-char="${char.name.toLowerCase()}"></div>
      <div>${char.name}</div>
    </div>
  `).join('');

  contentEl.innerHTML = `
    <div class="text-center">
      <h2 class="event-title mb-20">Who are you?</h2>
      <p class="mb-30">Every PM needs an identity.</p>

      <div class="name-input-section">
        <label>NAME</label>
        <input type="text" id="player-name" placeholder="Enter your name" maxlength="20" />
      </div>

      <p class="mb-20">Choose your character:</p>
      <div class="character-grid">
        ${charCards}
      </div>

      <button class="btn" onclick="confirmNameCharacter()">
        <span class="btn-hint">Press Enter</span>
        Continue
      </button>
    </div>
  `;

  setTimeout(() => {
    const input = document.getElementById('player-name');
    if (input) input.focus();
  }, 100);
}

function selectCharPreview(name) {
  state.character = name;
  const cards = contentEl.querySelectorAll('.character-card');
  cards.forEach(c => {
    c.classList.toggle('selected', c.dataset.char === name);
  });
}

function confirmNameCharacter() {
  if (state.phase !== 'nameCharacterSelect') return;
  const input = document.getElementById('player-name');
  const name = input ? input.value.trim() : '';
  state.playerName = name || 'PM';

  renderApproachSelect();
}

function renderApproachSelect() {
  state.phase = 'approachSelect';
  hudEl.innerHTML = '';

  const approachKeys = Object.keys(APPROACHES);
  const cardsHTML = approachKeys.map((key, i) => {
    const a = APPROACHES[key];
    const stats = [];
    
    const energyPct = Math.round((1 - a.energyMod) * 100);
    if (energyPct > 0) stats.push(`<span class="card-stat positive">↓ ${energyPct}% less energy</span>`);
    else if (energyPct < 0) stats.push(`<span class="card-stat negative">↑ ${-energyPct}% more energy</span>`);
    else stats.push(`<span class="card-stat neutral">⚖ Baseline energy</span>`);

    const speedPct = Math.round((1 - a.alignmentSpeedMod) * 100);
    if (speedPct > 0) stats.push(`<span class="card-stat positive">⚡ ${speedPct}% faster alignment</span>`);
    else if (speedPct < 0) stats.push(`<span class="card-stat negative">⏱ ${-speedPct}% slower alignment</span>`);

    if (a.politicalCapitalMod > 1) stats.push(`<span class="card-stat positive">📈 +${Math.round((a.politicalCapitalMod - 1) * 100)}% influence</span>`);
    if (a.politicalCapitalMod < 1) stats.push(`<span class="card-stat negative">📉 ${Math.round((a.politicalCapitalMod - 1) * 100)}% influence</span>`);
    if (a.momentumOnSuccess > 0) stats.push(`<span class="card-stat positive">🚀 +${a.momentumOnSuccess} momentum on success</span>`);

    return `
      <div class="tool-card" onclick="selectApproach('${key}')">
        <div class="card-number">${i + 1}</div>
        <div class="card-title">${a.name}</div>
        <div class="card-tagline">${a.tagline}</div>
        <div class="card-description">${a.description}</div>
        <div class="card-stats">${stats.join('')}</div>
      </div>
    `;
  }).join('');

  contentEl.innerHTML = `
    <div>
      <h2 class="event-title text-center mb-20">Choose Your Approach</h2>
      <p class="text-center mb-30">How will you drive alignment? Choose wisely.</p>
      <div class="tool-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

function selectApproach(approachKey) {
  if (state.phase !== 'approachSelect') return;
  state.approach = approachKey;
  startGame();
}

function getEffectiveApproachStats() {
  const approach = APPROACHES[state.approach];
  if (!approach) return { energyMod: 1, alignmentSpeedMod: 1, politicalCapitalMod: 1 };

  let energyMod = approach.energyMod;
  let alignmentSpeedMod = approach.alignmentSpeedMod;

  // Strategic Narrative scales with Influence Skill
  if (state.approach === 'strategic_narrative') {
    const skillFactor = state.influenceSkill / 100;
    energyMod = 1.3 - (0.7 * skillFactor);
    alignmentSpeedMod = 1.1 - (0.4 * skillFactor);
  }

  return { energyMod, alignmentSpeedMod, politicalCapitalMod: approach.politicalCapitalMod };
}

function renderHUD() {
  const barWidth = 20;
  const approachName = state.approach ? APPROACHES[state.approach].name : '';
  const approachBit = approachName ? `[${approachName}]` : '';

  const capitalHTML = state.totalPoliticalCapital > 0
    ? `<div class="hud-item">
         <div class="hud-label">INFLUENCE</div>
         <div class="hud-value">+${state.totalPoliticalCapital} points</div>
       </div>`
    : '';

  const initiativeHTML = state.activeInitiative
    ? `<div class="hud-item">
         <div class="hud-label">INITIATIVE</div>
         <div class="hud-value">${makeBar(state.activeInitiative.weeksWorked, state.activeInitiative.weeksRequired, 10)}</div>
         <div style="font-size: 12px; color: var(--dim);">${state.activeInitiative.name} ${state.activeInitiative.weeksWorked}/${state.activeInitiative.weeksRequired}wk</div>
       </div>`
    : '';

  const displayName = state.playerName || 'pm';

  hudEl.innerHTML = `
    <div class="terminal-header">~/${displayName.toLowerCase()}/alignment ${approachBit}</div>
    <div style="color: var(--dim); font-size: 12px; margin-bottom: 15px;">$ week ${state.week} of ${TOTAL_WEEKS}</div>
    
    <div class="hud-grid">
      <div class="hud-item">
        <div class="hud-label">SAVINGS</div>
        <div class="hud-value savings-value ${getSavingsColor()}">${formatMoney(state.savings)}</div>
      </div>
      
      <div class="hud-item">
        <div class="hud-label">ENERGY</div>
        <div class="hud-value">${makeBar(state.energy, 100, barWidth)}</div>
        <div style="font-size: 12px;">${state.energy}</div>
      </div>
      
      <div class="hud-item">
        <div class="hud-label">MOMENTUM</div>
        <div class="hud-value">${makeBar(state.momentum, 100, barWidth)}</div>
        <div style="font-size: 12px;">${state.momentum}</div>
      </div>
      
      <div class="hud-item">
        <div class="hud-label">ALIGNED</div>
        <div class="hud-value">${makeBar(state.alignmentsAchieved, ALIGNMENT_GOAL, 10)}</div>
        <div style="font-size: 12px;">${state.alignmentsAchieved} / ${ALIGNMENT_GOAL}</div>
      </div>
      
      ${initiativeHTML}
      ${capitalHTML}
    </div>
  `;
}

function renderWeek() {
  renderHUD();

  const event = state.currentEvent;
  const isQuiet = !event;
  const isAutoEvent = event && event.choices.length === 1;

  if (isQuiet) {
    const effects = { energy: QUIET_WEEK_ENERGY };
    applyEffects(effects);
    renderHUD();

    contentEl.innerHTML = `
      <div class="event-header">
        <div class="event-type">quiet week</div>
        <div class="event-title">The Grind</div>
      </div>
      
      <div class="event-text">
        No urgent escalations. No surprise reorgs. Just a normal week of standups and sprint reviews. You catch your breath.
      </div>
      
      ${formatEffectsHTML(effects)}
      
      <button class="btn" onclick="nextWeek()">
        <span class="btn-hint">Press Enter</span>
        Next Week
      </button>
    `;
    state.phase = 'result';

  } else if (isAutoEvent) {
    const choice = event.choices[0];
    applyEffects(choice.effects);
    renderHUD();

    contentEl.innerHTML = `
      <div class="event-header">
        <div class="event-type">${event.type}</div>
        <div class="event-title">${event.title}</div>
      </div>
      
      <div class="event-text">${personalize(event.text)}</div>
      
      <div class="result-text">${personalize(choice.result)}</div>
      ${formatEffectsHTML(choice.effects)}
      
      <button class="btn" onclick="nextWeek()">
        <span class="btn-hint">Press Enter</span>
        Next Week
      </button>
    `;
    state.phase = 'result';

  } else {
    const choicesHTML = event.choices.map((c, i) => `
      <div class="choice-card" onclick="handleChoice(${i})">
        <div class="card-number">${i + 1}</div>
        <div class="card-title">${c.label}</div>
        ${c.hint ? `<div class="card-hint">${c.hint}</div>` : ''}
      </div>
    `).join('');

    contentEl.innerHTML = `
      <div class="event-header">
        <div class="event-type">${event.type}</div>
        <div class="event-title">${event.title}</div>
      </div>
      
      <div class="event-text">${personalize(event.text)}</div>
      
      <div class="choices-container">
        ${choicesHTML}
      </div>
    `;
    state.phase = 'event';
  }
}

function renderResult(resultText, effects) {
  contentEl.innerHTML = `
    <div class="result-text">${personalize(resultText)}</div>
    ${formatEffectsHTML(effects)}
    
    <button class="btn" onclick="nextWeek()">
      <span class="btn-hint">Press Enter</span>
      Next Week
    </button>
  `;
}

function renderEnding() {
  const ending = getEnding();
  state.phase = 'ending';
  hudEl.innerHTML = '';

  const approachName = state.approach ? APPROACHES[state.approach].name : 'None';

  contentEl.innerHTML = `
    <div class="ending-screen">
      <div class="ending-badge">${ending.isWin ? 'YEAR COMPLETE' : 'GAME OVER'}</div>
      <h1 class="ending-title">${ending.title}</h1>
      <div class="ending-description">${ending.description}</div>
      
      <div class="ending-stats">
        <div class="ending-stat">
          <div class="ending-stat-label">Weeks survived</div>
          <div class="ending-stat-value">${Math.min(state.week - 1, TOTAL_WEEKS)}</div>
        </div>
        
        <div class="ending-stat">
          <div class="ending-stat-label">Initiatives aligned</div>
          <div class="ending-stat-value">${state.alignmentsAchieved}</div>
        </div>
        
        <div class="ending-stat">
          <div class="ending-stat-label">Final savings</div>
          <div class="ending-stat-value">${formatMoney(Math.max(0, state.savings))}</div>
        </div>
        
        <div class="ending-stat">
          <div class="ending-stat-label">Peak momentum</div>
          <div class="ending-stat-value">${state.peakMomentum}</div>
        </div>
        
        <div class="ending-stat">
          <div class="ending-stat-label">Approach used</div>
          <div class="ending-stat-value" style="font-size: 16px;">${approachName}</div>
        </div>
        
        <div class="ending-stat">
          <div class="ending-stat-label">Political capital</div>
          <div class="ending-stat-value">${state.totalPoliticalCapital}</div>
        </div>
      </div>
      
      <button class="btn" onclick="location.reload()">
        <span class="btn-hint">Press Enter</span>
        Play Again
      </button>
    </div>
  `;
}

// ========================================
// GAME LOGIC
// ========================================

function startGame() {
  state.week = 1;
  state.savings = 30000;
  state.energy = 100;
  state.momentum = 50;
  state.alignmentsAchieved = 0;
  state.peakMomentum = 50;
  state.zeroEnergyWeeks = 0;
  state.zeroMomentumWeeks = 0;
  state.lastEventId = null;
  state.currentEvent = null;

  state.activeInitiative = null;
  state.completedInitiatives = [];
  state.totalPoliticalCapital = 0;
  state.influenceSkill = 10;
  state.reputation = 30;
  state.workLifeBalance = 0;
  state.firedInflections = [];
  state.pendingScene = null;

  renderInitiativeSelect();
}

function renderInitiativeSelect() {
  state.phase = 'initiativeSelect';
  renderHUD();

  const completedIds = state.completedInitiatives.map(i => i.id);
  const available = INITIATIVES.filter(i => !completedIds.includes(i.id));
  const shuffled = available.sort(() => Math.random() - 0.5);
  const offered = shuffled.slice(0, Math.min(3, shuffled.length));

  const approachStats = getEffectiveApproachStats();

  const sizeHints = {
    small: '1 alignment · A few weeks',
    medium: '2 alignments · Several weeks',
    large: '3 alignments · Over a month'
  };

  const cardsHTML = offered.map((init, i) => {
    return `
      <div class="choice-card" onclick="selectInitiative(${i})">
        <div class="card-number">${i + 1}</div>
        <div class="card-title">${init.name}</div>
        <div class="card-description">${init.description}</div>
        <div class="card-hint">${sizeHints[init.size]}</div>
      </div>
    `;
  }).join('');

  const skipIndex = offered.length;
  const skipOption = `
    <div class="choice-card" onclick="selectInitiative(-1)">
      <div class="card-number">${skipIndex + 1}</div>
      <div class="card-title">Take a strategic pause</div>
      <div class="card-description">Rest up, but lose some drive</div>
    </div>
  `;

  state._offeredInitiatives = offered;

  contentEl.innerHTML = `
    <div class="event-header">
      <div class="event-type">initiative</div>
      <div class="event-title">What will you tackle next?</div>
    </div>
    
    <div class="event-text">
      You've got energy and momentum. Pick an initiative to drive alignment on.
    </div>
    
    <div class="choices-container">
      ${cardsHTML}${skipOption}
    </div>
  `;
}

function selectInitiative(index) {
  if (state.phase !== 'initiativeSelect') return;

  if (index === -1) {
    state.activeInitiative = null;
    applyEffects({ energy: 5, momentum: -3 });
  } else {
    const init = state._offeredInitiatives[index];
    const approachStats = getEffectiveApproachStats();

    state.activeInitiative = {
      id: init.id,
      name: init.name,
      description: init.description,
      size: init.size,
      weeksRequired: Math.ceil(init.baseWeeks * approachStats.alignmentSpeedMod),
      weeksWorked: 0,
      energyCostPerWeek: Math.ceil(init.baseEnergy * approachStats.energyMod),
      baseInfluence: init.baseInfluence
    };
  }

  delete state._offeredInitiatives;

  state.currentEvent = Math.random() < QUIET_WEEK_CHANCE ? null : pickEvent();
  renderWeek();
}

function renderInitiativeComplete() {
  state.phase = 'event';

  const initiative = state.activeInitiative;
  const qualityRoll = Math.random();
  const momentumBonus = state.momentum / 100;
  const skillBonus = state.influenceSkill / 100;
  const qualityScore = clamp((qualityRoll * 0.4) + (momentumBonus * 0.3) + (skillBonus * 0.3), 0, 1);

  const approachStats = getEffectiveApproachStats();
  const influenceGained = Math.round(initiative.baseInfluence * qualityScore * approachStats.politicalCapitalMod);

  const approach = APPROACHES[state.approach];
  const alignMomentum = 20 + (approach.momentumOnSuccess || 0);
  const alignCredits = { small: 1, medium: 2, large: 3 }[initiative.size] || 1;

  let qualityText;
  if (qualityScore >= 0.8) qualityText = "Full buy-in across the org. Even the skeptics are on board.";
  else if (qualityScore >= 0.5) qualityText = "Solid alignment. Not everyone's thrilled, but they're committed.";
  else if (qualityScore >= 0.3) qualityText = "Lukewarm support. People agreed in the meeting but you sense resistance.";
  else qualityText = "Barely aligned. You got a 'yes' but it feels fragile. One reorg could undo this.";

  state.currentEvent = {
    id: 'initiative-complete-' + initiative.id,
    type: 'alignment',
    title: `${initiative.name} is Ready`,
    text: `You've been driving ${initiative.name} for ${initiative.weeksWorked} weeks. ${qualityText}`,
    choices: [
      {
        label: 'Lock it in and move forward',
        hint: `+${alignCredits} alignment credit${alignCredits > 1 ? 's' : ''}`,
        effects: { momentum: alignMomentum, alignmentsAchieved: alignCredits },
        result: influenceGained > 15
          ? `It's official. The initiative is greenlit. Your influence in the org grows (+${influenceGained} political capital). People are starting to see you as someone who gets things done.`
          : `It's a go. Not a huge win, but it's progress (+${influenceGained} political capital). You're building credibility one initiative at a time.`,
        _alignData: { id: initiative.id, name: initiative.name, size: initiative.size, quality: qualityScore, influence: influenceGained }
      },
      {
        label: 'Walk away — not enough support',
        hint: 'Abandon and start fresh',
        effects: { momentum: -15, energy: 10 },
        result: "You pull the plug. Better to cut your losses than push forward with weak alignment. The momentum hit stings, but you're free to try something new.",
        _alignData: null
      }
    ]
  };

  renderWeek();
}

function handleChoice(index) {
  if (state.phase !== 'event') return;

  const event = state.currentEvent;
  if (!event || index >= event.choices.length) return;

  const choice = event.choices[index];
  applyEffects(choice.effects);

  if ('_alignData' in choice) {
    if (choice._alignData) {
      state.completedInitiatives.push(choice._alignData);
      state.totalPoliticalCapital += choice._alignData.influence;
      state.reputation = Math.min(100, state.reputation + 10);
    } else if (choice._alignData === null && state.activeInitiative) {
      state.reputation = Math.max(0, state.reputation - 5);
    }
    state.activeInitiative = null;
  }

  renderHUD();
  state.phase = 'result';
  renderResult(choice.result, choice.effects);
}

function nextWeek() {
  if (state.phase !== 'result') return;

  applyWeeklyTick();
  state.week++;

  if (checkGameOver()) {
    state.phase = 'ending';
    renderEnding();
    return;
  }

  if (state.alignmentsAchieved >= ALIGNMENT_GOAL) {
    state.phase = 'ending';
    renderEnding();
    return;
  }

  if (state.week > TOTAL_WEEKS) {
    state.phase = 'ending';
    renderEnding();
    return;
  }

  if (state.activeInitiative && state.activeInitiative.weeksWorked >= state.activeInitiative.weeksRequired) {
    renderInitiativeComplete();
    return;
  }

  if (!state.activeInitiative && state.momentum > 15 && state.week % 3 === 0) {
    renderInitiativeSelect();
    return;
  }

  state.currentEvent = Math.random() < QUIET_WEEK_CHANCE ? null : pickEvent();
  renderWeek();
}

function applyEffects(effects) {
  if (!effects) return;
  if (effects.savings) state.savings += effects.savings;
  if (effects.energy) state.energy += effects.energy;
  if (effects.momentum) state.momentum += effects.momentum;
  if (effects.alignmentsAchieved) state.alignmentsAchieved += effects.alignmentsAchieved;
  if (effects.workLifeBalance) state.workLifeBalance += effects.workLifeBalance;

  state.energy = clamp(state.energy, 0, 100);
  state.momentum = clamp(state.momentum, 0, 100);

  if (state.momentum > state.peakMomentum) {
    state.peakMomentum = state.momentum;
  }
}

function applyWeeklyTick() {
  state.savings += WEEKLY_INCOME - WEEKLY_EXPENSES;

  state.energy -= WEEKLY_ENERGY_DRAIN;
  state.momentum -= WEEKLY_MOMENTUM_DECAY;

  if (state.activeInitiative) {
    state.energy -= state.activeInitiative.energyCostPerWeek;
    state.activeInitiative.weeksWorked++;
    state.influenceSkill = Math.min(100, state.influenceSkill + 2);
    state.momentum += 2;
  }

  state.energy = clamp(state.energy, 0, 100);
  state.momentum = clamp(state.momentum, 0, 100);

  if (state.energy === 0) {
    state.zeroEnergyWeeks++;
  } else {
    state.zeroEnergyWeeks = 0;
  }

  if (state.momentum === 0) {
    state.zeroMomentumWeeks++;
  } else {
    state.zeroMomentumWeeks = 0;
  }

  if (state.momentum > state.peakMomentum) {
    state.peakMomentum = state.momentum;
  }
}

function checkGameOver() {
  if (state.savings <= 0) return true;
  if (state.zeroEnergyWeeks >= 2) return true;
  if (state.zeroMomentumWeeks >= 5) return true;
  return false;
}

function getEnding() {
  const wlb = state.workLifeBalance;

  if (state.savings <= 0) {
    return { isWin: false, title: 'Broke', 
      description: "The money ran out. Rent, daycare, life in the Bay Area — it adds up. The PM grind continues, but the dream is on pause." };
  }
  if (state.zeroEnergyWeeks >= 2) {
    return { isWin: false, title: 'Burnout', 
      description: "Two weeks of zero energy. Your body made the choice for you. Time to take a real break." };
  }
  if (state.zeroMomentumWeeks >= 5) {
    return { isWin: false, title: 'Lost the Thread', 
      description: "Five weeks without making progress. The initiatives gather dust. You meant to get back to them. You always meant to." };
  }

  if (state.alignmentsAchieved >= ALIGNMENT_GOAL) {
    if (wlb >= 3) return { isWin: true, title: 'The Balanced Leader', 
      description: `${ALIGNMENT_GOAL} initiatives aligned AND your life is intact. You proved you can drive outcomes without sacrificing everything. The rarest kind of PM.` };
    if (wlb <= -3) return { isWin: true, title: 'The Workaholic', 
      description: `You aligned ${ALIGNMENT_GOAL} initiatives. But at what cost? Your family barely sees you. Your friends stopped inviting you out.` };
    return { isWin: true, title: 'The Aligner', 
      description: `${ALIGNMENT_GOAL} initiatives aligned. You're not just a PM who writes docs — you're someone who makes things happen. The org knows it now.` };
  }

  if (wlb >= 3) return { isWin: false, title: 'The Balanced One', 
    description: "You chose life over work. Not enough aligned, but your relationships are strong. Maybe that's its own kind of win." };
  if (wlb <= -3) return { isWin: false, title: 'Lost in the Grind', 
    description: "You sacrificed everything but didn't align enough. The worst of both worlds. Time to reset." };
  return { isWin: false, title: 'The Tinkerer', 
    description: `Time's up. ${state.alignmentsAchieved} initiative${state.alignmentsAchieved !== 1 ? 's' : ''} aligned, needed ${ALIGNMENT_GOAL}. You learned a lot. Maybe next time.` };
}

// ========================================
// HELPERS
// ========================================

function pickEvent() {
  let pool = [...EVENTS];

  let event;
  let attempts = 0;
  do {
    event = pool[Math.floor(Math.random() * pool.length)];
    attempts++;
  } while (event.id === state.lastEventId && attempts < 10);

  state.lastEventId = event.id;

  if (typeof event.text === 'function') {
    event = { ...event, text: event.text() };
  }

  return event;
}

function personalize(text) {
  if (!text || !state.playerName) return text;
  return text.replace(/\{name\}/g, state.playerName);
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function formatMoney(n) {
  const sign = n < 0 ? '-' : '';
  return sign + '$' + Math.abs(n).toLocaleString();
}

function getSavingsColor() {
  if (state.savings < 10000) return 'red';
  if (state.savings < 20000) return 'yellow';
  return '';
}

function makeBar(current, max, width) {
  const filled = Math.round((current / max) * width);
  const empty = width - filled;
  const pct = current / max;

  let colorClass = 'green';
  if (pct <= 0.3) colorClass = 'red';
  else if (pct <= 0.6) colorClass = 'yellow';

  return `<span class="bar ${colorClass}">${'█'.repeat(filled)}${'░'.repeat(empty)}</span>`;
}

function formatEffectsHTML(effects) {
  if (!effects) return '';
  const parts = [];
  const labels = {
    savings: 'Savings',
    energy: 'Energy',
    momentum: 'Momentum',
    alignmentsAchieved: 'Aligned',
    workLifeBalance: 'Work-Life Balance'
  };

  for (const [key, val] of Object.entries(effects)) {
    if (val === 0) continue;
    if (key.startsWith('_')) continue;
    const sign = val > 0 ? '+' : '';
    const colorClass = val > 0 ? 'green' : 'red';

    if (key === 'savings') {
      parts.push(`<span class="effect ${colorClass}">${sign}${formatMoney(val)}</span>`);
    } else if (key === 'alignmentsAchieved') {
      parts.push(`<span class="effect ${colorClass}">+${val} alignment credit${val > 1 ? 's' : ''}</span>`);
    } else {
      parts.push(`<span class="effect ${colorClass}">${labels[key] || key} ${sign}${val}</span>`);
    }
  }

  return parts.length > 0 ? `<div class="effects">${parts.join('')}</div>` : '';
}

// ========================================
// INPUT HANDLING
// ========================================

function handleKeydown(e) {
  if (document.activeElement && document.activeElement.tagName === 'INPUT') {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (state.phase === 'nameCharacterSelect') confirmNameCharacter();
    }
    return;
  }

  if (state.phase === 'intro' && e.key === 'Enter') {
    renderNameCharacterSelect();
    return;
  }

  if (state.phase === 'nameCharacterSelect') {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const chars = ['Adam', 'Alex', 'Amelia', 'Bob'];
      const curIdx = chars.indexOf(state.character);
      const newIdx = e.key === 'ArrowRight' ? (curIdx + 1) % 4 : (curIdx + 3) % 4;
      selectCharPreview(chars[newIdx]);
      return;
    }
    if (e.key === 'Enter') {
      confirmNameCharacter();
      return;
    }
    return;
  }

  if (state.phase === 'approachSelect') {
    if (e.key >= '1' && e.key <= '5') {
      const keys = Object.keys(APPROACHES);
      selectApproach(keys[parseInt(e.key) - 1]);
      return;
    }
    return;
  }

  if (state.phase === 'initiativeSelect') {
    if (e.key >= '1' && e.key <= '9') {
      const maxIndex = (state._offeredInitiatives ? state._offeredInitiatives.length : 0);
      const index = parseInt(e.key) - 1;
      if (index < maxIndex) selectInitiative(index);
      else if (index === maxIndex) selectInitiative(-1);
      return;
    }
    return;
  }

  if (state.phase === 'event') {
    const event = state.currentEvent;
    if (event && e.key >= '1' && e.key <= '9') {
      const index = parseInt(e.key) - 1;
      if (index < event.choices.length) handleChoice(index);
      return;
    }
    return;
  }

  if (state.phase === 'result' && e.key === 'Enter') {
    nextWeek();
    return;
  }

  if (state.phase === 'ending' && e.key === 'Enter') {
    location.reload();
    return;
  }
}
