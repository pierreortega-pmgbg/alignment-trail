// ========================================
// COZY PM CAMPUS — Content & Map Data
// ========================================

const MAP_W = 40;
const MAP_H = 30;
const TILE_PX = 32;

const VIEWPORT_W = 16;
const VIEWPORT_H = 12;

// Key tile IDs from the Tuxemon tileset (1-indexed)
const T = {
  EMPTY: 0,
  GRASS: 126,
  PATH: 174,
  PATH_NW: 149, PATH_N: 150, PATH_NE: 151,
  PATH_W: 173, PATH_E: 175,
  PATH_SW: 197, PATH_S: 198, PATH_SE: 199,
  PATH_INW: 196, PATH_INE: 195,
  PATH_ISW: 172, PATH_ISE: 171,
  TREE_TL: 169, TREE_TR: 170,
  TREE_BL: 193, TREE_BR: 194,
  FENCE_TL: 217, FENCE_T: 218, FENCE_TR: 219,
  FENCE_L: 241, FENCE_R: 243,
  FENCE_BL: 265, FENCE_B: 266, FENCE_BR: 267,
  FENCE_OPEN_L: 268, FENCE_OPEN_R: 269,
  SIGN: 332, FLOWER1: 333, FLOWER2: 334, FLOWER3: 335,
  PLANT1: 329, PLANT2: 330,
  BENCH: 200,
  DOOR: 152,
  HOUSE1_TL: 601, HOUSE1_TC: 602, HOUSE1_TR: 603, HOUSE1_TL2: 604, HOUSE1_TR2: 605,
  HOUSE1_BL: 625, HOUSE1_BC: 626, HOUSE1_BR: 627, HOUSE1_BL2: 628, HOUSE1_BR2: 629,
  HOUSE1_DL: 649, HOUSE1_DC: 650, HOUSE1_DR: 651, HOUSE1_DL2: 652, HOUSE1_DR2: 653,
  ROOF_TL: 577, ROOF_TC: 578, ROOF_TR: 579, ROOF_TL2: 580, ROOF_TR2: 581,
  ROOF_BL: 582, ROOF_BC: 583, ROOF_BR: 584, ROOF_BL2: 585, ROOF_BR2: 586,
  SHOP_TL: 361, SHOP_TC: 362, SHOP_TR: 363,
  SHOP_ML: 385, SHOP_MC: 386, SHOP_MR: 387,
  SHOP_BL: 409, SHOP_BC: 410, SHOP_BR: 411,
  BIG_TL: 606, BIG_TC: 607, BIG_TR: 608, BIG_TL2: 609, BIG_TR2: 610, BIG_TR3: 611,
  BIG_BL: 630, BIG_BC: 631, BIG_BR: 632, BIG_BL2: 633, BIG_BR2: 634, BIG_BR3: 635,
  BIG_DL: 654, BIG_DC: 655, BIG_DR: 656, BIG_DL2: 657, BIG_DR2: 658, BIG_DR3: 659,
};

// Ground layer (below player) — mostly grass + paths
// prettier-ignore
const MAP_GROUND = (() => {
  const G = T.GRASS, P = T.PATH;
  const m = [];
  for (let y = 0; y < MAP_H; y++) {
    const row = [];
    for (let x = 0; x < MAP_W; x++) row.push(G);
    m.push(row);
  }

  // Main vertical road (col 19-20, rows 2-28)
  for (let y = 2; y < 28; y++) { m[y][19] = P; m[y][20] = P; }
  // Horizontal road top (row 8, cols 4-35)
  for (let x = 4; x < 36; x++) { m[8][x] = P; m[9][x] = P; }
  // Horizontal road bottom (row 18-19, cols 4-35)
  for (let x = 4; x < 36; x++) { m[18][x] = P; m[19][x] = P; }
  // Left vertical branch (cols 9-10, rows 2-27)
  for (let y = 2; y < 27; y++) { m[y][9] = P; m[y][10] = P; }
  // Right vertical branch (cols 29-30, rows 2-27)
  for (let y = 2; y < 27; y++) { m[y][29] = P; m[y][30] = P; }
  // Entrance path (cols 19-20, rows 27-29)
  for (let y = 27; y < MAP_H; y++) { m[y][19] = P; m[y][20] = P; }
  // Small plaza at center (rows 12-15, cols 17-22)
  for (let y = 12; y < 16; y++)
    for (let x = 17; x < 23; x++) m[y][x] = P;

  return m;
})();

