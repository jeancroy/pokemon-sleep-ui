import {useFilterInput} from '@/components/input/filter/hook';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {generatePokemonInputFilter} from '@/components/shared/pokemon/filter/utils/generate';
import {PokemonComplexFilter} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';


type UsePokemonComplexPickerFilterOpts = {
  data: PokemonInfo[],
};

export const usePokemonComplexPickerFilter = ({data}: UsePokemonComplexPickerFilterOpts) => {
  const {ingredientMap, ingredientChainMap} = useCommonServerData();

  return useFilterInput<PokemonComplexFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: generatePokemonInputFilter({isLevelAgnostic: true}),
    isDataIncluded: (filter, pokemon) => isPokemonIncludedFromFilter({
      filter,
      pokemon,
      ingredientMap,
      ingredientChainMap,
    }),
  });
};
