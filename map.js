// ========================================
// COZY PM CAMPUS — Overworld Map & Camera
// ========================================

let mapCanvas, mapCtx;
let mapAnimFrame = null;
let lastMoveTime = 0;
const MOVE_COOLDOWN = 180;
const CAMERA_LERP = 0.09;
const keysDown = new Set();

function startOverworld() {
  gameState.phase = 'overworld';
  gameState.nearNPC = null;
  keysDown.clear();
  lastMoveTime = Date.now();
  renderOverworldUI();
  if (!mapAnimFrame) mapLoop();
}

function renderOverworldUI() {
  const cw = VIEWPORT_W * TILE_PX;
  const ch = VIEWPORT_H * TILE_PX;

  const hudEl = document.getElementById('hud');
  hudEl.innerHTML = `
    <div class="cozy-hud">
      <div class="hud-left">
        <span class="hud-level">Lv.${gameState.level}</span>
        <div class="hud-xp-bar"><div class="hud-xp-fill" style="width:${getXPProgress() * 100}%"></div></div>
      </div>
      <div class="hud-right">
        <span class="hud-collected">${gameState.befriended.size}/${STAKEHOLDERS.length} befriended</span>
      </div>
    </div>
  `;

  const contentEl = document.getElementById('content');
  contentEl.innerHTML = `
    <div class="map-wrapper">
      <canvas id="map-canvas" width="${cw}" height="${ch}"></canvas>
      <div id="encounter-popup" class="encounter-popup hidden"></div>
    </div>
    <div class="map-controls-hint">
      <span>WASD / Arrows to move</span>
      <span>C = Collection</span>
      <span>Esc = Menu</span>
    </div>
  `;

  mapCanvas = document.getElementById('map-canvas');
  mapCtx = mapCanvas.getContext('2d');
  mapCtx.imageSmoothingEnabled = false;
}

function mapLoop() {
  if (gameState.phase !== 'overworld' && gameState.phase !== 'dialogue') {
    mapAnimFrame = null;
    return;
  }

  if (gameState.phase === 'overworld') {
    processMapInput();
  }

  updateTween();
  updateCamera();
  drawMap();
  checkNPCProximity();

  mapAnimFrame = requestAnimationFrame(mapLoop);
}

function stopMapLoop() {
  if (mapAnimFrame) {
    cancelAnimationFrame(mapAnimFrame);
    mapAnimFrame = null;
  }
}

// --- Camera ---

function updateCamera() {
  const targetX = gameState.tweenX;
  const targetY = gameState.tweenY;

  gameState.camX += (targetX - gameState.camX) * CAMERA_LERP;
  gameState.camY += (targetY - gameState.camY) * CAMERA_LERP;

  const halfW = (VIEWPORT_W * TILE_PX) / 2;
  const halfH = (VIEWPORT_H * TILE_PX) / 2;
  const maxX = MAP_W * TILE_PX - halfW;
  const maxY = MAP_H * TILE_PX - halfH;

  gameState.camX = Math.max(halfW, Math.min(maxX, gameState.camX));
  gameState.camY = Math.max(halfH, Math.min(maxY, gameState.camY));
}

// --- Tween ---

function updateTween() {
  if (!gameState.tweenActive) return;

  const elapsed = Date.now() - gameState.tweenStart;
  const t = Math.min(1, elapsed / gameState.tweenDuration);

  gameState.tweenX = gameState.tweenFromX + (gameState.tweenToX - gameState.tweenFromX) * t;
  gameState.tweenY = gameState.tweenFromY + (gameState.tweenToY - gameState.tweenFromY) * t;

  if (t >= 1) {
    gameState.tweenActive = false;
  }
}

function startTween(toX, toY) {
  gameState.tweenFromX = gameState.tweenX;
  gameState.tweenFromY = gameState.tweenY;
  gameState.tweenToX = toX;
  gameState.tweenToY = toY;
  gameState.tweenStart = Date.now();
  gameState.tweenActive = true;
}

