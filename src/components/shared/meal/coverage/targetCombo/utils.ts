import {
  MealCoverageComboData,
  MealCoverageTargetComboCommonProps,
  MealCoverageTargetComboInput,
} from '@/components/shared/meal/coverage/targetCombo/type';
import {toSum} from '@/utils/array';
import {getMealCoverage} from '@/utils/game/cooking';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {generateTargetMeals} from '@/utils/game/meal/generate';


type GetMealCoverageComboDataOpts = MealCoverageTargetComboCommonProps & {
  filter: MealCoverageTargetComboInput,
};

export const getMealCoverageComboData = ({
  mealMap,
  ingredientProduction,
  period,
  filter,
}: GetMealCoverageComboDataOpts): MealCoverageComboData[] => {
  const {mealType, resultCount} = filter;

  return [...generateTargetMeals({
    mealType,
    mealMap,
  })]
    .map((meals) => ({
      coverage: getMealCoverage({
        meals,
        ingredientProduction,
        period,
      }),
      meals,
      mealIngredientCounts: {
        byMeal: Object.fromEntries(meals.map((meal) => [
          meal.id,
          getMealIngredientCount(meal),
        ])),
        total: toSum(meals.map(getMealIngredientCount)),
      },
    }))
    .sort((a, b) => {
      const coverageDiff = b.coverage.total - a.coverage.total;

      if (!coverageDiff) {
        return b.mealIngredientCounts.total - a.mealIngredientCounts.total;
      }

      return coverageDiff;
    })
    .slice(0, resultCount);
};
