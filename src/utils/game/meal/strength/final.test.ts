import {describe, expect, it} from '@jest/globals';

import {testIngredientMap} from '@/tests/data/game/ingredient/data';
import {testMealData} from '@/tests/data/game/meal';
import {testRecipeLevelData} from '@/tests/data/game/recipeLevel';
import {getMealFinalStrength} from '@/utils/game/meal/strength/final';


describe('Meal / Calculate Final Strength', () => {
  // Test data sourced from https://github.com/RaenonX-PokemonSleep/pokemon-sleep-ui/issues/410
  it('is correct (1)', () => {
    const {strengthFinal} = getMealFinalStrength({
      filler: [
        {id: 8, quantity: 12},
        {id: 9, quantity: 2},
        {id: 13, quantity: 6},
      ],
      mapMultiplier: 1.15,
      level: 16,
      meal: testMealData['1003'],
      ingredientMap: testIngredientMap,
      recipeLevelData: testRecipeLevelData,
    });

    expect(strengthFinal).toBe(5486);
  });

  it('is correct (2)', () => {
    const {strengthFinal} = getMealFinalStrength({
      filler: [
        {id: 6, quantity: 62},
      ],
      mapMultiplier: 1.45,
      level: 1,
      meal: testMealData['3006'],
      ingredientMap: testIngredientMap,
      recipeLevelData: testRecipeLevelData,
    });

    expect(strengthFinal).toBe(22698);
  });

  it('is correct (3)', () => {
    const {strengthFinal} = getMealFinalStrength({
      filler: [
        {id: 6, quantity: 39},
        {id: 10, quantity: 11},
        {id: 12, quantity: 12},
      ],
      mapMultiplier: 1.45,
      level: 10,
      meal: testMealData['3006'],
      ingredientMap: testIngredientMap,
      recipeLevelData: testRecipeLevelData,
    });

    expect(strengthFinal).toBe(24188);
  });

  it('is correct (4)', () => {
    const {strengthFinal} = getMealFinalStrength({
      filler: [
        {id: 7, quantity: 1},
        {id: 10, quantity: 20},
        {id: 12, quantity: 41},
      ],
      mapMultiplier: 1.45,
      level: 14,
      meal: testMealData['3006'],
      ingredientMap: testIngredientMap,
      recipeLevelData: testRecipeLevelData,
    });

    expect(strengthFinal).toBe(23852);
  });

  it('is correct (5)', () => {
    const {strengthFinal} = getMealFinalStrength({
      filler: [
        {id: 5, quantity: 2},
        {id: 6, quantity: 5},
        {id: 7, quantity: 8},
        {id: 8, quantity: 6},
        {id: 10, quantity: 5},
        {id: 11, quantity: 24},
        {id: 15, quantity: 12},
      ],
      mapMultiplier: 1.45,
      level: 17,
      meal: testMealData['3006'],
      ingredientMap: testIngredientMap,
      recipeLevelData: testRecipeLevelData,
    });

    expect(strengthFinal).toBe(23975);
  });
});
