// ========================================
// COZY PM CAMPUS — Encounter Dialog
// ========================================

function showEncounterPopup(npc) {
  const popup = document.getElementById('encounter-popup');
  if (!popup) return;

  popup.classList.remove('hidden');
  popup.innerHTML = `
    <div class="encounter-inner">
      <div class="encounter-emoji">${npc.emoji}</div>
      <div class="encounter-info">
        <div class="encounter-name">${npc.name}</div>
        <div class="encounter-flavor">${npc.flavor}</div>
      </div>
      <div class="encounter-prompt">SPACE to chat</div>
    </div>
  `;
}

function hideEncounterPopup() {
  const popup = document.getElementById('encounter-popup');
  if (!popup) return;
  popup.classList.add('hidden');
}

function handleDialogueKeyDown(e) {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (gameState.nearNPC) {
      hideEncounterPopup();
      startQuiz(gameState.nearNPC);
    }
  }

  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','W','A','S','D'].includes(e.key)) {
    e.preventDefault();
    gameState.nearNPC = null;
    hideEncounterPopup();
    gameState.phase = 'overworld';
    keysDown.add(e.key);
  }

  if (e.key === 'Escape') {
    gameState.nearNPC = null;
    hideEncounterPopup();
    gameState.phase = 'overworld';
  }
}