// World layer (collision objects: trees, buildings, fences)
// prettier-ignore
const MAP_WORLD = (() => {
  const m = [];
  for (let y = 0; y < MAP_H; y++) {
    const row = [];
    for (let x = 0; x < MAP_W; x++) row.push(0);
    m.push(row);
  }

  // Border trees
  for (let x = 0; x < MAP_W; x++) {
    m[0][x] = T.TREE_TL; m[0][x + 1 < MAP_W ? 0 : x] = T.TREE_TR;
    m[1][x] = T.TREE_BL;
  }
  for (let x = 0; x < MAP_W; x += 2) {
    if (x >= MAP_W) break;
    m[0][x] = T.TREE_TL;
    if (x + 1 < MAP_W) m[0][x + 1] = T.TREE_TR;
    m[1][x] = T.TREE_BL;
    if (x + 1 < MAP_W) m[1][x + 1] = T.TREE_BR;
  }

  // Scattered trees for decoration
  const treePairs = [
    [2,3], [2,36], [3,2], [3,37],
    [6,2], [6,14], [6,25], [6,36],
    [11,2], [11,14], [11,25], [11,36],
    [16,2], [16,14], [16,25], [16,36],
    [21,2], [21,14], [21,25], [21,36],
    [25,3], [25,8], [25,15], [25,24], [25,31], [25,36],
  ];
  treePairs.forEach(([y, x]) => {
    if (y + 1 < MAP_H && x + 1 < MAP_W) {
      m[y][x] = T.TREE_TL; m[y][x+1] = T.TREE_TR;
      m[y+1][x] = T.TREE_BL; m[y+1][x+1] = T.TREE_BR;
    }
  });

  // Engineering Building (top-left, rows 3-6, cols 4-8)
  m[3][4] = T.HOUSE1_TL; m[3][5] = T.HOUSE1_TC; m[3][6] = T.HOUSE1_TR; m[3][7] = T.HOUSE1_TL2; m[3][8] = T.HOUSE1_TR2;
  m[4][4] = T.HOUSE1_BL; m[4][5] = T.HOUSE1_BC; m[4][6] = T.HOUSE1_BR; m[4][7] = T.HOUSE1_BL2; m[4][8] = T.HOUSE1_BR2;
  m[5][4] = T.HOUSE1_DL; m[5][5] = T.HOUSE1_DC; m[5][6] = T.HOUSE1_DR; m[5][7] = T.HOUSE1_DL2; m[5][8] = T.HOUSE1_DR2;

  // Sales Building (top-right, rows 3-6, cols 31-35)
  m[3][31] = T.HOUSE1_TL; m[3][32] = T.HOUSE1_TC; m[3][33] = T.HOUSE1_TR; m[3][34] = T.HOUSE1_TL2; m[3][35] = T.HOUSE1_TR2;
  m[4][31] = T.HOUSE1_BL; m[4][32] = T.HOUSE1_BC; m[4][33] = T.HOUSE1_BR; m[4][34] = T.HOUSE1_BL2; m[4][35] = T.HOUSE1_BR2;
  m[5][31] = T.HOUSE1_DL; m[5][32] = T.HOUSE1_DC; m[5][33] = T.HOUSE1_DR; m[5][34] = T.HOUSE1_DL2; m[5][35] = T.HOUSE1_DR2;

  // Exec Tower (center-top, rows 3-6, cols 16-21)
  m[3][16] = T.BIG_TL; m[3][17] = T.BIG_TC; m[3][18] = T.BIG_TR; m[3][19] = T.BIG_TL2; m[3][20] = T.BIG_TR2; m[3][21] = T.BIG_TR3;
  m[4][16] = T.BIG_BL; m[4][17] = T.BIG_BC; m[4][18] = T.BIG_BR; m[4][19] = T.BIG_BL2; m[4][20] = T.BIG_BR2; m[4][21] = T.BIG_BR3;
  m[5][16] = T.BIG_DL; m[5][17] = T.BIG_DC; m[5][18] = T.BIG_DR; m[5][19] = T.BIG_DL2; m[5][20] = T.BIG_DR2; m[5][21] = T.BIG_DR3;

  // Product Lab (bottom-left, rows 21-24, cols 4-8)
  m[21][4] = T.HOUSE1_TL; m[21][5] = T.HOUSE1_TC; m[21][6] = T.HOUSE1_TR; m[21][7] = T.HOUSE1_TL2; m[21][8] = T.HOUSE1_TR2;
  m[22][4] = T.HOUSE1_BL; m[22][5] = T.HOUSE1_BC; m[22][6] = T.HOUSE1_BR; m[22][7] = T.HOUSE1_BL2; m[22][8] = T.HOUSE1_BR2;
  m[23][4] = T.HOUSE1_DL; m[23][5] = T.HOUSE1_DC; m[23][6] = T.HOUSE1_DR; m[23][7] = T.HOUSE1_DL2; m[23][8] = T.HOUSE1_DR2;

  // Cafeteria (bottom-right, rows 21-24, cols 31-35)
  m[21][31] = T.HOUSE1_TL; m[21][32] = T.HOUSE1_TC; m[21][33] = T.HOUSE1_TR; m[21][34] = T.HOUSE1_TL2; m[21][35] = T.HOUSE1_TR2;
  m[22][31] = T.HOUSE1_BL; m[22][32] = T.HOUSE1_BC; m[22][33] = T.HOUSE1_BR; m[22][34] = T.HOUSE1_BL2; m[22][35] = T.HOUSE1_BR2;
  m[23][31] = T.HOUSE1_DL; m[23][32] = T.HOUSE1_DC; m[23][33] = T.HOUSE1_DR; m[23][34] = T.HOUSE1_DL2; m[23][35] = T.HOUSE1_DR2;

  // Signs near buildings
  m[7][6] = T.SIGN;
  m[7][33] = T.SIGN;
  m[7][18] = T.SIGN;
  m[20][6] = T.SIGN;
  m[20][33] = T.SIGN;

  // Flowers and decorations
  m[13][15] = T.FLOWER1; m[13][24] = T.FLOWER2;
  m[14][15] = T.FLOWER3; m[14][24] = T.FLOWER1;
  m[10][12] = T.FLOWER2; m[10][27] = T.FLOWER3;
  m[17][12] = T.FLOWER1; m[17][27] = T.FLOWER2;

  // Benches near plaza
  m[13][16] = T.BENCH; m[13][23] = T.BENCH;
  m[15][16] = T.BENCH; m[15][23] = T.BENCH;

  return m;
})();

