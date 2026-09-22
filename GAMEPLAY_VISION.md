# Cardwars Campaign Design Vision

This document defines the intended campaign loop for the c.1300 game mode. It is the reference for future contributors when implementing diplomacy, warfare, independence and nation formation.

## Core campaign pitch

The campaign does **not** begin as a normal country.

On **1 January 1300**, the human player receives four random cities from the 16-card deck. Those cities are removed from their historical parent countries and together begin a cross-border **rebellion**. A player can therefore begin with cities that historically belonged to several different countries.

Example name: **The Hugo's Rebellion**.

The campaign progression is:

**Rebellion → Free Cities → Formed Nation → Great Power**

The final objective is to become a **Great Power**, defined as reaching the **Overall Top 5** in the live campaign Rankings after forming a nation. Reaching the Top 5 wins the campaign.

## Phase 1 — Rebellion

Every player-owned starting city initially has an unresolved independence claim against the country it was taken from.

The original country loses that city immediately for campaign ownership, population, army, navy, economy and Rankings calculations. A sufficiently small country can disappear entirely if it loses all playable provinces.

Future diplomacy / war behaviour:

- Small or weak parent countries may decide that suppressing the rebellion is not worth the cost and can recognise a city's independence.
- Larger and stronger countries are more likely to try to stop the rebellion and recover their province.
- The player may ask third-party countries to **defend the rebellion's independence**.
- A supporting country could later join an independence war or provide diplomatic guarantees.
- The player may negotiate by **returning or selling one of the rebel cities back to its former owner**.
- Recognition can therefore happen by diplomacy, concessions or eventually war.

### Important transition rule

The rebellion becomes **Free Cities only when every player-owned rebel city has gained independence**.

If three cities are recognised but a fourth city is still claimed by its parent country, the whole player realm remains in the Rebellion phase.

War, recognition negotiations, alliances and city-sale diplomacy are intentionally **not implemented yet**. The current code stores the campaign stage, each city's original parent country and each city's independence state so these systems can be added without redesigning saves.

## Phase 2 — Free Cities

Once all player cities are independent, the realm becomes a league / collection of **Free Cities**.

At this stage the player can continue expanding and can use the Decisions tab to form a historical country.

## Phase 3 — Forming a nation

The Decisions tab lists potential formable countries using these rules:

1. A country only appears if the player already owns **at least one city** belonging to that historical country.
2. The decision shows all required cities.
3. It separately shows cities already owned and **cities still missing**.
4. A country can only be formed after the player has reached the **Free Cities** phase.
5. The player must own **every playable city/province required by that country**.
6. Forming it changes the player realm from Free Cities into that actual nation.

Example: if the player owns one French city, the Kingdom of France is a visible formable option and the Decisions tab lists every remaining French city required.

The initial implementation uses the c.1300 card country's playable-city set as the formation requirement. More specialised historical formables can later be added as authored data.

## Power-ranking status penalties

Political status affects **Overall power only**. It does not reduce the underlying Food, Economy, Technology, Stability, Population, Army or Navy values shown in their category rankings.

- **Rebellion:** ×0.50 Overall strength (**−50%**).
- **Free Cities / player free-city league:** ×0.75 Overall strength (**−25%**).
- **Historical Free Imperial Cities:** ×0.75 Overall strength (**−25%**) in rankings.
- **Formed / normal countries:** ×1.00 Overall strength.

This penalty exists because rebellions and free cities have less recognised state power, administration and diplomatic weight than established countries with the same raw provincial statistics. The ranking UI should show both raw power and the applied status modifier.

## Phase 4 — Great Power victory

After forming a nation, the campaign's strategic objective is the live **Overall Rankings**.

- Campaign Rankings use current ownership, not the original 1300 ownership.
- Player-owned cities are removed from their former countries.
- Countries with no remaining playable cities disappear from the ranking.
- Rankings update on 1 January and then once per in-game month.
- A formed player nation that reaches **Overall rank #1–#5** becomes a **Great Power** and wins the campaign.

The Top 5 requirement is the campaign victory condition, not merely a visual achievement.

## Multiplayer direction

The same progression should work with multiple real players. Each human-controlled set of opening cities begins as a rebellion against the relevant historical parent countries. Future multiplayer work must keep ownership, independence and diplomatic obligations player-specific.

## Buildings and administration scaling

The c.1300 province economy now uses **33 building / sector types** rather than a universal build list.

- The expanded economy, production chains, construction and trade rules are documented in **[ECONOMY.md](ECONOMY.md)**.
- Buildings have city-specific availability rules based on coastal access, rivers/crossings, population, food base, trade importance, religious importance, technology and the historical/economic text attached to each city.
- Existing historical sectors are seeded automatically when a city strongly matches the building's role.
- Important c.1300 sectors include mills, breweries, tanneries, fisheries, saltworks, quarries, timber yards, warehouses, merchant quarters, customs houses, mints, bridges/tolls, monasteries, cathedrals and hospitals in addition to the original ten sectors.
- Administration / anti-corruption spending is intentionally cheap for tiny rebellions and Free Cities, then rises non-linearly as the number of controlled provinces grows. Population adds a smaller secondary cost.
- Current recommended administration formula: approximately `0.5 + 0.35 × cities^1.75 + population / 150,000`, capped at ƒ100/month.

## Military visibility and upkeep

Military information follows campaign fog of war.

- A player can see soldier and ship markers for owned cities and directly neighbouring visible cities only.
- Army markers sit on the city/province and display the current soldier count.
- Navy markers are placed just offshore at the nearest real coastline and display the current ship count.
- Owned-city markers include building bonuses such as Barracks and Dockyard effects.
- Professional army upkeep is **ƒ0.005 per soldier per month**.
- Navy upkeep is **ƒ0.02 per ship per month**.
- These values are monthly state expenses.

## Current implementation status

Implemented foundations:

- Four starting cities are removed from their historical countries.
- Campaign ownership-aware Rankings.
- Countries can disappear when they have no remaining playable cities.
- Rebellion / Free Cities / Nation / Great Power campaign-state fields.
- Per-city original parent-country and independence-state storage.
- Decisions tab derives potential formable countries from current player ownership.
- Decisions tab lists owned and missing required cities.
- Nation formation validation is implemented for the future point at which Free Cities can be reached.
- Great Power Top-5 victory checking is wired to ranking snapshots.

Not implemented yet:

- AI decisions to recognise or resist independence.
- Independence wars and combat.
- Requests for foreign guarantees / military support.
- Negotiated city return or sale to a former owner.
- Peace deals and war-score.
- Multiplayer diplomacy.
- Authored alternative / ahistorical formable nations beyond the current country-based requirements.

When adding those systems, preserve the campaign progression and transition rules above unless the game design is deliberately changed.
