export const pokemonGender = [
  'male',
  'female',
  'unknown',
] as const;

export type PokemonGender = typeof pokemonGender[number];
