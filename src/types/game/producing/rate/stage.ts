export const pokemonProductionStage = [
  'original',
  'final',
] as const;

export type PokemonProductionStage = typeof pokemonProductionStage[number];
