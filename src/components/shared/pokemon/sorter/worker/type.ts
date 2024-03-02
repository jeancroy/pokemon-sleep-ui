import {GetPokemonSorterOpts} from '@/components/shared/pokemon/sorter/calc/main';
import {PokemonInfoWithSortingPayload, PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export type SortingNonDataOpts<
  TExtra,
  TData extends PokemonInfoWithSortingPayload<TExtra>
> = {
  data: TData[],
  sort: PokemonSortType,
  snorlaxFavorite: SnorlaxFavorite,
};

export type SortingWorkerOpts<
  TExtra,
  TData extends PokemonInfoWithSortingPayload<TExtra>
> = SortingNonDataOpts<TExtra, TData> & Pick<
  GetPokemonSorterOpts,
  'berryDataMap' | 'ingredientMap' | 'mainSkillMap' | 'recipeLevelData'
>;
