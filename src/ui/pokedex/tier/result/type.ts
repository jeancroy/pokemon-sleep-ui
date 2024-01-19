export const pokedexTier = [
  'S',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
] as const;

export type PokedexTier = typeof pokedexTier[number];
