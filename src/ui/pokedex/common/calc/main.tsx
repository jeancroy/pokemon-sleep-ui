import {Session} from 'next-auth';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {isDataIncludingAllOfFilter} from '@/components/input/filter/utils/match';
import {usePokemonSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {PokemonId} from '@/types/game/pokemon';
import {PokedexCalcDataProps, PokedexCalcResult} from '@/ui/pokedex/common/calc/type';
import {toPokemonInfoWithSortingPayloadFromPokemonList} from '@/ui/pokedex/common/calc/utils';
import {PokedexFilterCommon} from '@/ui/pokedex/common/type';
import {isNotNullish} from '@/utils/type';


type UsePokedexCalcOpts<TFilter extends PokedexFilterCommon> = PokedexCalcDataProps & {
  session: Session | null,
  filter: TFilter,
  isPokemonIncluded: FilterInclusionMap<PokemonId>,
  setLoading: (loading: boolean) => void,
};

export const usePokedexCalc = ({
  session,
  filter,
  isPokemonIncluded,
  setLoading,
  ...opts
}: UsePokedexCalcOpts<PokedexFilterCommon>): PokedexCalcResult => {
  const {serverConfigBundle} = opts;

  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: serverConfigBundle,
      client: session?.user.preloaded,
    },
    override: {snorlaxFavorite: filter.snorlaxFavorite},
    ...opts,
  });

  const allInfoWithSortingPayload = toPokemonInfoWithSortingPayloadFromPokemonList({
    filter,
    calculatedConfigBundle,
    ...opts,
  });

  const result = usePokemonSortingWorker({
    // Filtering unwanted data here to get the correct result count
    data: allInfoWithSortingPayload.map((single) => {
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
    }).filter(isNotNullish),
    sort: filter.sort,
    snorlaxFavorite: filter.snorlaxFavorite,
    triggerDeps: [filter, calculatedConfigBundle],
    setLoading,
  });

  return {
    calculatedConfigBundle,
    result,
    count: {
      total: allInfoWithSortingPayload.length,
      selected: result.length,
    },
  };
};
