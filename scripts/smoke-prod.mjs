const BASE_URL = process.env.SITE_URL || 'https://builder-trail-game-two.vercel.app';

const checks = [
  { path: '/', expectedStatus: 200 },
  { path: '/index.html', expectedStatus: 200 },
  { path: '/game.js', expectedStatus: 200 },
  { path: '/events.js', expectedStatus: 200 },
  { path: '/scenes.js', expectedStatus: 200 },
  { path: '/style.css', expectedStatus: 200 },
];

function toUrl(path) {
  return new URL(path, BASE_URL).toString();
}

async function run() {
  let failed = 0;
  console.log(`Running production smoke checks against ${BASE_URL}`);

  for (const check of checks) {
    const res = await fetch(toUrl(check.path), { redirect: 'manual' });
    if (res.status === check.expectedStatus) {
      console.log(`PASS ${check.path} -> ${res.status}`);
    } else {
      failed += 1;
      console.error(`FAIL ${check.path} -> expected ${check.expectedStatus}, got ${res.status}`);
    }
  }

  if (failed > 0) {
    console.error(`\nSmoke checks failed: ${failed}`);
    process.exit(1);
  }

  console.log('\nAll production smoke checks passed.');
}

run().catch((error) => {
  console.error('Smoke check crashed:', error);
  process.exit(1);
});
