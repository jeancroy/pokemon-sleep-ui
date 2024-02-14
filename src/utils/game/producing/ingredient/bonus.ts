import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {MealIngredientInfo} from '@/types/game/meal/info';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {CookingUserSettings} from '@/types/userData/settings/cooking';
import {toSum} from '@/utils/array';
import {getMealBaseStrength} from '@/utils/game/meal/strength/base';
import {isNotNullish} from '@/utils/type';
import {getRecipeLevelFromCookingSettings} from '@/utils/user/settings/cooking/recipeLevel';


type GetIngredientBonusOfMealsOpts = {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  mealIngredientInfo: MealIngredientInfo,
  cookingSettings: CookingUserSettings,
};

export const getIngredientBonusOfMeals = ({
  ingredientMap,
  recipeLevelData,
  mealIngredientInfo,
  cookingSettings,
}: GetIngredientBonusOfMealsOpts): IngredientCounter => {
  const {targetMeals} = cookingSettings;
  const {ingredientsRequired, ingredientOfMeals} = mealIngredientInfo;

  const mealBonusMap = Object.fromEntries(targetMeals.map((meal) => [
    meal.id,
    getMealBaseStrength({
      level: getRecipeLevelFromCookingSettings({
        cookingSettings,
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
