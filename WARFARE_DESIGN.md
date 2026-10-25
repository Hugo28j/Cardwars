# Cardwars warfare and recruitment plan

## Recruitment and population

- Every soldier represents one living person in the province population.
- Levy Swordsmen are the only unprofessional unit. They are weak, cost **ƒ0.001 per unit per week**, and are drawn directly from the worker pool as they are raised.
- Professional units cost **ƒ0.010–ƒ0.030 per unit per week**. Recruitment first uses adults outside the worker pool; only the remaining requirement reduces available workers.
- A professional order is one regiment-sized training queue. The whole group joins together after 30–90 days; it does not arrive one soldier at a time.
- Trainees already receive their full wage and consume food and arms. Cancelling removes the queue and immediately releases its surviving trainees back to civilian availability.
- Barracks and commander bonuses may shorten training, but never below 15 days. Technology unlocks Crossbowmen, Men-at-Arms and Knights.
- One combat death removes exactly one soldier and one person from the province population. Disbanding is different: living soldiers return to civilian availability.

## Economy and supply

- Active troops add continuous Food demand.
- Professional troops add Arms maintenance demand; levies add a smaller amount.
- Training adds especially high Arms demand because new equipment must be issued.
- Food and Arms fulfillment create a supply score. Shortages first reduce morale and combat performance; persistent severe shortages create attrition.
- This closes the economic loop: a larger army raises prices, removes workers, increases wages and may lower civilian living standards.

## Battles

- Armies march between provinces and automatically create a battle when they meet an enemy.
- The battle tablet shows composition, commanders, morale, supply, casualties and recent battle days.
- Tactics are Hold Formation, Aggressive Assault, Shield Wall, Skirmish and Flanking Manoeuvre. Orders have a three-day cooldown.
- Ranged troops contribute more in the opening phase. A collapsed frontline exposes them later.
- Morale decides when an army breaks; unit HP and battle damage decide casualties.
- Retreat becomes available after two battle days and may cause extra casualties.

## Rebellion casus belli

- Every unrecognised player province grants **Fight for Independence** against its original country.
- All rebel provinces from the same original country are combined into one war and one war goal.
- The original country has the mirrored **War Against Rebellion** casus belli to reclaim those provinces.
- Fight for Independence gains ticking war score while every listed rebel province remains under rebel control.
- War Against Rebellion gains ticking war score after it retakes the listed provinces.
- Both casus belli disappear when independence is recognised or the original country ceases to exist.
- A no-casus-belli war remains possible, but causes +15 aggressive expansion, −1 diplomatic reputation and a larger trust loss.

## Next expansion points

1. Add occupation state per province and feed it into ticking war score.
2. Add battle and casualty contributions to war score.
3. Add peace terms: Recognise Independence, Return Rebel Provinces, White Peace, War Reparations and Cede Province.
4. Let AI parent countries evaluate and declare War Against Rebellion.
5. Add army splitting and merging while preserving one active commander per army.

## Main campaign tactical front (25 October 2026)

The single-player campaign now advances a persistent terrain front on the real province map. The military ledger remains authoritative for every existing unit type, recruitment, upkeep and casualties. Front formations are positions and allocations of those soldiers, not additional armies. Castle reserves are configurable before mobilisation; watchpost garrisons defend at their placed map position. Mobile groups move over connected terrain each game day with a map-distance budget of 2 units; fine tiles have eight times less area than the original grid and cannot cross neutral countries. Attack and defence orders use the existing ten-day order lifetime; without orders, groups reinforce invaded home territory and advance along hostile borders.

Terrain control does not grant ownership of a castle. Encirclement supplies the established weekly siege resolver, including fortifications, food depletion, unrest and occupation/war score. Besiegers hold their position and recruitment pauses while a siege is active. Relief or peace lifts unsupported sieges. Unit HP, attack, range, tactics, commander bonuses and supply feed front combat. Front state persists inside `game.military.front`; old saves initialise it automatically. Existing marches and battles finish through their original resolvers before those troops join the front.

The tactical renderer uses existing province geometry, zoom and fog visibility. Capture effects are bounded, skip hidden/newly revealed provinces and respect reduced motion. Click or drag a player formation to command its source army. The independent test pages and multiplayer server retain their existing simulations.

Validation: `tests/campaign-front1300.test.js` exercises unit conservation, casualty accounting, castle reserves, daily movement, neutral borders, save/reload, peace cleanup and siege relief/holding; `tests/campaign-front-map.test.js` builds the front on the complete historical map.