// Above-player layer (tree canopies rendered over the player)
const MAP_ABOVE = (() => {
  const m = [];
  for (let y = 0; y < MAP_H; y++) {
    const row = [];
    for (let x = 0; x < MAP_W; x++) row.push(0);
    m.push(row);
  }
  // Roof tiles above buildings
  m[2][4] = T.ROOF_TL; m[2][5] = T.ROOF_TC; m[2][6] = T.ROOF_TR; m[2][7] = T.ROOF_TL2; m[2][8] = T.ROOF_TR2;
  m[2][31] = T.ROOF_TL; m[2][32] = T.ROOF_TC; m[2][33] = T.ROOF_TR; m[2][34] = T.ROOF_TL2; m[2][35] = T.ROOF_TR2;
  m[20][4] = T.ROOF_TL; m[20][5] = T.ROOF_TC; m[20][6] = T.ROOF_TR; m[20][7] = T.ROOF_TL2; m[20][8] = T.ROOF_TR2;
  m[20][31] = T.ROOF_TL; m[20][32] = T.ROOF_TC; m[20][33] = T.ROOF_TR; m[20][34] = T.ROOF_TL2; m[20][35] = T.ROOF_TR2;
  return m;
})();

// Collision: tiles from MAP_WORLD that block movement
function isSolidTile(x, y) {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return true;
  return MAP_WORLD[y][x] !== 0;
}

const PLAYER_SPAWN = { x: 19, y: 27 };

