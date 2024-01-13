import {describe, expect, it} from '@jest/globals';

import {defaultCookingPreset} from '@/const/user/cooking';
import {testMealData} from '@/tests/data/game/meal';
import {UserCookingTargetOfType} from '@/types/userData/cooking';
import {getMealIngredientInfo} from '@/utils/game/meal/ingredient';
import {getIngredientBonusOfMeals} from '@/utils/game/producing/ingredient/bonus';
import {isNotNullish} from '@/utils/type';
import {toCookingUserSettings} from '@/utils/user/settings/cooking';


describe('Ingredient Production / Bonus of Meals', () => {
  it('is correct', () => {
    const cookingTargetOfType: UserCookingTargetOfType = {
      breakfast: 1007,
      lunch: 3006,
      dinner: 3006,
    };
    const rate = getIngredientBonusOfMeals({
      mealIngredientInfo: getMealIngredientInfo({
        meals: Object.values(cookingTargetOfType)
          .map((mealId) => mealId ? testMealData[mealId] : null)
          .filter(isNotNullish),
        mealCount: {1007: 1, 3006: 2},
      }),
      cookingSettings: {
        ...toCookingUserSettings({
          cooking: {
            ...defaultCookingPreset,
            mealType: 1,
            target: {
              1: cookingTargetOfType,
            },
          },
          mealMap: testMealData,
        }),
        recipeLevel: {
          1007: 15,
          3006: 20,
        },
      },
    });

    expect(rate['3']).toBeCloseTo(1.770395);
    expect(rate['4']).toBeCloseTo(1.575);
    expect(rate['5']).toBeCloseTo(1.734677);
    expect(rate['8']).toBeCloseTo(1.8225);
    expect(rate['9']).toBeCloseTo(1.765385);
  });
});
