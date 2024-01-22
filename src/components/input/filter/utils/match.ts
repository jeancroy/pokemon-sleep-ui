import {FilterInclusionMap, FilterWithInclusionMap} from '@/components/input/filter/type';
import {Indexable, KeysOfType} from '@/utils/type';


type IsFilterCommonOpts<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
> = {
  filter: TFilter,
  filterKey: KeysOfType<TFilter, FilterInclusionMap<TId>>,
};

type IsFilterConditionActiveOpts<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
> = IsFilterCommonOpts<TFilter, TId>;

export const isFilterConditionActive = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey}: IsFilterConditionActiveOpts<TFilter, TId>) => (
  Object.values(filter[filterKey]).some((value) => value)
);

type IsDataIncludingAllOfFilterOpts<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
> = IsFilterCommonOpts<TFilter, TId> & {
  ids: TId[],
  idInFilterToIdForCheck: (key: string) => TId,
  onIdsEmpty: boolean,
};

export const isDataIncludingAllOfFilter = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, ids, idInFilterToIdForCheck, onIdsEmpty}: IsDataIncludingAllOfFilterOpts<TFilter, TId>) => (
  Object.entries(filter[filterKey])
    .filter(([_, filterValue]) => !!filterValue)
    .every(([idInFilter]) => ids.length === 0 ? onIdsEmpty : ids.includes(idInFilterToIdForCheck(idInFilter)))
);

type IsFilterIncludingDataOpts<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
> = IsFilterCommonOpts<TFilter, TId> & {
  ids: TId[],
};

export const isFilterIncludingAllOfData = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, ids}: IsFilterIncludingDataOpts<TFilter, TId>) => (
  !isFilterConditionActive({filter, filterKey}) || ids.every((id) => filter[filterKey][id])
);

export const isFilterIncludingSome = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, ids}: IsFilterIncludingDataOpts<TFilter, TId>) => (
  !isFilterConditionActive({filter, filterKey}) || ids.some((id) => filter[filterKey][id])
);

type IsFilterMismatchOnSingleOpts<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
> = IsFilterCommonOpts<TFilter, TId> & {
  id: TId | undefined | null,
};

export const isFilterMismatchOnSingle = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, id}: IsFilterMismatchOnSingleOpts<TFilter, TId>) => {
  if (!isFilterConditionActive({filter, filterKey})) {
    return false;
  }

  if (id === null || id === undefined) {
    return true;
  }

  return !filter[filterKey][id];
};

type IsFilterMatchingSearchOpts<TFilter extends Record<Indexable, string>> = {
  filter: TFilter,
  filterKey: KeysOfType<TFilter, string>,
  search: string[],
};

export const isFilterMatchingSearch = <
  TFilter extends Record<Indexable, string | any>,
>({filter, filterKey, search}: IsFilterMatchingSearchOpts<TFilter>) => {
  let filterValue = filter[filterKey];

  if (filterValue === '') {
    return true;
  }

  filterValue = filterValue.toUpperCase();
  return search.some((searchSingle) => searchSingle.toUpperCase().includes(filterValue));
};
