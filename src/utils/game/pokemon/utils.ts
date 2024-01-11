import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {isNotNullish} from '@/utils/type';


export const toPokemonList = (pokedexMap: PokedexMap): PokemonInfo[] => (
  Object.values(pokedexMap).filter(isNotNullish)
);
