import React from 'react';

import {Meal, MealTypeId} from '@/types/game/meal/main';
import {getPossibleMealTypes} from '@/utils/game/meal/mealType';


export const usePossibleMealTypes = (meals: Meal[]): MealTypeId[] => React.useMemo(
  () => getPossibleMealTypes(meals),
  [meals],
);
