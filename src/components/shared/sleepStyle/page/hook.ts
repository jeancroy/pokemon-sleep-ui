import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterConditionActive} from '@/components/input/filter/utils/match';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {generatePokemonInputFilter} from '@/components/shared/pokemon/filter/utils/generate';
import {MapCommonProps, MapInputInclusionKey, MapPageFilter} from '@/components/shared/sleepStyle/page/type';
import {SleepStyleNormalFlattened} from '@/types/game/sleepStyle';


export const useMapFilter = ({sleepStyles, pokedexMap, ...filterData}: MapCommonProps) => {
  return useFilterInput<MapPageFilter, SleepStyleNormalFlattened, MapInputInclusionKey>({
    data: sleepStyles,
    dataToId: ({pokemonId, style}) => `${pokemonId}-${style.style}`,
    initialFilter: {
      ...generatePokemonInputFilter({isLevelAgnostic: true}),
      showEmptyRank: false,
      showSleepdexStats: true,
      showLockedOnly: true,
      markingSleepdex: false,
      sleepStyle: {},
      displayType: 'sleepStyle',
    },
    isDataIncluded: (filter, data) => {
      const pokemon = pokedexMap[data.pokemonId];

      if (!pokemon) {
        return false;
      }

      if (isFilterConditionActive({filter, filterKey: 'sleepStyle'}) && !filter.sleepStyle[data.style.style]) {
        return false;
      }

      return isPokemonIncludedFromFilter({filter, pokemon, ...filterData});
    },
    deps: [pokedexMap],
  });
};
