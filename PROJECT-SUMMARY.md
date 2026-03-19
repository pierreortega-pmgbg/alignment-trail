# Project Summary — Cozy PM Campus

## What it is

A canvas-based top-down RPG built in vanilla JS. The player explores a tech campus
and befriends 12 stakeholder archetypes by answering PM scenario questions.

Version 2 of this project. V1 (The Alignment Trail) was a terminal-based text survival
game. This version reframes the same PM themes as a cozy, low-pressure RPG rather than
a survival game — the emotional register is completely different.

## The 12 stakeholders

Sales VP, Budget Hawk, The Competitor, Design Purist, Architecture Astronaut, Feature
Mob, Midnight Deadline, The Reorg, Enterprise Client, Tech Debt Monster, Privacy
Guardian, Inner Critic.

Each has 3 scenario questions with 4 options, a correct answer, and a hint shown on
wrong answers.

## Technical architecture

Pure vanilla JS, no framework, no build step. Canvas-based rendering.

| File | Responsibility |
|---|---|
| game.js | Phase router, screen rendering (intro through ending) |
| rpg-content.js | Map tile data (40×30, 3 layers), stakeholder definitions, XP table |
| rpg-state.js | Game state, smooth tween movement, camera lerp, XP/leveling |
| map.js | 5-layer tile renderer, WASD input, NPC proximity, camera |
| sprites.js | Asset loader — Tuxemon tileset + Misa character sprite atlas |
| dialogue.js | Encounter popup system |
| quiz.js | Quiz flow, scoring, Stakeholder Journal (collection screen) |

## Map structure

40×30 tile map with 5 render layers (ground, objects, NPCs, player, above-player).
Buildings: Engineering, Sales, Exec Tower, Product Lab, Cafeteria, Central Plaza.
Tileset: Tuxemon (open source). Character sprites: Misa (open source).

## Known limitations

- No save/load (session only)
- events.js is a leftover from v1 — not used by the RPG, safe to delete later
- Requires HTTP server locally (fetch for atlas.json)

## Version history

See CHANGELOG.md
