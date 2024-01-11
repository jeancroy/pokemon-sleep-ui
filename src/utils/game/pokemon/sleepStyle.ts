import {PokemonInfo, PokemonInfoWithMap} from '@/types/game/pokemon';
import {SleepStyleNormalMap} from '@/types/game/sleepStyle';
import {toUnique} from '@/utils/array';


type GetPokedexWithMapOpts = {
  pokemonList: PokemonInfo[],
  sleepStyleMap: SleepStyleNormalMap,
};

export const getPokedexWithField = ({pokemonList, sleepStyleMap}: GetPokedexWithMapOpts): PokemonInfoWithMap[] => {
  return pokemonList.map((pokemon) => ({
    info: pokemon,
    mapsAvailable: toUnique(sleepStyleMap[pokemon.id]?.map(({mapId}) => mapId) ?? []),
  }));
};
