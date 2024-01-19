import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterMatchingSearch} from '@/components/input/filter/utils/check';
import {PokeboxImporterFilter, PokeInBoxForFilter} from '@/components/shared/pokebox/importer/type';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {generatePokemonInputFilter} from '@/components/shared/pokemon/filter/utils/generate';


type UsePokeboxImporterFilterOpts = UsePokemonFilterCommonData & {
  data: PokeInBoxForFilter[],
};

export const usePokeboxImporterFilter = ({
  data,
  ...filterData
}: UsePokeboxImporterFilterOpts) => {
  return useFilterInput<PokeboxImporterFilter, PokeInBoxForFilter, string>({
    data,
    dataToId: ({uuid}) => uuid,
    initialFilter: {
      ...generatePokemonInputFilter({
        isLevelAgnostic: false,
        defaultPokemonLevel: 1,
      }),
      name: '',
    },
    isDataIncluded: (
      filter,
      {search, pokemon, level},
    ) => {
      if (!isFilterMatchingSearch({filter, filterKey: 'name', search})) {
        return false;
      }

      return isPokemonIncludedFromFilter({
        filter,
        pokemon,
        pokemonLevel: level,
        ...filterData,
      });
    },
  });
};
