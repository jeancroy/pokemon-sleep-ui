import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/match';
import {
  PokemonInputFilterCheckExclusion,
  PokemonInputFilterCheckingOpts,
  PokemonInputType,
} from '@/components/shared/pokemon/filter/type';
import {getPossibleIngredientsFromChain} from '@/utils/game/producing/ingredient/level';


export const pokemonInputExclusionChecker: {[inputType in PokemonInputType]: PokemonInputFilterCheckExclusion} = {
  level: ({filter, pokemonLevel}) => {
    if (!pokemonLevel) {
      return false;
    }

    return !!filter.level && pokemonLevel < filter.level;
  },
  pokemonType: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'pokemonType',
    id: pokemon.type,
  }),
  specialty: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'specialty',
    id: pokemon.specialty,
  }),
  sleepType: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'sleepType',
    id: pokemon.sleepType,
  }),
  berry: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'berry',
    id: pokemon.berry.id,
  }),
  ingredient: ({filter, pokemon, ingredientChainMap}) => !isFilterIncludingSome({
    filter,
    filterKey: 'ingredient',
    ids: getPossibleIngredientsFromChain({
      level: filter.level,
      chain: ingredientChainMap[pokemon.ingredientChain],
    }),
  }),
  mainSkill: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'mainSkill',
    id: pokemon.skill,
  }),
  evolutionStage: ({filter, pokemon}) => {
    if (!!filter.evolutionStage.final) {
      return !!pokemon.evolution.next.length;
    }

    return isFilterMismatchOnSingle({
      filter,
      filterKey: 'evolutionStage',
      id: pokemon.evolution.stage,
    });
  },
};

export const isPokemonIncludedFromFilter = (opts: PokemonInputFilterCheckingOpts) => {
  return !Object.values(pokemonInputExclusionChecker).some((checker) => checker(opts));
};
