import {describe, expect, it} from '@jest/globals';

import {getFullPackStats} from '@/utils/game/producing/inventory/fullPackStats';


describe('Pokemon Full Pack Stats', () => {
  it('gets correct stats with single no collect duration', () => {
    const {ratio, secondsToFull} = getFullPackStats({
      dailyCount: 104.47,
      carryLimit: 30,
      sleepDurationInfo: {
        durations: [28800],
        total: 28800,
      },
      isFullPack: false,
    });

    expect(secondsToFull).toBeCloseTo(24810.9505);
    expect(ratio).toBeCloseTo(0.13851);
  });

  it('gets correct stats with double no collect durations', () => {
    const {ratio, secondsToFull} = getFullPackStats({
      dailyCount: 104.47,
      carryLimit: 30,
      sleepDurationInfo: {
        durations: [28800, 28800],
        total: 57600,
      },
      isFullPack: false,
    });

    expect(secondsToFull).toBeCloseTo(24810.9505);
    expect(ratio).toBeCloseTo(0.13851);
  });

  it('gets correct stats with lower carry limit', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const {ratio, secondsToFull} = getFullPackStats({
      dailyCount: 106.97,
      carryLimit: 14,
      sleepDurationInfo: {
        durations: [3600 * 7.5, 3600],
        total: 30600,
      },
      isFullPack: false,
    });

    expect(secondsToFull).toBeCloseTo(11307.8433);
    expect(ratio).toBeCloseTo(0.51282);
  });

  it('gets correct stats with lower carry limit and longer no collect durations', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const {ratio, secondsToFull} = getFullPackStats({
      dailyCount: 106.97,
      carryLimit: 14,
      sleepDurationInfo: {
        durations: [38700],
        total: 38700,
      },
      isFullPack: false,
    });

    expect(secondsToFull).toBeCloseTo(11307.8433);
    expect(ratio).toBeCloseTo(0.70781);
  });

  it('is correct in full pack', () => {
    // Absol at lv. 60 with Cocoa x 2 / Cocoa x 5 / Mushroom x 7
    const {ratio, secondsToFull} = getFullPackStats({
      dailyCount: 106.97,
      carryLimit: 14,
      sleepDurationInfo: {
        durations: [38700],
        total: 38700,
      },
      isFullPack: true,
    });

    expect(secondsToFull).toBeCloseTo(0);
    expect(ratio).toBeCloseTo(1);
  });
});
