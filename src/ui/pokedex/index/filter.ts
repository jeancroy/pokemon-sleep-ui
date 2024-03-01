import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter, isFilterMatchingSearch} from '@/components/input/filter/utils/match';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {PokemonId} from '@/types/game/pokemon';
import {PokedexData, PokedexFilterSave, PokedexFilter, PokemonInfoForPokedex} from '@/ui/pokedex/index/type';
import {generateInitialFilter} from '@/ui/pokedex/index/utils';
import {Nullable} from '@/utils/type';


type UsePokedexFilterOpts = UsePokemonFilterCommonData & {
  data: PokedexData,
  preloadedDisplay: Nullable<Partial<PokedexFilterSave>>,
};

export const usePokedexFilter = ({data, preloadedDisplay, ...filterData}: UsePokedexFilterOpts) => {
  return useFilterInput<PokedexFilter, PokemonInfoForPokedex, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: generateInitialFilter(preloadedDisplay),
    isDataIncluded: (filter, pokemon) => {
      if (!isDataIncludingAllOfFilter({
        filter,
        filterKey: 'mapId',
        ids: pokemon.sleepStyles.map(({mapId}) => mapId),
        idInFilterToIdForCheck: Number,
        onIdsEmpty: false,
      })) {
        return false;
      }

      if (!isFilterMatchingSearch({filter, filterKey: 'name', search: pokemon.nameOfAllLocale})) {
        return false;
      }

      return isPokemonIncludedFromFilter({filter, pokemon, ...filterData});
    },
  });
};
