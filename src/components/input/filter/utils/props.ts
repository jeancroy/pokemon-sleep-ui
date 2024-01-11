import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterInclusionMap, FilterWithInclusionMap, FilterWithUpdaterProps} from '@/components/input/filter/type';
import {Indexable, KeysOfType} from '@/utils/type';


type GetSelectOnClickCommonProps<TFilter> = FilterWithUpdaterProps<TFilter> & {
  isAllowed?: () => boolean,
};

export type GetSingleSelectOnClickPropsOpts<TFilter, TData> = GetSelectOnClickCommonProps<TFilter> & {
  filterKey: KeysOfType<TFilter, TData | null>,
  allowNull?: boolean,
};

export const getSingleSelectOnClickProps = <TFilter, TData, TId>({
  filter,
  setFilter,
  isAllowed,
  filterKey,
  allowNull = true,
}: GetSingleSelectOnClickPropsOpts<TFilter, TData>): FilterInputOnClickProps<TId> => ({
  isActive: (id) => filter[filterKey] === id,
  onClick: (id) => {
    if (isAllowed && !isAllowed()) {
      return;
    }

    setFilter((original) => ({
      ...original,
      [filterKey]: original[filterKey] === id ? (allowNull ? null : id) : id,
    } satisfies TFilter));
  },
});

export type GetMultiSelectOnClickPropsOpts<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
> = GetSelectOnClickCommonProps<TFilter> & {
  filterKey: KeysOfType<TFilter, FilterInclusionMap<TId>>,
};

export const getMultiSelectOnClickProps = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({
  filter,
  setFilter,
  isAllowed,
  filterKey,
}: GetMultiSelectOnClickPropsOpts<TFilter, TId>): FilterInputOnClickProps<TId> => {
  return {
    isActive: (id) => !!filter[filterKey][id],
    onClick: (id) => {
      if (isAllowed && !isAllowed()) {
        return;
      }

      setFilter((original) => ({
        ...original,
        [filterKey]: {
          ...original[filterKey],
          [id]: !original[filterKey][id],
        },
      } satisfies TFilter));
    },
  };
};
