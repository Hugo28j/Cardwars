# Diplomacy, first playable increment

The campaign's right-click country panel now uses a separate diplomacy engine in `src/diplomacy1300.js`. The implementation is inspired by the supplied EU4 design; its numbers are Cardwars rules, not an EU4 simulation.

## Implemented

- Unordered treaty pairs with separate opinions (-200 to +200), trust (0–100), favors, aggressive expansion, rivals, permissions, subsidies, cooldowns and memories for each direction.
- Existing player relations, alliances and war flags migrate lazily. Network state persists inside the existing campaign save. Legacy trade, independence and financial-aid actions read the new opinion.
- Two diplomats: ongoing improve-relations or curry-favors missions, with recall. Monthly opinion modifiers decay; alliance favors and trust grow.
- Gifts transfer actual treasury funds, have a cooldown and a capped memory bonus. Ten favors buy five trust.
- Alliance acceptance shows individual signed factors: opinion, trust, relative power, reputation, common rivals and diplomatic commitments. Four commitments are a soft limit. Decisions are deterministic, not percentage rolls.
- Alliances can be ended with trust loss, diplomatic memory and a one-year truce. Up to three rivals; insults have a cooldown.
- Directional access and guarantees are recorded and visible. These are diplomatic permissions/pledges only until movement and call-to-arms exist.
- Subsidies transfer one Florin monthly, stop when unaffordable, and can be cancelled. Trade agreements improve barter acceptance by ten points. Either side's embargo blocks barter and ends the trade agreement.
- No-CB declaration has a consequence review, ends access/trade/subsidies/missions, gives known observers 15 AE, reduces reputation and damages defender trust. Active alliances and truces block declarations.
- White peace is available after 180 days, ends diplomatic war state and creates a five-year truce. There are no simulated battles or territorial peace demands in this increment.
- Nearby AI countries send envoys; bilateral alliance decisions run quarterly with each side's acceptance and military strength. World alliances are visible in the panel. AI does not autonomously declare wars.
- Opinion memories, attitudes and monthly AE decay are visible. AE is observer-specific in storage; the current no-CB penalty is uniform rather than geographic.

## Remaining from the full design

Combat/occupation/warscore, war enthusiasm, ally calls and guarantees triggering military intervention, promised territory and betrayal, claims/cores/CBs, conquest-based geographic AE, coalitions, threats and enforce-peace, vassals/liberty desire/independence wars, royal marriages/dynasties/unions, espionage/rebels, foreign-debt assistance, third-party alliance breaking, territorial peace terms, reparations and trade-power transfers. Access will need integration with future army movement. More strategic AI needs territorial interests, distances and common-threat scoring.

## Validation

`node --test tests/diplomacy.test.js`: ten focused tests cover migration, directed relationships, money conservation, cooldowns, diplomat limits, monthly idempotence, save round trips, favors/trust, war/truce/peace, embargo/access and AI alliances.

`npm test` also runs the pre-existing engine tests; that older suite currently cannot import `MODERN_COUNTRIES` from `src/data.js` (the current catalogue no longer exports it). This unrelated pre-existing failure has not been hidden or rewritten.

A browser smoke test was attempted but this environment does not have the Playwright Chromium executable. JavaScript syntax and whitespace checks pass; visual browser validation remains outstanding.
