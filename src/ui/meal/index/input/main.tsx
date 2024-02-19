import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {IngredientSelectionInput} from '@/components/shared/input/ingredient/selection';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealDisplayControl} from '@/components/shared/meal/control';
import {MealLevelInput} from '@/components/shared/meal/level';
import {defaultUserCookingSettings} from '@/const/user/cooking';
import {usePossibleMealTypes} from '@/hooks/meal';
import {Meal} from '@/types/game/meal/main';
import {UserPreloadedData} from '@/types/userData/main';
import {MealIndexInputProps} from '@/ui/meal/index/input/type';
import {MealFilter} from '@/ui/meal/index/type';
import {toUnique} from '@/utils/array';


type Props = MealIndexInputProps & {
  data: Meal[],
  maxRecipeLevel: number,
  preloaded: UserPreloadedData['cooking'],
};

export const MealInput = ({filter, setFilter, data, maxRecipeLevel, preloaded}: Props) => {
  const mealTypes = usePossibleMealTypes(data);

  return (
    <Flex className="gap-1">
      <MealTypeInput
        mealTypes={mealTypes}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'mealType',
        })}
      />
      <InputRow className="px-2 py-1">
        <MealLevelInput
          max={maxRecipeLevel}
          value={filter.mealLevel}
          setValue={(mealLevel) => setFilter((original) => ({...original, mealLevel}))}
        />
      </InputRow>
      <PotCapacityInput
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'potCapacity',
        })}
      />
      <IngredientSelectionInput
        ingredientIds={toUnique(data.flatMap(({ingredients}) => ingredients.map(({id}) => id))).sort((a, b) => a - b)}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredient',
        })}
      />
      <MealDisplayControl
        showEnergy={filter.showEnergy}
        setShowEnergy={(showEnergy) => setFilter((original) => ({
          ...original,
          showEnergy,
        } satisfies MealFilter))}
        uploadData={{
          ...defaultUserCookingSettings,
          ...preloaded,
          ingredients: filter.ingredient,
          showEnergy: filter.showEnergy,
          ...(filter.potCapacity && {
            potCapacity: filter.potCapacity,
          }),
        }}
      />
    </Flex>
  );
};
