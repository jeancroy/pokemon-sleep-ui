import {describe, expect, it} from '@jest/globals';

import {defaultUserCookingSettings} from '@/const/user/cooking';
import {defaultUserSettings} from '@/const/user/settings';
import {testIngredientMap} from '@/tests/data/game/ingredient/data';
import {testMealData} from '@/tests/data/game/meal';
import {testRecipeLevelData} from '@/tests/data/game/recipeLevel';
import {UserCookingTargetOfType} from '@/types/userData/settings/cooking/common';
import {getMealIngredientInfo} from '@/utils/game/meal/ingredient';
import {getIngredientBonusOfMeals} from '@/utils/game/producing/ingredient/bonus';
import {isNotNullish} from '@/utils/type';
import {toCalculatedCookingSettings} from '@/utils/user/settings/cooking/main';


describe('Pokemon Production (Ingredient) / Meal Bonus', () => {
  it('is correct', () => {
    const cookingTargetOfType: UserCookingTargetOfType = {
      breakfast: 1007,
      lunch: 3006,
      dinner: 3006,
    };
    const rate = getIngredientBonusOfMeals({
      ingredientMap: testIngredientMap,
      recipeLevelData: testRecipeLevelData,
      mealIngredientInfo: getMealIngredientInfo({
        meals: Object.values(cookingTargetOfType)
          .map((mealId) => mealId ? testMealData[mealId] : null)
          .filter(isNotNullish),
        mealCount: {1007: 1, 3006: 2},
      }),
      calculatedCookingSettings: {
        ...toCalculatedCookingSettings({
          settings: {...defaultUserSettings},
          cooking: {
            ...defaultUserCookingSettings,
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
