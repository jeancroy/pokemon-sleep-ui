import {describe, expect, it} from '@jest/globals';

import {getFullPackStats} from '@/utils/game/producing/inventory/fullPackStats';


describe('Pokemon Full Pack Stats', () => {
  it('is correct with single sleep session', () => {
    const {secondsToFull} = getFullPackStats({
      dailyBaseQty: 100,
      carryLimit: 30,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: null,
      },
      isFullPack: false,
    });

    expect(secondsToFull.primary).toBeCloseTo(86400 * (30 / (100 * 1.5)));
    expect(secondsToFull.secondary).toBeNull();
  });

  it('is correct with dual sleep sessions', () => {
    const {secondsToFull} = getFullPackStats({
      dailyBaseQty: 100,
      carryLimit: 30,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: [{efficiency: 1.2, duration: 30000}],
      },
      isFullPack: false,
    });

    expect(secondsToFull.primary).toBeCloseTo(86400 * (30 / (100 * 1.5)));
    expect(secondsToFull.secondary).toBeCloseTo(86400 * (30 / (100 * 1.2)));
  });

  it('is correct if the inventory will not be full during sleep', () => {
    const {secondsToFull} = getFullPackStats({
      dailyBaseQty: 100,
      carryLimit: 100,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: null,
      },
      isFullPack: false,
    });

    expect(secondsToFull.primary).toBeNull();
    expect(secondsToFull.secondary).toBeNull();
  });

  it('respects `isFullPack` with primary sleep efficiency intervals only', () => {
    const {secondsToFull} = getFullPackStats({
      dailyBaseQty: 100,
      carryLimit: 30,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: null,
      },
      isFullPack: true,
    });

    expect(secondsToFull.primary).toBeCloseTo(0);
    expect(secondsToFull.secondary).toBeNull();
  });

  it('respects `isFullPack` with secondary sleep efficiency intervals', () => {
    const {secondsToFull} = getFullPackStats({
      dailyBaseQty: 100,
      carryLimit: 30,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: [{efficiency: 1.2, duration: 30000}],
      },
      isFullPack: true,
    });

    expect(secondsToFull.primary).toBeCloseTo(0);
    expect(secondsToFull.secondary).toBeCloseTo(0);
  });
});
