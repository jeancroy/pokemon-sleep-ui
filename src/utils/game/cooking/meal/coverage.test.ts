import {describe, expect, it} from '@jest/globals';

import {testMealData} from '@/tests/data/game/meal';
import {getMealCoverage} from '@/utils/game/cooking/meal/coverage';


describe('Cooking / Meal Coverage', () => {
  it('is correct using daily production', () => {
    const {byIngredient} = getMealCoverage({
      meals: [testMealData['1007'], testMealData['3006'], testMealData['3006']],
      ingredientProduction: {
        3: 99,
        4: 2,
        8: 10,
        9: 52,
        10: 10,
      },
      period: 'daily',
    });

    expect(byIngredient).toMatchObject({
      3: 1,
      4: 0.5,
      5: 0,
      8: 0.5,
      9: 1,
    });
  });

  it('is correct using weekly production', () => {
    const {byIngredient} = getMealCoverage({
      meals: [testMealData['1007'], testMealData['3006'], testMealData['3006']],
      ingredientProduction: {
        3: 99 * 7,
        4: 2 * 7,
        8: 10 * 7,
        9: 52 * 7,
        10: 10 * 7,
      },
      period: 'weekly',
    });

    expect(byIngredient).toMatchObject({
      3: 1,
      4: 0.5,
      5: 0,
      8: 0.5,
      9: 1,
    });
  });

  it('caps at 1', () => {
    const {byIngredient, total} = getMealCoverage({
      meals: [testMealData['3006'], testMealData['3006'], testMealData['3006']],
      ingredientProduction: {
        3: 45,
        5: 30,
        8: 30,
        9: 60,
      },
      period: 'daily',
    });

    expect(total).toBeCloseTo(1);
    expect(byIngredient).toMatchObject({
      3: 1,
      5: 1,
      8: 1,
      9: 1,
    });
  });

  it('calculates `total` with correct ratio', () => {
    const {byIngredient, total} = getMealCoverage({
      meals: [testMealData['3006'], testMealData['3006'], testMealData['3006']],
      ingredientProduction: {
        3: 0,
        5: 0,
        8: 0,
        9: 999,
      },
      period: 'daily',
    });

    expect(total).toBeCloseTo(60 / 165);
    expect(byIngredient).toMatchObject({
      3: 0,
      5: 0,
      8: 0,
      9: 1,
    });
  });
});
