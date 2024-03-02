export const pokemonDetailedProductionTabs = [
  'dailyBreakdown',
  'energyCurve',
  'atEnergy',
] as const;

export type PokemonDetailedProductionTabs = typeof pokemonDetailedProductionTabs[number];
