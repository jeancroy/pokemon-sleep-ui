import {FilterInclusionMap} from '@/components/input/filter/type';
import {Indexable, Nullable} from '@/utils/type';


export const isFilterInclusionMapEffectivelyEmpty = <TId extends Indexable>(map: FilterInclusionMap<TId>): boolean => {
  return Object.values<Nullable<boolean>>(map).every((value) => !value);
};
