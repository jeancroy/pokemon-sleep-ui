import {PokemonInfo} from '@/types/game/pokemon';


type GetEvolutionCountFromPokemonInfoOpts = {
  pokemon: PokemonInfo,
};

export const getEvolutionCountFromPokemonInfo = ({pokemon}: GetEvolutionCountFromPokemonInfoOpts) => {
  const {evolution} = pokemon;

  return evolution.stage - 1;
};

export const getPokemonMaxEvolutionCount = (pokemonList: PokemonInfo[]) => (
  Math.max(...pokemonList.map(({evolution}) => evolution.stage))
);
