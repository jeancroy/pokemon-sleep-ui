import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter, isFilterMatchingSearch} from '@/components/input/filter/utils/check';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {enforceFilterWithSkillValue} from '@/components/shared/pokemon/sorter/enforcer/skillValue';
import {defaultPokemonSort} from '@/const/filter';
import {PokemonId} from '@/types/game/pokemon';
import {PokedexData, PokedexDisplay, PokedexFilter, PokemonInfoForPokedex} from '@/ui/pokedex/index/type';
import {generateInitialFilter} from '@/ui/pokedex/index/utils';


type UsePokedexFilterOpts = UsePokemonFilterCommonData & {
  data: PokedexData,
  preloadedDisplay: Partial<PokedexDisplay> | undefined,
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
    onSetFilter: (original, updated) => enforceFilterWithSkillValue<
      PokedexFilter,
      PokedexFilter['sort'] | PokedexFilter['display']
    >({
      original,
      updated,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {[data[0].skill]: true}},
        sort: [
          {key: 'sort', defaultValue: defaultPokemonSort},
          {key: 'display', defaultValue: defaultPokemonSort},
        ],
      },
    }),
  });
};
