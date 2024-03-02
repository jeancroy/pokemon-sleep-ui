import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter} from '@/components/input/filter/utils/match';
import {
  isPokemonIncludedFromFilter,
} from '@/components/shared/pokemon/filter/utils/filter';
import {generatePokemonInputFilterExtended} from '@/components/shared/pokemon/filter/utils/generate';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {PokemonId, PokemonInfo, PokemonInfoWithMap} from '@/types/game/pokemon';
import {AnalysisComparisonFilter} from '@/ui/analysis/page/type';
import {generateDefaultIngredientProductionAtLevels} from '@/utils/game/producing/ingredient/chain';


type UseAnalysisFilterOpts = {
  data: PokemonInfoWithMap[],
  currentPokemon: PokemonInfo,
};

export const useAnalysisFilter = ({data, currentPokemon}: UseAnalysisFilterOpts) => {
  const {ingredientMap, ingredientChainMap} = useCommonServerData();

  return useFilterInput<AnalysisComparisonFilter, PokemonInfoWithMap, PokemonId>({
    data,
    dataToId: ({info}) => info.id,
    initialFilter: {
      ...generatePokemonInputFilterExtended(),
      ingredients: generateDefaultIngredientProductionAtLevels(ingredientChainMap[currentPokemon.ingredientChain]),
    },
    isDataIncluded: (filter, data) => {
      if (!isDataIncludingAllOfFilter({
        filter,
        filterKey: 'mapId',
        ids: data.mapsAvailable,
        idInFilterToIdForCheck: Number,
        onIdsEmpty: false,
      })) {
        return false;
      }

      // `filterData` has name conflict of `pokemon`, so it has to be the first in the spread
      return isPokemonIncludedFromFilter({filter, pokemon: data.info, ingredientMap, ingredientChainMap});
    },
  });
};
