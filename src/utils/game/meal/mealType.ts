import {Meal, MealTypeId} from '@/types/game/meal/main';
import {toUnique} from '@/utils/array';


export const getPossibleMealTypes = (meals: Meal[]): MealTypeId[] => (
  toUnique(meals.map(({type}) => type)).sort((a, b) => a - b)
);
