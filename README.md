# Cardwars · The Age of Realms

Cardwars is a browser-based historical city-card and grand-strategy prototype focused on **Europe c.1300 CE**.

The current game combines a researched city-card collection, packs and deck building with a live campaign map, province ownership, fog of war, buildings, labour, wages, taxation, monthly state finances and campaign rankings.

## Campaign direction

The intended campaign loop is:

**Rebellion → Free Cities → Formed Nation → Great Power**

A new campaign draws four cities from the player's 16-card deck. Those cities immediately leave their historical parent countries and begin a joint rebellion. The player must eventually secure independence for every city, become Free Cities, form a country by controlling all of its required provinces, and then enter the **Overall Top 5** of the live campaign Rankings to win.

The full design rules, including future independence diplomacy, foreign support, returning cities to former owners, nation formation and the Great Power victory condition, are documented in **[GAMEPLAY_VISION.md](GAMEPLAY_VISION.md)**.

War and full diplomacy are not implemented yet; the save format and UI now contain the campaign-state foundations needed for those systems.

## Current systems

- c.1300 researched European city cards with rarity and historical stats.
- Region-based welcome packs, collection and a 16-card deck.
- Four random deck cities become the player's opening campaign provinces.
- Custom player realm colour and drawable flag.
- Campaign map with city territories, ownership, fog of war and adjacency.
- Province panel with buildings, workers, wages and local economy.
- Country panel with Politics, Economy, People, Decisions, Technology, Rebellions and Rankings.
- Monthly economy with sector taxes, army/navy upkeep and administration / anti-corruption spending.
- Ownership-aware campaign Rankings that remove conquered/rebel cities from their former countries.
- Overall power status modifiers: Rebellions ×0.50, Free Cities / Free Imperial Cities ×0.75, established nations ×1.00.
- Browser-local account/save state.

## Run locally

Use Node 18+ for tests and Python 3 for the static server:

```sh
npm test
npm start
```

Open `http://localhost:4173`. No npm dependencies or build step are required. Serve over HTTP; ES modules do not work by opening `index.html` directly.

## GitHub Pages

Publish the repository's `main` branch from the root folder. `.nojekyll` keeps the static files unchanged.

## Main files

- `GAMEPLAY_VISION.md` — authoritative campaign progression and future gameplay direction.
- `ECONOMY_DESIGN.md` — goods, local markets, production, Pops and economic roadmap.
- `src/data1300.js` — c.1300 researched city/card data.
- `src/app.js` — collection, packs, deck, campaign state, economy and UI.
- `src/map.js` — map geometry, city territories, hitboxes, fog of war and adjacency.
- `src/buildings1300.js` — building / sector data and costs.
- `assets/atlas.json` — playable authored historical political atlas.
- `src/engine.js` — profile, pack and save helpers.

Historical borders and population figures are approximate and gameplay values are balanced estimates. See `SOURCES.md` and the in-game research notes for source and data limitations.
