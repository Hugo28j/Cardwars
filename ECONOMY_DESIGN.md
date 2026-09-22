# Cardwars c.1300 Economy Architecture

The active campaign economy follows this feedback loop:

**Population → labour → buildings → production → goods → prices → profit → wages/taxes → consumption → demand → production**

## Implemented market core

- 16 medieval goods with base prices.
- A separate local market for every owned city.
- Supply, demand, current price and smoothed target price for every good.
- A weekly economic tick: one tick every seven in-game days.
- Two-phase order resolution: all building and Pop orders are collected before prices change.
- All 25 current buildings have real input/output recipes.
- Building throughput depends on employment, input availability and infrastructure / market access.
- Building finances are now output revenue minus input expenses and wages.
- Sector tax is taken only from positive profit.
- Food substitutes: Grain, Fish and Meat compete to fulfil the basic-food need.
- Grouped Pops: Peasants, Laborers, Craftsmen, Burghers, Clergy and Nobles.
- Pop wealth and Standard of Living react to real wages, employment and local cost of living.
- Province UI shows local supply, demand, prices and detailed sector inputs/outputs.
- Country Economy UI aggregates goods markets across the player's provinces.

## Price formula

```
imbalance = (demand - supply) / max(supply, demand, 1)
priceModifier = clamp(imbalance * 0.75, -0.75, 0.75)
targetPrice = basePrice * (1 + priceModifier)
currentPrice += (targetPrice - currentPrice) * 0.15
```

Prices therefore move gradually instead of jumping every tick.

## Building examples

- Manorial Fields: Tools → Grain
- Sheep Pastures: Tools → Meat + Wool
- Textile Workshop: Wool + Tools → Cloth
- Weapons Forge: Iron + Wood → Tools + Arms
- Brewery: Grain + Wood → Ale
- Tannery: Meat/hides proxy + Salt → Leather
- Dockyard: Wood + Cloth + Tools → Ships
- Monastery: Grain → Manuscripts + Services

The old `monthlyRevenue` fields in building data are legacy balancing metadata only. They are no longer used to calculate campaign operating profit.

## Timing

- Daily: labour competition / hiring moves gradually.
- Weekly: goods orders, production, prices, sector finances, Pop wealth and SOL.
- Monthly: treasury settlement, state expenses, anti-corruption/stability and campaign ranking snapshot.

## Next layers

1. Qualifications and profession switching.
2. Building cash reserves and autonomous wage bidding.
3. Construction queues consuming materials over time.
4. Private / government / worker ownership and dividends.
5. Investment pool and private investment AI.
6. Trade between local markets and a world market.
7. Tariffs, transport costs and Trade Centers.
8. Deeper wealth-based Pop needs.
9. Food security, births, deaths and migration.
10. Government demand, subsidies and public ownership.
11. Technology-driven production methods.

New systems should remain connected to the existing market loop instead of adding isolated fixed bonuses.
