// ========================================
// COZY PM CAMPUS — State Management
// ========================================

const gameState = {
  phase: 'loading',
  playerName: '',
  playerAvatar: 'avatar_amelia',

  px: PLAYER_SPAWN.x,
  py: PLAYER_SPAWN.y,
  playerDir: 'down',

  // Smooth movement tween
  tweenX: PLAYER_SPAWN.x * TILE_PX + TILE_PX / 2,
  tweenY: PLAYER_SPAWN.y * TILE_PX + TILE_PX / 2,
  tweenActive: false,
  tweenStart: 0,
  tweenFromX: 0,
  tweenFromY: 0,
  tweenToX: 0,
  tweenToY: 0,
  tweenDuration: 150,

  // Camera (smooth lerp)
  camX: 0,
  camY: 0,

  // Progression
  xp: 0,
  level: 1,
  befriended: new Set(),
  quizAttempts: {},

  // Current encounter
  nearNPC: null,
  quizNPC: null,
  quizIndex: 0,
  quizCorrect: 0,
  quizAnswered: false,
  quizShowHint: false,
  quizOptionOrder: [],
};

function initGameState() {
  gameState.phase = 'loading';
  gameState.playerName = '';
  gameState.px = PLAYER_SPAWN.x;
  gameState.py = PLAYER_SPAWN.y;
  gameState.playerDir = 'down';
  gameState.tweenX = PLAYER_SPAWN.x * TILE_PX + TILE_PX / 2;
  gameState.tweenY = PLAYER_SPAWN.y * TILE_PX + TILE_PX / 2;
  gameState.tweenActive = false;
  gameState.camX = gameState.tweenX;
  gameState.camY = gameState.tweenY;
  gameState.xp = 0;
  gameState.level = 1;
  gameState.befriended = new Set();
  gameState.quizAttempts = {};
  gameState.nearNPC = null;
  gameState.quizNPC = null;
  gameState.quizOptionOrder = [];
}

function gainXP(amount) {
  gameState.xp += amount;
  let leveled = false;
  while (gameState.level < MAX_LEVEL && gameState.xp >= XP_PER_LEVEL[gameState.level]) {
    gameState.level++;
    leveled = true;
  }
  return leveled;
}

function getXPProgress() {
  if (gameState.level >= MAX_LEVEL) return 1;
  const prev = gameState.level > 1 ? XP_PER_LEVEL[gameState.level - 1] : 0;
  const next = XP_PER_LEVEL[gameState.level];
  return (gameState.xp - prev) / (next - prev);
}
