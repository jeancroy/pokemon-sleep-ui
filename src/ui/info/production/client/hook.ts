import React from 'react';

import {useFilterInput} from '@/components/input/filter/hook';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {generatePokemonInputFilter} from '@/components/shared/pokemon/filter/utils/generate';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {
  ProducingParamsDisplayResult,
  ProducingParamsFilter,
  ProducingParamsMaximum,
} from '@/ui/info/production/client/type';
import {getProducingParamsMaximum} from '@/ui/info/production/client/utils';
import {isNotNullish} from '@/utils/type';


type UseProducingParamsOpts = UsePokemonFilterCommonData & {
  pokemonList: PokemonInfo[],
  producingParamsMap: PokemonProducingParamsMap,
};

export const useProducingParams = ({
  pokemonList,
  producingParamsMap,
  ...filterData
}: UseProducingParamsOpts) => {
  const {
    filter,
    setFilter,
    isIncluded,
  } = useFilterInput<ProducingParamsFilter, PokemonInfo, PokemonId>({
    data: pokemonList,
    dataToId: ({id}) => id,
    initialFilter: {
      ...generatePokemonInputFilter({isLevelAgnostic: true}),
      sort: 'id',
    },
    isDataIncluded: (filter, pokemon) => isPokemonIncludedFromFilter({
      filter,
      pokemon,
      ...filterData,
    }),
  });

  const pokemonResult: ProducingParamsDisplayResult[] = React.useMemo(() => {
    const {sort} = filter;

    return pokemonList
      .map((pokemonInfo) => {
        const params = producingParamsMap[pokemonInfo.id];
        if (!params) {
          return null;
        }

        return {
          pokemonInfo,
          params,
          show: isIncluded[pokemonInfo.id] ?? false,
        };
      })
      .filter(isNotNullish)
      .sort((a, b) => {
        if (sort === 'id') {
          return a.pokemonInfo.id - b.pokemonInfo.id;
        }

        if (sort === 'ingredientRate') {
          return b.params.ingredientSplit - a.params.ingredientSplit;
        }

        if (sort === 'skillRate') {
          return (b.params.skillPercent ?? b.params.skillValue) - (a.params.skillPercent ?? a.params.skillValue);
        }

        throw new Error(`Unhandled Pokemon producing params sorting basis ${sort satisfies never}`);
      });
  }, [filter, pokemonList, producingParamsMap]);

  const maximum: ProducingParamsMaximum = React.useMemo(
    () => getProducingParamsMaximum(pokemonResult),
    [pokemonResult],
  );

  return {
    filter,
    setFilter,
    pokemonResult,
    maximum,
  };
};