// Area labels shown on the map
const AREA_LABELS = [
  { x: 4, y: 7, label: 'Engineering' },
  { x: 31, y: 7, label: 'Sales' },
  { x: 16, y: 7, label: 'Exec Tower' },
  { x: 4, y: 20, label: 'Product Lab' },
  { x: 31, y: 20, label: 'Cafe' },
  { x: 17, y: 11, label: 'Central Plaza' },
];

// Avatar picker options with male/female parity.
const PLAYER_AVATARS = [
  { id: 'avatar_amelia', label: 'Amelia', gender: 'female', previewSrc: 'assets/amelia.png' },
  { id: 'avatar_alex', label: 'Alex', gender: 'female', previewSrc: 'assets/alex.png' },
  { id: 'avatar_adam', label: 'Adam', gender: 'male', previewSrc: 'assets/adam.png' },
  { id: 'avatar_bob', label: 'Bob', gender: 'male', previewSrc: 'assets/bob.png' },
];

// Runtime sprite profiles used by drawCharacterSprite().
const SPRITE_STYLES = {
  default: { base: 'adam', hue: 0, sat: 1, bri: 1 },

  // Player avatars
  avatar_amelia: { base: 'amelia', hue: 0, sat: 1.04, bri: 1.02 },
  avatar_alex: { base: 'alex', hue: -6, sat: 0.96, bri: 1.03 },
  avatar_adam: { base: 'adam', hue: 0, sat: 1, bri: 1 },
  avatar_bob: { base: 'bob', hue: 8, sat: 0.98, bri: 0.97 },

  // Unique stakeholder styles
  npc_sales_vp: { base: 'adam', hue: 12, sat: 1.05, bri: 1.02 },
  npc_budget_hawk: { base: 'bob', hue: -20, sat: 1.08, bri: 0.96 },
  npc_competitor: { base: 'alex', hue: 24, sat: 1.1, bri: 1.05 },
  npc_design_purist: { base: 'amelia', hue: 35, sat: 1.12, bri: 1.03 },
  npc_arch_astronaut: { base: 'bob', hue: -40, sat: 1, bri: 0.95 },
  npc_feature_mob: { base: 'alex', hue: 55, sat: 1.06, bri: 0.98 },
  npc_midnight_deadline: { base: 'adam', hue: -60, sat: 0.95, bri: 0.9 },
  npc_the_reorg: { base: 'amelia', hue: 72, sat: 1.08, bri: 1.01 },
  npc_angry_customer: { base: 'bob', hue: -85, sat: 1.15, bri: 1.02 },
  npc_tech_debt: { base: 'adam', hue: 95, sat: 1.1, bri: 0.94 },
  npc_privacy_guardian: { base: 'alex', hue: -105, sat: 0.92, bri: 1.07 },
  npc_imposter_syndrome: { base: 'amelia', hue: 120, sat: 0.9, bri: 0.93 },
};

