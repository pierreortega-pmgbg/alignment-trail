# Deployment Playbook (Builder Trail Game)

Use this exact flow so the game URL does not randomly break.

## Canonical URL

- Production alias: `https://builder-trail-game-two.vercel.app`

Always share the alias above, not temporary deployment URLs.

## One-command safe deploy

Run from `C:\Users\Pierre Ortega\Documents\Dev\builder-trail-game`:

```bash
npm run deploy:checked
```

What this does:

1. Deploys production with Vercel (`--yes`)
2. Runs smoke checks against:
   - `/`
   - `/index.html`
   - `/game.js`
   - `/events.js`
   - `/scenes.js`
   - `/style.css`

If any check fails, treat deployment as failed and fix before sharing.

## Manual smoke check

```bash
npm run smoke:prod
```

PowerShell custom URL:

```powershell
$env:SITE_URL = "https://builder-trail-game-two.vercel.app"
npm run smoke:prod
```
