import React from 'react';

import isEqual from 'lodash/isEqual';
import {useCustomCompareEffect} from 'use-custom-compare';

import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {SortingNonDataOpts, SortingWorkerOpts} from '@/components/shared/pokemon/sorter/worker/type';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useWorker} from '@/hooks/worker/main';


type UsePokemonSortingWorkerOpts<
  TExtra,
  TData extends PokemonInfoWithSortingPayload<TExtra>
> = SortingNonDataOpts<TExtra, TData> & {
  triggerDeps: React.DependencyList,
  setLoading: (loading: boolean) => void,
};

export const usePokemonSortingWorker = <TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>>({
  data,
  sort,
  snorlaxFavorite,
  triggerDeps,
  setLoading,
}: UsePokemonSortingWorkerOpts<TExtra, TData>) => {
  const {
    ingredientMap,
    berryDataMap,
    mainSkillMap,
    recipeLevelData,
  } = useCommonServerData();

  const [sorted, setSorted] = React.useState<SortedPokemonInfo<TExtra, TData>[]>([]);
  const {work} = useWorker<SortingWorkerOpts<TExtra, TData>, SortedPokemonInfo<TExtra, TData>[]>({
    workerName: 'Pokemon Sorter',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      setLoading(false);
      setSorted(result);
    },
    onError: () => setLoading(false),
  });

  const triggerSort = () => {
    // Explicit to avoid passing unintentional props
    work({
      data,
      sort,
      snorlaxFavorite,
      ingredientMap,
      berryDataMap,
      mainSkillMap,
      recipeLevelData,
    });
    setLoading(true);
  };

  useCustomCompareEffect(
    triggerSort,
    triggerDeps,
    (prev, next) => isEqual(prev, next),
  );

  return sorted;
};
