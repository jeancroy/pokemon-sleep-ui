export const pokemonProducingRateStage = [
  'original',
  'final',
] as const;

export type PokemonProducingRateStage = typeof pokemonProducingRateStage[number];
