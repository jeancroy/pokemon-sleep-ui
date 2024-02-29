import {pokemonSorterGetterBySortType, pokemonSortTypeInAsc} from '@/components/shared/pokemon/sorter/calc/const';
import {
  PokemonInfoWithSortingPayload,
  PokemonSorterGetterOpts,
  PokemonSortType,
  SortedPokemonInfo,
} from '@/components/shared/pokemon/sorter/type';
import {BerryDataMap} from '@/types/game/berry';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';


export type GetPokemonSorterOpts = Omit<PokemonSorterGetterOpts, 'berryData' | 'skillData'> & {
  type: PokemonSortType,
  berryDataMap: BerryDataMap,
  mainSkillMap: MainSkillMap,
};

export const getPokemonSorter = ({
  type,
  pokemon,
  berryDataMap,
  mainSkillMap,
  ...opts
}: GetPokemonSorterOpts): number => {
  return pokemonSorterGetterBySortType[type]({
    pokemon,
    berryData: berryDataMap[pokemon.berry.id],
    skillData: mainSkillMap[pokemon.skill],
    ...opts,
  });
};

export const sortPokemon = <TExtra, TSource extends PokemonInfoWithSortingPayload<TExtra>>(
  type: PokemonSortType,
) => (
  a: SortedPokemonInfo<TExtra, TSource>, b: SortedPokemonInfo<TExtra, TSource>,
) => {
  let comparer = a.sorter - b.sorter;

  if (comparer !== 0 && !pokemonSortTypeInAsc.some((basis) => type === basis)) {
    comparer *= -1;
  }

  if (comparer !== 0) {
    return comparer;
  }

  return a.source.pokemon.id - b.source.pokemon.id;
};
