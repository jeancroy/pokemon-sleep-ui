import {GetMealCoverageComboDataOpts} from '@/components/shared/meal/coverage/combo/calc/type';
import {mealCoverageComboSortBasisGetter} from '@/components/shared/meal/coverage/combo/const';
import {MealCoverageComboData} from '@/components/shared/meal/coverage/combo/type';
import {toSum} from '@/utils/array';
import {getMealCoverage} from '@/utils/game/cooking';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {generateTargetMeals} from '@/utils/game/meal/generate';
import {isNotNullish} from '@/utils/type';


export const getMealCoverageComboData = ({
  mealMap,
  ingredientProduction,
  actualPotCapacity,
  period,
  filter,
}: GetMealCoverageComboDataOpts): MealCoverageComboData[] => {
  const {
    mealType,
    ingredientExclusion,
    sort,
    resultCount,
  } = filter;
  const sortBasisGetter = mealCoverageComboSortBasisGetter[sort];

  return [...generateTargetMeals({
    mealType,
    mealMap,
    maxIngredientCount: actualPotCapacity,
  })]
    .map((meals): MealCoverageComboData | null => {
      if (meals.some(({ingredients}) => ingredients.some(({id}) => !!ingredientExclusion[id]))) {
        return null;
      }

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
    .filter(isNotNullish)
    .sort((a, b) => {
      const diff = sortBasisGetter(b) - sortBasisGetter(a);

      if (diff) {
        return diff;
      }

      return b.mealIngredientCounts.total - a.mealIngredientCounts.total;
    })
    .slice(0, resultCount);
};
