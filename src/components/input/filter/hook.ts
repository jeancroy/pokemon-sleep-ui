import React from 'react';

import {FilterInclusionMap, FilterInputControls} from '@/components/input/filter/type';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {Indexable} from '@/utils/type';


type UseFilterInputOpts<TFilter, TData, TId extends Indexable> = {
  data: TData[] | ((filter: TFilter) => TData[]),
  dataToId: (data: TData) => TId,
  initialFilter: TFilter,
  isDataIncluded: (filter: TFilter, data: TData) => boolean,
  dataDeps?: React.DependencyList,
  deps?: React.DependencyList,
  onSetFilter?: (original: TFilter, updated: TFilter) => TFilter | null,
};

export const useFilterInput = <TFilter, TData, TId extends Indexable>({
  data,
  dataToId,
  initialFilter,
  isDataIncluded,
  dataDeps,
  deps,
  onSetFilter,
}: UseFilterInputOpts<TFilter, TData, TId>): FilterInputControls<TFilter, TData, TId> => {
  const [filter, setFilterInternal] = React.useState<TFilter>(
    onSetFilter ? (onSetFilter(initialFilter, initialFilter) ?? initialFilter) : initialFilter,
  );

  const setFilter: ReactStateUpdaterFromOriginal<TFilter> = React.useCallback((getUpdated) => {
    let updatedFilter: TFilter | null = getUpdated(filter);
    updatedFilter = onSetFilter ? onSetFilter(filter, updatedFilter) : updatedFilter;

    // If `onSetFilter()` returns `null`, it means the original filter should be kept,
    // therefore `setFilterInternal()` shouldn't trigger to avoid unnecessary rerender
    if (!updatedFilter) {
      return;
    }

    setFilterInternal(updatedFilter);
  }, [filter, onSetFilter, setFilterInternal]);

  const {
    isIncluded,
    dataAfterFilter,
  } = React.useMemo(() => {
    const dataAfterFilter = typeof data === 'function' ? data(filter) : data;

    return {
      dataAfterFilter,
      isIncluded: Object.fromEntries(dataAfterFilter.map((single) => (
        [dataToId(single), isDataIncluded(filter, single)]
      ))) as FilterInclusionMap<TId>,
    };
  }, [filter, ...(dataDeps ?? []), ...(deps ?? [])]);

  return {
    data: dataAfterFilter,
    filter,
    setFilter,
    isIncluded,
  };
};
