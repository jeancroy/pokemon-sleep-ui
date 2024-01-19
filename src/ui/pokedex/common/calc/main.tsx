import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {isDataIncludingAllOfFilter} from '@/components/input/filter/utils/check';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {usePokemonSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {PokemonId} from '@/types/game/pokemon';
import {PokedexCalcDataProps, PokedexCalcResult} from '@/ui/pokedex/common/calc/type';
import {toCalculateAllIngredientPossibilities} from '@/ui/pokedex/common/calc/utils';
import {PokedexFilterCommon} from '@/ui/pokedex/common/type';
import {getPossibleIngredientsFromChain} from '@/utils/game/ingredientChain';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProducingParams, getProducingRateIndividualParams} from '@/utils/game/producing/params';
import {isNotNullish} from '@/utils/type';


type UsePokedexCalcOpts<TFilter extends PokedexFilterCommon> = PokedexCalcDataProps & {
  filter: TFilter,
  isPokemonIncluded: FilterInclusionMap<PokemonId>,
  setLoading: (loading: boolean) => void,
};

export const usePokedexCalc = ({
  session,
  pokemonList,
  pokemonProducingParamsMap,
  ingredientChainMap,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
  mealMap,
  preloaded,
  filter,
  isPokemonIncluded,
  setLoading,
}: UsePokedexCalcOpts<PokedexFilterCommon>): PokedexCalcResult => {
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded.bundle,
      client: session?.user.preloaded,
    },
    mealMap,
  });

  const sortingDeps = [filter, translatedSettings];

  const allInfoWithSortingPayload = React.useMemo(() => pokemonList.flatMap((
    pokemon,
  ): PokemonInfoWithSortingPayload<null>[] => {
    const commonOpts: Omit<PokemonInfoWithSortingPayload<null>, 'ingredients'> = {
      pokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokemon.id,
        pokemonProducingParamsMap,
      }),
      dateAdded: null,
      extra: null,
      ...translatedSettings,
      ...getProducingRateIndividualParams({
        input: filter,
        pokemon,
        subSkillMap,
      }),
    };
    const chain = ingredientChainMap[pokemon.ingredientChain];

    if (!toCalculateAllIngredientPossibilities(filter)) {
      return [{
        ...commonOpts,
        // Count of 0 to avoid accidental inclusion in the calculation
        ingredients: getPossibleIngredientsFromChain({chain, count: 0}),
      }];
    }

    return [...generatePossibleIngredientProductions({
      level: filter.level,
      chain,
    })]
      .map((ingredients) => ({...commonOpts, ingredients}));
  }), sortingDeps);

  const result = usePokemonSortingWorker({
    // Filtering unwanted data here as `<PokedexResultCount/>` checks the following for result count:
    // - Result: length of `sortedData`
    // - Total: length of `allInfoWithSortingPayload`
    data: allInfoWithSortingPayload
      .map((single) => {
        const {ingredients, pokemon} = single;

        if (!isPokemonIncluded[pokemon.id]) {
          return null;
        }

        if (!isDataIncludingAllOfFilter({
          filter,
          filterKey: 'ingredient',
          ids: ingredients.map(({id}) => id),
          idInFilterToIdForCheck: Number,
          onIdsEmpty: false,
        })) {
          return null;
        }

        return single;
      })
      .filter(isNotNullish),
    sort: filter.sort,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    snorlaxFavorite: filter.snorlaxFavorite,
    triggerDeps: sortingDeps,
    setLoading,
  });

  return {
    translatedSettings,
    result,
    count: {
      total: allInfoWithSortingPayload.length,
      selected: result.length,
    },
  };
};
