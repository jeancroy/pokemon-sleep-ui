import {PokedexMap, PokemonFinalEvolutionInfo, PokemonId} from '@/types/game/pokemon';


export type GetPokemonFinalEvolutionIdsOpts = {
  pokemonId: PokemonId,
  pokedex: PokedexMap,
  evolutionCount?: number,
};

export const getPokemonFinalEvolutionIds = ({
  pokemonId,
  pokedex,
  evolutionCount = 0,
}: GetPokemonFinalEvolutionIdsOpts): PokemonFinalEvolutionInfo[] => {
  const pokemon = pokedex[pokemonId];
  if (!pokemon) {
    return [];
  }

  const {evolution} = pokemon;
  if (!evolution.next.length) {
    return [{id: pokemonId, evolutionCount}];
  }

  return evolution.next.flatMap(({id}) => getPokemonFinalEvolutionIds({
    pokemonId: id,
    pokedex,
    evolutionCount: evolutionCount + 1,
  }));
};
