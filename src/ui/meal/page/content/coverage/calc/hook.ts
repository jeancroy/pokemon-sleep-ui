import React from 'react';

import {usePokemonProducingStats} from '@/components/shared/pokemon/icon/itemStats/worker/hook';
import {
  PokemonItemStatsCommonOpts,
} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {useWorker} from '@/hooks/worker/main';
import {Meal} from '@/types/game/meal/main';
import {PokemonIngredientProduction} from '@/types/game/pokemon';
import {ToSortedMealContentCoverageItemDataOpts} from '@/ui/meal/page/content/coverage/calc/type';
import {MealContentCoverageItemData} from '@/ui/meal/page/content/coverage/type';


type UseMealContentCoverageItemDataOpts = PokemonItemStatsCommonOpts & {
  meal: Meal,
  pokemonIngredientProduction: PokemonIngredientProduction[],
};

export const useMealContentCoverageItemData = ({
  meal,
  pokemonIngredientProduction,
  ...opts
}: UseMealContentCoverageItemDataOpts): MealContentCoverageItemData[] => {
  const [result, setResult] = React.useState<MealContentCoverageItemData[]>([]);

  const itemStats = usePokemonProducingStats({
    pokemonIngredientProduction,
    ...opts,
  });
  const {work} = useWorker<ToSortedMealContentCoverageItemDataOpts, MealContentCoverageItemData[]>({
    workerName: 'Meal Content Coverage Item Data',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: setResult,
    onError: console.error,
  });

  React.useEffect(() => work({meal, itemStats}), [itemStats]);

  return result;
};
