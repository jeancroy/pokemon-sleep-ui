import countBy from 'lodash/countBy';

import {productionMultiplierByPeriod} from '@/const/game/production/multiplier';
import {IngredientCounter, IngredientId, IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {ProductionPeriod} from '@/types/game/producing/display';
import {IngredientMultiplier} from '@/types/game/producing/multiplier';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {getMealIngredientInfo} from '@/utils/game/meal/ingredient';
import {getIngredientBonusOfMeals} from '@/utils/game/producing/ingredient/bonus';


export type GetIngredientMultiplierOpts = {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  period: ProductionPeriod,
  production: IngredientCounter,
  calculatedCookingConfig: CalculatedCookingConfig,
};

export const getIngredientMultiplier = ({
  ingredientMap,
  recipeLevelData,
  period,
  production,
  calculatedCookingConfig,
}: GetIngredientMultiplierOpts): IngredientMultiplier => {
  const {targetMeals} = calculatedCookingConfig;

  const mealIngredientInfo = getMealIngredientInfo({
    meals: targetMeals,
    mealCount: countBy(targetMeals, ({id}) => id),
  });
  const {ingredientsRequired} = mealIngredientInfo;

  const ingredientBonus = getIngredientBonusOfMeals({
    recipeLevelData,
    ingredientMap,
    mealIngredientInfo,
    calculatedCookingConfig,
  });

  return {
    override: Object.fromEntries(Object.entries(production).map(([id, quantity]) => {
      const produced = quantity ?? 0;
      const required = (ingredientsRequired[parseInt(id)] ?? 0) * productionMultiplierByPeriod[period];

      const recipe = Math.min(produced, required);
      const filler = Math.max(produced - required, 0);
      const total = recipe + filler;

      if (!total) {
        return [id, 0];
      }

      return [
        id,
        (recipe * (ingredientBonus[parseInt(id)] ?? 1) + filler) / total,
      ];
    })),
    defaultValue: 1,
  };
};

type GetIngredientMultiplierValueOpts = {
  multiplier: IngredientMultiplier,
  ingredientId: IngredientId,
};

export const getIngredientMultiplierValue = ({
  multiplier,
  ingredientId,
}: GetIngredientMultiplierValueOpts): number => {
  const {defaultValue, override} = multiplier;
  return override[ingredientId] ?? defaultValue;
};
