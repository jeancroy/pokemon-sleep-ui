import {describe, expect, it} from '@jest/globals';

import {getExtraTastyInfo} from '@/utils/game/cooking/extraTasty/main';


describe('Pokemon Production (Cooking) / Extra Tasty Info', () => {
  it('is correct for even split of skill trigger', () => {
    const {overall} = getExtraTastyInfo({
      extraTastyLookupOptions: null,
      skillBoostPercentByMeal: {
        breakfast: 10,
        lunch: 10,
        dinner: 10,
      },
    });

    expect(overall.rate).toBeCloseTo(0.3413);
    expect(overall.multiplier).toBeCloseTo(1.4133);
  });

  it('is correct when skill boosts are inactive', () => {
    const {overall} = getExtraTastyInfo({
      extraTastyLookupOptions: null,
      skillBoostPercentByMeal: {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
      },
    });

    expect(overall.rate).toBeCloseTo(0.1286);
    expect(overall.multiplier).toBeCloseTo(1.1714);
  });

  it('is correct when skill boosts are over limit', () => {
    const {overall} = getExtraTastyInfo({
      extraTastyLookupOptions: null,
      skillBoostPercentByMeal: {
        breakfast: 100,
        lunch: 100,
        dinner: 100,
      },
    });

    expect(overall.rate).toBeCloseTo(0.7952);
    expect(overall.multiplier).toBeCloseTo(1.9381);
  });

  // Check #863 for details
  it('is correct using some realistic data', () => {
    const {overall} = getExtraTastyInfo({
      extraTastyLookupOptions: null,
      skillBoostPercentByMeal: {
        breakfast: 10,
        lunch: 7,
        dinner: 3,
      },
    });

    expect(overall.rate).toBeCloseTo(0.2948);
    expect(overall.multiplier).toBeCloseTo(1.3603);
  });

  it('is correct using float data', () => {
    const {overall} = getExtraTastyInfo({
      extraTastyLookupOptions: null,
      skillBoostPercentByMeal: {
        breakfast: 10.012343,
        lunch: 7.03435,
        dinner: 2.99434,
      },
    });
    expect(overall.rate).toBeCloseTo(0.2948);
    expect(overall.multiplier).toBeCloseTo(1.3603);
  });

  it('it is using reasonable internal sate', () => {
    const {byMealAlgorithmInfo} = getExtraTastyInfo({
      extraTastyLookupOptions: null,
      skillBoostPercentByMeal: {
        breakfast: 10,
        lunch: 7,
        dinner: 3,
      },
    });

    for (const info of byMealAlgorithmInfo) {
      expect(info.sizeOfState).toBeLessThanOrEqual(11);
    }
  });

  it('it is using reasonable internal sate with floats', () => {
    const {byMealAlgorithmInfo} = getExtraTastyInfo({
      extraTastyLookupOptions: null,
      skillBoostPercentByMeal: {
        breakfast: 10.012343,
        lunch: 7.03435,
        dinner: 2.99434,
      },
    });

    for (const info of byMealAlgorithmInfo) {
      expect(info.sizeOfState).toBeLessThanOrEqual(11);
    }
    expect(byMealAlgorithmInfo[byMealAlgorithmInfo.length-1].sizeOfState).toEqual(11);
  });

  it('it can be setup for smaller state', () => {
    const {byMealAlgorithmInfo} = getExtraTastyInfo({
      extraTastyLookupOptions: {
        lookupStepSize: 15,
      },
      skillBoostPercentByMeal: {
        breakfast: 10.012343,
        lunch: 7.03435,
        dinner: 2.99434,
      },
    });

    for (const info of byMealAlgorithmInfo) {
      expect(info.sizeOfState).toBeLessThanOrEqual(5);
    }
  });

  it('it can still be accurate with smaller state size', () => {
    const {overall} = getExtraTastyInfo({
      extraTastyLookupOptions: {
        lookupStepSize: 15,
      },
      skillBoostPercentByMeal: {
        breakfast: 10.012343,
        lunch: 7.03435,
        dinner: 2.99434,
      },
    });

    expect(overall.rate).toBeCloseTo(0.2948);
    expect(overall.multiplier).toBeCloseTo(1.3603);
  });
});


