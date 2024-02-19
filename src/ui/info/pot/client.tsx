'use client';
import React from 'react';

import {usePossibleMealTypes} from '@/hooks/meal';
import {usePotInfoFilter} from '@/ui/info/pot/hook';
import {PotInfoInput} from '@/ui/info/pot/input';
import {PotInfoDataProps} from '@/ui/info/pot/type';
import {PotRecipeUnlockTable} from '@/ui/info/pot/unlockTable';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {isNotNullish} from '@/utils/type';


export const PotInfoClient = (props: PotInfoDataProps) => {
  const {mealMap, recipeLevelData, preloaded} = props;

  const {filter, setFilter, isIncluded} = usePotInfoFilter(props);

  const meals = Object.values(mealMap).filter(isNotNullish);
  const validMeals = React.useMemo(() => meals.filter(({id}) => isIncluded[id]), [filter]);
  const mealTypes = usePossibleMealTypes(meals);

  return (
    <>
      <PotInfoInput
        {...props}
        filter={filter}
        setFilter={setFilter}
        maxMealLevel={getMaxRecipeLevel({recipeLevelData})}
        mealTypes={mealTypes}
        preloaded={preloaded.cookingConfig}
      />
      <PotRecipeUnlockTable filter={filter} validMeals={validMeals} {...props}/>
    </>
  );
};
