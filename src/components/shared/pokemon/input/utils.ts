import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {PokemonInfo} from '@/types/game/pokemon';


export const isPokemonIncludedFromFilter = (filter: PokemonInputFilter, pokemon: PokemonInfo) => {
  if (isFilterMismatchOnSingle({filter, filterKey: 'pokemonType', id: pokemon.type})) {
    return false;
  }

  if (isFilterMismatchOnSingle({filter, filterKey: 'specialty', id: pokemon.specialty})) {
    return false;
  }

  if (isFilterMismatchOnSingle({filter, filterKey: 'sleepType', id: pokemon.sleepType})) {
    return false;
  }

  if (isFilterMismatchOnSingle({filter, filterKey: 'ingredientFixed', id: pokemon.ingredients.fixed})) {
    return false;
  }

  if (!isFilterIncludingSome({
    filter,
    filterKey: 'ingredientRandom',
    ids: pokemon.ingredients.random ?? [],
  })) {
    return false;
  }

  if (isFilterMismatchOnSingle({filter, filterKey: 'berry', id: pokemon.berry.id})) {
    return false;
  }

  return !isFilterMismatchOnSingle({filter, filterKey: 'mainSkill', id: pokemon.skill});
};

export const generatePokemonInputFilter = (): PokemonInputFilter => ({
  pokemonType: {},
  sleepType: {},
  specialty: {},
  ingredientFixed: {},
  ingredientRandom: {},
  berry: {},
  mainSkill: {},
});
