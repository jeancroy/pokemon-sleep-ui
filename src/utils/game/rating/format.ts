import {PokemonKeyLevel} from '@/types/game/pokemon/level';


export const formatPokemonKeyLevel = (level: PokemonKeyLevel) => {
  return level.toString().toUpperCase();
};
