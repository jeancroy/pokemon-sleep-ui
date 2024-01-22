import {Session} from 'next-auth';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {isDataIncludingAllOfFilter} from '@/components/input/filter/utils/match';
import {usePokemonSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
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
  const {
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    mealMap,
    preloaded,
  } = opts;

  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded.bundle,
      client: session?.user.preloaded,
    },
    mealMap,
  });

  const allInfoWithSortingPayload = toPokemonInfoWithSortingPayloadFromPokemonList({
    filter,
    translatedSettings,
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
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    snorlaxFavorite: filter.snorlaxFavorite,
    triggerDeps: [filter, translatedSettings],
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
