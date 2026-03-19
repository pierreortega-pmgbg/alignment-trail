# START HERE — Cozy PM Campus

## What this is

A top-down RPG where you walk around a tech campus and befriend 12 stakeholder NPCs
by demonstrating PM wisdom. Built in vanilla JS with canvas rendering. No framework,
no build step.

Inspired by The Builder Trail by Peter Yang. Evolved from a terminal survival game
(v1, see branch v1 or tag v1.0-alignment-trail) into this RPG format.

## How to run locally

Requires a local HTTP server (fetch() is used to load sprite atlas):

    npx serve .
    # or
    python -m http.server 3000

Then open http://localhost:3000

Do NOT open index.html directly in the browser — assets won't load.

## How to play

- WASD or Arrow keys — move
- Space or Enter — interact with nearby NPC
- C — open Stakeholder Journal (your collection)
- Esc — pause menu

Walk near a stakeholder to trigger an encounter prompt. Press Space to start the quiz.
Answer 2/3 questions correctly to befriend them. Befriend all 12 to win.

## File structure

    index.html          — entry point
    game.js             — phase router and screen rendering
    rpg-content.js      — map data, stakeholder definitions, XP table
    rpg-state.js        — game state, tween, camera, XP/leveling
    map.js              — tile renderer, input, NPC proximity
    sprites.js          — asset loader (Tuxemon tileset + Misa atlas)
    dialogue.js         — encounter popup
    quiz.js             — quiz flow and Stakeholder Journal
    style.css           — cozy visual theme
    assets/             — tilesets, character sprites, atlas data

## Deploy to Vercel

    npx vercel

Or connect the repo in vercel.com and set this branch (v2-cozy-campus) as production.

## Game balance

- 12 stakeholders, 3 questions each (36 total PM scenarios)
- Need 2/3 correct to befriend an NPC
- Wrong answer shows a hint, NPC remains available to retry
- XP + leveling system (10 levels)
- 15 XP per correct answer, +20 bonus for perfect score
