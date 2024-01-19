import {useFilterInput} from '@/components/input/filter/hook';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {generatePokemonInputFilter} from '@/components/shared/pokemon/filter/utils/generate';
import {PokemonComplexFilter} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';


type UsePokemonComplexPickerFilterOpts = UsePokemonFilterCommonData & {
  data: PokemonInfo[],
};

export const usePokemonComplexPickerFilter = ({data, ...filterData}: UsePokemonComplexPickerFilterOpts) => {
  return useFilterInput<PokemonComplexFilter, PokemonInfo, PokemonId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: generatePokemonInputFilter({isLevelAgnostic: true}),
    isDataIncluded: (filter, pokemon) => isPokemonIncludedFromFilter({filter, pokemon, ...filterData}),
  });
};
