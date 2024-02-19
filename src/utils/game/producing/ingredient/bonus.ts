import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {MealIngredientInfo} from '@/types/game/meal/info';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {CalculatedCookingSettings} from '@/types/userData/settings/cooking/calculated';
import {toSum} from '@/utils/array';
import {getMealBaseStrength} from '@/utils/game/meal/strength/base';
import {isNotNullish} from '@/utils/type';
import {getRecipeLevelFromCalculatedCookingSettings} from '@/utils/user/settings/cooking/recipeLevel';


type GetIngredientBonusOfMealsOpts = {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  mealIngredientInfo: MealIngredientInfo,
  calculatedCookingSettings: CalculatedCookingSettings,
};

export const getIngredientBonusOfMeals = ({
  ingredientMap,
  recipeLevelData,
  mealIngredientInfo,
  calculatedCookingSettings,
}: GetIngredientBonusOfMealsOpts): IngredientCounter => {
  const {targetMeals} = calculatedCookingSettings;
  const {ingredientsRequired, ingredientOfMeals} = mealIngredientInfo;

  const mealBonusMap = Object.fromEntries(targetMeals.map((meal) => [
    meal.id,
    getMealBaseStrength({
      level: getRecipeLevelFromCalculatedCookingSettings({
        calculatedCookingSettings,
        mealId: meal.id,
      }),
      meal,
      ingredientMap,
      recipeLevelData,
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
