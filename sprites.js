// ========================================
// COZY PM CAMPUS — Sprite & Asset Loader
// ========================================

const TILESET_COLS = 24;
const TILESET_TILE_SIZE = 32;
const TILESET_MARGIN = 1;
const TILESET_SPACING = 2;

const ASSETS = {
  tileset: 'assets/tuxmon-tileset.png',
  adam: 'assets/adam.png',
  alex: 'assets/alex.png',
  amelia: 'assets/amelia.png',
  bob: 'assets/bob.png',
};

const loadedImages = {};
const characterBounds = {};
let assetsReady = false;

function loadImage(key, src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { loadedImages[key] = img; resolve(img); };
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function computeOpaqueBounds(img) {
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const cx = c.getContext('2d', { willReadFrequently: true });
  cx.drawImage(img, 0, 0);
  const data = cx.getImageData(0, 0, img.width, img.height).data;

  let minX = img.width;
  let minY = img.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const a = data[(y * img.width + x) * 4 + 3];
      if (a === 0) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY) {
    return { x: 0, y: 0, w: img.width, h: img.height };
  }

  return {
    x: minX,
    y: minY,
    w: maxX - minX + 1,
    h: maxY - minY + 1,
  };
}

async function preloadAll(onProgress) {
  const tasks = [
    loadImage('tileset', ASSETS.tileset),
    loadImage('adam', ASSETS.adam),
    loadImage('alex', ASSETS.alex),
    loadImage('amelia', ASSETS.amelia),
    loadImage('bob', ASSETS.bob),
  ];

  const total = tasks.length;
  let done = 0;

  await Promise.all(tasks.map(p => p.then(r => {
    done++;
    if (onProgress) onProgress(done / total);
    return r;
  })));

  Object.keys(loadedImages).forEach((k) => {
    if (k === 'tileset') return;
    characterBounds[k] = computeOpaqueBounds(loadedImages[k]);
  });

  assetsReady = true;
}

function drawTile(ctx, tileId, screenX, screenY) {
  if (tileId <= 0 || !loadedImages.tileset) return;

  const idx = tileId - 1;
  const col = idx % TILESET_COLS;
  const row = Math.floor(idx / TILESET_COLS);

  const srcX = col * (TILESET_TILE_SIZE + TILESET_SPACING) + TILESET_MARGIN;
  const srcY = row * (TILESET_TILE_SIZE + TILESET_SPACING) + TILESET_MARGIN;

  ctx.drawImage(
    loadedImages.tileset,
    srcX, srcY, TILESET_TILE_SIZE, TILESET_TILE_SIZE,
    screenX, screenY, TILE_PX, TILE_PX
  );
}

function getSpriteStyle(spriteKey) {
  if (typeof SPRITE_STYLES === 'undefined') {
    return { base: 'adam', hue: 0, sat: 1, bri: 1 };
  }
  return SPRITE_STYLES[spriteKey] || SPRITE_STYLES.default || { base: 'adam', hue: 0, sat: 1, bri: 1 };
}

function drawCharacterSprite(ctx, spriteKey, direction, screenX, screenY, scale) {
  const style = getSpriteStyle(spriteKey);
  const baseKey = style.base || 'adam';
  const img = loadedImages[baseKey];
  const b = characterBounds[baseKey];
  if (!img || !b) return;

  // Normalize all character portraits to similar in-game footprint.
  const renderH = Math.round((scale || 1) * 44);
  const renderW = Math.round((b.w / b.h) * renderH);

  let sat = style.sat || 1;
  let bri = style.bri || 1;
  const hue = style.hue || 0;

  if (direction === 'up') {
    sat *= 0.78;
    bri *= 0.83;
  }

  const filter = `hue-rotate(${hue}deg) saturate(${sat}) brightness(${bri})`;
  const drawX = Math.round(screenX - renderW / 2);
  const drawY = Math.round(screenY - renderH / 2);

  ctx.save();
  ctx.filter = filter;
  if (direction === 'left') {
    ctx.translate(drawX + renderW, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, b.x, b.y, b.w, b.h, 0, drawY, renderW, renderH);
  } else {
    ctx.drawImage(img, b.x, b.y, b.w, b.h, drawX, drawY, renderW, renderH);
  }
  ctx.restore();
}

function renderLoadingScreen(ctx, canvas, progress) {
  ctx.fillStyle = '#f4ead5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#3d3225';
  ctx.font = '16px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2 - 30);

  const barW = 200;
  const barH = 16;
  const barX = (canvas.width - barW) / 2;
  const barY = canvas.height / 2;

  ctx.strokeStyle = '#3d3225';
  ctx.lineWidth = 2;
  ctx.strokeRect(barX, barY, barW, barH);

  ctx.fillStyle = '#e8835a';
  ctx.fillRect(barX + 2, barY + 2, (barW - 4) * progress, barH - 4);
}
