import React from 'react';


import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';
import potCapacity from '@/data/potCapacity.json';
import {Meal, MealDetails, MealId} from '@/types/game/meal/main';
import {PotInfoDataProps, PotInfoFilter} from '@/ui/info/pot/type';
import {PotRecipeUnlockSection} from '@/ui/info/pot/unlockSection';
import {getMealIngredientCount} from '@/utils/game/meal/count';


type Props = Omit<PotInfoDataProps, 'meals'> & {
  filter: PotInfoFilter,
  mealDetails: MealDetails[],
  isMealIncluded: FilterInclusionMap<MealId>,
};

export const PotRecipeUnlockTable = ({filter, mealDetails, isMealIncluded}: Props) => {
  const {capacity} = filter;

  const sortedMeals = mealDetails.sort((a, b) => {
    const diff = a.meal.ingredientCount - b.meal.ingredientCount;

    if (diff !== 0) {
      return diff;
    }

    return a.meal.id - b.meal.id;
  });

  let mealCursorIdx = 0;
  let cumulativeCost = 0;

  return (
    <Flex center className="gap-1.5">
      {potCapacity
        .sort((a, b) => a.level - b.level)
        .map((potInfo) => {
          const unlockedMeals: Meal[] = [];
          let currentMeal: Meal | undefined = sortedMeals[mealCursorIdx].meal;

          while (currentMeal && getMealIngredientCount(currentMeal) <= potInfo.capacity) {
            unlockedMeals.push(currentMeal);

            mealCursorIdx++;
            currentMeal = sortedMeals[mealCursorIdx].meal;
          }

          if (!capacity || potInfo.capacity > capacity) {
            cumulativeCost += potInfo.cost;
          }

          return (
            <PotRecipeUnlockSection
              key={potInfo.capacity}
              filter={filter}
              cumulativeCost={cumulativeCost}
              potInfo={potInfo}
              unlockedRecipes={mealCursorIdx}
              mealDetails={mealDetails}
              isMealIncluded={isMealIncluded}
            />
          );
        })}
    </Flex>
  );
};
