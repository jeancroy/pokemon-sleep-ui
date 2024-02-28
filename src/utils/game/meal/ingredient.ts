import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';

import {IngredientCounter, IngredientOfMeals} from '@/types/game/ingredient';
import {MealIngredientInfo} from '@/types/game/meal/info';
import {Meal, MealCounter} from '@/types/game/meal/main';
import {toSum} from '@/utils/array';


type GetMealIngredientInfoOpts = {
  meals: Meal[],
  mealCount: MealCounter,
};

export const getMealIngredientInfo = ({
  meals,
  mealCount,
}: GetMealIngredientInfoOpts): MealIngredientInfo => {
  const ingredientsRequired: IngredientCounter = {};
  const ingredientOfMeals: IngredientOfMeals = {};

  for (const {id: mealId, ingredients} of uniqBy(meals, ({id}) => id)) {
    const count = mealCount[mealId];

    if (!count) {
      continue;
    }

    for (const {id: ingredientId, quantity} of ingredients) {
      const totalQuantity = quantity * count;
      const ingredientOfMeal = ingredientOfMeals[ingredientId] ?? {};

      ingredientsRequired[ingredientId] = (ingredientsRequired[ingredientId] ?? 0) + totalQuantity;
      ingredientOfMeals[ingredientId] = {
        ...ingredientOfMeal,
        [mealId]: (ingredientOfMeal[mealId] ?? 0) + totalQuantity,
      };
    }
  }

  return {
    ingredientsRequired,
    ingredientOfMeals,
  };
};

type GetMealIngredientInfoFromTargetMealsOpts = {
  targetMeals: Meal[],
  days: number,
};

export const getMealIngredientInfoFromTargetMeals = ({
  targetMeals,
  days,
}: GetMealIngredientInfoFromTargetMealsOpts): MealIngredientInfo => {
  const grouped = groupBy(
    targetMeals.map(({id}) => ({id, days})),
    ({id}) => id,
  );

  return getMealIngredientInfo({
    meals: targetMeals,
    mealCount: Object.fromEntries(
      Object.entries(grouped).map(([id, data]) => [id, toSum(data.map(({days}) => days))]),
    ),
  });
};
