import {describe, expect, it} from '@jest/globals';

import {getSecondsToFullPackInSleep} from '@/utils/game/producing/inventory/fullPackTime';


describe('Pokemon Full Pack Time Calculation', () => {
  it('is correct if inventory fills before the intervals exhausts', () => {
    const secondsToFull = getSecondsToFullPackInSleep({
      staminaIntervals: [
        {efficiency: 1 / 0.62, duration: 9000},
        {efficiency: 1 / 0.71, duration: 12000},
      ],
      dailyCount: 200,
      carryLimit: 50,
    });

    expect(secondsToFull).toBeCloseTo(14029.5484);
  });

  it('is correct if inventory is not filled even after the intervals exhausts', () => {
    const secondsToFull = getSecondsToFullPackInSleep({
      staminaIntervals: [
        {efficiency: 1 / 0.62, duration: 9000},
        {efficiency: 1 / 0.71, duration: 12000},
      ],
      dailyCount: 50,
      carryLimit: 500,
    });

    expect(secondsToFull).toBeNull();
  });
});
