import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {GenericIngredientSlashIcon} from '@/components/shared/icon/ingredientSlash';
import {IngredientSelectionInput} from '@/components/shared/input/ingredient/selection';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {MealDisplayControl} from '@/components/shared/meal/filter/levelAgnostic/control';
import {
  MealFilterAgnosticCommonProps,
  MealInputFilterLevelAgnostic,
} from '@/components/shared/meal/filter/levelAgnostic/type';
import {useUniqueMealStrengthBonusPercent} from '@/hooks/meal/bonusPercent';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {toUnique} from '@/utils/array';
import {KeysOfType} from '@/utils/type';


export const MealFilterLevelAgnostic = <TFilter extends MealInputFilterLevelAgnostic>({
  filter,
  setFilter,
  meals,
  ingredientMap,
  children,
}: React.PropsWithChildren<MealFilterAgnosticCommonProps<TFilter>>) => {
  const t = useTranslations('UI.Component.MealFilter');

  const mealTypes = usePossibleMealTypes(meals);
  const bonusPercents = useUniqueMealStrengthBonusPercent({meals, ingredientMap});

  const ingredientIds = toUnique(meals.flatMap(({ingredients}) => ingredients.map(({id}) => id)))
    .sort((a, b) => a - b);

  return (
    <>
      <MealTypeInput
        mealTypes={mealTypes}
        filter={filter}
        setFilter={setFilter}
        filterKey={'mealType' as KeysOfType<TFilter, MealInputFilterLevelAgnostic['mealType']>}
      />
      <IngredientSelectionInput
        title={<GenericIngredientIcon alt={t('IngredientInclusion')}/>}
        ingredientIds={ingredientIds}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredientInclusion' as KeysOfType<TFilter, MealInputFilterLevelAgnostic['ingredientInclusion']>,
        })}
      />
      <IngredientSelectionInput
        title={<GenericIngredientSlashIcon alt={t('IngredientExclusion')}/>}
        ingredientIds={ingredientIds}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredientExclusion' as KeysOfType<TFilter, MealInputFilterLevelAgnostic['ingredientExclusion']>,
        })}
      />
      <FilterTextInput
        title={t('MinRecipeBonus')}
        ids={bonusPercents}
        idToText={(percent) => `${percent}%`}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'minBonusPercent',
        })}
      />
      {children}
      <MealDisplayControl
        showStats={filter.showStats}
        setShowStats={(showInfo) => setFilter((original) => ({
          ...original,
          showStats: showInfo,
        }))}
      />
    </>
  );
};
