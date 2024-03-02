import {PokemonKeyLevel} from '@/types/game/pokemon/level';


type ToNumericPokemonKeyLevelOpts = {
  level: PokemonKeyLevel | number,
  pokemonMaxLevel: number,
};

export const toNumericPokemonKeyLevel = ({level, pokemonMaxLevel}: ToNumericPokemonKeyLevelOpts): number => {
  if (level === 'max') {
    return pokemonMaxLevel;
  }

  return level;
};
