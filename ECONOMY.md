# Medieval economy

Open **Game → Economy & trade**, or the country shield's **Economy** tab. The five departments are Overview, Market, Construction, Production and Society. Province building cards also expose production chains, wages, methods, subsidies and pause controls.

## Simulation and units

The campaign simulates owned provinces and one common national market. Foreign merchants are an abstract external market, not fully simulated foreign countries. Quantities are scaled gameplay units and florins are a gameplay currency scale. This is an original medieval strategy model, not a reproduction of Victoria 3's equations.

Each game day consumes a fraction `1 / daysInCalendarMonth` of monthly production and demand. New games begin with a modest merchant inventory; migration initializes that inventory once, preserving cash, buildings, wages and taxes. Refreshing on the same day does not produce goods, accrue taxes or advance building work again. Opening cities retain their original political affiliation data.

Daily ordering:

1. Rural hinterlands contribute subsistence grain, food and small quantities of materials.
2. Buildings hire from a single finite labour pool per city. Wages, priority and last-day profitability affect hiring; unprofitable subsidised firms maintain hiring targets. Workers outside urban industries remain in subsistence activity.
3. Households, workshops, military and construction place orders. Private merchants import within transport capacity.
4. Producers clear in four tiers: extraction, basic processing, advanced crafts, and urban services. Input shortages are shared proportionally among firms in the same tier.
5. The first two construction projects consume available materials and advance proportionally.
6. Households and the military consume remaining goods with equal per-good rationing across cities.
7. Merchants export surplus above reserve targets. Prices respond gradually to demand, production, imports and stored reserves. Goods deteriorate over time; food and local services deteriorate faster.
8. Sales, materials, wages, profits and tax estimates update. Population prosperity, investment funds and daily treasury obligations accrue.

Production values in recipes are base monthly quantities per fully staffed level. Actual output also depends on technology, market access, selected methods and, for grain, the season. Inventory is measured in goods, not money. Sales income is allocated proportionally to producers from market consumption and exports, capped at their output value. It is an aggregate accounting model: household wallets and per-firm balance sheets are not tracked.

## Goods and buildings

The 20 goods are grain, flour, food, timber, stone, iron ore, charcoal, wool, hides, salt, tools, cloth, leather, ale, wine, glass, arms, ships, services and manuscripts. Services and manuscripts are local only. Food includes fish, meat and bread at this level of abstraction.

All 25 existing buildings have production recipes. Eight new types complete important chains: Iron Mine, Charcoal Burners, Toolsmiths, Bakers Guild, Vineyards & Wine Press, Glassmakers, Roads & Caravan Inns, and Masons & Builders Guild. Every type has five maximum levels. City-specific availability rules continue to apply; historic levels are modeled from the city's existing research text and stats.

Examples:

- Grain → watermill → flour → bakers + timber → food.
- Timber → charcoal; iron + charcoal → tools or arms.
- Wool → textiles → cloth; hides + salt → leather.
- Timber + cloth + iron → ships.

Traditional methods need no extra tools. Improved tools (60 local technology) give 30% more output, 15% more recipe inputs and 10% fewer workers, with additional tools consumption. Guild specialisation (78 technology) gives 65% more output, 35% more inputs and 20% fewer workers, with a larger tools requirement. Unlocks use the existing card's technology score; this does not implement a research tree.

## Construction and transport

Queue projects in a province. Price is paid when ordered; up to 25% is reimbursed from the private investment pool if available. Upgrades complete only after their workdays and material requirements are met. Two projects build at once, with a maximum queue length of 30. Masons and construction focus accelerate progress but increase daily material competition. Cancellation returns 75% of the uncompleted net treasury cost; already used materials are not returned.

Roads, bridges, warehouses, markets and dockyards support market access; industrial density increases congestion. Roads, warehouses, merchant quarters and dockyards increase international transport capacity. Routes are prioritized import/export policies to the abstract market, not treaties with individual countries. Auto trade maintains reserves; export mode lowers the reserve target; no trade blocks external movement for that good.

## Treasury and living standards

State income comes from company profit taxes, a household wage levy, rural land dues and trade tolls. Corruption reduces tax collection. Company revenue is **not** paid directly into the treasury. Private investment receives 8% of positive after-tax company profit, accrued daily.

State expenses include the existing ƒ0.005 per soldier and ƒ0.02 per ship upkeep, administration, selected company loss subsidies and debt interest. Forecasts are shown as monthly rates. Settlement uses the sum of daily accruals, so changing taxes on the last day cannot retroactively change the entire month's income. Deficits borrow up to `ƒ100 + population / 500`; interest is 1.2% per month. Excess deficits become unpaid bills and increase unrest rather than disappearing at zero cash. Manual repayments clear unpaid bills before debt.

Households demand essentials and, as living standards rise, luxuries. Living standards respond to actual goods availability, prices, employment, worker-weighted wages and taxes; local stability and rebellion risk include these outcomes. Population numbers do not grow or migrate in this version. The existing social-group percentages are descriptive; the active economic model tracks households per province, not separate class wallets.

## Saves and testing

The existing version-7 profile envelope is retained. The new schema is versioned under `activeGame.economy.market.version = 1`; export/import includes queues, routes, inventories, methods, investment, debt, accruals, speed and the last 24 monthly results. Earlier completed buildings are preserved. Old partial-month economy forecasts are replaced; the migrated current month accrues from the migration day onward.

`npm test` runs the current economy and profile tests, covering supply chains, migration, reload determinism, labour limits, closures, subsidies, trade capacity, material-limited construction, simultaneous slots, level caps, refunds, fiscal accruals, credit and a two-year simulation. The older `tests/engine.test.js` references removed modern-card exports and predates the current campaign; it remains available as `npm run test:legacy` for historical reference.
