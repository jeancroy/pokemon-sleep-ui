export const pokemonDetailedProductionTabs = [
  'dailyBreakdown',
  'energyCurve',
  'atEnergy',
  'cooking',
] as const;

export type PokemonDetailedProductionTabs = typeof pokemonDetailedProductionTabs[number];
