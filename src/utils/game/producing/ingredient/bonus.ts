import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {MealIngredientInfo} from '@/types/game/meal/info';
import {CookingUserSettings} from '@/types/userData/settings';
import {toSum} from '@/utils/array';
import {getMealInfo} from '@/utils/game/meal/info';
import {isNotNullish} from '@/utils/type';
import {getRecipeLevelFromCookingSettings} from '@/utils/user/settings/cooking';


type GetIngredientBonusOfMealsOpts = {
  ingredientMap: IngredientMap,
  mealIngredientInfo: MealIngredientInfo,
  cookingSettings: CookingUserSettings,
};

export const getIngredientBonusOfMeals = ({
  ingredientMap,
  mealIngredientInfo,
  cookingSettings,
}: GetIngredientBonusOfMealsOpts): IngredientCounter => {
  const {targetMeals} = cookingSettings;
  const {ingredientsRequired, ingredientOfMeals} = mealIngredientInfo;

  const mealBonusMap = Object.fromEntries(targetMeals.map((meal) => [
    meal.id,
    getMealInfo({
      level: getRecipeLevelFromCookingSettings({
        cookingSettings,
        mealId: meal.id,
      }),
      meal,
      ingredientMap,
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
            mealBonusMap[parseInt(mealId)].bonus.total * (quantityOnMeal ?? 0)
          )),
      );

      return [
        ingredientId,
        weightedBonus / totalRequired,
      ];
    })
    .filter(isNotNullish));
};
