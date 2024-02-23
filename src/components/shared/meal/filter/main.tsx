import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRow} from '@/components/input/filter/row';
import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {GenericIngredientSlashIcon} from '@/components/shared/icon/ingredientSlash';
import {IngredientSelectionInput} from '@/components/shared/input/ingredient/selection';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {MealDisplayControl} from '@/components/shared/meal/control';
import {MealInputFilter} from '@/components/shared/meal/filter/type';
import {MealLevelInput} from '@/components/shared/meal/level';
import {useUniqueMealStrengthBonusPercent} from '@/hooks/meal/bonusPercent';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {toUnique} from '@/utils/array';
import {KeysOfType} from '@/utils/type';


type Props<TFilter extends MealInputFilter> = FilterWithUpdaterProps<TFilter> & {
  meals: Meal[],
  ingredientMap: IngredientMap,
  maxRecipeLevel: number,
};

export const MealFilter = <TFilter extends MealInputFilter>({
  filter,
  setFilter,
  meals,
  ingredientMap,
  maxRecipeLevel,
}: Props<TFilter>) => {
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
        filterKey={'mealType' as KeysOfType<TFilter, MealInputFilter['mealType']>}
      />
      <IngredientSelectionInput
        title={<GenericIngredientIcon alt={t('IngredientInclusion')}/>}
        ingredientIds={ingredientIds}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredientInclusion' as KeysOfType<TFilter, MealInputFilter['ingredientInclusion']>,
        })}
      />
      <IngredientSelectionInput
        title={<GenericIngredientSlashIcon alt={t('IngredientExclusion')}/>}
        ingredientIds={ingredientIds}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredientExclusion' as KeysOfType<TFilter, MealInputFilter['ingredientExclusion']>,
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
      <InputRow className="px-2 py-1">
        <MealLevelInput
          max={maxRecipeLevel}
          value={filter.recipeLevel}
          setValue={(recipeLevel) => setFilter((original) => ({
            ...original,
            recipeLevel,
          }))}
        />
      </InputRow>
      <MealDisplayControl
        showStrength={filter.showStats}
        setShowStrength={(showInfo) => setFilter((original) => ({
          ...original,
          showStats: showInfo,
        }))}
      />
    </>
  );
};
