import {describe, expect, it} from '@jest/globals';

import {getFullPackStats} from '@/utils/game/producing/inventory/fullPackStats';


describe('Pokemon Full Pack Stats', () => {
  it('is correct with single sleep session', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 20,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: null,
      },
      isFullPack: false,
      qtyPerHelp: 1,
      frequency: 1500,
    });

    expect(bySleep.primary?.secsToFull).toBeCloseTo(20000);
    expect(bySleep.secondary).toBeNull();
  });

  it('is correct with dual sleep sessions', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 20,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: [{efficiency: 1.2, duration: 30000}],
      },
      isFullPack: false,
      qtyPerHelp: 1,
      frequency: 1500,
    });

    expect(bySleep.primary?.secsToFull).toBeCloseTo(20000);
    expect(bySleep.secondary?.secsToFull).toBeCloseTo(25000);
  });

  it('is correct if the inventory will not be full during sleep', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 100,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: null,
      },
      isFullPack: false,
      qtyPerHelp: 1,
      frequency: 1500,
    });

    expect(bySleep.primary).toBeNull();
    expect(bySleep.secondary).toBeNull();
  });

  it('respects `isFullPack` with primary sleep efficiency intervals only', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 30,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: null,
      },
      isFullPack: true,
      qtyPerHelp: 1,
      frequency: 1500,
    });

    expect(bySleep.primary?.secsToFull).toBeCloseTo(0);
    expect(bySleep.secondary).toBeNull();
  });

  it('respects `isFullPack` with secondary sleep efficiency intervals', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 30,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: [{efficiency: 1.2, duration: 30000}],
      },
      isFullPack: true,
      qtyPerHelp: 1,
      frequency: 1500,
    });

    expect(bySleep.primary?.secsToFull).toBeCloseTo(0);
    expect(bySleep.secondary?.secsToFull).toBeCloseTo(0);
  });
});
