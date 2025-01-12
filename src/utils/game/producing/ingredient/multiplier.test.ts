import {describe, expect, it} from '@jest/globals';

import {testIngredientMap} from '@/tests/data/game/ingredient/data';
import {testMealData} from '@/tests/data/game/meal';
import {testRecipeLevelData} from '@/tests/data/game/recipeLevel';
import {getIngredientMultiplier} from '@/utils/game/producing/ingredient/multiplier';


describe('Pokemon Production (Ingredient) / Multiplier', () => {
  it('is correct using daily production', () => {
    const meals = [testMealData['1007'], testMealData['3006'], testMealData['3006']];
    const {override, defaultValue} = getIngredientMultiplier({
      ingredientMap: testIngredientMap,
      recipeLevelData: testRecipeLevelData,
      period: 'daily',
      production: {
        2: 18,
        3: 27,
        4: 40,
        5: 20,
      },
      calculatedCookingConfig: {
        targetMeals: meals,
        recipeLevel: {
          1007: 15,
          3006: 20,
        },
        actualPotCapacity: 40,
      },
    });

    expect(Object.keys(override)).toHaveLength(4);
    expect(override['2']).toBeCloseTo(1);
    expect(override['3']).toBeCloseTo(1.770395);
    expect(override['4']).toBeCloseTo(1.0575);
    expect(override['5']).toBeCloseTo(1.734677);
    expect(defaultValue).toBeCloseTo(1);
  });

  it('is correct using weekly production', () => {
    const meals = [testMealData['1007'], testMealData['3006'], testMealData['3006']];
    const {override, defaultValue} = getIngredientMultiplier({
      ingredientMap: testIngredientMap,
      recipeLevelData: testRecipeLevelData,
      period: 'weekly',
      production: {
        2: 18 * 7,
        3: 27 * 7,
        4: 40 * 7,
        5: 20 * 7,
      },
      calculatedCookingConfig: {
        targetMeals: meals,
        recipeLevel: {
          1007: 15,
          3006: 20,
        },
        actualPotCapacity: 40,
      },
    });

    expect(Object.keys(override)).toHaveLength(4);
    expect(override['2']).toBeCloseTo(1);
    expect(override['3']).toBeCloseTo(1.770395);
    expect(override['4']).toBeCloseTo(1.0575);
    expect(override['5']).toBeCloseTo(1.734677);
    expect(defaultValue).toBeCloseTo(1);
  });

  it('is correct with 0 production', () => {
    const meals = [testMealData['1007'], testMealData['3006'], testMealData['3006']];
    const {override, defaultValue} = getIngredientMultiplier({
      ingredientMap: testIngredientMap,
      recipeLevelData: testRecipeLevelData,
      period: 'daily',
      production: {
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      calculatedCookingConfig: {
        targetMeals: meals,
        recipeLevel: {
          1007: 15,
          3006: 20,
        },
        actualPotCapacity: 40,
      },
    });

    expect(Object.keys(override)).toHaveLength(4);
    expect(override['2']).toBeCloseTo(0);
    expect(override['3']).toBeCloseTo(0);
    expect(override['4']).toBeCloseTo(0);
    expect(override['5']).toBeCloseTo(0);
    expect(defaultValue).toBeCloseTo(1);
  });
});
