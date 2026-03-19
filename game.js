// ========================================
// COZY PM CAMPUS — Main Game Engine
// ========================================

function init() {
  const canvas = document.createElement('canvas');
  canvas.width = VIEWPORT_W * TILE_PX;
  canvas.height = VIEWPORT_H * TILE_PX;
  const ctx = canvas.getContext('2d');

  const contentEl = document.getElementById('content');
  contentEl.innerHTML = '';
  contentEl.appendChild(canvas);

  gameState.phase = 'loading';
  renderLoadingScreen(ctx, canvas, 0);

  preloadAll((progress) => {
    renderLoadingScreen(ctx, canvas, progress);
  }).then(() => {
    renderIntro();
  }).catch(err => {
    console.error('Failed to load assets:', err);
    ctx.fillStyle = '#3d3225';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Failed to load assets. Refresh to retry.', canvas.width / 2, canvas.height / 2);
  });

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('keyup', handleKeyup);
}

function renderIntro() {
  gameState.phase = 'intro';
  const hudEl = document.getElementById('hud');
  hudEl.innerHTML = '';

  const contentEl = document.getElementById('content');
  contentEl.innerHTML = `
    <div class="intro-screen">
      <div class="game-title">The Alignment Trail</div>
      <div class="game-subtitle">A Cozy PM Adventure</div>
      <p class="intro-desc">
        Explore the tech campus, meet stakeholders,<br>
        and befriend them by sharing your PM wisdom!
      </p>
      <button class="btn cozy-btn" onclick="renderNameSelect()">
        Start Exploring
      </button>
      <div class="intro-hint">Press Enter to start</div>
    </div>
  `;
}

function renderNameSelect() {
  gameState.phase = 'nameSelect';
  const selected = gameState.playerAvatar || PLAYER_AVATARS[0].id;
  gameState.playerAvatar = selected;
  const female = PLAYER_AVATARS.filter(a => a.gender === 'female');
  const male = PLAYER_AVATARS.filter(a => a.gender === 'male');

  const toCards = (arr) => arr.map(a => `
    <button class="avatar-card ${selected === a.id ? 'selected' : ''}" onclick="selectAvatar('${a.id}', this)" data-avatar="${a.id}">
      <img class="avatar-preview-img" src="${a.previewSrc}" alt="${a.label}" />
      <div class="avatar-label">${a.label}</div>
    </button>
  `).join('');

  const contentEl = document.getElementById('content');
  contentEl.innerHTML = `
    <div class="name-select-screen">
      <div class="section-title">What's your name?</div>
      <input type="text" id="name-input" class="name-input" placeholder="Your name" maxlength="12" autofocus />
      <div class="section-title" style="margin-top:24px">Pick your look</div>
      <div class="avatar-groups">
        <div class="avatar-group">
          <div class="avatar-group-title">Female Avatars</div>
          <div class="avatar-grid">${toCards(female)}</div>
        </div>
        <div class="avatar-group">
          <div class="avatar-group-title">Male Avatars</div>
          <div class="avatar-grid">${toCards(male)}</div>
        </div>
      </div>
      <button class="btn cozy-btn" onclick="confirmName()" style="margin-top:24px">
        Let's Go!
      </button>
      <div class="intro-hint">Press Enter to confirm</div>
    </div>
  `;

  setTimeout(() => {
    const input = document.getElementById('name-input');
    if (input) input.focus();
  }, 100);
}

function selectAvatar(avatar, el) {
  gameState.playerAvatar = avatar;
  document.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');
}

function confirmName() {
  const input = document.getElementById('name-input');
  const name = input ? input.value.trim() : '';
  gameState.playerName = name || 'PM';
  initGameState();
  gameState.playerName = name || 'PM';
  startOverworld();
}

// --- Collection ---

