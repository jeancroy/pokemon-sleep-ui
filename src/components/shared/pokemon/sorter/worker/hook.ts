import React from 'react';

import isEqual from 'lodash/isEqual';
import {useCustomCompareEffect} from 'use-custom-compare';

import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {SortingWorkerOpts} from '@/components/shared/pokemon/sorter/worker/type';
import {useWorker} from '@/hooks/worker/main';


type UsePokemonSortingWorkerOpts<
  TExtra,
  TData extends PokemonInfoWithSortingPayload<TExtra>
> = SortingWorkerOpts<TExtra, TData> & {
  triggerDeps: React.DependencyList,
  setLoading: (loading: boolean) => void,
};

export const usePokemonSortingWorker = <TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>>({
  triggerDeps,
  setLoading,
  data,
  sort,
  snorlaxFavorite,
  ingredientMap,
  berryDataMap,
  mainSkillMap,
  recipeLevelData,
}: UsePokemonSortingWorkerOpts<TExtra, TData>) => {
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
