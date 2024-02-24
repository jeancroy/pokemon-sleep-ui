import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';
import {MealDetails, MealId} from '@/types/game/meal/main';
import {PotInfo} from '@/types/game/potInfo';
import {PotInfoFilter} from '@/ui/info/pot/type';
import {PotRecipeUnlockSection} from '@/ui/info/pot/unlock/section';


type Props = {
  filter: PotInfoFilter,
  potInfoList: PotInfo[],
  mealDetails: MealDetails[],
  isMealIncluded: FilterInclusionMap<MealId>,
};

export const PotRecipeUnlockTable = ({filter, potInfoList, mealDetails, isMealIncluded}: Props) => {
  const {capacity} = filter;

  const sortedMeals = mealDetails.sort((a, b) => {
    const diff = a.meal.ingredientCount - b.meal.ingredientCount;

    if (diff !== 0) {
      return diff;
    }

    return a.meal.id - b.meal.id;
  });

  let mealCursorIdx = 0;
  let cumulativeShardsRequirement = 0;

  return (
    <Flex center className="gap-1.5">
      {potInfoList.map((potInfo) => {
        const unlocked: MealDetails[] = [];
        let current: MealDetails | undefined = sortedMeals[mealCursorIdx];

        while (current && current.meal.ingredientCount <= potInfo.capacity) {
          if (isMealIncluded[current.meal.id]) {
            unlocked.push(current);
          }

          mealCursorIdx++;
          current = sortedMeals[mealCursorIdx];
        }

        if (!capacity || potInfo.capacity > capacity) {
          cumulativeShardsRequirement += potInfo.cost;
        }

        return (
          <PotRecipeUnlockSection
            key={potInfo.capacity}
            filter={filter}
            cumulativeShardsRequirement={cumulativeShardsRequirement}
            potInfo={potInfo}
            mealDetails={unlocked}
          />
        );
      })}
    </Flex>
  );
};