// Stakeholders — the NPCs you befriend via quiz
const STAKEHOLDERS = [
  {
    id: 'sales_vp', name: 'Sales VP', emoji: '\u{1F4BC}', area: 'sales',
    spriteKey: 'npc_sales_vp',
    flavor: 'Always pushing for that one custom feature...',
    spawnX: 33, spawnY: 8,
    questions: [
      { q: 'A key customer demands a feature that conflicts with your roadmap. What do you do first?', options: ['Build it immediately', 'Understand the underlying need', 'Escalate to your manager', 'Say no and move on'], correct: 1, hint: 'Think about what they really need, not just what they asked for.' },
      { q: 'Sales promised a client a delivery date without checking with engineering. What now?', options: ['Rush the team to meet the date', 'Align on a shared SLA process', 'Blame sales publicly', 'Ignore it and hope for the best'], correct: 1, hint: 'How can you prevent this from happening again?' },
      { q: 'Revenue goals and product vision are in tension. What is the best approach?', options: ['Always follow the money', 'Find the overlap that serves both', 'Ignore revenue entirely', 'Let the CEO decide everything'], correct: 1, hint: 'The best PMs find win-win solutions.' },
    ]
  },
  {
    id: 'budget_hawk', name: 'Budget Hawk', emoji: '\u{1F985}', area: 'exec',
    spriteKey: 'npc_budget_hawk',
    flavor: 'Swoops in to cut your budget when you least expect it.',
    spawnX: 18, spawnY: 8,
    questions: [
      { q: 'Budget gets cut mid-project. What is your first move?', options: ['Cancel the project', 'Re-scope to MVP, protect core value', 'Ask for more budget', 'Do nothing different'], correct: 1, hint: 'What is the smallest thing that still delivers value?' },
      { q: 'How do you justify ROI for UX research to finance?', options: ['Say it is industry best practice', 'Frame it as reduced churn and support costs', 'Skip research to save money', 'Hide it in another budget line'], correct: 1, hint: 'Speak their language: money saved, money earned.' },
      { q: 'Two teams want the same budget. How do you prioritize?', options: ['Give it to whoever asks first', 'Prioritize by strategic alignment and impact', 'Split it equally', 'Flip a coin'], correct: 1, hint: 'What connects most closely to company goals?' },
    ]
  },
  {
    id: 'competitor', name: 'The Competitor', emoji: '\u{1F3C3}', area: 'exec',
    spriteKey: 'npc_competitor',
    flavor: 'Just shipped your feature. Your team is feeling the heat.',
    spawnX: 20, spawnY: 13,
    questions: [
      { q: 'A competitor just launched the feature you were building. What do you do?', options: ['Abandon the feature', 'Differentiate — find what they missed', 'Copy their approach exactly', 'Panic and rush to ship'], correct: 1, hint: 'What unique angle can you bring that they cannot?' },
      { q: 'Your team is demoralized after a competitor launch. How do you respond?', options: ['Ignore their feelings', 'Acknowledge it, then refocus on your unique strengths', 'Promise to beat them next time', 'Blame the team for being slow'], correct: 1, hint: 'Empathy first, then strategy.' },
      { q: 'When should you track competitors closely?', options: ['Never, just focus on users', 'Regularly, but let user needs drive decisions', 'Every day, match feature for feature', 'Only when investors ask'], correct: 1, hint: 'Awareness without obsession.' },
    ]
  },
  {
    id: 'design_purist', name: 'Design Purist', emoji: '\u{1F3A8}', area: 'product',
    spriteKey: 'npc_design_purist',
    flavor: 'Insists on pixel-perfect designs regardless of deadlines.',
    spawnX: 6, spawnY: 18,
    questions: [
      { q: 'Design wants two more weeks for polish, but the deadline is fixed. What do you do?', options: ['Ship without any design input', 'Negotiate: what is essential polish vs. nice-to-have?', 'Extend the deadline silently', 'Tell design their work does not matter'], correct: 1, hint: 'Not all polish is equal — find the high-impact items.' },
      { q: 'A designer and an engineer disagree on implementation. Your role?', options: ['Side with the engineer always', 'Facilitate a conversation about user impact', 'Let them fight it out', 'Make the decision yourself without input'], correct: 1, hint: 'The user is the tiebreaker.' },
      { q: 'How do you build trust with a perfectionist designer?', options: ['Rush every project', 'Show you value craft by protecting time for it when it matters', 'Ignore their concerns', 'Only communicate via Jira tickets'], correct: 1, hint: 'Trust comes from showing you care about quality too.' },
    ]
  },
  {
    id: 'arch_astronaut', name: 'Architecture Astronaut', emoji: '\u{1F680}', area: 'engineering',
    spriteKey: 'npc_arch_astronaut',
    flavor: 'Wants to rewrite everything in a new framework. Again.',
    spawnX: 6, spawnY: 8,
    questions: [
      { q: 'An engineer proposes rewriting a working system in a new framework. What do you ask?', options: ['Sure, sounds fun!', 'What user problem does this solve?', 'No rewrites ever', 'Let them do it on weekends'], correct: 1, hint: 'Always connect technical decisions to user outcomes.' },
      { q: 'How do you balance innovation with stability?', options: ['Never try anything new', 'Allocate a percentage of capacity for experiments', 'Rewrite everything quarterly', 'Only use technologies from 2015'], correct: 1, hint: 'Structured experimentation beats chaos.' },
      { q: 'A senior engineer blocks your feature for "architectural purity." How do you handle it?', options: ['Go around them', 'Understand their concern, then find a pragmatic middle ground', 'Escalate immediately', 'Give up on the feature'], correct: 1, hint: 'Seek to understand before seeking to be understood.' },
    ]
  },
  {
    id: 'feature_mob', name: 'Feature Mob', emoji: '\u{1F4E3}', area: 'product',
    spriteKey: 'npc_feature_mob',
    flavor: 'A crowd of users demanding features on social media.',
    spawnX: 8, spawnY: 22,
    questions: [
      { q: 'Users are loudly requesting a feature on social media. What is your first step?', options: ['Build it right away', 'Assess: how many users, what is the real need?', 'Ignore social media entirely', 'Promise to build it immediately'], correct: 1, hint: 'Loud does not always mean important.' },
      { q: 'How do you say no to a popular feature request?', options: ['Ghost them', 'Explain the reasoning and share what you are building instead', 'Just say no with no explanation', 'Blame engineering'], correct: 1, hint: 'Transparency builds trust, even when the answer is no.' },
      { q: 'What is the risk of always building what users ask for?', options: ['No risk at all', 'You become reactive instead of strategic', 'Users love it every time', 'It makes planning easier'], correct: 1, hint: 'Users describe problems; PMs find solutions.' },
    ]
  },
  {
    id: 'midnight_deadline', name: 'Midnight Deadline', emoji: '\u{1F319}', area: 'engineering',
    spriteKey: 'npc_midnight_deadline',
    flavor: 'The clock is ticking. Ship tonight or face the consequences.',
    spawnX: 8, spawnY: 12,
    questions: [
      { q: 'It is 11 PM and a critical bug appears before launch. What do you do?', options: ['Ship anyway and fix later', 'Assess severity: is it a blocker or cosmetic?', 'Cancel the launch entirely', 'Blame QA'], correct: 1, hint: 'Not all bugs are equal. Triage first.' },
      { q: 'How do you prevent last-minute crunch?', options: ['Crunch is inevitable', 'Build buffer into timelines and scope early', 'Work weekends regularly', 'Hire more people'], correct: 1, hint: 'The best fix for crunch is better planning.' },
      { q: 'Your team shipped a feature with a known minor issue. When should you communicate this?', options: ['Never mention it', 'Proactively flag it to stakeholders with a fix timeline', 'Wait for someone to notice', 'Delete the Slack message'], correct: 1, hint: 'Proactive transparency beats reactive firefighting.' },
    ]
  },
  {
    id: 'the_reorg', name: 'The Reorg', emoji: '\u{1F300}', area: 'exec',
    spriteKey: 'npc_the_reorg',
    flavor: 'Everything you knew is changing. Priorities shift like sand.',
    spawnX: 17, spawnY: 8,
    questions: [
      { q: 'Your team just got reorganized. What is your first priority?', options: ['Complain about the change', 'Clarify new goals and relationships with your new stakeholders', 'Pretend nothing changed', 'Start looking for a new job'], correct: 1, hint: 'Clarity is the antidote to organizational chaos.' },
      { q: 'How do you maintain team morale during a reorg?', options: ['Promise everything will be fine', 'Be honest about uncertainty while focusing on what you can control', 'Ignore the emotional impact', 'Have a pizza party'], correct: 1, hint: 'Acknowledge the uncertainty honestly.' },
      { q: 'After a reorg, your roadmap no longer aligns with new leadership goals. What do you do?', options: ['Keep the old roadmap', 'Renegotiate priorities with new leadership using data', 'Scrap everything and start over', 'Wait for someone to tell you what to do'], correct: 1, hint: 'Proactively align rather than waiting.' },
    ]
  },
  {
    id: 'angry_customer', name: 'Enterprise Client', emoji: '\u{1F624}', area: 'sales',
    spriteKey: 'npc_angry_customer',
    flavor: 'Threatening to churn. The CEO is watching.',
    spawnX: 32, spawnY: 13,
    questions: [
      { q: 'An enterprise client threatens to leave. The CEO asks you to fix it. First step?', options: ['Promise whatever they want', 'Understand the root cause of their frustration', 'Ignore it — one client does not matter', 'Offer a discount immediately'], correct: 1, hint: 'Diagnose before you prescribe.' },
      { q: 'The client wants a feature that benefits only them. How do you evaluate it?', options: ['Build it — they pay a lot', 'Assess if it could benefit your broader user base too', 'Refuse outright', 'Let sales decide'], correct: 1, hint: 'Can one client is need become a platform feature?' },
      { q: 'How do you balance one large client is needs with your overall user base?', options: ['Largest client always wins', 'Weigh impact, strategic value, and precedent it sets', 'Ignore large clients', 'Build everything for everyone'], correct: 1, hint: 'Every decision sets a precedent.' },
    ]
  },
  {
    id: 'tech_debt', name: 'Tech Debt Monster', emoji: '\u{1F41B}', area: 'engineering',
    spriteKey: 'npc_tech_debt',
    flavor: 'Years of shortcuts manifest as a living nightmare.',
    spawnX: 5, spawnY: 13,
    questions: [
      { q: 'Engineering says tech debt is slowing them down by 40%. What do you do?', options: ['Ignore it — features first', 'Negotiate a percentage of sprint capacity for debt reduction', 'Stop all feature work', 'Tell them to work faster'], correct: 1, hint: 'Balance is key — neither all-features nor all-debt.' },
      { q: 'A team member wants to do a full rewrite. How do you respond?', options: ['Approve it immediately', 'Propose incremental refactoring with clear milestones', 'Say no to all rewrites', 'Let them do it in secret'], correct: 1, hint: 'Big bang rewrites rarely succeed.' },
      { q: 'How do you communicate tech debt impact to non-technical stakeholders?', options: ['Use jargon they wont understand', 'Quantify user impact: slower load times, more bugs, delayed features', 'Just say "trust me"', 'Do not bother explaining'], correct: 1, hint: 'Translate technical concepts into business outcomes.' },
    ]
  },
  {
    id: 'privacy_guardian', name: 'Privacy Guardian', emoji: '\u{1F6E1}\uFE0F', area: 'product',
    spriteKey: 'npc_privacy_guardian',
    flavor: 'Stands between you and easy tracking data.',
    spawnX: 7, spawnY: 24,
    questions: [
      { q: 'Marketing wants to add invasive tracking. The Privacy Guardian pushes back. Who is right?', options: ['Marketing — data is everything', 'Find a privacy-respecting way to get the insights you need', 'Privacy does not matter', 'Block all tracking forever'], correct: 1, hint: 'Privacy and insights are not mutually exclusive.' },
      { q: 'GDPR compliance will delay your launch by two weeks. What do you do?', options: ['Launch without compliance', 'Build compliance into the timeline from the start', 'Ignore the regulation', 'Launch only in non-EU markets forever'], correct: 1, hint: 'Compliance is not optional — plan for it.' },
      { q: 'How do you build user trust around data privacy?', options: ['Hide the privacy policy', 'Be transparent about what data you collect and why', 'Collect everything silently', 'Only care about privacy when there is a breach'], correct: 1, hint: 'Trust is built proactively, not reactively.' },
    ]
  },
  {
    id: 'imposter_syndrome', name: 'Inner Critic', emoji: '\u{1F464}', area: 'plaza',
    spriteKey: 'npc_imposter_syndrome',
    flavor: 'A shadow of doubt that whispers you don\'t belong here.',
    spawnX: 19, spawnY: 18,
    questions: [
      { q: 'You are in a meeting and feel like everyone knows more than you. What helps?', options: ['Stay silent and hope nobody notices', 'Remember that asking questions shows strength, not weakness', 'Fake confidence aggressively', 'Leave the meeting'], correct: 1, hint: 'Curiosity is a superpower, not a weakness.' },
      { q: 'How do experienced PMs deal with imposter syndrome?', options: ['They do not have it', 'They acknowledge it and focus on learning and impact', 'They pretend to know everything', 'They avoid challenging situations'], correct: 1, hint: 'Even the best PMs feel doubt sometimes.' },
      { q: 'What is the healthiest response to making a mistake at work?', options: ['Hide it', 'Own it, learn from it, and share what you learned', 'Blame someone else', 'Quit your job'], correct: 1, hint: 'Growth comes from owning mistakes, not hiding them.' },
    ]
  },
];

// XP system
const XP_PER_LEVEL = [0, 30, 70, 120, 180, 250, 330, 420, 520, 650];
const MAX_LEVEL = 10;
const XP_PER_CORRECT = 15;
const XP_PERFECT_BONUS = 20;