function showCollection() {
  stopMapLoop();
  gameState.phase = 'collection';

  const contentEl = document.getElementById('content');
  const cardsHTML = STAKEHOLDERS.map(npc => {
    const captured = gameState.befriended.has(npc.id);
    return `
      <div class="collection-card ${captured ? 'captured' : 'unknown'}">
        <div class="collection-emoji">${captured ? npc.emoji : '?'}</div>
        <div class="collection-name">${captured ? npc.name : '???'}</div>
        ${captured ? `<div class="collection-area">${npc.area}</div>` : ''}
      </div>
    `;
  }).join('');

  contentEl.innerHTML = `
    <div class="collection-screen">
      <div class="section-title">Stakeholder Journal</div>
      <div class="collection-count">${gameState.befriended.size} / ${STAKEHOLDERS.length} befriended</div>
      <div class="collection-grid">${cardsHTML}</div>
      <button class="btn cozy-btn" onclick="closeCollection()">Back to Campus</button>
      <div class="intro-hint">Press Esc to close</div>
    </div>
  `;
}

function closeCollection() {
  startOverworld();
}

// --- Pause Menu ---

function showPauseMenu() {
  stopMapLoop();
  gameState.phase = 'paused';

  const contentEl = document.getElementById('content');
  contentEl.innerHTML = `
    <div class="pause-screen">
      <div class="section-title">Paused</div>
      <button class="btn cozy-btn" onclick="resumeGame()">Resume</button>
      <button class="btn cozy-btn secondary" onclick="returnToTitle()">Return to Title</button>
    </div>
  `;
}

function resumeGame() {
  startOverworld();
}

function returnToTitle() {
  stopMapLoop();
  initGameState();
  renderIntro();
}

// --- Ending ---

function showEnding() {
  stopMapLoop();
  gameState.phase = 'ending';

  const contentEl = document.getElementById('content');
  const hudEl = document.getElementById('hud');
  hudEl.innerHTML = '';

  contentEl.innerHTML = `
    <div class="ending-screen">
      <div class="result-emoji">\u{1F389}</div>
      <div class="game-title">Congratulations!</div>
      <div class="ending-subtitle">You befriended every stakeholder on campus!</div>
      <div class="ending-stats">
        <div class="stat-row"><span>Level</span><span>${gameState.level}</span></div>
        <div class="stat-row"><span>Total XP</span><span>${gameState.xp}</span></div>
        <div class="stat-row"><span>Befriended</span><span>${gameState.befriended.size}/${STAKEHOLDERS.length}</span></div>
      </div>
      <p class="ending-message">
        You navigated office politics with empathy, curiosity, and wisdom.
        That's what great PMs do.
      </p>
      <button class="btn cozy-btn" onclick="returnToTitle()">Play Again</button>
    </div>
  `;
}

// --- Input Router ---

function handleKeydown(e) {
  switch (gameState.phase) {
    case 'intro':
      if (e.key === 'Enter') renderNameSelect();
      break;

    case 'nameSelect':
      if (e.key === 'Enter') confirmName();
      break;

    case 'overworld':
      handleOverworldKeyDown(e);
      if (gameState.nearNPC && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        gameState.phase = 'dialogue';
      }
      break;

    case 'dialogue':
      handleDialogueKeyDown(e);
      break;

    case 'quiz':
      if (e.key === 'Enter') {
        const nextBtn = document.querySelector('.quiz-next-btn');
        if (nextBtn) nextBtn.click();
      }
      if (e.key >= '1' && e.key <= '4') {
        const idx = parseInt(e.key) - 1;
        if (!gameState.quizAnswered) answerQuiz(idx);
      }
      break;

    case 'collection':
      if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') closeCollection();
      break;

    case 'paused':
      if (e.key === 'Escape') resumeGame();
      break;

    case 'ending':
      if (e.key === 'Enter') returnToTitle();
      break;
  }
}

function handleKeyup(e) {
  if (gameState.phase === 'overworld') {
    handleOverworldKeyUp(e);
  }
  keysDown.delete(e.key);
}
