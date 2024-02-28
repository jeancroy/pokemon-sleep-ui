import {PokedexMap, PokemonFinalEvolutionInfo, PokemonId} from '@/types/game/pokemon';


export type GetPokemonFinalEvolutionIdsOpts = {
  pokemonId: PokemonId,
  pokedexMap: PokedexMap,
  evolutionCount?: number,
};

export const getPokemonFinalEvolutionIds = ({
  pokemonId,
  pokedexMap,
  evolutionCount = 0,
}: GetPokemonFinalEvolutionIdsOpts): PokemonFinalEvolutionInfo[] => {
  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return [];
  }

  const {evolution} = pokemon;
  if (!evolution.next.length) {
    return [{id: pokemonId, evolutionCount}];
  }

  return evolution.next.flatMap(({id}) => getPokemonFinalEvolutionIds({
    pokemonId: id,
    pokedexMap,
    evolutionCount: evolutionCount + 1,
  }));
};
