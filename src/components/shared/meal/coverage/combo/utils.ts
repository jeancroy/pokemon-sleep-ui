import {mealCoverageComboSortBasisGetter} from '@/components/shared/meal/coverage/combo/const';
import {
  MealCoverageComboCommonProps,
  MealCoverageComboData,
  MealCoverageComboInput,
} from '@/components/shared/meal/coverage/combo/type';
import {toSum} from '@/utils/array';
import {getMealCoverage} from '@/utils/game/cooking';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {generateTargetMeals} from '@/utils/game/meal/generate';


type GetMealCoverageComboDataOpts = MealCoverageComboCommonProps & {
  filter: MealCoverageComboInput,
};

export const getMealCoverageComboData = ({
  mealMap,
  ingredientProduction,
  period,
  filter,
}: GetMealCoverageComboDataOpts): MealCoverageComboData[] => {
  const {mealType, sort, resultCount} = filter;
  const sortBasisGetter = mealCoverageComboSortBasisGetter[sort];

  return [...generateTargetMeals({
    mealType,
    mealMap,
  })]
    .map((meals): MealCoverageComboData => {
      const byMeal = Object.fromEntries(meals.map((meal) => [
        meal.id,
        getMealIngredientCount(meal),
      ]));
      const coverage = getMealCoverage({
        meals,
        ingredientProduction,
        period,
      });

      return {
        coverage,
        meals,
        mealIngredientCounts: {
          byMeal,
          total: toSum(Object.values(byMeal)),
        },
        coveredStrength: toSum(meals.map(({baseStrength}) => baseStrength)) * coverage.total,
      };
    })
    .sort((a, b) => {
      const diff = sortBasisGetter(b) - sortBasisGetter(a);

      if (diff) {
        return diff;
      }

      return b.mealIngredientCounts.total - a.mealIngredientCounts.total;
    })
    .slice(0, resultCount);
};
