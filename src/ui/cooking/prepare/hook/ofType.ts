import {Meal} from '@/types/game/meal/main';
import {MealPreparerInfoOfMealType} from '@/ui/cooking/prepare/hook/type';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';
import {getMealPreparerIngredientStats} from '@/ui/cooking/prepare/utils';
import {toSum} from '@/utils/array';
import {toMealIngredientFromIngredientCounter} from '@/utils/game/cooking/meal/ingredients';
import {getMealIngredientInfo} from '@/utils/game/meal/ingredient';
import {getMealFinalStrengthOfNonRecipe} from '@/utils/game/meal/strength/final/nonRecipe';
import {getMealFinalStrength} from '@/utils/game/meal/strength/final/recipe';
import {isNotNullish} from '@/utils/type';


type GetMealPreparerInfoOfMealTypeOpts = Pick<
  MealPreparerCommonProps,
  'filter' | 'calculatedUserConfig' | 'ingredientMap' | 'recipeLevelData'
> & {
  mealsOfType: Meal[],
};

export const getMealPreparerInfoOfMealType = ({
  filter,
  calculatedUserConfig,
  ingredientMap,
  recipeLevelData,
  mealsOfType,
}: GetMealPreparerInfoOfMealTypeOpts): MealPreparerInfoOfMealType => {
  const {mealsWanted, recipeLevel} = filter;
  const {mapMultiplier, strengthMultiplier} = calculatedUserConfig.bonus;

  const {ingredientsRequired} = getMealIngredientInfo({meals: mealsOfType, mealCount: filter.mealsWanted});
  const ingredients = getMealPreparerIngredientStats({
    required: ingredientsRequired,
    inventory: filter.inventory,
  });

  const finalStrength: MealPreparerInfoOfMealType['finalStrength'] = Object.fromEntries(mealsOfType
    .map((meal) => {
      const count = mealsWanted[meal.id];
      if (!count) {
        return null;
      }

      const info = getMealFinalStrength({
        filler: [],
        level: recipeLevel[meal.id] ?? 1,
        meal,
        ingredientMap,
        recipeLevelData,
        mapMultiplier,
        strengthMultiplier: strengthMultiplier.cooking,
      });

      return [meal.id, info.strengthFinal * count];
    })
    .filter(isNotNullish));

  const recipeStrength = toSum(Object.values(finalStrength).filter(isNotNullish));
  const fillerStrength = getMealFinalStrengthOfNonRecipe({
    filler: toMealIngredientFromIngredientCounter(ingredients.filler),
    ingredientMap,
    mapMultiplier,
    strengthMultiplier: strengthMultiplier.cooking,
  }).strengthFinal;

  return {
    ingredients,
    finalStrength,
    summary: {
      recipeOnly: recipeStrength,
      withFiller: recipeStrength + fillerStrength,
    },
    mealsOfType,
  };
};