// --- Drawing ---

function drawMap() {
  if (!mapCtx || !assetsReady) return;

  const ctx = mapCtx;
  const canvasW = VIEWPORT_W * TILE_PX;
  const canvasH = VIEWPORT_H * TILE_PX;

  ctx.clearRect(0, 0, canvasW, canvasH);

  const offsetX = gameState.camX - canvasW / 2;
  const offsetY = gameState.camY - canvasH / 2;

  const startCol = Math.max(0, Math.floor(offsetX / TILE_PX));
  const endCol = Math.min(MAP_W - 1, Math.ceil((offsetX + canvasW) / TILE_PX));
  const startRow = Math.max(0, Math.floor(offsetY / TILE_PX));
  const endRow = Math.min(MAP_H - 1, Math.ceil((offsetY + canvasH) / TILE_PX));

  // Layer 1: Ground
  for (let y = startRow; y <= endRow; y++) {
    for (let x = startCol; x <= endCol; x++) {
      const screenX = x * TILE_PX - offsetX;
      const screenY = y * TILE_PX - offsetY;
      drawTile(ctx, MAP_GROUND[y][x], screenX, screenY);
    }
  }

  // Layer 2: World objects
  for (let y = startRow; y <= endRow; y++) {
    for (let x = startCol; x <= endCol; x++) {
      const tile = MAP_WORLD[y][x];
      if (tile === 0) continue;
      const screenX = x * TILE_PX - offsetX;
      const screenY = y * TILE_PX - offsetY;
      drawTile(ctx, tile, screenX, screenY);
    }
  }

  // Layer 3: NPCs
  drawNPCs(ctx, offsetX, offsetY);

  // Layer 4: Player
  drawPlayer(ctx, offsetX, offsetY);

  // Layer 5: Above player
  for (let y = startRow; y <= endRow; y++) {
    for (let x = startCol; x <= endCol; x++) {
      const tile = MAP_ABOVE[y][x];
      if (tile === 0) continue;
      const screenX = x * TILE_PX - offsetX;
      const screenY = y * TILE_PX - offsetY;
      drawTile(ctx, tile, screenX, screenY);
    }
  }

  // Area labels
  drawAreaLabels(ctx, offsetX, offsetY);
}

function drawAreaLabels(ctx, offsetX, offsetY) {
  ctx.font = '8px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(61, 50, 37, 0.5)';
  AREA_LABELS.forEach(a => {
    const sx = a.x * TILE_PX + TILE_PX / 2 - offsetX;
    const sy = a.y * TILE_PX + TILE_PX / 2 - offsetY;
    ctx.fillText(a.label, sx, sy);
  });
}

function drawNPCs(ctx, offsetX, offsetY) {
  STAKEHOLDERS.forEach(npc => {
    const isFriend = gameState.befriended.has(npc.id);

    const cx = npc.spawnX * TILE_PX + TILE_PX / 2 - offsetX;
    const cy = npc.spawnY * TILE_PX + TILE_PX / 2 - offsetY;

    if (cx < -TILE_PX || cx > VIEWPORT_W * TILE_PX + TILE_PX) return;
    if (cy < -TILE_PX || cy > VIEWPORT_H * TILE_PX + TILE_PX) return;

    const bob = Math.sin(Date.now() / 600 + npc.spawnX * 2) * 2;
    const facingCycle = ['down', 'left', 'right', 'up'];
    const facing = npc.facing || facingCycle[(npc.spawnX + npc.spawnY) % facingCycle.length];

    // NPC body: unique stakeholder character sprite.
    drawCharacterSprite(ctx, npc.spriteKey, facing, cx, cy + bob + 3, 0.8);

    // Indicator above head
    ctx.font = '12px serif';
    ctx.textAlign = 'center';
    if (isFriend) {
      ctx.fillStyle = '#6bb5a0';
      ctx.fillText('\u2714', cx, cy - 18 + bob);
    } else {
      ctx.fillStyle = '#e8835a';
      ctx.fillText('\u2764', cx, cy - 18 + bob);
    }

    // NPC emoji badge
    ctx.font = '16px serif';
    ctx.fillText(npc.emoji, cx + 14, cy - 8 + bob);
  });
}

