import {FilterEnforcerOpts, FilterWithInclusionMap} from '@/components/input/filter/type';
import {getFilterIncludedKeys, getFilterNewlySelectedKeys} from '@/components/input/filter/utils';
import {FilterEnforcerKeyWithDefault} from '@/components/shared/pokemon/sorter/enforcer/type';
import {isPokemonSortSkillValue} from '@/components/shared/pokemon/sorter/utils';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';


type EnforceFilterWithSkillValueOpts<
  TFilter extends FilterWithInclusionMap<MainSkillId>,
  TSort extends string,
> = FilterEnforcerOpts<TFilter> & {
  config: {
    mainSkill: FilterEnforcerKeyWithDefault<TFilter, FilterWithInclusionMap<MainSkillId>>,
    sort: FilterEnforcerKeyWithDefault<TFilter, TSort>[],
  },
};

export const enforceFilterWithSkillValue = <
  TFilter extends FilterWithInclusionMap<MainSkillId>,
  TSort extends string,
>({
  original,
  updated,
  config,
}: EnforceFilterWithSkillValueOpts<TFilter, TSort>): TFilter => {
  const {mainSkill, sort} = config;

  const originalSorts = sort.map(({key}) => original[key]);
  const updatedSorts = sort.map(({key}) => updated[key]);

  const isAnyOriginalSortSkillValue = originalSorts.some(isPokemonSortSkillValue);
  const isAnyUpdatedSortSkillValue = updatedSorts.some(isPokemonSortSkillValue);

  const originalSkillsSelected = getFilterIncludedKeys(original[mainSkill.key]);
  const updatedSkillsSelected = getFilterIncludedKeys(updated[mainSkill.key]);

  if (!isAnyOriginalSortSkillValue && isAnyUpdatedSortSkillValue) {
    if (originalSkillsSelected.length >= 2) {
      return {
        ...updated,
        [mainSkill.key]: {
          [originalSkillsSelected[0]]: true,
        } satisfies FilterWithInclusionMap<MainSkillId>,
      };
    }

    if (!originalSkillsSelected.length) {
      return {
        ...updated,
        [mainSkill.key]: mainSkill.defaultValue satisfies FilterWithInclusionMap<MainSkillId>,
      };
    }
  }

  if (isAnyOriginalSortSkillValue) {
    if (updatedSkillsSelected.length >= 2) {
      return {
        ...updated,
        [mainSkill.key]: Object.fromEntries(
          getFilterNewlySelectedKeys({original, updated, key: mainSkill.key})
            .map((mainSkillIdAdded) => [mainSkillIdAdded, true]),
        ) satisfies FilterWithInclusionMap<MainSkillId>,
      };
    }

    if (!updatedSkillsSelected.length) {
      return {
        ...updated,
        ...Object.fromEntries(sort.map(({key, defaultValue}) => [key, defaultValue])),
      };
    }
  }

  return updated;
};
