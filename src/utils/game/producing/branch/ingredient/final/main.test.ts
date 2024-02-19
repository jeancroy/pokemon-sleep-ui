import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/game/bonus';
import {testIngredientMap} from '@/tests/data/game/ingredient/data';
import {testIngredientProductions} from '@/tests/data/game/ingredient/production';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {testDefaultCalculatedUserConfig} from '@/tests/data/user/config';
import {getTestFinalProducingRateOfDropCommonOpts} from '@/tests/producing/rate';
import {getIngredientProducingRateBaseList} from '@/utils/game/producing/branch/ingredient/base/main';
import {getIngredientProducingRateFinalList} from '@/utils/game/producing/branch/ingredient/final/main';


describe('Pokemon Production (Ingredient) / Final', () => {
  const bonus = testBonus['1'];
  const commonOpts = getTestFinalProducingRateOfDropCommonOpts(bonus);

  const frequency = 2920.2;

  const awakeFreq = frequency / (bonus.stamina.multiplier.awake ?? 0);
  const awakeDuration = commonOpts.sleepSessionInfo.duration.awake;

  it('is correct using Absol of ABX (Cocoa x 2; Apple x 8)', () => {
    const rate = getIngredientProducingRateFinalList({
      baseList: getIngredientProducingRateBaseList({
        level: 30,
        pokemon: testPokemonData.absol,
        ingredients: testIngredientProductions.abx,
        ingredientMap: testIngredientMap,
        baseFrequency: frequency,
        calculatedUserConfig: {
          ...testDefaultCalculatedUserConfig,
          bonus,
        },
      }),
      ...commonOpts,
    });

    const ingredientStrengthMultiplier = bonus.mapMultiplier * bonus.overallMultiplier;
    const ingredientStrength5 = (testIngredientMap['5']?.energy ?? NaN) * ingredientStrengthMultiplier;
    const ingredientStrength13 = (testIngredientMap['13']?.energy ?? NaN) * ingredientStrengthMultiplier;

    expect(rate[0].id).toBe(5);
    expect(rate[0].awake.id).toBe(5);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq * 2);
    expect(rate[0].awake.qty).toBeCloseTo(awakeDuration / (awakeFreq * 2) * 8);
    expect(rate[0].awake.strength).toBeCloseTo(awakeDuration / (awakeFreq * 2) * 8 * ingredientStrength5);
    expect(rate[0].sleep1Vacant.id).toBe(5);
    expect(rate[0].sleep1Vacant.frequency).toBeCloseTo(2000);
    expect(rate[0].sleep1Vacant.qty).toBeCloseTo(10 * 8);
    expect(rate[0].sleep1Vacant.strength).toBeCloseTo(10 * 8 * ingredientStrength5);
    expect(rate[0].sleep1Filled.id).toBe(5);
    expect(rate[0].sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[0].sleep1Filled.qty).toBeCloseTo(0);
    expect(rate[0].sleep1Filled.strength).toBeCloseTo(0);
    expect(rate[0].sleep2Vacant.id).toBe(5);
    expect(rate[0].sleep2Vacant.frequency).toBeCloseTo(Infinity);
    expect(rate[0].sleep2Vacant.qty).toBeCloseTo(0);
    expect(rate[0].sleep2Vacant.strength).toBeCloseTo(0);
    expect(rate[0].sleep2Filled.id).toBe(5);
    expect(rate[0].sleep2Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[0].sleep2Filled.qty).toBeCloseTo(0);
    expect(rate[0].sleep2Filled.strength).toBeCloseTo(0);
    expect(rate[1].id).toBe(13);
    expect(rate[1].awake.id).toBe(13);
    expect(rate[1].awake.frequency).toBeCloseTo(awakeFreq * 2);
    expect(rate[1].awake.qty).toBeCloseTo(awakeDuration / (awakeFreq * 2) * 2);
    expect(rate[1].awake.strength).toBeCloseTo(awakeDuration / (awakeFreq * 2) * 2 * ingredientStrength13);
    expect(rate[1].sleep1Vacant.id).toBe(13);
    expect(rate[1].sleep1Vacant.frequency).toBeCloseTo(2000);
    expect(rate[1].sleep1Vacant.qty).toBeCloseTo(10 * 2);
    expect(rate[1].sleep1Vacant.strength).toBeCloseTo(10 * 2 * ingredientStrength13);
    expect(rate[1].sleep1Filled.id).toBe(13);
    expect(rate[1].sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[1].sleep1Filled.qty).toBeCloseTo(0);
    expect(rate[1].sleep1Filled.strength).toBeCloseTo(0);
    expect(rate[1].sleep2Vacant.id).toBe(13);
    expect(rate[1].sleep2Vacant.frequency).toBeCloseTo(Infinity);
    expect(rate[1].sleep2Vacant.qty).toBeCloseTo(0);
    expect(rate[1].sleep2Vacant.strength).toBeCloseTo(0);
    expect(rate[1].sleep2Filled.id).toBe(13);
    expect(rate[1].sleep2Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[1].sleep2Filled.qty).toBeCloseTo(0);
    expect(rate[1].sleep2Filled.strength).toBeCloseTo(0);
  });

  it('has correct frequency for Absol of AXX (Cocoa x 2)', () => {
    const rate = getIngredientProducingRateFinalList({
      baseList: getIngredientProducingRateBaseList({
        level: 1,
        pokemon: testPokemonData.absol,
        ingredients: testIngredientProductions.axx,
        ingredientMap: testIngredientMap,
        baseFrequency: frequency,
        calculatedUserConfig: {
          ...testDefaultCalculatedUserConfig,
          bonus,
        },
      }),
      ...commonOpts,
    });

    expect(rate).toHaveLength(1);
    expect(rate[0].id).toBe(13);
    expect(rate[0].awake.id).toBe(13);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq);
    expect(rate[0].awake.qty).toBeCloseTo(awakeDuration / awakeFreq * 2);
    expect(rate[0].sleep1Vacant.id).toBe(13);
    expect(rate[0].sleep1Vacant.frequency).toBeCloseTo(1000);
    expect(rate[0].sleep1Vacant.qty).toBeCloseTo(20 * 2);
    expect(rate[0].sleep1Filled.id).toBe(13);
    expect(rate[0].sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[0].sleep1Filled.qty).toBeCloseTo(0);
  });

  it('has correct frequency for Absol of AAX (Cocoa x 2; Cocoa x 5)', () => {
    const rate = getIngredientProducingRateFinalList({
      baseList: getIngredientProducingRateBaseList({
        level: 1,
        pokemon: testPokemonData.absol,
        ingredients: testIngredientProductions.aax,
        ingredientMap: testIngredientMap,
        baseFrequency: frequency,
        calculatedUserConfig: {
          ...testDefaultCalculatedUserConfig,
          bonus,
        },
      }),
      ...commonOpts,
    });

    expect(rate).toHaveLength(1);
    expect(rate[0].id).toBe(13);
    expect(rate[0].awake.id).toBe(13);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq);
    expect(rate[0].awake.qty).toBeCloseTo(awakeDuration / awakeFreq * 3.5);
    expect(rate[0].sleep1Vacant.id).toBe(13);
    expect(rate[0].sleep1Vacant.frequency).toBeCloseTo(1000);
    expect(rate[0].sleep1Vacant.qty).toBeCloseTo(20 * 3.5);
    expect(rate[0].sleep1Filled.id).toBe(13);
    expect(rate[0].sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[0].sleep1Filled.qty).toBeCloseTo(0);
  });

  it('has correct frequency for Absol of AAA (Cocoa x 2; Cocoa x 5; Cocoa x 7)', () => {
    const rate = getIngredientProducingRateFinalList({
      baseList: getIngredientProducingRateBaseList({
        level: 1,
        pokemon: testPokemonData.absol,
        ingredients: testIngredientProductions.aaa,
        ingredientMap: testIngredientMap,
        baseFrequency: frequency,
        calculatedUserConfig: {
          ...testDefaultCalculatedUserConfig,
          bonus,
        },
      }),
      ...commonOpts,
    });

    expect(rate).toHaveLength(1);
    expect(rate[0].id).toBe(13);
    expect(rate[0].awake.id).toBe(13);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq);
    expect(rate[0].awake.qty).toBeCloseTo(awakeDuration / awakeFreq * (14 / 3));
    expect(rate[0].sleep1Vacant.id).toBe(13);
    expect(rate[0].sleep1Vacant.frequency).toBeCloseTo(1000);
    expect(rate[0].sleep1Vacant.qty).toBeCloseTo(20 * (14 / 3));
    expect(rate[0].sleep1Filled.id).toBe(13);
    expect(rate[0].sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[0].sleep1Filled.qty).toBeCloseTo(0);
  });

  it('has correct frequency for Absol of AAB (Cocoa x 2; Cocoa x 5; Apple x 12)', () => {
    const rate = getIngredientProducingRateFinalList({
      baseList: getIngredientProducingRateBaseList({
        level: 1,
        pokemon: testPokemonData.absol,
        ingredients: testIngredientProductions.aab,
        ingredientMap: testIngredientMap,
        baseFrequency: frequency,
        calculatedUserConfig: {
          ...testDefaultCalculatedUserConfig,
          bonus,
        },
      }),
      ...commonOpts,
    });

    expect(rate).toHaveLength(2);
    expect(rate[0].id).toBe(5);
    expect(rate[0].awake.id).toBe(5);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq * 3);
    expect(rate[0].awake.qty).toBeCloseTo(awakeDuration / (awakeFreq * 3) * 12);
    expect(rate[0].sleep1Vacant.id).toBe(5);
    expect(rate[0].sleep1Vacant.frequency).toBeCloseTo(1000 * 3);
    expect(rate[0].sleep1Vacant.qty).toBeCloseTo(20 * (1 / 3) * 12);
    expect(rate[0].sleep1Filled.id).toBe(5);
    expect(rate[0].sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[0].sleep1Filled.qty).toBeCloseTo(0);
    expect(rate[1].id).toBe(13);
    expect(rate[1].awake.id).toBe(13);
    expect(rate[1].awake.frequency).toBeCloseTo(awakeFreq * (3 / 2));
    expect(rate[1].awake.qty).toBeCloseTo(awakeDuration / (awakeFreq * (3 / 2)) * 3.5);
    expect(rate[1].sleep1Vacant.id).toBe(13);
    expect(rate[1].sleep1Vacant.frequency).toBeCloseTo(1000 * (3 / 2));
    expect(rate[1].sleep1Vacant.qty).toBeCloseTo(20 * (2 / 3) * 3.5);
    expect(rate[1].sleep1Filled.id).toBe(13);
    expect(rate[1].sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[1].sleep1Filled.qty).toBeCloseTo(0);
  });

  it('has correct frequency for Absol of ABC (Cocoa x 2; Apple x 8; Mushroom x 7)', () => {
    const rate = getIngredientProducingRateFinalList({
      baseList: getIngredientProducingRateBaseList({
        level: 30,
        pokemon: testPokemonData.absol,
        ingredients: testIngredientProductions.abc,
        ingredientMap: testIngredientMap,
        baseFrequency: frequency,
        calculatedUserConfig: {
          ...testDefaultCalculatedUserConfig,
          bonus,
        },
      }),
      ...commonOpts,
    });

    expect(rate).toHaveLength(3);
    expect(rate[0].id).toBe(2);
    expect(rate[0].awake.id).toBe(2);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq * 3);
    expect(rate[0].awake.qty).toBeCloseTo(awakeDuration / (awakeFreq * 3) * 7);
    expect(rate[0].sleep1Vacant.id).toBe(2);
    expect(rate[0].sleep1Vacant.frequency).toBeCloseTo(1000 * 3);
    expect(rate[0].sleep1Vacant.qty).toBeCloseTo(20 * (1 / 3) * 7);
    expect(rate[0].sleep1Filled.id).toBe(2);
    expect(rate[0].sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[0].sleep1Filled.qty).toBeCloseTo(0);
    expect(rate[1].id).toBe(5);
    expect(rate[1].awake.id).toBe(5);
    expect(rate[1].awake.frequency).toBeCloseTo(awakeFreq * 3);
    expect(rate[1].awake.qty).toBeCloseTo(awakeDuration / (awakeFreq * 3) * 8);
    expect(rate[1].sleep1Vacant.id).toBe(5);
    expect(rate[1].sleep1Vacant.frequency).toBeCloseTo(1000 * 3);
    expect(rate[1].sleep1Vacant.qty).toBeCloseTo(20 * (1 / 3) * 8);
    expect(rate[1].sleep1Filled.id).toBe(5);
    expect(rate[1].sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[1].sleep1Filled.qty).toBeCloseTo(0);
    expect(rate[2].id).toBe(13);
    expect(rate[2].awake.id).toBe(13);
    expect(rate[2].awake.frequency).toBeCloseTo(awakeFreq * 3);
    expect(rate[2].awake.qty).toBeCloseTo(awakeDuration / (awakeFreq * 3) * 2);
    expect(rate[2].sleep1Vacant.id).toBe(13);
    expect(rate[2].sleep1Vacant.frequency).toBeCloseTo(1000 * 3);
    expect(rate[2].sleep1Vacant.qty).toBeCloseTo(20 * (1 / 3) * 2);
    expect(rate[2].sleep1Filled.id).toBe(13);
    expect(rate[2].sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate[2].sleep1Filled.qty).toBeCloseTo(0);
  });
});