function drawPlayer(ctx, offsetX, offsetY) {
  const px = gameState.tweenX - offsetX;
  const py = gameState.tweenY - offsetY;

  drawCharacterSprite(ctx, gameState.playerAvatar, gameState.playerDir, px, py + 3, 0.9);

  // Player name below
  if (gameState.playerName) {
    ctx.font = '7px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#d4a03c';
    ctx.strokeStyle = '#3d3225';
    ctx.lineWidth = 2;
    ctx.strokeText(gameState.playerName, px, py + 24);
    ctx.fillText(gameState.playerName, px, py + 24);
  }
}

// --- Input ---

function processMapInput() {
  const now = Date.now();
  if (gameState.tweenActive) return;
  if (now - lastMoveTime < MOVE_COOLDOWN) return;

  let dx = 0, dy = 0;
  if (keysDown.has('ArrowUp') || keysDown.has('w') || keysDown.has('W')) dy = -1;
  else if (keysDown.has('ArrowDown') || keysDown.has('s') || keysDown.has('S')) dy = 1;
  else if (keysDown.has('ArrowLeft') || keysDown.has('a') || keysDown.has('A')) dx = -1;
  else if (keysDown.has('ArrowRight') || keysDown.has('d') || keysDown.has('D')) dx = 1;

  if (dx === 0 && dy === 0) return;

  tryMove(dx, dy);
  lastMoveTime = now;
}

function tryMove(dx, dy) {
  const nx = gameState.px + dx;
  const ny = gameState.py + dy;

  if (isSolidTile(nx, ny)) return;

  // Check if NPC is occupying that tile
  const npcOnTile = STAKEHOLDERS.find(n => n.spawnX === nx && n.spawnY === ny);
  if (npcOnTile) return;

  gameState.px = nx;
  gameState.py = ny;

  if (dy < 0) gameState.playerDir = 'up';
  else if (dy > 0) gameState.playerDir = 'down';
  else if (dx < 0) gameState.playerDir = 'left';
  else if (dx > 0) gameState.playerDir = 'right';

  startTween(nx * TILE_PX + TILE_PX / 2, ny * TILE_PX + TILE_PX / 2);
}

function handleOverworldKeyDown(e) {
  keysDown.add(e.key);

  if (e.key === 'c' || e.key === 'C') {
    showCollection();
    return;
  }

  if (e.key === 'Escape') {
    showPauseMenu();
    return;
  }

  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','W','A','S','D'].includes(e.key)) {
    e.preventDefault();
    if (!gameState.tweenActive) {
      let dx = 0, dy = 0;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') dy = -1;
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') dy = 1;
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') dx = -1;
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') dx = 1;
      if (dx !== 0 || dy !== 0) {
        tryMove(dx, dy);
        lastMoveTime = Date.now();
      }
    }
  }
}

function handleOverworldKeyUp(e) {
  keysDown.delete(e.key);
}

// --- NPC proximity ---

function checkNPCProximity() {
  if (gameState.phase !== 'overworld') return;

  let nearest = null;
  let nearestDist = Infinity;

  STAKEHOLDERS.forEach(npc => {
    if (gameState.befriended.has(npc.id)) return;
    const dist = Math.abs(npc.spawnX - gameState.px) + Math.abs(npc.spawnY - gameState.py);
    if (dist <= 2 && dist < nearestDist) {
      nearest = npc;
      nearestDist = dist;
    }
  });

  if (nearest !== gameState.nearNPC) {
    gameState.nearNPC = nearest;
    if (nearest) {
      showEncounterPopup(nearest);
    } else {
      hideEncounterPopup();
    }
  }
}
