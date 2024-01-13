import {IngredientCounter} from '@/types/game/ingredient';
import {MealIngredientInfo} from '@/types/game/meal/info';
import {CookingUserSettings} from '@/types/userData/settings';
import {toSum} from '@/utils/array';
import {getMealBonus} from '@/utils/game/meal/bonus';
import {isNotNullish} from '@/utils/type';
import {getRecipeLevelFromCookingSettings} from '@/utils/user/settings/cooking';


type GetIngredientBonusOfMealsOpts = {
  mealIngredientInfo: MealIngredientInfo,
  cookingSettings: CookingUserSettings,
};

export const getIngredientBonusOfMeals = ({
  mealIngredientInfo,
  cookingSettings,
}: GetIngredientBonusOfMealsOpts): IngredientCounter => {
  const {targetMeals} = cookingSettings;
  const {ingredientsRequired, ingredientOfMeals} = mealIngredientInfo;

  const mealBonusMap = Object.fromEntries(targetMeals.map((meal) => [
    meal.id,
    getMealBonus({
      level: getRecipeLevelFromCookingSettings({
        cookingSettings,
        mealId: meal.id,
      }),
      meal,
    }),
  ]));

  return Object.fromEntries(Object.entries(ingredientsRequired)
    .map(([ingredientId, totalRequired]) => {
      if (!totalRequired) {
        return null;
      }

      const weightedBonus = toSum(
        Object.entries(ingredientOfMeals[parseInt(ingredientId)] ?? {})
          .map(([mealId, quantityOnMeal]) => (
            mealBonusMap[parseInt(mealId)].total * (quantityOnMeal ?? 0)
          )),
      );

      return [
        ingredientId,
        weightedBonus / totalRequired,
      ];
    })
    .filter(isNotNullish));
};
