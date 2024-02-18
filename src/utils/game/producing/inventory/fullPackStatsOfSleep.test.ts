import {describe, expect, it} from '@jest/globals';

import {getFullPackStatsOfSleep} from '@/utils/game/producing/inventory/fullPackStatsOfSleep';


describe('Pokemon Full Pack Stats / Single Sleep Session', () => {
  it('is correct if inventory fills before the intervals exhausts', () => {
    const stats = getFullPackStatsOfSleep({
      staminaIntervals: [
        {efficiency: 1 / 0.45, duration: 19800},
        {efficiency: 1 / 0.52, duration: 9000},
      ],
      carryLimit: 30,
      qtyPerHelp: 1.6,
      frequency: 2600,
    });

    expect(stats?.secsToFull).toBeCloseTo(22594);
    expect(stats?.helpCount).toBeCloseTo(19);
  });

  it('is correct if inventory is not filled even after the intervals exhausts', () => {
    const stats = getFullPackStatsOfSleep({
      staminaIntervals: [
        {efficiency: 1 / 0.62, duration: 9000},
        {efficiency: 1 / 0.71, duration: 12000},
      ],
      carryLimit: 500,
      qtyPerHelp: 1,
      frequency: 5000,
    });

    expect(stats).toBeNull();
  });
});
