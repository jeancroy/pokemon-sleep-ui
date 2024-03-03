import {describe, expect, it} from '@jest/globals';

import {getExtraTastyInfo} from '@/utils/game/cooking/extraTasty/main';


describe('Pokemon Production (Cooking) / Extra Tasty Info', () => {
  it('is correct for even split of skill trigger', () => {
    const {overall} = getExtraTastyInfo({
      skillBoostPercentByMeal: {
        breakfast: 10,
        lunch: 10,
        dinner: 10,
      },
    });

    expect(overall.rate).toBeCloseTo(0.3413);
    expect(overall.multiplier).toBeCloseTo(1.4133);
  });

  // Check #863 for details
  it('is correct using some realistic data', () => {
    const {overall} = getExtraTastyInfo({
      skillBoostPercentByMeal: {
        breakfast: 10,
        lunch: 7,
        dinner: 3,
      },
    });

    expect(overall.rate).toBeCloseTo(0.2948);
    expect(overall.multiplier).toBeCloseTo(1.3603);
  });
});
