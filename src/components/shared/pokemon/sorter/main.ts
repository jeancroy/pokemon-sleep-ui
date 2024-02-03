import {getPokemonSorter, GetPokemonSorterOpts, sortPokemon} from '@/components/shared/pokemon/sorter/calc/main';
import {
  PokemonInfoWithSortingPayload,
  PokemonSortType,
  SortedPokemonInfo,
} from '@/components/shared/pokemon/sorter/type';


export type GetSortedPokemonOpts<TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>> = Pick<
  GetPokemonSorterOpts,
  'berryDataMap' | 'ingredientMap' | 'mainSkillMap' | 'recipeLevelData' | 'snorlaxFavorite'
> & {
  data: TData[],
  sort: PokemonSortType,
};

export const getSortedPokemon = <TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>>({
  data,
  sort,
  ...opts
}: GetSortedPokemonOpts<TExtra, TData>): SortedPokemonInfo<TExtra, TData>[] => {
  return data
    .map<SortedPokemonInfo<TExtra, TData>>((data) => ({
      sorter: getPokemonSorter({type: sort, ...data, ...opts}),
      source: data,
    }))
    .sort(sortPokemon(sort));
};
