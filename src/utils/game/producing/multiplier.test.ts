import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/game/bonus';
import {getHelpingBonusSimpleMultiplier, getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {cloneMerge} from '@/utils/object/cloneMerge';


describe('Pokemon Energy Multiplier', () => {
  const bonus = testBonus['1'];

  it('is correct', () => {
    const multiplier = getStrengthMultiplier({
      bonus,
      strengthMultiplierType: 'berry',
    });

    expect(multiplier).toBeCloseTo(bonus.overallMultiplier);
  });

  it('is correct with non-default strength multiplier', () => {
    const multiplier = getStrengthMultiplier({
      bonus: cloneMerge(bonus, {overallMultiplier: 1.05, strengthMultiplier: {berry: 1.05}}),
      strengthMultiplierType: 'berry',
    });

    expect(multiplier).toBeCloseTo(1.05 * 1.05);
  });
});

describe('Pokemon Helping Bonus Simple Multiplier', () => {
  it('is correct', () => {
    const multiplier = getHelpingBonusSimpleMultiplier(5);

    expect(multiplier).toBeCloseTo(1.296177);
  });
});
