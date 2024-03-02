import {productionMultiplierByPeriod} from '@/const/game/production/multiplier';
import {MealCoverage} from '@/types/game/cooking/meal';
import {IngredientCounter} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {ProductionPeriod} from '@/types/game/producing/display';
import {applyMultiplierToIngredientCount, getTotalIngredientCount} from '@/utils/game/ingredient/counter';
import {getMealIngredientInfoFromTargetMeals} from '@/utils/game/meal/ingredient';
import {isNotNullish} from '@/utils/type';


type GetMealCoverageOpts = {
  meals: Meal[],
  ingredientProduction: IngredientCounter,
  period: ProductionPeriod,
};

export const getMealCoverage = ({
  meals,
  ingredientProduction,
  period,
}: GetMealCoverageOpts): MealCoverage => {
  const dailyProduction = applyMultiplierToIngredientCount(
    productionMultiplierByPeriod.daily / productionMultiplierByPeriod[period],
    ingredientProduction,
  );
  const {ingredientsRequired} = getMealIngredientInfoFromTargetMeals({
    targetMeals: meals,
    days: 1,
  });

  const effectiveProduction = Object.fromEntries(Object.entries(ingredientsRequired)
    .map(([id, requiredCount]) => {
      if (!requiredCount) {
        return null;
      }

      return [id, Math.min(dailyProduction[parseInt(id)] ?? 0, requiredCount)];
    })
    .filter(isNotNullish),
  );
  const byIngredient = Object.fromEntries(Object.entries(ingredientsRequired)
    .map(([id, requiredCount]) => {
      if (!requiredCount) {
        return null;
      }

      return [id, (effectiveProduction[parseInt(id)] ?? 0) / requiredCount];
    })
    .filter(isNotNullish),
  );

  return {
    byIngredient,
    total: getTotalIngredientCount(effectiveProduction) / getTotalIngredientCount(ingredientsRequired),
  };
};
