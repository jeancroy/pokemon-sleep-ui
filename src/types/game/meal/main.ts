import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId} from '@/types/game/ingredient';


export type MealId = number;

export type MealTypeId = number;

export type MealIngredient = {
  id: IngredientId,
  quantity: number,
};

export type Meal = {
  id: MealId,
  type: MealTypeId,
  ingredients: MealIngredient[],
  baseStrength: number,
};

export type MealMap = {[id in MealId]?: Meal};

export type MealCounter = {[meal in MealId]?: number | null};

export type MealsMarked = FilterInclusionMap<MealId>;
