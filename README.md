# Cardwars · The Age of Realms

A static, English-language city-card collection prototype set around **600 CE**.

## Included

- **123 city cards** from the connected European mainland, with photographs, historical and modern place names, c. 600 CE political realm labels, five rarity tiers and seven stats.
- Unlimited **free packs of five cards**. Each draw is independent: Common 50%, Uncommon 28%, Rare 15%, Epic 6%, Legendary 1%.
- Duplicate rewards: **10 / 25 / 60 / 150 / 400 coins**. Duplicates within one pack count immediately; extra copies remain in the collection.
- All cards visible from the start: undiscovered cards are grey, collected cards are coloured. Search and filter by country, rarity or ownership.
- A geographical atlas with pan, zoom, touch gestures, city inspection and approximate political boundaries for c. 1300 CE. The city-card political labels remain the 600 CE edition until the next data pass.
- Browser-local progress, JSON export/import and a confirmed reset.
- A Game tab reserved for the next development phase.

The campaign, deck building, rebel starts, combat, buildings, taxation, estates and multiplayer are **not implemented in this version**. Navy is a display stat only. Coins are virtual, cannot be purchased and have no monetary value.

## Run locally

Use Node 18+ for tests and Python 3 for the static server:

```sh
npm test
npm start
```

Open `http://localhost:4173`. No npm dependencies or build step are required. Serve over HTTP; ES modules do not work by opening `index.html` as a local file.

## GitHub Pages

Publish the repository's `main` branch, root folder. `.nojekyll` keeps the static files unchanged. All photographs, flags, maps and fonts are bundled locally; no live external API is required by the game.

Progress uses `localStorage` key `cardwars.collection.v2`. Saves belong to the current browser and origin; export from the guide to transfer them. Reset affects Cardwars only.

## Data and maintenance

- `scripts/city-seeds.json`: authored historical city catalogue, coordinates, c. 600 CE political context, modern geographic references and rarity.
- `scripts/build-catalogue.py`: regenerates `src/data.js`; numerical stats are deterministic game values.
- `scripts/prepare-collection-assets.py`: retrieves attributed present-day photographs and modern flags (Pillow required).
- `scripts/prepare-assets.py`: regenerates the c. 1300 historical atlas from `assets/world-1300.geojson`.
- `src/engine.js`: pack draws, rewards, formatting and save validation.
- `src/map.js`: geographic SVG map, interactions and label placement.
- `tests/engine.test.js`: catalogue, probability boundaries, rewards, saves, reset and asset checks.

Cards display historical political identities for the c. 600 CE setting. Present-day city and country names remain geographic reference metadata only; modern flags are not shown on cards. The Eastern Roman Empire still existed. Historical borders are approximate; city populations, armies, areas and scores are invented for balancing. Photographs show present-day cities or surviving sites, including later buildings. See [SOURCES.md](SOURCES.md) and the in-game credits for attribution and limitations.
